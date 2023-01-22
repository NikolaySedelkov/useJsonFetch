import './App.css';
import { useEffect, useState } from 'react';

function SetJsonFetch({url, opts=""}){
  console.log(url);
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

  if(isLoading) return <p>{`${url}: Loading`}</p>
  if(error) return <p>{`${url}: error(${error})`}</p>
  return (
    <>
      {JSON.stringify(data)}
    </>
  )
  return [data, error, isLoading];
}

function App() {

  const [url, setUrl] = useState();
  return (
    <div className="App">
      <div className="urlButton" onClick={()=>setUrl("data")}>data</div>
      <div className="urlButton" onClick={()=>setUrl("error")}>error</div>
      <div className="urlButton" onClick={()=>setUrl("loading")}>loading</div>
      {url&&<SetJsonFetch url={`http://localhost:7070/${url}`}/>}
    </div>
  );
}

export default App;
