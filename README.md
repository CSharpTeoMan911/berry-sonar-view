
<div align=center>
  <img src="https://github.com/user-attachments/assets/efff3c08-00dc-4a4d-af83-1ddbd9bd82f7"/>
</div>

<div align=center>
  <img src="https://github.com/user-attachments/assets/1892a68c-c669-4ee7-ba68-c113863caf2d"/>
</div>

<br/>

<div align=center>
  <img src="https://github.com/user-attachments/assets/f4a817d8-6212-42cc-bf24-92f0419da7fe"/>
</div>

<br/>

<div align=center>
  <img src="https://github.com/user-attachments/assets/e7ce7ff8-e20f-406a-a289-d46e916f7cec"/>
</div>


# 🍓 BerrySonar View

**BerrySonar View** is a React-based dashboard that turns live ultrasonic scan data from the BerrySonar Raspberry Pi into an interactive radar display. It listens to metadata (angle + distance) streamed to Firebase Realtime Database, uses trigonometry to compute each point’s (x, y) coordinates, and renders them in a smooth, radar-style canvas.

---

## ✨ Key Features

- 🔗 **Firebase Integration**  
  Subscribes to BerrySonar’s real-time metadata feed (angle & distance).

- 📡 **Live Radar Rendering**  
  Draws a dynamic 180° sweep and plots scanned points on an HTML5 Canvas.

- 📐 **Trigonometric Plotting**  
  Converts polar data → Cartesian (x, y) using sine & cosine for accurate positioning.

- 💨 **Smooth Animations**  
  Uses React hooks and requestAnimationFrame for flicker-free updates.

- 🎨 **Customizable UI**  
  Easily tweak sweep speed, point colors, and canvas size via props or config.

---

## 🧱 Tech Stack

- ⚛️ **React** (functional components + hooks)  
- ☁️ **Firebase JS SDK** (Realtime Database)  
- 🎨 **Canvas API** for custom radar graphics  
- 🔧 **Vite** + **Tanstack** (create-tsrouter-app) for build tooling

## 📐➰ Math & Trigonometry

### 📡 Radar Skeleton: Gridlines & Arcs

Firstly, the **Radar UI's** main shape is created. The program is calculating the perimeter of the semi-circle, which is ```P = πR + 2R```, and filling the area within the perimiter. 

<div align=left>
  <img src="https://github.com/user-attachments/assets/00d54152-0c01-40bf-837b-d7c252166968"/>
</div>

<br/>
<br/>
<br/>

Because the geometric shape is a semi-circle, which is half a circle, the inner angle of the shape is ```360° / 2 = 180°```. To draw the **radar UI sectors**, the application will perform a summation by incrementing the degree value by 30 until it reaches 180, with the starting value being 0. At each incrementation, the program will calculate the **x** and **y** coordinates in relation with the angle of the line to be drawn for the radar's sector. To do this, the program will calculate the radiant of each angle (```θ . (180 / π)```), and then perform the ```x = A + R cos(α)``` trigonometric function to calculate **x**, and ```y = B + R sin(α)``` trigonometric function to calculate **y**, where **A** is the semi-circle's point of origin **x** coordinate, **B** is the semi-circle's point of origin **y** coordinate, **R** is the semi-circle's radius, and **α**, is the current degree's radiant. This calculations will give the program the **x** and **y** coordinates of both line's ends, which the program will use to draw the lines by connecting them.  

<div align=left>
  <img src="https://github.com/user-attachments/assets/01e36f2f-b044-4d2f-ae6c-8d20abeeabea"/>
</div>

<br/>
<br/>
<br/>

### 📍 Plotting Detected Objects on the Radar

The [**BerrySonar**](https://github.com/CSharpTeoMan911/BerrySonar) **C#** server app that is running on the **RaspberryPi** is collecting the data in real-time from the ultrasonic sensor as well as the motor position in degrees and updating the data in **Firebase Real-Time Database**. The program, will then take the degree related data and render the radar ray at the specified position using the ```x = A + R cos(α)``` and ```y = B + R sin(α)``` trigonometric functions.

<div align=left>
  <img src="https://github.com/user-attachments/assets/072c5712-e639-4956-b30b-a17ce4ae55d4"/>
</div>

<br/>
<br/>
<br/>

For each distance received by the program through **Firebase Real-Time Database** the program will firsly scale the distance in cenimeters to the **1:6** scale, meaning that for every cm in real life the program will use 6 points, and it is doing this by multiplying the distance in cm by 6. Afterwards it will use the distance as a semi-circle's radius in order to use the ```x = A + R cos(α)``` and ```y = B + R sin(α)``` trigonometric functions to calculate the **x** and **y** coordinates for a semi-circle with the radius as the distance. Afterwards, the resulting **x** and **y** coordinates are used as the points of origin for a circle which represents the point where the object was detected. The aforementioned circle is drawn by using the previously mentioned **x** and **y** coordinates as the center, calculating it's perimeter using ```2πR```, where **R = 1 point**, and then filling the area within the circles perimeter.  

<div align=left>
  <img src="https://github.com/user-attachments/assets/31b0c93e-8a2d-4373-8de2-73f433c8c55b"/>
</div>





