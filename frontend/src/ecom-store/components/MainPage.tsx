import React from 'react';
import HeroSection from './subcomponents/HeroSection';
import TrendingProducts from './subcomponents/TrendingProducts';
import Collections from './subcomponents/Collections';
import SaleAndTestimonials from './subcomponents/SaleAndTestimonials';
import { collections, productsWithOldPrices, testimonials, trendingProducts, currencies, navigation } from '../constants/data';
import ProductCard from './subcomponents/ProductCard';
import StorFrontHeader from './StorFrontHeader';
import Footer from './Footer';

const MainPage: React.FC = () => {
  return (
    <main>
      <StorFrontHeader currencies={currencies} navigation={navigation} />
      <HeroSection />
      <TrendingProducts products={trendingProducts} />
      <ProductCard products={productsWithOldPrices} />
      <Collections collections={collections} />
      <SaleAndTestimonials testimonials={testimonials} />
      <Footer />
    </main>
  );
};

export default MainPage;
