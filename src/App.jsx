import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Profile from './components/Profile';
import ExperienceExpertise from './components/ExperienceExpertise';
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
        <ExperienceExpertise />
        <Education />
        <Downloads />
        <Contact />
      </main>
    </>
  );
}
