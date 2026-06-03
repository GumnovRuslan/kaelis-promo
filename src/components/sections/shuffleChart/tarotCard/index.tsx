import styles from './styles.module.scss';

import cn from 'classnames';
import Image from 'next/image';
import type { TTarotCards } from '@/lib/types/shuffle';
import { motion } from 'framer-motion';
import { shuffleActions, useAppDispatch, useAppSelector } from '@/store';

type TProps = {
  card: TTarotCards;
  backCard: string;
  flipped?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick: () => void;
  id?: number;
};

export const TarotCard = ({
  card,
  id = 1,
  backCard,
  flipped = false,
  onClick,
  style,
  className,
}: TProps) => {
  const { isFirstAnimationDone, response } = useAppSelector((state) => state.shuffle);
  const dispatch = useAppDispatch();
  return (
    <button
      type='button'
      className={cn(styles.tarotCard, className)}
      style={{ perspective: 1000, width: '100%', height: '100%', ...style }}
      onClick={onClick}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.2,
          rotateY: isFirstAnimationDone ? 180 : 0,
        }}
        animate={{
          rotateY: flipped ? 180 : 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: isFirstAnimationDone ? 0 : 0.3,
          delay: isFirstAnimationDone ? 0 : id / 3,
        }}
        onAnimationComplete={() => {
          if (response?.cards && response?.cards?.length - 1 !== id) return;
          dispatch(shuffleActions.setIsFirstAnimationDone(true));
        }}
        className={styles.tarotCard__inner}
      >
        {/* FRONT */}
        <div className={styles.tarotCard__front}>
          <Image
            src={card.image}
            alt={card.name}
            width={300}
            height={500}
            className={styles.tarotCard__image}
            draggable={false}
          />
        </div>

        {/* BACK */}
        <div className={styles.tarotCard__back}>
          <Image
            src={backCard ?? '/images/cards/card_back.webp'}
            alt='Back side'
            width={300}
            height={500}
            className={styles.tarotCard__image}
            draggable={false}
          />
        </div>
      </motion.div>
    </button>
  );
};
