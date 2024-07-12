import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workout from "./pages/Workout";
import WorkoutPlan from "./components/Workout/WorkoutPlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/homepage/user" element={<User />} />
        <Route path="/homepage/workout" element={<Workout />} />
        <Route path="/homepage/workout/:date" element={<WorkoutPlan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
