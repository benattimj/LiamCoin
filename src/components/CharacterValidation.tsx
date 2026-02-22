import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Search, CheckCircle2, XCircle, Loader2, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { checkCharacterExists, CharacterResponse } from '../services/tibiaService';

interface CharacterValidationProps {
  type: 'buy' | 'sell';
  amount: number;
  onBack: () => void;
  onConfirm: (character: CharacterResponse['character']['character']) => void;
}

export default function CharacterValidation({ type, amount, onBack, onConfirm }: CharacterValidationProps) {
  const [characterName, setCharacterName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characterData, setCharacterData] = useState<CharacterResponse['character']['character'] | null>(null);

  const handleCheck = async (e: FormEvent) => {
    e.preventDefault();
    if (!characterName.trim()) return;

    setIsLoading(true);
    setError(null);
    setCharacterData(null);

    try {
      const data = await checkCharacterExists(characterName);
      if (data) {
        setCharacterData(data);
      } else {
        setError('Personagem não encontrado. Verifique o nome e tente novamente.');
      }
    } catch (err) {
      setError('Erro ao consultar o personagem. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para pacotes
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {type === 'buy' ? 'Para qual personagem enviaremos?' : 'De qual personagem você enviará?'}
          </h2>
          <p className="text-zinc-400">
            Você selecionou <strong className="text-yellow-500">{amount} Tibia Coins</strong>.
            Informe o nome do personagem para validação.
          </p>
        </div>

        <form onSubmit={handleCheck} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Nome do personagem"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-4 pl-12 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
              disabled={isLoading}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <button
              type="submit"
              disabled={isLoading || !characterName.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 px-6 py-2 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Verificar'
              )}
            </button>
          </div>
        </form>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 text-red-400"
          >
            <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}

        {characterData && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{characterData.name}</h3>
                  <p className="text-zinc-400 text-sm">
                    Level {characterData.level} • {characterData.vocation} • {characterData.world}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-500/90">
                Personagem validado com sucesso no Tibia.com. Confirme se os dados acima estão corretos antes de prosseguir.
              </p>
            </div>

            <button
              onClick={() => onConfirm(characterData)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Confirmar e Prosseguir
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
