"use client";
import { useState } from 'react';
import { Image } from 'nextra/components';
import { X, ZoomIn } from 'lucide-react';

export default function ImageModal({ src, alt, width = '100%' }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="image-modal-container">
        <Image src={src} alt={alt} width={width} />
        <button 
          className="image-zoom-button"
          onClick={() => setIsOpen(true)}
          aria-label="View full size"
        >
          <ZoomIn size={16} />
        </button>
      </div>
        
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content">
            <img 
              src={src} 
              alt={alt} 
              className="modal-image"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              className="modal-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .image-modal-container {
          position: relative;
          display: inline-block;
        }
        
        .image-zoom-button {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        
        .image-zoom-button:hover {
          opacity: 1;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          position: relative;
          max-height: 95vh;
          max-width: 95vw;
        }
        
        .modal-image {
          max-height: 95vh;
          max-width: 95vw;
          object-fit: contain;
        }
        
        .modal-close-button {
          position: absolute;
          top: -15px;
          right: -15px;
          background: white;
          color: black;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}