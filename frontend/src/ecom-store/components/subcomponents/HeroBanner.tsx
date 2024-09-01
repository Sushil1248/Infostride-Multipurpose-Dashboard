import CTAButton from "./CTAButton";

export default function HeroBanner() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  return (
    <div className=" my-auto font-poppins">
      <div className="mx-auto max-w-2xl my-auto ">
        <div className=" isolate overflow-hidden bg-[#FFF3E3] px-6 shadow-2xl sm:rounded-3xl  lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
            <p className="rounded-md font-semibold text-lg tracking-wider "
            >
              New Arrival
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#B88E2F] sm:text-4xl">Discover Our<br />New Collection</h2>
            <p className="mt-6 text-lg leading-8 text-[#333333]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <CTAButton
                text="Buy now"
              onClick={handleClick}
              className="shadow-lg text-lg bg-[#B88E2F] text-white font-semibold"  // Dynamically adding custom classes
            />
          </div>
           </div>
        </div>
      </div>
    </div>
  )
}