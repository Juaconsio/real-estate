import { useEffect, useState } from 'react';
import { getSearchHistory } from '../api/property';
interface SearchHistoryItem {
  contract: string;
  type: string;
  address: string;
  date: string;
}


const History = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchHistory();
      setSearchHistory(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Search History</h1>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>
            <p>{item.contract} - {item.type} - {item.address} - {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;