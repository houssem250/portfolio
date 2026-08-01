"use client";

import * as React from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { contactDescription, contactHeading, contactLinks } from "@/content/contact";
import { SOCIAL } from "@/lib/social";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { Button } from "@/components/ui/button";

type TopicId = "job" | "collaboration" | "technical" | "hello";
type Stage = "intro" | "topic";

type TopicCopy = {
  face: "idle" | "happy" | "cool" | "kind";
  message: string;
};

const topicChoices: Array<{ id: TopicId; label: string }> = [
  { id: "job", label: "Job opportunity" },
  { id: "collaboration", label: "Collaboration" },
  { id: "technical", label: "Technical discussion" },
  { id: "hello", label: "Just saying hello" },
];

const topicCopy: Record<TopicId, TopicCopy> = {
  job: {
    face: "happy",
    message:
      "Awesome!\n\nI'm always interested in discussing interesting software engineering roles.",
  },
  collaboration: {
    face: "kind",
    message:
      "Sounds interesting.\n\nWhether it's open source, freelancing, research, or building something fun...\n\nLet's talk.",
  },
  technical: {
    face: "cool",
    message:
      "Nice.\n\nI enjoy talking about\n\n• Software Architecture\n• DevOps\n• Cloud\n• AI\n• Android\n• Web Engineering\n\nCoffee optional.",
  },
  hello: {
    face: "kind",
    message:
      "Hello!\n\nThanks for visiting my portfolio.\n\nHope you enjoy exploring it.",
  },
};

const faceFrames: Record<
  "idle" | "happy" | "cool" | "kind",
  { open: string; blink: string; talk: [string, string] }
> = {
  idle: {
    open: "(•‿•)",
    blink: "(-‿-)",
    talk: ["(•‿•)", "(•o•)"],
  },
  happy: {
    open: "(≧▽≦)",
    blink: "(≧◡≦)",
    talk: ["(≧▽≦)", "(≧◕◡◕≦)"],
  },
  cool: {
    open: "(⌐■_■)",
    blink: "(⌐-_-)",
    talk: ["(⌐■_■)", "(⌐■‿■)"],
  },
  kind: {
    open: "(｡◕‿◕｡)",
    blink: "(｡-‿-｡)",
    talk: ["(｡◕‿◕｡)", "(｡◕ᴗ◕｡)"],
  },
};

