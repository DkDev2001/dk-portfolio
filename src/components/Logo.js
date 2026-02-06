import React from 'react';
import logoSvg from '../assets/img/logo.svg';

export const Logo = () => {
  return (
    <svg dangerouslySetInnerHTML={{ __html: logoSvg }} />
  );
};