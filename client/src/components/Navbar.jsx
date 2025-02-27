import Container from "react-bootstrap/Container";
import { Navbar, OverlayTrigger, Popover, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import profilePicture from "../assets/abhishek_barkade_profile.jpg";
import { useNavigate } from "react-router-dom";
import AbhishekPic from "../assets/Abhishek.avif";
import KimayaPic from "../assets/Kimaya.jpg";
import RohanPic from "../assets/Rohan.avif";
import MayuriPic from "../assets/Mayuri.jpg";
import PranavPic from "../assets/Pranav.jpg";
import ChetanPic from "../assets/Chetan.avif";
import HarshalPic from "../assets/Harshal.avif";
import ShrikantPic from "../assets/Shrikant.avif";
import ShreyaPic from "../assets/Shreya.jpg";
import ProfilePopup from "./ProfilePopup";

const imageMap = {
  AbhishekPic: AbhishekPic,
  KimayaPic: KimayaPic,
  RohanPic: RohanPic,
  MayuriPic: MayuriPic,
  PranavPic: PranavPic,
  ChetanPic: ChetanPic,
  HarshalPic: HarshalPic,
  ShrikantPic: ShrikantPic,
  ShreyaPic: ShreyaPic,
};

function NavbarComponenet() {
  const [expanded, setExpanded] = useState(false);
  const handleClick = (url) => {
    setExpanded(false);
    if (currentUser) {
      navigate(url);
    } else {
      navigate("/signin");
    }
  };
  const navigate = useNavigate();
  const currentUser = !localStorage.getItem("user")
    ? null
    : JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar expand="md" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand onClick={() => handleClick("/")}>ThinkTank</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link onClick={() => handleClick("/problems")}>
              Problems
            </Nav.Link>
            <Nav.Link onClick={() => handleClick("/users")}>Users</Nav.Link>
            <Nav.Link
              onClick={() =>
                currentUser ? navigate("/addproblem") : navigate("/signin")
              }
            >
              Add Problem
            </Nav.Link>
          </Nav>

          <ProfilePopup currentUser={currentUser} imageMap={imageMap} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponenet;
