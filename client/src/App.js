import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing_page/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateVideogame from './components/Create_videogame/CreateVideogame'
import VideogameNotFound from './components/VideogameNotFound/VideogameNotFound.jsx';
function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/home/:id" component={Detail}/>
        <Route exact path ="/create" component={CreateVideogame} />
        <Route path = "*" component={VideogameNotFound}/>
        </Switch>

    </div>

  );
}

export default App;
