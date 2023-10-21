import React, { useEffect, useState } from 'react';

export default function Greeting () {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 4 && currentHour < 12) {
      setGreeting('Good Morning users!');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good Afternoon users!');
    } else if (currentHour >= 17 && currentHour < 20) {
      setGreeting('Good Evening users!');
    } else {
      setGreeting('Good Night users!');
    }
  }, []);

  return (
    <div>
      <p>{greeting}</p>
    </div>
  );
};


