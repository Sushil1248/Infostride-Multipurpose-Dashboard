import React from 'react';

const NewsletterSignup: React.FC = () => {
  return (
    <div className="flex items-center rounded-lg bg-gray-100 p-6 sm:p-10">
      <div className="mx-auto max-w-sm">
        <h3 className="font-semibold text-gray-900">Sign up for our newsletter</h3>
        <p className="mt-2 text-sm text-gray-500">
          The latest news, articles, and resources, sent to your inbox weekly.
        </p>
        <form className="mt-4 sm:mt-6 sm:flex">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            type="text"
            required
            autoComplete="email"
            className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
