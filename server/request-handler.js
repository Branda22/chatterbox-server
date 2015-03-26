/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//var url_parts = require("url");
var messages = {
    results : []
  };

exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  
  var message = {};
  var serverUrls = {
   "/classes/messages" : true,
   "/send": true,
   "/classes/room1" : true
  }
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  if(!serverUrls.hasOwnProperty(request.url)){
    console.log("404");
    statusCode = 404; 
    response.write('');
    response.writeHead(statusCode, headers); 
    response.end();   
  }else{
    if(request.method === 'POST'){
      console.log('POST');
      statusCode = 201;
      headers['Content-Type'] = "application/json";
      
      request.on('data', function(data){
        console.log('on data | data = ' + data);
        objData = JSON.parse(data);
        message.username = '' + objData.username;
        console.log('objData.username = ' + objData.username);
        message.message = '' + objData.message;
        messages.results.push(message);
      });

      request.on('end', function(){
        console.log('on data end');
        response.writeHead(statusCode, headers);
        response.end();
      });

    } else if (request.method === 'GET'){
      console.log('GET');
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages));
    }
  }  
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

