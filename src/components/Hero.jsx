import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Hero = ({ onExplore }) => {
  return (
    <section className="relative min-h-[70vh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2W3J8d2wT1oG5YwQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-slate-600">
            Stories Take Shape
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-prose">
            Discover a curated selection of books brought to life with gentle 3D motion. Explore, collect, and savor narratives through a serene, modern bookstore experience.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={onExplore} className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-3 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition">
              Explore Catalog
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 text-slate-700 px-5 py-3 hover:bg-white/60 backdrop-blur">
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-900/5"
        >
          <div className="grid grid-cols-3 gap-4">
            {['Hardcover', 'New', 'Indie', 'Poetry', 'Sci-Fi', 'Design'].map((tag) => (
              <div key={tag} className="rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-sky-50 px-4 py-6 text-center text-slate-700 text-sm font-medium">
                {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
