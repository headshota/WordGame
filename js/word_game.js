/**
 * Word Game
 * Shota Bakuradze
 */
var word_game = function() {
	
	// letter list template
    var letterListHTML = '<ul id="wg_letter_box">' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '<li></li>' +
    '</ul>';

	// input textbox template
    var wordInputHTML = '<div id="wg_wordInputBox"><input id="wg_wordTextbox" type="text" /></div>';

    var Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //var Alphabet = {'a' : 1, 'b' : 1, 'c' : 1, 'd' : 1, 'e' : 1, 'f' : 1, 'g' : 1, 'h' : 1, 'i' : 1, 'j' : 1, 'k' : 1, 'l' : 1, 'm' : 1, 'n' : 1, 'o' : 1, 'p' : 1, 'q' : 1, 'r' : 1, 's' : 1, 't' : 1, 'u' : 1, 'v' : 1, 'w' : 1, 'x' : 1, 'y' : 1, 'z' : 1};
	var dictionary = {
        'cat': true,
        'dog': true,
        'rat': true,
        'bat': true,
        'sleep': true,
        'eat': true,
        'drink': true,
        'click': true,
        'rent': true,
        'net': true,
        'let': true,
        'lit': true
    };

	// cache gameContainer
    var gameContainer;
 	// store current letters in the letter list
    var letterList = [];
 	// store letter list container element
    var letterBox;
	// store letter list timer
    var letterTimer;
	// input textbox html element
    var wordTextbox;
    var inputLetters = [];

    
    function redraw() {
        for (var i = 0; i < letterBox.childNodes.length; i++) {
            letterBox.childNodes[i].innerHTML = '';
        }
        for (var i = 0; i < letterList.length; i++) {
            letterBox.childNodes[i].innerHTML = letterList[i];
        }
    }
    
    function findFirstEmptyCell() {
        var nodes = letterList.childNodes;

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].innerHTML == '') {
                return nodes[i];
            }
        }
        return null;
    }
	
    function generateRandomLetter() {
        var index = Math.floor(Math.random() * 25);
        var letter = Alphabet[index];
        return letter;
    }

    function startLetterTimer() {
        letterTimer = setTimeout(function() {
            if (letterList.length < 10) {
                letterList.push(generateRandomLetter());
                redraw();
            }
            clearTimeout(letterTimer);
            startLetterTimer();
        },
        6000);
    }

    function onWordTextboxKeyPress(e) {
        var event = e || window.event;
        var code = event.keyCode || e.which;
        var target = event.target || event.srcElement;
        if (code === 13) {
            processTextbox(target.value);
        }
    }

    function processTextbox(val) {
        var tmpArr = letterList;
        var word = checkLetterExistanceAndQuantity(val);
        if (word) {
            letterBox.value = '';
            if (checkWordAgainsDictionary(word)) {
                alert(word + ' is a correct word!!!');
            }
        }

        for (var i = 0; i < word.length; i++) {
            var letter = word.charAt(i);
            var index = letterList.indexOf(letter);
            letterList.splice(index, 1);
        }
        redraw();
    }

    function checkWordAgainsDictionary(word) {
        if (dictionary[word]) {

            return true;
        }

        return false;
    }

    function checkLetterExistanceAndQuantity(val) {
        var tmpArr = [];
        var word = '';
        for (var i = 0; i < letterList.length; i++) {
            tmpArr[i] = letterList[i];
        }
        for (var i = 0; i < val.length; i++) {
            var currLetter = val.charAt(i).toLowerCase();
            var index = tmpArr.indexOf(currLetter);
            if (index !== -1) {
                tmpArr.splice(index, 1);
                word += currLetter;
            } else {
                return false;
            }
        }

        return word;
    }

    var wordGameObject = {
	
		/** public method init, should be called to initialize the game **/
        init: function(id) {
            gameContainer = document.getElementById(id);
            gameContainer.innerHTML = letterListHTML + wordInputHTML;
            letterBox = document.getElementById('wg_letter_box');
            wordTextbox = document.getElementById('wg_wordTextbox');
            wordTextbox.onkeypress = onWordTextboxKeyPress;

            for (var i = 0; i < 10; i++) {
                letterList.push(generateRandomLetter());
            }
            redraw();
            startLetterTimer();
        }
    };

    return wordGameObject;
}
