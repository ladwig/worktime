import React from 'react'

class Index extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
     fDate: 0,
     sDate: 0,
     Dates: [],
   }
 }

  timerStart = () => {
    this.state.fDate  = new Date()
    console.log(this.state.fDate)
  }

  timerStop = () => {
    this.state.sDate  = new Date()
    console.log(this.state.sDate)
  }

  render () {
   return (
     <div>
      <button value='START' onClick={this.timerStart}>START</button>
      <button value="STOP" onClick={this.timerStop}>STOP</button>
      <ul></ul>
      <style jsx>{`
        button {
        }
      `}</style>
     </div>
   )
  }
}

export default Index
