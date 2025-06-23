import React, { useState, useEffect, useRef } from "react";
import skillsData from "../data/skills.json";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Languages");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef({});

  useEffect(() => {
    const tab = tabRefs.current[activeTab];
    if (tab) {
      setIndicatorStyle({
        width: `${tab.offsetWidth - 25}px`,
        left: `${tab.offsetLeft}px`,
      });
    }
  }, [activeTab]);

  const renderProgressBar = (level) => {
    const percent = (level / 5) * 100; // Assuming level is from 1–5
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percent}%` }} />
      </div>
    );
  };

  return (
    <section className="skills" id="skills">
      <h2>🛠️ My Toolkit</h2>
      <div className="tabs">
        {Object.keys(skillsData).map((tab) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[tab] = el)}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="active-tab-indicator" style={indicatorStyle}>
          {activeTab}
        </div>
      </div>
      <div className="grid">
        {skillsData[activeTab].map(({ name, icon, link, level }) => (
          <a
            key={name}
            href={link}
            className="card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon">{icon}</span>
            <span className="label">{name}</span>
            {renderProgressBar(level)}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Skills;

