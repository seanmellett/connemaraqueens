import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  
  // Close menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, closeMenu]);

  return (
    <header className="relative z-10">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-primary">
            <Link href="/" className="flex items-center gap-2">
              <span>Connemara Queens</span>
            </Link>
          </h1>
        </div>
        
        <button 
          className="md:hidden text-primary"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <li>
              <Link 
                href="/" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/products" 
                className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Nucs & Queens
              </Link>
            </li>
            <li>
              <Link 
                href="/booking" 
                className={`nav-link ${activeSection === 'booking' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
