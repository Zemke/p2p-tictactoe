var tttApp = angular.module('tttApp', []);

tttApp.controller('TttAppCtrl', function ($scope) {
    var peersId = randomString();
    var peer = new Peer(peersId, {key: '4o5t8qjc9ncrqkt9'});

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
        var conn = peer.connect($scope.otherPeersId);
        conn.on('open', function () {
            conn.send('Hey, other peer!');
        });
    };

    $scope.otherPeersId = "";
    $scope.peersId = peersId;
});


function randomString() {
    var chars = '01234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = 18;
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
