const fs = require('fs');
const request = require('request');
const GITHUB_USER = "nikolovGeorgi";
const GITHUB_TOKEN = "53c9ebd5d4eebee3d2150b2f54c7b7483aa8d502";
const repoOwner = process.argv[2];
const repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner && repoName){
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

      if(data && data.length){
        data.forEach((person) => {
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
      console.log("Downloding", resp.headers['content-type'], url);
    })
    .on('end', function(end) {
      console.log("Download complete!");
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, downloadImageByURL);
