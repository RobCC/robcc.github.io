import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FileMenu from 'Components/FileTabMenu/FileTabMenu';
import FileRoutes from 'Components/Routes/FileRoutes';

const HOME_PATH = '/home';

const files = [
  {
    name: 'greet.js',
    extension: 'JS',
    to: `${HOME_PATH}/greet`,
  },
  {
    name: 'contact.css',
    extension: '#',
    to: `${HOME_PATH}/contact`,
  },
];

// TODO: Remove div in FileRoutes, add div on Editor component

const Home = () => {
  const store = useSelector((state) => state);

  return (
    <Router>
      <FileMenu files={files} />
      <div>
        <FileRoutes />
      </div>
    </Router>
  );
};

export default Home;
