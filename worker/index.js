var CronJob = require('cron').CronJob;


const fetchGithub = require ('./tesks/fetch-github')

//fetch jobs from github api every minute , https://crontab.guru/#*_*_*_*_*
new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
