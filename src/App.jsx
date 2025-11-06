import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = React.useState('home'); // home | catalog
  const [cartOpen, setCartOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [adminMode, setAdminMode] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [books, setBooks] = React.useState([]); // Admin managed additional books

  const handleAddToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === book.id);
      if (existing) {
        return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = { id: Math.random().toString(36).slice(2), items: cart, total, date: Date.now() };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setCartOpen(false);
    alert('Payment processed successfully (demo). Thank you!');
  };

  const handleCreateBook = (book) => {
    setBooks(prev => [book, ...prev]);
  };

  const handleDeleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header
        onNavigate={setView}
        onToggleCart={() => setCartOpen(true)}
        cartCount={cart.reduce((s,i) => s + i.qty, 0)}
        currentView={view}
        adminMode={adminMode}
        onToggleAdmin={setAdminMode}
      />

      {view === 'home' && (
        <>
          <Hero onExplore={() => setView('catalog')} />
          <Catalog onSelect={setSelected} cart={cart} onAdd={handleAddToCart} />
        </>
      )}

      {view === 'catalog' && (
        <Catalog onSelect={setSelected} cart={cart} onAdd={handleAddToCart} />
      )}

      {adminMode && (
        <AdminDashboard books={books} onCreate={handleCreateBook} onDelete={handleDeleteBook} orders={orders} />
      )}

      <footer className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">
          <div>
            <div className="text-lg font-semibold">Leaf & Lore</div>
            <p className="text-slate-600">A serene bookstore crafted with care.</p>
          </div>
          <div className="text-slate-600 text-sm">© {new Date().getFullYear()} Leaf & Lore. All rights reserved.</div>
          <div className="flex justify-start md:justify-end">
            <a href="#" className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">Contact</a>
          </div>
        </div>
      </footer>

      <ProductModal book={selected} onClose={() => setSelected(null)} onAdd={handleAddToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
    </div>
  );
}

export default App;
