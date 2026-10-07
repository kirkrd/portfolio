import type { MetaFunction } from "@remix-run/node";
import { AfterHours } from "~/components/story/after-hours";
import { Contact } from "~/components/story/contact";
import { Hero } from "~/components/story/hero";
import { Journey } from "~/components/story/journey";
import { Manifesto } from "~/components/story/manifesto";
import { SiteHeader } from "~/components/story/site-header";
import { Stack } from "~/components/story/stack";
import { Stats } from "~/components/story/stats";

export const meta: MetaFunction = () => [
  { title: "Kristoffer Kirkerud | Kirkerud Development" },
  {
    name: "description",
    content:
      "Portfolio of Kirkerud Development — Senior Software Engineer / Solution Architect at Consid AB, building SaaS applications on the side.",
  },
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
