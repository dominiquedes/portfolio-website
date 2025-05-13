import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  return (
    <div className="container">
      <div className="main-card">
        <div className="intro-section">
          <h1 className="name">Dominique Desert</h1>
          <p className="intro-text">
            I'm a <span target='_blank' className="highlight">full stack engineer</span> who builds helpful and user-friendly <span className="underline">applications</span> and play with <span className="underline">data</span>.
          </p>
          <div className="links">
            <a target='_blank' href="https://www.instagram.com/dominique.desert/" className="link">check out my instagram and watch some of my soccer skills</a>, find me on <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dominique-desert-30307a356/" className="link">LinkedIn</a>, or just <a href="mailto:dominiqudesertb@gmail.com" className="link">send me an email</a> to learn more .
          </div>
        </div>
        <div className="profile-section">
          <img src={process.env.PUBLIC_URL + '/profile.png'} alt="Profile" className="profile-img" />
        </div>
      </div>
      {/* About Me section */}
      <div className="about-section">
        <h2>About Me</h2>
        <p>
        I am full-stack developer with a passion for machine learning and data science, building thoughtful tools to help people in all stages of life and all career levels. I am the former captain of Haiti’s U17 women's national team (2025 Concacaf) and part of the U20 squad, I bring hard working and motivating energy to every project that I work on.</p>
      </div>
      <div className="projects-section">
        <h2>Projects</h2>
        <div className="projects-list">
          {projects.map((project, idx) => (
            <div className="project-card" key={idx}>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
              <div className="project-meta">
                <span className="languages">{project.languages.join(', ')}</span>
                <span className={`sold ${project.sold ? 'sold-true' : 'sold-false'}`}>{project.sold ? 'Sold' : 'Available'}</span>
              </div>
              {project.website && project.name !== 'CoreIdea (Sold for over $1.5k)' && (
                <a href={project.website} target="_blank" rel="noopener noreferrer" className="project-link">Visit Website</a>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Skills section */}
      <h2>Programming Skills</h2>
      <div className="skills-section">
        <ul>
          <li><strong>Data Science:</strong> Python</li>
          <li><strong>Software Engineering:</strong> ReactJS, Firebase, Bulma, SupaBase, MongoDB, Flask</li>
          <li><strong>Machine Learning:</strong> Python</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
