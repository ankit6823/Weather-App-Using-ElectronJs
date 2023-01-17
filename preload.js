const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("Bridge", {
  setCity: (cityDetails) => ipcRenderer.send("set-city", cityDetails),
  cityName: (cityDetails) => ipcRenderer.on("City-Name", cityDetails),
  cityData: (data) => ipcRenderer.on("set-data", data),
});
