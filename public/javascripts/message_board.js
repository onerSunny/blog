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


// 添加
function add(data){
	$('.com').eq(0).before(`
		<div  class="com">
			<span class="cid">${data._id}</span>
			<span class="cons">${data.con}</span>
			<span onclick="del(this)" class="del">X</span>
		</div>
	`)
	$('.tex').val('');
}
	
// 点击提交
$('.sub').click(function(event) {
	if($('.tex').val()==''){
		alert('请留言');
	}else{
		$.ajax({
			url:'/addList',
			method:'get',
			dataType:'json',
			data:{
				con:$('.tex').val(),
				types:$('.ctypes').html()
			},
			success:function(res){	
				add(res);
			}
		})
	}
});

// 点击删除
function del(a){
	$.ajax({
		url:'/delList',
		method:'get',
		dataType:'json',
		data:{
			index:$(a).siblings('span').eq(0).html()
		},
		success:function(res){
			location.href='http://localhost:3000/message_board';
		}
	})
}



