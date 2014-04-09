tttApp.controller('ConnectCtrl', function ($scope, TttService, $q, $rootScope) {
  $scope.startGame = function () {
    TttService.connectToOtherPeer($scope.otherPeersId);
  };

  TttService.peer.on('open', function (id) {
    console.log('open event emitted ' + id);

    var deferred = $q.defer();
    $rootScope.$apply(function () {
      deferred.resolve(id);
    });
    $scope.peersId = deferred.promise;
    $scope.peersId = $scope.peersId.then(function (resp) {
      $scope.peersId = resp;
    });
  });
});
