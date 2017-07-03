

var Forms = {};

$.extend(Forms, {
	get: function(node) {
		var datas = this.datas = {};
		if(!node || ($.isArray(node) && node.length == 0)) {
			return {};
		}
		$("input,select,textarea", $(node)).each(function(i, n) {
			var nodeName = n && n.nodeName;
			switch(nodeName) {
			case "INPUT":
				switch(n.type) {
				case "checkbox":
					if(!datas[$(n).attr("name")]) {
						datas[$(n).attr("name")] = [];
					};
					if(n.checked) {
						datas[$(n).attr("name")].push(n.value);
					};
					break;
				case "radio":
					if($(n).attr("value") == "on") {
						if(n.checked) {
							datas[$(n).attr("name")] = 1;
						} else {
							datas[$(n).attr("name")] = 0;
						}
					} else {
						if(n.checked) {
							datas[$(n).attr("name")] = $(n).attr("value");
						}
					}
					break;
				default:
					if($(n).attr("autocomplete")) {
						return;
					}
					datas[$(n).attr("name")] = $.trim($(n).val());
				}
				break;
			case "SELECT":
				if($(n).attr("name") && $(n).val()) {
					datas[$(n).attr("name")] = $(n).val();
				}
				break;
			case "TEXTAREA":
				datas[$(n).attr("name")] = $.trim($(n).val());
				break;
			}
		});
		if("undefined" in datas) {
			delete datas["undefined"];
		}
		return datas;
	},
	set: function(node, data) {
		if(!$.isPlainObject(data)) {
			return;
		}
		if(!node) {
			return;
		}
		for(var i in data) {
			var input = $("input[name='" + i + "']", $(node));
			switch(input.attr("type")) {
			case "checkbox":
			case "radio":
				if(input.attr("value") == "on") {
					if(parseInt(data[i]) == 1) {
						input[0].checked = true;
					} else {
						input[0].checked = false;
					}
				} else {
					if(input.length > 1) {
						input.each(function(j, n) {
							if(n.value == data[i]) {
								n.checked = true;
							}
						})
					}
				}
				break;
			default:
				input.val(data[i]);
			}
			var select = $("select[name='" + i + "']", $(node));
			//添加为多选下拉框赋值
			//赋值为数组
			if(data[i] instanceof Array && data[i].length > 0){
				//如果下拉框为单选，则默认设置数组第一个值
				if(!select.attr("multiple")){
					$("option[value='" + data[i][0] + "']", select).attr("selected", "true");
				}else{
					$.each(data[i], function(key, value){
						$("option[value='" + value + "']", select).attr("selected", "true");
					});
				}
			}else{
				$("option[value='" + data[i] + "']", select).attr("selected", "true");
			}
			var textarea = $("textarea[name='" + i + "']", $(node)).val(data[i]);
		}
	},
	validate: function() {
		console.debug(this.datas);
	}
});