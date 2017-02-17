"use strict";
// For these environment variables to be propogated, you must set a .env file for your local machine.
// Any new environment variables must be added to heroku.
var config = {
    env: process.env.ENV || 'local',
    port: process.env.PORT || 8080,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    // https://angular-file-upload.appspot.com/   This page contains a policy/signature generator, however its generated dynamically on the server.
    AWS_REGION: process.env.AWS_REGION
};
module.exports = config;