import React from "react"
import styled, { withTheme } from "styled-components"

import { L } from '../../utils/lang'
import { CardContent, Card as MuiCard, Typography } from "@material-ui/core"
import orange from "@material-ui/core/colors/orange"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import { spacing } from "@material-ui/system"

import { Radar } from "react-chartjs-2"

const Card = styled(MuiCard)(spacing)

const Spacer = styled.div(spacing)

const ChartWrapper = styled.div`
  height: 300px;
`

function RadarChart({ theme }) {
  const data = {
    labels: [L("Speed"), L("Reliability"), L("Comfort"), L("Safety"), L("Efficiency")],
    datasets: [
      {
        label: L('Model X'),
        backgroundColor: lighten(theme.palette.secondary.main, 0.33),
        borderColor: theme.palette.secondary.main,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.secondary.main,
        data: [ 70, 53, 82, 60, 33 ]
      },
      {
        label: L('Model S'),
        backgroundColor: lighten(orange[600], 0.33),
        borderColor: orange[600],
        pointBackgroundColor: orange[600],
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: orange[600],
        data: [ 35, 38, 65, 85, 84 ]
      }
    ]
  }

  const options = { maintainAspectRatio: false }

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Radar Chart')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('radarChartDes')}
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Radar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

export default withTheme(RadarChart)
