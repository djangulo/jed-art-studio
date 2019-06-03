// const resume = require('./resume');
const languages = require('./languages');

module.exports = {
  title: 'JED Art Studio',
  description: 'art',
  siteUrl: 'https://jedartstudio.com',
  author: {
    name: 'Denis Angulo',
    homeCity: '-',
    email: 'djal@tuta.io',
    defaultLink: 'https://github.com/djangulo'
  },
  sourceCodeLink: 'https://github.com/djangulo/jed-art-studio',
  menu: [
    { label: 'blog', slug: '/blog/' },
    { label: 'gallery', slug: '/gallery/' },
    { label: 'tags', slug: '/tags/' },
    { label: 'about', slug: '/about/' },
    { label: 'contact', slug: '/contact/' }
  ],
  languages,
  contact: [
    {
      type: 'email',
      value: 'djal@tuta.io',
      link: 'mailto:djal@tuta.io'
    },
    {
      type: 'phone',
      value: '-',
      country: '',
      link: 'tel:-'
    },
    {
      type: 'phone',
      value: '-',
      country: '',
      link: 'tel:-'
    }
  ]
};
