let socket = io();

let connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices button');
var clientVote = document.getElementById('client-vote');
var voteTotals = document.getElementById('vote-totals');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('myVote', function (message) {
  clientVote.innerText = message;
});

socket.on('voteCount', function (votes) {
  let item = document.createElement('li');
  for (let choice in votes){
    item = document.getElementById(`${choice}`)
    item.innerHTML = `${votes[choice]}`
  }
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
