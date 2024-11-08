import Link from "next/link";
import PromotionalVideo from "./PromotionalVideo";

export default function HeroSection() {
  return (
    <section className="relative bg-white py-20 w-full">
      <div className="flex items-center container mx-auto px-6">
        <div className="w-full lg:w-1/4 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-6">Hey There!</h1>
          <p className="text-lg mb-6">
            We help to make repair, installation, and maintenance easy for more than 15,000 businesses and homeowners.
          </p>
          <p className="text-lg mb-6">
            Let us help you next!
          </p>
          <Link href="/customer/services" className="bg-primary text-black py-3 px-6 rounded-lg text-xl hover:bg-secondary transition duration-300">
            Get Started
          </Link>
        </div>

        <div className="w-full lg:w-3/4 ml-0 lg:ml-8">
          <PromotionalVideo />
        </div>
      </div>
    </section>
  );
}
