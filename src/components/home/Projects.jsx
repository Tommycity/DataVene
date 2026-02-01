import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProjects } from "../../api";
import RichTextDisplay from "../form/RichTextDisplay";
import { HighlightSearchMatch } from "../../utils/highlightSearchMatch";

export const Projects = ({ searchQuery = "" }) => {
  const { data: projectData } = fetchAllProjects();

  const filteredProjects = projectData?.data?.filter((project) =>
    project?.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-2 gap-[64px]">
      {filteredProjects?.map((item, i) => (
        <Link
          to={`/projects/${item._id}`}
          key={i}
          className="w-full flex flex-col gap-[30px] group justify-between"
        >
          <div className="w-full flex flex-col gap-[20px]">
            <div className="w-full bg-white px-[15px] py-[17px] group h-[384px]">
              <div className="relative w-full h-full" style={{ overflow: "hidden" }}>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
                <img
                  src={item?.avatarImg}
                  alt=""
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-[20px]">
              <h3 className="text-[31px] text-primary-light group-hover:text-primary-deep font-medium">
                <HighlightSearchMatch
                  title={item?.projectTitle?.length > 100
                    ? item?.projectTitle?.substring(0, 100) + "..."
                    : item?.projectTitle}
                  searchQuery={searchQuery}
                  highlightColor="#3B82F6"
                />
              </h3>

              <div className="w-[90%] bg-[#53535366] h-[1px]"></div>

              <div className="text-lg text-primary-light font-medium leading-[28px] -tracking-[4%] text-justify group-hover:text-primary-deep ">
                {/* {item?.projectContent?.projectSubContent} */}
                {/* <RichTextDisplay
                content={item?.projectContent?.projectSubContent}
                maxLength={100}
              /> */}
                {item?.subTitle}
              </div>
            </div>
          </div>


          <div className="flex gap-2 flex-wrap ">
            {item?.projectStack?.map((stack, index) => (
              <span
                key={index}
                className="border-[1px] text-[12px] text-primary-light group-hover:text-primary-deep  w-fit rounded-lg border-primary-light py-[8px] px-[12px]"
              >
                {stack}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};
