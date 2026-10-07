import type { MetaDescriptor } from "@remix-run/node";
import { links, meta } from "./routes/_index";

const tags = (meta as () => MetaDescriptor[])();

const content = (key: "name" | "property", value: string) =>
  tags
    .filter((tag) => (tag as Record<string, string>)[key] === value)
    .map((tag) => (tag as { content: string }).content);

describe("SEO", () => {
  it("has one title and one description, both naming role and location", () => {
    const titles = tags.filter((tag) => "title" in tag);
    expect(titles).toHaveLength(1);
    expect((titles[0] as { title: string }).title).toMatch(
      /Software Engineer.*Gothenburg, Sweden/,
    );

    const descriptions = content("name", "description");
    expect(descriptions).toHaveLength(1);
    expect(descriptions[0]).toMatch(/software engineer/i);
    expect(descriptions[0]).toMatch(/Gothenburg, Sweden/);
    expect(descriptions[0].length).toBeLessThanOrEqual(170);
  });

  it("declares the canonical URL and a large social preview", () => {
    expect(links()).toContainEqual({
      rel: "canonical",
      href: "https://www.kirkerud.dev/",
    });
    expect(content("property", "og:url")).toEqual([
      "https://www.kirkerud.dev/",
    ]);
    expect(content("property", "og:image")).toEqual([
      "https://www.kirkerud.dev/og.png",
    ]);
    expect(content("name", "twitter:card")).toEqual(["summary_large_image"]);
  });

  it("describes the person with schema.org structured data", () => {
    const ld = tags.find((tag) => "script:ld+json" in tag) as {
      "script:ld+json": { "@graph": Record<string, unknown>[] };
    };
    const graph = ld["script:ld+json"]["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");

    expect(graph.map((node) => node["@type"])).toContain("ProfilePage");
    expect(person).toMatchObject({
      name: "Kristoffer Kirkerud",
      jobTitle: "Senior Software Engineer / Solution Architect",
      worksFor: { name: "Consid AB" },
      address: { addressLocality: "Gothenburg", addressCountry: "SE" },
      sameAs: [
        "https://www.linkedin.com/in/kristoffer-kirkerud/",
        "https://github.com/kirkrd",
      ],
    });
    expect(person?.knowsAbout).toEqual(
      expect.arrayContaining(["TypeScript", ".NET Core", "Claude", "Qwen"]),
    );
  });
});
