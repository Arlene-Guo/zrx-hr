//jQuery.fn Ext
jQuery.fn.extend((function(){
	
	function dataToLabel(data,func,field) {
		
		if($.isFunction(func))
			return func.call(null,data);
		
		if(data[field])
			return data[field];
			
		return undefined;
	}
	
	function request(url,type,data,callback) {
		
		if(!$.isFunction(callback)) return;
		tn.ajax.request({
			type: type,
			url:url,
			data:data,
			listener: {
				success: function(json) {
					if(json.success){
						if($.isArray(json.data)){
							callback.call(null,json.data);
						}else{
							callback.call(null,json.data.rows);
						}
					}
				}
			}
		});	
	}
	
	
	function popLayerEvent($container,$input,eventKey){

		eventKey = eventKey || "pop";
		
		$input.focus();
		function closeLayer() {
			$input.blur();
			$(window.document).unbind("mousedown."+eventKey);
			$container.hide();	
			$container.trigger("close");		
		}
		
				
		function closeChooserHandler(e) {
			e.stopPropagation();
			e.preventDefault();
			
			$input.focus();	
			
			var t = e.target;
			if($input && $input.get(0) == t) return;
			if($input && $input.find(t).length) return;
			if($container.find(t).length) return;
			
			closeLayer();
		}
			
		$(window.document).unbind("mousedown."+eventKey).bind("mousedown."+eventKey,closeChooserHandler);	
	}
	
	
	function focusLayerEvent($container,$input,noclose,eventKey) {

		eventKey = eventKey || "focus";
		
		function closeLayer(e) {
			$(window.document).unbind("mousedown."+eventKey);
			$container.hide();	
			$container.trigger("close");	
		}
				
		$(window.document).unbind("mousedown."+eventKey).bind("mousedown."+eventKey,function(e){
			noclose = false;
		});	
		
		$input.unbind("blur."+eventKey).bind("blur."+eventKey,function(e){
			if (noclose) {
				noclose = false;
				$input.focus();
			}
			else closeLayer(e);		
		
		});	
		
		$container.unbind("mousedown."+eventKey).bind("mousedown."+eventKey, function (e, target) {
			e.stopPropagation();
			noclose = true; //IE8 doesn't obey event blocking when it comes to focusing, so we have to do this shit.
		});	
	}
		
	
	
	UI = {
	
		initBegin:function(ele,config){
			
			ele = $(ele);
			
			if(config.width) ele.width(config.width);
			if(config.height) ele.height(config.height);			
			if(config.cls) ele.addClass(config.cls);
			if(config.style) ele.css(config.style);	
			
			return ele;
					
		
		},
		
		
		
		initComplete : function(ele,config,ui) {
			
			ele = $(ele);
			if(config.events) ele.events(config.events);		
			ele.triggerHandler("initComplete");
			return (ui || ele);
		},

		
		input : function(config){
			return $('<input />').attr(Eye.apply({
				type : 'text',
				autocomplete:"off",
			},config || {}));
		},

		/*
			多选框
		*/			
		checkbox : function(config,data) {
			
			var uid = Eye.UID('checkbox');
			var label =  dataToLabel(data,config.labelFunction,config.labelField);
			var value = dataToLabel(data,config.valueFunction,config.valueField);
			var $ui = $('<span class="s-cbk"><input type="checkbox"/><label for="'+uid+'">'+label+'</span></span>');
					
			$('input',$ui).attr("id",uid).attr("name",config.name).attr("value",value);
			
			return $ui;
		},
		
		
		/*
			弹出框
		*/		
		layer : function(config) {
			
			var uid = Eye.UID('layer');
			var $ui = $('<div class="s-layer"><div class="s-layer-body"></div></div>'); 
			$ui.attr("id",uid);
			
			var $footer,$head;
			if(config.title != Eye.empty) {
				$head = $('<div tabindex="-1" role="dialog" aria-hidden="true"><div class="s-layer-header"><span></span></div>')	
				$ui.prepend($head);
			}
			
			if(config.isFooter || config.isClose || config.fbar != Eye.empty) {
				$footer = $('<div class="s-layer-footer"></div>');
				$ui.append($footer);
			}			
			
			if($head && config.title) {
				$(".s-layer-header span",$head).html(config.title);
			}
									
			if($footer && config.isClose) {
				var $close = $('<a class="btn popLayerCloseBtn" aria-hidden="true">关 闭</a>')
				$close.unbind("click").bind("click",function(){
					$ui.hide();
					$ui.trigger("close");
				});
				$footer.append($close);
			}	
				
			return $ui;
		}
		
	}
	
	
	return {


		/*
			树形多选框
			
			只支持二级
		*/
		renderCheckBoxTree : function(config) {

			config = Eye.apply({
				labelField : 'label',
				iconField : 'icon',
				valueField : 'id',
				childrenField:'children',
				//defaultTriggerName : "selectChange",
				cls:"s-tree-ckb",
				wrapper:{}
			},config || {});	
			
			var ele = $(this),ds = config.ds  || [];
			var $hiddenInput = UI.input({type:"hidden",name:config.name});
			
			UI.initBegin(this,config);
			for(var i = 0;i< ds.length;i++) {
				
				var data = ds[i];
				var ckb = UI.checkbox(config,data);
				
				$('input',ckb).removeAttr("name");
				var ckbHead = $('<div class="s-tree-cbk-head"></div>').append(ckb)
				var ckbGroup = $('<div class="s-cbk-group"></div>').renderCheckBoxGroup(config,data[config.childrenField]);
				var group = $('<div class="s-tree-cbk-group"></div>').append(ckbHead).append(ckbGroup);
				ele.append(group);
			}					
			
			
			$(".s-tree-cbk-head input[type='checkbox']",ele).bind("change",function(e){
				
				var element = $(this);
				var checked = element.attr('checked');
				element.parents(".s-tree-cbk-group").find(".s-cbk-group input[type='checkbox']").attr('checked',!!checked);
				
				ele.triggerHandler("selectChange",[ele.getData()])
			});		
				
			$(".s-cbk-group input[type='checkbox']",ele).bind("change",function(e){
				
				var element = $(this);
				var checked = element.attr('checked');
				var group = element.parents(".s-tree-cbk-group");
				var selects = group.find(".s-cbk-group input[type='checkbox']:checked");
				group.find(".s-tree-cbk-head input[type='checkbox']").attr('checked',selects.length>0);
				
				ele.triggerHandler("selectChange",[ele.getData()]);
			});
			
			
			function getLabels() {
				
				var labels = [];
				var selects = ele.find(".s-cbk-group input[type='checkbox']:checked").next("label");
				$.each(selects,function(i,n){
					labels.push($(n).text());			
				});
				return labels;
			}
			
			return UI.initComplete(this,config);
		},

		/*
			多选框
		*/
		renderCheckBoxGroup : function(config,ds) {
		
			config = Eye.apply({
				labelField : 'label',
				iconField : 'icon',
				valueField : 'id',
				cls:"s-cbk-group",
			},config || {});
			
			UI.initBegin(this,config);
			
			var ele = $(this),ds = ds || config.ds || [];
			
			for(var i = 0;i<ds.length;i++) {
				var data = ds[i];
				var ckb = UI.checkbox(config,data);
				ele.append(ckb);
			}

			return UI.initComplete(this,config);
		},
		
		
		
		/*
			弹出框
		*/				
		renderPopLayer : function(config){
			
			config = Eye.apply({
				//cls:"s-layer",
				isClose:false
			},config || {});
			
			var $input = $(this);
			var $container = UI.layer(config);
			var $popLayerBody = $(".s-layer-body",$container);	
			
			UI.initBegin($container,config);
			
			
			var noclose = false;
			$input.parent().addClass("s-layer-parent").append($container);
			$input.unbind("mousedown.pop").bind("mousedown.pop",function(e){
				
				e.stopPropagation();
				e.preventDefault();
				
				
				var pos = $input.position(), 
					height = $input.outerHeight(),
					width = $input.outerWidth();
				
				$container.css(Eye.apply({
					width:config.isWidth ? width : null
				},{left:pos.left,top:height+8}));
				$container.show();
				
				popLayerEvent($container,$input);	
										
			});	
			
			return UI.initComplete($container,config,$popLayerBody);									
		},	
		
		
		
		renderSreach : function(config){
			
			config = Eye.apply({
				cls:'s-list',
				isWidth:true,
				isFooter:false,
				labelField:"name",
				keywordField:'keyword',
				type:'POST',
			},config || {});
			
			var $input = $(this),timedelay;
			var $container = UI.layer(config);
			$container.bind("close",function(){
				destroy();
			});
			var $popLayerBody = $(".s-layer-body",$container);	
			var noclose = false;
			var $selectedItem,selectedIndex=-1;
			var resList = [];	
			
			UI.initBegin($container,config);
			
			
			//var inputName = config.name || $input.attr("name");
			//var $hiddenInput = UI.input({type:"hidden",name:inputName});
			
			//$input.removeAttr("name");
			$input.attr("autocomplete","off");
			$input.parent().addClass("s-layer-parent").append($container);
			$input.unbind("focus.sreach").bind("focus.sreach",function(e){
				
				
				focusLayerEvent($container,$input,noclose,"sreach");
				//sreach();
				$input.unbind("keyup.sreach").bind("keyup.sreach",function(e){
					//$input.unbind("keyup.sreach");
					focusLayerEvent($container,$input,noclose,"sreach");
					
					var pos = $input.position(), 
						height = $input.outerHeight(),
						width = $input.outerWidth();
					
					$container.css(Eye.apply({
						width:config.isWidth ? width : null
					},{left:pos.left,top:height+2}));
					
					
					var k = e.keyCode;
					if(k == 38) {
						selectedIndex--;
						moveToList();
					}else if(k == 40) {
						selectedIndex++;
						moveToList();
					}
					else if(k == 108 || k == 13){
						setValue();
						destroy();
					} 
					else {
						selectedIndex = -1;
						sreach();
					}
							
				});				
			});	
			
			function destroy() {
				$popLayerBody.empty();
				$container.hide();
				resList = [];
			}
			
						
			function moveToList() {
				
				var itemList = $('.s-list-item',$popLayerBody)
				var l = itemList.length;				
				
				if(selectedIndex<0) selectedIndex = 0;
				if(selectedIndex>=l) selectedIndex = l-1;
				
				if($selectedItem)
					$selectedItem.removeClass("s-list-item-selected");
					
				if(selectedIndex >= 0 && selectedIndex < l) {
					$selectedItem = $(itemList.get(selectedIndex));
					$selectedItem.addClass("s-list-item-selected");
					setValue();
				}
			}
						
			function sreach() {
				var value = $.trim($input.val());
				
				if(value){
					if(timedelay) clearTimeout(timedelay);
					var pData = {};
					pData[config.keywordField] = value;
					timedelay = setTimeout(function(){
						request(config.url,config.type,pData,function(list){
							
							if(list && list.length) {
								resList = list;
								$popLayerBody.empty();
								$popLayerBody.append(renderList(list));
								$popLayerBody.find(".s-list-item").unbind('click').bind('click',function(){
									selectedIndex = $(this).attr('index');
									setValue();
									destroy();
								});
								$container.show();
								//moveToList();
							}
							else {
								$container.hide();
							}
						});					
					},20)
				}
				else {
					$container.hide();
				}			
			}
			
			function setValue() {
				var data = resList[selectedIndex];
				var value = dataToLabel(data,config.valueFunction,config.valueField);
				var label = data[config.labelField];
				
				//$hiddenInput.val(value);
				$input.val(label);	
				$input.triggerHandler("selectChange",data);	
			}
			
			
			function renderList(list) {
				var ele = $("<div></div>")
				$.each(list,function(i,data) {
					var value = dataToLabel(data,config.labelFunction,config.labelField);
					var $itemText = $('<span class="s-list-item-text"></span>').html(value)
					var $item = $('<div class="s-list-item"></div>').append($itemText)
					$item.attr('index',i)
					ele.append($item);
				});
				return ele;
			}
			
			return UI.initComplete($input,config);	 							
		}
	}
})());












