import { useState } from "react";

const SearchInput = ({ onSearch, placeholder = "Search..." }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (searchValue === "") {
      setIsFocused(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 bg-transparent px-4 py-5 rounded-full border-2 border-primary-light transition-all duration-300 ease-in-out ${
        isFocused || searchValue ? "w-96" : "w-48"
      }`}
    >
      {/* Search Icon */}
      <svg
        className="w-5 h-5 text-primary-deep flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="outline-none bg-transparent text-gray-900 placeholder:text-[18px] placeholder-primary-deep flex-1"
      />
    </div>
  );
};

export default SearchInput;
