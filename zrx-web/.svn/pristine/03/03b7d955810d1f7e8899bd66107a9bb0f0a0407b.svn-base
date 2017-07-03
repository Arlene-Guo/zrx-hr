//jQuery.fn Ext
jQuery.fn.extend((function(){
	
	return {
		
		/*
			set Form Data
		*/
		setData : function(data,opt) {
			if(!$.isPlainObject(data)) {
				return;
			}
			var $node = $(this),opt = opt || {};
			for(var field in data) {
				
				var val = data[field];
				
				//input
				var $inputs = $("input[name='"+field+"']",$node);
				$.each($inputs,function(i,input){
					var $input = $(input);
					var type  = $input.attr("type"); 
					var value = $input.attr("value"); 
					switch(type) {
						case "checkbox":{
							$input.attr("checked",val.indexOf(value) != -1);
							break;
						}
						case "radio":{
							$input.attr("checked",value == val);
							break;
						}
						default:{
							$input.val(val);
						}
					}				
				});
				
				//select
				var select = $("select[name='" + field + "']", $node);
				$("option[value='" + val + "']", select).attr("selected", "true");
				
				//textarea
				$("textarea[name='" + field + "']", $node).val(val)
			}
			
						
		},
		
		/*
			get Form Data
		*/		
		getData : function() {
			
			var $node = $(this);
			var data = {};
			$("input,select,textarea",$node).each(function(i, n) {
				
				var $n = $(n);
				var name = $n.attr("name");
				
				if(name) {	
					
					var tagName = $n.get(0).tagName;
					var type  = $n.attr("type");
					var value = $n.attr("data-value") || $n.attr("value");
					
					switch(tagName) {
						
						case "INPUT":{
							
							switch(type) {
								
								case "checkbox": {
									if(!data[name]) {
										data[name] = [];
									};
									if($n.attr("checked")) {
										data[name].push(value);
									};
									break;
								}
								
								case "radio": {
									if($n.attr("checked")) {
										data[name] = value;
									};
									break;
								}
								
								default: {
									data[name] = $.trim(value);
								}
							}
							
							break;				
						}
						case "SELECT":{
							if(value) {
								data[name] = value;
							}
							break;
						}
						case "TEXTAREA":{
							data[name] = $.trim(value);
							break;
						}
					}					
				}
			});

			return data;
		},
		
		
		/**
			清空页面控件数据
		*/
		resetData:function(){
		
			var $node = $(this);
			$("input,select,textarea",$node).each(function(i, n) {
				
				var $n = $(n);
				var tagName = $n.get(0).tagName;
				var type  = $n.attr("type");
				switch(tagName) {
					
					case "INPUT":{
						
						switch(type) {
							
							case "checkbox": 
							case "radio": {
								$n.attr("checked",false)
								break;
							}
							
							default: {
								$n.val("")
							}
						}
						
						break;				
					}
					case "SELECT":{
						$n.val("")
						break;
					}
					case "TEXTAREA":{
						$n.val("")
						break;
					}
				}					
				
			});		
		},
		
		/*
			控件只能输入数值
		*/
		inputNumber : function(){
			
			var ele = $(this);
			
			ele.unbind("keydown.writeNumber").bind("keydown.writeNumber",function(e){	
				var k = e.keyCode;
				var isReturn = false;
				//var value = $(e.currentTarget).val();
				
				//小数点
				var isFloatKeys = (k == 110 || k == 190);
				
				//负数符号
				var isNegativeNumberKeys = (k == 109 || k == 189);
				
				//数值键和回退键
				var isNumberKeys = (k <=57 && k >=48) || (k<=105 && k >=96) || (k == 8) || (k==37||k==38||k==39||k==40);
	
				isReturn = !(isNumberKeys || isFloatKeys || isNegativeNumberKeys);
				
				if(e.shiftKey || isReturn){
					e.stopPropagation();
					e.preventDefault();
					e.cancelBubble = true;
					e.returnValue = false;
					return false;
				}
			});	
		},
		
		
		
		events : function(events) {
			var ele = $(this);
			$.each(events,function(e,fn){
				ele.bind(e,fn);
			});		
			return this;
		}
		
	}
})());












