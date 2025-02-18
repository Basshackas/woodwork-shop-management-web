import React from 'react';
import { Menu, Home, Hammer, Wrench, ClipboardList, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-amber-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Hammer className="w-8 h-8" />
          <span className="text-xl font-bold">CraftManager Pro</span>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <NavLink icon={<Home size={20} />} text="Dashboard" />
          <NavLink icon={<ClipboardList size={20} />} text="Projects" />
          <NavLink icon={<Wrench size={20} />} text="Tools" />
          <NavLink icon={<Settings size={20} />} text="Settings" />
        </div>
        
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

function NavLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <a href="#" className="flex items-center space-x-1 hover:text-amber-200 transition-colors">
      {icon}
      <span>{text}</span>
    </a>
  );
}