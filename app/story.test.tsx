import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import { Theme, ThemeProvider } from "remix-themes";
import { chapters, stackLayers } from "~/lib/constants";
import Index from "./routes/_index";

// jsdom has no IntersectionObserver; framer-motion's in-view features need one.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: () => (
      <ThemeProvider
        specifiedTheme={Theme.LIGHT}
        themeAction="/action/set-theme"
      >
        <Index />
      </ThemeProvider>
    ),
  },
]);

describe("Index story", () => {
  it("tells every chapter of the career", async () => {
    render(<RemixStub />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Kristoffer Kirkerud",
      }),
    ).toBeInTheDocument();
    for (const chapter of chapters) {
      expect(
        screen.getByRole("heading", { name: chapter.title }),
      ).toBeInTheDocument();
    }
  });

  it("lists every role and every tool", async () => {
    render(<RemixStub />);
    await screen.findByRole("heading", { level: 1 });

    for (const role of chapters.flatMap((chapter) => chapter.roles)) {
      expect(screen.getByText(role.jobDescription)).toBeInTheDocument();
    }
    for (const item of stackLayers.flatMap((layer) => layer.items)) {
      // Desktop and mobile toolkit layouts both render the item.
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    }
  });

  it("links to LinkedIn and GitHub", async () => {
    render(<RemixStub />);

    expect(
      await screen.findByRole("link", { name: /LinkedIn/ }),
    ).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/kristoffer-kirkerud/",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/kirkrd",
    );
  });
});
