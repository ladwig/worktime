import { Component } from 'react'
import moment from 'moment'

moment.locale('de')

class List extends Component {
  constructor(props) {
    super(props)
  }

  //Get the 0 in front of single numbers (0-9)
  getNumber = deg => {
    return ('0' + deg).slice(-2)
  }

  render () {

    const state = this.props.mainState
    const setState = this.props.setState
    const monthlyBrutto = new Date(state.monthlyBrutto)
    const monthlyNetto = new Date(state.monthlyNetto)
    const monthlyMoney = state.monthlyMoney

    return (
      <div className="popup">
        <span className="close" onClick={ x => {setState({ popup: 'none'})}}>&times;</span>
        <span className="older">OLDER</span>
        <span className="newer">NEWER</span>
          <table>
            <thead>
              <tr>
                <th>Start time</th>
                <th>End time</th>
                <th>Duration (incl. breaks)</th>
                <th>Break duration</th>
              </tr>
            </thead>
            {state.list.map(row => {
              const startTime = moment(row.startTime)
              const endTime = moment(row.endTime)
              const durationBrutto = new Date(row.durationBrutto)
              const durationPause = new Date(row.durationPause)

            return (
            <tbody>
              <tr>
                <td>{startTime.format('DD.MM.  hh:mm')}</td>
                <td>{endTime.format('DD.MM. hh:mm')}</td>
                <td>{this.getNumber(durationBrutto.getHours() - 1) + ':' + this.getNumber(durationBrutto.getMinutes()) + state.dev + this.getNumber(durationBrutto.getSeconds()) + state.dev}</td>
                <td>{this.getNumber(durationPause.getHours() - 1) + ':' + this.getNumber(durationPause.getMinutes()) + state.dev + this.getNumber(durationPause.getSeconds()) + state.dev}</td>
              </tr>
            </tbody>
            )
            })}
          </table>

          <div className="monthly">
            <div className="monthly brutto">{'Monthly working time (b): ' + this.getNumber(monthlyBrutto.getHours() - 1) + ':' + this.getNumber(monthlyBrutto.getMinutes()) + state.dev + this.getNumber(monthlyBrutto.getSeconds()) + state.dev}</div>
            <div className="monthly netto">{'Monthly working time (n): ' + this.getNumber(monthlyNetto.getHours() - 1) + ':' + this.getNumber(monthlyNetto.getMinutes()) + state.dev + this.getNumber(monthlyNetto.getSeconds()) + state.dev}</div>
            <div className="monthly money">{'Monthly earnings: ' + (Math.round(monthlyMoney*10)/10) + ' €'}</div>
          </div>


      <style jsx>{`
        .popup {
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(250, 250, 250, 0.98);
          display: ${state.popup};
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

export default List
