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
        if (data == 'clear') {
          clearMyBoard();
          self.board = promiseBaby(self.board);
        } else {
          self.board[data[0]][data[1]].val = 2;
          self.board[data[0]][data[1]].class = 'friendsSign';
          self.board = promiseBaby(self.board);
        }
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
    [{'val': 0, 'class': ''}, {'val': 0, 'class': ''}, {'val': 0, 'class': ''}],
    [{'val': 0, 'class': ''}, {'val': 0, 'class': ''}, {'val': 0, 'class': ''}],
    [{'val': 0, 'class': ''}, {'val': 0, 'class': ''}, {'val': 0, 'class': ''}]
  ];
  // @formatter:on

  self.placeMySignHere = function (x, y) {
    self.board[x][y].val = 1;

    var conn = self.peer.connect(self.otherPeersId);
    conn.on('open', function () {
      conn.send([x, y]);
    });
  };

  self.mouseOver = function (x, y) {
    var field = self.board[x][y];
    if (field.val == 0) {
      field.class = 'mySign hovering';
    }
  };

  self.mouseLeave = function (x, y) {
    var field = self.board[x][y];
    switch (field.val) {
      case 0:
        field.class = '';
        break;
      case 1:
        field.class = 'mySign';
        break;
      case 2:
        field.class = 'friendsSign';
        break;
    }
  };

  var clearMyBoard = function () {
    for (var i = 0; i < self.board.length; i++) {
      for (var k = 0; k < self.board[i].length; k++) {
        self.board[i][k].val = 0;
        self.board[i][k].class = '';
      }
    }
  };

  self.clearBoard = function () {
    clearMyBoard();

    var conn = self.peer.connect(self.otherPeersId);
    conn.on('open', function () {
      conn.send('clear');
    });
  };
});