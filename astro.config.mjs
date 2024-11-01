// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// Plugin Heading Badges
import starlightHeadingBadges from 'starlight-heading-badges';

// Support for MathJax
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';

// Vercel Adapter
import vercel from '@astrojs/vercel/serverless';

// Partytown Integration
import partytown from '@astrojs/partytown'

// Tailwind CSS Support
import tailwind from '@astrojs/tailwind';

// Og Image Link
const site = 'https://pc.pablopl.dev/';
const ogUrl = new URL('og.jpg?v=1', site).href;
const ogImageAlt = 'Una web open source con apuntes y ejercicios resueltos de las diferentes asignaturas que componen el Grado de Enxeñería Informática da Universidade da Coruña.';

// https://astro.build/config
export default defineConfig({
  site: 'https://pc.pablopl.dev',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [ starlight({
    title: 'Pásame el Código',
    description: 'Una web open source con apuntes y ejercicios resueltos de las diferentes asignaturas que componen el Grado de Enxeñería Informática da Universidade da Coruña.',
    defaultLocale: 'root',
    locales: {
      root: {
      label: 'Español',
      lang: 'es-ES',
      },
      // Locales are work in progress
      //'en': {
      //  label: 'English',
      //  lang: 'en',
      //},
      //'gl': {
      //  label: 'Galego',
      //  lang: 'gl-ES',
      //},
    },
    social: {
      github: 'https://github.com/TeenBiscuits/Pasame-Codigo',
      'x.com': 'https://x.com/pabloportasl',
      linkedin: 'https://www.linkedin.com/in/pabloportaslopez/',
      email: 'mailto:pablo.portas@udc.es',
    },
    logo: {
      src: './src/assets/logo.svg',
    },
    favicon: '/favicon.svg',
    head: [
      // Agregar un favicon ICO de respaldo para Safari.
      {
      tag: 'link',
      attrs: {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '32x32',
      },
      },
      {
      tag: 'meta',
      attrs: {
        name: 'author',
        content: 'Pablo Portas López',
      },
      },
      {
        tag: 'meta',
        attrs: { property: 'og:image', content: ogUrl },
      },
      {
        tag: 'meta',
        attrs: { property: 'og:image:alt', content: ogImageAlt },
      },
      {
        tag: 'script',
        attrs: {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-JHF258ZVQX',
          type: 'text/partytown',
        },
      },
      {
        tag: 'script',
        attrs: {
          type: 'text/partytown',
        },
        content: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-JHF258ZVQX');",
      },
    ],
    editLink: {
      baseUrl: 'https://github.com/TeenBiscuits/Pasame-Codigo/edit/main/',
    },
    customCss: [
      './src/tailwind.css',
      process.env.NO_GRADIENTS ? '' : './src/assets/custom.css',
    ],
    sidebar: [
      {
        label: 'Comienza aquí',
        items: [
          {
            slug: 'intro/readme',
          },
          {
            slug: 'intro/indice',
          },
          {
            slug: 'intro/contribuir'
          },
        ],
      },
      {
        label: 'Programación I',
        collapsed: true,
        items: [
          {
            slug: 'prouno/indice',
          },
          {
            label: 'Apuntes',
            autogenerate: { directory: 'prouno/apuntes' },
          },
          {
            label: 'Boletines',
            autogenerate: { directory: 'prouno/boletines' },
          },
        ],
      },
      {
        label: 'Programación II',
        collapsed: true,
        items: [
          {
            slug: 'prodos/indice',
          },
          {
            label: 'Apuntes',
            autogenerate: { directory: 'prodos/apuntes' },
          },
        ],
      },
      {
        label: 'Diseño de Software',
        badge: { text: 'WIP', variant: 'danger' },
        collapsed: true,
        autogenerate: { directory: 'deese' },
      },
      {
        label: 'Paradigmas de la Programación',
        badge: { text: 'WIP', variant: 'danger' },
        collapsed: true,
        autogenerate: { directory: 'pepe' },
      },
    ],
    plugins: [starlightHeadingBadges()],
    components: {
      SkipLink: './src/components/SkipLink.astro',
    },
  }), partytown({
    config: {
      forward: ["dataLayer.push"],
    },
  }), tailwind({
    applyBaseStyles: false,
  }),],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax],
  },
});