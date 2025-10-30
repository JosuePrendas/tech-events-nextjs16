export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "Next.js Conf",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA, USA",
    date: "March 10–11, 2026",
    time: "09:00 AM – 05:00 PM PT",
  },
  {
    title: "React Summit",
    image: "/images/event2.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 3–4, 2026",
    time: "09:00 AM – 06:00 PM CEST",
  },
  {
    title: "Google I/O",
    image: "/images/event3.png",
    slug: "google-io-2026",
    location: "Mountain View, CA, USA (hybrid)",
    date: "May 14–16, 2026",
    time: "09:00 AM – 05:30 PM PT",
  },
  {
    title: "JSConf EU",
    image: "/images/event4.png",
    slug: "jsconf-eu-2026",
    location: "Berlin, Germany",
    date: "May 21–22, 2026",
    time: "10:00 AM – 06:00 PM CEST",
  },
  {
    title: "KubeCon + CloudNativeCon",
    image: "/images/event5.png",
    slug: "kubecon-2026",
    location: "Chicago, IL, USA",
    date: "November 2–5, 2026",
    time: "08:30 AM – 05:00 PM CT",
  },
  {
    title: "HackMIT",
    image: "/images/event6.png",
    slug: "hackmit-2026",
    location: "Cambridge, MA, USA (in-person & virtual)",
    date: "January 24–25, 2026",
    time: "10:00 AM – 11:59 PM ET",
  },
];
