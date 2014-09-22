game = {
    started: false,
}

game.init = function() {
    $('a.next-pose').on('click', game.next);
    if ('webkitSpeechRecognition' in window) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                console.log(event.results[i][0].transcript);
                if (event.results[i][0].transcript.toLowerCase().indexOf('nailed it') !== -1) {
                    game.next();
                }
              }
            }
        }
        //recognition.onstart = function() { ... }
        //recognition.onerror = function(event) { ... }
        //recognition.onend = function() { ... }
        recognition.start();
    }
}

game.random = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

game.next = function() {
    var pose = game.random(game.poses);
    var prefix = game.started ? game.random(game.prefixes) : 'start in';
    $('.pose-name').text(pose);
    game.started = true;
    var msg = new SpeechSynthesisUtterance(prefix + ' ' + pose);
    window.speechSynthesis.speak(msg);
}

game.prefixes = ['go to', 'now try', 'how about', 'can you get to', 'what about', 'next is']
game.poses = (function () {/*
bird
free bird
bow
shin to foot
foot to shin
throne
easy throne
whale
throne in hands
bird in hands
folded leaf
candlestick
shoulder stand
reverse shoulder stand
straddle bat
baby bat
floating pashi
vashistasana
star
side star
reverse side star
reverse star
reverse star monolimb
free star
reverse free star
backbend
back plank
back bow
reverse candlestick
reverse vashistasana
side bird
hammock
reverse throne
box
high foot to hand
low foot to hand
reverse high foot to hand
reverse low foot to hand
foot to foot
reverse foot to foot
cross
reverse bird
pashi on thighs
easy camel
floating camel
thinker
flamingo
butterfly knife
dancer
vishnu's couch
cathedral candle
tabletop
high tabletop
hold the throne
mermaid
lotus throne
side dancer
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].split('\n').slice(1,-1);
