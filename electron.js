const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");

app.on("ready", () => {
    let win = new BrowserWindow({
        title: "emma", 
        resizable: false,
        width: 800, 
        height: 600
    });
    win.setMenuBarVisibility(false);
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    win.on("closed", () => {
        win = null
    })
});
