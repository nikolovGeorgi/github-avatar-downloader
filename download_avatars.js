// AVATAR DOWNLOADER
const fs = require('fs');
const request = require('request');
const dotenv = require('dotenv').config();

const repoOwner = process.argv[2];
const repoName = process.argv[3];
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner && repoName){
    //URL builder
    let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/'
     + repoOwner + '/' + repoName + '/contributors';

    request({ url: requestURL,  headers: {'User-Agent': 'nikolovGeorgi'}}, (err, response, body) => {
      if (err){
        console.log("Error!", err);
        return false;
      }else if (response && response.statusCode !== 200){
        console.log("Response was not 200!", response);
        return false;
      }
      let data = JSON.parse(body);
      let path = './Avatars/';
      //Loop through each person to get their avatar url and set their login name as the image name
      if(data && data.length){
        data.forEach((person) => {
          //use separate function to download the content of the image
          //otherwise it'll download an empty string.
          downloadImageByURL(person.avatar_url, path + person.login + '.png');
        })
      }
    });
  } else {
    console.log("\n\nPlease make sure you your input looks like this:\n\n $ node download-avatars.js repoOwner repoName");
  }
}
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(resp) {
      console.log("Downloding", resp.headers['content-type'], url); //to print which url we are downloading
    })
    .on('end', function(end) {
      console.log("Download complete!");
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, downloadImageByURL);
