import Test from './Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import { UserInterface } from './types/UserInterface';
import HomePage from './pages/HomePage';


const defaultUser: UserInterface = {
  id: "",
  name: "",
  password: "",
  role: "USER",
  booked_workouts: [],
}

function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser)
  console.log(currentUser)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <LoginPage setCurrentUser={setCurrentUser} />}/>
          <Route path="/home" element={ <HomePage />}/>
          <Route path="/test" element={ <Test />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
