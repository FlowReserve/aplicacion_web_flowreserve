// src/components/Stats/ItemStats.tsx
import React from 'react';

interface ItemStatsProps {
  number: number | string;
  children: React.ReactNode;
  numberColorClass?: string;
  backgroundColorClass?: string;
  borderColorClass?: string;
}

const ItemStats: React.FC<ItemStatsProps> = ({
  number,
  children,
  numberColorClass = 'text-primary',
  backgroundColorClass = 'bg-gray-50',
  borderColorClass = ''
}) => {
  return (
    <div className={`flex gap-2 items-end ${backgroundColorClass} border  ${borderColorClass} rounded p-2`}>
      <span className={`text-[70px] w-[70px] font-extrabold text-right ${numberColorClass} leading-none`}>
        {number}
      </span>
      <span className="leading-none mb-1 font-medium">
        {children}
      </span>
    </div>
  );
};

export default ItemStats;
