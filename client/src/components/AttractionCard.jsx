import { useState } from "react";

function AttractionCard({title, url, photos, tags, description}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  return (
    // Big Box
    <div className="flex w-full max-w-4xl mx-auto py-6 bg-white rounded-lg overflow-hidden font-NotoSans">
      {/* Left Box */}
      <div className="md:flex hidden w-1/3 md:h-60 h-1/2 rounded-3xl overflow-hidden flex-shrink-0">
        <img
          src={photos[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Box */}
      <div className="md:w-2/3 w-full md:pl-6 px-6 flex flex-col">
        {/* Upper Box */}
          <div className="mb-6">
            <div className="md:hidden h-auto rounded-3xl overflow-hidden flex-shrink-0 mb-6">
            <img
              src={photos[0]}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 ">
            {title}
          </h2>
          {/* Description */}
          <p className="text-sm text-gray-500 mb-2">
            <p>{isExpanded ? description : shortDescription}</p>
            {description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-300 underline"
              >
                {isExpanded ? "ย่อ" : "อ่านต่อ"}
              </button>
            )}
          </p>
          <p className="text-gray-500 text-sm">
            หมวดหมู่: 
            {tags.map((tag) => (
            <button 
              key={tag}
              className="ml-2 underline"
              
            >
                {tag}
            </button>
            ))}
          </p>
        </div>

        {/* Lower Box */}
        <div className="flex gap-6 pb-3">
          {photos
            .filter((item, index) => index !== 0)
            .map((item) => (
              <img
                key={item}
                src={item}
                alt={title}
                className={`w-20 h-20 object-cover rounded-md`}
              />
            ))
          }
        </div>



      </div>
    </div>
  );
};
  
  export default AttractionCard;