$(function(){
	//获取音频标签 要转成dom对象
	var audio = $('audio')[0];
	//1.点击按钮切换类名
	$('.head-wrap .music').click(function(){
		$(this).toggleClass('pause');
		//3.判断当前是否是播放
		//如果有类名就暂停
		if($(this).hasClass('pause')){
			audio.pause();
		}else{
			//否则就播放
			audio.play();
		}
	});
})
