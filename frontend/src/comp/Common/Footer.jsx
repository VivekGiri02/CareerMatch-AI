import { TbBrandMeta } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F8F5F0] border-t border-[#E5E5E5] py-12">

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">

        {/* About CareerMatch AI */}
        <div className="pl-4 md:pl-6">

          <h3 className="text-xl font-bold text-[#111111] mb-4">
            CareerMatch <span className="text-blue-600">AI</span>
          </h3>

          <p className="text-[#111111] mb-4 leading-relaxed">
            Build a professional resume, understand your strengths,
            and discover job opportunities that match your skills
            and personality.
          </p>

          <p className="font-medium text-sm text-[#6B6B6B]">
            Your skills. Your personality. Your career.
          </p>

        </div>


        {/* Career Tools */}
        <div>

          <h3 className="text-lg text-[#111111] mb-4">
            Career Tools
          </h3>

          <ul className="space-y-2 text-[#6B6B6B]">

            <li>
              <Link
                to="/resume-builder"
                className="hover:text-[#111111] transition-colors"
              >
                Resume Builder
              </Link>
            </li>

            <li>
              <Link
                to="/assessment"
                className="hover:text-[#111111] transition-colors"
              >
                Skills Assessment
              </Link>
            </li>

            <li>
              <Link
                to="/assessment"
                className="hover:text-[#111111] transition-colors"
              >
                Personality Assessment
              </Link>
            </li>

            <li>
              <Link
                to="/jobs"
                className="hover:text-[#111111] transition-colors"
              >
                Job Matching
              </Link>
            </li>

          </ul>

        </div>


        {/* Quick Links */}
        <div>

          <h3 className="text-lg text-[#111111] mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-[#6B6B6B]">

            <li>
              <Link
                to="/"
                className="hover:text-[#111111] transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="hover:text-[#111111] transition-colors"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="hover:text-[#111111] transition-colors"
              >
                My Profile
              </Link>
            </li>

            <li>
              <Link
                to="/jobs"
                className="hover:text-[#111111] transition-colors"
              >
                Explore Jobs
              </Link>
            </li>

          </ul>

        </div>


        {/* Connect With Us */}
        <div>

          <h3 className="text-lg text-[#111111] mb-4">
            Connect With Us
          </h3>

          <div className="flex items-center space-x-4 my-6 text-[#6B6B6B]">

            <a
              href="#"
              className="hover:text-[#111111] transition-colors"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>

            <a
              href="#"
              className="hover:text-[#111111] transition-colors"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>

            <a
              href="#"
              className="hover:text-[#111111] transition-colors"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>

          </div>


          <p className="text-[#6B6B6B] mb-1">
            Need Help?
          </p>

          <p className="flex items-center gap-2 text-[#111111]">
            <FiMail />
            support@careermatch.ai
          </p>

        </div>

      </div>


      {/* Footer Bottom */}

      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-[#D6D6D6] pt-6">

        <p className="text-[#6B6B6B] text-sm tracking-tight text-center">
          © 2026 CareerMatch AI. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;