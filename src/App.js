import React from 'react';
//import logo from './logo.svg';
import './App.css';
import myMP3 from './yisell_sound_2008030716560441118_88011.mp3';
//import { thisExpression } from '@babel/types';

const DEFAULT_BREAK = 5;
const DEFAULT_SESSION = 25;
const DEFAULT_TIMER = {label: "session", length: 25};

const BREAK_LAYOUT = "col-xs-6 col-md-6";
const SESSION_LAYOUT = "col-xs-6 col-md-6";
const TIMER_LAYOUT = "col-xs-12 col-md-12";
const APP_LAYOUT = "row col-xs-12 col-md-12";
const APP_CONTAINER_LAYOUT = "row col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3";
const H1_CONTAINER_LAYOUT = "col-xs-12 col-md-12";
const AUDIO_LAYOUT = "col-xs-12 col-md-12";
const BTN_STYLE = "btn btn-default";

class BreakSet extends React.Component {
  render() {
    return (
      <div id="break-container" className={BREAK_LAYOUT}>
        <h2 id="break-label">Break Length</h2>
        <p id="break-length">{this.props.breakLength}</p>
        <button id="break-decrement" className={BTN_STYLE} type="button" onClick={this.props.decrease}>-</button>
        <button id="break-increment" className={BTN_STYLE} type="button" onClick={this.props.increase}>+</button>
      </div>
    );
  }
}

class SessionSet extends React.Component {
  render() {
    return (
      <div id="session-container" className={SESSION_LAYOUT}>
        <h2 id="session-label">Session Length</h2>
        <p id="session-length">{this.props.sessionLength}</p>
        <button id="session-decrement" className={BTN_STYLE} type="button" onClick={this.props.decrease}>-</button>
        <button id="session-increment" className={BTN_STYLE} type="button" onClick={this.props.increase}>+</button>
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div id="timer-container" className={TIMER_LAYOUT}>
        <h2 id="timer-label">{this.props.timerLabel}</h2>
        <p id="time-left">{this.props.timerLeft}</p>
        <button id="start_stop" className={BTN_STYLE} type="button" onClick={this.props.startStop}>play/stop</button>
        <button id="reset" className={BTN_STYLE} type="button" onClick={this.props.reset}>reset</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerLabel: DEFAULT_TIMER.label,
      timerLeft: DEFAULT_SESSION.toString().concat(":00"),
      breakPart: DEFAULT_BREAK,
      sessionPart: DEFAULT_SESSION,
      breakCount: (DEFAULT_BREAK * 60),
      sessionCount: (DEFAULT_SESSION * 60),
      playOrStop: false
    };
    this.breakDecrease = this.breakDecrease.bind(this);
    this.breakIncrease = this.breakIncrease.bind(this);
    this.sessionDecrease = this.sessionDecrease.bind(this);
    this.sessionIncrease = this.sessionIncrease.bind(this);
    this.startStop = this.startStop.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.playBeep = this.playBeep.bind(this);
    this.alarmReady = this.alarmReady.bind(this);
  }


  breakDecrease() {
    if (this.state.playOrStop === false) {
      if (this.state.breakPart > 1){
        this.setState({
          breakPart: this.state.breakPart - 1,
          breakCount: this.state.breakCount - 60
        });
        if (this.state.timerLabel === "break"){
          let showText = (this.state.breakPart  - 1 < 10) ? "0" + (this.state.breakPart - 1).toString() : (this.state.breakPart - 1).toString();
          this.setState({
            timerLeft: showText.concat(":00")
          });
        }
      }
    }
  }

  breakIncrease() {
    if (this.state.playOrStop === false) {
      if (this.state.breakPart < 60) {
        this.setState({
          breakPart: this.state.breakPart + 1,
          breakCount: this.state.breakCount + 60
        });
        if (this.state.timerLabel === "break"){
          let showText = (this.state.breakPart + 1 < 10) ? "0" + (this.state.breakPart + 1).toString() : (this.state.breakPart + 1).toString();
          this.setState({
            timerLeft: showText.concat(":00")
          });
        }
      }
    }
  }

  sessionDecrease() {
    if (this.state.playOrStop === false) {
      if (this.state.sessionPart > 1) {
        this.setState({
          sessionPart: this.state.sessionPart - 1,
          sessionCount: this.state.sessionCount - 60
        });
        if (this.state.timerLabel === "session"){
          let showText = (this.state.sessionPart - 1 < 10) ? "0" + (this.state.sessionPart - 1).toString() : (this.state.sessionPart - 1).toString();
          this.setState({
            timerLeft: showText.concat(":00")
          });
        }
      }
    }
  }

