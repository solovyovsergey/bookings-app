import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaCalendar, FaDoorOpen, FaUsers } from "react-icons/fa";

import BookingsPage from "./components/Bookings/BookingsPage";
import BookablesPage from "./components/Bookables/BookablesPage";
import UsersPage from "./components/Users/UsersPage";
import UserPicker from "./components/Users/UserPicker";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className="btn btn-header">
                  <FaCalendar />
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="btn btn-header">
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>

          <UserPicker />
        </header>

        <Routes>
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
