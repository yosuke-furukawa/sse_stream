var Transform = require('stream').Transform;
var util = require('util');
util.inherits(SSEStream, Transform);

function SSEStream(option) {
  Transform.call(this, option);
  this.id = 0;
  this.retry = (option && option.retry) || 0;
}

SSEStream.prototype._transform = function(chunk, encoding, cb) {
  var data = chunk.toString();
  if (data) {
    this.push("id:" + this.id + "\n" +
              "data:"+ data + "\n\n" +
              "retry: " + this.retry);
  }
  this.id++;
  cb();
};

module.exports = SSEStream;
