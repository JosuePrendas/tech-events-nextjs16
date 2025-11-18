"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import React, { useState } from "react";
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitted || loading) return;

    setLoading(true);

    try {
      const { success } = await createBooking({ eventId, slug, email });

      if (success) {
        setSubmitted(true);
        posthog.capture("event_booked", { eventId, slug, email });
      } else {
        console.error("Booking creation failed");
        posthog.captureException("Booking creation failed");
      }
    } catch (error) {
      console.error("Error while creating booking", error);
      posthog.captureException("Error while creating booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex-col-gap-2">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={submitted || loading}
            />
          </div>
          <button
            type="submit"
            className="button-submit"
            disabled={submitted || loading}
          >
            {loading ? "Booking..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
