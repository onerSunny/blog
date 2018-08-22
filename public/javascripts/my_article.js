// 点击删除
function del(a){
	$.ajax({
		url:'/delArticle',
		method:'get',
		dataType:'json',
		data:{
			index:$(a).siblings('span').eq(0).html()
		},
		success:function(res){
			location.href='http://localhost:3000/findArticle';
		}
	})
}
