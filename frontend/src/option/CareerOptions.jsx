import { Link } from "react-router-dom";
import Job from "../assets/Job.jpg";
import Resume from "../assets/Resume.jpg";

const CareerOptions = () => {
  const options = [
    {
      id: "resume",
      title: "Resume Builder",
      subtitle: "Create a Resume That Gets Noticed",
      description:
        "Build a clean and professional resume with your skills, education, projects, and experience.",
      img: Resume,
      path: "/resume-builder",
      button: "Build My Resume",
      accent: "border-blue-500",
    },
    {
      id: "jobs",
      title: "Find Your Job",
      subtitle: "Discover Jobs That Fit You",
      description:
        "Get personalized job recommendations based on your skills, personality, and career profile.",
      img: Job,
      path: "/jobs",
      button: "Explore Jobs",
      accent: "border-purple-500",
    },
  ];

  return (
    <section className="py-16 px-4 lg:px-0 bg-[#F8F5F0]">
      <div className="container mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Start Your Career Journey
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight">
            Build-Match-<span className="text-blue-600">Grow</span>
          </h2>

          <p className="text-[#6B6B6B] mt-4 max-w-2xl mx-auto">
            Create a professional resume or discover job opportunities
            that match your skills and personality.
          </p>
        </div>

        {/* Career Options */}
        <div className="flex flex-col md:flex-row gap-8">

          {options.map((item) => (
            <div
              key={item.id}
              className="relative flex-1 group overflow-hidden rounded-[2rem]"
            >

              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-10 left-8 md:left-10 right-8 md:right-10">

                {/* Label */}
                <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-4 py-2 mb-4 rounded-full uppercase tracking-[0.2em]">
                  {item.id === "resume"
                    ? "Career Tool"
                    : "AI Job Matching"}
                </span>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
                  {item.title}
                </h2>

                {/* Subtitle */}
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                  {item.subtitle}
                </h3>

                {/* Description */}
                <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-lg mb-6">
                  {item.description}
                </p>

                {/* Button */}
                <Link
                  to={item.path}
                  className={`inline-block bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm border-l-4 ${item.accent} hover:bg-black hover:text-white transition-all duration-300`}
                >
                  {item.button}
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CareerOptions;