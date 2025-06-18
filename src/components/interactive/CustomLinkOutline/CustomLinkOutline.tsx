import { Link } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import './CustomLinkOutline.css'

interface CustomLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  title?: string;
}

const CustomLinkOutline: FC<CustomLinkProps> = ({
  to,
  children,
  className = '',
  title = ''
}) => {
  return (
    <Link
      to={to}
      className={`custom-link-outline ${className}`}
      title={title}
    >
      {children}
    </Link>
  );
};

export default CustomLinkOutline;
