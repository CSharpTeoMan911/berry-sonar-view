import "./App.css";
import Radar from "./Components/Radar";
import { useEffect, useState } from "react";
import { setRefreshFunction, setUpdateFunction, setAuthFunction } from "./Functions/Firebase";
import Nav from "./Components/Nav";

export default function App() {
  const [auth, setAuth] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [updateData, setUpdate] = useState(null);

  if(refresh == true){
    setRefresh(false);
  }

  if(auth == false){
    window.location.href = "/login";
  }

  useEffect(()=>{
    setRefreshFunction(setRefresh);
    setUpdateFunction(setUpdate);
    setAuthFunction(setAuth);
    setUpdateFunction(setUpdate);
  },[]);

  return (
    <div className="background">
       <Nav/>
      <div className="content">
       
        <Radar>

        </Radar>
      </div>
    </div>
  );
}