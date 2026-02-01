import { useState } from "react";
import { fetchAllAbout } from "../../api";
import Trigram from "../../components/globals/trigram";
import UserNavbar from "../../components/globals/UserNavbar";
import ViewMoreButtonPrim from "../../components/globals/ViewMoreBtnPrim";
import { IoMdArrowDropdown } from "react-icons/io";
import Footer from "../../components/globals/Footer";
import RichTextDisplay from "../../components/form/RichTextDisplay";

const AboutPage = () => {
  const { data: aboutData } = fetchAllAbout();
  const [openExperienceId, setOpenExperienceId] = useState(null);

  const handleToggleExperience = (expIndex) => {
    setOpenExperienceId(openExperienceId === expIndex ? null : expIndex);
  };

  return (
    <div className="bg-[#EAEAEA] h-full">
      <UserNavbar />
      <Trigram />
      <div className="w-full flex flex-col gap-[80px] pt-[80px] px-[230px]">
        <h1 className="text-black font-medium text-[57px] tracking-[-4%] leading-[72px]">
          Building the bridges that take you from raw numbers to real answers
        </h1>

        <section className="w-full flex gap-[52px]">
          <div className="w-[50%] flex gap-[15px]">
            <div className="w-[40%]">
              <img
                src="/images/new-slanted-arrow.png"
                alt=""
                className="mt-2"
              />
            </div>
            <div className="flex flex-col gap-[25px] text-lg text-primary-deep font-medium">
              <span className="text-justify">
                For me, tools like Python, SQL, and dbt aren't just
                requirements; they are the instruments I use to bring order to
                chaos. I enjoy the deep-dive nature of this work, specifically
                the challenge of orchestrating complex workflows and building
                infrastructure that feels seamless to the end user.
              </span>
              <span className="text-justify">
                I take pride in the "behind-the-scenes" work that ensures data
                quality, using visualizations to verify that the story the data
                tells is accurate. I bring a genuine curiosity about how systems
                work and a consistent commitment to delivering solutions that
                provide clarity rather than just volume.
              </span>

              <ViewMoreButtonPrim
                title="Read my CV"
                href={aboutData?.[0]?.cvUrl}
                download={true}
              />
            </div>
          </div>
          {/* rightside image */}
          <div className="w-[50%] h-[533px]">
            <img
              src="/images/AYEWA 1B.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </section>

        {/* Experience, Education and certification */}
        <section className="flex flex-col gap-4">
          {/* experience */}
          <div>
            <h2 className="text-primary-deep text-lg">Experience</h2>
            <div className="w-full bg-[#53535366] h-[1px] mt-2"></div>
            <div className="flex flex-col">
              {aboutData?.map((item, i) => {
                return (
                  <div key={i}>
                    {item?.experience?.map((exp, expIndex) => {
                      const uniqueId = `${i}-${expIndex}`;
                      const isOpen = openExperienceId === uniqueId;
                      return (
                        <div key={expIndex} className="w-full">
                          <div
                            onClick={() => handleToggleExperience(uniqueId)}
                            className="w-full flex justify-between items-start cursor-pointer py-4 hover:opacity-80 transition-all duration-300 hover:translate-x-5"
                          >
                            <div className="flex flex-col gap-1 flex-1">
                              <span className="text-primary-deep font-medium text-[28px]">
                                {exp?.course}
                              </span>

                              <span className="text-primary-light text-[18px]">
                                {exp?.country} | {exp?.duration}
                              </span>
                            </div>

                            <div
                              className={`text-primary-deep text-2xl transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              <IoMdArrowDropdown />
                            </div>
                          </div>

                          {isOpen && (
                            <div className="pb-4 pl-4">
                              <span className="text-primary-light text-[18px]">
                                <RichTextDisplay
                                  content={exp?.experienceContent}
                                  textColor="#535353"
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* education */}
          <div>
            <h2 className="text-primary-deep text-lg mt-4">Education</h2>
            <div className="w-full bg-[#53535366] h-[1px] mt-2"></div>

            <div className="flex flex-col">
              {aboutData?.map((item, i) => {
                return (
                  <div key={i} className="">
                    {item?.education?.map((edu, eduIndex) => {
                      return (
                        <div
                          key={eduIndex}
                          className="w-full flex items-start cursor-pointer py-4 hover:opacity-80 transition-opacity"
                        >
                          <div className="flex flex-col gap-1 flex-1">
                            <span className="text-primary-deep font-medium text-[28px]">
                              {edu?.course}
                            </span>

                            <span className="text-primary-light text-[24px]">
                              {edu?.country} | {edu?.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* certification */}
          <div>
            <h2 className="text-primary-deep text-lg mt-4">Certifications</h2>
            <div className="w-full bg-[#53535366] h-[1px] mt-2"></div>
            <div className="flex flex-col">
              {aboutData?.map((item, i) => {
                return (
                  <div key={i}>
                    {item?.certification?.map((cert, certIndex) => {
                      const uniqueId = `${i}-${certIndex}`;
                      const isOpen = openExperienceId === uniqueId;
                      return (
                        <div key={certIndex} className="w-full">
                          <div
                            onClick={() => handleToggleExperience(uniqueId)}
                            className="w-full flex justify-between items-start cursor-pointer py-4 hover:opacity-80 transition-all duration-300 hover:translate-x-5"
                          >
                            <div className="flex flex-col gap-1 flex-1">
                              <span className="text-primary-deep font-medium text-[28px]">
                                {cert?.course}
                              </span>

                              <span className="text-primary-light text-[18px]">
                                {cert?.country}, {cert?.duration}
                              </span>
                            </div>

                            <div
                              className={`text-primary-deep text-2xl transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              <IoMdArrowDropdown />
                            </div>
                          </div>

                          {isOpen && (
                            <div className="pb-4 pl-4">
                              <span className="text-primary-light text-[18px] leading-relaxed">
                                <RichTextDisplay
                                  content={cert?.skillMeasure}
                                  textColor="#535353"
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center">
          <h1 className="text-[70px] font-medium text-primary-deep">
            Want to work together?
          </h1>
          <ViewMoreButtonPrim title="boayewa@gmail.com" />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
