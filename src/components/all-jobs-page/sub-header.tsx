import Filters from './filters';
import Search from './search';
import Sort from './sort';
import ViewTypes from './view-types';

export default function SubHeader() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 lg:gap-6">
      <Search />
      <div className="flex items-center gap-3 font-medium">
        <Filters />
        <Sort />
      </div>
      <ViewTypes />
    </section>
  );
}
