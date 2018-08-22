$('nav ul li').click(function(event) {
	$(this).addClass('current').siblings().removeClass('current');
	if($(window).width()>991){
		$(this).parents().css('height', '80px');
	}
});

// 鼠标移入nav_c_study和nav_c_life
$('.nav_c_study,.nav_c_life').hover(function() {
	// 如果窗口宽度>991，就show，而且高度为80px
	if($(window).width()>991){
		$(this).css('height', '80px');
		$(this).children('ol').show(400);
	}
},function(){
	if($(window).width()>991){
		$(this).css('height', '50px');
		$(this).children('ol').hide(400);
	}
});

// 屏幕缩小时，点击nav_r2，nav_c切换
$('.nav_r2').click(function(event) {
	$(this).children('.span1').toggleClass('click_span1');
	$(this).children('.span2').toggle();
	$(this).children('.span3').toggleClass('click_span3');
	$('.nav_c').toggle();
});
//屏幕伸缩就会触发
$(window).resize(function(event) {
	if($(window).width()>992){
		$('.nav_c').show();
	}
});

//屏幕缩小时，点击nav_down
$('.nav_down').click(function(event) {  //绑定同一个类
	//1不在,则2可以toggle,2父亲200切换;2不在，则1可以toggle
	//1存在，则2单击1次，则1hide，2show，1父50，2父200;
	//2存在，则1单击1次，则2hide,1show，2父50，1父200;
	if($(window).width()<992){
		var temp=''+$(this).siblings('.nav_down').children('ol').attr('style');  //判断siblings的样式
		var temp1=''+$(this).attr('style')  //判断自己的样式
		if(temp.match('block')){  //如果siblings为block
			$(this).siblings('.nav_down').children('ol').slideUp();
			$(this).children('ol').slideDown();
			$(this).animate({"height":"200px"}, 400);
			$(this).siblings('.nav_down').animate({"height":"50px"}, 400);
		}else{  //如果自己为block
			$(this).children('ol').slideToggle()
			if(temp1.match('200'))
				$(this).animate({"height":"50px"}, 400);
			else
				$(this).animate({"height":"200px"}, 400);
		}
	}
	
});

// 自动切换
var n=0;
var timer;
function start(){
	clearInterval(timer);
	timer=setInterval(function(){
		n++;
		if(n>=3){
			n=0;
		}
		$('.show ul li').eq(n).fadeIn(400).siblings().fadeOut(400);
		$('.show ol li').eq(n).addClass('ol_current')
			.siblings().removeClass('ol_current');
	},3000)
}
start();

// 鼠标移入ul，左右的span有动画效果
$('.show .show_l').hover(function() {
	$('.show .left').animate({"left":"0px"}, 400);
	$('.show .right').animate({"right":"25px"}, 400);
	$('.show .left,.show .right').css('display','block');
}, function() {
	$('.show .left').animate({"left":"40px"}, 400);
	$('.show .right').animate({"right":"60px"}, 400);
	// 使用定时器，400ms后display:none;
	setTimeout(function(){
		$('.show .left,.show .right').css('display','none');
	},400);
});

// 点击ol li，图片切换
$('.show ol li').click(function(event) {
	n=$(this).index();
	$(this).addClass('ol_current').siblings().removeClass('ol_current');
	$('.show ul li').eq(n).fadeIn().siblings().fadeOut();
});

// 点击left，图片切换到上一张
$('.show .left').click(function(event) {
	n--;
	if(n<0){
		n=2;
	}
	$('.show ul li').eq(n).fadeIn().siblings().fadeOut();
	$('.show ol li').eq(n).addClass('ol_current').siblings().removeClass('ol_current');
});

// 点击right，图片切换到下一张
$('.show .right').click(function(event) {
	n++;
	if(n>2){
		n=0;
	}
	$('.show ul li').eq(n).fadeIn().siblings().fadeOut();
	$('.show ol li').eq(n).addClass('ol_current').siblings().removeClass('ol_current');
});

$('.con_l .pic img').hover(function() {
	$(this).css({'transform':'scale(1.2)','transition':'all .6s'});
}, function() {
	$(this).css({'transform':'scale(1)','transition':'all .6s'});
});

// con_r_con
$('.con_r_con').hover(function() {
	$(this).children('.hr').css('width', '70px');
}, function() {
	$(this).children('.hr').css('width', '50px');
});

$('.con_r_con .res li').hover(function() {
	$(this).css({'border-radius':'0px','text-shadow':'1px 1px 1px black'});
}, function() {
	$(this).css({'border-radius':'10px','text-shadow':'none'});
});


$('.con_r_con .atten li').hover(function() {
	$(this).children('.sp2').css('width', '120px');
}, function() {
	$(this).children('.sp2').css('width', '100px');
});
$('.con_r_con .atten .sp1').hover(function() {
	$(this).css('color', '#12aae8');
}, function() {
	$(this).css('color', '#555555');
});
$('.con_r_con .atten .sp2').hover(function() {
	$(this).siblings('.sp1').css('color', '#12aae8');
}, function() {
	$(this).siblings('.sp1').css('color', '#555555');
});
