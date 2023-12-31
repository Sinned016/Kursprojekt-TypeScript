import Test from './Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import { UserInterface } from './types/UserInterface';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';


export const defaultUser: UserInterface = {
  id: "",
  name: "",
  password: "",
  role: "USER",
  booked_workouts: [],
}

function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const errorMsg = "You need to log in to access the home page"
  const errorMsgAdmin = "You do not have permission to access this page"
  console.log(currentUser)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <LoginPage setCurrentUser={setCurrentUser} />} />
          <Route path="/home" element={currentUser.id !== "" ? <HomePage currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <LoginPage setCurrentUser={setCurrentUser} errorMsg={errorMsg} />} />
          <Route path='/admin' 
            element={currentUser.role === "ADMIN" ? 
            <AdminPage currentUser={currentUser} setCurrentUser={setCurrentUser}/> : 
            <LoginPage setCurrentUser={setCurrentUser} errorMsg={errorMsgAdmin} />} /> 
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/test" element={ <Test />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
