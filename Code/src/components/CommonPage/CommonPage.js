import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { NaviHeader } from "../index"

function CommonPage(props) {
  const {
    path,
    parentTitle,
    title,
    List,
    Detail,
    Update,
    Create
  } = props
  const [ breadcrumbsList, setBreadcrumbsList ] = useState([])

  // 更新导航条
  const onMount = (id) => {
    switch (id) {
      case 'list':
        setBreadcrumbsList([
          { title: parentTitle },
          { title }
        ])
        break
      case 'detail':
        setBreadcrumbsList([
          { title: parentTitle },
          { title, path },
          { title: 'Detail' }
        ])
        break
      case 'update':
        setBreadcrumbsList([
          { title: parentTitle },
          { title, path },
          { title: 'Update' }
        ])
        break
      case 'create':
        setBreadcrumbsList([
          { title: parentTitle },
          { title, path },
          { title: 'Create' }
        ])
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <Router>
        <NaviHeader title={title} breadcrumbsList={breadcrumbsList} />
        <Switch>
          <Route path={`${path}/detail/:id`}>
            {
              Detail && (() => (
                <Detail onMount={onMount} path={path} />
              ))
            }
          </Route>
          <Route path={`${path}/update/:id`}>
            {
              Update && (() => (
                <Update onMount={onMount} path={path} />
              ))
            }
          </Route>
          <Route path={`${path}/create`}>
            {
              Create && (() => (
                <Create onMount={onMount} path={path} />
              ))
            }
          </Route>
          <Route path="/">
            {
              List && (() => (
                <List onMount={onMount} path={path} />
              ))
            }
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default CommonPage