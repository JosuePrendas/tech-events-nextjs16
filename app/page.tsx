import AnimatedContent from "@/components/AnimatedContent";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import FadeContent from "@/components/FadeContent";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  "use cache";
  cacheLife("hours");

  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
  }

  let events: IEvent[] = [];
  let error: string | null = null;

  try {
    const response = await fetch(`${BASE_URL}/api/events`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch events: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.events)) {
      console.error("Invalid events payload received from /api/events", data);
      error = "Invalid events data received. Please try again later.";
    } else {
      events = data.events;
    }
  } catch (err) {
    console.error("Error fetching events from /api/events", err);
    error = "Unable to load events. Please try again later.";
  }

  return (
    <section>
      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}
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
            {events &&
              events.length > 0 &&
              events.map((event: IEvent, index: number) => (
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
