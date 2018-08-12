var inp = document.querySelector('.text');
var keyb = document.querySelector('#keyboard');

pushKeyStyle(keyb);
changeLenguage(keyb);
		
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
		
		if(!target.classList.contains('caps')){
			target.classList.add('button-pushed');
			target.addEventListener('mouseleave', function func() {
			this.classList.remove('button-pushed');
			this.removeEventListener('mouseleave',func);
			});
		}else{
			target.classList.toggle('button-pushed');
		}
		});


	parent.addEventListener('mouseup',function () {
		var target;
		if(event.target.classList.contains('button')){
			target = event.target;
		}else if(event.target.closest('div').classList.contains('button')){
			target = event.target.closest('div');
		}
		
		if(event.target.classList.contains('button')){
			event.target.classList.remove('button-pushed');
		}else if(event.target.closest('div').classList.contains('button')){
			event.target.closest('div').classList.remove('button-pushed');
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