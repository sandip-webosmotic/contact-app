import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from './component/Login'
import Header from './component/Header'
import Home from './component/Home'
import Registration from './component/Registration'
import AuthProvider, { RequireAuth } from './context/Provider'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Header to={'/header'} />} >
              <Route
                path="/home"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="/login"
              element={
                <RequireAuth isAuthenticatedPage={false}>
                  <Login />
                </RequireAuth>
              }
            />

            <Route exact path="/registration" element={<Registration />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
