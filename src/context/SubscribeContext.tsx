"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocale } from "next-intl";

type TSubscribeStatus = "loading" | "success" | "updated" | "already" | "error" | null;

type TSubscribeContext = {
  email: string;
  release: boolean;
  practices: boolean;
  practiceType: string;
  status: TSubscribeStatus;

  setEmail: (v: string) => void;
  setRelease: (v: boolean) => void;
  setPractices: (v: boolean) => void;
  setPracticeType: (v: string) => void;

  submit: (e: React.FormEvent) => Promise<void>;
};

const SubscribeContext = createContext<TSubscribeContext | null>(null);

export function SubscribeProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [release, setRelease] = useState(false);
  const [practices, setPractices] = useState(true);
  const [practiceType, setPracticeType] = useState("A");
  const [status, setStatus] = useState<TSubscribeStatus>(null);

  const locale = useLocale();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        receive_release: release,
        receive_practices: practices,
        practice_type: practiceType,
        language: locale,
      }),
    });

    const data = await res.json();

    if (data.status === "already") setStatus("already");
    else if (data.status === "updated") setStatus("updated");
    else if (data.status === "success") setStatus("success");
    else setStatus("error");
  };

  return (
    <SubscribeContext.Provider
      value={{
        email,
        release,
        practices,
        practiceType,
        status,
        setEmail,
        setRelease,
        setPractices,
        setPracticeType,
        submit,
      }}
    >
      {children}
    </SubscribeContext.Provider>
  );
}

// Hook
export function useSubscribe() {
  const ctx = useContext(SubscribeContext);
  if (!ctx) throw new Error("useSubscribe must be used inside <SubscribeProvider>");
  return ctx;
}