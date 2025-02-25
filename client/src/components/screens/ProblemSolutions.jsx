import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";

function ProblemSolutions() {
  const location = useLocation();
  const [solutions, setSolutions] = useState(null);
  // const { state } = useLocation();
  useEffect(() => {
    if (location.state?.solutions) {
      setSolutions(location.state.solutions);
    }
  }, [location.state]);
  // console.log("state", state);
  // const solutionList = state?.solutions;
  // console.log("solutionList", solutionList);
  if (!solutions || solutions.length == 0) {
    return (
      <div>
        <h4>No solution submited yet...</h4>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <div
            style={{
              padding: "15px",
              backgroundColor: "grey",
              color: "white",
              textAlign: "center",
              borderRadius: "5px",
              marginBottom: "20px",
              marginTop: "60px",
            }}
          >
            <h4>
              Problem Statement:
              {location.state.problem.statement}
            </h4>
          </div>
          {solutions ? (
            solutions.map((item) => {
              return (
                <Card
                  style={{
                    width: "100%",
                    margin: "20px auto",
                    textAlign: "left",
                  }}
                >
                  <Card.Body>
                    <Card.Title>submited by {item.postedBy.name}</Card.Title>
                    <Card.Text>
                      <strong>Solution:</strong>
                      <pre
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        {item.answer}
                      </pre>
                    </Card.Text>
                    <Card.Text>
                      <strong>Additional Comment:</strong>{" "}
                      {item.additional_comment}
                    </Card.Text>
                    <Card.Text>
                      <strong>Tech:</strong> Java
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default ProblemSolutions;
