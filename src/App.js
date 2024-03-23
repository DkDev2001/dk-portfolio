import { Logo } from './components/Logo';
import {Helmet} from "react-helmet";
import './App.css';
import { NavBar } from './components/NavBar';
import { Banner } from './components/Banner';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>DK's Portfolio</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Logo />
      </Helmet>
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
