// This will handle the management of the settings.json file

const fs = require('fs');
// Store user info
var RCNo = '';
var refreshTime = 30;
var settingsExist = false;




//Check that Settings.JSON file exists and extract values
module.exports = function intialize(){
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
           // console.log(rawData);
            RCNo = rawData.RC;   
            console.log(settingsExist);
            refreshTime = rawData.refreshTime; 
      });
    


}


//intialize(); 


// Create template settings.json


//Overwrite settins.json when update/created



