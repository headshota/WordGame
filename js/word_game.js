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

	// log element
	
	var logTmpl = '<div id="wg_logBox"></div>';
	
	var scoreTmpl = '<div id="wg_scoreBox"></div>';

    var Alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var Frequencies = [8.167, 1.492, 2.782, 4.253, 13.0001, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074]

    var cumFrequencies = [];

	var dictionary = []; 
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
	// letters in the input box;
    var inputLetters = [];
	// log html element
	var log;
	// score htmlElement
	var scoreElement;
	// store overal score;
	var userScore = 0;

    
    function redraw() {
        for (var i = 0; i < letterBox.childNodes.length; i++) {
            letterBox.childNodes[i].innerHTML = '';
        }
        for (var i = 0; i < letterList.length; i++) {
            letterBox.childNodes[i].innerHTML = letterList[i];
        }
    }
    

    function generateCumIndex() {
        var sum = 0;
        for(var i = 0; i < Frequencies.length; i++) {
            sum += Frequencies[i];
            cumFrequencies.push(sum);
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
        var index = Math.random() * 100;
        var i = 0;
        while(cumFrequencies[i] < index) {
            i++;
        }
        var letter = Alphabet[i];
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
            checkWordAgainsDictionary(word);
        }

        for (var i = 0; i < word.length; i++) {
            var letter = word.charAt(i);
            var index = letterList.indexOf(letter);
            letterList.splice(index, 1);
        }
        redraw();
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
		wordTextbox.value = '';
        return word;
    }
    
	function checkWordAgainsDictionary(word) {
        if (dictionary[word]) {
			calculateAndAsignScore(word);
            return true;
        }
        return false;
    }

	function calculateAndAsignScore(word){
		var score = word.length;
		userScore = userScore + score;
		renewScore();
		addLog(word + ': +' + score);
	}
	
	function renewScore(){
		scoreElement.innerHTML = 'score: ' + userScore;
	}
	
	function addLog(message){
		log.innerHTML = message + '<br>' + log.innerHTML;
	}
	
    var wordGameObject = {	
		/** public method init, should be called to initialize the game **/
        init: function(id) {
            gameContainer 			= document.getElementById(id);
            gameContainer.innerHTML = letterListHTML + wordInputHTML + logTmpl + scoreTmpl;
            letterBox 				= document.getElementById('wg_letter_box');
            wordTextbox 			= document.getElementById('wg_wordTextbox');
			log 					= document.getElementById('wg_logBox');
			scoreElement			= document.getElementById('wg_scoreBox');
            generateCumIndex();
			renewScore();
            wordTextbox.onkeypress 	= onWordTextboxKeyPress;
            for (var i = 0; i < 10; i++) {
                letterList.push(generateRandomLetter());
            }
            redraw();
            startLetterTimer();
        },
        loadDictionary : function(file, callback){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file, true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    var tmpArr = xhr.responseText.split('\n');
                    for(var i=0; i< tmpArr.length; i++){
                        dictionary[tmpArr[i]] = true;
                    }
                    //console.log(dictionary)
                    callback();
                }
            }
            xhr.send(null);
        }
    };

    return wordGameObject;
}
