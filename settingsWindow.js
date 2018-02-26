const electron = require('electron');
        const {ipcRenderer} = electron;

 
        document.querySelector('form').addEventListener('submit', submitForm );

        function submitForm(e){
            e.preventDefault();
            const data={};
            const dataContainer = document.getElementsByClassName('results_display')[0];
            dataContainer.textContent = JSON.stringify(data, null, " ");

            // const RC = document.querySelector('#RC').value;
            // const refreshTime = document.querySelector('#refreshTime').value
  
            // ipcRenderer.send('MyRefreshTime', refreshTime);
            // ipcRenderer.send('MyRC', RC);
           
           //******************************************************************************
           // Go through this
           // https://code.lengstorf.com/get-form-values-as-json/
           //****************************************************************************
}