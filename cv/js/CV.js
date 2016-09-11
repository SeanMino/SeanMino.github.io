	window.onload = function(){
 		var oCard = $('#card'),
 			oText = $('#text'),
 			works = $('#works'),
 			aBg = $('.bg'),
 			oNav = $('#nav'),
 			aTextContent = $('.textContent'),
 			aDistrict = $('.district');
 		var onOff = true;   //卡片第一张 开关
 		var allOnOff = true;  //控制卡片点击时 必须执行完 transition 后才可 继续执行
 		var mouseOnOff = true;
 		var goMoveOnoff = true;
 		var goMoveTimer = null;
		var strCard = '';
		var strText = '';
		var navLi = '';
		var json = [
			{
				pic:"img/uikit.jpg",
				title:'1.PhoenixStartupUIkit首页',
				time:'June 2016',
				text:['1,页面动效主要运用css3 animation动画和源生js，利用js控制其动画展示位置，利用百分比实现全屏布局，部分结构使用了ES6技术','2,数据传输上，利用nodejs模拟搭建了简单的后台环境，利用ajax请求数据，渲染弹出层页面。'],
				link:'https://SeanMino.github.io/cv/uikit/public/index.html'
			},{
				pic:"img/soueasy.jpg",
				title:'2.SouEasy图书电影搜索',
				time:'March 2016',
				text:['1,自己设计做的一个简易电影图书搜索页,可以方便的搜索图书和电影','2,页面布局主要运用bootstrap布局，结合@media媒体查询可以响应移动端。','3,数据传输和功能实现，使用Jquery getJSON请求豆瓣公开图书和电影搜索API接口，结合templateJS模板引擎渲染页面。'],
				link:'https://SeanMino.github.io/cv/soueasy/index.html'
			},{
				pic:"img/weiyun.jpg",
				title:'3.模拟微云文件夹操作',
				time:'June 2015',
				text:['1,用源生js实现的文件夹操作：新建，重命名，删除，全选，框选，拖拽，面包屑导航，树形菜单','2,数据使用json对象模拟,以“id和父id”实现数据结构的需求处理,对自己的数据结构处理、编程逻辑有很好的锻炼'],
				link:'https://SeanMino.github.io/cv/weiyun/index.html'
			},{
				pic:"img/less.jpg",
				title:'4.less 移动端布局demo',
				time:'October 2015',
				text:['1,根据不同设备设置动态像素比，设置根字体大小，单位“rem”','2,然后在less文件中设置@rem：根字体大小rem，可以省去计算步骤，提高开发效率'],
				link:'https://SeanMino.github.io/cv/less/index.html'
			},{
				pic:"img/1haodian1.jpg",
				title:'5.一号店移动端',
				time:'May 2015',
				text:['1,根据不同设备设置动态像素比，设置根字体大小，单位“rem”','2,主要使用定位、浮动完成基本页面布局'],
				link:'https://SeanMino.github.io/cv/1haodian1/index.html'
			},{
				pic:"img/1haodian.jpg",
				title:'6.一号店pc端',
				time:'May 2015',
				text:['布局主要运用浮动和定位实现,兼容ie低版本'],
				link:'https://SeanMino.github.io/cv/1haodian/index.html'
			},{
				pic:"img/uehtml.jpg",
				title:'7.响应式布局',
				time:'August 2015',
				text:['1,使用定位、浮动等原理完成基本页面布局','2,主要通过媒体查询根据设备不同窗口大小来控制页面结构变化'],
				link:'https://SeanMino.github.io/cv/uehtml/index.html'
			}
		];
		var Prompt = ['首页','教育','工作/技能','作品','联系方式']
		//自适屏幕应宽度
		for (var j = 0; j < aTextContent.length ; j++){
			aTextContent[j].style.marginTop = view().H/2 - aTextContent[j].clientHeight/2 - 20 + 'px';
		};
		window.onresize = function(){
			oNav.style.top = view().H/2 - oNav.offsetHeight/2 - 20 + 'px';
			for (var i = 0; i < aDistrict.length ; i++){
				var cleanW = view().W,
					cleanH = view().H;
				aDistrict[i].style.width = cleanW + 'px';
				aDistrict[i].style.height = cleanH + 'px';
			}
			for (var j = 0; j < aTextContent.length ; j++){
				aTextContent[j].style.marginTop = view().H/2 - aTextContent[j].clientHeight/2 + 'px';
			};
		};
		for (var i = 0; i < aDistrict.length ; i++){
			navLi += '<li><span>' + Prompt[i] + '</span></li>';
			aDistrict[i].style.position = 'absolute';
		}
		oNav.innerHTML = navLi;
		var aNavLi = $('li',oNav)
		oNav.style.top = (view().H/2 - oNav.offsetHeight/2) + 'px';
		function navfn(index){
			if( index === 3 ){
				goMoveOnoff = false;
			}
			for (var i = 0; i < aNavLi.length ; i++){
				aNavLi[i].style.background = '';	
			};
			aNavLi[index].style.background = '#EB2D2F';
		}
		navfn(0)
		// 导航事件 
		for (var i = 0; i < aNavLi.length ; i++){     
			aNavLi[i].index = i;
			aNavLi[i].onmouseover = function(){
				var obj = first(this);
				obj.style.display = 'block';
				obj.style.opacity = 1;
			}
			aNavLi[i].onmouseout = function(){
				var obj = first(this);
				obj.style.opacity = 0;
				obj.style.display = 'none';
				
			}
			aNavLi[i].onclick = function(){
				if( !mouseOnOff ) return;
				mouseOnOff = false;
				navfn(this.index)
				for (var j = 0; j < aNavLi.length ; j++){
					if( !aDistrict[this.index].style.left || parseFloat(aDistrict[this.index].style.left) === 0 ){
						if( j < this.index ){
							timeDoMove(aDistrict[j],{left:-aDistrict[0].clientWidth},600,'easeIn',function(){
								setTimeout(function(){
									mouseOnOff = true;
								},30)
							});
							first(aDistrict[j]).style.opacity = 1;
						}
					}else{
//						aDistrict[this.index].style.left = -aDistrict[0].clientWidth + 'px';
						
						if( j >= this.index ){

							first(aDistrict[j]).style.transition = '1.6s';
							first(aDistrict[j]).style.opacity = 0;
							timeDoMove(aDistrict[j],{left:0},250,'easeIn',function(){
								setTimeout(function(){
									mouseOnOff = true;
								},30)
							});
							first(aDistrict[j]).style.transition = '.4s';
						}
					}
				};
			}
		};
		// 滚轮滚动
		for (var i = 0; i < aDistrict.length ; i++){ 
			(function(n){
				aDistrict[n].style.width = view().W + 'px';
				aDistrict[n].style.height = view().H + 'px';
				aDistrict[n].style.zIndex = (aDistrict.length*5 - n);
				
				function mousewheel(){
					aDistrict[n].onmousewheel = mousewheelfn;
//					if( aDistrict[n].addEventListener ){
						aDistrict[n].addEventListener( 'DOMMouseScroll',mousewheelfn,false );
//					}
					function mousewheelfn(ev){
						var e = ev || event;
						var _this = this;
						if( !mouseOnOff ) return;
						mouseOnOff = false;
						var direction = true;
						if( e.wheelDelta ){
							direction = e.wheelDelta > 0 ? true : false;
						}else{
							direction = e.detail < 0 ? true : false;
						}
						if( direction ){ //left
							if( prev(this) ){
								navfn(n-1)
								prev(this).style.left = -this.clientWidth+ 'px';
								prev(this).style.width = view().W + 'px';
								prev(this).style.height = view().H + 'px';
								timeDoMove(prev(this),{left:0},250,'easeIn',function(){
									setTimeout(function(){
										mouseOnOff = true;
									},500)
									first(prev(_this)).style.transition = '.4s';
								})
								first(prev(this)).style.transition = '1.6s';
								first(prev(this)).style.opacity = 0;
							}else{
								mouseOnOff = true;
								
							}
							
						}else{    //right
							if( next(this) && next(this).nodeName === 'DIV'){
								
								navfn(n+1)
								next(this).style.width = view().W + 'px';
								next(this).style.height = view().H + 'px';
								timeDoMove(this,{left:-this.clientWidth},600,'easeIn',function(){
									setTimeout(function(){
										mouseOnOff = true;
									},500)
								})
								first(this).style.opacity = 1;
							}else{
								
								navfn(0)
								aDistrict[0].style.left = -aDistrict[0].clientWidth + 'px';
								first(aDistrict[0]).style.opacity = 0;
								first(aDistrict[0]).style.transition = '1.6s';
								aDistrict[0].style.width = view().W + 'px';
								aDistrict[0].style.height = view().H + 'px';
								timeDoMove(aDistrict[0],{left:0},250,'easeIn',function(){
									for (var i = 0; i < aDistrict.length  ; i++){
										aDistrict[i].style.left = 0 + 'px';
										aBg[i].style.opacity = 0;
										
									};
									setTimeout(function(){
										mouseOnOff = true;
									},500)
									first(aDistrict[0]).style.transition = '.4s';
								})
								
							}
						}
						if( e.preventDefault ){
							e.preventDefault()
						}
						e.returnValue = false;  //ie下组止默认行为
					};
				};
				mousewheel();
			})(i)
		};
		//监控作品区域显示
		goMoveTimer = setInterval(function(){
			if( !goMoveOnoff ){
				goMove();
				clearInterval(goMoveTimer);
			}
		},30);
		function goMove(){
			//作品内容自动生成
			function workContent(){
				for (var i = 0; i < 14 ; i++){
					strCard += '<div><span style="background-image:url(' + json[i%7].pic + ')"></span></div>';
				};
				for (var i = 0; i < json.length ; i++) {
					strText += '<div class="content"><h1>';
						if( json[i].title ){
							for (var j = 0; j < json[i].title.length ; j++) {
								strText += '<span>' + json[i].title.charAt(j) + '</span>';
							};
						}
					strText +='</h1><p>' + json[i].time + '</p>';
						if( json[i].text ){
							for (var j = 0; j < json[i].text.length ; j++) {
								strText += '<h3>' + json[i].text[j] + '</h3>';
							};
						}
					strText +='<a target="_blank" href="' +json[i].link +'"></a></div>';
				};
			}
			//作品中的切换
			function awork(){
				workContent();
				oText.innerHTML = strText;
				oCard.innerHTML = strCard;                                          
				var aContent = $('.content',oText);
				//文字说明的默认样式
				function textClear(){
					for (var i = 0; i < aContent.length ; i++){
						aContent[i].style.display = 'none';
						var aSpan =$('span',first(aContent[i])),
							aP =$('p',aContent[i])[0],
							aH3 =$('h3',aContent[i]),
							aA =$('a',aContent[i])[0];
						for (var j = 0; j < aSpan.length ; j++){
							aSpan[j].style.top = '-50px'
						};
						aP.style.opacity = 0;
						for (var j = 0; j < aH3.length ; j++){
							aH3[j].style.top = '30px';
							aH3[j].style.opacity = 0;
						};
						setTimeout(function(){
							timeDoMove(aA,{left:30,opacity:1},1000,'linear');
						},300)
						aA.style.left = '60px';
						aA.style.opacity = 0;
					}
				}
				//文字说明切换效果
				function textMove(num){ // 参数 num 表示 显示第几组 
					
					aContent[num].style.display = 'block';
					var aSpan =$('span',first(aContent[num])),
						aP =$('p',aContent[num])[0],
						aH3 =$('h3',aContent[num]),
						aA =$('a',aContent[num])[0];
					aA.style.transition = '';
					for (var j = 0; j < aSpan.length ; j++){
						(function (n){
							setTimeout(function(){
								doMove(aSpan[n],'top',6,20,function(){
									doMove(aSpan[n],'top',4,2)
								})
							},50*j)	
						})(j)
					};
					timeDoMove(aP,{opacity:1},3000,'linear');
					for (var j = 0; j < aH3.length ; j++){
						(function (n){
							setTimeout(function(){
								timeDoMove(aH3[n],{opacity:1,top:0},1000,'linear');
							},500*j)	
						})(j);

					};
					setTimeout(function(){
						timeDoMove(aA,{left:30,opacity:1},1000,'linear');
					},300);
					//鼠标移入链接效果
					aA.onmouseover = function(){
						clearInterval(oCard.cardTimer);
						aA.style.transition = '.5s';
						oCard.cardTimer = null;
					}
					aA.onmouseout = function(){
						cardMovePlay(oCard);
					}
				}
				textMove(0);
				for (var i = 0; i < oCard.children.length ; i++){
					oCard.children[i].style.zIndex = oCard.children.length*100 - i;
					oCard.children[i].className = 'go6';
					oCard.children[i].style.opacity = '0.1';
					oCard.children[i].style.transition = '1s';
				};
				setTimeout(function (){
					for (var i = 0; i < oCard.children.length ; i++){
						oCard.children[i].style.opacity = '1';
						if( i < 6 ){
							oCard.children[i].className = 'go'+i;
						}else{
							oCard.children[i].className = 'go6';
						}
						oCard.children[i].abc = i%7;
					};
				},400);
				setTimeout(function (){
					for (var i = 0; i < oCard.children.length ; i++){
						oCard.children[i].style.transition = '.5s';
					};
				},2500);
				//卡片点击
				function cardFn(){
					oCard.onclick = function(ev){
						ev = ev || event;
						clearInterval(oCard.cardTimer);
						oCard.cardTimer = null;
						for (var i = 0; i < oCard.children.length ; i++) {
							oCard.children[i].number = i;
						};
						if( ev.target.parentNode.number === 0 ){
							if( onOff ){
								onOff = false;
								oCard.children[0].style.left = '250px';
								first(oCard.children[0]).style.transform = 'rotateY(0deg) ';
								
							}else{
								onOff = true;
								oCard.children[0].style.left = '350px';
								first(oCard.children[0]).style.transform = 'rotateY(35deg)';
							}
						}
							if( !allOnOff || !onOff) return;
							allOnOff = false;
							cardMove(ev.target.parentNode.number);
							oCard.children[0].addEventListener("transitionend", function(){
								allOnOff = true;
							})
							setTimeout(function(){
								cardMovePlay(oCard);
							},4000)
						
						
					}
				}
				cardFn()
				//卡片自动轮播
				function cardMovePlay(obj){
					if( obj.cardTimer ) return;
					obj.cardTimer = setInterval(function(){
						cardMove(1);
					},10000)
				}
				cardMovePlay(oCard);
				//卡片切换效果
				function cardMove(number){
					if( !onOff ) return;
					if( number != 0 ){
						var abc = oCard.children[number].abc;
						textClear();
						console.log(abc)
						textMove(abc);
					}
					
					var mars =  oCard.children;
					var n = 0;
					var m = 100;
					var arr = [];
					var arr1 = []
					mars[number].className = 'go0';
					mars[number].style.zIndex = m;
					for (var i = 0; i < mars.length ; i++) {
						m = m -10;
						mars[i].style.zIndex = m;
						if( i > number ){
							n = n + 1;
							if( n > 6 ) n = 6;
							mars[i].className = 'go' + (n);
						}else if( i < number ){
							mars[i].className = 'go6';
							var newDiv = mars[i].cloneNode(true);
							newDiv.abc = mars[i].abc;
							arr.push(newDiv);
							arr1.push(mars[i])
						};
					};
					for (var i = 0; i < arr.length ; i++) {	
						arr[i].style.zIndex = m;
						oCard.removeChild(arr1[i]);
						oCard.appendChild(arr[i]);
					};
				};
			}
			awork();
		}
	}