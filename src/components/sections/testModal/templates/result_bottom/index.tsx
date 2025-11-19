'use client'

import { useTranslations } from 'next-intl';
import styles from './styles.module.scss'
import { Button } from '@/components/ui';
import SubscribeForm from '../form_practice';
import { useState } from 'react';
import { Animation } from '@/components/ui';
import { AnimatePresence } from 'motion/react';

function ResultsBottom({affirmation}: {affirmation: string}) {
  const t = useTranslations('Archetypes');
  const tt = useTranslations('TestSection.result_additional_text')

  const [isShowForm, setIsShowForm] = useState(false)
  
  return (
    <div className={styles.bottom}>
      <div className={styles.bottom__affirmation}>
        <span className={styles.bottom__affirmation_text}>"{t(affirmation)}"</span>
      </div>
      <AnimatePresence mode='wait'>
      {isShowForm 
        ? (
          <Animation animationKey={'form'} animName='opacity'>
            <SubscribeForm/>
          </Animation>
        )
        : (
          <Animation animationKey={'button'} animName='opacity'>
            <Button as='button' type='button' text='Get Practice' className={styles.bottom__button} onClick={() => {setIsShowForm(true)}}/>
          </Animation> 
        )
       }
       </AnimatePresence>
      <p className={styles.bottom__message}>
        {tt('text_1')} <strong>{tt('text_2')}</strong> {tt('text_3')} <strong>{tt('text_4')}</strong> {tt('text_5')}
      </p>
    </div>
  )
}

export default ResultsBottom