const { app, BrowserWindow, ipcMain } = require("electron");
const exec = require("child_process").exec;
const url = require("url");
const path = require("path");

let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 527,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
    show: true,
  });
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("ready", () => {
  createWindow();
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});

ipcMain.on("start_register", (event, arg) => {
  const numbers = arg.numbers;
  const { id, pw } = arg;

  exec(`casperjs ${__dirname}/register.js ${id} ${pw} ${numbers}`, function (
    error,
    stdout,
    stderr
  ) {
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
});
