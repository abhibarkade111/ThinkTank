import {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AllUsers from "./components/screens/AllUsers";
import UserSolutions from "./components/screens/UserSolutions";
import { reducer, initialState } from "./reducers/userReducers";
import Problems from "./components/screens/Problems";
import ProblemSolutions from "./components/screens/ProblemSolutions";
import ProblemForm from "./components/screens/ProblemForm";
import SignInForm from "./components/screens/SignInForm";
import SolutionForm from "./components/screens/SolutionForm";
import Home from "./components/screens/Home";
export const UserContext = createContext();
const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/solutions" element={<UserSolutions />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/problems/solutions" element={<ProblemSolutions />} />
      <Route path="/addproblem" element={<ProblemForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/problems/solve" element={<SolutionForm />} />
    </Routes>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
