	/*1. 阻止页面上所有的链接跳转
	2. 阻止页面的系统菜单
	3. 阻止页面上的文字选中
	4. 阻止页面上的滚动条滑动
	5. 阻止页面上的橡皮筋效果*/
document.addEventListener(
	"touchstart",
	function(e) {
		e.preventDefault();
	}
);
window.onload = function() {
	var timer = null;
	var wrap = document.querySelector(".banner_box");
	var list = document.querySelector(".banner");
	var navs = document.querySelectorAll(".banner_box .dotted a");
	var startPoint = 0;
	var startY = 0;
	var translateX = 0;
	list.innerHTML += list.innerHTML;
	 wrap.addEventListener(
	 	"touchstart",
		function (e){
			list.style.transition = "none";
			var now = -Math.round(translateX / wrap.clientWidth);
			if(now == 0) {
				now = navs.length;
			}
			if(now == navs.length*2-1) {
				now = navs.length-1;
			}
			translateX = -now*wrap.clientWidth;
			list.style.WebkitTransform = list.style.transform = "translate3d("+translateX+"px,0,0)";
			startPoint = e.changedTouches[0].pageX;
			startX = translateX;
		}
	 );
	 wrap.addEventListener(
	 	"touchmove",
		function (e){
			var nowPoint = e.changedTouches[0].pageX;
			var dis = nowPoint - startPoint;
			translateX = startX + dis;
			list.style.WebkitTransform = list.style.transform = "translate3d("+translateX+"px,0,0)";
		}
	 );
	  wrap.addEventListener(
	 	"touchend",
		function (){
			var now = -Math.round(translateX / wrap.clientWidth);
			translateX = -now*wrap.clientWidth;
			list.style.transition = ".3s";
			list.style.WebkitTransform = list.style.transform = "translate3d("+translateX+"px,0,0)";
			for(var i = 0; i < navs.length;i++){
				navs[i].className = "";
			}
			navs[now%navs.length].className = "active";
		}
	);
	var contentWrap = document.getElementsByClassName('content_wrap')[0];
	console.log(contentWrap)
	var wrapScroll = new MScroll(
	 	{
			element: contentWrap,
			showBar: true,
			dir: "y" 
		}
	);
	wrapScroll.iScroll.y = -400; //修改iScroll之后，必须用 setTranslate() 或者 move()同步一下位置
	//wrapScroll.setTranslate(); 
	wrapScroll.scrollYBar.style.background = "rgba(20,30,25,0.3)";
	wrapScroll.move(); 
	
};