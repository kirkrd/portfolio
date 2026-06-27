import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import type { MetaFunction } from "@remix-run/node";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import Header from "~/components/header";
import { Section } from "~/components/section/section";
import SectionHeader from "~/components/section-header";
import Timeline from "~/components/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { FadeInOnView } from "~/components/ui/fade-into-view";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Pill, PillType } from "~/components/ui/pill";
import { PillHeader } from "~/components/ui/pill-header";
import { jobItems } from "~/lib/constants";
import { useIsMobile } from "~/lib/hooks/use-is-mobile";

export const meta: MetaFunction = () => [
  { title: "Kristoffer Kirkerud | Kirkerud Development" },
  {
    name: "description",
    content:
      "Portfolio of Kirkerud Development — Senior Software Engineer / Solution Architect at Consid AB, building SaaS applications on the side.",
  },
];

export default function Index() {
  const isMobile = useIsMobile();
  const [showEmploylerCard, setShowEmployerCard] = useState(false);
  return (
    <main className="grid gap-9 p-5">
      <Header />
      <Section>
        <Avatar>
          <AvatarImage src="./avatar.jpg" alt="@kirkrd" />
        </Avatar>
        <div>
          Senior Software Engineer / Solution Architect at{" "}
          <HoverCard openDelay={4000} open={showEmploylerCard}>
            <HoverCardTrigger
              asChild
              onFocus={() => {
                setShowEmployerCard((previous) => !previous);
              }}
              onBlur={() => {
                setShowEmployerCard(false);
              }}
              onMouseOver={() => !isMobile && setShowEmployerCard(true)}
              onMouseOut={() => !isMobile && setShowEmployerCard(false)}
            >
              <Button className="px-1.5" variant="link">
                Consid AB
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 max-w-md">
              <div className="flex justify-between space-x-2">
                <Avatar>
                  <AvatarImage src="https://cms.consid.net/wp-content/uploads/2020/02/consid.se_logo-2.svg" />
                  <AvatarFallback>CA</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Consid AB</h4>
                  <p className="text-sm">
                    One of the Nordic region&apos;s leading tech consultancies,
                    helping organisations build sustainable digital solutions
                    through system development, design, and business insight.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined June 2026
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </Section>
      <Section>
        <SectionHeader> About </SectionHeader>
        <p>
          I&apos;ve been a developer for many years — an enthusiast about tech,
          passionate about creating great user experiences and bringing ideas to
          life. Today I work as Senior Software Engineer / Solution Architect at{" "}
          <a
            href="https://www.consid.com/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Consid AB
          </a>
          , one of the Nordic region&apos;s leading tech consultancies, where I
          help clients design and deliver digital solutions that combine
          technical depth with real business value.
        </p>
        <p>
          I consider myself fullstack in the way I am open to every tech thrown
          at me — not afraid to jump in and learn whatever tool solves the
          problem at hand, whether that means shaping architecture, leading
          delivery, or writing the code myself.
        </p>
      </Section>

      <Section>
        <SectionHeader>Skills</SectionHeader>
        <div className="space-y-4">
          <div>
            <PillHeader title="Languages" />
            <FadeInOnView delay={0.5}>
              <div className="flex flex-wrap gap-2">
                <Pill delay={0.1} type={PillType.Languages}>
                  JavaScript
                </Pill>
                <Pill delay={0.5} type={PillType.Languages}>
                  Typescript
                </Pill>
                <Pill delay={1.0} type={PillType.Languages}>
                  C#
                </Pill>
                <Pill delay={1.5} type={PillType.Languages}>
                  Python
                </Pill>
              </div>
            </FadeInOnView>
          </div>
          <div>
            <PillHeader title="Frameworks" />
            <FadeInOnView delay={0.7}>
              <div className="flex flex-wrap gap-2">
                <Pill delay={0.1} type={PillType.Frameworks}>
                  React
                </Pill>
                <Pill delay={0.5} type={PillType.Frameworks}>
                  Node.js
                </Pill>
              </div>
            </FadeInOnView>
          </div>

          <div>
            <PillHeader title="Tools" />
            <FadeInOnView delay={0.9}>
              <div className="flex flex-wrap gap-2">
                <Pill delay={0.1} type={PillType.Tools}>
                  Git
                </Pill>
                <Pill delay={0.5} type={PillType.Tools}>
                  DynamoDB
                </Pill>
                <Pill delay={1.0} type={PillType.Tools}>
                  Azure DevOps
                </Pill>
                <Pill delay={1.5} type={PillType.Tools}>
                  Splunk
                </Pill>
                <Pill delay={2.0} type={PillType.Tools}>
                  Datadog
                </Pill>
              </div>
            </FadeInOnView>
          </div>
          <div>
            <PillHeader title="Cloud/Infrastructure" />
            <FadeInOnView delay={1.1}>
              <div className="flex flex-wrap gap-2">
                <Pill delay={0.1} type={PillType.Infrastructure}>
                  AWS
                </Pill>
                <Pill delay={0.5} type={PillType.Infrastructure}>
                  Azure
                </Pill>
                <Pill delay={1.0} type={PillType.Infrastructure}>
                  Github
                </Pill>
                <Pill delay={1.5} type={PillType.Infrastructure}>
                  Terraform
                </Pill>
                <Pill delay={2.0} type={PillType.Infrastructure}>
                  Docker
                </Pill>
                <Pill delay={2.5} type={PillType.Infrastructure}>
                  OpenShift
                </Pill>
                <Pill delay={3.0} type={PillType.Infrastructure}>
                  ArgoCD
                </Pill>
              </div>
            </FadeInOnView>
          </div>

          <div>
            <PillHeader title="Architecture" />
            <FadeInOnView delay={1.3}>
              <div className="flex flex-wrap gap-2">
                <Pill delay={0.1} type={PillType.Architecture}>
                  Microservices
                </Pill>
                <Pill delay={0.5} type={PillType.Architecture}>
                  Event Driven
                </Pill>
                <Pill delay={1.0} type={PillType.Architecture}>
                  Serverless
                </Pill>
                <Pill delay={1.5} type={PillType.Architecture}>
                  Mono repositories
                </Pill>
              </div>
            </FadeInOnView>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader>Career</SectionHeader>
        <Timeline jobs={jobItems} />
      </Section>

      <Section>
        <SectionHeader>Kirkerud Development</SectionHeader>
        <p>
          Kirkerud Development is a company I started to build SaaS applications
          in my spare time — turning ideas into products outside of my
          day-to-day consulting work.
        </p>
        <p className="text-muted-foreground">
          Stay tuned for updates on my personal projects.
        </p>
      </Section>

      <Section>
        <div className="flex gap-2">
          <a
            href="https://www.linkedin.com/in/kristoffer-kirkerud/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInLogoIcon height={40} width={40} />
          </a>
          <a href="https://github.com/kirkrd" target="_blank" rel="noreferrer">
            <GitHubLogoIcon height={40} width={40} />
          </a>
        </div>
      </Section>
    </main>
  );
}
