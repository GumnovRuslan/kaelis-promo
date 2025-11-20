'use client'

import { useTranslations } from 'next-intl';
import styles from './styles.module.scss'
import { Button } from '@/components/ui';
import { useModalSubscribeContext } from '@/context/modalSubscribe';
import { useTestModal } from '@/context/TestModalContext';

function ResultsBottom({affirmation}: {affirmation: string}) {
  const { openModal } = useModalSubscribeContext()
  const { closeTest } = useTestModal()
  const t = useTranslations('Archetypes');
  const tt = useTranslations('TestSection.result_additional_text')

  const handleOpenModalSubscribe = () => {
    closeTest()
    openModal()
  }
  
  return (
    <div className={styles.bottom}>
      <div className={styles.bottom__affirmation}>
        <span className={styles.bottom__affirmation_text}>"{t(affirmation)}"</span>
      </div>
      <Button as='button' type='button' text='Get Practice' className={styles.bottom__button} onClick={handleOpenModalSubscribe}/>
      <p className={styles.bottom__message}>
        {tt('text_1')} <strong>{tt('text_2')}</strong> {tt('text_3')} <strong>{tt('text_4')}</strong> {tt('text_5')}
      </p>
    </div>
  )
}

export default ResultsBottom