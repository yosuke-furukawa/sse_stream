# Server-Sent Events Stream

Server-Sent Events Stream can send Server-Sent Events using Node.js.

## How to install

```bash
$ npm install sse_stream
```

## How to use

Server side
```js
var http = require("http");
var SSEStream = require("sse_stream");
var fs = require("fs");

http.createServer(function(req, res){
  if (req.headers["accept"] === "text/event-stream") {
    var sse_stream = new SSEStream();
    var exec = require('child_process').exec;
    var child = exec("tail -f test.log");
    child.stdout.pipe(sse_stream).pipe(res);
  } else {
    fs.createReadStream("index.html").pipe(res);
  }
}).listen(8080);
```

Client side

index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Server Sent Events</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script>
      $(function() {
        var source = new EventSource("/");
        source.onmessage =  function(event) {
          $("p").append(event.data);
          $('html, body').animate({
            scrollTop: $(document).height()
          }, 100);
        };
      });
    </script>
  </head>
  <body>
    <p></p>
  </body>
</html>
```

## create stream server
install global
```bash
$ npm install sse_stream -g
```

### server-sent event for file
```bash
$ sse_server --file test.log
```

### server-sent event for command
```bash
$ sse_server --cmd "tail -f test.log"
```

### server-sent event change port
```bash
$ sse_server --cmd "tail -f test.log" --port 3002
```
