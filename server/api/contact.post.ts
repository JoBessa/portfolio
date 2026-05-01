import nodemailer from 'nodemailer'

// ---------------------------------------------------------------------------
// Rate limiter en mémoire : 3 envois max par IP par minute
// ---------------------------------------------------------------------------
const hits = new Map<string, number[]>()

function rateLimit(ip: string, max = 3, windowMs = 60_000): boolean {
    const now = Date.now()
    const timestamps = (hits.get(ip) ?? []).filter(t => now - t < windowMs)
    if (timestamps.length >= max) return false
    hits.set(ip, [...timestamps, now])
    return true
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default defineEventHandler(async (event) => {
    // 1. Rate limiting
    const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
    if (!rateLimit(ip)) {
        throw createError({ statusCode: 429, message: 'Trop de requêtes, réessaie dans une minute.' })
    }

    // 2. Lecture du body
    const body = await readBody(event)
    const { name, email, company, contractType, message, turnstileToken } = body

    // 3. Validation basique des champs
    if (!name || !email || !company || !contractType || !message || !turnstileToken) {
        throw createError({ statusCode: 400, message: 'Champs manquants.' })
    }

    // 4. Vérification Turnstile
    const verify = await $fetch<{ success: boolean; 'error-codes'?: string[] }>(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            body: {
                secret: process.env.NUXT_TURNSTILE_SECRET_KEY,
                response: turnstileToken,
                remoteip: ip,
            },
        }
    )

    if (!verify.success) {
        throw createError({ statusCode: 400, message: 'Captcha invalide.' })
    }

    // 5. Envoi du mail via SMTP Gmail
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    })

    await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
        replyTo: `"${name}" <${email}>`,
        to: process.env.MAIL_TO ?? process.env.MAIL_USER,
        subject: `[Portfolio] Message de ${name} (${company})`,
        text: `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company}\nContrat: ${contractType}\n\nMessage:\n${message}`,
        html: `
            <div style="margin:0;padding:40px 16px;background:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:auto;">

  <!-- HEADER -->
  <tr>
    <td style="background:#0f172a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#64748b;">
        Portfolio
      </p>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#f8fafc;line-height:1.3;">
        Nouveau message reçu
      </h1>
      <p style="margin:10px 0 0;font-size:13px;color:#94a3b8;">
        Quelqu'un a rempli le formulaire de contact
      </p>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="background:#ffffff;padding:36px 40px;">

      <!-- Expéditeur -->
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;">
        Expéditeur
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:130px;font-size:13px;font-weight:600;color:#64748b;">Nom</td>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0f172a;font-weight:500;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:600;color:#64748b;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;">
            <a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;font-weight:500;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;font-size:13px;font-weight:600;color:#64748b;">Entreprise</td>
          <td style="padding:10px 0;font-size:14px;color:#0f172a;font-weight:500;">${company}</td>
        </tr>
      </table>

      <!-- Détails de l'offre -->
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;">
        Détails de l'offre
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:130px;font-size:13px;font-weight:600;color:#64748b;">Contrat</td>
          <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
            <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;">
              ${contractType}
            </span>
          </td>
        </tr>
      </table>

      <!-- Message -->
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;">
        Message
      </p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #3b82f6;border-radius:0 8px 8px 0;padding:20px 24px;font-size:14px;line-height:1.75;color:#334155;white-space:pre-wrap;">
        ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </div>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;">
        <tr>
          <td align="center">
            <a href="mailto:${email}?subject=Re: votre message — Portfolio de Jonathan Bessa"
               style="display:inline-block;background:#0f172a;color:#f8fafc;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">
              ↩&nbsp;Répondre à ${name}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</div>
        `,
    })

    return { success: true }
})