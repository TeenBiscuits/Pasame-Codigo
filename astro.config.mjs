// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Plugin Heading Badges
import starlightHeadingBadges from "starlight-heading-badges";
// Plugin Sidebar Topics
import starlightSidebarTopics from "starlight-sidebar-topics";

// Expressive Code Plugins
import { pluginCodeOutput } from "./src/ec-output-plugin.ts";

// Support for MathJax
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";

// Vercel Adapter
import vercel from "@astrojs/vercel/static";

// Partytown Integration
import partytown from "@astrojs/partytown";

// Tailwind CSS Support
import tailwind from "@astrojs/tailwind";

// Og Image Link
const site = "https://pc.pablopl.dev/";
const ogUrl = new URL("og.jpg?v=1", site).href;
const ogImageAlt =
  "Una web open source con apuntes y ejercicios resueltos de las diferentes asignaturas que componen el Grado de Enxeñería Informática da Universidade da Coruña.";

// https://astro.build/config
export default defineConfig({
  site: "https://pc.pablopl.dev",
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: false,
    devImageService: "sharp",
  }),
  integrations: [
    starlight({
      title: "Pásame el Código",
      description:
        "Una web open source con apuntes y ejercicios resueltos de las diferentes asignaturas que componen el Grado de Enxeñería Informática da Universidade da Coruña.",
      lastUpdated: true,
      defaultLocale: "root",
      locales: {
        root: {
          label: "Español",
          lang: "es-ES",
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
        github: "https://github.com/TeenBiscuits/Pasame-Codigo",
        "x.com": "https://x.com/pabloportasl",
        linkedin: "https://www.linkedin.com/in/pabloportaslopez/",
        email: "mailto:pablo.portas@udc.es",
      },
      logo: {
        src: "./src/assets/logo.svg",
      },
      favicon: "/favicon.svg",
      head: [
        // Agregar un favicon ICO de respaldo para Safari.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            sizes: "32x32",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "author",
            content: "Pablo Portas López",
          },
        },
        {
          tag: "meta",
          attrs: { property: "og:image", content: ogUrl },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:alt", content: ogImageAlt },
        },
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://www.googletagmanager.com/gtag/js?id=G-JHF258ZVQX",
            type: "text/partytown",
          },
        },
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
          },
          content:
            "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-JHF258ZVQX');",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/TeenBiscuits/Pasame-Codigo/edit/main/",
      },
      customCss: [
        "./src/tailwind.css",
        process.env.NO_GRADIENTS ? "" : "./src/assets/custom.css",
      ],
      expressiveCode: {
        plugins: [pluginCodeOutput()],
      },
      plugins: [
        starlightHeadingBadges(),
        starlightSidebarTopics([
          {
            label: "Comienza Aquí",
            link: "/intro/",
            icon: "open-book",
            items: [
              "intro/readme",
              "intro/contribuir",
              {
                label: "Licencias",
                autogenerate: { directory: "intro/licencias" },
                collapsed: true,
              },
            ],
          },
          {
            label: "Programación I",
            link: "/prouno/",
            icon: "seti:c",
            items: [
              {
                label: "Apuntes",
                autogenerate: { directory: "prouno/apuntes" },
              },
              {
                label: "Boletines",
                autogenerate: { directory: "prouno/boletines" },
              },
            ],
          },
          {
            label: "Programación II",
            link: "/prodos/",
            icon: "seti:c",
            items: [
              {
                label: "Apuntes",
                autogenerate: { directory: "prodos/apuntes" },
              },
            ],
          },
          {
            label: "Diseño de Software",
            link: "/deese/",
            icon: "seti:java",
            items: [],
            badge: { text: "WIP", variant: "danger" },
          },
          {
            label: "Paradigmas de la Programación",
            link: "/pepe/",
            icon: "seti:ocaml",
            items: [],
            badge: { text: "WIP", variant: "danger" },
          },
        ]),
      ],
      components: {
        SkipLink: "./src/components/SkipLink.astro",
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax],
  },
});
