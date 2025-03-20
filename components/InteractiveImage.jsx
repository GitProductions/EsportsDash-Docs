"use client";

import React, { useState } from 'react';
import { Image } from 'nextra/components';
import { InfoIcon } from 'lucide-react';
import '../app/styles/InteractiveImage.css';

const InteractiveDocImage = ({ 
  src, 
  alt, 
  width = "100%", 
  hotspots = [],
  title,
  description
}) => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="interactive-doc-container">
      {title && <h2 className="interactive-doc-title">{title}</h2>}
      {description && <p className="interactive-doc-description">{description}</p>}
      
      <div className="interactive-doc-image-container">
        <div className="interactive-doc-relative-wrapper">
          {/* Base image */}
          <Image src={src} alt={alt} width={width} />
          
          {/* Hotspot overlay */}
          <div className="interactive-doc-overlay">
            {hotspots.map((hotspot, index) => {
              // Use predefined tooltip position or default to 'bottom'
              const tooltipPosition = hotspot.tooltipPosition || 'bottom';
              
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
                >
                  {/* Highlight box */}
                  <div 
                    className={`interactive-doc-highlight-box ${activeHotspot === index ? 'active' : ''}`}
                    onClick={() => {
                      setActiveHotspot(index === activeHotspot ? null : index);
                      if (hotspot.onClick) hotspot.onClick();
                    }}
                  />
                  
                  {/* Number indicator */}
                  <div className={`interactive-doc-number ${activeHotspot === index ? 'active' : ''}`}>
                    {index + 1}
                  </div>
                  
                  {/* Tooltip with positioning */}
                  {activeHotspot === index && hotspot.tooltip && (
                    <div className={`interactive-doc-tooltip tooltip-${tooltipPosition}`}>
                      <p className="interactive-doc-tooltip-title">{hotspot.tooltip}</p>
                      {hotspot.description && <p className="interactive-doc-tooltip-description">{hotspot.description}</p>}
                      {hotspot.href && (
                        <div className="interactive-doc-learn-more">
                          <InfoIcon size={16} />
                          <span 
                            className="interactive-doc-learn-more-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = hotspot.href;
                            }}
                          >
                            Learn more
                          </span>
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
        <p>Hover over or click on a numbered area to see more information.</p>
      </div>
    </div>
  );
};

export default InteractiveDocImage;