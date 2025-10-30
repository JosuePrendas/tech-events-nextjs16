import AnimatedContent from "@/components/AnimatedContent";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import FadeContent from "@/components/FadeContent";
import LogoLoop from "@/components/LogoLoop";
import ShinyText from "@/components/ShinyText";
import SplitText from "@/components/SplitText";
import { Event, events } from "@/lib/constants";
// import {
//   SiReact,
//   SiNextdotjs,
//   SiTypescript,
//   SiTailwindcss,
// } from "react-icons/si";

// const techLogos = [
//   { node: <SiReact />, title: "React", href: "https://react.dev" },
//   { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
//   {
//     node: <SiTypescript />,
//     title: "TypeScript",
//     href: "https://www.typescriptlang.org",
//   },
//   {
//     node: <SiTailwindcss />,
//     title: "Tailwind CSS",
//     href: "https://tailwindcss.com",
//   },
// ];

const Home = () => {
  return (
    <section>
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={1}
        ease="ease1.in"
        initialOpacity={0.0}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <h1 className="text-center">
          The Hub for Every Tech <br /> Event You Can&apos;t Miss
        </h1>
        <p className="text-center mt-5">
          Hackathons, Conferences, and Meetups, All in one place
        </p>
      </AnimatedContent>
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={1}
        ease="ease1.in"
        initialOpacity={0.0}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.5}
      >
        <ExploreBtn />
      </AnimatedContent>

      <FadeContent
        blur={false}
        delay={1500}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="mt-20 space-y-5">
          <h3>Featured Events</h3>
          <div id="events" className="events">
            {events.map((event: Event, index: number) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </FadeContent>

      {/* <div className="relative overflow-hidden rounded-full mt-10">
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={58}
          gap={250}
          pauseOnHover
          scaleOnHover
          // fadeOut
          fadeOutColor="#00f0ff40"
          ariaLabel="Technology partners"
        />
      </div> */}
    </section>
  );
};

export default Home;
