var word_game = function(){
var letterList = '<ul id="wg_letter_box">'+
                    '<li>a</li>' +
                    '<li>b</li>' +
                    '<li>c</li>' +
                    '<li></li>' +
                    '<li></li>' +
                    '<li></li>' +
                    '<li></li>' +
                    '<li></li>' +
                    '<li></li>' +
                    '<li></li>' +
                  '</ul>';
var gameContainer;
var wordGameObject = {
    init : function(id){
        gameContainer = document.getElementById(id);
        gameContainer.innerHTML = letterList;
    },

};

return wordGameObject;
}
