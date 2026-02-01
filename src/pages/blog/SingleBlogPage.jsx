import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleBlogPost } from "../../api";
import RichTextDisplay from "../../components/form/RichTextDisplay";
import UserNavbar from "../../components/globals/UserNavbar";
import Trigram from "../../components/globals/TrigramUpdated";
import ViewMoreButtonSec from "../../components/globals/ViewMoreBtnSec";
import FormattedDateTime from "../../utils/FormattedDateTime";
import Footer from "../../components/globals/Footer";

const SingleBlogPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, loading } = fetchSingleBlogPost(id);
  console.log("data", data);

  // Function to split HTML content at a specific paragraph
  const splitContentAtImage = (html, paragraphIndex = 2) => {
    const paragraphs = html.split("</p>");
    const firstPart =
      paragraphs.slice(0, paragraphIndex).join("</p>") +
      (paragraphIndex > 0 ? "</p>" : "");
    const secondPart = paragraphs.slice(paragraphIndex).join("</p>");
    return { firstPart, secondPart };
  };

  if (loading)
    return <p className="text-center mt-20 text-white">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">Error loading blog</p>;
  if (!data)
    return <p className="text-center mt-20 text-white">Blog not found</p>;

  return (
    <div className=" w-full bg-[#EAEAEA] h-full">
      <UserNavbar />
      <Trigram />

      <div className="flex flex-col gap-[50px] pt-[80px] px-[230px]">
        <ViewMoreButtonSec
          title="Go back to Blogs"
          onClick={() => navigate("/blogs")}
          slantedbg
          backArrow
        />

        {/* Content */}
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-[68px] text-black font-semibold">
            {data?.blogTitle}
          </h1>

          <div className="w-full h-[494px]">
            <img
              src={data?.avatarImg}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* content after the main image */}
          <div className="flex flex-col gap-10 px-6">
            <h1 className="text-[32px] leading-[44px] font-semibold text-black">
              {data?.subTitle}
            </h1>

            <div className="w-fit flex items-center gap-[21px]">
              <div className="w-[72px] h-[72px] rounded-full">
                <img
                  src="/images/author.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-primary-deep text-[18.64px]">
                  Ayewa Blessing
                </span>
                <span className="text-[12px] text-primary-deep">
                  <FormattedDateTime dateString={data?.createdAt} />
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center border-primary-deep border-t-1 border-b-1 p-3">
              <div className="flex gap-4">
                <button className="border border-primary-deep rounded-full text-lg py-[12px] px-[32px] text-primary-deep w-fit hover:bg-primary-deep hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span>
                    <img src="/images/like.png" alt="" />
                  </span>
                  <span>Like</span>
                </button>
                <button className="border border-primary-deep rounded-full text-lg py-[12px] px-[32px] text-primary-deep w-fit hover:bg-primary-deep hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span>
                    <img src="/images/comment.png" alt="" />
                  </span>
                  <span>Comment</span>
                </button>
              </div>
              <button className="border border-primary-deep rounded-full text-lg py-[12px] px-[32px] text-primary-deep w-fit hover:bg-primary-deep hover:text-white transition-colors duration-200 flex items-center gap-2">
                <span>
                  <img src="/images/share.png" alt="" />
                </span>
                <span>Share</span>
              </button>
            </div>

            <div className="text-[18px]">
              {data?.blogContent?.blogSubContent && (
                <>
                  <RichTextDisplay
                    content={
                      splitContentAtImage(data?.blogContent?.blogSubContent, 2)
                        .firstPart
                    }
                    textColor="#0e0e0e"
                  />

                  {/* Content Image */}
                  {data?.blogContent?.avatarImg && (
                    <div className="w-full h-[400px] my-8">
                      <img
                        src={data?.blogContent?.avatarImg}
                        alt="Blog content"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <RichTextDisplay
                    content={
                      splitContentAtImage(data?.blogContent?.blogSubContent, 2)
                        .secondPart
                    }
                    textColor="#0e0e0e"
                  />
                </>
              )}
            </div>

            <div className="flex mt-8 items-center justify-center">
              <ViewMoreButtonSec
                title="Next Blog Post"
                onClick={() => navigate("/blogs")}
                slantedbg
              />
            </div>

            <h1 className="text-[32px] text-center font-medium text-primary-light">
              Enriching MovieLens Data with Python Web Scraping
            </h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleBlogPage;
