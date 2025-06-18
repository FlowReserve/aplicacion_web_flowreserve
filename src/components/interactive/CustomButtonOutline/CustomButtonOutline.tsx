
import type { FC, MouseEventHandler, ReactNode } from 'react';
import './CustomButtonOutline.css'

interface CustomButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    title?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const CustomButtonOutline: FC<CustomButtonProps> = ({
  onClick,
  children,
  title = '',
  type = 'button',
  className = '',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      type={type}
      className={`custom-btn-outline ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButtonOutline;