import React, { useRef } from "react"
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import theme from '../../utils/theme'
import store from "../../redux/store"
import { setPage } from "../../redux/actions/pageActions"

function CommonPage(props) {
  const {
    List,
    Detail,
    Update,
    Create,
    Step,
    title,
    CreateWithId
  } = props

  const linkEl = useRef(null)

  const storeListener = () => {
    if (!linkEl.current) return
    const { toListPage } = store.getState().pageReducer.currentPage
    if (toListPage) {
      linkEl.current.click()
      store.dispatch(setPage(Object.assign(store.getState().pageReducer.currentPage, { toListPage: false })))
    }
  }

  store.subscribe(storeListener)

  return (
    <div style={{
      marginTop: '2em',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: theme.font.important.size,
        lineHeight: theme.font.important.lineHeight,
        fontWeight: 'bolder',
        color: theme.color.sub.mainText
      }}>
        {title}
      </div>
      <Router>
        <Link to='/' ref={linkEl} style={{ display: 'none' }}> hide link, to list page </Link>
        <Switch>
          <Route path={`/detail/:id`}>
            {
              Detail && (() => (
                <Detail path={''} map={new Map()} />
              ))
            }
          </Route>
          <Route path={`/update/:id`}>
            {
              Update && (() => (
                <Update path={''} map={new Map()} />
              ))
            }
          </Route>
          <Route path={CreateWithId ? `/create/:id` : `/create`}>
            {
              Create && (() => (
                <Create path={''} map={new Map()} />
              ))
            }
          </Route>
          <Route path={`/step/:id`}>
            {
              Step && (() => (
                <Step path={''} />
              ))
            }
          </Route>
          <Route path="/">
            {
              List && (() => (
                <List path={''} />
              ))
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default CommonPage
