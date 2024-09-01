import React from 'react';

const ExclusiveSale: React.FC = () => {
  return (
    <div className="relative mt-6 flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:mt-0">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <img
          alt=""
          src="https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg"
          className="h-full w-full object-cover object-center saturate-0 filter"
        />
        <div className="absolute inset-0 bg-indigo-600 bg-opacity-90" />
      </div>
      <div className="relative mx-auto max-w-sm text-center">
        <h3 className="text-2xl font-bold tracking-tight text-white">Get early access</h3>
        <p className="mt-2 text-gray-200">
          Did you sign up to the newsletter? If so, use the keyword we sent you to get access.{' '}
          <a href="#" className="whitespace-nowrap font-bold text-white hover:text-gray-200">
            Go now<span aria-hidden="true"> &rarr;</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default ExclusiveSale;
