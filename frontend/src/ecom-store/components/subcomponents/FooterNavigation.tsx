import React from 'react';

const FooterNavigation: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <div className="mx-auto mt-16 max-w-5xl xl:grid xl:grid-cols-2 xl:gap-8 pb-20">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                    {['products', 'customerService'].map((section) => (
                        <div key={section}>
                            <h3 className="text-sm font-medium text-gray-900">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                {navigation[section].map((item: any) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                    {['company', 'legal'].map((section) => (
                        <div key={section}>
                            <h3 className="text-sm font-medium text-gray-900">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                {navigation[section].map((item: any) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FooterNavigation;
