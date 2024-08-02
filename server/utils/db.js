import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Royal@2004",
    database: "stud_manage_system"
});

db.connect((err)=>{
    if(err){
        console.log("Connection error");
    }
    else{
    console.log("Connected to backend");
    }
})

export default db;