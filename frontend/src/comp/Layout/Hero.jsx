import { Link } from "react-router-dom";
import CareerMatch from "../../assets/CareerMatch.jpg";

const Hero = () => {
  return (
    <section className="relative h-[400px] md:h-[600px] lg:h-[750px]">
      
      <img
        src={CareerMatch}
        alt="Career background"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        
        <div className="text-center text-white p-6 translate-y-20">

          <p className="text-black text-base md:text-lg font-bold leading-relaxed tracking-tight mb-6">
  Discover opportunities. Build your future.
</p>

          <Link
            to="/explore"
            className="inline-block bg-[#F8F5F0] text-black px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Explore Now
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;