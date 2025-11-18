import styles from './styles.module.scss'
import type { ArchetypeKey } from '@/types/ArchetypeKey'
import { RESULTS } from '../../result_schemes'
import ResultHeader from '../result_header'
import ResultContent from '../result_content'
import ResultsBottom from '../result_bottom'

type TProps = {
  result: ArchetypeKey
}

const Result = ({ result }: TProps) => {
  const data = RESULTS[result]

  return (
    <div className={styles.result}>
      <div className={styles.result__inner}>
        <ResultHeader title={data.title} subtitle={data.subtitle}/>
        <ResultContent blocks={data.blocks}/>
        <ResultsBottom affirmation={data.affirmation}/>
      </div>
    </div>
  )
}

export default Result
