import { useState, useEffect } from "react";

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
      </>
    )
  }
  
  export default LandingPage;
  