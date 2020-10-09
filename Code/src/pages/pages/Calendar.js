import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"

import Helmet from 'react-helmet'

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

import demoEvents from "./demo-events.json"
import { L } from '../../utils/lang'
import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography
} from "@material-ui/core"

import { spacing } from "@material-ui/system"

import calendarStyle from "./Calendar.style"

const FullCalendarWrapper = styled.div`
  ${calendarStyle}
`

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const CardContent = styled(MuiCardContent)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

function EmptyCard() {
  return (
    <Card mb={6}>
      <CardContent p={6}>
        <FullCalendarWrapper>
          <FullCalendar
            defaultView="dayGridMonth"
            defaultDate="2020-02-14"
            plugins={[ dayGridPlugin, interactionPlugin ]}
            events={demoEvents}
            editable={true}
            header={{
              left: "prev,next",
              center: "title",
              right: "dayGridDay,dayGridWeek,dayGridMonth"
            }}
          />
        </FullCalendarWrapper>
      </CardContent>
    </Card>
  )
}

function Calendar() {
  return (
    <React.Fragment>
      <Helmet title="Calendar" />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Calendar')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Pages')}
        </Link>
        <Typography>{L('Calendar')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EmptyCard />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Calendar
