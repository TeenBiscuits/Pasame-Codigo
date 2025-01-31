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
// Plugin Link Validator
import starlightLinksValidator from "starlight-links-validator";

// Expressive Code Plugins
import { pluginCodeOutput } from "./src/ec-output-plugin.ts";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// Support for MathJax
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";

// Vercel Adapter
import vercel from "@astrojs/vercel";

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
            src: "https://analytics.ahrefs.com/analytics.js",
            "data-key": "41AHUOkOrsmT26f+Ow8zaQ",
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
        // Google Tag (CMP + GA4 + Clarity)
        {
          tag: "script",
          attrs: {
            src: "/google-tag.js",
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
        defaultProps: {
          collapseStyle: "collapsible-auto",
        },
      },
      plugins: [
        starlightHeadingBadges(),
        starlightLinksValidator({
          errorOnInvalidHashes: false,
        }),
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
            items: [
              {
                label: "Implementaciones",
                autogenerate: { directory: "algo/implementaciones" },
              },
              {
                label: "Prácticas y Exámenes",
                items: [
                  {
                    label: "TeenBiscuits/Practicas-Algo",
                    link: "https://github.com/TeenBiscuits/Practicas-Algo",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "migueldeoleiros/examen-algoritmos",
                    link: "https://github.com/migueldeoleiros/examen-algoritmos",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "migueldeoleiros/Algoritmos",
                    link: "https://github.com/migueldeoleiros/Algoritmos",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "JavierFreireBouzas/Algoritmos-FIC-UDC",
                    link: "https://github.com/JavierFreireBouzas/Algoritmos-FIC-UDC",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "CValle_/gei2/Algo",
                    link: "https://gitlab.com/CValle_/gei2/-/tree/main/Algo",
                    badge: { text: "GitLab", variant: "tip" },
                  },
                ],
              },
            ],
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
                  {
                    label: "TeenBiscuits/Practicas-PP",
                    link: "https://github.com/TeenBiscuits/Practicas-PP",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "Xabiguitian/Practicas_PP",
                    link: "https://github.com/Xabiguitian/Practicas_PP",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "antonlnz/PP",
                    link: "https://github.com/antonlnz/PP",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "migueldeoleiros/PP",
                    link: "https://github.com/migueldeoleiros/PP",
                    badge: { text: "GitHub", variant: "tip" },
                  },
                  {
                    label: "CValle_/gei2/PP",
                    link: "https://gitlab.com/CValle_/gei2/-/tree/main/PP",
                    badge: { text: "GitLab", variant: "tip" },
                  },
                ],
              },
            ],
          },
          {
            label: "We ♥️ Open Source",
            link: "/opensource/",
            icon: "star",
            items: [
              {
                label: "Tutorial Git",
                autogenerate: { directory: "/opensource/git" },
                badge: { text: "WIP", variant: "danger" },
              },
              {
                label: "Check this repos!",
                autogenerate: { directory: "" },
                badge: { text: "WIP", variant: "danger" },
              },
              {
                label: "¡Danos una ⭐ en GitHub!",
                link: "https://github.com/TeenBiscuits/Pasame-Codigo",
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
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax],
  },
});
