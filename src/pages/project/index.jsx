import { useState } from "react";
import { Projects } from "../../components/home/Projects";
import Footer from "../../components/globals/Footer";
import UserNavbar from "../../components/globals/UserNavbar";
import Trigram from "../../components/globals/TrigramUpdated";
import SearchInput from "../../components/form/SearchInput";
import ViewMoreButtonSec from "../../components/globals/ViewMoreBtnSec";
import ViewMoreButtonPrim from "../../components/globals/ViewMoreBtnPrim";

const ProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-[#DCDCDC] w-full h-full">
      <UserNavbar />
      <Trigram />

      <div className="flex flex-col gap-[50px] pt-[80px] px-[230px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/images/new-slanted-arrow.png"
              alt=""
              className="mb-6 h-8"
            />
            <h1 className="text-primary-deep text-[70px] font-medium mb-6">
              My Recent Work
            </h1>
          </div>

          {/* search */}
          <SearchInput onSearch={handleSearch} placeholder="Search" />
        </div>

        <Projects searchQuery={searchQuery} />

        <div className="flex items-center justify-center">
          <ViewMoreButtonSec title="Load More Projects" slantedbg />
        </div>

        <h1 className="text-[70px] text-center font-medium text-primary-deep">
          Want to work together?
        </h1>
        <section className="flex justify-center items-center">
          <ViewMoreButtonPrim title="boayewa@gmail.com" />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;
