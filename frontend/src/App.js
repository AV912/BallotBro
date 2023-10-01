import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import './App.css';
import SideBar from './components/SideBar';
import GroupMain from './components/GroupMain';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';

const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/",
    main: () => <GroupMain />
  },
  {
    path: "/group/:group_id",
    main: () => <>Group id</>
  }
];

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route index path='/home' element={
            <div id='App'>
              <Home />
            </div>
          } />
          <Route path='/' element={
            <div id='App'>
              <SideBar />
              <GroupMain />
            </div>
          } />
          <Route path='/group/:group_id' element={
            <div id='App'>
              <SideBar />
              <GroupMain />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
