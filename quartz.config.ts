import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Gabriel Adams – Professional Portfolio
 * Quartz 4 Configuration
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Gabriel Adams – Portfolio",
    pageTitleSuffix: " | Cybersecurity Researcher",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible", // change to "google", "umami", etc. if you want another provider
    },
    locale: "en-US",
    baseUrl: "https://gradams42.github.io", // full URL for GitHub Pages
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#f2f2f2",
          gray: "#b0b0b0",
          darkgray: "#3d3d3d",
          dark: "#1a1a1a",
          secondary: "#1f6feb",
          tertiary: "#84a59d",
          highlight: "rgba(31, 111, 235, 0.15)",
          textHighlight: "#ffeb3b88",
        },
        darkMode: {
          light: "#16181d",
          lightgray: "#2d2f34",
          gray: "#6e7681",
          darkgray: "#d1d5da",
          dark: "#f0f6fc",
          secondary: "#58a6ff",
          tertiary: "#84a59d",
          highlight: "rgba(88, 166, 255, 0.15)",
          textHighlight: "#ffeb3b66",
        },
      },
    },
    outputDir: "./docs", // ✅ Updated for GitHub Pages
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
