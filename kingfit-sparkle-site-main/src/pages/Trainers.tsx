import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Phone, MessageCircle, X, Mail } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const trainers = [
  { name: 'Vikram Singh', spec: 'Strength Training', exp: '8 years', phone: '+919811122233', email: 'vikram@kingsfitness.com', initials: 'VS' },
  { name: 'Ananya Desai', spec: 'Yoga & Flexibility', exp: '6 years', phone: '+919811133344', email: 'ananya@kingsfitness.com', initials: 'AD' },
  { name: 'Rohan Kapoor', spec: 'CrossFit', exp: '5 years', phone: '+919811144455', email: 'rohan@kingsfitness.com', initials: 'RK' },
  { name: 'Sneha Iyer', spec: 'Cardio & HIIT', exp: '7 years', phone: '+919811155566', email: 'sneha@kingsfitness.com', initials: 'SI' },
  { name: 'Aditya Joshi', spec: 'Bodybuilding', exp: '10 years', phone: '+919811166677', email: 'aditya@kingsfitness.com', initials: 'AJ' },
  { name: 'Meera Nair', spec: 'Zumba & Dance Fitness', exp: '4 years', phone: '+919811177788', email: 'meera@kingsfitness.com', initials: 'MN' },
];

const Trainers = () => {
  const [contactOpen, setContactOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl md:text-5xl text-center mb-4">
          OUR <span className="gold-gradient-text">TRAINERS</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-12">
          Certified professionals dedicated to your transformation
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-lg p-6 text-center relative overflow-hidden"
            >
              <motion.div
                className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="font-display text-2xl text-primary-foreground">{t.initials}</span>
              </motion.div>
              <h3 className="font-display text-xl mb-1">{t.name}</h3>
              <p className="text-primary text-sm font-display mb-3">{t.spec}</p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
                <Award size={14} /> {t.exp} experience
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setContactOpen(contactOpen === t.name ? null : t.name)}
                className="inline-flex items-center gap-2 text-sm border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors"
              >
                <Phone size={14} /> Contact
              </motion.button>

              <AnimatePresence>
                {contactOpen === t.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 border-t border-border pt-4 space-y-2 overflow-hidden"
                  >
                    <a
                      href={`tel:${t.phone}`}
                      className="flex items-center justify-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded hover:bg-primary/20 transition-colors"
                    >
                      <Phone size={14} /> Call {t.phone.replace('+91', '+91 ')}
                    </a>
                    <a
                      href={`https://wa.me/${t.phone.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm bg-green-500/10 text-green-400 px-3 py-2 rounded hover:bg-green-500/20 transition-colors"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a
                      href={`mailto:${t.email}`}
                      className="flex items-center justify-center gap-2 text-sm bg-blue-500/10 text-blue-400 px-3 py-2 rounded hover:bg-blue-500/20 transition-colors"
                    >
                      <Mail size={14} /> Email
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
