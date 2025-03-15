import { FC } from 'react';
import { Cards, Image } from 'nextra/components';

interface CustomCardProps {
  title: string;
  href: string;
  description: string;
  src: string;
  alt: string;
  lazyLoad?: boolean;
  padding?: string;
  width?: number | `${number}`; 
  height?: number | `${number}`;
  cardHeight?: number | string; 
  style?: React.CSSProperties;
}

const CustomCard: FC<CustomCardProps> = ({
  title,
  href,
  description,
  src,
  alt,
  lazyLoad = true,
  padding = '0.5rem',
  width = 128,
  height = 128,
}) => {
  return (
    <Cards.Card 
      arrow 
      title={title} 
      href={href}
    >
      {/* Main content container with flex-grow to push title to bottom */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
      }}>
        {/* Image container with flex centering */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}>
          <Image
            loading={lazyLoad ? 'lazy' : 'eager'}
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </div>
        
        {/* Description with flex-grow to push the title to the bottom */}
        <div style={{ 
          display: 'flex', 
          paddingLeft: padding, 
          paddingRight: padding,
          flex: 1,
        }}>
          <p>{description}</p>
        </div>
      </div>
      
    </Cards.Card>
  );
};

export default CustomCard;