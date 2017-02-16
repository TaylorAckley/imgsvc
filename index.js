"use strict";

const Resizer = require('./lib/resizer.module');
const fs = require('fs');

let testImg;

fs.readFile('./data/test.jpg', (err, data) => {
    if (err) {
        console.log(err);
    }
    testImg = data;
});

let _testPayload = {
    img: testImg,
    h: 300,
    w: null

};

let _testContext = {};

exports.handler = function(event, context, cb) {
    const resizer = new Resizer(event);

    resizer.process()
        .then((res) => cb(null, res))
        .catch((err) => cb(err));
}

exports.handler(_testPayload, _testContext, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});