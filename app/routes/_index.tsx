import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import type { MetaFunction } from "@remix-run/node";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import Header from "~/components/header";
import ListHeader from "~/components/list-header";
import SectionHeader from "~/components/section-header";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const meta: MetaFunction = () => {
  return [
    { title: "Kristoffer Kirkerud" },
    { name: "description", content: "Software Engineer at Polestar" },
  ];
};

export default function Index() {
  const [showEmploylerCard, setShowEmployerCard] = useState(false);
  const [showEmploylerCardHover, setShowEmployerCardHover] = useState(false);
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
            <HoverCard
              openDelay={4000}
              open={
                showEmploylerCard ? showEmploylerCard : showEmploylerCardHover
              }
            >
              <HoverCardTrigger
                asChild
                onClick={() => setShowEmployerCard((prev) => !prev)}
              >
                <Button
                  onMouseEnter={() =>
                    !showEmploylerCard && setShowEmployerCardHover(true)
                  }
                  onMouseLeave={() =>
                    !showEmploylerCard && setShowEmployerCardHover(false)
                  }
                  className="px-1.5"
                  variant="link"
                >
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
          <em>
            A summary of my different skills and interests within the field.
          </em>

          <Tabs defaultValue="coreSkills" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="coreSkills">Core skills</TabsTrigger>
              <TabsTrigger value="familiarTools">Familiar tools</TabsTrigger>
              <TabsTrigger value="learningInterests">
                Learning interests
              </TabsTrigger>
            </TabsList>
            <TabsContent value="coreSkills" className="pl-1">
              <ListHeader> Languages </ListHeader>
              <ul className="mt-1">
                <li> Typescript / Javascript </li>
                <li> HTML / CSS </li>
              </ul>
              <ListHeader> Frameworks</ListHeader>
              <ul className="mt-1">
                <li> React</li>
                <li> Vite </li>
                <li> Remix</li>
                <li>
                  CSS in JS
                  <em className="text-sm">(emotion, styled components..)</em>
                </li>
              </ul>
              <ListHeader> Testing</ListHeader>
              <ul className="mt-1">
                <li>
                  E2E <em className="text-sm">(Playwright, Cypress..)</em>
                </li>
                <li>
                  Unit tests <em className="text-sm">(Vitest, Jest..)</em>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="familiarTools" className="pl-1">
              <ListHeader> Languages </ListHeader>
              <ul className="mt-1">
                <li> C# </li>
                <li> Python </li>
                <li> Bash</li>
              </ul>
              <ListHeader> CI/CD</ListHeader>
              <ul className="mt-1">
                <li> Github </li>
                <li> Jenkins</li>
              </ul>
              <ListHeader> IDE </ListHeader>
              <ul className="mt-1">
                <li> Neovim </li>
                <li> VSCode</li>
              </ul>
            </TabsContent>
            <TabsContent value="learningInterests" className="pl-1">
              <ListHeader> Languages </ListHeader>
              <ul className="mt-1">
                <li> Rust</li>
                <li> C++</li>
              </ul>
            </TabsContent>
          </Tabs>
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/kristoffer-kirkerud/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInLogoIcon height={40} width={40} />
            </a>
            <a
              href="https://github.com/kirkrd"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubLogoIcon height={40} width={40} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
