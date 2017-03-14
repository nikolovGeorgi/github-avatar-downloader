const fs = require('fs');
const request = require('request');
module.exports = function downloadImageByURL(url, filePath) {
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
