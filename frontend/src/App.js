import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Heros/Login";
import Signup from "./pages/Heros/Signup";
import User from "./pages/Features/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workout from "./pages/Features/Workout";
import WorkoutPlan from "./components/Workout/WorkoutPlan";
import Logout from "./pages/Heros/Logout";
import Intropage from "./pages/Intropage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intropage/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage menu='Overview'/>} />
        <Route path="/health" element={<Homepage menu='Health'/>} />
        <Route path="/health/weight" element={<Homepage menu='Weight'/>} />
        <Route path="/health/calories" element={<Homepage menu='Calories'/>} />
        <Route path="/health/sleep" element={<Homepage menu='Sleep'/>} />
        <Route path="/health/steps" element={<Homepage menu='Steps'/>} />
        <Route path="/user" element={<User />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/workout/:date" element={<WorkoutPlan />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
