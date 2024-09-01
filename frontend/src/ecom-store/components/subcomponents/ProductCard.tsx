import React from 'react';
import CTAButton from './CTAButton';

const ProductCard: React.FC<{ products: any[] }> = ({ products }) => {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <section aria-labelledby="trending-heading" className="bg-white">
            <div className="pt-14 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:pt-14">
                <div className="flex items-center justify-center flex-col px-4 sm:px-6 lg:px-0">
                    <h2 id="trending-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Our Products
                    </h2>
                </div>

                <div className="relative mt-8">
                    <div className="relative w-full overflow-x-auto">
                        <ul
                            role="list"
                            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                        >
                            {products.map((product, index) => (
                                <li key={product.id + index} className="inline-flex w-64 flex-col text-center lg:w-auto">
                                    <div className="group relative">
                                        {/* Product Image */}
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                                            <img
                                                alt={product.imageAlt}
                                                src={product.imageSrc}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300 ease-in-out"
                                            />
                                        </div>

                                        {/* Overlay and Actions */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                            <div className="text-center space-y-2">
                                                <CTAButton
                                                    text={product.actions[0]}
                                                    onClick={handleClick}
                                                    className="shadow-lg text-lg bg-[#FFF] text-[#B88E2F] font-semibold hover:cursor-pointer"  // Dynamically adding custom classes
                                                />

                                                <div className="flex justify-center space-x-3">
                                                    <button className="text-white px-2 py-1 rounded-full hover:bg-gray-200">
                                                        {product.actions[1]}
                                                    </button>
                                                    <button className="text-white px-2 py-1 rounded-full hover:bg-gray-200">
                                                        {product.actions[2]}
                                                    </button>
                                                    <button className="text-white px-2 py-1 rounded-full hover:bg-gray-200">
                                                        {product.actions[3]}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="bg-[#F4F5F7] text-left p-4">
                                            <h3 className="font-semibold text-[#3A3A3A]">
                                                <a href={product.href}>
                                                    <span className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-[#898989] text-md">{product.description}</p>
                                            <div className='flex justify-between'>
                                                <p className="mt-1 text-[#3A3A3A] text-lg">{product.price}</p>
                                                <p className="mt-1 text-[#B0B0B0] text-md line-through	">{product.oldPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
                                        {product?.availableColors?.map((color: any, index: number) => (
                                            <li
                                                key={index}
                                                style={{ backgroundColor: color.colorBg }}
                                                className="h-4 w-4 rounded-full border border-black border-opacity-10"
                                            >
                                                <span className="sr-only">{color.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
