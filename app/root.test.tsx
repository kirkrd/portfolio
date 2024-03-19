import { render, screen } from "@testing-library/react";
import { App } from "./root";
import { Theme } from "remix-themes";
import { createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/react";

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
