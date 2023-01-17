const { app, BrowserWindow, ipcMain } = require("electron");
const fetch = require("node-fetch");
const path = require("path");
const installer = require('./installer')
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-city", (event, cityDetails) => {
    event.sender.send("City-Name", cityDetails);
    console.log(cityDetails);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "04cd802793msh546f2f023f5645ep14d485jsne1997c85c3f5",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityDetails}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        event.sender.send("set-data", data);
        console.log(data);
      })

      .catch((err) => console.error("set-data-error", err));
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  win.maximize();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
