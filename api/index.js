const express = require('express')
const app = express()
const port = 3001

//REDIS CLIENT TO STORE JOBS
const redis = require("redis");
const client = redis.createClient({
     port:  14108,
     host:  'redis-14108.c243.eu-west-1-3.ec2.cloud.redislabs.com',
     password : 'LhxH0myArKPlBBvpAAxjnSftbWHIJGzc'
});

//GET THE JOBS ASYNC FROM REDIS   
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);


app.get('/jobs', async(req, res) => {
  
    const jobs = await getAsync('github');
    //console.log(jobs)
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    //console.log (JSON.parse(jobs).length); 
    return res.send(jobs);
    //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})