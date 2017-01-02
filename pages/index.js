import React from 'react'
import Head from 'next/head'
import {Provider} from 'react-redux'
import initStore from '../store.js'
import Header from '../containers/Header'
import Messages from '../containers/Messages'
import Footer from '../containers/Footer'

export default class App extends React.Component {

  static getInitialProps ({req}) {
    if (req) {
      const store = initStore()
      return store.getInitialState().then(initialState => ({initialState, store}))
    }
  }

  componentDidMount () {
    this.store.resume()
  }

  constructor (props) {
    super(props)
    this.store = props.store.dispatch ? props.store : initStore(props.initialState)
  }

  render () {
    return (
      <Provider store={this.store}>
        <div className='app'>
          <Head>
            <title>Chat</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel='stylesheet' href='/static/styles.css' />
          </Head>
          <Header />
          <Messages />
          <Footer />
        </div>
      </Provider>
    )
  }
}
