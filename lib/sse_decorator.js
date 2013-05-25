var Transform = require('stream').Transform;
var util = require('util');
util.inherits(DecorateStream, Transform);

function DecorateStream(option) {
  Transform.call(this, option);
}

DecorateStream.prototype._transform = function(chunk, encoding, cb) {
  var data = chunk.toString();
  if (data) {
    data = data.replace(/\n/g, "<br/>");
    this.push(data);
  }
  cb();
};

module.exports = DecorateStream;
