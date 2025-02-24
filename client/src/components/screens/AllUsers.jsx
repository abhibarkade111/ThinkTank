import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import profilePicture from "../../assets/abhishek_barkade_profile.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";
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
function AllUsers() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/allusers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result:", result);
        setData(result.users);
        setLoading(false);
      });
  }, []);

  const fetchSolutions = (item) => {
    console.log("item", JSON.stringify(item));
    setLoading(true);
    fetch("http://localhost:5000/usersolutions", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result solutions:", result);
        setLoading(false);
        navigate("/solutions", {
          state: {
            solutions: result.solutions,
            user: item,
            currentUser: currentUser,
          },
        });
        // setData(result.users);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
  // console.log("data:", data);
  // data.map((item) => {
  //   console.log("item:", item);
  // });

  const currentUser = !localStorage.getItem("user")
    ? null
    : JSON.parse(localStorage.getItem("user"));

  return (
    <Container className="mt-4">
      <Row>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          data.map((item) => {
            return (
              <Col>
                <Card style={{ width: "18rem", margin: "2rem" }}>
                  <Card.Img
                    variant="top"
                    src={imageMap[item.pic]}
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <Card.Body className="pt-2 pb-2 px-0 py-0">
                    <Card.Title>
                      {currentUser != null && item.name === currentUser.name
                        ? "YOU"
                        : item.name}
                    </Card.Title>
                    <Card.Text>
                      <div
                        className="d-flex justify-content-start rounded-3 p-1 mb-2"
                        style={{ backgroundColor: "#efefef" }}
                      >
                        <div>
                          <p className="small text-muted mb-1">
                            Problems solved
                          </p>
                          <p className="mb-0">{item.problemSolved}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">
                            Problems Added
                          </p>
                          <p className="mb-0">{item.problemAdded}</p>
                        </div>
                      </div>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        fetchSolutions(item);
                      }}
                    >
                      View Solutions
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
}

export default AllUsers;
