$('section .life_c ul li img,section .life_c3 li img').hover(function() {
	$(this).css({'transform':'scale(1.1)','transition':'all .6s'});
}, function() {
	$(this).css({'transform':'scale(1)','transition':'all .6s'});
});