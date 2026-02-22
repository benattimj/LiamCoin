import { useState } from 'react';
import Header from './components/Header';
import ProductSelection from './components/ProductSelection';
import CharacterValidation from './components/CharacterValidation';
import Checkout from './components/Checkout';
import Success from './components/Success';
import { CharacterResponse } from './services/tibiaService';

type Step = 'select' | 'validate' | 'checkout' | 'success';

export default function App() {
  const [step, setStep] = useState<Step>('select');
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState(0);
  const [character, setCharacter] = useState<CharacterResponse['character']['character'] | null>(null);

  const handleSelect = (type: 'buy' | 'sell', selectedAmount: number) => {
    setTransactionType(type);
    setAmount(selectedAmount);
    setStep('validate');
  };

  const handleValidationConfirm = (validatedCharacter: CharacterResponse['character']['character']) => {
    setCharacter(validatedCharacter);
    setStep('checkout');
  };

  const handleCheckoutComplete = () => {
    setStep('success');
  };

  const handleRestart = () => {
    setStep('select');
    setCharacter(null);
    setAmount(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-yellow-500/30">
      <Header />
      
      <main className="pt-8 pb-24">
        {step === 'select' && (
          <ProductSelection onSelect={handleSelect} />
        )}
        
        {step === 'validate' && (
          <CharacterValidation 
            type={transactionType} 
            amount={amount} 
            onBack={() => setStep('select')}
            onConfirm={handleValidationConfirm}
          />
        )}

        {step === 'checkout' && character && (
          <Checkout 
            type={transactionType}
            amount={amount}
            character={character}
            onBack={() => setStep('validate')}
            onComplete={handleCheckoutComplete}
          />
        )}

        {step === 'success' && (
          <Success onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}
