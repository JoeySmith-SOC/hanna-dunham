import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Competencies from './components/Competencies';
import Education from './components/Education';
import Downloads from './components/Downloads';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Profile />
        <Experience />
        <Competencies />
        <Education />
        <Downloads />
        <Contact />
      </main>
    </>
  );
}
