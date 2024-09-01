import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

interface Category {
  name: string;
  featured: { name: string; href: string }[];
  categories: { name: string; href: string }[];
  collection: { name: string; href: string }[];
  brands: { name: string; href: string }[];
}

interface Page {
  name: string;
  href: string;
}

interface MegaMenuProps {
  categories: Category[];
  pages: Page[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ categories, pages }) => {
  return (
    <div className="hidden h-full lg:flex">
      <div className="flex h-full align-middle items-center justify-between space-x-8">
        {categories.map((category, categoryIdx) => (
          <Popover key={category.name} className="flex font-poppins text-md font-semibold ">
            <PopoverButton className="relative z-10 -mb-px mr-12 flex items-center  border-b-2 border-transparent  text-gray-700 hover:text-gray-800">
              {category.name}
            </PopoverButton>
            <PopoverPanel className="absolute inset-x-0 top-full text-gray-500">
              <div className="relative bg-white">
                <div className="mx-auto max-w-7xl px-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-12 pt-10">
                    {/* Featured */}
                    <div className="grid grid-cols-2 gap-x-8">
                      <div>
                        <p className="font-medium text-gray-900">Featured</p>
                        <ul className="mt-6 space-y-6">
                          {category.featured.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="hover:text-gray-800">{item.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Categories</p>
                        <ul className="mt-6 space-y-6">
                          {category.categories.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="hover:text-gray-800">{item.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Collection and Brands */}
                    <div className="grid grid-cols-2 gap-x-8">
                      <div>
                        <p className="font-medium text-gray-900">Collection</p>
                        <ul className="mt-6 space-y-6">
                          {category.collection.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="hover:text-gray-800">{item.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Brands</p>
                        <ul className="mt-6 space-y-6">
                          {category.brands.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="hover:text-gray-800">{item.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        ))}
        {pages.map((page) => (
          <a key={page.name} href={page.href} className="flex items-center font-poppins text-md font-semibold text-gray-700 hover:text-gray-800" style={{ marginRight: "3rem !important" }}>
            {page.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
