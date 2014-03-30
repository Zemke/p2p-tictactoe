var peer = new Peer({key: '4o5t8qjc9ncrqkt9'});
// You can pick your own id or omit the id if you want to get a random one from the server.

// Connect
var conn = peer.connect('another-peers-id');
conn.on('open', function(){
    conn.send('hi!');
});

// Receive
peer.on('connection', function(conn) {
    conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
    });
});
