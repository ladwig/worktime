import { Component } from 'react'
import moment from 'moment'

moment.locale('de')

class Index extends Component {
  state = {
    timePassed: 0,
    startTime: 0,
    endTime: 0,
    list: []
  }

  interval = null


  componentDidUpdate() {
    console.log(this.state.list)
  }

  increaseTimer = () => {
    this.setState({
      timePassed: this.state.timePassed + 1000
    })
  }

  pauseTimer = () => {
    clearInterval(this.interval)
  }

  startTimer = () => {
    this.interval = setInterval(this.increaseTimer, 1000)
    this.setState({
      startTime: new Date()
    })
  }

  continueTimer = () => {
    this.startTimer()
  }

  clearTimer = () => {
    this.pauseTimer()

    const x = new Date()

    this.setState({
      timePassed: 0,
      endTime: x
    })

      this.addToList(this.state.startTime, x)
  }

  getNumber = deg => {
    return ('0' + deg).slice(-2)
  }

  //

  addToList = (start, end) => {
    let listArray = this.state.list
    listArray.push({ startTime: start, endTime: end})
    this.setState({
      list: listArray
    })
  }


  render () {

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
        <button onClick={this.pauseTimer}>Pause</button>
        <button onClick={this.continueTimer}>Continue</button>
        <button onClick={this.clearTimer}>Stop</button>
        <button onClick={this.startTimer}>Start</button>
      </main>

        <table>
        <tr>
          <th>Start time</th>
          <th>End time</th>
          <th>Duration</th>
        </tr>
        {this.state.list.map(row => {
          let startTime = moment(row.startTime)
          let endTime = moment(row.endTime)
          let duration = endTime.diff(startTime)
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

        <style jsx global>{`
          body {
            width: 100%;
            height: 100%;
            background: #f5fsf5;
            font-family: Verdana, Geneva, sans-serif;
          }
        `}</style>

        <style jsx>{`
          main {
            margin: auto;
            margin-top: 25vh;
            width: 300px;
            height 300px;
            background: #0f1626;
            text-align: center;
          }

          .counter {
            font-size: 55px;
            color: #fff;
            padding-top: 30%;
          }

          tr {
            color: black;
          }
        `}</style>
      </div>
   )
  }
}

export default Index
