import React from "react";
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { MovieDetail } from './components/MovieDetail';

export function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  )
}

export default App;
