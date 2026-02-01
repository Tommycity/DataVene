import { useNavigate } from "react-router-dom";
import Herosection from "../../components/home/Herosection";
import { fetchAllSkill } from "../../api";
import { Projects } from "../../components/home/Projects";
import Trigram from "../../components/globals/TrigramUpdated";
import ViewMoreButtonPrim from "../../components/globals/ViewMoreBtnPrim";
import ViewMoreButtonSec from "../../components/globals/ViewMoreBtnSec";
import { BlogCard } from "../../components/home/BlogCard";
import Footer from "../../components/globals/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, error, loading } = fetchAllSkill();

  // Add loading and error checks BEFORE using data
  if (error) return <div>Error loading skills.</div>;
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available.</div>;

  // Flatten the data so each image gets its own row
  const flattenedData = data.flatMap((skill) => {
    // If no images, return the skill with a placeholder
    if (!skill.avatarImg || skill.avatarImg.length === 0) {
      return [
        {
          ...skill,
          avatarImg: null, // or a placeholder image URL
          avatarImgPublicId: null,
          imageIndex: 0,
          originalSkillId: skill._id,
        },
      ];
    }

    // If has images, map each one
    return skill.avatarImg.map((img, index) => ({
      ...skill,
      avatarImg: img,
      avatarImgPublicId: skill.avatarImgPublicId[index],
      imageIndex: index,
      originalSkillId: skill._id,
    }));
  });

  return (
    <div className="relative w-full overflow-x-hidden bg-[#DCDCDC]">
      <Trigram />
      <Herosection />

      <div className="w-full flex flex-col gap-[80px] pt-[80px] px-[230px]">
        {/* Other sections can be added here */}
        <section className="flex gap-[72px] text-black font-semibold">
          <div className="w-[50%] text-[32px] text-justify">
            I am not just an engineer or an analyst, I am the strategic partner
            who ensures your data is your most powerful asset
          </div>
          <div className="w-[50%] flex flex-col gap-[28px]">
            <div className="text-lg leading-[28px] -tracking-[4%] text-justify">
              As an Analytics Engineer, I design and deploy robust, scalable
              data pipelines that eliminate chaos and make information instantly
              accessible and reliable. As a Data Analyst, I deliver the
              surgical, precise insights that drive immediate, high-impact
              business decisions.
            </div>

            <ViewMoreButtonPrim
              onClick={() => navigate("/about")}
              title="More about me"
            />
          </div>
        </section>

        {/* skill marquee section */}

        <section className="overflow-hidden relative w-full">
          <div className="flex gap-[30px] animate-scroll">
            {/* First set of images */}
            {flattenedData?.map((item, i) => (
              <div
                className="w-[41px] h-[40.29px] flex justify-center items-center flex-shrink-0"
                key={`first-${i}`}
                // style={{ boxShadow: "2px 2px 8px #00000057" }}
              >
                <img
                  src={item?.avatarImg}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {/* {flattenedData?.map((item, i) => (
              <div
                className="w-[150px] h-[40.29px] flex justify-center items-center flex-shrink-0"
                key={`second-${i}`}
                style={{ boxShadow: "2px 2px 8px #00000057" }}
              >
                <img
                  src={item?.avatarImg}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))} */}
          </div>
        </section>

        {/* projects section */}
        <section className="flex flex-col gap-[40px]">
          <h2 className="text-lg text-[#0E0E0E] font-medium uppercase">
            Selected Works
          </h2>
          <Projects />
          <div className="flex justify-center">
            <ViewMoreButtonSec
              title="View Projects"
              onClick={() => navigate("/projects")}
            />
          </div>
        </section>

        {/* BlogPosts section */}
        <section className="flex flex-col gap-[40px]">
          <h2 className="text-lg text-[#0E0E0E]  uppercase">BLOGPOSTS</h2>
          <BlogCard />
          <div className="flex justify-center">
            <ViewMoreButtonSec
              title="Read More"
              onClick={() => navigate("/blogs")}
            />
          </div>
        </section>

        {/* Get in touch section */}
        <section className="flex items-center justify-between w-full">
          <h1 className="w-[60%] text-[70px] text-primary-deep font-semibold">
            Get in touch
          </h1>
          <div className="w-[40%] flex flex-col gap-[24px]">
            <div className="flex flex-col text-lg text-primary-deep font-semibold">
              <span className="">I'd love to hear from you!</span>
              <span className="w-[90%]">
                have a project in mind, or just want to chat about an idea?
              </span>
            </div>
            <ViewMoreButtonPrim title="Feel Free to Drop a Line" />
          </div>
        </section>

        {/* footer section */}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
