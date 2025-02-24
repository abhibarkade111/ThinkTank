import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import HomeImage from "../../assets/home_image.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="p-0">
      <div
        className="hero-section d-flex text-white "
        style={{
          backgroundImage: `url(${HomeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          textAlign: "left",
          justifyContent: "flex-start",
          paddingLeft: "5%",
          marginTop: "60px",
        }}
      >
        <div className="hero-content">
          <h1 className="fw-bold">ThinkTank</h1>
          <p
            className="fs-5"
            style={{
              color: "yellowgreen",
            }}
          >
            Master the Art of Problem Solving.
          </p>
        </div>
      </div>

      <Container className="mt-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Explore the Community</Card.Title>
                <Card.Text>
                  Discover and connect with all users on the platform. Browse
                  profiles, view contributions, and collaborate effortlessly.
                </Card.Text>
                <Button variant="primary" onClick={() => navigate("/users")}>
                  View All Users
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Browse All Problems</Card.Title>
                <Card.Text>
                  Access a collection of challenging problems. Test your skills,
                  learn new concepts, and contribute your solutions.
                </Card.Text>
                <Button variant="success" onClick={() => navigate("/problems")}>
                  Explore Problems
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow">
              <Card.Body>
                <Card.Title>Share Your Challenge</Card.Title>
                <Card.Text>
                  Got a tricky problem? Contribute it to the community and help
                  others sharpen their problem-solving skills.
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => navigate("/addproblem")}
                >
                  Submit a Problem
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
