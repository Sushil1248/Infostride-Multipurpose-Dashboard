import React from 'react';

const TrendingProducts: React.FC<{ products: any[] }> = ({ products }) => {
    console.log(products);
    return (
        <section aria-labelledby="trending-heading" className="bg-white">
            <div className="pt-14 sm:py-14 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pt-14">

                <div className="flex items-center justify-center flex-col px-4 sm:px-6 lg:px-0">
                    <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Browse The Range
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>


                <div className="relative mt-8">
                    <div className="relative w-full overflow-x-auto">
                        <ul
                            role="list"
                            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0"
                        >
                            {products.map((product) => (
                                <li key={product.id} className="inline-flex w-64 flex-col text-center lg:w-auto">
                                    <div className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                                            <img
                                                alt={product.imageAlt}
                                                src={product.imageSrc}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="mt-1 font-semibold text-gray-900">
                                                <a href={product.href}>
                                                    <span className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 px-4 sm:hidden">
                    <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        See everything
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
