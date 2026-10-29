import { Link } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const AboutPage = () => {
  return (
    <div className="bg-[#F8F5F0] text-[#111111]">
      <section className=" text-white py-24 px-6">

        <div className="container mx-auto max-w-6xl text-center">

          <p className="text-blue-500 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-6">
            About CareerMatch AI
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
            <span className="text-black">Your Skills</span>
            <br />
            <span className="text-blue-500">
              Your Career
            </span>
          </h1>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}

            <div>

              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">
                Why CareerMatch AI?
              </p>

              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                Make Better Career
                <span className="text-blue-600">
                  Decisions.
                </span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-5">
                Choosing the right career can be challenging when students
                and job seekers are unsure about their skills, personality,
                career interests, or the opportunities available to them.
              </p>

              <p className="text-gray-600 leading-relaxed">
                CareerMatch AI brings these important career activities
                together in one platform. Users can build their resume,
                assess their skills and personality, and explore personalized
                job opportunities.
              </p>

            </div>


            {/* Right - Stats / Highlight Card */}

            <div className=" rounded-[2rem] p-10 text-black">

              <p className="text-gray-400 text-sm uppercase tracking-widest mb-8">
                CareerMatch AI
              </p>

              <h3 className="text-3xl md:text-4xl font-black mb-8">
                One Platform.
                <br />
                Multiple Career Tools.
              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <span>
                    Professional Resume Building
                  </span>
                </div>


                <div className="flex items-center gap-4">
                  <span>
                    Skills & Personality Assessment
                  </span>
                </div>


                <div className="flex items-center gap-4">
                  <span>
                    Personalized Job Matching
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="bg-white py-20 px-6">

        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-14">

            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              How It Works
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              Your Career Journey
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              CareerMatch AI guides you through a simple process to create
              your career profile and discover suitable opportunities.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

  {/* Step 01 */}
  <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
    <span className="text-blue-600 text-sm font-bold">01</span>
    <h3 className="text-xl font-bold mt-4 mb-3">
      Build Your Resume
    </h3>
    <p className="text-gray-500 leading-relaxed">
      Enter your education, skills, projects, experience, and other
      professional information to create a structured resume.
    </p>
  </div>
  {/* Step 02 */}
  <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
    <span className="text-blue-600 text-sm font-bold">02</span>
    <h3 className="text-xl font-bold mt-4 mb-3">
      Find Matching Jobs
    </h3>
    <p className="text-gray-500 leading-relaxed">
      Explore job opportunities based on your skills, profile,
      assessment results, and career preferences.
    </p>
  </div>
</div>
        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="py-20 px-6">

        <div className="container mx-auto max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">


            {/* Heading */}

            <div>

              <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Platform Features
              </p>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Everything You Need
                <br />
                For Your
                <span className="text-blue-600">
                  Career.
                </span>
              </h2>

            </div>


            {/* Features */}

            <div className="space-y-6">


              <div className="flex gap-5 border-b border-gray-300 pb-6">

                <HiOutlineDocumentText className="text-3xl text-blue-600 shrink-0" />

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    Resume Builder
                  </h3>

                  <p className="text-gray-500">
                    Create a professional resume using your personal,
                    educational, technical, and professional information.
                  </p>

                </div>

              </div>


              <div className="flex gap-5 border-b border-gray-300 pb-6">

                <HiOutlineChartBar className="text-3xl text-blue-600 shrink-0" />

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    Skills Assessment
                  </h3>

                  <p className="text-gray-500">
                    Evaluate your skills and understand areas that can help
                    you improve your career profile.
                  </p>

                </div>

              </div>


              <div className="flex gap-5 border-b border-gray-300 pb-6">

                <HiOutlineUserGroup className="text-3xl text-blue-600 shrink-0" />

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    Personality Assessment
                  </h3>

                  <p className="text-gray-500">
                    Understand your personality characteristics and use the
                    results as part of your career exploration.
                  </p>

                </div>

              </div>


              <div className="flex gap-5">

                <HiOutlineBriefcase className="text-3xl text-blue-600 shrink-0" />

                <div>

                  <h3 className="font-bold text-xl mb-2">
                    AI-Based Job Matching
                  </h3>

                  <p className="text-gray-500">
                    Receive job recommendations based on your career profile,
                    skills, and assessment information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================
          WHO IS IT FOR
      ===================================================== */}
      <section className="bg-gray-50 py-16 px-6">

  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-12">

      <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
        Who Can Use It?
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
        Built For Career Growth
      </h2>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Students
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Build your first professional resume, identify your skills,
          and explore possible career opportunities.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Job Seekers
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Improve your career profile and discover job opportunities
          that match your skills and interests.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          Career Explorers
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Understand your strengths and explore career paths that
          may be suitable for your profile.
        </p>
      </div>

    </div>

  </div>

</section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="py-24 px-6 bg-[#F8F5F0]">

        <div className="container mx-auto max-w-4xl text-center">

          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] mb-5">
            Start Today
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Ready To Build
            <br />
            Your Career Profile?
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Create your resume, complete your assessments, and discover
            career opportunities with CareerMatch AI.
          </p>


          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/resume-builder"
              className="inline-flex items-center justify-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
            >
              Build My Resume

              <HiOutlineArrowRight />

            </Link>


            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-3 border border-gray-300 bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Explore Jobs

              <HiOutlineArrowRight />

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AboutPage;