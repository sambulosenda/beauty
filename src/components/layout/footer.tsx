'use client';

import Link from "next/link";
import React from "react";
import { Instagram, Twitter, Facebook, Globe2 } from "lucide-react";

interface SocialLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) => (
  <Link
    key={label}
    href={href}
    className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-gray-400" />
  </Link>
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <Link 
      href={href}
      className="text-[14px] text-gray-400 hover:text-[#8AB861] transition-colors"
    >
      {children}
    </Link>
  </li>
);

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="space-y-4">
    <h4 className="text-[15px] font-semibold text-white">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <FooterLink key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`}>
          {link}
        </FooterLink>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <footer className="relative bg-[#1A1D24] border-t border-white/[0.05]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8AB861]/10 to-transparent" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#8AB861] to-[#E87C3E] text-transparent bg-clip-text">
                AfroGlow
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Connecting beauty professionals with clients. Experience the future of beauty booking and business management.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Facebook].map((icon, index) => (
                <SocialLink 
                  key={index} 
                  icon={icon} 
                  href="#" 
                  label={icon.name} 
                />
              ))}
            </div>
          </div>
          {/* Quick Links Columns */}
          {[
            {
              title: "Quick Links",
              links: ["Services", "About", "Contact"]
            },
            {
              title: "For Businesses",
              links: ["Join as Provider", "Business Features", "Pricing"]
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
            }
          ].map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-[13px] text-gray-500">
                © {new Date().getFullYear()} AfroGlow. All rights reserved.
              </span>
              <div className="hidden sm:flex items-center gap-4">
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <Link
                    key={item}
                    href={`/legal/${item.toLowerCase()}`}
                    className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            {/* Language Selector */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.05]">
              <Globe2 className="h-4 w-4 text-gray-400" />
              <select className="bg-transparent text-[13px] text-gray-400 focus:outline-none">
                <option value="en">English (US)</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;