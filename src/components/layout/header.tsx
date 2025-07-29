"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold font-headline text-primary">
          <GraduationCap className="w-8 h-8 text-accent" />
          <span>EduFun Adventures</span>
        </Link>
      </div>
    </header>
  );
}
