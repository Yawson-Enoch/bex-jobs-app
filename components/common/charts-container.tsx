import { useState } from 'react';

import StatsBarChart from './stats-bar-chart';
import StatsLineChart from './stats-line-chart';

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true);
  return (
    <>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <StatsBarChart /> : <StatsLineChart />}
    </>
  );
}
