var word_game = function(){
var letterListHTML = '<ul id="wg_letter_box">'+
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
var wordInputHTML = '<div id="wg_wordInputBox"><input id="wg_wordTextbox" type="text" /></div>';
var Alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var gameContainer;
var letterList = [];
var letterBox;
var letterTimer;
var wordTextbox;
var inputLetters = [];

function redraw(){	
	for(var i=0; i< letterBox.childNodes.length; i++){
		letterBox.childNodes[i].innerHTML = '';
	}
	for(var i=0; i< letterList.length; i++){
		letterBox.childNodes[i].innerHTML = letterList[i];
	}
}

function findFirstEmptyCell(){
	var nodes = letterList.childNodes;
	for(var i=0; i < nodes.length; i++){
		if(nodes[i].innerHTML == ''){
			return nodes[i];
		}
	}	
	return null;
}

function generateRandomLetter(){
	var index = Math.floor(Math.random() * 25);
	var letter = Alphabet[index];
	return letter;
}

function startLetterTimer(){	
	letterTimer = setTimeout(function(){
		if(letterList.length < 10){			
			letterList.push(generateRandomLetter());
			redraw();			
		}
		startLetterTimer();
	}, 6000);
}

function onWordTextboxKeyPress(e){
	var event = e || window.event;
	var code = event.keyCode || e.which;
	var target = event.target || event.srcElement;
	if(code === 13){		
		processTextbox(target.value);
	}
}


function processTextbox(val){
	var tmpArr = letterList;
	var word = checkLetterExistanceAndQuantity(val);
	if(word){		
		checkWordAgainsDictionary(word);
	}
	
	for(var i=0; i < word.length; i++){
		var letter = word.charAt(i);
		var index = letterList.indexOf(letter);
		letterList.splice(index, 1);
	}
	redraw();
}

function checkWordAgainsDictionary(word){
	//clearTimeout(letterTimer);
	//startLetterTimer();
	wordTextbox.value = '';
}

function checkLetterExistanceAndQuantity(val){
	var tmpArr  = [];
	var word = '';
	for(var i=0; i< letterList.length; i++){
		tmpArr[i] = letterList[i];
	}	
	for(var i=0; i < val.length; i++){		
		var currLetter = val.charAt(i).toLowerCase();
		var index = tmpArr.indexOf(currLetter);		
		if(index !== -1){						
			tmpArr.splice(index, 1);	
			word += currLetter;
		}else{	
			return false;
		}		
	}

	return word;
}

var wordGameObject = {
    init : function(id){
        gameContainer = document.getElementById(id);
        gameContainer.innerHTML = letterListHTML + wordInputHTML;
		letterBox = document.getElementById('wg_letter_box');
		wordTextbox = document.getElementById('wg_wordTextbox');		
		wordTextbox.onkeypress = onWordTextboxKeyPress;
		
		for(var i=0; i < 10; i++){
			letterList.push(generateRandomLetter());
		}
		redraw();
		startLetterTimer();
    }
};

return wordGameObject;
}
