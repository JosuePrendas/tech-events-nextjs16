"use client";

import React, { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signin up!</p>
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
            />
          </div>
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
