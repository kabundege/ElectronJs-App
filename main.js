const { app,BrowserWindow,Tray ,nativeImage} = require('electron')
const path = require('path')

let tray,window ;

// app.dock.hide()

const createWindow = () => {
    window = new BrowserWindow({
        width:800,
        height:600,
        show:true,
        frame:false,
        resizable:false,
        transparent:false,
        fullscreenable:false,
        webPreferences:{
            nodeIntegration: true,
        },
    });

    window.on('close',() => win = null)
}

const createTray = () => {
    const icon = path.join(_dirname,'./icon.png');
    const nImage = nativeImage.createFromPath(icon);

    tray = new Tray(nImage);
    tray.on('click',(e)=> toggleWindow())
}

const toggleWindow = () => window.isVisible() ? window.hide() : showWindow();

const showWindow = () => {
    const { x,y } = windowPosition();
    window.setPosition(x,y)
    window.show()
}

const windowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();

    const x = Math.round(trayBounds.x + (trayBounds.width/2) - (windowBounds.width/2))
    const y = Math.round(trayBounds.y + trayBounds.height)

    return { x,y }
}


app.whenReady().then(createWindow)

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows.length === 0){
        createTray()
        createWindow()
    }
})
