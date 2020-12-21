import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/headercomponent';
import Main from './components/maincomponent';
import Footer from './components/footercomponent';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Main />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
