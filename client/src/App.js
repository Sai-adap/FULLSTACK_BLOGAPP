
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Header';
import AddBlog from "./components/AddBook";
import Blogs from "./components/Book/Books";
import BookDetail from "./components/Book/BookDetail";
import Protected from './components/protected';
// import Protected from './components/protected';
import React from "react";


export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}></Route>
      <Route path="/signup"element={<Signup/>}></Route>
      {/* <Route path="/data"element={<Pg0/>}></Route> */}
      <Route path="/home" element={<Protected><Home /></Protected>} exact />
          <Route path="/add" element={<Protected><AddBlog /></Protected>} exact />
          <Route path="/blogs" element={<Blogs />} exact />
          <Route path="/blogs/:id" element={<BookDetail />} exact />
        </Routes>
        </BrowserRouter>

        </div>
  );
}
