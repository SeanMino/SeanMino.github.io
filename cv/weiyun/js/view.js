//添加文件夹
	
	function createFile(data){
		var div = document.createElement('div');
		div.fileId = data.id;
		div.className = 'file';
		
		var checkBox = document.createElement('span');
	    checkBox.className = 'checkbox';
	    div.appendChild(checkBox);
	
	    var image = document.createElement('div');
	    image.className = 'image image-' + data.type;
	    div.appendChild(image);
	
	    var name = document.createElement('div');
	    name.className = 'name';
	    name.innerHTML = data.name;
	    div.appendChild(name);
	    
	    //事件处理：
	    div.onmouseover = function(){
	    	if(this.checked){
	    		this.className = 'file file-checked';
	    	}else{
	    		this.className = 'file file-hover'
	    	}
	    }
	    
	    div.onmouseout = function(){
	    	if(this.checked){
	    		this.className = 'file file-checked';
	    	}else{
	    		this.className = 'file';
	    	}
	    }
	    checkBox.onmouseup = function(e){
	    	e.cancelBubble = true;
	    }
	    checkBox.onmousedown = function(e){
	    	e.cancelBubble = true;
	    }
	    checkBox.onclick = function(e){
//	        if(div.checked){
//	        	setStatus(div, false);
//	        }else{
//	        	setStatus(div, true);
//	        }
			setStatus(div, !div.checked);
			checkAll.checked = getChecked().length == elements.length;
			e.cancelBubble = true;
	    }
		var onOff1 = true;
	    div.onmousedown = function(e){
	    	onOff1 = false;
	    	e.cancelBubble = true;
	    	var Num = document.getElementsByClassName('num')[0];
			var drag = document.getElementsByClassName('drag')[0];
					var checkedFileArr = [];
					var disX = e.clientX;
					var disY = e.clientY;
					if(!hasClass(this,"file-checked")){
						for (var i = 0; i < elements.length; i++) {
							removeClass(elements[i],'file-checked');
						}
						var _this = this;
						addClass(_this,'file-checked');
						checkedFileArr.push(_this);
					}else{
						checkedFileArr = getChecked();
					}
					
					document.addEventListener('mousemove',move)
					function move(e){
						if(Math.abs(e.clientX - disX) > 10 || Math.abs(e.clientY - disY) > 10){
							onOff1 = true;
							for (var i = 0; i < checkedFileArr.length; i++) {
							var lis = document.createElement('li');
								lis.className = 'item';
								lis.style.cssText = 'left:'+ 5*i + 'px;top:' + 2*i + 'px';
								drag.appendChild(lis);
							}
							Num.innerHTML = checkedFileArr.length;
							dragWrap.style.display = 'block';
							dragWrap.style.left = e.clientX + 15 + 'px';
							dragWrap.style.top = e.clientY + 15 + 'px';
						}
						
						
					}
					document.addEventListener('mouseup',upMouse);
					function upMouse(e){
						console.log(onOff1)
						if(onOff1){
							for (var i = 0; i < elements.length; i++) {
								removeClass(elements[i],'file-checked');
							}
								
							for (var i = 0; i < checkedFileArr.length; i++) {
								checkedFileArr[i].style.display = 'none';
								var target = e.target;
								if( parents(target,".file") && parents(target,".file") != checkedFileArr[i]){
									target = parents(target,".file");
									for (var j = 0; j < datas.length; j++) {
										if(datas[j].id == checkedFileArr[i].fileId){
											datas[j].pid = target.fileId;
										}
									} 
									
								}
							}
						}
						treeMenu.innerHTML = treeHtml(-1);
						finedTreeTitle(currentPid);
						render(getChildren(currentPid));
						showBreadcrumb();
						document.removeEventListener('mousemove',move);
						dragWrap.style.display = 'none';
						document.removeEventListener('mouseup',upMouse)
						
					}
					return false;
				
		}
	    div.onmouseup = function(e){
	    	if(!onOff1){
	    		var treeTitle = document.querySelectorAll('.tree-title');
		    	for(var i=0;i<treeTitle.length;i++){
		    		removeClass(treeTitle[i],'position_active');
		    		if(treeTitle[i].dataset.fileId == this.fileId){
		    			addClass(treeTitle[i],'position_active')
		    		}
		    	}
				console.log(1111111)
		    	currentPid = this.fileId;
		    	render(getChildren(currentPid));
		    	showBreadcrumb();
	    	}
	    }
	    contentElement.appendChild(div);
	    elements.push(div);
	}
		
//面包屑导航渲染
	function showBreadcrumb(){
		var parentList = getParents(currentPid);
		//当前点击的自己
		if(getInfo(currentPid)){
			parentList.unshift( getInfo(currentPid) );
		}
		var str = '';
		for (var i = parentList.length-1; i >=1; i--) {
			
			str += `<a href="javascript:;" fileId ="${parentList[i].id}" style ="z-index:${index--};">${parentList[i].name}</a>`;
		}
		str +=`<a href="javascript:;"class="currentPath" fileId ="${parentList[i].id}" style ="z-index:${index--};">${parentList[i].name}</a>`
		
		breadcrumbList.innerHTML = str;
		
	}
		
//树形菜单html
	function treeHtml(id){
		var childs = getChildren(id);
		var html = '<ul>';
		
		childs.forEach(function(item){
			//获取当前id是第几层
			var level = getLevelById(item.id);
			//判断当前这个数据有没有子数据 通过id判断
			var hasChild = hasChilds(item.id);
			var classNames = hasChild ? "" : "none_triangle";
			
			html +=`
					<li>
						<div class="tree-title clearfix" data-file-id="${item.id}" style="padding-left:${(level)*14}px">
							<span class="triangle ${classNames}"></span>
							<strong class="flie_ico"></strong>
							<i class="file_name">${item.name}</i>
						</div>
						${(treeHtml(item.id))}
					</li>	
				`
		})
		html +='</ul>';
		return html;
	}
//通过id定位到树形菜单,添加class		
	function positionTreeById( positionId ){
			
		var ele = document.querySelector(".tree-title[data-file-id='"+positionId+"']");
	
		addClass(ele,"position_active");
	}