import React from 'react';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const SearchCart: React.FC = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex space-x-8">
        <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </a>
        <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
          <UserIcon className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <span aria-hidden="true" className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />
      <a href="#" className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
      </a>
    </div>
  );
};

export default SearchCart;
