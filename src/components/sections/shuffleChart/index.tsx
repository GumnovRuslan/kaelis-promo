import styles from './styles.module.scss';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { TTarotCards } from '@/lib/types/shuffle';
import { Tarot } from './tarot';
import { TarotModalCard } from './tarotModal';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type TProps = {
  matrix: { x: number; y: number }[];
  cards: TTarotCards[];
  backCard: string;
};

export const ShuffleCart = ({ matrix, cards, backCard }: TProps) => {
  const t = useTranslations();
  const [selectedCard, setSelectCard] = useState<TTarotCards | null>(null);

  return (
    <>
      <div className={styles.tarotShuffle}>
        <div className={styles.learnMore}>
          <span className={styles.learnMore__sign}>i</span>
          <span className={styles.learnMore__text}>{t('CategoriesPage.tarot.more')}</span>
        </div>

        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={3}
          wheel={{ step: 0.001 }}
          doubleClick={{ mode: 'reset' }}
          limitToBounds={true}
        >
          <TransformComponent
            wrapperStyle={{
              touchAction: 'none',
              // width: '100%',
              height: '100%',
              borderRadius: '15px',
              background: '#1f1d2e',
            }}
            contentStyle={{ width: '100%', height: '100%' }}
          >
            <Tarot
              cards={cards}
              matrix={matrix}
              backCard={backCard}
              setSelectCard={setSelectCard}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

      <AnimatePresence>
        {selectedCard && <TarotModalCard card={selectedCard} onClose={() => setSelectCard(null)} />}
      </AnimatePresence>
    </>
  );
};
