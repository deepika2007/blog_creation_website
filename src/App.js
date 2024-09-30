import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PostList from './components/postlist/PostList';
import { getUser } from './api/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupComponent from './components/auth/Signup';

function App() {
  const token = localStorage.getItem("blog_token");

  const validateUser = async () => {
    const response = await getUser();
    if (response?.token) {
      localStorage.setItem("blog_token", response.token);
    }
  };

  useEffect(() => {
    validateUser();
  }, [localStorage.getItem("blog_token")]);

  return (
    <>
      <Router>
        {token ?
          <main className="private-main">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </main> :
          <main className="public-main">
            <div className="public-container">
              <Routes>
                <Route exact path="/login" element={<SignupComponent validateUser={() => validateUser()} />} />
                <Route path="*" element={<Navigate replace to="/login" />} />
              </Routes>
            </div>
          </main>}
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;