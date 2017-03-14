const fs = require('fs');
const request = require('request');
module.exports = function downloadImageByURL(url, filePath) {
   /* set request.get to a variable so we dont make redundant get requests while setting fileTypes*/
  let req = request.get(url)
    .on('error', function(err) {
      throw err;
    })
    /* fileType returns an array of content-type through split */
    /* check if we have images returned then add the unique image extention */
    /* add the fileType extention to the images (png/jpeg in the case) */
    .on('response', function(resp) {
      console.log("Downloding", resp.headers['content-type'], url);
      let fileType = resp.headers['content-type'].split('/');
      let filePath = '';
      if(fileType[0] === 'image'){
        filePath = filePath + `.${fileType[1]}`;
      }
      req.pipe(fs.createWriteStream(filePath));
    })
    .on('end', function(end) {
      console.log("Download complete!");
    });
};
