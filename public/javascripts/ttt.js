var tttApp = angular.module('tttApp', []);

tttApp.controller('TttAppCtrl', function ($scope) {
    var peersId = randomString();
    var peer = new Peer(peersId, {key: '4o5t8qjc9ncrqkt9'});

    peer.on('open', function (id) {
        console.log('open event emitted');
        console.log(id);
    });

    $scope.peersId = peersId;
});


function randomString() {
    var chars = '01234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = 18;
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
