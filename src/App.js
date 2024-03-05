// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Pong from './Pong';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Our Pong Game</h1>
      <Pong />
    </div>
  );
}

function OurAnimation() {
  // let animation_running = false;
  // let x_position = 50;
  const [x_position, setPosition] = useState(50);
  let duration = 20; // seconds
  let distance = 1000; // px
  let time_bw_iters = (duration / distance) * 1000;
  function onButtonClick() {
    console.log("Button Clicked");
    // animation_running = true;
    // let iterations = 
    for (let i = 0; i <= distance; i++) {
      // x_position += 1;
      // TODO: We need to sleep for time_bw_iters
      setTimeout(function() {
        // x_position += 1;
        setPosition(prevPos => prevPos + 1);
        // update your position
      }, time_bw_iters * i);
    }
  }

  return (
    <div width="100vw">
      <button onClick={onButtonClick}>Start Animation</button>
      <div width="100%" height="40px"></div>
      <div className="square" 
        // backgroundColor="green" width="30px" height="30px" position="relative" top="50px" left={x_position} 
        style={{
          backgroundColor: "green",
          width: "30px",
          height: "30px",
          position: "relative",
          top: "50px",
          left: `${x_position}px`,
        }}
      ></div>
    </div>
  )
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p className="App-logo">
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//       {/* <OurAnimation /> */}
//       <Pong />
//     </div>
//   );
// }
