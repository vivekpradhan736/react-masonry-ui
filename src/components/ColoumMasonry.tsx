import React, { ReactNode, CSSProperties } from 'react';
import './ColoumMasonry.css';

interface ColoumMasonryProps {
  children: ReactNode;
}

interface ItemStyles {
  [key: string]: CSSProperties;
}

const ColoumMasonry: React.FC<ColoumMasonryProps> = ({ children }) => {
  const itemStyles: ItemStyles = {
    wide: { gridColumn: 'span 2' },
    tall: { gridRow: 'span 2' },
    big: { gridColumn: 'span 2', gridRow: 'span 2' },
  };

  return (
    <div className="grid-wrapper">
      {React.Children.toArray(children).map((child, index) => {
        const variant = (child as React.ReactElement).props.variant || 'default';
        const additionalStyle = itemStyles[variant] || {};
        const childStyle = (child as React.ReactElement).props.style || {};

        // Apply styles directly to children elements
        return (
          <div
            key={index}
            style={{
              ...additionalStyle,
              ...childStyle,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default ColoumMasonry;