import { motion } from 'motion/react';
import { CheckCircle2, Coins, ArrowLeft, Copy, QrCode } from 'lucide-react';
import { CharacterResponse } from '../services/tibiaService';

interface CheckoutProps {
  type: 'buy' | 'sell';
  amount: number;
  character: CharacterResponse['character']['character'];
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ type, amount, character, onBack, onComplete }: CheckoutProps) {
  const price = type === 'buy' ? amount * 0.1836 : amount * 0.17; // Example pricing

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para validação
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="bg-zinc-950 p-8 border-b border-zinc-800 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-4">
            <Coins className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Resumo do Pedido</h2>
          <p className="text-zinc-400">
            {type === 'buy' ? 'Você está comprando' : 'Você está vendendo'} <strong className="text-yellow-500">{amount} TC</strong>
          </p>
        </div>

        <div className="p-8">
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center py-4 border-b border-zinc-800">
              <span className="text-zinc-400">Personagem</span>
              <span className="font-bold text-white">{character.name}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-zinc-800">
              <span className="text-zinc-400">Mundo</span>
              <span className="font-medium text-white">{character.world}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-zinc-800">
              <span className="text-zinc-400">Valor Total</span>
              <span className="text-2xl font-bold text-emerald-500">
                R$ {price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {type === 'buy' ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-8 text-center">
              <QrCode className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Pagamento via PIX</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Escaneie o QR Code ou copie o código abaixo para pagar.
              </p>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg p-2">
                <input 
                  type="text" 
                  readOnly 
                  value="00020126580014br.gov.bcb.pix0136..." 
                  className="bg-transparent text-zinc-500 w-full outline-none px-2 text-sm"
                />
                <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Instruções de Transferência</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Transfira <strong className="text-yellow-500">{amount} TC</strong> para o personagem abaixo:
              </p>
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-700 rounded-lg p-4">
                <span className="font-bold text-white text-lg">TibiaCoinStore</span>
                <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white transition-colors flex items-center gap-2 text-sm">
                  <Copy className="w-4 h-4" /> Copiar
                </button>
              </div>
            </div>
          )}

          <button
            onClick={onComplete}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            {type === 'buy' ? 'Já realizei o pagamento' : 'Já transferi as coins'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
