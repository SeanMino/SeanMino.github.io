
/*
* 根据指定id获取下面的第一级子数据
* */
function getChildren(id){
	var arr=[];
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].pid == id){
			arr.push(datas[i]);
		}
	}
	return arr;
}

//获取所有子级
function getAllChildren(id, level){
	var arr=[];
	var level = level || 0;
	var children = getChildren(id);
	for (var i = 0; i < children.length; i++) {
		children[i].level = level;
		arr.push(children[i]);
		arr = arr.concat(getAllChildren(children[i].id, level+1));
	}
	return arr;
}

//得到最大的id
function getMaxId(){
	var maxId = 0;
	for (var i = 0; i < datas.length; i++) {
		if(maxId < datas[i].id){
			maxId = datas[i].id
		}
	}
	return maxId;
}



//根据id获取信息
function getInfo(id){
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].id == id){
			return datas[i]
		}
	}
}

//获取第一级父级
function getParent(id){
	var info = getInfo(id);
	if(info){
		return getInfo(info.pid);
	}
}

//获取所有父级（利用递归）
function getParents(id){
	var arr=[];
	var parent = getParent(id);
	if(parent){
		arr.push(parent);
		arr = arr.concat( getParents(parent.id) );
	}
	return arr;
}

//获取当前id是第几层
function getLevelById(id){
	return getParents(id).length;
}

//这个id是否有子元素
function hasChilds(id){
	return getChildren(id).length !== 0;
}