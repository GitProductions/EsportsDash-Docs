"use client";

import React, { useState } from 'react';
import { Image } from 'nextra/components';
import { InfoIcon } from 'lucide-react';
import '../app/styles/InteractiveImage.css';
import Link from 'next/link';

const InteractiveDocImage = ({ 
  src, 
  alt, 
  width = "100%", 
  hotspots = [],
  title,
  description
}) => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Define position mappings for number indicator
  const getNumberPositionStyles = (position) => {
    const size = '1.5rem'; // Matches your CSS width/height
    const offset = '-0.75rem'; // Half the size for proper alignment

    switch (position) {
      case 'top-left':
        return { top: offset, left: offset };
      case 'top-right':
        return { top: offset, right: offset };
      case 'bottom-left':
        return { bottom: offset, left: offset };
      case 'bottom-right':
        return { bottom: offset, right: offset };
      case 'center':
        return { 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)' 
        };
      default:
        return { top: offset, left: offset }; // Default to top-left
    }
  };

  return (
    <div className="interactive-doc-container">
      {title && <h2 className="interactive-doc-title">{title}</h2>}
      {description && <p className="interactive-doc-description">{description}</p>}

      <div className="interactive-doc-image-container">
        <div className="interactive-doc-relative-wrapper">
          <Image src={src} alt={alt} width={width} />

          <div className="interactive-doc-overlay">
            {hotspots.map((hotspot, index) => {
              const tooltipPosition = hotspot.tooltipPosition || 'bottom';
              const numberPosition = hotspot.numberPosition || 'center';
              const numberStyles = getNumberPositionStyles(numberPosition);

              return (
                <div
                  key={index}
                  className="interactive-doc-hotspot"
                  style={{
                    top: `${hotspot.top}%`,
                    left: `${hotspot.left}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`
                  }}
                  onClick={() => {
                    setActiveHotspot(index === activeHotspot ? null : index);
                    if (hotspot.onClick) hotspot.onClick();
                  }}
                >
                  <div 
                    className={`interactive-doc-highlight-box ${activeHotspot === index ? 'active' : ''}`}
                    // onMouseEnter={() => setActiveHotspot(index)}
                    // onMouseLeave={() => setActiveHotspot(null)}

                    // onClick={() => {
                    //   setActiveHotspot(index === activeHotspot ? null : index);
                    //   if (hotspot.onClick) hotspot.onClick();
                    // }}
                  />

                  <div 
                    className={`interactive-doc-number ${activeHotspot === index ? 'active' : ''}`}
                    style={numberStyles}
                  >
                    {index + 1}
                  </div>

                  {activeHotspot === index && hotspot.tooltip && (
                    <div className={`interactive-doc-tooltip tooltip-${tooltipPosition}`}>
                      <p className="interactive-doc-tooltip-title">{hotspot.tooltip}</p>
                      {hotspot.description && <p className="interactive-doc-tooltip-description">{hotspot.description}</p>}
                      {hotspot.href && (
                        <div className="interactive-doc-learn-more">
                          <InfoIcon size={16} color='gray'/>
                          {/* <span 
                            className="interactive-doc-learn-more-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = hotspot.href;
                            }}
                          >
                            Learn more
                          </span> */}
                          <Link href={hotspot.href} className="interactive-doc-learn-more-text">
                            Learn more
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="interactive-doc-footer">
        <p>Click on a numbered area to see more information.</p>
      </div>
    </div>
  );
};

export default InteractiveDocImage;