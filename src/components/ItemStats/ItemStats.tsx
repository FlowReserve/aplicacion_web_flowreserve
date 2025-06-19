// src/components/Stats/ItemStats.tsx
import React from 'react';
import CustomLink from '../interactive/CustomLink/CustomLink';

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
  titleLink?: string;
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
  titleLink,
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-2 border rounded p-2 ${backgroundColorClass} ${borderColorClass} ${className}`}
    >
      <div className="flex gap-2 items-end">
        <span className={`text-[70px] w-[100px] font-extrabold text-right ${numberColorClass} leading-none`}>
          {number}
        </span>
        <span className="leading-none mb-1 font-medium">{children}</span>
      </div>

      {linkPath && (
        <div className="">
          {isExternalLink(linkPath.path) ? (
            <a className='mt-3 text-center bg-primary rounded text-white py-1.5' href={linkPath.path} target="_blank" rel="noopener noreferrer">
              {linkPath.value}
            </a>
          ) : (
            <CustomLink className='w-full' title={titleLink} to={linkPath.path}>{linkPath.value}</CustomLink>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemStats;
