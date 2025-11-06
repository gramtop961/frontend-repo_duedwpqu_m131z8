import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Filter } from 'lucide-react';

const sampleBooks = [
  {
    id: '1',
    title: 'The Silent Orchard',
    author: 'Lena Harrow',
    price: 18.0,
    category: 'Fiction',
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Patterns of Light',
    author: 'Kai Mendes',
    price: 24.0,
    category: 'Design',
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'The Far Shore',
    author: 'Mira Tan',
    price: 16.0,
    category: 'Poetry',
    rating: 4.2,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Orbiting Echoes',
    author: 'Jin Park',
    price: 22.0,
    category: 'Sci-Fi',
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop',
  },
];

const Catalog = ({ onSelect, cart, onAdd }) => {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [sort, setSort] = React.useState('featured');

  const categories = ['All', ...Array.from(new Set(sampleBooks.map(b => b.category)))];

  const filtered = sampleBooks
    .filter(b =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    )
    .filter(b => (category === 'All' ? true : b.category === category))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white/70"
            />
          </div>
          <div className="flex items-center gap-3">
            <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white/70">
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-slate-400" />
              <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white/70">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map(book => {
              const inCart = cart.find(item => item.id === book.id);
              return (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <button onClick={() => onSelect(book)} className="block w-full text-left">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-semibold text-slate-900">{book.title}</h3>
                      <p className="text-sm text-slate-600">{book.author}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-slate-900">${book.price.toFixed(2)}</span>
                        <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">{book.category}</span>
                      </div>
                    </div>
                  </button>
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => onAdd(book)}
                      className="w-full rounded-xl bg-slate-900 text-white py-2.5 hover:opacity-95 active:scale-[0.99] transition"
                    >
                      {inCart ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Catalog;
