import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msgs = JSON.parse(localStorage.getItem('kf_messages') || '[]');
    msgs.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('kf_messages', JSON.stringify(msgs));
    setSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="max-w-2xl mx-auto">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl md:text-5xl text-center mb-4">
          GET IN <span className="gold-gradient-text">TOUCH</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-12">
          We'd love to hear from you
        </motion.p>

        {sent && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="text-primary" size={20} />
            <p className="text-sm">Message sent successfully! We'll get back to you soon.</p>
          </motion.div>
        )}

        <motion.form initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-card border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-card border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input
            required
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-card border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <textarea
            required
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full bg-card border border-border rounded px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <button type="submit" className="w-full gold-gradient-bg text-primary-foreground font-display py-3 rounded tracking-wider text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Send size={16} /> SEND MESSAGE
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
