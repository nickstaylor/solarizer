import React, { useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import './Chart.css'


const Chart = ({ solarData, user }) => {

  const [chartType, updateChartType] = useState('bar')
  const [yAxisLabel, updateYAxisLabel] = useState('(kWh / m^2) / day')
  const pieColors = ['#a93ad7', '#077ed6', '#96d9ff', '#5fb7d4', '#7cdddd', '#26d7ae', '#2dcb75', '#1caa2f', '#d5f30d', '#feec01', '#fba052', '#ff1d00']


  const [data, updateData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Solar Radiation',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'whitesmoke',
      borderWidth: 2,
      data: solarData.solRadMonthly
    }]
  })

  const pieData = {
    labels: data.labels,
    datasets: [{
      label: data.datasets[0].label,
      backgroundColor: pieColors,
      borderColor: 'whitesmoke',
      borderWidth: 2,
      data: data.datasets[0].data
    }]
  }

  const getSpecificChart = (e) => {
    let chartName = e.target.options[e.target.selectedIndex].text
    let dataNames = Object.keys(solarData)
    let chosenDataName = dataNames.find(item => e.target.value === item)
    let selectedChart = solarData[chosenDataName]
    let updatedLabel = e.target.options[e.target.selectedIndex].dataset.yAxis

    updateYAxisLabel(updatedLabel)

    updateData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: chartName,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'whitesmoke',
        borderWidth: 2,
        data: selectedChart
      }]
    })
  }

  return (
    <>
    {!user && <Redirect push to="/" />}
    <div className="configure-container">
      <div className="larger-chart-box">
        <div className="single-chart-box">
          {chartType === 'bar' &&
            <Bar
              data={data}
              width={50}
              height={50}
              options={{
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: data.datasets[0].label,
                  fontSize: 20,
                  fontColor: 'black'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: yAxisLabel
                    }
                  }]
                }
              }}
            />}
          {chartType === 'line' &&
            <Line
              data={data}
              width={50}
              height={50}
              options={{
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: data.datasets[0].label,
                  fontSize: 20,
                  fontColor: 'black'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: yAxisLabel
                    }
                  }]
                }
              }}
            />}
          {chartType === 'pie' &&
            <Pie
              data={pieData}
              width={50}
              height={50}
              options={{
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: data.datasets[0].label,
                  fontSize: 20,
                  fontColor: 'black'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                }
              }}
            />}
        </div>
        <div className="chart-selection-options">
          <div className="configure-form-item">
            <label alt="Chart Date" htmlFor="chartData">Chart Data</label>
            <select
              className="configure-selects"
              defaultValue={"Solar Radiation"}
              required
              onChange={e => getSpecificChart(e)}
            >
              <option id='Solar' data-y-axis='(kWh / m^2) / day' value="solRadMonthly">Solar Radiation</option>
              <option id='AC' data-y-axis='kWh' value="acMonthly">AC Monthly</option>
              <option id='Dollars $' data-y-axis='Dollars $' value="savingsMonthly">Savings Value</option>
            </select>
          </div>
          <div className="configure-form-item">
            <label alt="ChartType" htmlFor="chartType">Chart Type</label>
            <select
              className="configure-selects"
              defaultValue={'bar'}
              required
              name="chartType"
              onChange={e => updateChartType(e.target.value)}
            >
              <option value='bar'>Bar</option>
              <option value='line'>Trend (Line)</option>
              <option value='pie'>Pie</option>
            </select>
          </div>
        </div>
      </div>
      <div className="savings-display-bar">
        {solarData.percentOffset ?
          <p> Based on your annual energy usage, this solar system would offset {Number(solarData.percentOffset).toFixed(2)}% of your electicity cost per year! </p> :
          <p> For a true savings estimate, please enter your <Link to="/historical"> home energy data</Link> </p>
        }
      </div>
    </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  solarData: state.solarData,
  user: state.userProfile.validatedUser
})

export default connect(mapStateToProps, null)(Chart);
