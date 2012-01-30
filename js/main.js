window.onload = function(){
    var wordGame = word_game();
    wordGame.loadDictionary('dictionary.txt', function(){
        wordGame.init('wordGameContainer');
    });
}
