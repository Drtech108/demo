// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 py-10 text-center text-gray-400">
      <nav className="mb-4">
        <a href="/menu" className="mx-3 hover:text-white">Menu</a>
        <a href="/about" className="mx-3 hover:text-white">About Us</a>
        <a href="/contact" className="mx-3 hover:text-white">Contact</a>
        <a href="#" className="mx-3 hover:text-white">Privacy Policy</a>
      </nav>
      <p>© 2025 Tasty Bites Restaurant. All rights reserved.</p>
    </footer>
  );
}