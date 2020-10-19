import React, { useEffect } from "react"
import { connect } from "react-redux"

import Helmet from 'react-helmet'

import DateFnsUtils from "@date-io/date-fns"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { StylesProvider } from "@material-ui/styles"
import { ThemeProvider } from "styled-components"

import maTheme from "./theme"
import Routes from "./routes/Routes"
import { getUser } from "./utils/user"
import store from "./redux/store"
import { setUser } from "./redux/actions/userActions"

function App({ theme }) {
  useEffect(() => {
    store.dispatch(setUser(getUser()))
  }, [])
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s | SENSE Platform"
        defaultTitle="SENSE Platform"
      />
      <StylesProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
            <ThemeProvider theme={maTheme[theme.currentTheme]}>
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default connect(store => ({ theme: store.themeReducer }))(App)
