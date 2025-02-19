import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface OppositionStat {
  tt: string
  rn: number
}

interface OppositionBarChartProps {
  stats: OppositionStat[]
}

export const OppositionBarChart: React.FC<OppositionBarChartProps> = ({
  stats
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Runs by Opposition"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Runs"
        }
      },
      x: {
        title: {
          display: true,
          text: "Opposition"
        }
      }
    }
  }

  const data = {
    labels: stats.map((stat) => stat.tt.replace("vs ", "")),
    datasets: [
      {
        data: stats.map((stat) => stat.rn || 0),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="w-full h-[400px] mt-8">
      <Bar
        options={options}
        data={data}
      />
    </div>
  )
}
