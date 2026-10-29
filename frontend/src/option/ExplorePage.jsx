import { Link } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineBriefcase,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const ExplorePage = () => {
  return (
    <div className="bg-[#F8F5F0] text-[#111]">

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-4">
            Explore CareerMatch AI
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Build Your Resume.
            <br />
            <span className="text-blue-600">Find Your Career.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            Create a professional resume, check how well it matches different
            companies, and find job opportunities that fit your profile.
          </p>

        </div>
      </section>


      {/* How Website Works */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
              How It Works
            </p>

            <h2 className="text-4xl font-bold">
              Everything You Need in One Place
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              CareerMatch AI helps you prepare your resume and understand
              where it can take you.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 1 */}
            <div className="border border-gray-200 rounded-xl p-7">

              <span className="text-blue-600 text-sm font-bold">
                01
              </span>

              <HiOutlineDocumentText className="text-4xl text-blue-600 mt-5 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Build Your Resume
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Add your personal details, education, skills, projects,
                experience, and other information to create a professional
                resume.
              </p>

            </div>


            {/* Step 2 */}
            <div className="border border-gray-200 rounded-xl p-7">

              <span className="text-blue-600 text-sm font-bold">
                02
              </span>

              <HiOutlineCheckCircle className="text-4xl text-blue-600 mt-5 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Check Your Resume
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Once your resume is ready, check how well it matches the
                requirements of different companies and job roles.
              </p>

            </div>


            {/* Step 3 */}
            <div className="border border-gray-200 rounded-xl p-7">

              <span className="text-blue-600 text-sm font-bold">
                03
              </span>

              <HiOutlineBriefcase className="text-4xl text-blue-600 mt-5 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                Find Jobs
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Explore job opportunities based on your skills, experience,
                resume, and career interests.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* Resume Evaluation */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
                Resume Evaluation
              </p>

              <h2 className="text-4xl font-bold leading-tight mb-5">
                Know How Good Your Resume Is
              </h2>

              <p className="text-gray-600 leading-relaxed mb-5">
                After building your resume, CareerMatch AI can check it
                against different company requirements and give you an
                overall idea of how well your resume matches.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Instead of applying everywhere with the same resume, you can
                understand which companies and roles are a better match for
                your current profile.
              </p>
            </div>


            <div className="bg-white border border-gray-200 rounded-xl p-8">

              <h3 className="text-xl font-semibold mb-6">
                Resume Match Result
              </h3>

              <div className="space-y-5">

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Company A</span>
                    <span className="text-green-600 font-semibold">
                      Great
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-green-500 h-2 rounded-full w-[90%]"></div>
                  </div>
                </div>


                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Company B</span>
                    <span className="text-blue-600 font-semibold">
                      Good
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-blue-500 h-2 rounded-full w-[75%]"></div>
                  </div>
                </div>


                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Company C</span>
                    <span className="text-yellow-600 font-semibold">
                      Average
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-yellow-500 h-2 rounded-full w-[55%]"></div>
                  </div>
                </div>


                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Company D</span>
                    <span className="text-red-500 font-semibold">
                      Needs Improvement
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-red-500 h-2 rounded-full w-[40%]"></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Top Companies */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
            Company Matching
          </p>

          <h2 className="text-4xl font-bold mb-4">
            Check Your Resume With Top Companies
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            See how your current resume compares with the skills and
            requirements commonly expected by leading companies.
          </p>


          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            <div className="bg-white border border-gray-200 p-5 rounded-lg font-semibold">
              Google
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg font-semibold">
              Microsoft
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg font-semibold">
              Amazon
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg font-semibold">
              Meta
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg font-semibold">
              Apple
            </div>

          </div>

        </div>
      </section>


      {/* Job Search */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <HiOutlineBriefcase className="text-5xl text-blue-600 mx-auto mb-5" />

          <h2 className="text-4xl font-bold mb-5">
            Find Your Next Job
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Once you understand your resume and its strengths, explore job
            opportunities that match your skills, experience, and career
            interests.
          </p>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 bg-[#111] text-white px-7 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Explore Jobs
            <HiOutlineArrowRight />
          </Link>

        </div>
      </section>


      {/* Final CTA */}
      {/* Final CTA */}
<section className="bg-[#F8F5F0] py-16 px-6">
  <div className="max-w-4xl mx-auto text-center">

    <h2 className="text-4xl font-bold text-gray-900 mb-5">
      Ready To Build Your Resume?
    </h2>

    <p className="text-gray-600 mb-8">
      Create your resume, check your company matches, and start
      exploring new career opportunities.
    </p>

    <Link
      to="/resume-builder"
      className="inline-flex items-center justify-center gap-2
                 bg-blue-600 text-white px-7 py-3
                 rounded-lg font-semibold
                 hover:bg-blue-700 transition"
    >
      <span>Build My Resume</span>
      <HiOutlineArrowRight className="text-lg" />
    </Link>

  </div>
</section>

    </div>
  );
};

export default ExplorePage;