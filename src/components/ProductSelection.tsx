import { motion } from 'motion/react';
import { Coins, ArrowRight, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

interface ProductSelectionProps {
  onSelect: (type: 'buy' | 'sell', amount: number) => void;
}

const PACKAGES = [
  { amount: 250, price: 65.90 },
  { amount: 750, price: 197.70 },
  { amount: 1500, price: 275.40 },
  { amount: 3000, price: 550.80 },
  { amount: 4500, price: 826.20 },
];

export default function ProductSelection({ onSelect }: ProductSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">O que você deseja fazer?</h1>
        <p className="text-zinc-400 text-lg">Compre ou venda suas Tibia Coins com a melhor cotação do mercado.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 cursor-pointer hover:border-yellow-500/50 transition-colors"
          onClick={() => document.getElementById('buy-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="bg-yellow-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <ArrowDownToLine className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Comprar Tibia Coins</h2>
          <p className="text-zinc-400">Receba suas coins instantaneamente após a confirmação do pagamento.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 cursor-pointer hover:border-emerald-500/50 transition-colors"
          onClick={() => document.getElementById('sell-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="bg-emerald-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <ArrowUpFromLine className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Vender Tibia Coins</h2>
          <p className="text-zinc-400">Venda suas coins e receba o dinheiro na sua conta via PIX em minutos.</p>
        </motion.div>
      </div>

      <div id="buy-section" className="scroll-mt-24">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Coins className="text-yellow-500" />
          Pacotes de Compra
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PACKAGES.map((pkg, idx) => (
            <motion.button
              key={pkg.amount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect('buy', pkg.amount)}
              className="bg-zinc-900 border border-zinc-800 hover:border-yellow-500 rounded-xl p-6 text-left group transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Coins className="w-6 h-6 text-yellow-500" />
                  <span className="text-xl font-bold text-white">{pkg.amount} TC</span>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-yellow-500 transition-colors" />
              </div>
              <div className="text-sm text-zinc-400 mb-1">Valor a pagar</div>
              <div className="text-2xl font-bold text-white">
                R$ {pkg.price.toFixed(2).replace('.', ',')}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
