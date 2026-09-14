import type { CallToAction } from '~/types';
import { getPermalink, getBlogPermalink } from './utils/permalinks';

const headerActions: CallToAction[] = [
  {
    text: 'Reservar cita',
    href: 'https://wa.me/593999000656',
    target: '_blank',
    rel: 'noopener noreferrer',
    variant: 'primary',
    class: 'ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm w-auto',
  },
];

export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: getPermalink('/'),
    },
    {
      text: 'Servicios',
      href: getPermalink('/services'),
    },
    {
      text: 'Contacto',
      href: getPermalink('/contact'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: headerActions,
};

export const footerData = {
  links: [
    {
      title: 'Sitio',
      links: [
        { text: 'Inicio', href: getPermalink('/') },
        { text: 'Servicios', href: getPermalink('/services') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contacto', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/pediwell.ec/',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ],
  footNote: `
    © ${new Date().getFullYear()} <a href="/aviso-de-privacidad" class="underline underline-offset-2 hover:text-[#B77E68] transition-colors">Pediwell - PASEOSALUD S.A.S. Aviso de privacidad</a>
  `,
};
