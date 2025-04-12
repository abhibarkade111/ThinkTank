import React from "react";
import AbhishekPic from "../../assets/Abhishek.avif";
import KimayaPic from "../../assets/Kimaya.jpg";
import RohanPic from "../../assets/Rohan.avif";
import MayuriPic from "../../assets/Mayuri.jpg";
import PranavPic from "../../assets/Pranav.jpg";
import ChetanPic from "../../assets/Chetan.avif";
import HarshalPic from "../../assets/Harshal.avif";
import ShrikantPic from "../../assets/Shrikant.avif";
import ShreyaPic from "../../assets/Shreya.jpg";
import ListView from "./ListView";

const imageMap = {
  AbhishekPic,
  KimayaPic,
  RohanPic,
  MayuriPic,
  PranavPic,
  ChetanPic,
  HarshalPic,
  ShrikantPic,
  ShreyaPic,
};

const medalEmoji = ["🥇", "🥈", "🥉"];

export default function Profiles({ Leaderboard, viewMode }) {
  return viewMode === "grid" ? (
    <GridView Leaderboard={Leaderboard} />
  ) : (
    <ListView Leaderboard={Leaderboard} />
  );
}

function GridView({ Leaderboard }) {
  return (
    <div className="row g-4 justify-content-center">
      {Leaderboard.map((user, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <div className="position-relative mb-3">
                <img
                  src={imageMap[user.pic]}
                  alt={user.name}
                  className="rounded-circle border border-3 border-primary"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                {index < 3 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {medalEmoji[index]}
                  </span>
                )}
              </div>
              <h5 className="card-title fw-bold mb-0">{user.name}</h5>
              <p className="text-muted mb-2">Rank #{index + 1}</p>
              <div className="d-flex justify-content-around">
                <span className="badge bg-success">
                  ✅ {user.problemSolved}
                </span>
                <span className="badge bg-info text-dark">
                  ➕ {user.problemAdded}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
