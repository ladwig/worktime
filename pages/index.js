import React from 'react'

class Index extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     fDate: 0,
     sDate: 0,
     pDate: 0,
     pTimer: 0,
     timer: 0,
     Dates: []
   }
 }

   timer = (arg) =>  {

     //Start timer
    if (arg == 0) {
      this.setState({
        fDate: new Date(),
        interval: setInterval(() => this.tick(0), 1000)
      })
    }

    //Stop timer
    else if (arg == 1) {
      this.setState({
        interval: clearInterval(this.state.interval),
        timer: 0,
        sDate: new Date()
      })
    }

    //Pause timer
    else if (arg == 2) {
      this.setState({
      pTimer: this.state.timer,
      interval: clearInterval(this.state.interval)
      })
    }

    //Continue timer
    else if (arg == 3) {
      this.setState({
        pDate: new Date(),
        interval: setInterval(() => this.tick(1), 1000)
      })
    }
  }

  tick = (pause) =>  {
    if(pause == 0) {
      this.setState({
        timer: Math.floor((new Date() - this.state.fDate)/1000)
      })
    }

    else if (pause == 1) {
      this.setState({
        timer: this.state.pTimer + Math.floor((new Date() - this.state.pDate)/1000)
      })
    }
  }

  render () {
   return (
     <body>
      <main>
        <div className='counter'>
        {this.state.timer}
        </div>
        <button value='START' onClick={() => this.timer(0)}>START</button>
        <button value='STOP' onClick={() => this.timer(1)}>STOP</button>
        <button value='PAUSE' onClick={() => this.timer(2)}>PAUSE</button>
        <button value='GOON' onClick={() => this.timer(3)}>GOON</button>
      </main>
      <style jsx>{`
        body {
          width: 100%;
          height: 100%;
          background: #f5fsf5;
          font-family: Verdana, Geneva, sans-serif;
        }

        main {
          margin: auto;
          margin-top: 25vh;
          width: 300px;
          height 300px;
          background: #0f1626;
        }

        .counter {
          font-size: 40px;
          color: #fff;
        }
      `}</style>
     </body>
   )
  }
}

export default Index
