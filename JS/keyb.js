var inp = document.querySelector('.text');
var keyb = document.querySelector('#keyboard');

pushKeyStyle(keyb);
changeLenguage(keyb);
capsLock (keyb,'caps','case','shift');
capsLock (keyb,'shift-button','lang','shift');
focus(inp);

function pushKeyStyle(parent){
	var target;
	var intervalId;
	
	parent.addEventListener('mousedown',function func() {
		if(event.target.classList.contains('button')){
			target = event.target;
		}else if(event.target.closest('div').classList.contains('button')){
			target = event.target.closest('div');
		}
		
		if(target == undefined ){
			return;
		}

		intervalID = typeText(inp,target);	
		
		if(!target.classList.contains('caps')&&!target.classList.contains('shift-button')){
			target.classList.add('button-pushed');
			target.addEventListener('mouseleave', function func() {
			clearInterval(intervalID);
			clearInterval(intervalID + 1);
			this.classList.remove('button-pushed');
			this.removeEventListener('mouseleave',func);
			});
		}else if(target.classList.contains('shift-button')){
			var elem = this.getElementsByClassName('shift-button');
			for (var i = 0; i < elem.length; i++) {
				elem[i].classList.toggle('button-pushed');
			}
		}else{
			target.classList.toggle('button-pushed');
		}

		if (target.classList.contains('audio')) {
			var image = target.getElementsByTagName('img');
			for (var i = 0; i < image.length; i++) {
				image[i].classList.toggle('eng');
			}
		}
	});

	parent.addEventListener('mouseup',function () {
		clearInterval(intervalID);
		clearInterval(intervalID + 1);
		if(!target.classList.contains('caps')&&!target.classList.contains('shift-button')){
		target.classList.remove('button-pushed');
		}
	});
}

function changeLenguage(elem){
	var en = elem.querySelector('#en');
	en.addEventListener('mousedown',function(){
		var newSymb = elem.getElementsByClassName('symb');
		for (var i = 0; i < newSymb.length; i++) {
			changeKeySymbols(newSymb[i]);
		}
	});
}

function changeKeySymbols(key) {
	var symb = key.getElementsByClassName('lang');
	for (var i = 0; i < symb.length; i++) {
		symb[i].classList.toggle('eng');
		symb[i].classList.toggle('ru');
	}
}

function capsLock (parent,classEvent,classLetters,classShift) {
	var elem = parent.getElementsByClassName(classEvent);
	for (var i = 0; i < elem.length; i++) {
		elem[i].addEventListener('mousedown', function () {

		var letters = parent.getElementsByClassName(classLetters);
			for (var i = 0; i < letters.length; i++) {
				if(!letters[i].parentNode.hasAttribute('id')){
					letters[i].classList.toggle(classShift);
				}
			}
		});
	}
}

function typeText(elem,button) {
	var letter = button.getElementsByTagName('span');
	if(button.classList.contains('clearAll')){
		elem.value = '';
	}else if(button.classList.contains('backspace')){
		return holdBackspace(elem);
	}else if(button.classList.contains('tab')){
		return holdTabEnter('\t',elem);
	}else if(button.classList.contains('enter')){
		return 	holdTabEnter('\n',elem);
	}
	else{
		for (var i = 0; i < letter.length; i++) {
			if(letter[i].classList.contains('ru')&&!letter[i].classList.contains('shift')){
				return 	holdTabEnter(letter[i].innerHTML,elem);
			}
		}
	}
}

function holdTabEnter(sign,input){
	if(input.selectionEnd == input.value.length){
		input.value += sign;
	}else{
		var firstPart = input.value.slice(0,input.selectionEnd);
		var secondPart = input.value.slice(input.selectionEnd);
		var firstEditedPart = firstPart + sign;
		var res = firstEditedPart + secondPart;
		input.value = res;
		input.selectionEnd = firstEditedPart.length;
	}
	return setTimeout(function(){
		setInterval(function(){
			if(input.selectionEnd == input.value.length){
				input.value += sign;
			}else{
				var firstPart = input.value.slice(0,input.selectionEnd);
				var secondPart = input.value.slice(input.selectionEnd);
				var firstEditedPart = firstPart + sign;
				var res = firstEditedPart + secondPart;	
				input.value = res;
				input.selectionEnd = firstEditedPart.length;
			}
		},100);
	},1000);	
}

function focus(elem){
	elem.addEventListener('blur',function () {
		elem.focus();
	});
}

function holdBackspace(elem){
	if(elem.selectionEnd == elem.value.length){
		elem.value = elem.value.slice(0,-1);
	}else{
		var firstPart = elem.value.slice(0,elem.selectionEnd);
		var secondPart = elem.value.slice(elem.selectionEnd);
		var firstEditedPart = firstPart.slice(0,elem.selectionEnd - 1);
		var res = firstEditedPart + secondPart;
		elem.value = res;
		elem.selectionEnd = firstEditedPart.length;
	}
	return setTimeout(function(){
		setInterval(function(){
			if(elem.selectionEnd == elem.value.length){
				elem.value = elem.value.slice(0,-1);
			}else{
				var firstPart = elem.value.slice(0,elem.selectionEnd);
				var secondPart = elem.value.slice(elem.selectionEnd);
				var firstEditedPart = firstPart.slice(0,elem.selectionEnd - 1);
				var res = firstEditedPart + secondPart;
				elem.value = res;
				elem.selectionEnd = firstEditedPart.length;
			}
		},100);
	},1000);	
}
