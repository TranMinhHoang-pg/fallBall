var character = document.getElementById('character')
var game = document.getElementById('game')
var characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));

var both = 0;
var counter = 0;
var currentBlock = [];


function moveLeft() {
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterLeft > 0) {
        character.style.left = characterLeft - 2 + 'px';
    }
}

function moveRight() {
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterLeft < (400 - characterWidth)) {
        character.style.left = characterLeft + 2 + 'px';
    }
}

document.addEventListener('keydown', event => {
    if(both == 0) {
        both++;
        if(event.key === 'ArrowLeft') {
            interval = setInterval(moveLeft,1);
        }
    
        if(event.key === 'ArrowRight') {
            interval = setInterval(moveRight,1);
        }
    }
})

document.addEventListener('keyup', event => {
    clearInterval(interval);
    both = 0;
})

/////////////////////////////////////////////////////

let blocks = setInterval(function() {
    let blockLast = document.getElementById('block' + (counter-1));
    let holeLast = document.getElementById('hole' + (counter-1));
    if(counter > 0 ) {
        
        var lastBlockTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'));
        var lastHoleTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue('top'));
    }
    if(lastBlockTop < 400 || counter == 0) {
        let block = document.createElement('div')
        let hole = document.createElement('div')
    
        block.setAttribute('class','block');    
        hole.setAttribute('class','hole');
        block.setAttribute('id','block' + counter);
        hole.setAttribute('id','hole' + counter);
    
        hole.style.top = lastHoleTop + 100 + 'px';
        block.style.top = lastBlockTop + 100 + 'px';
        
        let random = Math.floor(Math.random()*360);
        hole.style.left = random +'px';
        game.appendChild(block);
        game.appendChild(hole);
        currentBlock.push(counter);
        counter++;
        
    }
    
    var characterTop = parseFloat(window.getComputedStyle(character).getPropertyValue('top'));
    var characterLeft = parseFloat(window.getComputedStyle(character).getPropertyValue('left'));
    var drop = 0;

    if(characterTop <= 0) {
        alert('Game Over. Score: ' + (counter - 9))
        clearInterval(blocks);
        location.reload();
    }



    for(var i = 0; i < currentBlock.length; i++ ) {
        
        let current = currentBlock[i];
        let iblock = document.getElementById('block' + current) 
        let ihole = document.getElementById('hole' + current) 
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'))
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'))
        iblock.style.top = iblockTop - 0.5 + 'px';
        ihole.style.top = iblockTop - 0.5 + 'px';
        
        if(iblockTop < -20) {
            currentBlock.shift();
            iblock.remove();
            ihole.remove();
        }
        
        
        if(iblockTop > characterTop && iblockTop - 20 < characterTop) {
            drop++;
            if(iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft ) {
                drop = 0;
            }
        }
    }
    if(drop == 0) {
        if(characterTop < 480) {
            character.style.top = characterTop + 2 + 'px'
        }
    }  else {
        character.style.top = characterTop - 0.5 + 'px'
    }
    
},1)