import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: getPermalink('/'),
    },
    {
      text: 'Quiénes Somos',
      href: getPermalink('/about'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contacto',
      href: getPermalink('/contact'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Sitio',
      links: [
        { text: 'Inicio', href: getPermalink('/') },
        { text: 'Quiénes Somos', href: getPermalink('/about') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contacto', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} Pediwell - PASEOSALUD S.A.S. Aviso de privacidad 
  `,
};
