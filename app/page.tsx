import AddSchool from "../pages/addSchool";
import ShowSchools from "../pages/showSchools";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#1e3a8a",
          marginBottom: "2rem",
        }}
      >
        School Management Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        <div>
          <AddSchool />
        </div>

        <div>
          <ShowSchools />
        </div>
      </div>
    </div>
  );
}
