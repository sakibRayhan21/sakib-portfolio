"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldIcon } from "./Icons";

export default function Navbar({ brandName = "Sakib" }: { brandName?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/80 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-90 transition">
          {brandName}<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition">
            About
          </Link>
          <Link href="#skills" className="text-sm font-medium text-gray-300 hover:text-white transition">
            Skills
          </Link>
          <Link href="#projects" className="text-sm font-medium text-gray-300 hover:text-white transition">
            Projects
          </Link>
          <Link href="#education" className="text-sm font-medium text-gray-300 hover:text-white transition">
            Education
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Action Button: Admin Section */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
            <ShieldIcon className="w-3.5 h-3.5" />
            Admin Section
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400"
          >
            <ShieldIcon className="w-3 h-3" />
            Admin
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-800 bg-gray-950 px-6 py-4 space-y-3">
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-gray-300 hover:text-white"
          >
            About
          </Link>
          <Link
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-gray-300 hover:text-white"
          >
            Skills
          </Link>
          <Link
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-gray-300 hover:text-white"
          >
            Projects
          </Link>
          <Link
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-gray-300 hover:text-white"
          >
            Education
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-gray-300 hover:text-white"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
