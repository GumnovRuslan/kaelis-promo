export const checkEmail = () => {
  if (typeof window === 'undefined') {
    return { value: null, isTrue: false };
  }
  
  const value = window.localStorage.getItem('userEmail');
  return { value, isTrue: !!value };
}

export const sendEmail = (value: string) => {
  if (typeof window === 'undefined') return;
  
  window.localStorage.setItem('userEmail', value);
}