export function Contact() {
  const [stage, setStage] = React.useState<Stage>("intro");
  const [selectedTopic, setSelectedTopic] = React.useState<TopicId | null>(null);
  const [typedText, setTypedText] = React.useState("");
  const [isBlinking, setIsBlinking] = React.useState(false);
  const [mouthFrame, setMouthFrame] = React.useState<0 | 1>(0);
  const typingTimerRef = React.useRef<number | null>(null);
  const blinkTimerRef = React.useRef<number | null>(null);
  const blinkPulseRef = React.useRef<number | null>(null);
  const mouthTimerRef = React.useRef<number | null>(null);

  const activeMessage =
    stage === "intro" ? "What brings you here?" : topicCopy[selectedTopic ?? "hello"].message;

  const activeFace = stage === "intro" ? "idle" : topicCopy[selectedTopic ?? "hello"].face;

  React.useEffect(() => {
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    setTypedText("");

    let index = 0;
    typingTimerRef.current = window.setInterval(() => {
      index += 1;
      setTypedText(activeMessage.slice(0, index));

      if (index >= activeMessage.length) {
        window.clearInterval(typingTimerRef.current ?? undefined);
        typingTimerRef.current = null;
      }
    }, 20);

    return () => {
      if (typingTimerRef.current !== null) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [activeMessage]);

  React.useEffect(() => {
    if (mouthTimerRef.current !== null) {
      window.clearInterval(mouthTimerRef.current);
      mouthTimerRef.current = null;
    }

    if (typedText.length === 0 || typedText.length < activeMessage.length) {
      mouthTimerRef.current = window.setInterval(() => {
        setMouthFrame((currentFrame) => (currentFrame === 0 ? 1 : 0));
      }, 240);
    } else {
      setMouthFrame(0);
    }

    return () => {
      if (mouthTimerRef.current !== null) {
        window.clearInterval(mouthTimerRef.current);
        mouthTimerRef.current = null;
      }
    };
  }, [activeMessage.length, typedText.length]);

  React.useEffect(() => {
    const scheduleBlink = () => {
      const delay = 4000 + Math.random() * 4000;
      blinkTimerRef.current = window.setTimeout(() => {
        setIsBlinking(true);
        blinkPulseRef.current = window.setTimeout(() => {
          setIsBlinking(false);
        }, 160);
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();

    return () => {
      if (blinkTimerRef.current !== null) {
        window.clearTimeout(blinkTimerRef.current);
        blinkTimerRef.current = null;
      }
      if (blinkPulseRef.current !== null) {
        window.clearTimeout(blinkPulseRef.current);
        blinkPulseRef.current = null;
      }
    };
  }, []);

  const handleTopicSelect = (topic: TopicId) => {
    setSelectedTopic(topic);
    setStage("topic");
  };

  const isMessageComplete = typedText.length >= activeMessage.length;
  const faceLines = faceFrames[activeFace][isBlinking ? "blink" : "open"];
  const talkingFaceLines = faceFrames[activeFace].talk[mouthFrame];
  const faceAscii = typedText.length < activeMessage.length ? talkingFaceLines : faceLines;

  const disabledEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <SectionContainer id="contact">
      <SectionHeader
        title="Contact"
        subtitle="If you have an opportunity, collaboration idea, or question, I’d like to hear from you."
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h3 className="text-2xl font-semibold text-foreground">{contactHeading}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{contactDescription}</p>

          <div className="mt-8 space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="flex items-center justify-between rounded-2xl border border-border/50 bg-muted/30 px-4 py-3 text-sm transition-colors hover:bg-muted/60"
              >
                <span className="font-medium text-foreground">{link.label}</span>
                <span className="text-muted-foreground">{link.value}</span>
              </a>
            ))}
          </div>
        </Card>

        {false ? (
          <Card>
            <form className="flex flex-col gap-6" onSubmit={disabledEmailSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                  <span>Name</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                  <span>Email</span>
                  <input
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                <span>Message</span>
                <textarea
                  className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
                  placeholder="Tell me a bit about the opportunity or collaboration."
                  rows={6}
                />
              </label>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">I usually reply through email or LinkedIn.</p>
                <Button size="lg" className="w-full sm:w-auto" type="submit">
                  <Mail className="size-4" />
                  Send
                </Button>
              </div>
            </form>
          </Card>
        ) : null}

        <Card>
          <div className="flex h-full min-h-[32rem] flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">NPC Conversation</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">Software Engineer</h3>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">
                {isMessageComplete ? "Online" : "Typing..."}
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[2rem] border border-border/60 bg-background/80 p-4 shadow-sm">
              <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center gap-2 rounded-[1.5rem] border border-border/60 bg-muted/30 px-2 py-3">
                <span className="whitespace-nowrap font-mono text-lg text-foreground">{faceAscii}</span>
              </div>

              <div className="h-56 flex-1 overflow-y-auto rounded-[1.75rem] border border-border/60 bg-muted/20 px-4 py-4">
                <p className="whitespace-pre-line font-mono text-sm leading-7 text-foreground">
                  {typedText}
                  {typedText.length < activeMessage.length ? (
                    <span className="ml-0.5 inline-block animate-pulse text-foreground">█</span>
                  ) : null}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Choose a path</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {topicChoices.map((choice) => {
                  const isSelected = selectedTopic === choice.id;
                  const isDisabled = selectedTopic !== null && !isSelected;

                  return (
                    <Button
                      key={choice.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="lg"
                      className="justify-between rounded-2xl px-4 py-3 text-left"
                      disabled={isDisabled}
                      onClick={() => handleTopicSelect(choice.id)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{isSelected ? <Check className="size-4" /> : "○"}</span>
                        <span>{choice.label}</span>
                      </span>
                      <ArrowRight className="size-4 opacity-70" />
                    </Button>
                  );
                })}
              </div>
            </div>

          </div>
        </Card>
      </div>
    </SectionContainer>
  );
}