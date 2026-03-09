import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Scale } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const defaultSchedule = [
  { time: '6:00 AM', mon: 'Cardio', tue: 'Strength', wed: 'Yoga', thu: 'HIIT', fri: 'CrossFit', sat: 'Zumba' },
  { time: '8:00 AM', mon: 'Yoga', tue: 'CrossFit', wed: 'Strength', thu: 'Cardio', fri: 'Yoga', sat: 'Strength' },
  { time: '10:00 AM', mon: 'Open Gym', tue: 'Open Gym', wed: 'Open Gym', thu: 'Open Gym', fri: 'Open Gym', sat: 'Open Gym' },
  { time: '4:00 PM', mon: 'Strength', tue: 'HIIT', wed: 'CrossFit', thu: 'Zumba', fri: 'Strength', sat: 'Cardio' },
  { time: '6:00 PM', mon: 'Zumba', tue: 'Yoga', wed: 'HIIT', thu: 'Strength', fri: 'Cardio', sat: 'Yoga' },
  { time: '8:00 PM', mon: 'Open Gym', tue: 'Open Gym', wed: 'Open Gym', thu: 'Open Gym', fri: 'Open Gym', sat: '—' },
];

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
const dayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const classColor = (cls: string) => {
  if (cls === 'Cardio') return 'text-red-400';
  if (cls === 'Strength') return 'text-blue-400';
  if (cls === 'Yoga') return 'text-green-400';
  if (cls === 'HIIT') return 'text-orange-400';
  if (cls === 'CrossFit') return 'text-purple-400';
  if (cls === 'Zumba') return 'text-pink-400';
  return 'text-muted-foreground';
};

type BodyCategory = 'underweight' | 'normal' | 'overweight' | 'obese';

const getCategory = (bmi: number): BodyCategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

const personalizedSchedules: Record<BodyCategory, { time: string; mon: string; tue: string; wed: string; thu: string; fri: string; sat: string }[]> = {
  underweight: [
    { time: '7:00 AM', mon: 'Strength', tue: 'Strength', wed: 'Yoga', thu: 'Strength', fri: 'Strength', sat: 'Yoga' },
    { time: '9:00 AM', mon: 'Open Gym', tue: 'Open Gym', wed: 'Open Gym', thu: 'Open Gym', fri: 'Open Gym', sat: 'Open Gym' },
    { time: '5:00 PM', mon: 'Strength', tue: 'CrossFit', wed: 'Strength', thu: 'CrossFit', fri: 'Strength', sat: 'Rest' },
    { time: '7:00 PM', mon: 'Yoga', tue: 'Strength', wed: 'Open Gym', thu: 'Yoga', fri: 'Open Gym', sat: '—' },
  ],
  normal: [
    { time: '6:00 AM', mon: 'Cardio', tue: 'Strength', wed: 'Yoga', thu: 'HIIT', fri: 'CrossFit', sat: 'Zumba' },
    { time: '8:00 AM', mon: 'Yoga', tue: 'CrossFit', wed: 'Strength', thu: 'Cardio', fri: 'Yoga', sat: 'Strength' },
    { time: '5:00 PM', mon: 'Strength', tue: 'HIIT', wed: 'CrossFit', thu: 'Zumba', fri: 'Strength', sat: 'Cardio' },
    { time: '7:00 PM', mon: 'Zumba', tue: 'Yoga', wed: 'HIIT', thu: 'Strength', fri: 'Cardio', sat: 'Yoga' },
  ],
  overweight: [
    { time: '6:00 AM', mon: 'Cardio', tue: 'HIIT', wed: 'Cardio', thu: 'HIIT', fri: 'Cardio', sat: 'Yoga' },
    { time: '8:00 AM', mon: 'Yoga', tue: 'Cardio', wed: 'Zumba', thu: 'Cardio', fri: 'Zumba', sat: 'Cardio' },
    { time: '5:00 PM', mon: 'HIIT', tue: 'Zumba', wed: 'HIIT', thu: 'Strength', fri: 'HIIT', sat: 'Rest' },
    { time: '7:00 PM', mon: 'Strength', tue: 'Yoga', wed: 'Cardio', thu: 'Yoga', fri: 'Strength', sat: '—' },
  ],
  obese: [
    { time: '7:00 AM', mon: 'Yoga', tue: 'Cardio', wed: 'Yoga', thu: 'Cardio', fri: 'Yoga', sat: 'Cardio' },
    { time: '9:00 AM', mon: 'Cardio', tue: 'Yoga', wed: 'Cardio', thu: 'Yoga', fri: 'Cardio', sat: 'Rest' },
    { time: '5:00 PM', mon: 'Zumba', tue: 'Cardio', wed: 'Zumba', thu: 'Cardio', fri: 'Zumba', sat: 'Rest' },
    { time: '7:00 PM', mon: 'Yoga', tue: 'Strength', wed: 'Yoga', thu: 'Strength', fri: 'Yoga', sat: '—' },
  ],
};

