import { BarChart2Icon, LineChartIcon } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import StatsBarChart from './stats-bar-chart';
import StatsLineChart from './stats-line-chart';

export default function ChartsContainer() {
  return (
    <div className="space-y-3 md:space-y-6">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Monthly Applications
      </h3>
      <Tabs defaultValue="bar-chart" className="flex flex-col">
        <TabsList className="mx-auto h-fit w-fit p-2">
          <TabsTrigger value="bar-chart">
            <div className="flex items-center gap-1">
              <BarChart2Icon aria-hidden="true" />
              <p>Bar Chart</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="line-chart">
            <div className="flex items-center gap-1">
              <LineChartIcon aria-hidden="true" />
              <p>Line Chart</p>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bar-chart">
          <StatsBarChart />
        </TabsContent>
        <TabsContent value="line-chart">
          <StatsLineChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
