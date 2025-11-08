import { useEffect, useState } from 'react';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/getSchools')
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  // Container styles
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  // Card styles
  const cardStyle = {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'white',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  };

  const imgStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  };

  const cardContentStyle = {
    padding: '16px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    margin: '10px 0 6px 0',
    color: '#111827',
  };

  const textStyle = {
    margin: '2px 0',
    color: '#4B5563',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      {schools.map((school) => (
        <div
          key={school.id}
          style={cardStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        >
          <img src={school.image} alt={school.name} style={imgStyle} />
          <div style={cardContentStyle}>
            <h2 style={titleStyle}>{school.name}</h2>
            <p style={textStyle}>{school.address}</p>
            <p style={textStyle}>{school.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
