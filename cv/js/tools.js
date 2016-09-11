
function $(selector,content){
	var firstChar = selector.charAt(0);
	content = content || document;
	if( firstChar === '#' ){
		return document.getElementById(selector.slice(1));
	}else if(  firstChar === '.'  ){
		var allElement = document.getElementsByTagName('*');
		var arr =[];
		for( var i = 0; i < allElement.length ; i++ ){          
			 var classname = allElement[i].className;
			 var classArr = classname.split(' ');	
			 for( var j = 0; j < classArr.length ; j++ ){  
			 	if( classArr[j] == selector.slice(1) ){	
			 		arr.push( allElement[i] );          
			 		break;     
			 	}
			 }
		};
		return arr; 
	}else{
		return content.getElementsByTagName(selector);
	}
}
//获取样式
function getStyle(obj,attr){     
	if( obj.currentStyle ){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
};
//封装函数 设置参数     控制对象、控制属性、速度、最终值、达到最终值运行的函数
function doMove(obj,attr,speed,target,callBack){ 
	if( obj.moveTimer ) return;	
	var num = parseFloat( getStyle( obj,attr ) );
	speed = num > target ? -Math.abs(speed) : Math.abs(speed);
	obj.moveTimer = setInterval(function(){
		num += speed;
		if(Math.abs(target-num) <= Math.abs(speed)){
			num = target;
			clearInterval(obj.moveTimer);
			obj.moveTimer = null;
			obj.style[attr] = num + 'px';			
			(typeof callBack === "function") && callBack(); 
		}else{
			obj.style[attr] = num + 'px';
		}
	},30)
}
// 运动元素、  运动的属性(对象)、 运动时间、 贝塞尔曲线、  最后执行函数 
function timeDoMove(obj,json,d,fx,callBack){     
	if(obj.timer)return;
	if( typeof fx === 'function' ){
		callBack = fx;
		fx = 'linear'
	} 
	fx = fx || 'linear';
	var jsonArr = {};
	for( var attr in json ){
		jsonArr[attr] = {};
		jsonArr[attr].s = parseFloat(getStyle(obj,attr));
		jsonArr[attr].c = json[attr] - jsonArr[attr].s;
	};
	var time = new Date().getTime();
	obj.timer = setInterval(function(){
		var t = new Date().getTime() - time;
		for( var attr2 in json ){ 
	 		var value = Tween[fx](t,jsonArr[attr2].s,jsonArr[attr2].c, d);
	 		if( attr2 === "opacity" ){
	 			obj.style.opacity = value;
	 			obj.style.filter = "alpha(opacity="+value*100+")";
	 		}else{
	 			obj.style[attr2] = value + "px";
	 		}
	 	}
	 	if( t >= d ){
	 		t = d;
	 		for( var attr2 in json ){
		 		if( attr2 === "opacity" ){ 
		 			obj.style.opacity = json[attr2];
		 		}else{
		 			obj.style[attr2] = json[attr2] + "px";
		 		}
		 	}
	 		clearInterval(obj.timer);
	 		obj.timer = null;
	 		( typeof callBack === 'function' ) && callBack();
	 	}
	},16)

}
//抖动
function shake(obj,attr,speed,callBack){                           
	if(obj.timer) return;
	var n = 0;
	var arr = [];
	for( var i = speed; i>0 ; i -= 3){
		arr.push(-i,i)         
	}
	arr.push(0);
	var num = parseFloat(getStyle(obj,attr));
	obj.timer = setInterval(function(){
		obj.style[attr] = num + arr[n] + 'px';
		n++;
		if( n > arr.length-1 ){           
			clearInterval( obj.timer );
			obj.timer = null;
			if( typeof callBack === 'function' ){
				callBack();
			};
		}
	},30)
};
function futurefun(timeStr){
	var now = new Date();
	var future = new Date(timeStr);

	var time = (future.getTime() - now.getTime())/1000;

	var Day = Math.floor(time/86400);
	var Hour = Math.floor(time%86400/3600);
	var Minute = Math.floor(time%86400%3600/60);
	var Second = Math.floor(time%60);
	var onOff = true;
	if( time <= 0 ) onOff = false;
	var json = {
		D:Day,
		H:Hour,
		Min:Minute,
		S:Second,
		onOff:onOff
	}
	return json;
};
function two(m){
	if(m<0) return m;
	if( m >= 10 ){
		return m;
	}else{
		return '0' + m;
	}
};
function first(element){
	var firstElement = element.firstElementChild || element.firstChild;
	if( !firstElement || firstElement.nodeType !== 1 ){
		return null;
	}else{
		return firstElement;
	}
}
function last(element){
	var lastElement = element.lastElementChild || element.lastChild;
	if( !lastElement || lastElement.nodeType !== 1 ){
		return null;
	}else{
		return lastElement;
	}
}
function next(element){
	var nextElement = element.nextElementSibling || element.nextSibling;
	if( !nextElement || nextElement.nodeType !== 1 ){
		return null;
	}else{
		return nextElement;
	}
}
function prev(element){
	var prevElement = element.previousElementSibling || element.previousSibling;
	if( !prevElement || prevElement.nodeType !== 1 ){
		return null;
	}else{
		return prevElement;
	}
}
function removeClass(obj,classNames){
	if( obj.className === '' ) return;
	var classArr = obj.className.split(' ');
	for( var j = 0; j < classArr.length ; j++ ){
		if( classNames === classArr[j] ){
			classArr.splice(j,1);
			j--;
		}
	}
	obj.className = classArr.join(' ');
}
function addClass(obj,classNames){
	if( !obj.className ){
		obj.className = classNames;
		return;
	}
	var classArr = obj.className.split(' ');
	for( var j = 0; j < classArr.length ; j++ ){
		if( classNames === classArr[j] ) return;
	};
	obj.className += ' ' + classNames;
}
function getOffset(obj){
	var left = 0;
	var top = 0;
	var left1 = parseInt(getStyle(obj,'borderLeftWidth')) || 0;
	var top1 = parseInt(getStyle(obj,'borderTopWidth')) || 0;
	while( obj ){
		left += obj.offsetLeft;
		top += obj.offsetTop;
		left += parseInt(getStyle(obj,'borderLeftWidth')) || 0;
		top += parseInt(getStyle(obj,'borderTopWidth')) || 0;
		obj = obj.offsetParent;
	}
	return {
		left:left-left1,
		top:top-top1
	};
}
function view(){
	return {
		W:document.documentElement.clientWidth,
		H:document.documentElement.clientHeight
	}
};
function scrollT(){
	return document.body.scrollTop || document.documentElement.scrollTop;
};
function bind( obj,evName,eventFn){
	if( obj.addEventListener ){
		obj.addEventListener(evName,eventFn,false)
	}else{
		obj.attachEvent('on'+evName,function (){
			eventFn.call(obj)
		})
	}
}

function unbind(obj,evName,eventFn){
	if( obj.addEventListener ){
		obj.removeEventListener(evName,evevFn,false)
	}else{
		obj,detachEvent('on' + evName,evenFn)
	}
}
function ajax(options){
	var obj = {                    
		method:options.method || 'get', 
		url:options.url ,				
		data:options.data || '',   
		success:options.success || null, 
		fail:options.fail || null,
		datetype:options.datetype || ''
	};                			
	if( obj.url === '' ) return;
	var xhr = null;
	if( window.XMLHttpRequest ){   				//处理 IE6  下 兼容问题(IE6 不存在 XMLHttpRequest )
		xhr = new XMLHttpRequest();
	}else{
		xhr = ActiveXObject("Microsoft.XMLHTTP");
	}

	if( obj.method.toLowerCase() === 'get' ){            		//如果是 get 请求 加入 search 值
		obj.url = obj.url+ '?' + obj.data;
	}

	xhr.open(obj.method,obj.url,true);  		//准备数据

	if( typeof xhr.onload !== "undefined" ){
		xhr.onload = function(){
			fn();
		}
	}else{
		xhr.onreadystatechange = function(){
			if( xhr.readyState === 4 ){
				fn();
			}
		}
	}

	if(  obj.method.toLowerCase() !== 'get' ){            	//如果是 post 请求 加入 头部信息 同事 send() 中传入 请求内容
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{
		xhr.send();
	}

	function fn(){
		if( xhr.status === 200 ){
			var data = null;
			if( obj.datetype.toLowerCase() === 'json' ){
				data = JSON.parse( data );
			}else if( obj.datetype.toLowerCase() === 'xml' ){
				data = xhr.responseXML;
			}else{
				data = xhr.responseText;
			}
			typeof obj.success === 'function' && obj.success(xhr.status,data);
		}else{
			typeof obj.fail === 'function' && obj.fail(xhr.status);
		}

	}
};
/*
* t : time 已过时间
* b : begin 起始值
* c : count 总的运动值
* d : duration 持续时间
*
* 曲线方程
*
* http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html
* */

//Tween.linear();

var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
function mousewheelfn(ev){
	var e = ev || event;
	var direction = true;
	if( e.wheelDelta ){
		direction = e.wheelDelta > 0 ? true : false;
	}else{
		direction = e.detail < 0 ? true : false;
	}
	if( direction ){
		if( typeof callBack1 === 'function' ){
			callBack1();
		};
	}else{
		if( typeof callBack2 === 'function' ){
			callBack2();
		};
	}
	if( e.preventDefault ){
		e.preventDefault()
	}
	e.returnValue = false;
}