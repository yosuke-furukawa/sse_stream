var assert = require("assert");
var SSEStream = require("../../lib/sse_stream");

describe("sse_stream test", function(){
  it("should return sse stream", function(done){
    var Writable = require("stream").Writable;
    var dest = [];
    Writable.prototype._write = function(chunk, encoding, cb) {
      dest.push(chunk.toString());
      cb(null);
    };
    var Readable = require("stream").Readable;
    var source = ['a', 'b', 'c', null];
    Readable.prototype._read = function() {
      this.push(source.shift());
    };
    var wstream = new Writable();
    var sse_stream = new SSEStream();
    var rstream = new Readable();
    rstream.pipe(sse_stream).pipe(wstream);
    wstream.on("finish", function(){
      assert.deepEqual(
        dest, 
        [ 'id:0\ndata:a\n\nretry: 0',
          'id:1\ndata:b\n\nretry: 0',
          'id:2\ndata:c\n\nretry: 0' ]
      );
      done();
    });
  });
  it("should return retry 100", function(done){
    var Writable = require("stream").Writable;
    var dest = [];
    Writable.prototype._write = function(chunk, encoding, cb) {
      dest.push(chunk.toString());
      cb(null);
    };
    var Readable = require("stream").Readable;
    var source = ['a', 'b', 'c', null];
    Readable.prototype._read = function() {
      this.push(source.shift());
    };
    var wstream = new Writable();
    var sse_stream = new SSEStream({retry:100});
    var rstream = new Readable();
    rstream.pipe(sse_stream).pipe(wstream);
    wstream.on("finish", function(){
      assert.deepEqual(
        dest, 
        [ 'id:0\ndata:a\n\nretry: 100',
          'id:1\ndata:b\n\nretry: 100',
          'id:2\ndata:c\n\nretry: 100' ]
      );
      done();
    });
  });
});
