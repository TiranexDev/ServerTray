module.exports = {
    // If you hover over the tray icon, this text will be displayed
    contextMenu: {
        working: 'Raspberry Pi is running',
        else: 'Raspberry Pi is having issues',
    }, 
    // Icons which are going to be displayed in the tray
    icons: {
        working: './assets/img/loaded.png',
        else: './assets/img/unloaded.png',
    },
    // Host, enter only one IP address
    host: '192.168.2.185',
    // Delay for ping in seconds
    delay: 30
}