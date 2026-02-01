import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleProject } from "../../api";
import RichTextDisplay from "../../components/form/RichTextDisplay";
import ViewMoreButtonSec from "../../components/globals/ViewMoreBtnSec";
import UserNavbar from "../../components/globals/UserNavbar";
import Trigram from "../../components/globals/trigram";
import FormattedDateTime from "../../utils/FormattedDateTime";
import Footer from "../../components/globals/Footer";
import SmartLinkButtons from "../../utils/LinkSorting";

const SingleProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, loading } = fetchSingleProject(id);
  console.log("data", data);

  if (loading)
    return <p className="text-center mt-20 text-white">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-red-500">Error loading project</p>
    );
  if (!data)
    return <p className="text-center mt-20 text-white">Project not found</p>;

  return (
    <div className=" w-full bg-[#EAEAEA] h-full">
      <UserNavbar />
      <Trigram />

      <div className="flex flex-col gap-[50px] pt-[80px] px-[230px]">
        <ViewMoreButtonSec
          title="Go back to Projects"
          onClick={() => navigate("/projects")}
          backArrow
          slantedbg
        />

        {/* Content */}
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-[68px] text-black font-semibol">
            {data?.projectTitle}
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
              <span className="text-primary-deep text-[18px] font-bold">
                Project Links
              </span>

              <SmartLinkButtons links={data?.projectLink} />
            </div>

            <div className="text-[18px]">
              <RichTextDisplay
                content={data?.projectContent?.projectSubContent}
                textColor="#0e0e0e"
              />
            </div>

            <div className="flex items-center justify-center">
              <ViewMoreButtonSec
                title="Next Projects"
                onClick={() => navigate("/projects")}
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

export default SingleProjectPage;
