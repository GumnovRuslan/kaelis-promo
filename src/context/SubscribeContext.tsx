"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useLocale } from "next-intl";
import type { ArchetypeKey } from "@/types/ArchetypeKey";

type TSubscribeStatus = "loading" | "success" | "updated" | "already" | "error" | null;

type TSubscribeMode = "full" | "simple";

type TSubscribeContext = {
  email: string;
  isUpdate: boolean;
  isPractices: boolean;
  archetypeType: string;
  status: TSubscribeStatus;

  setStatus: (v: TSubscribeStatus) => void;
  setEmail: (v: string) => void;
  setIsUpdate: (v: boolean) => void;
  setIsPractices: (v: boolean) => void;
  setArchetypeType: (v: ArchetypeKey) => void;

  submit: (e: React.FormEvent, mode?: TSubscribeMode) => Promise<void>;
};

const SubscribeContext = createContext<TSubscribeContext | null>(null);

export function SubscribeProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [isPractices, setIsPractices] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [archetypeType, setArchetypeType] = useState<ArchetypeKey>("A");
  const [status, setStatus] = useState<TSubscribeStatus>(null);
  const language = useLocale();

  const archetypeKey: Record<ArchetypeKey, string> = {
    A: "MAG",
    B: "WAR",
    C: "SAG",
    D: "LOV",
    E: "CRE",
    F: "GUD",
    G: "EXP",
  };

  const submit = async (e: React.FormEvent, mode: TSubscribeMode = "full") => {
    e.preventDefault();
    setStatus("loading");

    const payload =
      mode === "simple"
        ? {
            mode: "simple",
            email,
            language,
          }
        : {
            mode: "full",
            email,
            consent_site_updates: isUpdate,
            consent_release_promo: isPractices,
            archetype_key: archetypeKey[archetypeType] ?? null,
            archetype_version: archetypeType,
            language,
            source: "archetype_test_v1",
          };

    const res = await fetch("/api/subscribes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
        isUpdate,
        isPractices,
        archetypeType,
        status,
        setStatus,
        setEmail,
        setIsUpdate,
        setIsPractices,
        setArchetypeType,
        submit,
      }}
    >
      {children}
    </SubscribeContext.Provider>
  );
}

export function useSubscribe() {
  const ctx = useContext(SubscribeContext);
  if (!ctx) throw new Error("useSubscribe must be used inside <SubscribeProvider>");
  return ctx;
}
