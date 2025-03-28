import { useState, useEffect } from "react";
import AttractionCard from "../components/AttractionCard";

function LandingPage() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect((fetchData),[searchQuery]);

  const fetchData = async() => {
    setLoading(true);
    setError(false)
    try {
      const response = axios.get("http://localhost:4001/trips", {
        params: {
          category: searchQuery,
        }
      }) 
      setPosts(response.data)
    } catch(error) {
      setError(true)
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

    return (
      <>
        {/* Header */}
        <div className="text-5xl text-blue-400 font-NotoSans">
          <h1>เที่ยวไหนดี</h1>
        </div>

        {/* Seacrh Bar */}
        <p className="font-NotoSans">ค้นหาที่เที่ยว</p>
        <input
          className=""
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
          maxLength={100}
        />

        {/* AttractionCard */}
        {posts.map((post) => (
        <AttractionCard
        key={post.id}
        image={post.image}
        category={post.category}
        title={post.title}
        description={post.description}
        author={post.author}
        date={post.date}
        authorImage={post.authorImage}
        />
      ))}
      </>
    )
  }
  
  export default LandingPage;
  