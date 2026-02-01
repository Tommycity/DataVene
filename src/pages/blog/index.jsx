import { useState } from "react";
import { fetchAllBlogPost } from "../../api";
import { BlogCard } from "../../components/home/BlogCard";
import SearchInput from "../../components/form/SearchInput";
import UserNavbar from "../../components/globals/UserNavbar";
import Trigram from "../../components/globals/TrigramUpdated";
import Footer from "../../components/globals/Footer";
import ViewMoreButtonSec from "../../components/globals/ViewMoreBtnSec";

const BlogPage = () => {
  const { data: blogData, loading } = fetchAllBlogPost();
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
          <div className="flex items-center gap-2">
            <h1 className="text-primary-deep text-[70px] font-medium mb-6">
              Blog Posts
            </h1>
            <span className="text-primary-deep font-medium text-[35px]">
              ({blogData?.data?.length || 0})
            </span>
          </div>

          {/* search */}
          <SearchInput onSearch={handleSearch} placeholder="Search" />
        </div>

        <span className="text-primary-deep font-medium text-[18px] -mb-5">
          BLOG POSTS
        </span>
        <BlogCard searchQuery={searchQuery} />

        <div className="flex items-center justify-center mt-8">
          <ViewMoreButtonSec title="Load More Blog" arrowDown />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
