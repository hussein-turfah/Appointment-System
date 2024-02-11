import { useState } from "react";

const Dropdown = ({ value, values, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full relative z-0">
      <div className="relative group w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
        {!isOpen && !value ? (
          <div
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none w-full cursor-pointer"
          >
            <span className="mr-2">Select</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : !value && isOpen ? (
          <input
            id="search-input"
            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none w-full"
            type="text"
            placeholder="Search"
            autoComplete="off"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <div
            onClick={
              ()=>{
                setValue("");
                toggleDropdown();
              }
            }
            className="flex items-center justify-between w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none w-full cursor-pointer"
          >
            <span className="mr-2">{value}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {isOpen && (
          <div
            id="dropdown-menu"
            className={`absolute top-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-50`}
          >
            {values?.length > 0 &&
              values
                .filter((value) => {
                  if (searchTerm === "") {
                    return value;
                  } else if (
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setValue(value);
                      handleBlur();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  >
                    {value}
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
