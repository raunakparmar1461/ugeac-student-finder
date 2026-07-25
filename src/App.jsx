import { useState } from "react";
import supabase from "./supabase";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("ugeac");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  async function searchStudent() {
  console.log("Search started");

  setLoading(true);

  let query = supabase.from("students").select("*");

  if (searchType === "ugeac") {
    query = query.eq("ugeac_id", search.trim());
  } else if (searchType === "air") {
    query = query.eq("jee_air", search.trim());
  } else {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error } = await query;

  console.log("Data:", data);
  console.log("Error:", error);

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  setStudents(data);
}

  return (
    <div className={dark ? "container dark" : "container light"}>

      {/* Header */}

      <div className="header">

        <div>
          <h1>🎓 UGEAC Student Finder</h1>
          <p>
            Search Bihar UGEAC Seat Allotment Details
          </p>
        </div>

        <button
          className="themeBtn"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>

      {/* Statistics */}

      <div className="stats">

        <div className="statBox">
          <h2>6639</h2>
          <p>Students</p>
      </div>

        <div className="statBox">
          <h2>38</h2>
          <p>Institutes</p>
      </div>

        <div className="statBox">
          <h2>50+</h2>
          <p>Branches</p>
      </div>

</div>

      {/* Search Card */}

      <div className="searchCard">

        <h2>Search Student</h2>

        <div className="radioGroup">

          <label>
            <input
              type="radio"
              checked={searchType === "ugeac"}
              onChange={() => setSearchType("ugeac")}
            />
            UGEAC ID
          </label>

          <label>
            <input
              type="radio"
              checked={searchType === "air"}
              onChange={() => setSearchType("air")}
            />
            JEE AIR
          </label>

          <label>
            <input
              type="radio"
              checked={searchType === "name"}
              onChange={() => setSearchType("name")}
            />
            Name
          </label>

        </div>

        <input
            className="searchInput"
            type="text"
            placeholder={
              searchType === "ugeac"
                  ? "Enter UGEAC ID"
                  : searchType === "air"
                  ? "Enter JEE AIR"
                  : "Enter Student Name"
            }
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                  searchStudent();
                }
            }}
        />

        <button
          className="searchBtn"
          onClick={searchStudent}
        >
          {loading ? (
            <div className="loader"></div>
        ) : (
            "🔎 Search Student"
        )}
        </button>

      </div>

      {students.length > 0 && (
        <h3 className="resultCount">
          Found {students.length} student{students.length > 1 ? "s" : ""}
        </h3>
      )}

      {/* Result */}

      {students.map((student, index) => (
        <div className="resultCard" key={student.ugeac_id || index}>

          <div className="studentHeader">

            <div className="avatar">
              👤
            </div>

            <div>
                <h2>{student.name}</h2>
                <p>Student Information</p>
            </div>

          </div>

          <div className="row">
            <span>🆔 UGEAC ID</span>
            <span>{student.ugeac_id}</span>
          </div>

          <div className="row">
            <span>🏆 JEE AIR</span>
            <span>{student.jee_air}</span>
          </div>

          <div className="row">
            <span>🎓 Institute</span>
            <span>{student.institute}</span>
          </div>

          <div className="row">
            <span>💻 Branch</span>
            <span>{student.branch}</span>
          </div>

          <div className="row">
            <span>📌 Category</span>
            <span>{student.category}</span>
          </div>

          <div className="row">
            <span>📈 UR Rank</span>
            <span>{student.ur_rank}</span>
          </div>

          <div className="row">
            <span>🪑 Seat Type</span>
            <span>{student.seat_type}</span>
          </div>

          <div className="row">
            <span>🏷 Allotted Category</span>
            <span>{student.allotted_cat}</span>
          </div>

          <div className="row">
            <span>📝 Remark</span>
            <span>{student.remark}</span>
          </div>

          <div className="row">
            <span>Status</span>
            <span className="status">{student.allot_status}</span>
          </div>

        </div>
      ))}

      {/* Footer */}

      <footer>

      <h3>🎓 UGEAC Student Finder</h3>

      <p>

      Developed with ❤️ by

      <b> Raunak Parmar</b>

      </p>

      <p>

      © 2026 All Rights Reserved

      </p>

      </footer>

    </div>
  );
}

export default App;