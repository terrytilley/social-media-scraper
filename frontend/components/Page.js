import { useEffect, useState } from 'react';
import { ScrapeProvider } from './ScrapeContext';

function useScrapes() {
  const [scrapes, setScrapes] = useState({
    twitter: [],
    instagram: [],
  });

  async function fetchScrapes() {
    const res = await fetch('http://localhost:8000/data');
    const data = await res.json();
    setScrapes(data);
  }

  useEffect(() => {
    fetchScrapes();
  }, []);

  return { scrapes, fetchScrapes };
}

export default function Page({ children }) {
  const hookInfo = useScrapes();

  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
