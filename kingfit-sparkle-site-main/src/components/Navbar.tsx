import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/membership', label: 'Plans' },
  ];

  const privateLinks = [
    { to: '/trainers', label: 'Trainers' },
    { to: '/equipment', label: 'Equipment' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/facilities', label: 'Facilities' },
    { to: '/contact', label: 'Contact' },
  ];

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="King's Fitness" className="h-10 w-10 rounded-full" />
          <span className="font-display text-xl gold-gradient-text font-bold">KING'S FITNESS</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-display text-sm tracking-wider transition-colors hover:text-primary ${isActive(l.to) ? 'text-primary' : 'text-foreground/70'}`}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          {user ? (
            <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/login" className="gold-gradient-bg text-primary-foreground px-4 py-2 rounded font-display text-sm tracking-wider">
              LOGIN
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block font-display text-sm tracking-wider ${isActive(l.to) ? 'text-primary' : 'text-foreground/70'}`}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { logout(); setOpen(false); }} className="text-sm text-muted-foreground">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block text-primary font-display text-sm">LOGIN</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
