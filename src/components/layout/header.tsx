
"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <SidebarTrigger />
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold font-headline text-primary absolute left-1/2 -translate-x-1/2">
          <GraduationCap className="w-8 h-8 text-accent" />
          <span>EduFun Adventures</span>
        </Link>
        <div /> 
      </div>
    </header>
  );
}
