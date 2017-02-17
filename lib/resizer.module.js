"use strict";

const sharp = require('sharp');
let Promise = require('bluebird');
let moment = require('moment');
let s3 = require('./s3.module');

class Resizer {
    constructor(opts) {
        this._opts = opts;
        this._opts.h = opts.h || null;
        this._opts.w = opts.w || null;
        this._opts.format = opts.format || 'png';
        this._opts.delivery = opts.delivery || 'stream';
        this._opts.filename = opts.filename || moment().format('YYYYMMDD');
    }
    delivery(_buffer) {
        return new Promise((resolve, reject) => {
            if (this._opts.delivery === 'stream') {
                sharp(_buffer)
                    .toFormat(this._opts.format)
                    .toBuffer()
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            } else if (this._opts.delivery === 's3' || this._opts.s3) {
                sharp(_buffer)
                    .toFormat(this._opts.format)
                    .toBuffer()
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            } else if (this._opts.delivery === 'file') {
                sharp(_buffer)
                    .toFormat(this._opts.format)
                    .toFile(`./data/out/${this._opts.filename}.${this._opts.format}`)
                    .then((res) => {
                        console.log('ln 34');
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            }
        });
    }
    resize() {
        return new Promise((resolve, reject) => {
            console.log('ln 33');
            console.log(this._opts.h);
            console.log(this._opts.w);
            sharp(this._opts.img)
                .resize(this._opts.w, this._opts.h)
                .toBuffer()
                .then((data) => {
                    console.log('ln 39');
                    console.log(data);
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err)
                    reject(err);
                });
        });
    }
    crop() {
        return new Promise((resolve, reject) => {
            sharp(this._opts.img)
                .resize(this.w, this.h)
                .crop(sharp.strategy.entropy)
                .toBuffer()
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => console.log(err));
        });
    }

    process() {
        return new Promise((resolve, reject) => {
            console.log('ln 57');
            let _operation = this._opts.operation || 'resize';
            console.log(_operation);
            if (_operation === 'resize') {
                this.resize()
                    .then((_buffer) => {
                        console.log('ln 62');
                        this.delivery(_buffer)
                            .then((res) => {
                                console.log('ln 87');
                                console.log(res);
                                resolve(res);
                            })
                            .catch((err) => {
                                console.log(err)
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            } else {
                this.crop()
                    .then((_buffer) => {
                        this.delivery(_buffer)
                            .then((res) => {
                                resolve(res);
                            })
                            .catch((err) => {
                                console.log(err)
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err);
                    });
            }
        });
    }
}

module.exports = Resizer;