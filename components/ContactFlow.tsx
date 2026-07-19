"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { contactFormAction, contactSteps } from "@/lib/contact-form";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "answering" | "sending" | "sent" | "failed";

export function ContactFlow({ onDone }: { onDone?: () => void } = {}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => contactSteps.map(() => ""));
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("answering");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const current = contactSteps[step];
  const total = contactSteps.length;

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const setAnswer = (value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === step ? value : a)));
    if (error) setError(null);
  };

  const submitAll = async (finalAnswers: string[]) => {
    // Honeypot filled -> a bot; pretend everything worked, post nothing.
    if (honeypotRef.current?.value) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const data = new FormData();
      contactSteps.forEach(({ entry }, i) => {
        if (finalAnswers[i]) data.append(entry, finalAnswers[i]);
      });
      // The formResponse endpoint doesn't do CORS; the opaque response is
      // invisible to us, so a completed fetch counts as delivered.
      await fetch(contactFormAction, { method: "POST", mode: "no-cors", body: data });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const advance = (skip = false) => {
    const value = skip ? "" : answers[step].trim();

    if (!skip && !current.optional && current.inputType === "email" && !EMAIL_RE.test(value)) {
      setError("that doesn't look like an email — try again.");
      return;
    }

    const nextAnswers = answers.map((a, i) => (i === step ? value : a));
    setAnswers(nextAnswers);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      void submitAll(nextAnswers);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    advance();
  };

  if (status === "sent") {
    return (
      <div className="contact-flow" aria-live="polite">
        <p className="contact-flow__done">Message sent. Talk soon.</p>
        {onDone ? (
          <button type="button" className="contact-flow__btn contact-flow__btn--quiet" onClick={onDone}>
            [ close ]
          </button>
        ) : (
          <p>
            <Link href="/van" className="contact-flow__backlink">← van</Link>
          </p>
        )}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="contact-flow" aria-live="polite">
        <p className="contact-flow__done">Hmm — that didn&apos;t go through.</p>
        <p>
          <button type="button" className="contact-flow__btn" onClick={() => void submitAll(answers)}>
            [ try again ]
          </button>
        </p>
      </div>
    );
  }

  const isLast = step === total - 1;

  return (
    <form className="contact-flow" onSubmit={handleSubmit} aria-live="polite" noValidate>
      <p className="contact-flow__counter">
        {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        {current.optional && <span className="contact-flow__optional"> · optional</span>}
      </p>

      <label className="contact-flow__question" htmlFor="contact-flow-input">
        {current.question}
      </label>

      {current.inputType === "textarea" ? (
        <textarea
          id="contact-flow-input"
          ref={(el) => { inputRef.current = el; }}
          className="contact-flow__input contact-flow__input--area"
          value={answers[step]}
          placeholder={current.placeholder}
          rows={3}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              advance();
            }
          }}
        />
      ) : (
        <input
          id="contact-flow-input"
          ref={(el) => { inputRef.current = el; }}
          className="contact-flow__input"
          type={current.inputType === "email" ? "email" : "text"}
          value={answers[step]}
          placeholder={current.placeholder}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="contact-flow__hp"
      />

      {error && <p className="contact-flow__error">{error}</p>}

      <div className="contact-flow__controls">
        {step > 0 && (
          <button type="button" className="contact-flow__btn contact-flow__btn--quiet" onClick={() => setStep(step - 1)}>
            ← back
          </button>
        )}
        <button type="submit" className="contact-flow__btn" disabled={status === "sending"}>
          {status === "sending" ? "[ sending… ]" : isLast ? "[ send ]" : "[ next ]"}
        </button>
        {current.optional && (
          <button type="button" className="contact-flow__btn contact-flow__btn--quiet" onClick={() => advance(true)}>
            [ skip ]
          </button>
        )}
      </div>
    </form>
  );
}
