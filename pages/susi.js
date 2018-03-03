import { Component } from 'react'
import Index from './index'

class Liste extends Component {


  render () {

   return (
     <body>
      <main>
{Index.this.state.list}
      </main>

      <style jsx>{`

      `}</style>
     </body>
   )
  }
}

export default Liste
