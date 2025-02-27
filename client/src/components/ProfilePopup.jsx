import React from "react";
import {
  Navbar,
  OverlayTrigger,
  Popover,
  Button,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfilePopup = ({ currentUser, imageMap }) => {
  const navigate = useNavigate();
  console.log("currentUser: " + JSON.stringify(currentUser));

  if (!currentUser) {
    return (
      <Navbar.Text>
        Signed in as: <span style={{ color: "gray" }}>Not logged in</span>
      </Navbar.Text>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const popover = (
    <Popover id="profile-popover">
      <Popover.Body>
        <div className="d-flex flex-column">
          <strong>{currentUser ? currentUser.name : "Guest"}</strong>
          <small>{currentUser?.email || "No email available"}</small>
          <hr />
          <Button variant="outline-primary" size="sm" className="mb-2">
            View Profile
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      rootClose
    >
      <div>
        <Navbar.Text>
          Signed in as:
          <b
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            {" "}
            {!currentUser ? "Not looged in" : currentUser.name}
          </b>
        </Navbar.Text>
        <Image
          src={!currentUser ? "" : imageMap[currentUser.pic]}
          style={{ borderRadius: "50%", height: "60px", width: "60px" }}
          className="mx-2"
        />
      </div>
    </OverlayTrigger>
  );
};

export default ProfilePopup;
