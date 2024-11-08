'use client';

import React, { useState } from 'react';

export default function Warranty() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-black mb-6">Warranty Policy</h1>
        <p className="text-lg text-black mb-8">
          Our Warranty Policy explains the terms and conditions under which warranty is provided for products and installations carried out by our electricians, plumbers, air-conditioner and ventilation technicians, and handymen. This policy aims to offer clarity on the scope and limitations of the warranty, ensuring that customers have a clear understanding of their entitlements and responsibilities.
        </p>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-3 text-lg font-semibold ${activeTab === 1 ? 'bg-primary text-black' : 'bg-secondary text-black'} rounded-tl-lg rounded-bl-lg`}
            onClick={() => setActiveTab(1)}
          >
            Our Products, Our Installation
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${activeTab === 2 ? 'bg-primary text-black' : 'bg-secondary text-black'}`}
            onClick={() => setActiveTab(2)}
          >
            Your Products, Our Installation
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${activeTab === 3 ? 'bg-primary text-black' : 'bg-secondary text-black'}`}
            onClick={() => setActiveTab(3)}
          >
            Circuit Breakers
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold ${activeTab === 4 ? 'bg-primary text-black' : 'bg-secondary text-black'} rounded-tr-lg rounded-br-lg`}
            onClick={() => setActiveTab(4)}
          >
            Partial Fixes Warranty
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-8 text-lg text-gray-600">
          {activeTab === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Our Products, Our Installation</h2>
              <p className="text-black">
                We provide a one-year warranty on components that are both supplied and installed by us. This warranty covers defects in materials and workmanship under normal use. If a product fails due to a defect in a component supplied and installed by us within the warranty period, we will repair or replace the faulty component without charge. However, if the malfunction arises from a component not replaced or supplied by us, the repair costs and any associated fees will be borne by the customer.
              </p>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Your Products, Our Installation</h2>
              <p className="text-black">
                For products procured externally by the customer but installed by us, the warranty is limited to the installation process. While we ensure the product is installed correctly, we do not provide a warranty on the product&apos;s inherent quality or longevity, as these factors are beyond our purview and control.
              </p>
            </div>
          )}

          {activeTab === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Circuit Breakers</h2>
              <p className="text-black">
                Circuit breakers are designed to trip as a safety mechanism, indicating potential electrical issues. Our warranty covers the functionality and integrity of replaced circuit breakers, ensuring they are free from defects and operate as intended. However, the warranty does not extend to the tripping of the circuit breaker, as this is a protective response to external electrical anomalies. If a replaced circuit breaker is found to be faulty within the warranty period, we commit to rectifying the issue. Still, we cannot guarantee against the tripping caused by external factors.
              </p>
            </div>
          )}

          {activeTab === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Partial Fixes Warranty Implications</h2>
              <p className="text-black">
                In instances where customers opt for partial solutions due to budgetary constraints, the warranty is confined to the specific work carried out by us. For example, if only a segment of an electrical system is repaired or replaced, the warranty will not cover other parts of the system that may fail subsequently.
              </p>
            </div>
          )}
        </div>

        {/* Conclusion Outside of Tabs */}
        <div className="text-lg text-black mt-10">
          <h2 className="text-2xl font-semibold text-black mb-4">Conclusion</h2>
          <p>
            Our Warranty Policy is a testament to our dedication to quality and customer satisfaction. By defining the scope and limitations of the warranty, we seek to foster transparency and trust with our customers. Customers are encouraged to review this policy thoroughly and consult us directly for any clarifications.
          </p>
        </div>

        <div className="text-md text-black mt-6">
          <p>Last Updated: 6 October 2023</p>
        </div>
      </div>
    </section>
  );
}
