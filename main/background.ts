import axios from 'axios';
import { spawn } from 'child_process';
import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

const shutdown = () => {
  axios.get(`http://localhost:8000/quit`)
    .then(() => app.quit())
    .catch(() => app.quit());
};


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') shutdown();
});
