$('nav ul li').click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	if($(window).width()>991){
		$(this).parents().css('height', '80px');
	}
});

// 屏幕缩小时，点击nav_r2，nav_c切换
$('.nav_r2').click(function(event) {
	$(this).children('.span1').toggleClass('click_span1');
	$(this).children('.span2').toggle();
	$(this).children('.span3').toggleClass('click_span3');
	$('.nav_c').toggle();
	$('nav').css('background', 'black');
});

//屏幕伸缩就会触发
$(window).resize(function(event) {
	if($(window).width()>992){
		$('.nav_c').show();
	}
});

$('.content .l_top ul li').hover(function() {
	$(this).css('transform', 'scale(1.1)');
}, function() {
	$(this).css('transform', 'scale(1)');
});

$('.content .l_cons .cons_l').hover(function() {
	$(this).children().css('transform', 'scale(1.1)');
}, function() {
	$(this).children().css('transform', 'scale(1)');
});