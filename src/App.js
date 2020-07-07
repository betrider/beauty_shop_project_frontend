import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import TopMenuComponent from './division/TopMenuComponent';
import BodyMenuComponent from './division/BodyMenuComponent';
import FooterComponent from './division/FooterComponent';

function App() {
  return (
    <div className="App">
      <div>
        <TopMenuComponent/>
        <BodyMenuComponent/>
        <FooterComponent/>
      </div>
    </div>
  );
}

export default App;
