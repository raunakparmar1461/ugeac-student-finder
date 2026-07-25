import { useState } from "react";
import supabase from "./supabase";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [dark, setDark] = useState(true);

  async function searchStudent() {
  try {
    if (search.trim() === "") {
      alert("Please enter something.");
      return;
    }

    setLoading(true);
    setStudents([]);
    setNotFound(false);

    const value = search.trim();

    console.log("Searching for:", value);

    let query = supabase.from("students").select("*");

    if (/^\d+$/.test(value)) {
      // Numeric input

      if (value.length >= 12) {
        console.log("Searching by UGEAC ID");
        query = query.eq("ugeac_id", value);
      } else {
        console.log("Searching by JEE AIR");
        query = query.eq("jee_air", value);
      }

    } else {
      console.log("Searching by Name");
      query = query.ilike("name", `%${value}%`);
    }

    const { data, error } = await query;

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) throw error;

    if (!data || data.length === 0) {
      setNotFound(true);
    } else {
      setStudents(data);
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
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

        <input
            className="searchInput"
            type="text"
            placeholder="Enter UGEAC ID, JEE AIR or Student Name"
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