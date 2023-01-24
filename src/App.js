import './App.css';
import { useEffect, useState } from 'react';

function useJsonFetch(url, opts=""){
  const [data     , setData   ] = useState();
  const [error    , setError  ] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect( () => {
  const fetchData = async () => {
    try{
      const response = await fetch(url);
      if (!response.ok) setError(new Error(response.statusText));
      else              setData(await response.json());
    }catch(e){setError(e)}
    finally{setLoading(false)}
  }
  fetchData();
  }, [url])

  return [data, error, isLoading];
}

function App() {

  useJsonFetch("http://localhost:7070/data");
  return (
    <div className="App">

    </div>
  );
}

export default App;
