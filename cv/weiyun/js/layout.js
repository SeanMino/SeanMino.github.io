//window.onload = function(){
	'use strict';
	var content = document.getElementById('content');
	var header = document.getElementsByClassName('layheader')[0];
	var mainBar = document.getElementById('main_bar');
	var breadcrumb = document.getElementById('breadcrumb');
	var mainContent = document.getElementById('main_content');
	var navBox = document.getElementById('nav_box');
	var contentElement =document.getElementById('file_content');
	var treeMenu = document.getElementById('tree_menu');
	
	resize();
	window.onresize = function(){
		resize();
	}

	function resize(){
		treeMenu.style.height = mainContent.style.height = navBox.style.height = document.documentElement.clientHeight - header.offsetHeight - mainBar.offsetHeight + 'px';
		contentElement.style.height = mainContent.offsetHeight - breadcrumb.offsetHeight + 'px';
		breadcrumb.style.width = contentElement.style.width = document.documentElement.clientWidth - navBox.offsetWidth - treeMenu.offsetWidth + 'px';
	}
	
	
	
//}
