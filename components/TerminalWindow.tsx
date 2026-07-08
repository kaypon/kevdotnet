"use client";

import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

type Line = { id: number; node: ReactNode };

let uid = 0;
const mkLine = (node: ReactNode): Line => ({ id: uid++, node });

const PAGES: Record<string, string> = {
  van: "/van",
  home: "/",
  "/": "/",
  now: "/now",
  info: "/info",
  projects: "/projects",
  contact: "/contact",
  terminal: "/terminal",
};

function Ln({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={`term-line${className ? ` ${className}` : ""}`}>{children ?? " "}</div>;
}

function PromptEcho({ command }: { command: string }) {
  return (
    <div className="term-line term-line--prompt">
      <span className="term-sym">➜</span>
      <span className="term-path"> ~ </span>
      <span>{command}</span>
    </div>
  );
}

function runCommand(
  raw: string,
  router: ReturnType<typeof useRouter>,
  setLines: React.Dispatch<React.SetStateAction<Line[]>>,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>,
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
) {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const push = (...nodes: ReactNode[]) => {
    setLines((prev) => [...prev, ...nodes.map(mkLine)]);
  };

  const commit = () => {
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");
  };

  if (!trimmed) { commit(); return; }

  push(<PromptEcho command={trimmed} />);

  switch (cmd) {
    case "help":
      push(
        <Ln />,
        <Ln><span className="term-green">commands</span></Ln>,
        <Ln />,
        <Ln>{"  "}help<span className="term-dim">          →  show this message</span></Ln>,
        <Ln>{"  "}clear<span className="term-dim">         →  clear the screen</span></Ln>,
        <Ln>{"  "}ls<span className="term-dim">            →  list all pages</span></Ln>,
        <Ln>{"  "}whoami<span className="term-dim">        →  who is kevin</span></Ln>,
        <Ln>{"  "}date<span className="term-dim">          →  current date & time</span></Ln>,
        <Ln>{"  "}echo <span className="term-cyan">[text]</span><span className="term-dim">   →  print text</span></Ln>,
        <Ln>{"  "}cat <span className="term-cyan">[file]</span><span className="term-dim">    →  read a file</span></Ln>,
        <Ln>{"  "}neofetch<span className="term-dim">      →  system info</span></Ln>,
        <Ln>{"  "}goto <span className="term-cyan">[page]</span><span className="term-dim">   →  navigate</span></Ln>,
        <Ln>{"  "}exit<span className="term-dim">          →  back to /van</span></Ln>,
        <Ln />,
      );
      break;

    case "clear":
      setLines([]);
      commit();
      return;

    case "ls":
      push(
        <Ln />,
        <Ln><span className="term-green">van</span><span className="term-dim">         poster, home base</span></Ln>,
        <Ln><span className="term-green">home</span><span className="term-dim">        landing / intro animation</span></Ln>,
        <Ln><span className="term-green">now</span><span className="term-dim">         what kevin&apos;s doing right now</span></Ln>,
        <Ln><span className="term-green">info</span><span className="term-dim">        about kevin</span></Ln>,
        <Ln><span className="term-green">projects</span><span className="term-dim">    things being built</span></Ln>,
        <Ln><span className="term-green">contact</span><span className="term-dim">     get in touch</span></Ln>,
        <Ln><span className="term-green">terminal</span><span className="term-dim">    you are here</span></Ln>,
        <Ln />,
        <Ln><span className="term-dim">goto <span className="term-green">[page]</span> to navigate</span></Ln>,
        <Ln />,
      );
      break;

    case "whoami":
      push(
        <Ln />,
        <Ln>kevin van der poll</Ln>,
        <Ln><span className="term-dim">──────────────────</span></Ln>,
        <Ln>builder & artist based in miami.</Ln>,
        <Ln>born in south africa, raised in johannesburg.</Ln>,
        <Ln />,
        <Ln>code and art speak the same language.</Ln>,
        <Ln>a tool is an instrument. a screen is a canvas.</Ln>,
        <Ln />,
        <Ln>always making something — code, AI tools, visuals,</Ln>,
        <Ln>objects, experiments. most of it lives somewhere</Ln>,
        <Ln>between useful and strange.</Ln>,
        <Ln />,
        <Ln><span className="term-dim">→ <span className="term-green">goto info</span> to read more</span></Ln>,
        <Ln />,
      );
      break;

    case "date":
      push(
        <Ln />,
        <Ln>{new Date().toString().replace(/\s*\(.*\)\s*$/, "")}</Ln>,
        <Ln />,
      );
      break;

    case "echo":
      push(<Ln>{args.join(" ")}</Ln>);
      break;

    case "cat": {
      const file = args[0];
      if (file === "bio.txt" || file === "about.txt") {
        push(
          <Ln />,
          <Ln>Kevin van der Poll is a builder and artist based in Miami.</Ln>,
          <Ln>Born in South Africa and raised in Johannesburg, he is always</Ln>,
          <Ln>making something.</Ln>,
          <Ln />,
          <Ln>The through-line goes back to a kid editing MySpace profiles —</Ln>,
          <Ln>changing layouts, finding loopholes, breaking things just enough</Ln>,
          <Ln>to understand them. Everything since has followed the same pattern:</Ln>,
          <Ln>get inside the system, learn its rules, bend them into something</Ln>,
          <Ln>personal.</Ln>,
          <Ln />,
          <Ln>Right now that means shipping software for people with actual work</Ln>,
          <Ln>to do, prototyping AI tooling, and treating design as an extension</Ln>,
          <Ln>of the same instinct.</Ln>,
          <Ln />,
        );
      } else if (!file) {
        push(<Ln><span className="term-err">cat: missing file operand</span></Ln>);
      } else {
        push(
          <Ln><span className="term-err">cat: {file}: no such file or directory</span></Ln>,
          <Ln><span className="term-dim">try: cat bio.txt</span></Ln>,
        );
      }
      break;
    }

    case "neofetch":
      push(
        <Ln />,
        <Ln>{"  "}▓{"  "}{"         "}{"  "}kevin@van</Ln>,
        <Ln>{"  "}▓▓{"         "}{"  "}<span className="term-dim">──────────────────</span></Ln>,
        <Ln>{"  "}▓ ▓{"        "}{"  "}OS<span className="term-dim">       VAN/OS 1.0.0</span></Ln>,
        <Ln>{"  "}▓  ▓{"       "}{"  "}HOST<span className="term-dim">     kevs.site</span></Ln>,
        <Ln>{"  "}▓   ▓{"      "}{"  "}SHELL<span className="term-dim">    zsh</span></Ln>,
        <Ln>{"  "}▓    ▓{"     "}{"  "}FONT<span className="term-dim">     DejaVu Sans Mono</span></Ln>,
        <Ln>{"  "}▓     ▓{"    "}{"  "}THEME<span className="term-dim">    halftone-dark</span></Ln>,
        <Ln>{"             "}{"  "}DOTS<span className="term-dim">     9 halftone treatments</span></Ln>,
        <Ln>{"             "}{"  "}LOC<span className="term-dim">      miami, fl</span></Ln>,
        <Ln>{"             "}{"  "}ORIGIN<span className="term-dim">   johannesburg, za</span></Ln>,
        <Ln>{"             "}{"  "}STATUS<span className="term-dim">   always building</span></Ln>,
        <Ln />,
      );
      break;

    case "goto":
    case "cd":
    case "open": {
      const target = args[0]?.toLowerCase().replace(/^\//, "");
      if (!target) {
        push(
          <Ln />,
          <Ln>usage: goto <span className="term-cyan">[page]</span></Ln>,
          <Ln />,
          <Ln>pages: <span className="term-green">van  home  now  info  projects  contact  terminal</span></Ln>,
          <Ln />,
        );
      } else if (target === "terminal") {
        push(<Ln><span className="term-dim">you&apos;re already here.</span></Ln>);
      } else if (PAGES[target]) {
        push(<Ln><span className="term-dim">→ navigating to <span className="term-green">/{target}</span>…</span></Ln>);
        commit();
        setTimeout(() => router.push(PAGES[target]), 500);
        return;
      } else {
        push(
          <Ln><span className="term-err">goto: {target}: page not found</span></Ln>,
          <Ln><span className="term-dim">run <span className="term-green">ls</span> to see available pages</span></Ln>,
        );
      }
      break;
    }

    case "exit":
    case "back":
    case "quit":
      push(<Ln><span className="term-dim">→ returning to <span className="term-green">/van</span>…</span></Ln>);
      commit();
      setTimeout(() => router.push("/van"), 500);
      return;

    default:
      push(
        <Ln><span className="term-err">zsh: command not found: {cmd}</span></Ln>,
        <Ln><span className="term-dim">type <span className="term-green">help</span> for available commands</span></Ln>,
      );
  }

  commit();
}

export function TerminalWindow() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<Line[]>(() => {
    const date = new Date().toString().replace(/\s*\(.*\)\s*$/, "");
    return [
      mkLine(<Ln><span className="term-dim">Last login: {date} on ttys000</span></Ln>),
      mkLine(<Ln><span className="term-dim">type <span className="term-green">help</span> to see available commands.</span></Ln>),
      mkLine(<Ln />),
    ];
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input, router, setLines, setHistory, setHistoryIndex, setInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      if (history[idx] !== undefined) {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "c" && e.ctrlKey) {
      setInput("");
      setHistoryIndex(-1);
      setLines((prev) => [...prev, mkLine(<Ln>^C</Ln>)]);
    }
  };

  return (
    <div className="term-window" onClick={() => inputRef.current?.focus()}>
      <div className="term-handle">
        <div className="term-btns">
          <button className="term-btn term-btn--close" aria-label="close" onClick={() => router.push("/van")} />
          <button className="term-btn term-btn--min" aria-label="minimize" />
          <button className="term-btn term-btn--max" aria-label="maximize" />
        </div>
        <span className="term-title">kevin@van: ~ (zsh)</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((line) => (
          <div key={line.id}>{line.node}</div>
        ))}
        <div className="term-input-row">
          <span className="term-sym">➜</span>
          <span className="term-path"> ~ </span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => { setInput(e.target.value); setHistoryIndex(-1); }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  );
}
