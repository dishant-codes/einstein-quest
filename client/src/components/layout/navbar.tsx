import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Globe, Atom, Award, Users, BookOpen, Download } from "lucide-react";
import kbeLogo from "@assets/KBE logo.png";

const navigation = [
  { name: "Home", href: "/einstein-quest", icon: Atom },
  { name: "About Us", href: "/einstein-quest/about", icon: Users },
  { name: "Exams", href: "/einstein-quest/exams", icon: BookOpen },
  { name: "Training", href: "/einstein-quest/training", icon: BookOpen },
  { name: "Downloads", href: "/einstein-quest/downloads", icon: Download },
  { name: "Gallery", href: "/einstein-quest/gallery", icon: Globe },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl fixed w-full top-0 z-50 border-b border-gray-200/30" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/einstein-quest" className="flex items-center group transition-all duration-300 hover:scale-105" data-testid="link-home-logo">
            <div className="flex items-center">
              {/* Logo Section */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-sm group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-2 rounded-full border-2 border-blue-200/50">
                  <img src={kbeLogo} alt="KBE Logo" className="h-10 w-10 object-contain" />
                </div>
              </div>
              
              {/* Brand Text */}
              <div className="ml-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    KBE
                  </span>
                  <div className="ml-2 w-px h-6 bg-gradient-to-b from-blue-400 to-purple-400 hidden sm:block"></div>
                  <span className="ml-2 text-sm font-medium text-slate-600 hidden sm:inline">
                    Kaun Banega Einstein
                  </span>
                </div>
                
                {/* International Badges */}
                <div className="flex items-center mt-1 space-x-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <Award className="h-3 w-3 mr-1" />
                    Einstein Legacy
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-slate-800 font-semibold shadow-sm"
                      : "text-gray-600 hover:text-slate-800 hover:bg-gray-50"
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-slate-600'} transition-colors duration-300`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="font-medium">Registration Open</span>
              </div>
            </div>
            <Link href="/einstein-quest/online-registrations">
              <Button 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                data-testid="button-register-now"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Register Now
              </Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-white/95 backdrop-blur-md border-l border-gray-200/50">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/50">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-2 rounded-full border-2 border-blue-200/50">
                        <img src={kbeLogo} alt="KBE Logo" className="h-8 w-8 object-contain" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <span className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        KBE
                      </span>
                      <div className="flex items-center mt-1 space-x-1">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-0.5 border-0">
                          International
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => {
                    const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-slate-800 font-semibold shadow-sm"
                            : "text-gray-600 hover:text-slate-800 hover:bg-gray-50"
                        }`}
                        onClick={() => setIsOpen(false)}
                        data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-slate-600'} transition-colors duration-300`} />
                        <span className="text-lg font-medium">{item.name}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile CTA Section */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <div className="flex items-center justify-center mb-4 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="font-medium">Registration Open</span>
                  </div>
                  <Link href="/einstein-quest/online-registrations" onClick={() => setIsOpen(false)}>
                    <Button 
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold w-full py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      data-testid="mobile-button-register-now"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Register for KBE 2025
                    </Button>
                  </Link>
                  
                  {/* Additional Info */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/30">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Join 10,000+ young scientists</p>
                      <div className="flex justify-center space-x-4 text-xs text-gray-500">
                        <span>50+ Countries</span>
                        <span>•</span>
                        <span>₹10L+ Prizes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
