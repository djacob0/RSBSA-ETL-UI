const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel) => {
    const validChannels = ['minimize-window', 'maximize-window', 'close-window'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
});