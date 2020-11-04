import React, { useRef } from "react"
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import { Typography } from "@material-ui/core"
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
    <div style={{ marginTop: '2em' }}>
      <Typography variant='h3' gutterBottom display="inline">
        {title}
      </Typography>
      <Router >
        <Link to='/' ref={linkEl} style={{ display: 'none' }}> hide link, to list page </Link>
        <Switch>
          <Route path={`/detail/:id`}>
            {
              Detail && (() => (
                <Detail path={''} />
              ))
            }
          </Route>
          <Route path={`/update/:id`}>
            {
              Update && (() => (
                <Update path={''} />
              ))
            }
          </Route>
          <Route path={CreateWithId ? `/create/:id` : `/create`}>
            {
              Create && (() => (
                <Create path={''} />
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
