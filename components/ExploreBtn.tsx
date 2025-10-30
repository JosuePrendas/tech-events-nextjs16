"use client";

import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";

const ExploreBtn = () => {
  const scrollToEvents = () => {
    const el = document.getElementById("events");
    if (!el) return;
    const top = el.getBoundingClientRect().top - 130;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={scrollToEvents}
    >
      {/* <a href="#events"> */}
      Explore Events
      <AnimatedContent
        distance={-10}
        direction="vertical"
        reverse={false}
        duration={1}
        ease="bounce.out"
        initialOpacity={0.0}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={1.5}
      >
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </AnimatedContent>
      {/* </a> */}
    </button>
  );
};

export default ExploreBtn;
