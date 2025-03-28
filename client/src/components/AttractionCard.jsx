import { useState } from "react";
import { FaLink } from "react-icons/fa6";

function AttractionCard({title, url, photos, tags, description, onTagClick}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");

  const shortDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  const openPopup = (imageUrl) => {
    setPopupImage(imageUrl);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    // Big Box
    <div className="flex w-full max-w-6xl mx-auto py-6 bg-white rounded-lg overflow-hidden font-NotoSans">
      {/* Left Box */}
      <div className="md:flex hidden w-1/3 md:h-60 h-1/2 rounded-3xl overflow-hidden flex-shrink-0">
        <img
          src={photos[0]}
          alt={title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openPopup(photos[0])}
        />
      </div>

      {/* Right Box */}
      <div className="md:w-2/3 w-full md:pl-6 px-6 flex flex-col">
        {/* Mobile Version */}
          <div className="mb-6">
            <div className="md:hidden h-auto rounded-3xl overflow-hidden flex-shrink-0 mb-6">
            <img
              src={photos[0]}
              alt={title}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openPopup(photos[0])}
            />
          </div>

          {/* Title */}
          <a
            className="text-2xl font-bold hover:text-gray-500"
            href={url}
            target="_blank"
            >
            {title}
          </a>

          {/* Description */}
          <div className="text-sm text-gray-500 my-3">
            <p>{isExpanded ? description : shortDescription}</p>
            {description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-300 underline"
              >
                {isExpanded ? "ย่อ" : "อ่านต่อ"}
              </button>
            )}
          </div>

          {/* Tag */}
          <p className="text-gray-500 text-sm">
            หมวดหมู่: 
            {tags.map((tag) => (
            <button 
              key={tag}
              className=" md:bg-blue-400  md:hover:bg-blue-300 md:text-white md:ml-2 md:py-1 md:px-2 md:no-underline underline px-1 mt-1 rounded-lg"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
            ))}
          </p>
        </div>

        {/* Lower Box */}
        <div className="flex flex-row pb-3">
          <div className="flex flex-row md:gap-6 gap-3">
            {photos
              .filter((item, index) => index !== 0)
              .map((item) => (
                <img
                  key={item}
                  src={item}
                  alt={title}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer`}
                  onClick={() => openPopup(item)}
                />
              ))
            }
          </div>
          <div className="flex md:ml-auto md:items-end md:mr-40 ml-6 items-center">
            <FaLink
              size="30"
              className="cursor-pointer text-blue-600 hover:text-blue-300"
              onClick={() => { 
                navigator.clipboard.writeText(url);
                alert('URL copied to clipboard!') 
              }}
            />
          </div>
        </div>

      {/* Pop-up แสดงรูปภาพ */}
      {isPopupOpen && (
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="relative">
            <span
              className="absolute top-2 right-3 text-5xl cursor-pointer text-white hover:text-gray-300"
              onClick={closePopup}
            >
              &times;
            </span>
            <img
              src={popupImage}
              alt="Popup Image"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      </div>
    </div>
  );
};
  
  export default AttractionCard;