const recommendations: Record<BodyCategory, string> = {
  underweight: '🏋️ Focus on strength training and muscle building. High protein diet recommended. Avoid excessive cardio.',
  normal: '💪 Great shape! Balanced mix of strength, cardio, and flexibility. Maintain consistency.',
  overweight: '🔥 Focus on cardio and HIIT to burn calories. Include strength training to boost metabolism.',
  obese: '🧘 Start with low-impact exercises like yoga and walking. Gradually increase intensity. Consult with our diet team.',
};

const Schedule = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BodyCategory | null>(null);

  const handleGenerate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (!w || !h || h <= 0) return;
    const calculatedBmi = w / (h * h);
    setBmi(calculatedBmi);
    setCategory(getCategory(calculatedBmi));
    setShowPersonalized(true);
  };

  const activeSchedule = showPersonalized && category ? personalizedSchedules[category] : defaultSchedule;

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl md:text-5xl text-center mb-4">
          WEEKLY <span className="gold-gradient-text">SCHEDULE</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-8">
          Get a personalized schedule based on your body metrics
        </motion.p>

        {/* Body Metrics Input */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-lg p-6 max-w-lg mx-auto mb-10"
        >
          <h3 className="font-display text-lg gold-gradient-text text-center mb-4 flex items-center justify-center gap-2">
            <Activity size={18} /> PERSONALIZE YOUR SCHEDULE
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground font-display mb-1 block flex items-center gap-1">
                <Scale size={12} /> WEIGHT (kg)
              </label>
              <input
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-display mb-1 block flex items-center gap-1">
                <User size={12} /> HEIGHT (cm)
              </label>
              <input
                type="number"
                placeholder="e.g. 175"
                value={height}
                onChange={e => setHeight(e.target.value)}
                className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            className="w-full gold-gradient-bg text-primary-foreground font-display py-2.5 rounded tracking-wider text-sm"
          >
            GENERATE MY SCHEDULE
          </motion.button>
        </motion.div>

        {/* BMI Result */}
        <AnimatePresence>
          {showPersonalized && bmi && category && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-lg mx-auto mb-8"
            >
              <div className="text-center mb-2">
                <span className="text-sm text-muted-foreground">Your BMI: </span>
                <span className="font-display text-2xl gold-gradient-text">{bmi.toFixed(1)}</span>
                <span className="text-sm text-primary ml-2 font-display capitalize">({category})</span>
              </div>
              <p className="text-sm text-foreground/80 text-center">{recommendations[category]}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Schedule heading */}
        {showPersonalized && category && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-primary font-display mb-4">
            ✨ PERSONALIZED SCHEDULE FOR {category.toUpperCase()} BODY TYPE
          </motion.p>
        )}

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="font-display text-primary text-left p-3 border-b border-border">TIME</th>
                {dayLabels.map(d => (
                  <th key={d} className="font-display text-primary text-center p-3 border-b border-border">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeSchedule.map((row) => (
                <motion.tr
                  key={row.time}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="font-display text-sm p-3 border-b border-border/50">{row.time}</td>
                  {days.map(d => (
                    <td key={d} className={`text-center text-sm p-3 border-b border-border/50 font-medium ${classColor(row[d])}`}>
                      <motion.span whileHover={{ scale: 1.1 }} className="inline-block">
                        {row[d]}
                      </motion.span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {!showPersonalized && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-xs text-muted-foreground mt-6">
            Enter your weight and height above to get a personalized workout schedule
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
