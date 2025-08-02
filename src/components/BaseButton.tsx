import React from 'react';

interface BaseButtonProps {
  href: string;
  variant?: 'blue' | 'white' | 'pink';
  className?: string;
  children: React.ReactNode;
}

export default function BaseButton({ href, variant = 'blue', className = '', children }: BaseButtonProps) {
  return (
    <a 
      href={href} 
      className={`base-button base-button--${variant} ${className}`}
    >
      <span className="base-button__text">
        {children}
      </span>
      <div className="base-button__icon">
        <div className="base-button__icon-arrow"></div>
      </div>
    </a>
  );
}