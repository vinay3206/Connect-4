// import { jsdom } from 'jsdom';
// import PIXI from 'pixi.js';
//
// var exposedProperties = ['window', 'navigator', 'document'];
//
// global.document = jsdom();
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach(function(property){
//   if(typeof global[property] === 'undefined'){
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
//
// global.Canvas = require('canvas');
// global.Image = require('canvas').Image;
// global.window.CanvasRenderingContext2D = 'foo';
// global.window.document = global.document;
// global.window.Element = undefined;
// global.window.DOMParser - require('xmldom').DOMParser;
//
// global.XMLHttpRequest = function() {};
//
// global.PIXI = PIXI;
//
// global.navigator = {
//   userAgent: 'node.js'
// }
