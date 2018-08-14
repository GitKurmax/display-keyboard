var inp = document.querySelector('.text');
var keyb = document.querySelector('#keyboard');

pushKeyStyle(keyb);
changeLenguage(keyb);
capsLock (keyb,'caps','case','shift');
capsLock (keyb,'shift-button','lang','shift');
		
function pushKeyStyle(parent){
	parent.addEventListener('mousedown',function func() {
		var target;
		if(event.target.classList.contains('button')){
			target = event.target;
		}else if(event.target.closest('div').classList.contains('button')){
			target = event.target.closest('div');
		}
		
		if(target == undefined){
			return;
		}
		
		if(!target.classList.contains('caps')&&!target.classList.contains('shift-button')){
			target.classList.add('button-pushed');
			target.addEventListener('mouseleave', function func() {
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
		var target;
		if(event.target.classList.contains('button')){
			target = event.target;
		}else if(event.target.closest('div').classList.contains('button')){
			target = event.target.closest('div');
		}

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