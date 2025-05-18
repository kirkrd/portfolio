import { json } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import { Theme } from "remix-themes";
import { App } from "./root.js";

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: App,
    loader() {
      return json({ theme: Theme.DARK });
    },
  },
]);

describe("App", () => {
  it("it renders", () => {
    const { container } = render(<RemixStub />);

    screen.debug();

    expect(container).toBeDefined();
  });
});
