import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isSignup) {
      if (!name || !email || !phone || !password) { setError('All fields required'); return; }
      const ok = signup(name, email, phone, password);
      if (!ok) { setError('Email already registered'); return; }
    } else {
      if (!email || !password) { setError('All fields required'); return; }
      const ok = login(email, password);
      if (!ok) { setError('Invalid credentials'); return; }
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border rounded-lg p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="King's Fitness" className="h-20 w-20 rounded-full mb-3" />
          <h2 className="font-display text-2xl gold-gradient-text">{isSignup ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</h2>
        </div>

        {error && <p className="text-destructive text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary"
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-secondary border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary"
          />
          <button type="submit" className="w-full gold-gradient-bg text-primary-foreground font-display py-3 rounded tracking-wider text-sm hover:opacity-90 transition-opacity">
            {isSignup ? 'SIGN UP' : 'LOGIN'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => { setIsSignup(!isSignup); setError(''); }} className="text-primary hover:underline">
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
