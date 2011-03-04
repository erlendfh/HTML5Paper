(function () {
  var socket = new io.Socket();
  var reload;
  var startTime;
  socket.on('connect', function () {
    clearTimeout(reload);    
  });
  
  socket.on('message', function (data) {
    if (!startTime) {
      startTime = data;
    }

     if (data != startTime) {
      window.location.reload();
    }
  });

  socket.on('disconnect', function () {
    reload = setInterval(function () { 
      socket.connect();
    }, 1000);
  });

  socket.connect();
  
})();
