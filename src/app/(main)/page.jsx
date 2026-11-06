import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LatestReviews from "@/components/landing/LatestReviews";
import Container from "@/components/layout/Container";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container>
      <Hero/>
      <HowItWorks/>
      <Suspense fallback={null}>
        <LatestReviews/>
      </Suspense>
    </Container>
  );
}