  sessionIncrease() {
    if (this.state.playOrStop === false) {
      if (this.state.sessionPart < 60) {
        this.setState({
          sessionPart: this.state.sessionPart + 1,
          sessionCount: this.state.sessionCount + 60
        });
        if (this.state.timerLabel === "session"){
          let showText = (this.state.sessionPart + 1 < 10) ? "0" + (this.state.sessionPart + 1).toString() : (this.state.sessionPart + 1).toString();
          this.setState({
            timerLeft: showText.concat(":00")
          });
        }
      }
    }
  }

  reset() {
    clearInterval(this.timerID);
    this.setState({
      timerLabel: DEFAULT_TIMER.label,
      timerLeft: DEFAULT_SESSION.toString().concat(":00"),
      breakPart: DEFAULT_BREAK,
      sessionPart: DEFAULT_SESSION,
      breakCount: (DEFAULT_BREAK * 60),
      sessionCount: (DEFAULT_SESSION * 60),
      playOrStop: false
    });
    let myBeep = document.getElementById("beep");
    myBeep.pause();
    myBeep.currentTime = 0;
  }


  startStop() {
/*     let sessionTime = this.state.sessionPart * 60;
    let breakTime = this.state.breakPart * 60;
    let total = sessionTime + breakTime; */
    
    if (this.state.playOrStop === false){
      this.setState({
        playOrStop: true
      });
      
      console.log(this.state.playOrStop);
      this.timerID = setInterval(
        () => this.startTimer(),
        1000
      );

    }else {
      this.setState({
        playOrStop: false
      });
      console.log(this.state.playOrStop);
      clearInterval(this.timerID);
    }
    
  }

  startTimer() {
    //console.log("1");
    let displayText;
    let minText;
    let secText;
    if (this.state.sessionCount > 0){

      this.setState({
        sessionCount: this.state.sessionCount - 1
      });

      let sessionMin = Math.floor(this.state.sessionCount / 60);
      let sessionSec = this.state.sessionCount % 60;
      minText = (sessionMin < 10) ? "0" + sessionMin : sessionMin;
      secText = (sessionSec < 10) ? "0" + sessionSec : sessionSec;

      displayText = minText + ":" + secText;
            
      this.setState({
        timerLeft: displayText,
        timerLabel: "session"
      });

      this.alarmReady();
      this.playBeep();

    }else {
      if (this.state.breakCount >= 0){
  
        let breakMin = Math.floor(this.state.breakCount / 60);
        let breakSec = this.state.breakCount % 60;
        minText = (breakMin < 10) ? "0" + breakMin : breakMin;
        secText = (breakSec < 10) ? "0" + breakSec : breakSec;
  
        displayText = minText + ":" + secText;
              
        this.setState({
          timerLeft: displayText,
          timerLabel: "break"
        })

        this.alarmReady();
        this.playBeep();

        this.setState({
          breakCount: this.state.breakCount - 1
        });

      }else {
        let showText = (this.state.sessionPart < 10) ? "0" + (this.state.sessionPart).toString() : (this.state.sessionPart).toString();
        this.setState({
          sessionCount: this.state.sessionPart * 60,
          breakCount: this.state.breakPart * 60,
          timerLabel: "session",
          timerLeft: showText.concat(":00")
        });
        this.alarmReady();
      }
    }
  }

  playBeep() {
    if (this.state.timerLeft === "00:00"){
      let myBeep = document.getElementById("beep");
      myBeep.currentTime = 0;
      myBeep.play();
    }
  }

  alarmReady() {
    let timerDisplay = document.getElementById("time-left");
    if (this.state.timerLeft.slice(0, 2) === "00"){
      timerDisplay.classList.add("red-text");
    }else {
      timerDisplay.classList.remove("red-text");
    }
  }

  render() {
    return (
      <div id="app-container" className={"App " + APP_CONTAINER_LAYOUT}>
        <h1 className={H1_CONTAINER_LAYOUT}>Pomodoro Clock</h1>
        <audio className={AUDIO_LAYOUT} id="beep" src={myMP3}></audio>
        <div id="panel" className={APP_LAYOUT}>
          <BreakSet breakLength={this.state.breakPart} decrease={this.breakDecrease} increase={this.breakIncrease}/>
          <SessionSet sessionLength={this.state.sessionPart} decrease={this.sessionDecrease} increase={this.sessionIncrease}/>
          <Timer timerLabel={this.state.timerLabel} timerLeft={this.state.timerLeft} startStop={this.startStop} reset={this.reset}/>
        </div>
      </div>
    );
  }
}

export default App;
