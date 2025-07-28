"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-lg font-bold text-black">
        <Link href="/">
            <Image
                src="/10mslogo-svg.svg"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer"
            />
        </Link>

        {/* Burger Icon */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks(lang)}
          {langSwitcher(lang)}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col items-start px-4 pb-4 gap-4 bg-white">
          {navLinks(lang)}
          {langSwitcher(lang)}
        </div>
      )}
    </div>
  );
}

function navLinks(lang: string) {
  return (
    <>
      <a href="#instructors" className="text-[#0096DB] hover:text-[#2A3494]">{lang === "en" ? "Instructors" : "শিক্ষকবৃন্দ"}</a>
      <a href="#layout" className="text-[#0096DB] hover:text-[#2A3494]">{lang === "en" ? "Course Layout" : "কোর্স বিন্যাস"}</a>
      <a href="#learnings" className="text-[#0096DB] hover:text-[#2A3494]">{lang === "en" ? "What you will learn" : "আপনি যা শিখবেন"}</a>
      <a href="#exclusive" className="text-[#0096DB] hover:text-[#2A3494]">{lang === "en" ? "Exclusive Feature" : "এক্সক্লুসিভ ফিচার"}</a>
      <a href="#details" className="text-[#0096DB] hover:text-[#2A3494]">{lang === "en" ? "Course Details" : "কোর্স বিস্তারিত"}</a>
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
