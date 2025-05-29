import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then(setProjects);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, // Lower threshold for earlier detection
        rootMargin: '-10% 0px -70% 0px' // Adjust margins to better detect current section
      }
    );

    // Observe all sections
    const sections = ['experience', 'skills', 'projects'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll handler for smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'skills', 'projects'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
          <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
          <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
        </div>
      </nav>

      <main className="container">
        <div className="main-card">
          <div className="intro-section">
            <h1 className="name">Dominique Desert</h1>
            <p className="intro-text">
              I'm a <span className="highlight">full stack engineer</span> with expertise in <span className="underline">machine learning</span> and <span className="underline">data science</span>, creating impactful solutions that drive real-world results.
            </p>
            <div className="links">
              <a href="mailto:dominiquedesertb@gmail.com" className="link">email</a>
              <span className="link-separator">•</span>
              <a target="_blank" rel="noopener noreferrer" href="https://tinyurl.com/dom-linkedin" className="link">linkedin</a>
              <span className="link-separator">•</span>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/dominiquedes" className="link">github</a>
              <span className="link-separator">•</span>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/dominique.desert/" className="link">soccer journey</a>
              <span className="link-separator">•</span>
              <a href="/DominiqueDesert_CS.docx" download className="link">resume</a>
            </div>
          </div>
          <div className="profile-section">
            <img src={process.env.PUBLIC_URL + '/profile.png'} alt="Profile" className="profile-img" />
          </div>
        </div>

        <div className="about-section">
          <h2>About Me</h2>
          <p>
            I am a full-stack developer passionate about building innovative solutions in machine learning and data science. Former captain of Haiti's U17 women's national team (2025 Concacaf) and part of the U20 squad, I bring strong leadership and analytical skills to every project. I specialize in developing data-driven applications and automation tools that solve real business challenges.
          </p>
        </div>

        <div id="experience" className="experience-section">
          <h2>Professional Experience</h2>
          <div className="experience-item">
            <h3>Software Engineer - Independent Developer</h3>
            <p className="date">2023 - Present</p>
            <ul>
              <li>Developed and published Firebase-Populator on PyPI, a Python package with 1000+ downloads that automates database population</li>
              <li>Created and successfully sold CoreIdea, a note-taking application, generating over $1.5k in revenue</li>
              <li>Built and maintained DataViz platform, serving 200+ weekly active users for data visualization needs</li>
              <li>Implemented PeerMatch, a social networking platform for students featuring real-time chat functionality</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Machine Learning Engineer - Independent Research</h3>
            <p className="date">2024 - Present</p>
            <ul>
              <li>Developed machine learning models achieving 89% accuracy in Airbnb price prediction</li>
              <li>Designed and implemented neural networks for complex pattern recognition in large datasets</li>
              <li>Created efficient data processing pipelines handling thousands of records</li>
              <li>Conducted thorough analysis of market trends and pricing factors in the hospitality industry</li>
            </ul>
          </div>
        </div>

        <div id="skills" className="skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <ul>
                <li>Python (Advanced)</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>SQL</li>
                <li>HTML/CSS</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Frameworks & Libraries</h3>
              <ul>
                <li>React.js</li>
                <li>Flask</li>
                <li>TensorFlow</li>
                <li>PyTorch</li>
                <li>Scikit-learn</li>
                <li>Pandas</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools & Platforms</h3>
              <ul>
                <li>Firebase</li>
                <li>MongoDB</li>
                <li>SupaBase</li>
                <li>Git</li>
                <li>Docker</li>
                <li>AWS</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Areas of Expertise</h3>
              <ul>
                <li>Machine Learning</li>
                <li>Data Science</li>
                <li>Full Stack Development</li>
                <li>API Development</li>
                <li>Database Design</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="projects" className="projects-section">
          <h2>Featured Projects</h2>
          <div className="projects-list">
            {projects.map((project, idx) => (
              <div className="project-card" key={idx}>
                <h3>{project.name}</h3>
                <ul className="project-bullets">
                  {project.desc.split('\n').map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <div className="project-meta">
                  <span className="languages">{project.languages.join(', ')}</span>
                  <span className={`sold ${project.sold ? 'sold-true' : 'sold-false'}`}>
                    {project.sold ? 'Sold' : 'Available'}
                  </span>
                </div>
                {project.links && project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link, linkIdx) => (
                      <a 
                        key={linkIdx}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
