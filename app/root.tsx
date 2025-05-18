import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./sessions.server";
import "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  console.log("theme", clsx(theme));
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
        <meta
          property="og:title"
          content="Kristoffer Kirkerud - Full-Stack Software Engineer in Gothenburg, Sweden"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kirkerud.dev" />
        <meta
          property="og:description"
          content="Portfolio and blog of Kristoffer Kirkerud, a full-stack software engineer specializing in JavaScript, TypeScript, React, Node.js, .NET, and web development based in Gothenburg, Sweden."
        />
        <meta
          name="description"
          content="Kristoffer Kirkerud is a full-stack software engineer in Gothenburg, Sweden, specializing in JavaScript, TypeScript, React, Node.js, .NET, and web development. Explore his portfolio and blog."
        />
        <meta
          name="keywords"
          content="Full-Stack Software Engineer, Gothenburg, Sweden, JavaScript, TypeScript, React, Node.js, .NET, Web Developer, Backend, Frontend, Kristoffer Kirkerud, Portfolio, Blog, Software engineer, Programmer, Programmerare, Utvecklare, Webbutvecklare, Portfolio, Blogg, Ai"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kristoffer Kirkerud" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
