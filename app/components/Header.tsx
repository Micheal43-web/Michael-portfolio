

"use client"


import { Moon, Sun, TextAlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";







function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark")
    
  }




  return (
    <nav className="z-1000 pl-5 pr-1 md:px-7.5 rounded-full mt-5 py-1  flex items-center justify-between relative text-xs font-semibold uppercase">



      <span className="font-display text-2xl leading-none tracking-[-1px]">MW<span className="text-accent">.</span></span>


      <div className="hidden text-ink  lg:flex items-center rounded-full px-5 py-1 gap-3">

        <a href="/#selectedWork" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium  ">
          Work
        </a>
        <a href="/#about" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium  ">
          About
        </a>

        <a href="/#skills" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium  ">
          Skills
        </a>
        <a href="/#contact" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium ">
          Contact
        </a>




      </div>

      <button onClick={toggle} className="hidden lg:block cursor-pointer rounded-md border p-3">
        <Moon className="size-5 dark:hidden" />
        <Sun className="hidden size-5 dark:block" />
      </button>







      <div className="btnsMob  flex items-center gap-4 lg:hidden">

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden cursor-pointer rounded-md border p-3">
          {
            menuOpen ? <X /> : <TextAlignJustify />
          }
        </button>

        <button onClick={toggle} className=" cursor-pointer rounded-md border p-3">
          <Moon className="size-5 dark:hidden" />
          <Sun className="hidden size-5 dark:block" />
        </button>
      </div>



      {menuOpen && (
        <div className="absolute bg-paper text-xs font-semibold uppercase shadow-card hover:shadow-none transition-all top-full left-0 w-full border flex flex-col py-4 px-2 gap-1 lg:hidden mt-5">
          <a href="/#selectedWork" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium  ">
            Work
          </a>
          <a href="/#about" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium  ">
            About
          </a>

          <a href="/#skills" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium  ">
            Skills
          </a>
          <a href="/#contact" className="px-4 py-1.5 rounded-full text-sm transition-colors font-medium ">
            Contact
          </a>






        </div>



      )}
    </nav>
  );






}

export default Header;