export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate',
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    },
    pageSection: {
      slots: {
        root: 'relative isolate',
        container: 'flex flex-col lg:grid py-16 lg:py-24 lg:py-32 gap-8 lg:gap-16',
        wrapper: '',
        header: '',
        leading: 'flex items-center justify-center mb-6',
        leadingIcon: 'size-10 shrink-0 text-primary',
        headline: 'mb-3',
        title: 'text-md lg:text-lg lg:text-xl tracking-tight font-bold text-highlighted uppercase',
        description: 'text-base lg:text-lg text-muted',
        body: 'mt-0',
        features: 'grid',
        footer: 'mt-4',
        links: 'flex flex-wrap gap-x-6 gap-y-3'
      },
      variants: {
        orientation: {
          vertical: {
            container: '',
            headline: 'justify-center',
            leading: 'justify-center',
            title: 'text-start',
            description: 'text-start text-balance',
            links: 'justify-start',
            features: 'lg:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        }
      }
    }
  },
  global: {
    available: true,
    meetingLink: 'https://cal.com',
    picture: {
      light: '/images/me-light.png',
      dark: '/images/me.jpg',
      alt: 'Jonathan Bessa'
    }
  },
  footer: {
    links: [
      { icon: 'i-simple-icons-github', to: 'https://github.com/...' },
      { icon: 'i-simple-icons-linkedin', to: 'https://linkedin.com/in/...' }
    ]
  }
})
