import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import kbeLogo from "@assets/KBE logo.png";
import { CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={kbeLogo} alt="KBE Logo" className="h-8 w-8" />
              <span className="ml-2 text-lg font-bold">KBE</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering young minds to become the next generation of scientists through innovative competitions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=1iqudilpj19yi&utm_content=z00b3yd" className="text-gray-400 hover:text-white transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@kaunbanegaeinstein" className="text-gray-400 hover:text-white transition-colors" data-testid="link-youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/einstein-quest" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-home">Home</Link></li>
              <li><Link href="/einstein-quest/about" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/einstein-quest/exams" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-exams">Exams</Link></li>
              <li><Link href="/einstein-quest/training" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-training">Training</Link></li>
              <li><Link href="/einstein-quest/gallery" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-gallery">Gallery</Link></li>
              <li><Link href="/einstein-quest/contact" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-contact">Contact</Link></li>
              <li><Link href="/einstein-quest/downloads" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-downloads">Downloads</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-syllabus">Syllabus</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-sample-papers">Sample Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-previous-years">Previous Years</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-study-materials">Study Materials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="footer-link-faq">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center" data-testid="text-address">
                <MapPin className="h-4 w-4 mr-2" />
                {CONTACT_INFO.address}
              </p>
              <p className="flex items-center" data-testid="text-phone">
                <Phone className="h-4 w-4 mr-2" />
                {CONTACT_INFO.phone}
              </p>
              <p className="flex items-center" data-testid="text-email">
                <Mail className="h-4 w-4 mr-2" />
                {CONTACT_INFO.email}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400" data-testid="text-copyright">
            &copy; 2024 KBE - Kaun Banega Einstein. All rights reserved. | Designed to inspire young scientists.
          </p>
        </div>
      </div>
    </footer>
  );
}
