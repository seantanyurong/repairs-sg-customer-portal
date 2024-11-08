export default function Footer() {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto text-center">
        <p>Repair Pte. Ltd. (Reg. No 202100025M).</p>
        <p>229 Mountbatten Road, #01-01 Mountbatten Square, Singapore 398007</p>
        <p>Repair, maintenance, and installation services loved by more than 15,000 people ♥</p>
        <p>&copy; 2016 - 2024. All rights reserved.</p>
        <div className="space-x-4 mt-4">
          <a href="/customer/about-us" className="text-black hover:text-primary">About Us</a>
          <a href="/customer/contact-us" className="text-black hover:text-primary">Contact Us</a>
          <a href="/customer/faq" className="text-black hover:text-primary">FAQs</a>
          <a href="/customer/faq/warranty" className="text-black hover:text-primary">Warranty Policy</a>
        </div>
      </div>
    </footer>
  );
}
