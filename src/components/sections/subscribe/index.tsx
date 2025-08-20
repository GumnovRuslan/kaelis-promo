'use client'

import styles from './styles.module.scss';

import { Button, Card } from '@/components/ui';
import { useModalContext } from '@/context/modal';

const CARDS_DATA = [
  {
    title: 'Natal chart',
    desc: 'Understand what is built into your personality'
  },
  {
    title: 'Destiny Matrix',
    desc: 'Get advice for important decisions'
  },
  {
    title: 'Tarot based on your data',
    desc: 'A mindful view of events'
  },
  {
    title: 'Affirmations',
    desc: 'set yourself on the right wavelength'
  },
]

const Subscribe = () => {
  const { openModal, setContent } = useModalContext()

  const handlerOpenModal = () => {
    setContent('join')
    openModal()
  }

  return (
    <section className={styles.subscribe}>
      <div className={styles.subscribe__inner}>
        <div className={styles.subscribe__header}>
          <Button text='Try it first' as='button' onClick={handlerOpenModal}/>
          <p className={styles.subscribe__description}>
            Subscribe now and get premium access for a week after the launch
          </p>
        </div>
        <div className={styles.subscribe__content}>
          {CARDS_DATA.map((card, i) => 
            <Card {...card} img_num={i+1} key={i}/>
          )}
        </div>
      </div>
    </section>
  )
}

export default Subscribe;