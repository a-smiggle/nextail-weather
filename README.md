# Nextail-Weather

This is a basic weather application tat uses multiple API calls to display your local weather information.
- Geo Location is gained by https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- Location details are received by OpenCage API call.
- Weather and Air Pollution data is received by OpenWeather API calls.

Zustand is used to store received data to limit API calls to one every ten minutes.
## Getting Started

### 1. Clone this repo:

1. Using `create-next-app`

   ```bash
   npx create-next-app -e https://github.com/a-smiggle/nextail-weather project-name
   ```

### 2. Install dependencies

```bash
npm install

#or

yarn install

#or

pnpm install
```

### 3. Register for API keys
- Open Cage Data: https://opencagedata.com
- Open Weather: https://openweathermap.org

Rename env.temp to env.local and add your API keys.

### 4. Run the development server

You can start the server using this command:

```bash
npm run dev

#or

yarn dev

#or

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

Once running you can start editing the page by modifying `src/pages/index.tsx`.