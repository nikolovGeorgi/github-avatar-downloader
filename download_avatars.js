const request = require('request');
const GITHUB_USER = "nikolovGeorgi";
const GITHUB_TOKEN = "53c9ebd5d4eebee3d2150b2f54c7b7483aa8d502";
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/'
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
        response.pipe(fs.createWriteStream(path + person.login + '.png'));
      })
    }
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
