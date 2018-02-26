
const electron = require('electron');
const {ipcRenderer} = electron;  //<<< was diff
const ul = document.querySelector('ul');
//console.log('RC:'+ ipcRenderer.sendSync('MyRC',RC));


//alert('Running the script')

 ipcRenderer.on('MyRC', function(e, RC){
    console.log(RC);
    ul.className = 'collection';
    const li = document.createElement('li');
    li.className = 'collection-item';
    const RCText = document.createTextNode(RC);
    li.appendChild(RCText);
    ul.appendChild(li); 
});      

 ipcRenderer.on('MyRefreshTime', function(e, refreshTime){
    console.log('refreshtimeval ' + refreshtime);
    ul.className = 'collection';
    const li = document.createElement('li');
    li.className = 'collection-item';
    const RefreshText = document.createTextNode(refreshtime);
    li.appendChild(RefreshText);
    ul.appendChild(li); 
});      

ipcRenderer.on('item:clear', function(){
ul.className = '';
ul.innerHTML = '';
});



