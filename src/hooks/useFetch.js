import { useEffect, useState } from 'react';

export default function useFetch() {
  const url = 'https://swapi.dev/api/planets';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleApi = async () => {
    try {
      setLoading(true);

      const response = await fetch(url);
      const result = await response.json();

      const dataArray = result.results;

      const newData = dataArray.map((obj) => {
        const newObject = { ...obj };
        delete newObject.residents;
        return newObject;
      });

      setData(newData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  return { loading, data, error };
}
