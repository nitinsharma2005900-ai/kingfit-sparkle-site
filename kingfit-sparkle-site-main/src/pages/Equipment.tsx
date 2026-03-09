import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const equipment = [
  { name: 'Treadmill', desc: 'Commercial-grade treadmills with incline control, heart rate monitoring, and preset workout programs.', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=300&fit=crop' },
  { name: 'Dumbbells', desc: 'Full rack from 2kg to 50kg, rubber-coated for safety and durability.', image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&h=300&fit=crop' },
  { name: 'Bench Press', desc: 'Adjustable flat, incline, and decline benches with Olympic barbells.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop' },
  { name: 'Squat Rack', desc: 'Power racks with safety bars, pull-up bars, and plate storage.', image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=300&fit=crop' },
  { name: 'Cable Machine', desc: 'Dual adjustable pulley systems for versatile strength training.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop' },
  { name: 'Exercise Bikes', desc: 'Spin bikes and recumbent bikes with digital resistance and performance tracking.', image: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=400&h=300&fit=crop' },
];

const Equipment = () => (
  <div className="min-h-screen pt-20 section-padding">
    <div className="max-w-6xl mx-auto">
      <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl md:text-5xl text-center mb-4">
        GYM <span className="gold-gradient-text">EQUIPMENT</span>
      </motion.h1>
      <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-center mb-12">
        Top-of-the-line equipment for every workout
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((e, i) => (
          <motion.div
            key={e.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-card border border-border rounded-lg overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={e.image}
                alt={e.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl mb-2 gold-gradient-text">{e.name}</h3>
              <p className="text-muted-foreground text-sm">{e.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Equipment;
