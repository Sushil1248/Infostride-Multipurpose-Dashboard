import React, { useState } from 'react';
import MegaMenu from './subcomponents/MegaMenu';
import SearchCart from './subcomponents/SearchCart';
import MobileMenu from './subcomponents/MobileMenu';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface HeaderProps {
    currencies: string[];
    navigation: {
        categories: { name: string; featured: any[]; categories: any[]; collection: any[]; brands: any[] }[];
        pages: { name: string; href: string }[];
    };
}

const StorFrontHeader: React.FC<HeaderProps> = ({ currencies, navigation }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative z-10">
            <nav aria-label="Top">
                {/* <TopBar currencies={currencies} /> */}
                <div className="bg-white">
                    <div className="border-b border-gray-200">
                        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-4">
                            <div className="flex h-16 items-center justify-between">
                                {/* Mobile menu button */}
                                <button
                                    type="button"
                                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                <div className="logo flex items-center gap-2 font-bold text-3xl leading-normal font-montserrat">
                                    <img src="assets/ecom/logo.svg" alt="dsd" className='w-8' />
                                    Furniro
                                </div>

                                {/* MegaMenu for larger screens */}
                                <MegaMenu categories={navigation.categories} pages={navigation.pages} />

                                {/* Search and Cart */}
                                <SearchCart />

                                {/* Mobile Menu */}
                                {mobileMenuOpen && (
                                    <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default StorFrontHeader;
