'use client';

import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-black mb-6">FAQ</h1>
        <p className="text-lg text-black mb-8">
          Find the answers to our frequently asked questions on this page. If you are not able to find the answer you were looking for, our staff would be happy to personally answer your questions through text message, phone call, or email. Navigate to our{' '}
          <a href="/customer/contact-us" className="text-primary hover:underline">
            contact page
          </a>{' '}
          to find our contact information.
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(0)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">What are your operating days and hours?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 0 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 0 ? 'block' : 'hidden'}`}>
            Our main services are available from Monday to Saturday, 9am to 7pm. Contact us now to book an appointment. Emergency services are available outside standard operating hours, however, these appointments are offered on a case-by-case basis, and are usually reserved for customers who are on a maintenance contract with our company.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(1)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">Are you a registered Electrical Services company?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 1 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 1 ? 'block' : 'hidden'}`}>
            Yes. Our company is incorporated with the Accounting and Corporate Regulatory Authority (ACRA) in Singapore.
            Our company name is LOGICALWAYS SERVICES PTE. LTD.
            The principal activity of our company listed on the official business registry is Singapore Standard Industrial Classification (SSIC) number 43210, Electrical Works.
            We are also registered with the Building and Construction Authority (BCA) under our corporate Unique Entity Number (UEN) of 201622590C.
            Our consulting Licensed Electrical Worker (LEW) license number is 9/21140.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(2)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">Will I be provided warranty for workmanship and parts?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 2 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 2 ? 'block' : 'hidden'}`}>
              We warranty all parts that are supplied and installed by our company. Our workmanship is also warrantied. The warranty length is determined based on the type of services rendered and parts installed. Visit our{' '}
              <a href="/customer/faq/warranty" className="text-primary hover:underline">
                warranty page
              </a>{' '}
              to learn more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(3)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">How long does it take to dispatch your technicians to my place?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 3 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 3 ? 'block' : 'hidden'}`}>
            Our company has multiple service vehicles and teams. We are usually able to arrange for a team to be dispatched to your location within two working days. In some cases, we are able to dispatch a team on the same day you call in. Please contact our service coordinator to enquire about the current response time for your location.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(4)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">Are there hidden charges in your price list and quotations?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 4 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 4 ? 'block' : 'hidden'}`}>
            No. Our company will provide you a transparent quotation upfront for your consideration before any services are rendered. Please feel free to talk to our staff should you require further clarification on our prices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(5)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">Do you also provide services for businesses?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 5 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 5 ? 'block' : 'hidden'}`}>
            Yes. Our company provides repair, maintenance and installation services for businesses and their clients. Our services are customisable to fit the unique needs and requirements of your company. Visit our corporate and commercial services page to learn more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(6)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">Do you repair household and commercial appliances?</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 6 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 6 ? 'block' : 'hidden'}`}>
            Unfortunately, our company does not currently offer repair services for small household and commercial appliances such as but not limited to fridges, televisions, microwaves, blenders, and stoves. We recommend that you approach the manufacturer of the appliance for repair services.
            Our repair capability is currently limited to lighting, electrical switches, electrical sockets, and electrical wiring. Please contact us should you require further clarification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer" onClick={() => toggleFAQ(7)}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">My question was not answered above</h3>
              <span className={`transform transition-transform duration-300 ${openIndex === 7 ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-chevron-down">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
            <p className={`text-lg text-black mt-4 ${openIndex === 7 ? 'block' : 'hidden'}`}>
            We apologise that your question was not answered. Please contact our customer service representative through one of our available communication channels. Our staff would be happy to assist you with your queries.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
