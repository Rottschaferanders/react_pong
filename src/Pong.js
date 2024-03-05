import React from "react";
import {useState, useEffect} from 'react';
import "./App.css";

const BALL_SPEED = 10; // ms/px

const GS_IN_GAME = 2;
const GS_WAITING_TO_START = 1;
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 400;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const BALL_WIDTH = 20;
const BALL_START_POSITION = [(BOARD_WIDTH / 2) - BALL_WIDTH, (BOARD_HEIGHT / 2) - BALL_WIDTH];


function Pong() {
    const [gameState, setGameState] = useState(GS_WAITING_TO_START);
    const [defendingPlayer, setDefendingPlayer] = useState(1);
    const [paddle1Y, setPaddle1Y] = useState(200);
    const [paddle2Y, setPaddle2Y] = useState(200);
    const [ballx, setBallx] = useState(BALL_START_POSITION[0]);
    const [bally, setBally] = useState(BALL_START_POSITION[1]);
  
    const onKeyPress = (event) => {
        let newPaddle1Y = paddle1Y;
        let newPaddle2Y = paddle2Y;
        if (event.keyCode === 87) {
            newPaddle1Y = Math.max(0, paddle1Y - 30);
        } else if (event.keyCode === 83) {
            newPaddle1Y = Math.min(370, paddle1Y + 30);
        } else if (event.keyCode === 38) {
            newPaddle2Y = Math.max(0, paddle2Y - 30);
        } else if (event.keyCode === 40) {
            newPaddle2Y = Math.min(370, paddle2Y + 30);
        }
        setPaddle1Y(newPaddle1Y);
        setPaddle2Y(newPaddle2Y);
    };
  
    useEffect(() => {
      document.addEventListener("keydown", onKeyPress, false);
      return () => {
            document.removeEventListener("keydown", onKeyPress, false);
      };
    }, [paddle1Y, paddle2Y]);
  
    useEffect(() => {
      let intervalId;
      if (gameState === GS_IN_GAME) {
        intervalId = setInterval(() => {
            // console.log("Ball Position: ", ballx);
            if (defendingPlayer === 1) {
                if (ballx === (BOARD_WIDTH - PADDLE_WIDTH - BALL_WIDTH)) {
                    if ((bally < (paddle1Y - (PADDLE_HEIGHT / 2))) || (bally > (paddle1Y + (PADDLE_HEIGHT / 2)))) {
                        setBallx((_) => BALL_START_POSITION[0])
                        setBally((_) => BALL_START_POSITION[1]);
                        console.log("PLAYER 1 WINS!!!!!!!!");
                        setGameState((_) => GS_WAITING_TO_START);
                    } else {
                        setDefendingPlayer((_) => 0);
                    }
                } else {
                    setBallx((prevBallx) => prevBallx + 1);
                }
            } else {
                if (ballx === PADDLE_WIDTH) {
                    if ((bally < (paddle1Y - (PADDLE_HEIGHT / 2))) || (bally > (paddle1Y + (PADDLE_HEIGHT / 2)))) {
                        console.log("PLAYER 2 WINS!!!!!!!!");
                        setBallx((_) => BALL_START_POSITION[0])
                        setBally((_) => BALL_START_POSITION[1]);
                        setGameState((_) => GS_WAITING_TO_START);
                    } else {
                        setDefendingPlayer((_) => 1);
                    }
                } else {
                    setBallx((prevBallx) => prevBallx - 1);
                }
            }
        }, BALL_SPEED);
      }
      return () => clearInterval(intervalId);
    }, [gameState, defendingPlayer, ballx]);
  
    const stylePaddle1 = {
      left: 0,
      top: paddle1Y,
    };
  
    const stylePaddle2 = {
      right: 0,
      top: paddle2Y,
    };
  
    return (
        <div className="App">
            <div className="pong-field" width={`${BOARD_WIDTH}px`} height={`${BOARD_HEIGHT}px`}>
                <div className="pong-paddle" style={stylePaddle1}></div>
                <div className="pong-paddle" style={stylePaddle2}></div>
                <div
                    className="pong-ball"
                    style={{
                        // top: "240px",
                        top: `${bally}px`,
                        left: `${ballx}px`,
                    }}
                ></div>
            </div>
            <button
                hidden={gameState !== GS_WAITING_TO_START}
                onClick={() => setGameState(GS_IN_GAME)}
            >
            Start Game
            </button>
        </div>
    );
}
  
  export default Pong;

// class Pong extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         game_state: 1,
//         defending_player: 1,
//         paddle1Y: 200,
//         paddle2Y: 200,
//         ballx: 330,
//         bally: 240,
//     }
//     this.onKeyPress = this.onKeyPress.bind(this);
//   }

//   onKeyPress(event) {
//     let newPaddle1Y = this.state.paddle1Y;
//     let newPaddle2Y = this.state.paddle2Y;
//     // 'w' key
//     if (event.keyCode === 87) {
//       newPaddle1Y -= 30;
//       if (newPaddle1Y < 0) {
//         newPaddle1Y = 0;
//       }
//     }
//     // 's' key
//     else if (event.keyCode === 83) {
//       newPaddle1Y += 30;
//       if (newPaddle1Y > 370) {
//         newPaddle1Y = 370;
//       }
//     }
//     // up arrow
//     else if (event.keyCode === 38) {
//       newPaddle2Y -= 30;
//       if (newPaddle2Y < 0) {
//         newPaddle2Y = 0;
//       }
//     }
//     // down arrow
//     else if (event.keyCode === 40) {
//       newPaddle2Y += 30;
//       if (newPaddle2Y > 370) {
//         newPaddle2Y = 370;
//       }
//     }
//     this.setState({ paddle1Y: newPaddle1Y, paddle2Y: newPaddle2Y });
//   }

//   componentDidMount() {
//     document.addEventListener("keydown", this.onKeyPress, false);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.onKeyPress, false);
//   }


//   render() {
//     const stylePaddle1 = {
//         left: 0,
//         top: this.state.paddle1Y
//     };

//     const stylePaddle2 = {
//       right: 0,
//       top: this.state.paddle2Y
//     };
//     let iteration_num = 0;
//     while (this.state.game_state === GS_IN_GAME) {
//         iteration_num += 1;
//         setTimeout(function() {
//             if (this.state.defending_player === 1) {
//                 // this.state.ballx += 1;
//                 this.setState(prevState => ({ ballx: prevState.ballx + 1 }));
//             } else {
//                 // this.state.ballx -= 1;
//                 this.setState(prevState => ({ ballx: prevState.ballx - 1 }));
//             }
//         }, BALL_SPEED * iteration_num); 
//     }

//     return (
//       <div className="App">
//         <div className="pong-field">
//             <div className="pong-paddle" style={stylePaddle1}></div>
//             <div className="pong-paddle" style={stylePaddle2}></div>
//             <div className="pong-ball" 
//                 style={{
//                     top: "240px",
//                     left: `${this.state.ballx}px`,
//                 }}
//             ></div>
//         </div>
//         {/* <button hidden={this.state.game_state === GS_WAITING_TO_START} onClick={this.state.game_state = GS_IN_GAME} >Start Game</button> */}
//         <button hidden={this.state.game_state != GS_WAITING_TO_START} onClick={() => this.setState({ game_state: GS_IN_GAME })}>Start Game</button>
//       </div>
//     );
//   }
// }

// export default Pong;