//是否有classname
function hasClass(ele,classNames){
	var classNameArr = ele.className.split(" ");
	for( var i = 0; i < classNameArr.length; i++ ){
		if( classNameArr[i] === classNames ){
			return true;
		}
	}

	return false;
}

//添加classname
function addClass(element,clsNames){
	if( typeof clsNames === "string" ){
		if(!hasClass(element,clsNames)){
			element.className += " "+clsNames;
		}
	}
}

//通过选择器获取元素父级
function parents(obj,selector){
	/*
	 * selector
	 * id
	 * class
	 * 标签
	 * */

	if( selector.charAt(0) === "#" ){
		while(obj.id !== selector.slice(1)){
			obj = obj.parentNode;
		}
	}else if( selector.charAt(0) === "." ){
		while((obj && obj.nodeType !== 9) && !hasClass(obj,selector.slice(1))){
			obj = obj.parentNode;
		}
	}else{
		while(obj && obj.nodeType !== 9 && obj.nodeName.toLowerCase() !== selector){
			obj = obj.parentNode;
		}
	}

	return obj && obj.nodeType === 9  ? null : obj;
}

//移出元素的class
function removeClass(element,clsNames){
	var classNameArr = element.className.split(" ");
	for( var i = 0; i < classNameArr.length; i++ ){
		if( classNameArr[i] === clsNames ){
			classNameArr.splice(i,1);
			i--;
		}
	}
	element.className = classNameArr.join(" ");
}