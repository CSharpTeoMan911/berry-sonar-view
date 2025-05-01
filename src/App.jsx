import "./App.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { setRefreshFunction, setUpdateFunction, setAuthFunction } from "./Functions/Firebase";
import { setCanvasRendering } from "./Functions/Animations";
import Nav from "./Components/Nav";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [updateData, setUpdate] = useState(null);
  const [switchDirection, setSwitchDirection] = useState(false);
  const [lastDegree, setLastDegree] = useState(0);

  const canvasRef = useRef(null);
  const radarRayRef = useRef(null);
  const coordinatesRef = useRef(null);

  console.log(`degree: ${updateData?.degree}`);
  console.log(`distance: ${updateData?.distance}`);

  if (refresh == true) {
    setRefresh(false);
  }

  if (auth == false) {
    window.location.href = "/login";
  }

  useEffect(() => {

    // Refresh the coordinates for every radar section travelled by the radar ray
    let clear = false;
    const direction = updateData?.switch_direction;
    if (switchDirection != direction) {
      clear = true;
      setSwitchDirection(updateData?.switch_direction);
    }

    // Remove the database jitter caused by requests that where dropped 
    let databaseJitter = false;

    if ((switchDirection == false && updateData?.degree < lastDegree) || (switchDirection == true && updateData?.degree > lastDegree)) {
      databaseJitter = true;
    }
    setLastDegree(updateData?.degree);



    // Draw the sonar ray only if the coordinates correspond with a correct possition
    if (databaseJitter == false) {
      drawSonarRay(radarRayRef.current, updateData?.degree);
    }

    drawCoordinates(coordinatesRef.current, updateData?.degree, updateData?.distance, clear);
  }, [updateData]);

  useEffect(() => {
    if (!loaded) {
      setCanvasRendering();
      setRefreshFunction(setRefresh);
      setUpdateFunction(setUpdate);
      setAuthFunction(setAuth);
      setUpdateFunction(setUpdate);
      renderRadarBody(canvasRef.current);
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <div className="background">
      <Nav />
      <div className="radar-background">
        <div id="metal-mask" className="metal-mask"></div>
      </div>
      <canvas id="radar" ref={canvasRef} width={1000} height={1000} className="radar-canvas"></canvas>
      <canvas id="radar_ray" style={{ zIndex: "4" }} ref={radarRayRef} width={1000} height={1000} className="radar-canvas"></canvas>
      <canvas id="radar_coordinates" style={{ zIndex: "3" }} ref={coordinatesRef} width={1000} height={1000} className="radar-canvas"></canvas>
    </div>
  );
}

function drawCoordinates(canvas, deg, distance, clearRect) {
  const max_radius = (970 / 2) - 10;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();

  if (clearRect == true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  let source_x = 1000 / 2;
  let source_y = 1000;

  // Scale: 1cm = 6 point => 1 : 6000

  // Plot the distance to the detected object as a circle.

  // The coordinates of the center of the circle is calculated
  // by transforming the distance in 'cm' into the specified
  // scale and creating a radius for a circle that has the 
  // same initial coordinates as the 'radar's base'.

  const scale = 6;
  const scaled_distance_radius = distance * scale;
  const valid_point = distance * scale <= max_radius;

  let distance_x = source_x + scaled_distance_radius * Math.cos(deg * (Math.PI / 180));
  let distance_y = 1000 + (1000 - (source_y + scaled_distance_radius * Math.sin(deg * (Math.PI / 180))));

  if (valid_point == true) {
    ctx.beginPath();

    ctx.strokeStyle = "rgb(21, 255, 0)";
    ctx.lineWidth = 10;

    ctx.arc(distance_x, distance_y, 1, 0, 360, false);
    ctx.stroke();
  }
}

function drawSonarRay(canvas, deg) {

  const radius = 970 / 2;

  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  let source_x = 1000 / 2;
  let source_y = 1000;
  let new_rad = radius - 10;

  let target_x = source_x + new_rad * Math.cos(deg * (Math.PI / 180));
  let target_y = 1000 + (1000 - (source_y + new_rad * Math.sin(deg * (Math.PI / 180))));

  ctx.beginPath();
  ctx.strokeStyle = "rgb(240, 40, 97)";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;

  ctx.moveTo(source_x, source_y);
  ctx.lineTo(target_x, target_y);
  ctx.stroke();
}

function renderRadarBody(canvas) {
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  const y = 1000; // Y coordinate of the center of the circle
  const x = 1000 / 2; // X coordinate of the center of the circle

  const radius = 980 / 2; // Arc radius
  const startAngle = 0; // Starting point on circle
  const endAngle = Math.PI; // End point on circle
  const counterclockwise = true; // clockwise or counterclockwise


  ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  ctx.fill();


  for (let i = 970; i > 0; i -= 100) {

    ctx.beginPath();

    ctx.strokeStyle = "rgb(117, 19, 47)";
    ctx.lineWidth = 10;

    const c_radius = i / 2;

    ctx.arc(c_radius + (x - c_radius), y, c_radius, startAngle, endAngle, counterclockwise);
    ctx.stroke();
  }

  let section = 180 / 6;

  for (let deg = 0; deg <= 180; deg += section) {
    console.log("deg:", deg);


    let source_x = 1000 / 2;
    let source_y = 1000;
    let new_rad = radius - 5;

    let target_x = source_x + new_rad * Math.cos(deg * (Math.PI / 180));
    let target_y = 1000 + (1000 - (source_y + new_rad * Math.sin(deg * (Math.PI / 180))));

    ctx.beginPath();
    ctx.strokeStyle = "rgb(117, 19, 47)";
    ctx.lineWidth = 5;

    ctx.moveTo(source_x, source_y);
    ctx.lineTo(target_x, target_y);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "rgb(19, 19, 19)";
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.stroke();

  }
}