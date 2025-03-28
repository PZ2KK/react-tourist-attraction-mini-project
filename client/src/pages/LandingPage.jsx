import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import AttractionCard from "../components/AttractionCard";

function LandingPage() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get("http://localhost:4001/trips", {
          params: {
            keywords: searchQuery,
          },
        });
        setPosts(response.data.data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleTagClick = (tag) => {
    setSearchQuery((prev) => {
      const tags = prev ? prev.split(" ") : [];
      return tags.includes(tag) ? prev : [...tags, tag].join(" ");
    });
  };

    return (
      <>
        {/* Header */}
        <div className="flex flex-col items-center font-NotoSans p-6">
          <div className="text-5xl text-blue-400 pt-12 font-bold">
            <h1>เที่ยวไหนดี</h1>
          </div>

          {/* Seacrh Bar */}
          <p 
            className="pt-6 flex w-1/2 justify-center md:justify-start">
              ค้นหาที่เที่ยว
          </p>
          <DebounceInput
            className="flex w-1/2 placeholder:text-center text-center border border-b-gray-200 border-x-transparent border-t-transparent focus:outline-none"
            debounceTimeout={500}
            aria-label="Search"
            maxLength={100}
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* AttractionCard */}
        {isLoading && 
          <div className="flex flex-col items-center text-xl p-10">
             <div className="spinner mb-5"></div>
            <p>Loading tourist attraction...</p>
          </div>
        }
        {isError && 
          <div className="flex flex-col items-center text-xl text-red-500">
            <p>Failed to load tourist attraction. Please try again.</p>
          </div>
        }
        
        {posts.map((post) => (
        <AttractionCard
          key={post.eid}
          title={post.title}
          url={post.url}
          photos={post.photos}
          tags={post.tags}
          description={post.description}
          onTagClick={handleTagClick}
        />
      ))}
      </>
    )
  }
  
  export default LandingPage;
  