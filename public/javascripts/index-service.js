tttApp.service('IndexService', function ($q, ErrorService) {
  var self = this;
  self.AvailableTemplate = {
    CONNECT: 'connect',
    PLAYING: 'playing',
    ERROR: 'error'
  };

  self.template = self.AvailableTemplate.CONNECT;
});