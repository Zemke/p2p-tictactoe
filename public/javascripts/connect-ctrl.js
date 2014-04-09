tttApp.controller('ConnectCtrl', function ($scope, TttService, IndexService, $q, $rootScope) {
  $scope.startGame = function () {
    TttService.otherPeersId = $scope.otherPeersId;
    TttService.connectToOtherPeer();
    IndexService.template = IndexService.AvailableTemplate.PLAYING;
  };

  TttService.peer.on('open', function (id) {
    var deferred = $q.defer();
    $rootScope.$apply(function () {
      deferred.resolve(id);
    });
    $scope.peersId = deferred.promise;
    $scope.peersId = $scope.peersId.then(function (resp) {
      $scope.peersId = resp;
      TttService.peersId = resp;
    });
  });
});
