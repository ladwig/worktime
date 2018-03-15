import { Component } from 'react'
import moment from 'moment'
import List from '../components/list.js'


moment.locale('de')

class Index extends Component {
  state = {
    timePassed: 0,
    startTime: 0,
    endTime: 0,
    startPause: 0,
    endPause: 0,
    durationBrutto: 0, //time with breaks, durationNetto = time without breaks
    moneyValue: 10, //Earnings per hour
    durationPause: 0,
    list: [],
    buttonStart: 'block',
    buttonPause: 'none',
    buttonCon: 'none',
    buttonStop: 'none',
    popup: 'none',
    dev: ' ** '
  }

  interval = null

  componentDidUpdate() {
    console.log(this.state.list)
  }

  //Used for the start button
  startTimer = () => {
    this.interval = setInterval(this.increaseTimer, 1000)
    this.setState({
      startTime: new Date()
    })
    this.buttonPressed('start')
  }

  //Used for the pause button
  pauseTimer = () => {
    clearInterval(this.interval)
    this.setState({
      startPause: new Date()
    })
    this.buttonPressed('pause')
  }

  //Used for the continue button
  continueTimer = () => {
    this.interval = setInterval(this.increaseTimer, 1000)
    this.buttonPressed('con')
    const endPause = new Date()
    this.pauser(endPause)
  }

  //Used for the stop button (saves the duration to the list)
  clearTimer = () => {
    clearInterval(this.interval)
    const x = new Date()
    const y = x - this.state.startTime
    const k = moment(x).format('MMMM')

    this.setState({
      timePassed: 0,
      endTime: x,
      durationBrutto: y,
      durationPause: 0,
      monthId: k
    })

    this.addToList(this.state.startTime, x, y, k)
    this.buttonPressed('stop')
  }

  //Get the 0 in front of single numbers (0-9)
  getNumber = deg => {
    return ('0' + deg).slice(-2)
  }

  //Logs the pause
  pauser = (endPause) => {
    let duration = moment(endPause).diff(this.state.startPause, 'ms')
    this.setState({
      durationPause: (duration + this.state.durationPause)
    })
  }

  //Show/Hide buttons
  buttonPressed = status => {
    switch(status) {
      case 'start':
      case 'con':
        this.setState({
          buttonPause: 'block',
          buttonStop: 'block',
          buttonCon: 'none',
          buttonStart: 'none'
        })
        break;
      case 'pause':
        this.setState({
          buttonPause: 'none',
          buttonStop: 'block',
          buttonCon: 'block'
        })
        break;
      case 'stop':
        this.setState({
          buttonPause: 'none',
          buttonStop: 'none',
          buttonCon: 'none',
          buttonStart: 'block'
        })
        break;
    }
  }

  //Method to add the startTime and endTime to the list array (state)
  addToList = (start, end, durationBrutto, monthId) => {
    const durationNetto = durationBrutto - this.state.durationPause
    const dailyEarnings = (((this.state.moneyValue / 60) / 60) / 1000) * durationNetto

    let listArray = this.state.list

    listArray.push({
      startTime: start,
      endTime: end,
      durationBrutto,
      durationNetto,
      durationPause: this.state.durationPause,
      dailyEarnings,
      monthId
    })

    this.setState({
      list: listArray
    })
  }

  //Method for the shown timer
  increaseTimer = () => {
    this.setState({
      timePassed: this.state.timePassed + 1000
    })
  }

  render () {

    //the consts for the shown timer & some others
    const time = new Date(this.state.timePassed)
    const seconds = this.getNumber(time.getSeconds())
    const hours = this.getNumber(time.getHours() - 1)
    const minutes = this.getNumber(time.getMinutes())

   return (

     <div>
      <main>
        <div className="counter wrapper">
          <div className="counter time">{hours}:{minutes}:{seconds}</div>
        </div>
        <div className="row first">
          <div className="start" onClick={this.startTimer}>Start</div>
          <div className="pause" onClick={this.pauseTimer}>Pause</div>
          <div className="continue" onClick={this.continueTimer}>Continue</div>
          <div className="stop" onClick={this.clearTimer}>Stop</div>
        </div>
      </main>

        <div className="show-popup" onClick={ x => {this.setState({ popup: 'block'})}}>Show monthly worktime...</div>

      <List mainState={this.state} setState={this.setState.bind(this)}/>

        <style jsx global>{`
          body {
            width: 100%;
            height: 100%;
            background: rgb(240, 240, 240);
            z-index: -999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          }
        `}</style>

        <style jsx>{`
          main {
            margin: auto;
            margin-top: 25vh;
            width: 300px;
            background: #242325;
          }

          .counter.wrapper {
            height: 220px;
          }

          .counter.time {
            font-size: 55px;
            color: #C8C8C8;
            text-align: center;
            padding-top: 30%;
          }

          .row.first {
            display: flex;
          }

          .start {
            color: #fff;
            height: 70px;
            width: 100%;
            background: green;
            line-height: 70px;
            text-align: center;
            display: ${this.state.buttonStart};
          }

          .pause {
            color: #fff;
            height: 70px;
            width: 50%;
            background: orange;
            line-height: 70px;
            text-align: center;
            display: ${this.state.buttonPause};
          }

          .continue {
            color: #fff;
            height: 70px;
            width: 50%;
            background: lightgreen;
            line-height: 70px;
            text-align: center;
            display: ${this.state.buttonCon};
          }

          .stop {
            color: #fff;
            height: 70px;
            width: 50%;
            background: red;
            line-height: 70px;
            text-align: center;
            display: ${this.state.buttonStop};
          }

          .show-popup {
            color: gray;
            height: 20px;
            width: 100%
            display: block;
            margin-top: 60px;
            text-align: center;
          }

          List {
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(250, 250, 250, 0.98);
            display: ${this.state.popup};
          }

          table {
            margin: auto;
            padding-top: 100px;
          }

          tr {
            padding: 0px;
            height: 20px;
            text-align: center;
            line-height: 1.5;
          }

          td, th {
            border-bottom: 1px solid #ddd;
            padding: 12px;
          }

          .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            margin-right: 10px;
          }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }

        `}</style>
      </div>
   )
  }
}

export default Index
