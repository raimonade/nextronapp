
import { existsSync } from "fs";
import { execFile } from "child_process";
import { app, dialog, ipcMain } from "electron";
import * as path from "path";
//
// Run the default background.ts code from the main nextron template
//
import "./background";
import axios from "axios";

const PY_DIST_FOLDER = "resources/app";
const PY_FOLDER = "python";
const PY_MODULE = "app"; // without .py suffix

//
// NOTE: navigating between pages results in a new window,
//       new app, new global, etc, a completely new javascript
//       environment so we cant just check pyProc to see if
//       the server has been spawned. Instead make a web call
//       to ask the server if its awake.
//
const pyPort = 8000;
let pyProc = null as any;

ipcMain.on("getPythonPort", (event: any) => {
  // dialog.showErrorBox("success", "getPythonPort called");

  // dialog.showErrorBox("success", "spawning new server");
  const srcPath = path.join(__dirname, "..", PY_FOLDER, PY_MODULE);
  const exePath = path.join(__dirname, '..', PY_DIST_FOLDER, PY_MODULE);
  console.log(exePath)
  // dialog.showErrorBox("info", "packaged");
  if (existsSync(exePath)) {
    pyProc = execFile(exePath, () => { });
    if (pyProc === undefined) {
      dialog.showErrorBox("Error", "pyProc is undefined");
    } else if (pyProc === null) {
      dialog.showErrorBox("Error", "pyProc is null");
    }
  } else {
    dialog.showErrorBox("Error", "Packaged python app not found");
  }
  if (pyProc === null || pyProc === undefined) {
    dialog.showErrorBox("Error", "unable to start python server");
  } else {
    event.sender.send("pythonPort", pyPort);
  }
});

const exitPyProc = () => {
  //
  // NOTE: killing processes in node is surprisingly tricky and a simple
  //       pyProc.kill() totally isn't enough. Instead send a message to
  //       the pyProc web server telling it to exit
  //
  axios.get("http://127.0.0.1:" + pyPort + "/quit").then().catch();
  pyProc = null;
};

app.on("will-quit", exitPyProc);