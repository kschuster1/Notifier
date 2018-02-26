

const sql = require('mssql');

var RC = 'RC03301';

var config = {
    server:'127.0.0.1',
    database:'ptstools',
    user:'ptstools',
    password:'!network3167',
    port:1433
}

function getTasks() {
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function(conn) {
      var request = new sql.Request(conn);
      request.input('RC', sql.VarChar(10), RC);

      request.execute('getTask').then(function(err, recordsets, returnValue, affected) {
        console.dir(recordsets);
        console.dir(err);
        conn.close();
      }).catch(function(err) {
        console.log(err);
      });
      
    });
}



getTasks();