import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CartDrawer = ({ open, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl border-l border-slate-200 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={onClose} className="p-2 rounded-full border border-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-slate-600">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center border border-slate-200 rounded-xl p-3">
                    <img src={item.cover} alt={item.title} className="h-20 w-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-600">Qty {item.qty}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(item.price * item.qty).toFixed(2)}</div>
                      <button onClick={() => onRemove(item.id)} className="text-sm text-rose-600 hover:underline">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-slate-700">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} className="w-full rounded-xl bg-emerald-600 text-white py-3 hover:opacity-95 active:scale-[0.99]">
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
