import React, { useState, useEffect } from 'react'

const Timer = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000);
    return () => clearInterval(interval)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds have elapsed
      </header>
    </div>
  );
};

export default Timer