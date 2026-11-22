import React from 'react';
import { Link } from 'react-router-dom';

export default function AnimatedButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // primary | secondary | outline | gold
  size = 'md', // sm | md | lg
  className = '',
  icon: Icon,
  disabled = false,
  type = 'button'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5'
  }[size] || 'px-6 py-3 text-sm gap-2';

  const variantStyles = {
    primary: 'bg-teal text-white hover:bg-teal-hover shadow-md',
    secondary: 'bg-royal text-white hover:bg-royal-dark shadow-md',
    outline: 'border border-royal text-royal hover:bg-royal hover:text-white',
    tealOutline: 'border border-teal text-teal hover:bg-teal hover:text-white',
    white: 'bg-white text-royal hover:bg-ice shadow-sm border border-ice-border',
    gold: 'bg-teal text-white hover:bg-teal-hover shadow-md shadow-teal/20 font-semibold',
    ghost: 'text-royal hover:text-teal hover:bg-soft-blue/50'
  }[variant] || 'bg-teal text-white';

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        <span>{children}</span>
        {Icon && <Icon className="w-4 h-4" />}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
        {Icon && <Icon className="w-4 h-4" />}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
}
