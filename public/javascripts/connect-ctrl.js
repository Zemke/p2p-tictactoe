tttApp.controller('ConnectCtrl', function ($scope, TttService, $q, $rootScope) {
  $scope.startGame = function () {
    TttService.otherPeersId = $scope.otherPeersId;
    TttService.connectToOtherPeer();
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
