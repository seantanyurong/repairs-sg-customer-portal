import React from 'react';
import { Star, CheckCircle, Truck, DollarSign } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-black mb-6">About Us</h1>
        <p className="text-lg text-black mb-8">
          At <strong>Repair.sg</strong>, you can expect reliable and consistent electrical services at a great price. With trained staff and multiple service vehicles, we are flexible. Our friendly and well-mannered technicians can assist you with tasks of any size. It does not matter if you only need to replace a single light bulb or rewire your entire property. Our services, small and large, are priced to be affordable and accessible.
        </p>
        <p className="text-lg text-black mb-8">
          To learn more about our company and services, you may either navigate to the different pages on our website, or speak with us through one of our contact methods. <br />
          <a href="/customer/contact-us" className="text-primary hover:underline">Contact us here</a>.
        </p>

        <h2 className="text-3xl font-semibold text-black mb-6">Why Choose Repair.sg?</h2>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <CheckCircle className="text-4xl text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Consistency</h3>
            <p className="text-lg text-black">
              We take pride in providing consistent and reliable service to all our clients, no matter how big or small the task is.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <Truck className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexibility</h3>
            <p className="text-lg text-black">
              Our trained team, equipped with thousands of parts in multiple service vehicles, is ready to tackle tasks of any size.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <DollarSign className="text-4xl text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Affordability</h3>
            <p className="text-lg text-black">
              Quality service doesn&apos;t have to break the bank. We ensure our offerings are accessible to all.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              {Array.from({ length: 1 }, (_, index) => (
                <Star
                key={index}
                fill="orange"
                strokeWidth={0}
                />
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-lg text-black">
              We are proud of our 4.9-star Google rating, backed by 610 reviews! Our customers trust us to get the job done right.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
