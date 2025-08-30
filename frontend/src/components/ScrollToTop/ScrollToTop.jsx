import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { ScrollButton } from './ScrollToTop.styles';

export const ScrollToTop = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <ScrollButton
      $isVisible={isVisible}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      <FaArrowUp />
    </ScrollButton>
  );
};
