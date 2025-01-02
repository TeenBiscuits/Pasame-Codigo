// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { readFileSync } from "fs";

// Plugin Heading Badges
import starlightHeadingBadges from "starlight-heading-badges";
// Plugin Sidebar Topics
import starlightSidebarTopics from "starlight-sidebar-topics";
// Plugin Algolia DocSearch
import starlightDocSearch from "@astrojs/starlight-docsearch";

// Expressive Code Plugins
import { pluginCodeOutput } from "./src/ec-output-plugin.ts";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// Support for MathJax
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";

import simplePlantUML from "@akebifiky/remark-simple-plantuml";

// Vercel Adapter
import vercel from "@astrojs/vercel";

// Temporal Script to fix https://github.com/withastro/adapters/issues/445
import { CopyFilesPlugin } from "./scripts/copy-files.ts";

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
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("consent", "default", {
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
                analytics_storage: "denied",
            });

            gtag("config", "G-JHF258ZVQX");  
          `,
        },
        {
          tag: "script",
          attrs: {
            "data-category": "analytics",
            "data-service": "Google Analytics",
          },
          content: `
            function updateConsents() {
              gtag("consent", "update", {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
                analytics_storage: "granted",
              });
            }
          `,
        },
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://analytics.ahrefs.com/analytics.js",
            "data-key": "41AHUOkOrsmT26f+Ow8zaQ",
          },
        },
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8724801153903590",
            crossorigin: "anonymous",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "google-adsense-account",
            content: "ca-pub-8724801153903590",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://IOKSWSAQ8F-dsn.algolia.net",
            crossorigin: "",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css",
          },
        },
      ],
      editLink: {
        baseUrl: "https://github.com/TeenBiscuits/Pasame-Codigo/edit/main/",
      },
      customCss: ["./src/tailwind.css", "./src/assets/custom.css"],
      expressiveCode: {
        plugins: [pluginCodeOutput(), pluginCollapsibleSections()],
        shiki: {
          langs: [JSON.parse(readFileSync("./src/pseudocodigo.json", "utf-8"))],
        },
      },
      plugins: [
        starlightHeadingBadges(),
        starlightDocSearch({
          appId: "IOKSWSAQ8F",
          apiKey: "d2bec8d00c3ced7fc84273265aeab2c1",
          indexName: "pc",
          insights: true,
        }),
        starlightSidebarTopics([
          {
            label: "Comienza Aquí",
            link: "/intro/",
            icon: "open-book",
            items: [
              "intro/readme",
              "intro/contribuir",
              "intro/code_of_conduct",
              {
                label: "Licencias",
                autogenerate: { directory: "intro/licencias" },
                collapsed: true,
              },
              {
                label: "Privacidad",
                autogenerate: { directory: "intro/legal" },
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
              {
                label: "Código",
                items: [
                  {
                    label: "FerLS/PRO2",
                    link: "https://github.com/FerLS/PRO2",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                ],
              },
            ],
          },
          {
            label: "Algoritmos",
            link: "/algo/",
            icon: "seti:clock",
            items: [],
            badge: { text: "WIP", variant: "danger" },
          },
          {
            label: "Diseño de Software",
            link: "/deese/",
            icon: "seti:java",
            items: [
              {
                label: "Apuntes",
                autogenerate: { directory: "deese/apuntes" },
              },
              {
                label: "Ejercicios Resueltos",
                items: [
                  {
                    label: "emosqueira/Ejercicios-DS",
                    link: "https://github.com/emosqueira/Ejercicios-DS",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                ],
              },
            ],
          },
          {
            label: "Paradigmas de la Programación",
            link: "/pepe/",
            icon: "seti:ocaml",
            items: [
              {
                label: "Apuntes",
                autogenerate: { directory: "pepe/apuntes" },
              },
              {
                label: "Código en OCamel",
                items: [
                  {
                    label: "Xabiguitian/apuntesPP",
                    link: "https://github.com/Xabiguitian/apuntesPP",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                ],
              },
            ],
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
    CopyFilesPlugin(),
  ],
  markdown: {
    remarkPlugins: [remarkMath, simplePlantUML],
    rehypePlugins: [rehypeMathJax],
  },
});
