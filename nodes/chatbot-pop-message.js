const RegisterType = require('../lib/node-installer');

module.exports = function(RED) {
  const registerType = RegisterType(RED);

  function ChatBotPopMessage(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    this.on('input', function(msg, send, done) {
      // send/done compatibility for node-red < 1.0
      send = send || function() { node.send.apply(node, arguments) };
      done = done || function(error) { node.error.call(node, error, msg) };
      // get previous message from stash      
      send({ 
        ...msg,
        payload: msg.previous != null ? msg.previous : msg.payload
      });
      done();
    });
  }

  registerType('chatbot-pop-message', ChatBotPopMessage);
};