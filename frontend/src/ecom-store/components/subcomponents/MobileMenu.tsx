import { Dialog, Tab } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { currencies, navigation } from '../../constants/data'; // Ensure these imports are correct

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }: MobileMenuProps) {
  return (
    <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="relative z-40 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 z-40 flex">
        <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <Tab.Group as="div" className="mt-2">
            <div className="border-b border-gray-200">
              <Tab.List className="-mb-px flex space-x-8 px-4">
                {navigation.categories.map((category) => (
                  <Tab
                    key={category.name}
                    className={({ selected }) =>
                      `whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium ${
                        selected ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-700'
                      }`
                    }
                  >
                    {category.name}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              {navigation.categories.map((category) => (
                <Tab.Panel key={category.name} className="space-y-12 px-4 pb-6 pt-10">
                  {/* Render category content */}
                  <div className="space-y-6">
                    {category.featured && category.featured.length > 0 && (
                      <div>
                        <p className="text-gray-900 font-medium">Featured</p>
                        <ul>
                          {category.featured.map((item) => (
                            <li key={item.name} className="py-2">
                              <a href={item.href} className="text-gray-700 hover:text-gray-900">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {category.categories && category.categories.length > 0 && (
                      <div>
                        <p className="text-gray-900 font-medium">Categories</p>
                        <ul>
                          {category.categories.map((item) => (
                            <li key={item.name} className="py-2">
                              <a href={item.href} className="text-gray-700 hover:text-gray-900">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {category.collection && category.collection.length > 0 && (
                      <div>
                        <p className="text-gray-900 font-medium">Collection</p>
                        <ul>
                          {category.collection.map((item) => (
                            <li key={item.name} className="py-2">
                              <a href={item.href} className="text-gray-700 hover:text-gray-900">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {category.brands && category.brands.length > 0 && (
                      <div>
                        <p className="text-gray-900 font-medium">Brands</p>
                        <ul>
                          {category.brands.map((item) => (
                            <li key={item.name} className="py-2">
                              <a href={item.href} className="text-gray-700 hover:text-gray-900">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Create an account</a>
            </div>
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <form>
              <div className="inline-block">
                <label htmlFor="mobile-currency" className="sr-only">Currency</label>
                <div className="relative -ml-2 rounded-md border-transparent">
                  <select
                    id="mobile-currency"
                    name="currency"
                    className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700"
                  >
                    {currencies.map((currency) => (
                      <option key={currency}>{currency}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
