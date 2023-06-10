import { BriefcaseIcon, MapPinIcon } from 'lucide-react';

import { Button } from '../ui/button';
import AllJobsList from './all-jobs-list';

export default function AllJobsMainContent() {
  return (
    <section className="space-y-6">
      <h4>30 Jobs Found</h4>

      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(min(15rem,_100%),_1fr))] gap-3 md:gap-6">
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
        <AllJobsList />
      </ul>
    </section>
  );
}
