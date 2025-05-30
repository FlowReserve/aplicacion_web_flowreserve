import { Link } from 'react-router-dom';
import type { FC, ReactNode } from 'react';
import './CustomLink.css'

interface CustomLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  title?: string;
}

const CustomLink: FC<CustomLinkProps> = ({
  to,
  children,
  className = '',
  title = ''
}) => {
  return (
    <Link
      to={to}
      className={`custom-link ${className}`}
      title={title}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
