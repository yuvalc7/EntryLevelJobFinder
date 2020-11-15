var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json';
//const baseURL = 'https://il.indeed.com/jobs?q=junior+developer&l=israel&fromage=1'

const redis = require("redis");
const client = redis.createClient({
     //client info 
     port:  ,
     host:  ,
     password : 
});

//SET JOB ASYNC IN REDIS 
const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);


async function fetchgithub(){
    
    let resultCount = 1 , onPage = 0
    const allJobs = [];

    while(resultCount > 0 ){
        const res = await fetch(`${baseURL}?page=${onPage}`)
        const jobs = await res.json();
        //flat the array
        allJobs.push(...jobs)
        resultCount = jobs.length;
        console.log(resultCount , 'jobs');
        onPage++;
    }
    
    //filtering olgo
    const Jobs = allJobs.filter(job => {
        const JobTitle = job.title.toLowerCase();
        var isJrJob = false;
        if (!(JobTitle.includes("senior") || JobTitle.includes("manager") || JobTitle.includes("lead") || JobTitle.includes("sr"))){
            isJrJob = true;
        }
        return isJrJob ;
    })
    await setAsync('github' , JSON.stringify(Jobs));
}

fetchgithub();
module.exports = fetchgithub;
