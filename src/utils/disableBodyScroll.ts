type TProps = {
  isDisabled?: boolean;
  target?: 'body' | 'html';
  remove?: boolean;
}

const disableBodyScroll = ({
  isDisabled = false, 
  target = 'body',
  remove = false
}: TProps) => {
  if (remove) {
    document.body.classList.remove('no-scroll')
    document.documentElement.classList.remove('no-scroll');
  }
  if (isDisabled) {
    target === 'body'
      ? document.body.classList.add('no-scroll')
      : document.documentElement.classList.add('no-scroll');
    } else {
      target === 'body'
      ? document.body.classList.remove('no-scroll')
      : document.documentElement.classList.remove('no-scroll');
    }
}

export default disableBodyScroll;