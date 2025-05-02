
<div align=center>
  <img src="https://github.com/user-attachments/assets/efff3c08-00dc-4a4d-af83-1ddbd9bd82f7"/>
</div>

<div align=center>
  <img src="https://github.com/user-attachments/assets/1892a68c-c669-4ee7-ba68-c113863caf2d"/>
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
- 🔧 **Vite** (or Create React App) for build tooling

## 📐➰ Math & Trigonometry

<div align=center>
  <img src="https://github.com/user-attachments/assets/00d54152-0c01-40bf-837b-d7c252166968"/>
</div>

<div align=center>
  <img src="https://github.com/user-attachments/assets/01e36f2f-b044-4d2f-ae6c-8d20abeeabea"/>
</div>

<div align=center>
  <img src="https://github.com/user-attachments/assets/072c5712-e639-4956-b30b-a17ce4ae55d4"/>
</div>


<div align=center>
  <img src="https://github.com/user-attachments/assets/31b0c93e-8a2d-4373-8de2-73f433c8c55b"/>
</div>





