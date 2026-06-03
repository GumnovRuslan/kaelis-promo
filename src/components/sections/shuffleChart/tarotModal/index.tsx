import styles from './styles.module.scss';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CloseButton } from '@/components/ui';
import type { TTarotCards } from '@/lib/types/shuffle';

export const TarotModalCard = ({ card, onClose }: { card: TTarotCards; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.tarotModalCard}
      onClick={onClose}
    >
      <div className={styles.tarotModalCard__inner} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          className={styles.tarotModalCard__close}
          onClick={onClose}
          label={'Close modal'}
        />
        <Image
          className={styles.tarotModalCard__image}
          src={card.image}
          width={200}
          height={320}
          alt={card.name}
          priority
        />
        <h3 className={styles.tarotModalCard__title}>{card.name}</h3>
        <p className={styles.tarotModalCard__description}>{card.description}</p>
      </div>
    </motion.div>
  );
};
