import React, { useState } from "react"
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { NaviHeader } from "../index"

const path = '/'

function CommonPage(props) {
  const {
    parentTitle,
    title,
    List,
    Detail,
    Update,
    Create,
    Step,
    CreateWithId
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
      case 'Step':
        setBreadcrumbsList([
          { title: parentTitle },
          { title, path },
          { title: 'Step' }
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
          <Route path={`/detail/:id`}>
            {
              Detail && (() => (
                <Detail onMount={onMount} path={''} />
              ))
            }
          </Route>
          <Route path={`/update/:id`}>
            {
              Update && (() => (
                <Update onMount={onMount} path={''} />
              ))
            }
          </Route>
          <Route path={CreateWithId ? `/create/:id` : `/create`}>
            {
              Create && (() => (
                <Create onMount={onMount} path={''} />
              ))
            }
          </Route>
          <Route path={`/step/:id`}>
            {
              Step && (() => (
                <Step onMount={onMount} path={''} />
              ))
            }
          </Route>
          <Route path="/">
            {
              List && (() => (
                <List onMount={onMount} path={''} />
              ))
            }
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default CommonPage
