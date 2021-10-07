import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import Index from "./pages/Index";
import Search from "./pages/Search";
import Book from "./pages/Book";

import Navigation from "./components/common/Navigation";
import RotateLoader from "react-spinners/RotateLoader";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));

function FallbackLoading() {
  return (
    <div className="flex m-24">
      <div className="mx-auto">
        <RotateLoader loading={true} color={"#2563eb"} />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/home" exact component={Index} />
        <Route path="/search/:query" component={Search} />
        <Route path="/book/:id" component={Book} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <div className="font-sans">
      <Router>
        <AuthProvider>
          <FetchProvider>
            {/* Navigation */}
            <Navigation />
            {/* Content */}
            <h1 className="text-center text-5xl py-4 mb-2 select-none">
              blurbz 📖
            </h1>
            {/* Routes */}
            <AppRoutes />
          </FetchProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;
