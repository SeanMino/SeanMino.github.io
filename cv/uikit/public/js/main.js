(function(){
	//部分使用ECMAScript2015,使用严格模式
	'use strict';
	//获取浏览器宽高
	var screenHeight = window.innerHeight;
	var screenWidth = window.innerWidth;
	//当窗口大小变化时，动态获取窗口大小
	window.addEventListener('resize',resizeFn,false);
	function resizeFn(){
		screenHeight = window.innerHeight;
		screenWidth = window.innerWidth;
	}
	
	//模拟loading
//	//获取元素
	var pageWrap = tools.$('#page_wrap');
	var loadingWrap = tools.$('#loading_wrap');
	var loader = tools.$('#loader');
	var changeWrap = tools.$('#change_wrap');
	loader.style.height = screenHeight + 'px';
	var n = 0;
	var timer1 = null;
	timer1 = setInterval(function(){
		n +=2;
		tools.$('.process_text')[0].innerHTML = n + "%";
		if(n == 102){
			clearInterval(timer1);
			loadingWrap.style.display = 'none';
			changeWrap.style.animation = '1s changeWrap_move linear 1 forwards';
			loader.style.animation = '1.5s loader_move1 linear 1 1s forwards';
			pageWrap.style.display = 'block';
			document.body.style.overflowY = 'auto';
		}
	},100)
	
	
	//page_wrap
	var startScreen = tools.$('#start_screen');
	var introCard = tools.$('#start_screen .intro_card');
	startScreen.style.height = screenHeight + 'px';
	
	
	var introtoolScreen = tools.$('#introtool_screen');
	var introtoolH2 = tools.$('#introtool_screen h2')[0];
	var introtoolText = tools.$('.introtool_text')[0];
	var introtoolImg = tools.$('#introtool_screen img');
	
	var numberScreen = tools.$('#number_screen');
	var numberCardsBox = tools.$('.number_cards_box')[0];
	var numberItem = tools.$('.number_item');
	var numbersCard = tools.$('.numbers__card');
	var jsNumbersCard = tools.$('.js-numbers-card');
	numberCardsBox.style.height = 0.8*screenHeight+'px';
	
	var categoriesScreen = tools.$('#categories_screen');
	var categoriesTitle = tools.$('.categories__title')[0];
	var categoriesListItem = tools.$('.categories__list_item');
	var categoriesList = tools.$('.categories__list');
	var categoriesRow = tools.$('.categories__row');
	var categoriesCard = tools.$('#categories_screen img');
	var categoriesItemTitle = tools.$('.categories__item_title');
	var categoriesText = tools.$('.categories__text');
	for (var i = 0; i < categoriesRow.length; i++) {
		categoriesRow[i].style.height = 0.8*screenHeight+'px';
	}
	
	
	var previewScreen = tools.$('#preview_screen');
	var previewTitle = tools.$('.preview_title')[0];
	var previewText = tools.$('.preview_text')[0];
	var previewBtn = tools.$('.preview_btn')[0];
	
	var modernScreen = tools.$('#modern_screen');
	var pics = tools.$('.pic');
	var tandemTitles = tools.$('.tandem__title');
	var tandemDescriptions= tools.$('.tandem__description');
	var tandemFeaturesBoxs = tools.$('.tandem__features_box');
	
	var fluidScreen = tools.$('#fluid_screen');
	var exampleTitle = tools.$('.example_title')[0];
	var exampleList = tools.$('.example_list'); 
	//fluid screen根据模拟数据生成li
	for (var i = 0; i < exampleList.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			var img = document.createElement('img');
			img.src = data[i][j];
			var activeBg= document.createElement('div');
			activeBg.className = 'active_bg';
			var exampleListItem = document.createElement('li');
			exampleListItem.appendChild(img);
			exampleListItem.appendChild(activeBg);
			exampleList[i].appendChild(exampleListItem);
		}
		if(i==0 || i==2){
			exampleList[i].style.paddingTop = 0.15*screenHeight + 'px';
		}
	}
	
	//获取元素到根父级的距离
	function posTop(obj){
		var top = 0;
		while(obj){
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return top;
	}
	var exampleListItem = tools.$('.example_list li');
	
	var footer = tools.$('#footer');
	var purchaseBtnBox = tools.$('.purchase_btn_box')[0];
	var purchaseBtn = tools.$('.purchase__btn')[0];
	var purchaseTechs = tools.$('.purchase__techs')[0];
	var purchaseSampleLink = tools.$('.purchase__sample_link')[0];
	var certificateBox = tools.$('.certificate_box')[0];
	var certificateBoxText = tools.$('.certificate_box a');
	
	//获取元素到窗口的距离
	function top(obj){
		return obj.getBoundingClientRect().top;
	}
	function bottom(obj){
		return obj.getBoundingClientRect().bottom;
	}
	
	//绑定鼠标滚轮事件
	var drection = false;
	var lastscrollTop = 0;
	window.addEventListener('scroll',scrollFn, false);
	
	function scrollFn(){
//		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollTop = window.pageYOffset;
		drection = scrollTop > lastscrollTop? true:false;
		lastscrollTop = scrollTop;
//		scrollTop = 0;
		if(drection){
			//first screen
			startScreenDown();
			//second screen
			introtoolScreenDown();
			//third screen
			numberScreenDown();
			//forth screen
			categoriesScreenDown();
			//fifth screen
			previewScreenDown();
			//sixth screen
			modernScreenDown();
			//seventh screen
			exampleListItemDown()
			//eigth screen
			footerDown();
			
		}else{
			//first screen
			startScreenUp();
			//second screen
			introtoolScreenUp();
			//third screen
			numberScreenUp();
			//forth screen
			categoriesScreenUp();
			//fifth screen
			previewScreenUp();
			//sixth screen
			modernScreenUp();
			//seventh screen
			exampleListItemUp();
			//eight screen
			footerUp();
		
		}
		//first screent animation
		function startScreenDown(){
			if(bottom(startScreen) < 0.9*screenHeight){
				for (var i = 0; i < introCard.length; i++) {
					if(i == 1){
						introCard[i].style.animation = '2s intro_card_mousewheel1 linear 1 forwards,2s intro_card_left1 linear infinite alternate';
					}
					if(i == 2){
						introCard[i].style.animation = '2s intro_card_mousewheel1 linear 1 forwards,2s intro_card_top1 linear infinite alternate';
					}
					if(i == 3){
						introCard[i].style.animation = '2s intro_card_mousewheel1 linear 1 forwards,2s intro_card_top2 linear infinite alternate';
					}
					if(i == 4){
						introCard[i].style.animation = '2s intro_card_mousewheel1 linear 1 forwards,2s intro_card_left2 linear infinite alternate';
					}
					if(i == 5){
						introCard[i].style.animation = '2s intro_card_mousewheel1 linear 1 forwards,2s intro_card_top1 linear infinite alternate';
					}
				}
			}
		}
		function startScreenUp(){
			if(bottom(startScreen) > 0.5*screenHeight){
				for (var i = 0; i < introCard.length; i++) {
					if(i == 1){
						introCard[i].style.animation = '2s intro_card_mousewheel2 linear 1 forwards,2s intro_card_left1 linear infinite alternate';
					}
					if(i == 2){
						introCard[i].style.animation = '2s intro_card_mousewheel2 linear 1 forwards,2s intro_card_top1 linear infinite alternate';
					}
					if(i == 3){
						introCard[i].style.animation = '2s intro_card_mousewheel2 linear 1 forwards,2s intro_card_top2 linear infinite alternate';
					}
					if(i == 4){
						introCard[i].style.animation = '2s intro_card_mousewheel2 linear 1 forwards,2s intro_card_left2 linear infinite alternate';
					}
					if(i == 5){
						introCard[i].style.animation = '2s intro_card_mousewheel2 linear 1 forwards,2s intro_card_top1 linear infinite alternate';
					}
				}
			}
		}
		
		//second screen animation
		function introtoolScreenDown(){
			if(top(introtoolScreen)<0.9*screenHeight){
				introtoolH2.style.animation = '1s h2move1 linear 1 forwards,1s h2move11 linear 1 1s forwards';
				introtoolText.style.animation = '3s h2textmove1 linear 1 forwards';
				for (var i = 0; i < introtoolImg.length; i++) {
					introtoolImg[i].style.animation = '1s introtool_imgmove1 linear 1 forwards,1s introtool_imgmove11 linear 1 1s forwards';
				}
			}
		}
		function introtoolScreenUp(){
			if(bottom(introtoolScreen) > 0.9*screenHeight){
				introtoolH2.style.animation = '1s h2move2 linear 1 forwards';
				introtoolText.style.animation = '3s h2textmove2 linear 1 forwards';
				for (var i = 0; i < introtoolImg.length; i++) {
					introtoolImg[i].style.animation = '2s introtool_imgmove2 linear 1 forwards';
				}
			}
		}
		
		//third screen animation
		function numberScreenDown(){
			var n=0;
			if(top(numberScreen)< 0.8*screenHeight){
				for (var i = 0; i < numberItem.length; i++) {
					numberItem[i].style.animation = '1s number_itemmove1 linear 1 forwards';
				}
			}
			if(top(numberCardsBox)< 0.8*screenHeight){
				for (var i = 0; i < jsNumbersCard.length; i++) {
					n +=0.2
					jsNumbersCard[i].style.animation = '1s numbers__cardmove1 linear 2 '+n+'s alternate';
				}
			}
		}
		function numberScreenUp(){
			var n=0;
			if(top(numberScreen)>0.6*screenHeight){
				for (var i = 0; i < numberItem.length; i++) {
					numberItem[i].style.animation = '1s number_itemmove2 linear 1 forwards';
				}
			}
			if(bottom(numberCardsBox)> 0.8*screenHeight){
				for (var i = jsNumbersCard.length-1; i >= 0; i--) {
					n +=0.2
					jsNumbersCard[i].style.animation = '1s numbers__cardmove2 linear 2 '+n+'s alternate forwards';
				}
			}
		}
		
		//forth screen animation
		function categoriesScreenDown(){
			
			if(top(categoriesTitle) < 0.8*screenHeight){
				categoriesTitle.style.animation = '1s categoriesTitlemove1 linear 1 forwards';
				for (var i = 0; i < categoriesListItem.length; i++) {
					
					if(i<7){
						categoriesListItem[i].style.animation = '1s categorieslistleft1 linear 1 forwards';
					}else{
						categoriesListItem[i].style.animation = '1s categorieslistleft2 linear 1 forwards';
					}
					
				}
			}
			var m=0;
			for (var i = 0; i < categoriesCard.length; i++) {
				m +=0.1;
				if(top(categoriesCard[i]) < 0.8*screenHeight){
					if(i==0||i==5){
						categoriesCard[i].style.animation = '';
					}else{
						categoriesCard[i].style.animation = '1s categorieslistmove1 linear 2 '+m+'s alternate';
					}
				}
			}
			
			for (var i = 0; i < categoriesItemTitle.length; i++) {
				if(top(categoriesItemTitle[i]) < 0.8*screenHeight){
					categoriesItemTitle[i].style.animation = '1s categoriesItemtitlemove1 linear 1';
				}
				if(top(categoriesText[i]) < 0.8*screenHeight){
					categoriesText[i].style.animation = '1s categoriesTextmove1 linear 1 forwards';
				}
				 
			}
			
		}
		function categoriesScreenUp(){
			if(top(categoriesTitle) > 0.6*screenHeight){
				categoriesTitle.style.animation = '1s categoriesTitlemove2 linear 1 forwards';
				for (var i = 0; i < categoriesListItem.length; i++) {
					if(i<7){
						categoriesListItem[i].style.animation = '1s categorieslistleft11 linear 1 forwards';
					}else{
						categoriesListItem[i].style.animation = '1s categorieslistleft22 linear 1 forwards';
					}
					
				}
			}
			var m=0.2
			for (var i = 0; i < categoriesCard.length; i++) {
				m +=0.1;
				if(top(categoriesCard[i]) > 0.8*screenHeight){
					if(i==0||i==5){
						categoriesCard[i].style.animation = '';
					}else{
						categoriesCard[i].style.animation = '1s categorieslistmove2 linear 2 '+m+'s alternate forwards';
					}
				}
			}
			
			for (var i = 0; i < categoriesItemTitle.length; i++) {
				if(top(categoriesItemTitle[i]) > 0.6*screenHeight){
					categoriesItemTitle[i].style.animation = '1s categoriesItemtitlemove2 linear 1 forwards';
				}
				if(top(categoriesText[i]) > 0.6*screenHeight){
					categoriesText[i].style.animation = '1s categoriesTextmove2 linear 1 forwards';
				}
			}
		}
		
		
		//fifth screen animation
		function previewScreenDown(){
			if(top(previewScreen) < 0.8*screenHeight){
				previewTitle.style.animation = '2s previewtitlemove1 steps(30, start) 1 forwards';
				previewText.style.animation = '1s previewtextmove1 linear 1 forwards';
				previewBtn.style.animation = '1s previewtextmove1 linear 1 forwards';
			}
		}
		
		function previewScreenUp(){
			if(top(previewScreen) > 0.6*screenHeight){
				previewTitle.style.animation = '2s previewtitlemove linear 1 forwards';
				previewText.style.animation = '1s previewtextmove2 linear 1 forwards';
				previewBtn.style.animation = '1s previewtextmove2 linear 1 forwards';
			}
		}
		
		
		//sixth screen animation
		function modernScreenDown(){
			for (var i = 0; i < tandemTitles.length; i++) {
				if(top(tandemTitles[i]) < 0.8*screenHeight){
					tandemTitles[i].style.animation = '1s tandemTitlemove1 linear 1 forwards';
					tandemDescriptions[i].style.animation = '1s tandemTitlemove1 linear 1 forwards';
				}
				if(top(tandemFeaturesBoxs[i]) < 0.8*screenHeight){
					tandemFeaturesBoxs[i].style.animation = '1s tandemTitlemove1 linear 1 forwards';
				}
			}
			if(top(pics[1]) < 0.8*screenHeight){
					pics[1].style.animation = '2s picmove2 linear 1 forwards';
					pics[0].style.animation = '2s picmove1 linear 1 forwards';
			}
		}
		function modernScreenUp(){
			for (var i = 0; i < tandemTitles.length; i++) {
				if(top(tandemTitles[i]) > 0.7*screenHeight){
					tandemTitles[i].style.animation = '1s tandemTitlemove2 linear 1 forwards';
					tandemDescriptions[i].style.animation = '1s tandemTitlemove2 linear 1 forwards';
				}
				if(top(tandemFeaturesBoxs[i]) > 0.7*screenHeight){
					tandemFeaturesBoxs[i].style.animation = '1s tandemTitlemove2 linear 1 forwards';
				}
			}
			if(top(pics[1]) > 0.2*screenHeight){
					pics[1].style.animation = '2s picmove1 linear 1 forwards';
					pics[0].style.animation = '2s picmove2 linear 1 forwards';
			}
		}
		
		
		//seventh screen animation
		function exampleListItemDown(){
			for (var i = 0; i < exampleListItem.length; i++) {
				if(posTop(exampleListItem[i]) < screenHeight + scrollTop){
					exampleListItem[i].style.animation = '2s examplemove1 linear 1 forwards';
				}
			}
			if(0.6*screenHeight < top(fluidScreen) < screenHeight){
				exampleTitle.style.animation = '1.5s exampleTitlemove1 linear 1 forwards';
			}
		}
		
		function exampleListItemUp(){
			for (var i = 0; i < exampleListItem.length; i++) {
				if((posTop(exampleListItem[i]) + exampleListItem[i].offsetHeight > screenHeight + scrollTop) && (posTop(exampleListItem[i]) < screenHeight + scrollTop)){
					exampleListItem[i].style.animation = '2s examplemove2 linear 1  forwards';
				}
			}
			if(top(fluidScreen) < 0.1*screenHeight){
				exampleTitle.style.animation = '1.5s exampleTitlemove2 linear 1 forwards';
			}
		} 
		
		//eigth screen animation
		function footerDown(){
			if(top(purchaseBtnBox)<0.9*screenHeight){
				purchaseBtn.style.animation = '1s certificateBtnmove1 linear 1 forwards';
				purchaseTechs.style.animation = '2s certificateTextmove1 linear 1 forwards';
				purchaseSampleLink.style.animation = '2s certificateTextmove1 linear 1 forwards';
			}
			if(top(certificateBox)<0.9*screenHeight){
				for (var i = 0; i < certificateBoxText.length; i++) {
					certificateBoxText[i].style.animation = '2s certificateTextmove1 linear 1 forwards';
				}
			}
		}
		function footerUp(){
			if(bottom(purchaseBtnBox) > screenHeight){
				purchaseBtn.style.animation = '1s certificateBtnmove2 linear 1 forwards';
				purchaseTechs.style.animation = '2s certificateTextmove2 linear 1 forwards';
				purchaseSampleLink.style.animation = '2s certificateTextmove2 linear 1 forwards';
			}
			if(bottom(certificateBox) > screenHeight){
				for (var i = 0; i < certificateBoxText.length; i++) {
					certificateBoxText[i].style.animation = '2s certificateTextmove2 linear 1 forwards';
				}
			}
		}
	}
	
	//enter点击ajax获取数据,渲染弹出层页面
	var enterBtn = tools.$('.enter');
	var alertWrap = tools.$('.alert_wrap')[0];
	alertWrap.style.height = screenHeight + 'px';
	var picBoxImg = tools.$('.pic_box img')[0];
	var textBoxTitle = tools.$('.text_box .title')[0];
	var textBoxDetail = tools.$('.text_box .text_detail')[0];
	var close = tools.$('.close')[0];
	var arrPic = ['keyboard','journey','watch','phone','view','quality','boost','music'];
	
	for(var i=0;i<enterBtn.length;i++){
		enterBtn[i].index = i;
		enterBtn[i].onclick = function(){
			ajaxFn(this.index);
		}
	}
	function ajaxFn(n){
		alertWrap.style.display = 'block';
//		picBoxImg[n].style.animation = '';
		var xhr = new XMLHttpRequest();
        xhr.open('post', '/index', true);
        xhr.onload = function() {
            var d = JSON.parse(this.responseText);		           
            if (d.code) {
               alertWrap.innerHTML = d.message;
            } else {
				picBoxImg.src = d.data['src'];
				textBoxTitle.innerHTML = d.data['title'];
				textBoxDetail.innerHTML = d.data['texts'];
        	}
		}
      	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send('picName=' + arrPic[n]);
	}	

		close.onclick = function(){
			alertWrap.style.display = 'none';
		}
	
	
	
	//绑定backtop按钮点击事件
	var timer1 = null;
	var backTopBtn = tools.$('#backtop');
	backTopBtn.addEventListener('click',backTopFn,false);
	function backTopFn(){
		var dispageY = window.pageYOffset; 
		timer1 = setInterval(function(){
			dispageY -=100;
			if(dispageY <= 0){
				clearInterval(timer1)
				dispageY = 0;
			}
			window.scrollTo(0,dispageY);
		},20)
		
	}
	
	//fifth screen 轮播图
	//结构生成
	var picPalyContainer = tools.$('.pic_paly_container')[0];
	var picList = tools.$('.pic_list')[0];
	var picAutoPlayhtml = '';
	picData.forEach(function(item,index){
		picAutoPlayhtml += `
			<li class="list_item">
				<div class="active_bg">
					<p>
					${item.title}
					<br>
					<span>more detail</span>
					</p>
				</div>
				<img class="img" src="images/${item.pic}">
			</li>	
		`
	})
	picList.innerHTML = picAutoPlayhtml;
	
	
	
	//绑定分享share按钮事件
	var share = tools.$('#share');
	var aImg= tools.$('#menu a');
	var bOff=true;
	var iR=-150;
	share.addEventListener('click',shareFn,false);
	
	function shareFn(){
		if(bOff){
			this.style.WebkitTransform="rotate(360deg)";
			for(var i=0;i<aImg.length;i++){
				var oLt=toLT(iR,90/4*i);
				aImg[i].style.transition="0.5s "+i*100+"ms";
				aImg[i].style.left=-oLt.l+"px";
				aImg[i].style.top=oLt.t+"px";
				aImg[i].style.WebkitTransform="rotate(-720deg)";
			}
		}else{
			this.style.WebkitTransform="rotate(0deg)";
			for(var i=0;i<aImg.length;i++){
				aImg[i].style.transition="0.5s "+(aImg.length-i-1)*100+"ms";
				aImg[i].style.left=0+"px";
				aImg[i].style.top=0+"px";
				aImg[i].style.WebkitTransform="rotate(0deg)";
			}
		}
		bOff=!bOff;
	};
	//已知斜边和夹角求对边和临边
	function toLT(iR,iDeg){
		return {l:Math.round(Math.sin(iDeg/180*Math.PI)*iR),t:Math.round(Math.cos(iDeg/180*Math.PI)*iR)}
	}
	
	
	
	
	
	
	
	
}())
