import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css'; 

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [aboutRes, teamRes] = await Promise.all([
          axios.get('/api/about-section/'),
          axios.get('/api/team-members/')
        ]);

        setAboutData(aboutRes.data[0]);
        setTeam(teamRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados da página About:", error);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="about-container">
      {aboutData && (
        <>
          <section className="about-box">
            <h2>História da Moove Lab</h2>
            <p>{aboutData.history}</p>
          </section>

          <section className="about-box">
            <h2>Equipe e Especialistas</h2>
            <div className="team-grid">
              {team.map(member => (
                <div className="team-card" key={member.id}>
                  <img src={member.image} alt={member.name} />
                  <h4>{member.name}</h4>
                  <p>{member.position} - {member.specialty}</p>
                  {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                </div>
              ))}
            </div>
          </section>

          <section className="about-box">
            <h2>Nossos Diferenciais</h2>
            <p>{aboutData.diferentials}</p>
          </section>

          <section className="about-box">
            <h2>Parceiros e Clientes</h2>
            <p>{aboutData.partners}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default About;
