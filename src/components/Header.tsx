import { Coins, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-yellow-500 p-2 rounded-lg">
            <Coins className="w-6 h-6 text-zinc-900" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">TibiaCoin<span className="text-yellow-500">Store</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-zinc-300 hover:text-white font-medium transition-colors">Comprar TC</a>
          <a href="#" className="text-zinc-300 hover:text-white font-medium transition-colors">Vender TC</a>
          <a href="#" className="text-zinc-300 hover:text-white font-medium transition-colors">Dúvidas</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Entrar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
