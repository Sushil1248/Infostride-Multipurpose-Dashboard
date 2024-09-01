import React from 'react';

import { footerNavigation } from '../constants/data';
import FooterLogo from './subcomponents/FooterLogo';
import FooterNavigation from './subcomponents/FooterNavigation';
import NewsletterSignup from './subcomponents/NewsletterSignup';
import ExclusiveSale from './subcomponents/ExclusiveSale';
import FooterBottom from './subcomponents/FooterBottom';

const Footer: React.FC = () => {
    return (
        <footer aria-labelledby="footer-heading" className="bg-white">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <FooterLogo />
                <FooterNavigation navigation={footerNavigation} />
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
                    <NewsletterSignup />
                    <ExclusiveSale />
                </div>
                <FooterBottom navigation={footerNavigation.bottomLinks} />
            </div>
        </footer>
    );
};

export default Footer;
