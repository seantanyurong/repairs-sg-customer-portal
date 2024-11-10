import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react'; // Import Lucide React Icons

export default function ContactUs() {
  return (
    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Contact Us</h1>
        <p className="text-lg text-black mb-8">
          We are here to help. Book an appointment or start a discussion with our friendly staff about how our team can assist you today. We are available to answer your queries from 9:00 am to 6:00 pm, Monday to Saturday. We also answer messages until 9:00 pm when we can. Find our contact details below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <MessageCircle className="text-4xl text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-lg text-black mb-4">
              You may reach our team through{' '}
              <a 
                href="https://wa.me/6590706060?text=Hello%20Repair.sg,%20I%20need%20help%20with%20..." 
                className="text-primary underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <strong>+65 9070 6060</strong>
              </a> (Preferred)
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Phone className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone Call</h3>
            <p className="text-lg text-black mb-4">
              You may reach our team through a phone call at <strong>+65 9070 6060</strong>.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Mail className="text-4xl text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-lg text-black mb-4">
              To reach us through email, please send your message to: 
              <a href="mailto:help@repair.sg?subject=Repair Enquiry&body=Hello Repair.sg, %0A%0AI need help with..." className="text-primary underline">
                <strong>help@repair.sg</strong>
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
