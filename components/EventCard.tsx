import Link from "next/link";
import Image from "next/image";
import { Event } from "@/lib/constants";
import SpotlightCard from "./SpotlightCard";

const EventCard = ({ title, image, slug, location, date, time }: Event) => {
  return (
    <SpotlightCard spotlightColor="rgba(0, 240, 255, 0.25)">
      <Link href={`/events/${slug}`} id="event-card">
        <Image
          src={image}
          alt={title}
          width={410}
          height={300}
          className="poster"
        />
        <p className="title">{title}</p>
        <div className="flex flex-row gap-2">
          <Image src={"/icons/pin.svg"} alt="pin" width={16} height={16} />
          <p className=" ml-1">{location}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Image
            src={"/icons/calendar.svg"}
            alt="calendar"
            width={16}
            height={16}
          />
          <p>{date}</p>
          <Image src={"/icons/clock.svg"} alt="click" width={16} height={16} />
          <p>{time}</p>
        </div>
      </Link>
    </SpotlightCard>
  );
};

export default EventCard;
