"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let configSrc = process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev');
exports.default = configSrc;
