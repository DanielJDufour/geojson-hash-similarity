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
