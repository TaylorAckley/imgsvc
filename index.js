"use strict";

const Resizer = require('./lib/resizer.module');

exports.handler = function(event, context, cb) {

    const resizer = new Resizer(event);

    resizer.resize();

};