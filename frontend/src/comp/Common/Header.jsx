import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Header = () => {
  return (
    <header className="bg-[#0D0D0D] text-[#F8F5F0] border-b border-white/5">

      <div className="container mx-auto flex justify-between items-center py-3 px-6">

        {/* Social Links */}
        <div className="hidden md:flex items-center space-x-5">

          <a
            href="#"
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
          >
            <TbBrandMeta className="h-4 w-4" />
          </a>

          <a
            href="#"
            className="hover:text-pink-400 transition-all duration-300 transform hover:scale-110"
          >
            <IoLogoInstagram className="h-4 w-4" />
          </a>

          <a
            href="#"
            className="hover:text-gray-400 transition-all duration-300 transform hover:scale-110"
          >
            <RiTwitterXLine className="h-3.5 w-3.5" />
          </a>

        </div>

        {/* Announcement */}
        <div className="flex-grow flex justify-center items-center overflow-hidden">

          <div className="flex items-center space-x-4">

            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>

            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic opacity-90">
              Build Your Resume. Find Your Perfect Career.
            </span>

          </div>

        </div>

        {/* Contact */}
        <a
          href="tel:+123456789"
          className="text-[10px] md:text-xs font-bold tracking-widest hover:text-orange-500 transition-colors hidden sm:block"
        >
          SUPPORT: +1 (234) 567-890
        </a>

      </div>

    </header>
  );
};

export default Header;