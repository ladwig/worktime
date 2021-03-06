import { Component, Fragment } from 'react'
import moment from 'moment'

moment.locale('de')

class List extends Component {
  constructor(props) {
    super(props)
  }

  //Get the 0 in front of single numbers (0-9)
  getZero = deg => {
    return ('0' + deg).slice(-2)
  }

  render () {

    const state = this.props.mainState
    const setState = this.props.setState
    const monthlyNetto = new Date (monthlyNetto)

    const months = [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'Novemember',
      'Dezember'
    ]

    //Maps trough the months to get the right one
    const list = months.map(month => {
      const events = state.list.filter(event => {
        return event.monthId === month
      })

      //Import the objects from the "counter list" in the new array
      if (events.length > 0) {
        return {
          events,
          name: month,
          earnings: events.map(event => event.dailyEarnings).reduce((a, b) => a + b, 0),
          monthlyNetto: new Date(events.map(event => event.durationNetto).reduce((a, b) => a + b, 0))
        }
      }

      return null
    }).filter(Boolean)

    return (
      <div className="popup">
        <span className="close" onClick={ x => {setState({ popup: 'none'})}}>&times;</span>
          {list.map(({ events, name, earnings, monthlyNetto }) => (
            <div key={events.toString()} className="popup content">
              <div className="headings">
                <h1>{name}</h1>
                <div className="headings info">
                  <h2>{Math.round(earnings*10)/10 + '€'}</h2>
                  <h3>Earnings</h3>
                </div>
                <div className="headings info">
                  <h2>{this.getZero(monthlyNetto.getHours() - 1) + ':' + this.getZero(monthlyNetto.getMinutes()) + state.dev + this.getZero(monthlyNetto.getSeconds())}</h2>
                  <h3>Worktime</h3>
                </div>
              </div>

            <table>
              <thead>
                <tr>
                  <th>Start time</th>
                  <th>End time</th>
                  <th>Duration (incl. breaks)</th>
                  <th>Break duration</th>
                </tr>
              </thead>

              {events.map(row => {
                const startTime = moment(row.startTime)
                const endTime = moment(row.endTime)
                const durationBrutto = new Date(row.durationBrutto)
                const durationPause = new Date(row.durationPause)

                return (
                  <tbody key={startTime.toString()}>
                    <tr>
                      <td>{startTime.format('DD.MM.  hh:mm')}</td>
                      <td>{endTime.format('DD.MM. hh:mm')}</td>
                      <td>{this.getZero(durationBrutto.getHours() - 1) + ':' + this.getZero(durationBrutto.getMinutes()) + state.dev + this.getZero(durationBrutto.getSeconds()) + state.dev}</td>
                      <td>{this.getZero(durationPause.getHours() - 1) + ':' + this.getZero(durationPause.getMinutes()) + state.dev + this.getZero(durationPause.getSeconds()) + state.dev}</td>
                    </tr>
                  </tbody>
                )

              })}
            </table>
            </div>
          ))}

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

        .popup.content {
          margin-top: 100px;
        }

        table {
          margin: auto;
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

      .headings {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 auto;
        width: 580px;
        padding: 0 20px;
        box-sizing: border-box;
      }

      .headings.info {
        color: grey;
      }

      h2 {
        font-size: 20px;
        font-weight: normal;
      }

      h3 {
        font-size: 12px;
        font-weight: normal;
        margin-left: 20px;
      }

      `}</style>
    </div>
    )
  }
}

export default List
