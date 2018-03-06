import { Component } from 'react'
import moment from 'moment'

moment.locale('de')

class Index extends Component {
  state = {
    timePassed: 0,
    startTime: 0,
    endTime: 0,
    list: [],
    buttonStart: 'inline-block',
    buttonPause: 'none',
    buttonCon: 'none',
    buttonStop: 'none',
    popup: 'none'
  }

  interval = null


  componentDidUpdate() {
    console.log(this.state.timePassed)
  }

  //Used for the start button
  startTimer = () => {
    this.interval = setInterval(this.increaseTimer, 1000)
    this.setState({
      startTime: new Date(),
    })
    this.buttonPressed('start')
  }

  //Used for the pause button
  pauseTimer = () => {
    clearInterval(this.interval)
    this.buttonPressed('pause')
  }

  //Used for the continue button
  continueTimer = () => {
    this.startTimer()
    this.buttonPressed('con')
  }

  //Used for the stop button (saves the duration to the list)
  clearTimer = () => {
    this.pauseTimer()

    const x = new Date()

    this.setState({
      timePassed: 0,
      endTime: x
    })

    this.addToList(this.state.startTime, x)

    this.buttonPressed('stop')
  }

  //Get the 0 in front of single numbers (0-9)
  getNumber = deg => {
    return ('0' + deg).slice(-2)
  }

  //Show/Hide buttons
  buttonPressed = status => {
    switch(status) {
      case 'start':
      case 'con':
        this.setState({
          buttonPause: 'inline-block',
          buttonStop: 'inline-block',
          buttonCon: 'none',
          buttonStart: 'none'
        })
        break;
      case 'pause':
        this.setState({
          buttonPause: 'none',
          buttonStop: 'inline-block',
          buttonCon: 'inline-block'
        })
        break;
      case 'stop':
        this.setState({
          buttonPause: 'none',
          buttonStop: 'none',
          buttonCon: 'none',
          buttonStart: 'inline-block'
        })
        break;
    }
  }

  //

  //Method to add the startTime and endTime to the list array (state)
  addToList = (start, end) => {
    let listArray = this.state.list
    listArray.push({ startTime: start, endTime: end})
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

    //the consts for the shown timer
    const time = new Date(this.state.timePassed)
    const seconds = this.getNumber(time.getSeconds())
    const hours = this.getNumber(time.getHours() - 1)
    const minutes = this.getNumber(time.getMinutes())

   return (

     <div>
      <main>
        <div className='counter'>
        {hours}:{minutes}:{seconds}
        </div>
        <start onClick={this.startTimer}>Start</start>
        <pause onClick={this.pauseTimer}>Pause</pause>
        <continue onClick={this.continueTimer}>Continue</continue>
        <stop onClick={this.clearTimer}>Stop</stop>
        <showPopup onClick={ x => {this.setState({ popup: 'block'})}}>Show List</showPopup>
      </main>

      <popup>
          <span className="close" onClick={ x => {this.setState({ popup: 'none'})}}>&times;</span>
          <table>
          <tr>
            <th>Start time</th>
            <th>End time</th>
            <th>Duration</th>
          </tr>
          {this.state.list.map(row => {
            let startTime = moment(row.startTime)
            let endTime = moment(row.endTime)
            let durationM = endTime.diff(startTime, 'm')
            let durationH = endTime.diff(startTime, 'h')

            return (
              <tr>
                <td>{startTime.format('lll')}</td>
                <td>{endTime.format('lll')}</td>
                <td>{durationH + 'h ' +  durationM + 'm'}</td>
              </tr>
            )
          })}
          </table>
      </popup>

        <style jsx global>{`
          body {
            width: 100%;
            height: 100%;
            background: #B3B3B3;
            z-index: -999;
            font-family: Verdana, Geneva, sans-serif;
          }
        `}</style>

        <style jsx>{`
          main {
            margin: auto;
            margin-top: 25vh;
            width: 300px;
            height 300px;
            background: #242325;
            text-align: center;
          }

          .counter {
            font-size: 55px;
            color: #C8C8C8;
            padding-top: 30%;
          }

          table {
            margin: auto;
            text-align: center;
            padding: 10px;
          }

          start {
            color: #fff;
            height: 60px;
            width: 100%;
            background: green;
            margin-top: 40px;
            display: ${this.state.buttonStart};
          }

          pause {
            color: #fff;
            height: 60px;
            width: 50%;
            background: orange;
            margin-top: 40px;
            display: ${this.state.buttonPause};
          }

          continue {
            color: #fff;
            height: 60px;
            width: 50%;
            background: lightgreen;
            margin-top: 40px;
            display: ${this.state.buttonCon};
          }

          stop {
            color: #fff;
            height: 60px;
            width: 50%;
            background: red;
            margin-top: 40px;
            display: ${this.state.buttonStop};
          }

          showPopup {
            color: #fff;
            height: 43px;
            width: 100%
            background: lightgray;
            display: inline-block;
          }

          popup {
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(250, 250, 250, 0.98);
            display: ${this.state.popup};
          }


          .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            margin-top -100px;
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
