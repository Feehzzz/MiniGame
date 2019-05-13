var scores, roundScore, activePlayer, gamePlaying, winVal, prevDice, prevDice2;


init();





document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        // 1 . random number
        
        var dice = Math.floor(Math.random() * 6 ) + 1;
        var dice2 = Math.floor(Math.random() * 6 ) + 1;
        


        // 2 . display the result
        var diceDOM = document.querySelectorAll('.dice');
        diceDOM[0].style.display = 'block';
        diceDOM[1].style.display = 'block';

    
        diceDOM[0].src = 'dice-' + dice + '.png';
        diceDOM[1].src = 'dice-' + dice2 + '.png';

       
        
        // 3. update the round if the roller number was not a 1
        if(prevDice === 6 && dice === 6){
            // player looses score
            alert('You lost the whole score')
            scores[activePlayer] = 0
            document.querySelector('#score-'+ activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !==  1 && dice2 !==  1 ){
            // add score
            
            roundScore += dice + dice2
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            nextPlayer()
        }
        prevDice = dice;
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
            //  add current score to global score
        scores[activePlayer] += roundScore;
        
        // update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        var input = document.querySelector('.final-score').value
        var winScore
        if(input){
                winScore = input
        } else {
            winScore = 100
        }

        // check if the player won the game

        if(scores[activePlayer] >= winScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelectorAll('.dice')[0].style.display = 'none';
            document.querySelectorAll('.dice')[1].style.display = 'none';

            document.querySelector('.player-'+ activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }
    

   
})

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelectorAll('.dice')[0].style.display = 'none'; 
    document.querySelectorAll('.dice')[1].style.display = 'none'; 

    


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    


}
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelectorAll('.dice')[0].style.display = 'none'; 
        document.querySelectorAll('.dice')[1].style.display = 'none'; 

}


