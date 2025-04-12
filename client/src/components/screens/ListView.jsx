import React from 'react';
import AbhishekPic from "../../assets/Abhishek.avif";
import KimayaPic from "../../assets/Kimaya.jpg";
import RohanPic from "../../assets/Rohan.avif";
import MayuriPic from "../../assets/Mayuri.jpg";
import PranavPic from "../../assets/Pranav.jpg";
import ChetanPic from "../../assets/Chetan.avif";
import HarshalPic from "../../assets/Harshal.avif";
import ShrikantPic from "../../assets/Shrikant.avif";
import ShreyaPic from "../../assets/Shreya.jpg";

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

export default function ListView({ Leaderboard }) {
  return (
    <div className="list-group">
      {Leaderboard.map((user, index) => (
        <div key={index} className="list-group-item d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={imageMap[user.pic]}
              alt={user.name}
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
            <div>
              <h6 className="mb-0">{user.name}</h6>
              <small className="text-muted">Rank #{index + 1}</small>
            </div>
          </div>
          <div className="text-end">
            <span className="badge bg-success me-2">Solved: {user.problemSolved}</span>
            <span className="badge bg-info text-dark">Added: {user.problemAdded}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
