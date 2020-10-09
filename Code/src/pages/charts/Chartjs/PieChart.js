import React from "react"
import styled, { withTheme } from "styled-components"

import { CardContent, Card as MuiCard, Typography } from "@material-ui/core"
import orange from "@material-ui/core/colors/orange"
import red from "@material-ui/core/colors/red"
import { spacing } from "@material-ui/system"
import { L } from '../../utils/lang'

import { Pie } from "react-chartjs-2"

const Card = styled(MuiCard)(spacing)

const Spacer = styled.div(spacing)

const ChartWrapper = styled.div`
  height: 300px;
`

function PieChart({ theme }) {
  const data = {
    labels: [L("Social"), L("Search Engines"), L("Direct"), L("Other")],
    datasets: [
      {
        data: [ 260, 125, 54, 146 ],
        backgroundColor: [
          theme.palette.secondary.main,
          orange[500],
          red[500],
          theme.palette.grey[300]
        ],
        borderColor: "transparent"
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  }

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Pie Chart')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('pieChartDes')}
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Pie data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

export default withTheme(PieChart)
