
var messages = [];
var counter = messages.length;
exports.requestHandler = function(request, response) {
//var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
  console.log("Request Url :" + request.url + " Request Method " + request.method);
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
    statusCode = 404; 
    response.writeHead(statusCode, headers); 
    response.end();   
  }else{
    if(request.method === 'POST'){
      statusCode = 201;
      headers['Content-Type'] = "application/json";
      
      request.on('data', function(data){
        objData = JSON.parse(data);
        message.username = '' + objData.username;
        message.message = '' + objData.message;
        message.roomname = 'lobby';
        message.id = ++counter;
        messages.push(message);
      });

      request.on('end', function(){
        response.writeHead(statusCode, headers);
        response.end();
      });

    } else if (request.method === 'GET'){
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));
    }
  }  
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

