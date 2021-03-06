const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use("/api/auth", require('./routes/auth.routes'))

const PORT = 4321;

export const connection = mysql.createConnection({
    host: "rivzakat.beget.tech",
    user: "rivzakat_looker",
    database: "rivzakat_looker",
    password: "XmI0B&0A",
    port: 3306
});

connection.connect(function(err){
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else{
        console.log("DB successfully connected!");
        app.listen(PORT, () => console.log(`App is running on port ${PORT}...`));
        connection.query("SELECT * FROM `test-tablicheska`", (err, res) => {
            console.log(res);
        })
    }
});