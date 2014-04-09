tttApp.service('TttService', function ($q, $rootScope, IndexService) {
  var self = this;
  self.peer = new Peer({key: '4o5t8qjc9ncrqkt9'}); // 4o5t8qjc9ncrqkt9

  self.peer.on('connection', function (conn) {
    conn.on('data', function (data) {
      console.log('sending');
      IndexService.template = IndexService.AvailableTemplate.PLAYING;
      var deferred = $q.defer();
      $rootScope.$apply(function () {
        deferred.resolve(IndexService.AvailableTemplate.PLAYING);
      });
      IndexService.template = IndexService.AvailableTemplate.PLAYING;
    });
  });

  self.peer.on('error', function (err) {
    console.error('error event emitted');
  });

  self.connectToOtherPeer = function (otherPeersId) {
    IndexService.template = IndexService.AvailableTemplate.PLAYING;
    var conn = self.peer.connect(otherPeersId);
    conn.on('open', function () {
      conn.send('Hey, other peer!');
    });
  };
});