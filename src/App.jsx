import { useState } from "react";
import supabase from "./supabase";

function App() {
  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

 async function searchStudent() {
  setLoading(true);

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("ugeac_id", id);

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    alert(error.message);
  } else if (data.length === 0) {
    alert("No matching student found");
  } else {
    setStudent(data[0]);
  }

  setLoading(false);
}

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>UGEAC Student Finder</h1>

      <input
        type="text"
        placeholder="Enter UGEAC ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          fontSize: "18px",
        }}
      />

      <br />
      <br />

      <button
        onClick={searchStudent}
        style={{
          padding: "12px 30px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {loading ? "Searching..." : "Search"}
      </button>

     {student && (
  <div
    style={{
      marginTop: "30px",
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
    }}
  >
    <h2>{student.name}</h2>

    <p><b>UGEAC ID:</b> {student.ugeac_id}</p>
    <p><b>JEE Application:</b> {student.jee_apl}</p>
    <p><b>JEE AIR:</b> {student.jee_air}</p>
    <p><b>Gender:</b> {student.gender}</p>
    <p><b>Category:</b> {student.category}</p>
    <p><b>UR Rank:</b> {student.ur_rank}</p>
    <p><b>Category Rank:</b> {student.cat_rank}</p>
    <p><b>RCG Rank:</b> {student.rcg_rank ?? "N/A"}</p>
    <p><b>DQ Rank:</b> {student.dq_rank ?? "N/A"}</p>
    <p><b>SMQ Rank:</b> {student.smq_rank ?? "N/A"}</p>

    <p><b>Institute:</b> {student.institute}</p>
    <p><b>Branch:</b> {student.branch}</p>
    <p><b>Seat Type:</b> {student.seat_type}</p>
    <p><b>Allotted Category:</b> {student.allotted_cat}</p>
    <p><b>Remark:</b> {student.remark}</p>
    <p><b>Allotment Status:</b> {student.allot_status}</p>
  </div>
)}
    </div>
  );
}

export default App;