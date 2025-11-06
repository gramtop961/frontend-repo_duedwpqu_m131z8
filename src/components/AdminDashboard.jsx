import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

const AdminDashboard = ({ books, onCreate, onDelete, orders }) => {
  const [form, setForm] = React.useState({ title: '', author: '', price: '', category: 'Fiction', cover: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price) return;
    const newBook = {
      id: Math.random().toString(36).slice(2),
      title: form.title,
      author: form.author,
      price: parseFloat(form.price),
      category: form.category,
      rating: 4.5,
      cover: form.cover || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
    };
    onCreate(newBook);
    setForm({ title: '', author: '', price: '', category: 'Fiction', cover: '' });
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Books</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {books.map((b) => (
              <div key={b.id} className="flex gap-3 items-center border border-slate-200 rounded-xl p-3">
                <img src={b.cover} alt={b.title} className="h-16 w-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{b.title}</div>
                  <div className="text-sm text-slate-600">{b.author}</div>
                </div>
                <button onClick={() => onDelete(b.id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full px-4 py-3 rounded-xl border border-slate-200" />
            <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" className="w-full px-4 py-3 rounded-xl border border-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full px-4 py-3 rounded-xl border border-slate-200" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200">
                {['Fiction','Design','Poetry','Sci-Fi','Non-Fiction'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <input value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} placeholder="Cover Image URL" className="w-full px-4 py-3 rounded-xl border border-slate-200" />
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-3"><Plus className="h-4 w-4"/> Add Book</button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-slate-600">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-700">{o.items.length} items • ${o.total.toFixed(2)}</div>
                  <div className="text-xs text-slate-500">{new Date(o.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AdminDashboard;
