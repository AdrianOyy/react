import React from "react"
import styled, { withTheme } from "styled-components"

import { CardContent, Card as MuiCard, Typography } from "@material-ui/core"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"
import yellow from "@material-ui/core/colors/yellow"
import { spacing } from "@material-ui/system"
import { L } from '../../utils/lang'

import { Polar } from "react-chartjs-2"

const Card = styled(MuiCard)(spacing)

const Spacer = styled.div(spacing)

const ChartWrapper = styled.div`
  height: 300px;
`

function PolarChart({ theme }) {
  const data = {
    labels: [L("Speed"), L("Reliability"), L("Comfort"), L("Safety"), L("Efficiency")],
    datasets: [
      {
        label: L('Model S'),
        data: [ 35, 38, 65, 70, 24 ],
        backgroundColor: [
          theme.palette.secondary.main,
          yellow[700],
          orange[500],
          red[500],
          theme.palette.grey[300]
        ]
      }
    ]
  }

  const options = { maintainAspectRatio: false }

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Polar Area Chart')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('polarareaChartsDes')}
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Polar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

export default withTheme(PolarChart)
