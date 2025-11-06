import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ProductModal = ({ book, onClose, onAdd }) => {
  return (
    <AnimatePresence>
      {book && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="max-w-3xl w-[92vw] bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5]">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur border border-slate-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{book.title}</h3>
                  <p className="text-slate-600">by {book.author}</p>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  A serene journey through language and imagery. This edition features archival paper, a soft-touch jacket, and curated typography for a slow, thoughtful read.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-900">${book.price.toFixed(2)}</span>
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">{book.category}</span>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => onAdd(book)} className="flex-1 rounded-xl bg-slate-900 text-white py-3 hover:opacity-95">Add to Cart</button>
                  <button onClick={onClose} className="flex-1 rounded-xl border border-slate-300 text-slate-700 py-3 hover:bg-slate-50">Close</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
