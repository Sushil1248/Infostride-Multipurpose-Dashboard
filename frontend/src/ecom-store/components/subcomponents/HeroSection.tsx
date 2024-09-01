import React from 'react';
import HeroBanner from './HeroBanner';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col border-b border-gray-200 lg:border-0 herosection min-h-[650px] w-full place-self-end pr-16">
        <HeroBanner />
    </div>
  );
};

export default HeroSection;
