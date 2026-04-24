export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate',
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
