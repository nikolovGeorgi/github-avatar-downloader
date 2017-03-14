const request = require('request');
const GITHUB_USER = "nikolovGeorgi";
const GITHUB_TOKEN = "53c9ebd5d4eebee3d2150b2f54c7b7483aa8d502";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/'
   + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
