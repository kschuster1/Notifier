//import { Menu } from 'electron';

const electron = require('electron');
const url  = require('url');
const path = require('path');
//const handleSettings = require('./settings.js');
const fs = require('fs');
// Store user info
var RCNo;
var refreshTime = 30;
var settingsExist = false;

// SET ENV
process.env.NODE_ENV = 'development';

const {app,BrowserWindow,Menu, ipcMain} = electron;

//

let mainWindow;
let settingsWindow;

intialize();
console.log('the RC: ' + RCNo);



// Listen for app to be ready
 app.on('ready', function(){
    //Create main window
    
    let display = electron.screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    //console.log(width);
    //console.log(height);
    mainWindow = new BrowserWindow({
        backgroundColor:'blue',
        width:400,
        height:200,
        x:width - 400,
        y:height - 250,
        minimizable:true,
        maximizable:false,
        alwaysOnTop:true,
        movable: false
    });


    //Load HTML file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes : true
    }));
    
    // quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    })

    // Build Menu from tempalte 
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// Create Settings Menu
/*     function createSettingsWindow(){
        //Create main window
    settingsWindow = new BrowserWindow({
      //  width:200,
      //  height:300,
      width:600,
      height:500,
        title:'Settings'
    }); 


    //Load HTML file
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname,'settingsWindow.html'),
        protocol: 'file:',
        slashes : true
    }));

    // Garbage Collection handle
    settingsWindow.on('close', function(){
        MSWebViewSettings = null;  
    })
    }*/

// Catch RC:Add and refreshTime:add from Settings Window
 ipcMain.on('MyRC', function(e,RC){
    console.log(RC);
    mainWindow.webContents.send('MyRC', RC);
    settingsWindow.close();
// Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
//addWindow = null;
}) 


//Create Menu Template
    const mainMenuTemplate = [
        {
          label: 'File',
          submenu:[
              {
                  label:'Refresh'
              },
              {
                  label:'Settings',
                  click(){
                      //createSettingsWindow();
                      mainWindow.loadURL(url.format({
                        pathname: path.join(__dirname,'settingsWindow.html'),
                        protocol: 'file:',
                        slashes : true
                    }));
                    }
              },
              {
                  label:'Close Window',
                  click(){
                      app.hide;
                  }
              },
              {
                  label:'Exit Application',
                    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click(){
                        app.quit();
                    }
              }
          ]
        }
    ];

// Add developer tools item if not in prod
    if(process.env.NODE_ENV !== 'production'){
        mainMenuTemplate.push({
            label:'Developer Tools',
            submenu:[
                {
                    label: 'Toggle DevTools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' :
                    'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]

        })
    }

    function intialize(){
        fs.readFile('settings.json', (err, fd) => {
            if (err) {
              if (err.code === 'ENOENT') {
        
                // file does not exist trigger user interation to update
                //settingsExist = false;
            console.log(settingsExist);
                console.error('myfile does not exist');
                return;
              }
          
              throw err;
            }
                console.log('found');
                settingsExist = true;
                // Read the json file into variables
                let rawData = JSON.parse(fd);
                console.log(rawData);
                RCNo = rawData.RC;   
                //console.log(RCNo);
                refreshTime = rawData.refreshTime; 
          });
        
    
    
    }

    console.log(RCNo);