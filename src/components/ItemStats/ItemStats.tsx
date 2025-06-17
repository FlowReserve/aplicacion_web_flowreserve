// src/components/Stats/ItemStats.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ItemStatsProps {
  number: number | string;
  children: React.ReactNode;
  numberColorClass?: string;
  backgroundColorClass?: string;
  borderColorClass?: string;
  className?: string;
  linkPath?: {
    path: string;
    value: string;
  };
}

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const ItemStats: React.FC<ItemStatsProps> = ({
  number,
  children,
  numberColorClass = 'text-primary',
  backgroundColorClass = 'bg-gray-50',
  borderColorClass = '',
  className = '',
  linkPath,
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-2 border rounded p-2 ${backgroundColorClass} ${borderColorClass} ${className}`}
    >
      <div className="flex gap-2 items-end">
        <span className={`text-[70px] w-[70px] font-extrabold text-right ${numberColorClass} leading-none`}>
          {number}
        </span>
        <span className="leading-none mb-1 font-medium">{children}</span>
      </div>

      {linkPath && (
        <div className="mt-3 text-center bg-primary rounded text-white py-1.5 hover:">
          {isExternalLink(linkPath.path) ? (
            <a href={linkPath.path} target="_blank" rel="noopener noreferrer">
              {linkPath.value}
            </a>
          ) : (
            <Link to={linkPath.path}>{linkPath.value}</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemStats;
