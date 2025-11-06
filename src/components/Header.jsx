import React from 'react';
import { ShoppingCart, BookOpen, Menu, X, Shield } from 'lucide-react';

const Header = ({ onNavigate, onToggleCart, cartCount, currentView, adminMode, onToggleAdmin }) => {
  const [open, setOpen] = React.useState(false);

  const linkBase = 'text-slate-600 hover:text-slate-900 transition-colors';
  const activeLink = 'text-slate-900 font-semibold';

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-200 via-amber-200 to-emerald-200 shadow-inner" />
            <button onClick={() => onNavigate('home')} className="flex items-baseline gap-2 group">
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
                Leaf & Lore
              </span>
              <BookOpen className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`${linkBase} ${currentView === 'home' ? activeLink : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`${linkBase} ${currentView === 'catalog' ? activeLink : ''}`}
            >
              Catalog
            </button>
            <button
              onClick={() => onToggleAdmin(!adminMode)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${adminMode ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              title="Toggle Admin Dashboard"
            >
              <Shield className="h-4 w-4" /> {adminMode ? 'Admin On' : 'Admin Off'}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleCart}
              className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 min-w-[1.5rem] px-1 rounded-full bg-emerald-500 text-white text-xs grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 rounded-md border border-slate-200" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-3 border-t border-slate-200 flex items-center gap-4">
            <button onClick={() => { onNavigate('home'); setOpen(false); }} className={`${linkBase} ${currentView === 'home' ? activeLink : ''}`}>Home</button>
            <button onClick={() => { onNavigate('catalog'); setOpen(false); }} className={`${linkBase} ${currentView === 'catalog' ? activeLink : ''}`}>Catalog</button>
            <button onClick={() => { onToggleAdmin(!adminMode); setOpen(false); }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm border-slate-200 text-slate-600"> <Shield className="h-4 w-4"/> {adminMode ? 'Admin On' : 'Admin Off'} </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
