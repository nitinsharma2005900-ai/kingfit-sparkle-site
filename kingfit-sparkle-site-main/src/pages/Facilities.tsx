import { motion } from 'framer-motion';
import { Droplets, Flame, Lock, User, Apple, Heart, Wifi, Car } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const facilities = [
  { icon: Droplets, name: 'Steam Bath', desc: 'Relax and recover with our premium steam rooms.' },
  { icon: Flame, name: 'Sauna', desc: 'Infrared sauna for deep muscle relaxation.' },
  { icon: Lock, name: 'Locker Rooms', desc: 'Secure lockers with shower facilities.' },
  { icon: User, name: 'Personal Training', desc: 'One-on-one sessions with certified trainers.' },
  { icon: Apple, name: 'Diet Consultation', desc: 'Customized nutrition plans for your goals.' },
  { icon: Heart, name: 'Cardio Zone', desc: 'Dedicated area with premium cardio equipment.' },
  { icon: Wifi, name: 'Free WiFi', desc: 'Stay connected throughout your workout.' },
  { icon: Car, name: 'Parking', desc: 'Free parking available for all members.' },
];

const Facilities = () => (
  <div className="min-h-screen pt-20 section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl md:text-5xl text-center mb-4">
        OUR <span className="gold-gradient-text">FACILITIES</span>
      </motion.h1>
      <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-12">
        Everything you need under one roof
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((f, i) => (
          <motion.div
            key={f.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-lg p-6 text-center card-hover"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <f.icon className="text-primary" size={22} />
            </div>
            <h3 className="font-display text-lg mb-2">{f.name}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Facilities;
