'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const AboutSection = forwardRef(({ onScheduleClick }, ref) => {
  return (
    <div ref={ref} className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-3xl font-bold text-gray-800"
            >
              Expert care for your furry, feathery, or scaley friend
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-gray-600"
            >
              We treat your pets as if they were our own. With a team of experienced animal caregivers, we're committed to make every visit a positive
              experience for your pet. From walks to basic care, we can help to make your life easier.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button onClick={onScheduleClick} className="rounded-full bg-slate-700 px-6 py-2 font-medium text-white hover:bg-slate-900 cursor-pointer">
                Schedule a visit
              </button>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src="/images/furryCat.png"
                alt="Cat"
                className="absolute inset-0 h-full w-full object-cover grayscale filter"
                style={{ filter: 'grayscale(100%)' }}
              />
              <div className="bg-opacity-30 absolute bottom-5 left-5">
                <h1 className="text-xl font-normal  text-white drop-shadow-lg">Cat</h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src="/images/parrot2.webp"
                alt="Dog"
                className="h-full w-full object-cover grayscale filter"
                style={{ filter: 'grayscale(100%)' }}
              />
              <div className="bg-opacity-30 absolute bottom-5 left-5">
                <h1 className="text-xl font-normal  text-white drop-shadow-lg">Parrot</h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src="/images/furryHamster.webp"
                alt="Cat"
                className="h-full w-full object-cover grayscale filter"
                style={{ filter: 'grayscale(100%)' }}
              />
              <div className="bg-opacity-30 absolute bottom-5 left-5">
                <h1 className="text-xl font-normal text-white drop-shadow-lg">Hamster</h1>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src="/images/furryDog.png"
                alt="Dog"
                className="h-full w-full object-cover grayscale filter"
                style={{ filter: 'grayscale(100%)' }}
              />
              <div className="bg-opacity-30 absolute bottom-5 left-5">
                <h1 className="text-xl font-normal text-white drop-shadow-lg">Dog</h1>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
