
		var toolsBox = document.getElementsByClassName('left_toolbtn')[0];
		var create = toolsBox.getElementsByClassName('create')[0];
		var reName = toolsBox.getElementsByClassName('rename')[0];
		var moveTo = toolsBox.getElementsByClassName('move')[0];
		var Delete = toolsBox.getElementsByClassName('del')[0];
		var checkAll = document.getElementById('checkAll');
		var breadcrumb = document.querySelector('#breadcrumb');
		var breadcrumbList = document.querySelector('#breadcrumb .list');
		//树形菜单
		var sortWay = document.getElementsByClassName('sortway')[0];
		//文件夹查看方式
		var consultWay = document.getElementsByClassName('consultWay')[0];
		var dragWrap = document.getElementsByClassName('drag_wrap')[0];
		var elements = [];
		
		var index = 1000;
		//组止浏览器默认行为
		document.onmousedown = function(){
			return false;
		}

		//根据数据，初始化渲染页面
		var currentPid =0;
		render(getChildren(currentPid));
		showBreadcrumb();
		treeMenu.innerHTML = treeHtml(-1);
		positionTreeById(0)
		
		
		//树形菜单展示与隐藏
		var isBlock = true;
		
		sortWay.onclick = function(){
			if(isBlock){
				treeMenu.style.display = 'block';
				isBlock = false;
			}else{
				treeMenu.style.display = 'none'; 
				isBlock = true;
			}
			resize();
		}
		toolsBox.onclick = function(e){
			e.cancelBubble = true;
		}
		toolsBox.onmouseup = function(e){
			e.cancelBubble = true;
		}
		
		//create绑定新建文件夹事件
		create.onclick = function(){
			newCreatfile();
		}
		//新建文件
		function newCreatfile(){
			var div = document.createElement('div');
			div.fileId = getMaxId()+1;
			div.className = 'file';
			
			var checkBox = document.createElement('span');
	        checkBox.className = 'checkbox';
	        div.appendChild(checkBox);
	
	        var image = document.createElement('div');
	        image.className = 'image image-folder';
	        div.appendChild(image);
	        
	        var name = document.createElement('div');
	        name.className = 'name';
	        name.innerHTML = '';
	        div.appendChild(name);
	
	       	var inputName = document.createElement('input');
			inputName.type = 'text';
			inputName.value = '';
			inputName.className = 'Inpname';
			div.appendChild(inputName);
			contentElement.appendChild(div);
			
			inputName.focus();
			inputName.onblur = function() {
				creatName(inputName);
			}
			inputName.onkeydown = function(e){
				if(e.keyCode == 13){
					inputName.blur();
				}
			}
			
			
			
		}	
		//判断当inputName失去焦点时判断是否有重名
		function creatName(inputName){
			var onOff = true;
			if(inputName.value == ''){
				contentElement.removeChild(inputName.parentNode);
			}else{
				var arr = getChildren(currentPid);
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].name == inputName.value){
						onOff = false;
					}
				}
				if(onOff){
					datas.push({
						id: getMaxId() + 1,
	          			pid: currentPid,
	          			name: inputName.value,
	          			type: 'folder'
	          			}
					)
					render(getChildren(currentPid));
					treeMenu.innerHTML = treeHtml(-1);
					finedTreeTitle(currentPid);
					console.log(elements)
				}else{
					alert('此目标已包含名为" '+ inputName.value +' "的文件夹，请重新命名')
					contentElement.removeChild(inputName.parentNode);
				}
			}
		}
		
		//重命名
		reName.onclick = function(){
			var arr = getChecked();
			if( arr.length == 1 ){
			 	var inputName = document.createElement('input');
				inputName.type = 'text';
				inputName.value = arr[0].getElementsByClassName('name')[0].innerHTML;
				inputName.className = 'Inpname';
	
				inputName.onclick = function(e){
					e.cancelBubble = true
				}
				inputName.onkeyup = function(e){
					if(e.which==13){
						this.blur();
					}
				}
				inputName.onblur = function(){
					var onOff = true
					if(inputName.value == ''){
						inputName.parentNode.removeChild(inputName)
						setStatus(arr[0],false )
					}else{
						var arrA = getChildren( currentPid )
						for (var i = 0; i < arrA.length; i++) {
							if(arrA[i].id == arr[0].fileId){
								arrA.splice(i,1)
							}
						}
						for (var i = 0; i < arrA.length; i++) {
							if( arrA[i].name == inputName.value){
								onOff = false;
								break
							}
						}
	
						if(onOff){
							for (var i = 0; i < datas.length; i++) {
								if(datas[i].id == arr[0].fileId){
									datas[i].name = this.value;
								}
							}
							render(getChildren(currentPid))
							treeMenu.innerHTML = treeHtml(-1);
							finedTreeTitle(currentPid);
							
						}else{
							alert('存在重复')
							this.value =''
							this.focus()
							}
						}
					}
	
					arr[0].appendChild(inputName)
					inputName.select()
			}else{
				alert('请选择一个')
			}
		}
		
		//获取选中元素
		function getChecked(){
			var arr = [];
			for (var i = 0; i < elements.length; i++) {
				if( elements[i].checked ){
					arr.push( elements[i] )
					
				}
			}
			return arr;
		}
		
		//拖拽框选
		contentElement.onmousedown = function(e){
			e.cancelBubble = true;
			var disX = e.clientX;
			var disY = e.clientY;
			var box = document.createElement('div');
			box.className = 'box';
			box.style.left = disX + 'px';
			box.style.top = disY + 'px';
			contentElement.appendChild(box);
			
			document.onmousemove = function(e){
				e.cancelBubble = true;
				var boxL = Math.min(e.clientX, disX);
				var boxT = Math.min(e.clientY, disY);
				var boxW = Math.abs(e.clientX - disX);
				var boxH = Math.abs(e.clientY - disY)
				box.style.left = boxL + 'px';
                box.style.top = boxT + 'px';
				box.style.width = boxW + 'px';
				box.style.height = boxH + 'px';
				
				for (var i = 0; i < elements.length; i++) {
					 var Rect = elements[i].getBoundingClientRect();
					if(boxL + boxW > Rect.left && boxL < Rect.right && boxT + boxH > Rect.top && boxT < Rect.bottom){
						setStatus(elements[i], true);
					}else{
						setStatus(elements[i], false);
					}
				}
				if(elements.length == 0){
					checkAll.checked = false;
				}else{
					checkAll.checked = getChecked().length == elements.length;
				}
			}
			
			document.onmouseup = function(){
				document.onmousemove = null;
				box.style.display = 'none';
			}
			return false;
		}
		
		//点击面包屑导航返回当前点击项(利用事件委托)
		breadcrumb.onclick = function(e){
			e.cancelBubble = true;
			if(e.target.tagName.toLowerCase() == 'a'){
				currentPid = e.target.getAttribute('fileId');
				finedTreeTitle(currentPid);
				render(getChildren(currentPid));
				showBreadcrumb();
			}
		}
		function finedTreeTitle(id){
			var treeTitle = document.querySelectorAll('.tree-title');
	    	for(var i=0;i<treeTitle.length;i++){
	    		removeClass(treeTitle[i],'position_active');
	    		if(treeTitle[i].dataset.fileId == id){
	    			addClass(treeTitle[i],'position_active')
	    		}
	    	}
		}
		
		//全选（根据当前checkAll的状态去批量设置元素的class）
		checkAll.onclick = function(e){
			e.cancelBubble = true;
			for (var i = 0; i < elements.length; i++) {
				setStatus(elements[i], this.checked)
			}
		}
		checkAll.onmouseup = function(e){
        	e.cancelBubble = true;
        }
	
		//删除按钮
		Delete.onclick = function(e){
			e.cancelBubble = true;
			var arr=[];
			var arr1 = [];
			for (var i = 0; i < elements.length; i++) {
				if(elements[i].checked){
					arr.push(elements[i]);
					contentElement.removeChild(elements[i]);
					//删除当前数据和所有子数据
					for (var j = 0; j < datas.length; j++) {
						if(datas[j].id == elements[i].fileId){
							datas.splice(j,1);
							var childData = getAllChildren(elements[i].fileId);
							for (var k = 0; k < childData.length; k++) {
								for (var m = 0; m < datas.length; m++) {
									if(childData[k].id == datas[m].id){
										datas.splice(m,1);
									}
								}
								
							}
						}
					}
				}
				
			}
			
			if(arr.length == 0){
				alert('请选择要删除的文件夹')
			}
			render(getChildren(currentPid))
			treeMenu.innerHTML = treeHtml(-1);
			finedTreeTitle(currentPid);
			showBreadcrumb();
			if(elements.length == 0){
				setStatus(checkAll,false);
			}
//			console.log(datas)
		}
		
		//利用事件委托 绑定树形菜单点击事件，
		treeMenu.addEventListener('click',function(e){
			var target = e.target;
			if( parents(target,".tree-title") ){
				target = parents(target,".tree-title");
				//找到div身上的id 
				//console.dir(target);
				var fileId = target.dataset.fileId;
				var treeActive = document.querySelector(".position_active");
				removeClass(treeActive,'position_active');
				addClass(target,'position_active');
				currentPid = fileId;
				showBreadcrumb();
				render(getChildren(currentPid));
			}
		})
		
		//设置某个文件夹的状态：
		function setStatus(fileElement,status,classname){
			var classname = classname || 'file';
			fileElement.checked = status;
			fileElement.className = status ? 'file file-checked' : classname;
		}
		
		//获取选中的元素
		function getChecked(){
			var arr=[];
			for (var i = 0; i < elements.length; i++) {
				if(elements[i].checked){
					arr.push(elements[i]);
				}
			}
			return arr;
		}
		
		//渲染页面：
		function render(renderData){
			contentElement.innerHTML = '';
        	elements = [];
        	for (var i = 0; i < renderData.length; i++) {
        		createFile(renderData[i]);
        	}
		}
		
		
