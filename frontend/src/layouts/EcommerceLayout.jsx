import React from 'react';
import StorFrontHeader from '../ecom-store/components/StorFrontHeader';
import Footer from '../ecom-store/components/Footer';
import { currencies, navigation } from '../ecom-store/constants/data';

const EcommerceLayout = ({ children }) => {
    return (
        <div className='test'>
            
            <main>
                {children}
            </main>
            
        </div>
    );
}

export default EcommerceLayout;
