import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Heart, Zap, Users, Star } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const highlights = [
  { icon: Dumbbell, title: 'Modern Equipment', desc: 'State-of-the-art machines & free weights' },
  { icon: Users, title: 'Expert Trainers', desc: 'Certified professionals to guide you' },
  { icon: Heart, title: 'Wellness Focus', desc: 'Sauna, steam bath & diet consultation' },
  { icon: Zap, title: 'Group Classes', desc: 'Yoga, Zumba, CrossFit & more' },
];

const testimonials = [
  { name: 'Rahul Sharma', text: "King's Fitness completely transformed my lifestyle. Lost 15kg in 4 months!", rating: 5 },
  { name: 'Priya Patel', text: 'The trainers are incredible and the facilities are world-class. Best gym in Mumbai!', rating: 5 },
  { name: 'Arjun Mehta', text: 'The group classes keep me motivated. Amazing community and vibe here.', rating: 5 },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_74%_49%/0.08),transparent_70%)]" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <motion.p variants={fadeUp} className="font-display text-primary tracking-[0.3em] text-sm mb-4">
          LIFT · LOVE · REPEAT
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          <span className="gold-gradient-text">UNLEASH</span>
          <br />
          <span className="text-foreground">YOUR INNER</span>
          <br />
          <span className="gold-gradient-text">KING</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Premium fitness experience in the heart of Mumbai. Transform your body, elevate your mind.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="gold-gradient-bg text-primary-foreground font-display px-8 py-3 rounded tracking-wider hover:opacity-90 transition-opacity">
            JOIN NOW
          </Link>
          <Link to="/membership" className="border border-primary text-primary font-display px-8 py-3 rounded tracking-wider hover:bg-primary/10 transition-colors">
            VIEW PLANS
          </Link>
        </motion.div>
      </motion.div>
    </section>

    {/* Highlights */}
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-display text-3xl md:text-4xl text-center mb-12">
          WHY <span className="gold-gradient-text">KING'S FITNESS</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 text-center card-hover"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <h.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display text-lg mb-2">{h.title}</h3>
              <p className="text-muted-foreground text-sm">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-display text-3xl md:text-4xl text-center mb-12">
          MEMBER <span className="gold-gradient-text">TESTIMONIALS</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 card-hover"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm mb-4 italic">"{t.text}"</p>
              <p className="font-display text-primary text-sm">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Index;
