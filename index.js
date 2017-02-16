"use strict";

const Resizer = require('./lib/resizer.module');
const fs = require('fs');

let testImg = fs.readFile('./data/test.jpg');

let _testPayload = {
    img: fs.readFile('./data/test.jpg'),
    h: 300,
    w: null
};

console.log(_testPayload.img);

let _testContext = {};

exports.handler = function(event, context, cb) {
    const resizer = new Resizer(event);

    resizer.process()
        .then((res) => cb(null, res))
        .catch((err) => cb(err));
}

exports.handler(_testPayload, _testContext, (err, result) => {
    console.log('Evaluating result');
    if (err) {
        console.log(err);
    }
    console.log(result);
});