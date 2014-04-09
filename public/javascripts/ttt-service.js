tttApp.service('TttService', function ($q, $rootScope, IndexService) {
  var self = this;
  self.peer = new Peer({key: '4o5t8qjc9ncrqkt9'}); // 4o5t8qjc9ncrqkt9
  self.otherPeersId = '';
  self.peersId = '';

  self.peer.on('connection', function (conn) {
    self.otherPeersId = conn.peer;
    conn.on('data', function (data) {
      if (IndexService.template != IndexService.AvailableTemplate.PLAYING) {
        IndexService.template = IndexService.AvailableTemplate.PLAYING;
        IndexService.template = promiseBaby(IndexService.AvailableTemplate.PLAYING);
      } else {
        self.board[data[0]][data[1]] = 2;
        self.board = promiseBaby(self.board);
      }
    });
  });

  var promiseBaby = function (newValue) {
    var deferred = $q.defer();
    $rootScope.$apply(function () {
      deferred.resolve(newValue);
    });
    return newValue;
  };

  self.peer.on('error', function (err) {
    console.error('error event emitted');
  });

  self.connectToOtherPeer = function () {
    var conn = self.peer.connect(self.otherPeersId);
    conn.on('open', function () {
      conn.send('handshake');
    });
  };

  // @formatter:off
  self.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  // @formatter:on

  self.placeMySignHere = function (x, y) {
    self.board[x][y] = 1;

    console.log('self.otherPeersId: ' + self.otherPeersId);

    var conn = self.peer.connect(self.otherPeersId);
    conn.on('open', function () {
      conn.send([x, y]);
    });
  };
});