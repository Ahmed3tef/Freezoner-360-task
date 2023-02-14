import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
// import { Footer, LoginForm, Navbar, SignUpForm } from './components';
import {
  Categories,
  Category,

} from './pages';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReferenceForm, Sidebar, SuggestionForm } from './components';

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path='/references' element={<Categories />}>

            <Route path="category/:id" element={<Category />} />
            <Route path="reference" element={<ReferenceForm />} >
              {/* to edit */}
              <Route path=":id" element={<ReferenceForm />} />
            </Route>
            <Route path="suggestion" element={<SuggestionForm />} >
              {/* to edit */}
              <Route path=":id" element={<SuggestionForm />} />
            </Route>
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          rtl={false}
          autoClose={5000}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
