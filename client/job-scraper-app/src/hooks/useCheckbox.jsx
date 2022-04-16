import { useEffect, useState } from 'react';

export const useCheckBox = () => {
  const [isChecked, setIsChecked] = useState(true);
  useEffect(() => {
    const mode = localStorage.getItem('theme');
    mode === 'dark' ? setIsChecked(true) : setIsChecked(false);
  }, []);

  return { isChecked, setIsChecked };
};
