import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';

export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);

  return (
    <div>
      <button type="button" onClick={fetchScrapes}>
        Refresh Data
      </button>

      <h2>Twitter Data:</h2>
      <Chart scrapes={scrapes.twitter} />
      <Table scrapes={scrapes.twitter} />
      <br />
      <h2>Instagram Data:</h2>
      <Chart scrapes={scrapes.instagram} />
      <Table scrapes={scrapes.instagram} />
    </div>
  );
}
