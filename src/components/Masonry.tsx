import React, { ReactNode } from 'react';
import clsx from 'clsx';
import './Masonry.css';

interface MasonryProps {
  columns?: number;
  gap?: number;
  variant?: 'default' | 'shadow' | 'border' | 'gradient';
  alignment?: 'left' | 'center' | 'right';
  gutter?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  className?: string;
  children: ReactNode;
}

const Masonry: React.FC<MasonryProps> = ({
  columns = 3,
  gap = 20,
  variant = 'default',
  alignment = 'left',
  gutter = 'medium',
  borderRadius = 'none',
  className,
  children,
  ...props
}) => {
  const columnWrapper: { [key: string]: ReactNode[] } = {};
  const result: ReactNode[] = [];

  const variantStyles: { [key: string]: string } = {
    default: '',
    shadow: 'shadow-lg',
    border: 'border border-gray-300',
    gradient: 'bg-gradient-to-r from-gray-100 to-gray-200',
  };

  const alignmentStyles: { [key: string]: string } = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const gutterStyles: { [key: string]: string } = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  const borderRadiusStyles: { [key: string]: string } = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
  };

  // Create columns
  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  // Distribute children across columns
  React.Children.forEach(children, (child, index) => {
    const columnIndex = index % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div
        key={index}
        className={clsx(
          'masonry-item',
          gutterStyles[gutter],
          borderRadiusStyles[borderRadius]
        )}
        style={{ marginBottom: `${gap}px` }}
      >
        {child}
      </div>
    );
  });

  // Push columns to result array
  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        key={i}
        className={clsx('masonry-column', alignmentStyles[alignment])}
        style={{
          marginLeft: `${i > 0 ? gap : 0}px`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  const baseStyles = 'flex';

  return (
    <div
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {result}
    </div>
  );
};

export {Masonry};
