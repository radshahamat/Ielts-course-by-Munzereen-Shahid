"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-lg font-bold text-black">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/10mslogo-svg.svg"
            alt="Logo"
            width={120}
            height={40}
            className="h-10 w-auto cursor-pointer"
            priority
          />
        </Link>

        {/* Burger Icon */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks(lang)}
          {langSwitcher(lang)}
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden flex flex-col items-start px-4 pb-4 gap-4 bg-white">
          {navLinks(lang, () => setOpen(false))}
          {langSwitcher(lang)}
        </nav>
      )}
    </div>
  );
}

function navLinks(lang: string, onClick?: () => void) {
  const links = [
    { href: "#instructors", en: "Instructors", bn: "শিক্ষকবৃন্দ" },
    { href: "#layout", en: "Course Layout", bn: "কোর্স বিন্যাস" },
    { href: "#learnings", en: "What you will learn", bn: "আপনি যা শিখবেন" },
    { href: "#exclusive", en: "Exclusive Feature", bn: "এক্সক্লুসিভ ফিচার" },
    { href: "#details", en: "Course Details", bn: "কোর্স বিস্তারিত" },
  ];

  return (
    <>
      {links.map(({ href, en, bn }) => (
        <a
          key={href}
          href={href}
          className="text-[#0096DB] hover:text-[#2A3494]"
          onClick={onClick}
        >
          {lang === "en" ? en : bn}
        </a>
      ))}
    </>
  );
}

function langSwitcher(lang: string) {
  return (
    <Link
      href={`?lang=${lang === "en" ? "bn" : "en"}`}
      className="bg-[#0096DB] text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-500"
    >
      {lang === "en" ? "বাংলা" : "English"}
    </Link>
  );
}
