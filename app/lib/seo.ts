import { chapters, links, stackLayers } from "./constants";

export const SITE_URL = "https://www.kirkerud.dev/";

export const seo = {
  // Front-loaded with name, role and location: Google shows ~60 characters.
  title: "Kristoffer Kirkerud – Software Engineer in Gothenburg, Sweden",
  description:
    "Kristoffer Kirkerud is a senior software engineer and solution architect in Gothenburg, Sweden — fullstack TypeScript, React, .NET and cloud, with AI-native delivery.",
  image: {
    url: `${SITE_URL}og.png`,
    width: 1200,
    height: 630,
    alt: "Kristoffer Kirkerud — Senior Software Engineer / Solution Architect, Gothenburg, Sweden",
  },
} as const;

const current = chapters[chapters.length - 1].roles[0];

/** Skills as plain names, e.g. "Qwen · local" → "Qwen". */
const skills = [
  ...new Set(
    stackLayers.flatMap((layer) =>
      layer.items.map((item) => item.split(" · ")[0]),
    ),
  ),
];

/**
 * schema.org graph describing the page as a profile of one person. This is
 * what lets search engines connect the name to the role, employer and city.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}#profile`,
      url: SITE_URL,
      name: seo.title,
      description: seo.description,
      inLanguage: "en",
      mainEntity: { "@id": `${SITE_URL}#person` },
      isPartOf: { "@id": `${SITE_URL}#website` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Kirkerud Development",
      publisher: { "@id": `${SITE_URL}#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: "Kristoffer Kirkerud",
      url: SITE_URL,
      image: `${SITE_URL}avatar.jpg`,
      jobTitle: current.jobTitle,
      description: seo.description,
      worksFor: {
        "@type": "Organization",
        name: "Consid AB",
        url: links.consid,
      },
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gothenburg",
          addressCountry: "SE",
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gothenburg",
        addressCountry: "SE",
      },
      knowsAbout: skills,
      sameAs: [links.linkedin, links.github],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#company`,
      name: "Kirkerud Development",
      url: SITE_URL,
      founder: { "@id": `${SITE_URL}#person` },
      description:
        "A company building SaaS applications, founded by Kristoffer Kirkerud.",
    },
  ],
};
