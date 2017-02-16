"use strict";

const sharp = require('sharp');
const Promise = require('bluebird');

class Resizer {
    constructor(opts) {
        this._opts = opts;
        this._opts.h = opts.h || null;
        this._opts.w = opts.w || null;
    }
    delivery(_buffer) {
        return new Promise((resolve, reject) => {
            let _format = this._opts.format || 'png';
            let _delivery = this._opts.delivery || 'stream';
            console.log(_delivery);
            if (this._opts.delivery === 'stream') {
                sharp(_buffer)
                    .toFormat(_format)
                    .toBuffer()
                    .then((data) => {
                        console.log('ln 22');
                        resolve(data);
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err);
                    });
            } else {
                sharp(_buffer)
                    .toFormat(_format)
                    .toFile(`./test/${this.opts.filename}.${_format}`)
                    .then((res) => {
                        console.log('ln 34');
                        resolve(res)
                    })
                    .catch((err) => {
                        console.log(err)
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
                                resolve(res);
                            })
                            .catch((err) => {
                                console.log(err)
                                reject(err);
                            });
                    })
                    .catch((err) => console.log(err));
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