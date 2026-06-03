import styles from './styles.module.scss';

import type { TTarotCards } from '@/lib/types/shuffle';
import { TarotCard } from '../tarotCard';
import { useState, useEffect, useRef } from 'react';

type TProps = {
  cards: TTarotCards[];
  matrix: { x: number; y: number }[];
  backCard: string;
  setSelectCard: (card: TTarotCards) => void;
};

export const Tarot = ({ cards, matrix, backCard, setSelectCard }: TProps) => {
  const [flipped, setFlipped] = useState(false);
  const preloadedImages = useRef(new Set<string>());
  const [isPreloadCards, setIsPreloadCards] = useState(false);

  const preloadImages = async () => {
    if (!cards?.length) return;

    const urls = [backCard, ...cards.map((c) => c.image)].filter(Boolean);

    const notLoadedUrls = urls.filter((url) => !preloadedImages.current.has(url));

    if (notLoadedUrls.length === 0) {
      setIsPreloadCards(true);
      return;
    }

    await Promise.all(
      notLoadedUrls.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
              preloadedImages.current.add(src);
              resolve(true);
            };

            img.onerror = () => resolve(false);

            img.src = src;
          }),
      ),
    );

    setIsPreloadCards(true);
  };

  useEffect(() => {
    preloadImages();
  }, [cards, backCard]);

  useEffect(() => {
    if (!isPreloadCards) return;
    const timer = setTimeout(() => {
      setFlipped(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPreloadCards]);

  const gridSize = matrix.reduce(
    (acc, m) => {
      const maxX = Math.max(acc.maxX, m.x);
      const maxY = Math.max(acc.maxY, m.y);
      return { maxX, maxY };
    },
    { maxX: 0, maxY: 0 },
  );

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${gridSize.maxX + 1}, minmax(0, 200px))`,
        gridTemplateRows: `repeat(${gridSize.maxY + 1}, min-content`,
      }}
    >
      {cards?.map((card, i) => {
        if (!matrix) return null;
        const pos = matrix[i];

        if (!pos) return null;

        return (
          <TarotCard
            card={card}
            id={i}
            backCard={backCard}
            flipped={flipped}
            className={styles.cardContainer}
            style={{
              gridColumnStart: pos.x + 1,
              gridRowStart: pos.y + 1,
            }}
            key={i}
            onClick={() => setSelectCard(card)}
          />
        );
      })}
    </div>
  );
};
