var mysql = require('mysql');


var settings = {
    host: "localhost",
    user: "root",
    password: "hihello123@",
    database: "calloff",
    multipleStatements: true

};


var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);
        console.log(__dirname);
        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();