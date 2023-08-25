 
const { Client } = require('pg');

const client = new Client({
    user: 'sgpostgres',
    host: 'SG-postgre1-...',  // copy from scalegrid 
    database: 'postgres',
    password: '', // deleted 
    port: 5432,
});

const execute = async (query) => {
    try {
        await client.connect();     // gets connection
        await client.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();         // closes connection
    }
};
/*
const text = `
    CREATE TABLE IF NOT EXISTS "burwood" (
	    "recordId" SERIAL,
	    "recordName" VARCHAR(50) NOT NULL,
	    "recordAddress" VARCHAR(25) NOT NULL,
        "recordTemp" INT NOT NULL,
	    PRIMARY KEY ("recordId")
    );`;

execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
});
*/

// ---

const text3 = 
`INSERT INTO "burwood" ( "recordName", "recordAddress","recordTemp")  
             VALUES ( "alex', "burw", 22)`
    ;

    execute(text3).then(result => {
        if (result) {
            console.log('Table created');
        }})

// function that inserts into PostgreSQL database that we created in line 10 ('test1')
const insertRecord = async ( recordName, recordAddress, recordTemp) => {
    
            `INSERT INTO "burwood" ( "recordName", "recordAddress","recordTemp")  
             VALUES ($1, $2, $3)`, [ recordName, recordAddress, recordTemp]; 
};

setInterval(sensorTest,1000);  // 10000 ms = 1 second

function sensorTest()
{
// timestamp now
time = Date.now();


const sensordata = {
    id: 0,
    name: "temperaturesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    time: Date.now(),
    temperature: 20
   }
   const low = 10;
   const high = 40;
   reading = Math.floor(Math.random() * (high - low) + low);
   sensordata.temperature = reading;

   const jsonString = JSON.stringify(sensordata);
   console.log(jsonString);



    // timestamp again
    time2 = Date.now();
    // in milliseconds
    difference = time2-time;
    // print
    console.log("time elapsed: "+ difference);

   

   // insert in postgre

    execute(insertRecord( sensordata.name, sensordata.address, sensordata.temperature)).then(result => {
        if (result) {
            console.log('Table created');
        }
});

}
