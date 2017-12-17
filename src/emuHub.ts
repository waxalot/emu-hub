import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
const path = require('path')
const url = require('url')


/**
 * This class handles the creation of the windows and system events.
 * 
 * @export
 * @class EmuHub
 */
export class EmuHub {

    /**
     * Indicates whether the main window was already created.
     * 
     * @readonly
     * @type {boolean}
     * @memberof EmuHub
     */
    get isWindowCreated(): boolean {
        return this.win !== undefined && this.win !== null;
    }


    /**
     * Keep a global reference of the window object, if you don't, the window will
     * be closed automatically when the JavaScript object is garbage collected.
     * 
     * @private
     * @type {BrowserWindow}
     * @memberof EmuHub
     */
    private win: BrowserWindow;


    /**
     * Creates the browser window.
     * 
     * @private
     * @memberof EmuHub
     */
    public createWindow() {
        let options: BrowserWindowConstructorOptions = {
            width: 800,
            height: 600
        };

        // Create the browser window.
        this.win = new BrowserWindow(options);

        // And load the index.html of the app.
        this.win.loadURL(url.format({
            pathname: path.join(__dirname, 'html/emu-hub.html'),
            protocol: 'file:',
            slashes: true
        }));

        // Open the DevTools.
        this.win.webContents.openDevTools();

        // Emitted when the window is closed
        this.win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.win = null
        });
    }

}