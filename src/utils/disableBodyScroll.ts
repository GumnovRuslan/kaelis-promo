type TProps = {
  isDisabled?: boolean;
  target?: 'body' | 'html';
  remove?: boolean;
};

const disableBodyScroll = ({ isDisabled = false, target = 'body', remove = false }: TProps) => {
  const element = target === 'body' ? document.body : document.documentElement;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  if (remove) {
    element.classList.remove('no-scroll');
    element.style.paddingRight = '';
    return;
  }

  if (isDisabled) {
    element.classList.add('no-scroll');

    // Добавляем компенсацию ширины скроллбара
    if (scrollbarWidth > 0) {
      element.style.paddingRight = `${scrollbarWidth}px`;
    }
  } else {
    element.classList.remove('no-scroll');
    element.style.paddingRight = '';
  }
};

export default disableBodyScroll;