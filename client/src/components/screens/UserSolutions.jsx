import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { Spinner } from "react-bootstrap";

function UserSolutions() {
  const { state } = useLocation();
  // console.log("state", state);
  const solutionList = state?.solutions;
  // console.log("solutionList", solutionList);
  if (!solutionList || solutionList.length == 0) {
    return (
      <div>
        <h4>No any problem solved yet...</h4>
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
              {state.user.name === state.currentUser.name
                ? "Your"
                : state.user.name}
              's' Solutions
            </h4>
          </div>
          {solutionList.map((item) => {
            return (
              <Card
                style={{
                  width: "100%",
                  margin: "20px auto",
                  textAlign: "left",
                  padding: "1em",
                }}
              >
                <Card.Body
                  style={{
                    padding: "0em",
                  }}
                >
                  <Card.Title>{item.problem.statement}</Card.Title>
                  <Card.Text>
                    <strong>Solution:</strong>
                    <pre
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                        borderRadius: "5px",
                        overflowX: "auto",
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
          })}
        </Container>
      </div>
    );
  }
}

export default UserSolutions;
