import React, { useState, useEffect, useContext } from "react";
import Profiles from "./Profile";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function LeaderBoard() {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("normal");
  const [viewMode, setViewMode] = useState("grid"); // new state for view mode
  const { state } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/allusers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.users) {
          const sorted = sortLeaderboard(result.users, period);
          setData(sorted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
        setLoading(false);
      });
  }, [period]);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  const sortLeaderboard = (users, by) => {
    if (by === "normal") {
      return [...users].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...users].sort((a, b) => {
      const scoreA = by === "solved" ? a.problemSolved : a.problemAdded;
      const scoreB = by === "solved" ? b.problemSolved : b.problemAdded;
      return scoreB - scoreA;
    });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5 mt-4">
        <h1 className="display-4 fw-bold text-gradient">🏆 Code Champions</h1>
        <p className="lead text-muted">
          Explore the top coders of our platform!
        </p>
      </div>

      {/* Sort buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
        <div className="btn-group shadow-sm">
          <button
            type="button"
            data-id="normal"
            onClick={handleClick}
            className={`btn btn-outline-primary ${
              period === "normal" ? "active" : ""
            }`}
          >
            🔤 A-Z
          </button>
          <button
            type="button"
            data-id="solved"
            onClick={handleClick}
            className={`btn btn-outline-success ${
              period === "solved" ? "active" : ""
            }`}
          >
            ✅ Solved
          </button>
          <button
            type="button"
            data-id="added"
            onClick={handleClick}
            className={`btn btn-outline-warning ${
              period === "added" ? "active" : ""
            }`}
          >
            ➕ Added
          </button>
        </div>

        {/* View toggle */}
        <div className="btn-group shadow-sm">
          <button
            className={`btn btn-outline-secondary ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            🗂️ Grid
          </button>
          <button
            className={`btn btn-outline-secondary ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            📄 List
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-info" role="status"></div>
          <p className="mt-3 text-muted">Summoning coders...</p>
        </div>
      ) : (
        <Profiles Leaderboard={data} viewMode={viewMode} />
      )}
    </div>
  );
}
