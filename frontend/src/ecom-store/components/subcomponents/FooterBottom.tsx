import React from 'react';

const FooterBottom: React.FC<{ navigation: any[] }> = ({ navigation }) => {
  return (
    <div className="py-10 md:flex md:items-center md:justify-between ">
      <div className="text-center md:text-left">
        <p className="text-sm text-gray-500">&copy; 2021 All Rights Reserved</p>
      </div>

      <div className="mt-4 flex items-center justify-center md:mt-0">
        <div className="flex space-x-8">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-600">
              {item.name}
            </a>
          ))}
        </div>

        <div className="ml-6 border-l border-gray-200 pl-6">
          <a href="#" className="flex items-center text-gray-500 hover:text-gray-600">
            <img
              alt=""
              src="https://tailwindui.com/img/flags/flag-canada.svg"
              className="h-auto w-5 flex-shrink-0"
            />
            <span className="ml-3 text-sm">Change</span>
            <span className="sr-only">location and currency</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
