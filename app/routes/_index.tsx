import type { MetaFunction } from "@remix-run/node";
import { CalendarDays } from "lucide-react";
import Header from "~/components/header";
import SectionHeader from "~/components/section-header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Kristoffer Kirkerud" },
    { name: "description", content: "Software Engineer at Polestar" },
  ];
};

export default function Index() {
  return (
    <div className="p-5">
      <Header />
      <main className="grid gap-9">
        <section className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src=" https://avatars.githubusercontent.com/u/22052641?v=4"
              alt="@kirkrd"
            />
          </Avatar>
          <p>
            Software Engineer at
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="px-1.5" variant="link">
                  Polestar
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibag88oVKuUcLjKuLReQCd-3e_2lHR1EjU1xCWwYeCA&s" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      Polestar Performance AB
                    </h4>
                    <p className="text-sm">
                      Our commitment to design and innovation propels us towards
                      a smarter and more sustainable future.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined September 2023
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <SectionHeader> About </SectionHeader>
          <p>
            I've been a developer for many years, i am an enthusiast about tech,
            passionate about creating amazing user experiences and bringing
            ideas to life.
          </p>
          <p>
            I consider myself fullstack in the way i am open to every tech
            thrown at me, I am not afraid to jump and learn whatever tool solves
            the problem at hand.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <SectionHeader> Technical skills </SectionHeader>
          <h3> Coding, frameworks and commonly used tools </h3>
          <em>
            {" "}
            The following are the tools i've used recently and are most
            up-to-date knowledge wise.
          </em>
          <ul>
            <li> Typescript / Javascript </li>
            <li> React </li>
            <li> CSS </li>
          </ul>
          <h3> Cloud experience </h3>
          <ul>
            <li> AWS </li>
            <li> Azure </li>
            <li> Cloudflare </li>
          </ul>
          <h3> CI / CD</h3>
          <ul>
            <li> Github workflows </li>
            <li> Jenkins </li>
            <li> Bitbucket pipelines </li>
          </ul>
          <h3> Site reliability engineering </h3>
          <ul>
            <li> Datadog </li>
            <li> Kibana </li>
          </ul>
          <h3> IDE and workspace </h3>
          <ul>
            <li> Nvim / Vim </li>
            <li> MacOS </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
