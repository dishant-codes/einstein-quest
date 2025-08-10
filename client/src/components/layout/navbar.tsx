import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import kbeLogo from "@assets/KBE logo.png";

const navigation = [
  { name: "Home", href: "/einstein-quest/" },
  { name: "About Us", href: "/einstein-quest/about" },
  { name: "Exams", href: "/einstein-quest/exams" },
  { name: "Training", href: "/einstein-quest/training" },
  { name: "Gallery", href: "/einstein-quest/gallery" },
  { name: "Contact", href: "/einstein-quest/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center" data-testid="link-home-logo">
            <img src={kbeLogo} alt="KBE Logo" className="h-10 w-10" />
            <span className="ml-2 text-xl font-bold text-kbe-purple">KBE</span>
            <span className="ml-1 text-sm text-gray-600 hidden sm:block">Kaun Banega Einstein</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  location === item.href
                    ? "text-kbe-purple font-medium"
                    : "text-gray-700 hover:text-kbe-purple"
                }`}
                data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex">
            <Link href="/exams">
              <Button 
                className="bg-kbe-orange text-white hover:bg-orange-600 font-medium"
                data-testid="button-register-now"
              >
                Register Now
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-lg transition-colors ${
                        location === item.href
                          ? "text-kbe-purple font-medium"
                          : "text-gray-700 hover:text-kbe-purple"
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/exams" onClick={() => setIsOpen(false)}>
                    <Button 
                      className="bg-kbe-orange text-white hover:bg-orange-600 w-full mt-4"
                      data-testid="mobile-button-register-now"
                    >
                      Register Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
