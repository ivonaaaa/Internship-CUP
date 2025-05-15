# DUMP INTERNSHIP
> INTERNSHIP CUP PROJECT

<div align="left">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Inter&size=40&color=87CEEB&left=true&width=700&height=80&pause=1000&repeat=false&lines=Bay+Obey">
</div>
<img src="./public/assets/UI_example.png" width="500"/>

## 📌 Description
Bay Obey is a full-stack web application designed to enhance boating safety in Croatia by delivering location-based alerts in accordance with official maritime laws. The centerpiece of the app is a dynamic, geolocation-powered interactive map that notifies users of important warnings in real time, depending on their current position at sea.

<br>

## 👥 Team
This project was a collaborative team effort including:
- 3 Developers (including myself)
- 2 Designers
- 2 Marketing Specialists
- 1 Multimedia Specialist

You can get insight into promotional content on our [instagram profile](https://www.instagram.com/bayobey.cro/).

<br>

## 🚀 Key Features
- Real-time interactive Mapbox map with location-aware notifications
- Secure login and registration with JWT authentication
- Plan simulation with mock card payment
- Info page for reading into official Croatian maritime laws
- Emergency SOS button for fast access to sea rescue services
- Profile page where users can manage their personal and boat data
- Responsive UI supporting screen sizes from 375px (mobile) to 768px (tablet)

<br>

## 🛠️ Technologies
- **Frontend**: React, TypeScript, Vite, Axios, React Query, Mapbox GL JS
- **Backend**: NestJS, TypeScript, Prisma ORM, PostgreSQL (via Supabase), Swagger
- **Development**: Yarn, TurboRepo, Docker, Visual Studio Code, AWS (deployment)
<br>

## 📦 Installation and Running
> **Note**: Docker is recommended but optional. If you already have PostgreSQL installed locally, you can manually create a database and skip Docker.

To run this project locally, you need to have the following installed:
1. **Visual Studio Code** (recommended)
2. **Yarn**
3. **Node.js**
4. **Docker** (or PostgreSQL via pgAdmin)

Steps to Install the Project:
1. **Clone and open the Repository**:
   Open a terminal and run the following commands:
   ```bash
   git clone https://github.com/ivonaaaa/internship-cup.git
   cd internship-cup
   ```

2. **Install the dependencies**:
   Once you're in the VS Code, open a terminal and type in this command in root directory:    
   ```bash
   yarn install
   ```

3. **Start Docker:**
   If you don't have a local PorstgreSQL setup:    
   ```bash
   docker compose up -d
   ```
   - Alternatively, open pgAdmin and create a new database named "bayobey-app". Take note of your connection credentials as you will use this in your .env file as DATABASE_URL.
   
   
4. **Set up the environment variables:**
   
   Create a .env file in the /backend directory:
   ```bash
   DATABASE_URL="postgresql://pomorac:more123@localhost:5432/bayobey-app"
   JWT_SECRET="your_jwt_secret_here"
   ```
   Create a .env file in the /frontend directory:
   ```bash
   VITE_ACCESS_TOKEN=pk.eyJ1IjoienVsamExMjMiLCJhIjoiY21hYjhyeTVrMXZ1azJsc2RjMGYxNm93OCJ9.2OyzlK3a8dViX2VAAWlqSA

   ```

6. **Setup Database**:
   ```bash
   yarn db:generate
   yarn db:migrate
   yarn db:seed
   ```

7. **Start the application**:
   Use Turborepo to start both workspaces:
   ```bash
   yarn dev
   ```
   Open in Browser:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000/api
   - Swagger Documentation: http://localhost:3000/api/docs
<br>

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License.

You are free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — You must give appropriate credit and indicate if changes were made.
- **NonCommercial** — You may not use the material for commercial purposes.

🔗 [Read the full license here](https://creativecommons.org/licenses/by-nc/4.0/)

© 2025 Bay Obey Team  
Built during the DUMP Internship Program.
