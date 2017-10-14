import React from 'react';


import Header from '../layout/Header';
import Footer from '../layout/Footer';

class Error404 extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <Header />
          <main id="main">
            <div className="inner">
              Error404
            </div>
          </main>
        <Footer />
      </div>
    );
  }
};

export default Error404;
