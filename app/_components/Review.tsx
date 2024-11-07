"use client";

import React from "react";
import AliceCarousel from "react-alice-carousel";
import { Star } from "lucide-react";
import "react-alice-carousel/lib/alice-carousel.css";

export default function ReviewSection() {
  const items = [
    <div
      key="review1"
      className="flex justify-center items-center h-full p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              fill="orange"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-lg mb-4">
          &quot;Great team of men made up of Omar, Hossain and Nicholas.
          Contacted them on Friday afternoon and thankfully they had a slot for
          me the next day. Needed them to replace 19 light switches in the house
          and they were done in slightly over 1.5hrs. Team was efficient, polite
          and friendly. Quality of work was also meticulous. They made sure
          everything was in good order before they left. I highly recommend them
          to anyone. :)&quot;
        </p>
        <p className="font-semibold">Pearl Tang</p>
      </div>
    </div>,
    <div
      key="review2"
      className="flex justify-center items-center h-full p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              fill="orange"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-lg mb-4">
          &quot;I was very pleased with the service provided. Amos has been very
          helpful through the phone. I had 3 sockets and 2 LED lights replaced
          in my kitchen and 2 LED ceiling lights installed in my bathroom. I
          called other companies and they told me they only available to come 3
          days later, while this company came to help me within 30mins, even
          though they are located in Ubi. Excellent service. I highly recommend
          this company to anyone looking for trustworthy and professional
          electricians to fix your electrical problems.&quot;
        </p>
        <p className="font-semibold">Leong Kiat Chin</p>
      </div>
    </div>,
    <div
      key="review3"
      className="flex justify-center items-center h-full p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              fill="orange"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-lg mb-4">
          &quot;Offers a very prompt and comprehensive set of services,
          including supply and installation of door lock sets, shower mixer tap,
          and LED ceiling lights. Very honest and proposed cost saving measures
          that other companies I checked didn&apos;t. Did not charge me
          additional transport cost even though they had to go out and source
          for another round of supplies to fit the settings of an older unit.
          Provided great after service, documenting all the services provided
          and gave a detailed accurate invoice. Would reach out again for future
          services.&quot;
        </p>
        <p className="font-semibold">Wan Ting</p>
      </div>
    </div>,
    <div
      key="review4"
      className="flex justify-center items-center h-full p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              fill="orange"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-lg mb-4">
          &quot;I engaged Repair.sg to install a ceiling light fixture in my
          kitchen. Amos and Rasel did an amazing job and expertly answered all
          my questions. This is the second time I&apos;ve gotten the services of
          Repair.sg and they consistently do a great job. Highly
          recommended!&quot;
        </p>
        <p className="font-semibold">Sotero Trinidad</p>
      </div>
    </div>,
    <div
      key="review5"
      className="flex justify-center items-center h-full p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              fill="orange"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-lg mb-4">
          &quot;The technician came and fixed my wall socket and it took them
          just about 15mins to do the job. Though it was fast and easy fix the
          technician got the job done properly as well as making sure it&apos;s
          working well and safe. Really great job and would definitely reach out
          to you guys for any future fixes. Thanks very much.&quot;
        </p>
        <p className="font-semibold">Beatrice Jok</p>
      </div>
    </div>,
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">
          What Our Customers Are Saying
        </h2>
        <AliceCarousel
          items={items}
          autoPlay
          autoPlayInterval={10000}
          infinite
          disableButtonsControls={false}
          responsive={{
            0: {
              items: 1, // For mobile
            },
            768: {
              items: 1, // For tablets
            },
            1024: {
              items: 1, // For larger screens
            },
          }}
        />
      </div>
    </section>
  );
}
