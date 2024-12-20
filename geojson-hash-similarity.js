(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const geojson_hash = require("geojson-hash");

function geojson_hash_similarity(a, b) {
  const ahashes = geojson_hash(a);
  const bhashes = geojson_hash(b);
  const similar_hashes = ahashes.filter(function (ahash) {
    return bhashes.indexOf(ahash) > -1;
  });
  return similar_hashes.length / (ahashes.length + bhashes.length - similar_hashes.length);
}

if (typeof window === "object") {
  window.geojson_hash_similarity = geojson_hash_similarity;
}

if (typeof self === "object") {
  self.geojson_hash_similarity = geojson_hash_similarity;
}

if (typeof define === "function" && define.amd) {
  define(function () { return geojson_hash_similarity; });
}

if (typeof module === "object") {
  module.exports = geojson_hash_similarity;
  module.exports.default = geojson_hash_similarity;
  module.exports.geojson_hash_similarity = geojson_hash_similarity;
}

},{"geojson-hash":2}],2:[function(require,module,exports){
function geojson_hash(geojson, options) {
  const hashfn = (function () {
    if (typeof options === "object" && typeof options.hasher === "function") {
      return options.hasher;
    }

    // see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
    return function (str) {
      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < str.length; i++) {
        const chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // convert to a 32-bit integer
      }
      return hash;
    }
  })();

  let hashes = [];
  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach(function (feature) {
      geojson_hash(feature, options).forEach(function (hash) {
        hashes.push(hash);
      });
    })
  } else if (geojson.type === "Feature") {
    hashes = hashes.concat(geojson_hash(geojson.geometry, options));
  } else if (geojson.type === "MultiPolygon") {
    geojson.coordinates.forEach(function (polygon) {
      hashes.push(hashfn(JSON.stringify(polygon)));
    });
  } else if (geojson.type === "Polygon") {
    hashes.push(hashfn(JSON.stringify(geojson.coordinates)));
  }
  return hashes;
}

if (typeof define === "function" && define.amd) {
  define(function() { return geojson_hash; });
}

if (typeof module === "object") {
  module.exports = geojson_hash;
  module.exports.default = geojson_hash;
  module.exports.geojson_hash = geojson_hash;
}

if (typeof self === "object") {
  self.geojson_hash = geojson_hash;
}

if (typeof window === "object") {
  window.geojson_hash = geojson_hash;
}
},{}]},{},[1]);
