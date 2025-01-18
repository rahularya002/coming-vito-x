"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';

// Responsive column counts
const COLUMN_COUNTS = {
  MOBILE: 3,
  TABLET: 5,
  DESKTOP: 7
};

const ROW_COUNT = 7;
const ITEM_HEIGHT = 160;
const DURATION = 40;

// Assuming images are in the public folder
const images = [
  '/vito-x/web-1.jpg',
  '/vito-x/web-2.jpg',
  '/vito-x/web-3.jpg',
  '/vito-x/web-4.jpg',
  '/vito-x/web-5.jpg',
  '/vito-x/web-6.jpg',
  '/vito-x/web-7.jpg',
  '/vito-x/web-8.jpg',
  '/vito-x/web-9.jpg',
  '/vito-x/web-10.jpg',
  '/vito-x/web-11.jpg',
  '/vito-x/web-12.jpg',
  '/vito-x/web-13.jpg',
  '/vito-x/web-14.jpg',
  '/vito-x/web-15.jpg',
  '/vito-x/web-16.jpg',
  '/vito-x/web-17.jpg',
  '/vito-x/web-18.jpg',
  '/vito-x/web-19.jpg',
  '/vito-x/web-20.jpg',
  '/vito-x/web-21.jpg',
  '/vito-x/web-22.jpg',
  '/vito-x/web-23.jpg',
  '/vito-x/web-24.jpg',
  '/vito-x/web-25.jpg',
  '/vito-x/web-26.jpg',
  '/vito-x/web-27.jpg',
];

const ColumnComponent = ({ columnIndex, direction }: { columnIndex: number; direction: 1 | -1 }) => {
  const items = [...Array(ROW_COUNT)].map((_, rowIndex) => (
    <div
      key={`${columnIndex}-${rowIndex}`}
      className="border border-gray-500/40 h-32 sm:h-36 md:h-40 flex items-center justify-center overflow-hidden transition-all hover:border-gray-500/60 hover:scale-105"
    >
      <div className="relative w-full h-full">
        <Image
          src={images[rowIndex % images.length]}
          alt={`Image ${columnIndex}-${rowIndex}`}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 20vw, 14vw"
          className="object-cover opacity-60 hover:opacity-100 transition-opacity"
          priority={rowIndex === 0}
        />
      </div>
      <div className="absolute text-gray-500/60 font-mono text-xs sm:text-sm hover:text-gray-500/80">
        {`${String(columnIndex + 1).padStart(2, '0')}-${String(rowIndex + 1).padStart(2, '0')}`}
      </div>
    </div>
  ));

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ y: direction === 1 ? 0 : -ITEM_HEIGHT * ROW_COUNT }}
        animate={{
          y: direction === 1 ? -ITEM_HEIGHT * ROW_COUNT : 0
        }}
        transition={{
          repeat: Infinity,
          duration: DURATION,
          ease: "linear",
          repeatType: "reverse"
        }}
      >
        <div className="grid gap-2 sm:gap-3 md:gap-4">
          {items}
          {items}
          {items}
        </div>
      </motion.div>
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
};

const Background = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  
  const getColumnCount = () => {
    if (isMobile) return COLUMN_COUNTS.MOBILE;
    if (isTablet) return COLUMN_COUNTS.TABLET;
    return COLUMN_COUNTS.DESKTOP;
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="grid grid-flow-col gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-3 md:mx-4 h-full">
        {[...Array(getColumnCount())].map((_, colIndex) => (
          <ColumnComponent
            key={colIndex}
            columnIndex={colIndex}
            direction={colIndex % 2 === 0 ? 1 : -1}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;