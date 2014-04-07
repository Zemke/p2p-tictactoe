var tttApp = angular.module('tttApp', []);

// @formatter:off
var fields = [
        [], [], [],
        [], [], [],
        [], [], []
    ];
// @formatter:on
tttApp.controller('TttAppCtrl', function ($scope, $q, $rootScope) {
    $scope.templateForState = function () {
        if ($scope.isInit) {
            return 'fields';
        }
        return 'connect';
    };
    $scope.isInit = false;

    var peer = new Peer({key: '4o5t8qjc9ncrqkt9'});

    peer.on('open', function (id) {
        console.log('open event emitted');
        console.log(id);

        var promise = promiseBaby($q, $rootScope, id);
        $scope.peersId = promise.promise;
        $scope.peersId.then(function (resp) {
            $scope.peersId = resp;
        });
    });

    peer.on('connection', function (conn) {
        conn.on('data', function (data) {
            console.log(data);
        });
    });

    peer.on('error', function (err) {
        console.error('PeerJS error event emitted:');
        console.error(err.type);
        console.error("http://peerjs.com/docs/#peeron-error");
    });

    $scope.startGame = function () {
        console.log('submit');
        console.log($scope.otherPeersId);
        var conn = peer.connect($scope.otherPeersId);
        conn.on('open', function () {
            console.log('connection open');
            conn.send('Hey, other peer!');
            var promise = promiseBaby($q, $rootScope, true);
            $scope.isInit = promise.promise;
            $scope.isInit.then(function (resp) {
                $scope.isInit = true;
            });
        });
    };

    $scope.otherPeersId = '';
});

function promiseBaby($q, $rootScope, data) {
    var promise = $q.defer();
    $rootScope.$apply(function () {
        promise.resolve(data);
    });
    return promise;
}
