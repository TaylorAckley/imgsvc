"use strict";

const Resizer = require('./lib/resizer.module');
const fs = require('fs');

let testImg = fs.readFileSync('./data/test.jpg');

let _testPayload = {
    img: testImg,
    h: 300,
    w: null,
    filename: 'test_rsz',
    delivery: {
        s3: {
            bucket: 'imgsvc-dev',
            key: 'out/test_rsz'
        }
    }

};

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