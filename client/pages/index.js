import CategorySection from "@/components/Home/CategorySection";
import Hero from "@/components/Home/Hero";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Learning Course</title>
      </Head>

      <Hero />

      <CategorySection />
    </>
  );
}
