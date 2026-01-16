import styles from './styles.module.scss';
import { ModalWrapper} from '@/components/ui';
import { getDeviceType, TDevice } from '@/utils/getDevice';
import Image from 'next/image';

type TLinks = {
  platform: TDevice;
  qr_code_src: string | null;
  link: string | null;
}

export default function ModalLimit() {
  const device = getDeviceType()

  // const links: TLinks[] = [
  //   {
  //     platform: 'android'
  //   },
  //   {
  //     platform: 'ios'
  //   }
  // ]

  return (
    <ModalWrapper isShow handlerClose={() => {}}>
      <div className={styles.modal_limit}>
        <h2 className={styles.modal_limit__title}>Лимит раскладов на сегодня исчерпан</h2>
        <p className={styles.modal_limit__description}>Вы использовали все доступные бесплатные расклады на сегодня. </p>
        <p className={styles.modal_limit__description}>В приложении вы сможете получать больше раскладов, сохранять результаты и возвращаться к ним в любое время.</p>
        <div className={styles.modal_limit__qr_container}>
          <div className={styles.modal_limit__qr}>
            <span className={styles.qr}></span>
            {/* <Image src={}/> */}
          </div>
          <div className={styles.modal_limit__qr}>
            <span className={styles.qr}></span>
            {/* <Image src={}/> */}
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}