import { Link } from "react-router-dom";
import { fetchAllBlogPost, fetchAllProjects } from "../../api";
import RichTextDisplay from "../form/RichTextDisplay";
import { HighlightSearchMatch } from "../../utils/highlightSearchMatch";

export const BlogCard = ({ searchQuery = "" }) => {
  const { data: blogData } = fetchAllBlogPost();

  const filteredBlogs = blogData?.data?.filter((blog) =>
    blog?.blogTitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-1 gap-[70px]">
      {filteredBlogs?.map((item, i) => (
        <div key={i}>
          <Link to={`/blogs/${item._id}`} className="w-full group flex gap-[32px]">
            <div
              className="w-[50%] h-[340px]"
              style={{ overflow: "hidden" }}
            >
              <img
                src={item?.avatarImg}
                alt=""
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out"
              />
            </div>

            {/* rightside */}
            <div className="w-[50%] flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-[32px] text-primary-light group-hover:text-primary-deep font-medium">
                  <HighlightSearchMatch
                    title={item?.blogTitle}
                    searchQuery={searchQuery}
                    highlightColor="#3B82F6"
                  />
                </h3>

                <div className="text-lg text-primary-light font-medium leading-[28px] -tracking-[4%] text-justify group-hover:text-primary-deep">
                  {item?.subTitle}
                </div>
              </div>

              {/* comment and likes section */}
              <div className="flex justify-between mb-[20px] font-medium ">
                <span className="text-[18px] text-primary-light group-hover:text-primary-deep">
                  Comment {item?.commentCount}
                </span>
                <span className="text-[18px] text-primary-light group-hover:text-primary-deep">
                  Like {item?.likeCount}
                </span>
              </div>
            </div>
          </Link>
          {i < filteredBlogs?.length - 1 && (
            <div className="w-[95%] bg-[#53535366] h-[1px] mt-6"></div>
          )}
        </div>
      ))}
    </div>
  );
};
