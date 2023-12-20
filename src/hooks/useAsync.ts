import { useState, useEffect } from 'react';

export default function useAsync(handler, immediate = true) {
  const [data, setData] = useState(null);

  const act = async(...args) => {

    try {
      const data = await handler(...args);
      setData(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (immediate) {
      act();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    act
  };
}