

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import Seeds from "./pages/Seeds";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import IndividualPlant from "./pages/IndividualPlant";
import { StoreProvider } from "./utils/GlobalState";





import "./app.css"


function App() {

  return (


  <Router>
      <div>
      <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/plants" component={Plants} />
            <Route exact path="/seeds" component={Seeds} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/plants/:id" component={IndividualPlant} />
          </Switch>
          </StoreProvider>
          
          <Footer />
         </div>
    </Router>
  );
}

export default App;
