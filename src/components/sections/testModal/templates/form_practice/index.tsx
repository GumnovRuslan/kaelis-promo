"use client";
import styles from './styles.module.scss'
import { useState } from "react";
import { useLocale } from 'next-intl';
import { useSubscribe } from '@/context/SubscribeContext';

export default function SubscribeForm() {
    const {
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
  } = useSubscribe();

  // const submit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus("loading");

  //   const res = await fetch("/api/subscribes", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email,
  //       receive_release: release,
  //       receive_practices: practices,
  //       practice_type: practiceType,
  //       language: locale
  //     })
  //   });

  //   const data = await res.json();
  //   console.log(data)
  //   if (data.status === "already") setStatus("already");
  //   else if (data.status === "updated") setStatus("updated");
  //   else if (data.status === "success") setStatus("success");
  //   else setStatus("error");
  // };

  return (
    <form onSubmit={submit} className={styles.form}>
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
      <label>
        <input type="checkbox" checked={release} onChange={e=>setRelease(e.target.checked)} />
        Receive release emails
      </label>
      <label>
        <input type="checkbox" checked={practices} onChange={e=>setPractices(e.target.checked)} />
        Receive practices
      </label>

      <button type="submit">Subscribe</button>

      <div>Status: {status}</div>
    </form>
  );
}
