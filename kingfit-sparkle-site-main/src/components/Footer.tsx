import logo from '@/assets/logo.png';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-card border-t border-border section-padding">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="King's Fitness" className="h-12 w-12 rounded-full" />
          <span className="font-display text-xl gold-gradient-text font-bold">KING'S FITNESS</span>
        </div>
        <p className="text-muted-foreground text-sm">Lift · Love · Repeat</p>
        <p className="text-muted-foreground text-sm">Transform your body, transform your life.</p>
      </div>
      <div>
        <h4 className="font-display text-primary mb-3">CONTACT</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</p>
          <p className="flex items-center gap-2"><Mail size={14} /> info@kingsfitness.in</p>
          <p className="flex items-center gap-2"><MapPin size={14} /> Mumbai, Maharashtra, India</p>
        </div>
      </div>
      <div>
        <h4 className="font-display text-primary mb-3">FOLLOW US</h4>
        <div className="flex gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
      © 2026 King's Fitness. All rights reserved.
    </div>
  </footer>
);

export default Footer;
