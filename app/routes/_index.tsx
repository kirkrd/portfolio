import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { AfterHours } from "~/components/story/after-hours";
import { Contact } from "~/components/story/contact";
import { Hero } from "~/components/story/hero";
import { Journey } from "~/components/story/journey";
import { Manifesto } from "~/components/story/manifesto";
import { SiteHeader } from "~/components/story/site-header";
import { Stack } from "~/components/story/stack";
import { Stats } from "~/components/story/stats";
import { SITE_URL, seo, structuredData } from "~/lib/seo";

export const meta: MetaFunction = () => [
  { title: seo.title },
  { name: "description", content: seo.description },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { property: "og:type", content: "profile" },
  { property: "og:site_name", content: "Kirkerud Development" },
  { property: "og:url", content: SITE_URL },
  { property: "og:title", content: seo.title },
  { property: "og:description", content: seo.description },
  { property: "og:locale", content: "en_US" },
  { property: "og:image", content: seo.image.url },
  { property: "og:image:width", content: String(seo.image.width) },
  { property: "og:image:height", content: String(seo.image.height) },
  { property: "og:image:alt", content: seo.image.alt },
  { property: "profile:first_name", content: "Kristoffer" },
  { property: "profile:last_name", content: "Kirkerud" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: seo.title },
  { name: "twitter:description", content: seo.description },
  { name: "twitter:image", content: seo.image.url },
  { name: "twitter:image:alt", content: seo.image.alt },
  { "script:ld+json": structuredData },
];

export const links: LinksFunction = () => [
  { rel: "canonical", href: SITE_URL },
];

export default function Index() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <Journey />
        <Stats />
        <Stack />
        <AfterHours />
        <Contact />
      </main>
    </>
  );
}
