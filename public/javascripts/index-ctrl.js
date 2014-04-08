tttApp.controller('IndexCtrl', function ($scope) {
  $scope.templateForState = function () {
    console.log('IndexCtrl.templateForState()');
    return 'connect';
  };
});
