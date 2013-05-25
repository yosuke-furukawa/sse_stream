var Transform = require('stream').Transform;
var util = require('util');
util.inherits(SSEStream, Transform);

function SSEStream(option) {
  Transform.call(this, option);
  this.id = 0;
  this.retry = (option && option.retry) || 1000;
}

SSEStream.prototype._transform = function(chunk, encoding, cb) {
  var data = chunk.toString();
  console.log(data);
  if (data) {
    data = data.replace(/(.*)\n/g, "$1<br/>");
    this.push("id:" + this.id + "\n");
    this.push("data:"+ data + "\n\n");
    this.push("retry: " + this.retry);
  }
  this.id++;
  cb();
};

module.exports = SSEStream;
