import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Clock, Calculator } from 'lucide-react';
import { differenceInDays, addMonths, format } from 'date-fns';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

const plans = [
  {
    name: 'Basic',
    pricePerMonth: 1499,
    features: ['Gym Access (6AM-10PM)', 'Locker Room', 'Free WiFi', 'Basic Equipment'],
    popular: false,
  },
  {
    name: 'Standard',
    pricePerMonth: 2499,
    features: ['24/7 Gym Access', 'All Equipment', 'Group Classes', 'Locker Room', 'Free WiFi', 'Steam Bath'],
    popular: true,
  },
  {
    name: 'Premium',
    pricePerMonth: 3999,
    features: ['24/7 Gym Access', 'Personal Trainer', 'All Classes', 'Diet Consultation', 'Sauna & Steam', 'Parking', 'Locker Room', 'Free WiFi'],
    popular: false,
  },
];

const durationOptions = [1, 3, 6, 12];

const Membership = () => {
  const { user, joinPlan } = useAuth();
  const navigate = useNavigate();
  const [joined, setJoined] = useState<string | null>(null);
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number>>({
    Basic: 1, Standard: 3, Premium: 6,
  });

  const handleDuration = (planName: string, months: number) => {
    setSelectedDurations(prev => ({ ...prev, [planName]: months }));
  };

  const getTotal = (planName: string) => {
    const plan = plans.find(p => p.name === planName)!;
    const months = selectedDurations[planName] || 1;
    return plan.pricePerMonth * months;
  };

  const handleJoin = (planName: string) => {
    if (!user) { navigate('/login'); return; }
    const months = selectedDurations[planName];
    joinPlan(planName, months);
    setJoined(planName);
  };

  const membershipInfo = user?.plan && user?.joinDate && user?.planDuration ? (() => {
    const start = new Date(user.joinDate);
    const expiry = addMonths(start, user.planDuration);
    const remaining = differenceInDays(expiry, new Date());
    return { start, expiry, remaining: Math.max(0, remaining) };
  })() : null;

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl md:text-5xl text-center mb-4">
          MEMBERSHIP <span className="gold-gradient-text">PLANS</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-12">
          Choose the plan that fits your fitness goals
        </motion.p>

        {/* Membership Status */}
        <AnimatePresence>
          {membershipInfo && user?.plan && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-12 bg-card border border-primary/30 rounded-lg p-6 max-w-lg mx-auto"
            >
              <h3 className="font-display text-xl gold-gradient-text mb-4 text-center">YOUR MEMBERSHIP</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><Check size={16} className="text-primary" /> Plan: <strong>{user.plan}</strong></p>
                <p className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> Duration: <strong>{user.planDuration} month{user.planDuration > 1 ? 's' : ''}</strong></p>
                <p className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> Start: {format(membershipInfo.start, 'dd MMM yyyy')}</p>
                <p className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> Expiry: {format(membershipInfo.expiry, 'dd MMM yyyy')}</p>
                <p className="flex items-center gap-2"><Clock size={16} className="text-primary" /> Remaining: <strong>{membershipInfo.remaining} days</strong></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {joined && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mb-8 bg-primary/10 border border-primary/30 rounded-lg p-4 text-center max-w-lg mx-auto">
              <p className="text-primary font-display">🎉 Welcome to {joined} Plan!</p>
              <p className="text-sm text-muted-foreground mt-1">Confirmation sent to {user?.email}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const months = selectedDurations[plan.name] || 1;
            const total = getTotal(plan.name);
            return (
              <motion.div
                key={plan.name}
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative bg-card border rounded-lg p-6 ${plan.popular ? 'border-primary shadow-[0_0_30px_-10px_hsl(43_74%_49%/0.3)]' : 'border-border'}`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient-bg text-primary-foreground text-xs font-display px-4 py-1 rounded-full"
                  >
                    MOST POPULAR
                  </motion.span>
                )}
                <h3 className="font-display text-2xl text-center mt-2">{plan.name}</h3>
                
                {/* Duration Selector */}
                <div className="my-4">
                  <p className="text-xs text-muted-foreground text-center mb-2 font-display flex items-center justify-center gap-1">
                    <Calculator size={12} /> SELECT DURATION
                  </p>
                  <div className="flex gap-1 justify-center">
                    {durationOptions.map(d => (
                      <button
                        key={d}
                        onClick={() => handleDuration(plan.name, d)}
                        className={`px-3 py-1.5 rounded text-xs font-display tracking-wider transition-all ${
                          months === d
                            ? 'gold-gradient-bg text-primary-foreground'
                            : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'
                        }`}
                      >
                        {d}M
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-1">
                  <span className="text-muted-foreground text-xs">₹{plan.pricePerMonth.toLocaleString('en-IN')}/mo × {months} mo</span>
                </div>
                <div className="text-center mb-4">
                  <motion.span
                    key={total}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display text-4xl gold-gradient-text"
                  >
                    ₹{total.toLocaleString('en-IN')}
                  </motion.span>
                  <span className="text-muted-foreground text-sm ml-1">total</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + fi * 0.05 }}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <Check size={14} className="text-primary shrink-0" /> {f}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleJoin(plan.name)}
                  className={`w-full py-3 rounded font-display tracking-wider text-sm transition-all ${
                    plan.popular
                      ? 'gold-gradient-bg text-primary-foreground hover:opacity-90'
                      : 'border border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {user?.plan === plan.name ? 'CURRENT PLAN' : 'JOIN NOW'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Membership;
