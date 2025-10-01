// src/components/landing/sections/FooterSection.jsx
"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Target } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (target) {
        e.preventDefault();
        const id = target.getAttribute("href").substring(1);
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TaskFlow</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Streamline your project management with role-based collaboration. Empower admins and teams to achieve more together.
            </p>
            <div className="flex space-x-4">
              <a href="/register" className="text-primary hover:text-primary/80 transition">
                Get Started
              </a>
              <a href="/login" className="text-muted-foreground hover:text-foreground transition">
                Login
              </a>
            </div>
          </div>

          {/* Product */}
         <div>
  <h3 className="text-foreground font-semibold mb-4">Product</h3>
  <ul className="space-y-2 text-sm text-muted-foreground">
    <li>
      <Link href="#features" className="hover:text-foreground transition">
        Features
      </Link>
    </li>
    <li>
      <Link href="#roles" className="hover:text-foreground transition">
        Roles
      </Link>
    </li>
    <li>
      <Link href="#testimonials" className="hover:text-foreground transition">
        Review
      </Link>
    </li>
  </ul>
</div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 TaskFlow. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>

      {/* Back to Top button (fixed bottom-right) */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
