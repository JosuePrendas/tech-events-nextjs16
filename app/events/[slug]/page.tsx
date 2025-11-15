import BookEvent from "@/components/BookEvent";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL environment variable is required");
}

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag, index) => (
      <div className="pill" key={index}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const BOOKINGS = 10;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);

  if (!response.ok) {
    return notFound();
  }
  const {
    event: {
      title,
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      organizer,
      tags,
    },
  } = await response.json();

  if (!title) return notFound();

  return (
    <section id="event">
      <div className="header">
        <h1 className="pb-2">{title}</h1>
        <p className="mt-2">{description}</p>
      </div>

      <div className="details">
        {/* Left side - event content */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="Calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="Location"
              label={location}
            />
            <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="Audience"
              label={audience}
            />
          </section>

          {agenda && agenda.length > 0 && <EventAgenda agendaItems={agenda} />}

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          {tags && tags.length > 0 && <EventTags tags={tags} />}
        </div>
        {/* Right side - booking form */}
        <aside className="booking">
          <div className="signup-card">
            <h2 className="text-lg font-semibold">Book Your Spot</h2>
            {BOOKINGS > 0 ? (
              <p className="text-sm">
                Join {BOOKINGS} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
