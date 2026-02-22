import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SuccessProps {
  onRestart: () => void;
}

export default function Success({ onRestart }: SuccessProps) {
  return (
    <div className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 mb-8"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-white mb-4"
      >
        Pedido Recebido!
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-zinc-400 text-lg mb-12"
      >
        Estamos processando sua solicitação. Você receberá uma notificação em breve.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onRestart}
        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-8 rounded-xl transition-colors inline-flex items-center gap-2"
      >
        Fazer nova transação
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
