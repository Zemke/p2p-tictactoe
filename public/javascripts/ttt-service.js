tttApp.service('TttService', function ($q, $rootScope) {
  var self = this;
  self.peer = new Peer({key: '4o5t8qjc9ncrqkt9'});

  self.peer.on('connection', function (conn) {
    conn.on('data', function (data) {
      console.log(data);
    });
  });

  self.peer.on('error', function (err) {
    console.error('PeerJS error event emitted:');
    console.error(err.type);
    console.error("http://peerjs.com/docs/#peeron-error");
  });

  self.connectToOtherPeer = function (otherPeersId) {
    console.log('self.peer = ' + self.peer);
    var conn = self.peer.connect(otherPeersId);
    conn.on('open', function () {
      console.log('connection emitted open event');
      conn.send('Hey, other peer!');
    });
  };
});