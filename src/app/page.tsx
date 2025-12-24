"use client";
import { Page } from "@/components/Layout";
import s from "./page.module.scss";
import { Hero } from "@/sections/Hero/Hero";
import PatternStorySection from "@/sections/PatternStorySection/PatternStorySection";

export default function Home() {
  return (
    <Page className={s.page}>
      <Hero />
      {/* <PatternStorySection /> */}
    </Page>
  );
}
