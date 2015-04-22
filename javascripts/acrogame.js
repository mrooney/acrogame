game = {}

game.init = function() {
    $('a.next-pose').on('click', function(e) { e.preventDefault(); game.next() });
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
        recognition.start();
        $('p.voice-control').html('<strong>Voice control:</strong> after accepting the microphone prompt above, you can simply shout "nailed it!" to trigger the next pose.');
    }
    $('p.voice-control').show();
}

game.random = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

game.next = function() {
    var pose = game.random(game.poses);
    $('.pose-name').text(pose);
    var prefix = game.started ? game.random(game.prefixes) : 'start in';
    if (game.started) {
        if (Math.floor(Math.random()*10) === 0) { pose += ' using a pop'; }
        if (Math.floor(Math.random()*10) === 0) { pose += ' on your bad side'; }
    }
    game.started = true;
    pose = pose.replace('pashi', 'poshy').replace('bow', 'boe').replace('monolimb', 'mono limb').replace('vashistasana', 'vosheestasana');
    var msg = new SpeechSynthesisUtterance(prefix + ' ' + pose);
    window.speechSynthesis.speak(msg);
}

game.prefixes = ['go to', 'now try', 'how about', 'can you get to', 'what about', 'next is']
game.poses = (function () {/*
bird
bird in hands
bow
bow in hands
shin to foot
foot to shin
throne
throne in hands
easy throne
whale
throne in hands
bird in hands
folded leaf
candlestick
shoulder stand
reverse shoulder stand
super free shoulder stand
super free reverse shoulder stand
straddle bat
baby bat
floating pashi
vashistasana
star
side star
inside side star
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
reverse throne in hands
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
high offering to the gods
hold the throne
mermaid
lotus throne
side dancer
helicopter
star to bird
star to reverse bird
chameleon
numchucks
pickpocket
four step
three step
tangled web
skipping stone
rotisserie
revolution
ninja star
seattle ninja star
hip pop ninja star
high ninja star
propeller
rotor
barrel roll
catherine's wheel
reverse catherine's wheel
maha catherine's wheel
swimming mermaid
whip
muff dive
muff diving mermaid
muff diving shirley temple
thoughtful king
whirlygig
reverse star to cross
reverse star to bird in hands
monkey frog
spider roll
hot seat pop
pop straddle bat to star
pop star to straddle bat
pop bird to throne
pop throne to bird
pop whale to throne
pop whale to high foot to hand
star pop to foot to hand
queen of hearts
pop throne to foot to hand
pop reverse throne to reverse foot to hand
pop backfly to star
pop star to reverse bird
flying squirrel pop
pogo
reverse pogo
elevator
russian roll
standing double tempo thigh stand
standing flag
standing camel
standing one-handed camel
standing straddle pike
standing high bird
flyer higher bird
flyer higher foot to hand
*/}).toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '').split('\n').slice(1,-1);
