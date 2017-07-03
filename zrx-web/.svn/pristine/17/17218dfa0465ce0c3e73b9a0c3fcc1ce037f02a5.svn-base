
function City(options) {
	$.extend(this, options);
	this.init();
}

$.extend(City.prototype, {
	init: function() {
		this.generateDOM();
	},
	generateDOM: function() {
		var self = this;
		var input = self.target;
		var node;
		//-----------------------start  控件样式--------------------------
		var div = $("<div class='cityConfigArea' />").css({
			border: "1px solid #8CBFDE",
			position: "absolute",
			zIndex: "100005",
			backgroundColor: "#FFF",
			padding: "5px",
			width: self.areaShow ? "380px" : "230px",
			// left: "0"  //注释掉解决多选控件定位问题
			"max-height":"580px",
			"overflow":"auto"
		});
		if (!self.multiple) {
			div.css({
				left: input[0].offsetLeft,
				// top: input[0].offsetTop + input.height()
			});
		}
		var css = {
			"float": "left",
			margin: "2px",
			"padding-bottom": "3px",
			"padding-left": self.areaShow ? "2px":"4px", //不带区域的（出发城市）间距放大
			cursor: "pointer",
			border: "1px solid #FFF"
		};
		var dlCss = {
			"float": "left",
			"margin-bottom": "0px",
			"margin-top": "0px",
			border: "1px solid #FFF"
		};
		//-----------------------end  控件样式--------------------------
		

		//先隐藏所有的城市弹出层和搜索框
		$(".cityConfigArea").hide();
		input.parent().find(".searchDiv").hide();

		//可以搜索初始化搜索控件
		if (self.searchData) {
			var searchData = self.searchData ;
			if (input.parent().find(".searchDiv").length == 0) {
				var obj = searchData;
				var data = [];
				for (var key in obj) {
					var city = {
						"name": obj[key],
						"title": obj[key],
						"id": key
					};
					data.push(city);
				};
				new TNSearch({
					el: input,
					noSearch: true,
					width: '120px',
					view: 'default',
					showKey: 'name',
					requestModel: 'local',
					maxShowCount: 0,
					selectFn: function(data) {
						if (data.length !== 0) {
							// input.parent().find("div").remove();
							input.removeClass("ver-error").removeAttr("data-original-title").tooltip();
						} else {
							input.addClass("ver-error").attr("data-original-title", "请重新选择").tooltip();
						}
						if (data[0] && input.val() != "") {
							if(self.showFlag == "startCity"){
								input.attr("code", data[0].id.replace("_", ""));
								if (typeof(self.callback) == 'function') {
									var temp = {
										name : data[0].name,
										code:  data[0].id.replace("_", "")
									}
									self.callback(temp);
								}
							}else{
								input.attr("code", data[0].id);
								if (typeof(self.callback) == 'function') {
									var temp = {
										name : data[0].name,
										code: data[0].id
									}
									self.callback(temp);
								}
							}
						}
					}
				}).setData(data);

				//点击input隐藏搜索控件 解决multiple搜索控件闪一下再出现弹出层的问题
				if (self.multiple) {
					input.unbind('focus');
				}
				
				input.focus();

				input.keyup(function(e) {
					input.parent().find(".searchDiv").css({
						"margin-top": "0px",
						// "left": input[0].offsetLeft,
					});
					//多选 样式调整
					if (self.multiple) {
						var span = $(e.target).parent().parent().parent();
						input.parent().find(".searchDiv").css({
							left: span[0].offsetLeft,
						});
					}
					//隐藏弹出层显示搜索层
					input.parent().find(".searchDiv").siblings("div").hide();
					input.parent().find(".searchDiv").show();
				});
			}
			node = input.parent().find(".searchDiv").siblings('div');
		} else {
			node = input.parent().find("div");
		}
		
		//初始化弹出层
		if (node.length === 0) {
			node.remove();
			if (self.areaShow) {
				var areaName = {
					"1": "华南",
					"2": "华北",
					"3": "华东",
					"4": "华中",
					"5": "西南",
					"6": "西北",
					"7": "东北"
				};
				$.each(self.showData, function(i, item) {
					var dl = $("<dl><strong style='color: blue;'>" + areaName[i] + "</strong></dl>");
					var ul = $("<ul style='margin:0;'/>");
					dl.css(dlCss);
					$.each(item, function(k, obj) {
						var li = $("<li value='" + k.replace("_", "") + "'>" + obj + "</li>");
						li.css(css);
						// if(obj == input.val() ){
						// 	li.css({
						// 		color: 'red'
						// 	});
						// }
						ul.append(li);
					});
					dl.append(ul);
					div.append(dl);
				});
			} else {
				var ul = $("<ul style='margin:0;'/>");
				for (key in self.showData) {
					var li = $("<li value='" + key.replace("_", "") + "'>" + self.showData[key] + "</li>");
					li.css(css);
					// if(self.showData[key] == input.val() ){
					// 	li.css({
					// 		color: 'red'
					// 	});
					// }
					ul.append(li);
					input.append("<option value='" + key.replace("_", "") + "'>" + self.showData[key] + "</option>");
				}
				div.append(ul);
			}

			$("li", div).click(function(e) {
				e.stopPropagation();
				if (self.multiple) {
					// $(e.target).css({
					// 	"color": "red"
					// });
					input.val($(e.target).text()).blur();//自动触发blur时间 将选中的显示出来
					input.attr("code", $(e.target).val());
				} else {
					input.val($(e.target).text());
					input.attr("code", $(e.target).val());
					div.hide();
				}
				//校验 ？？？？不知道原来为什么要加这个校验
				// if (parseInt(input.attr("code"), 10)) {
				// 	input.removeClass('ver-error').removeAttr("data-original-title").tooltip();
				// } else {
				// 	input.addClass('ver-error').attr("data-original-title", "请重新选择预订城市").tooltip();
				// }
				// if (typeof(self.callback) == 'function') {
				// 	self.callback($(e.target).val());
				// }
				if (typeof(self.callback) == 'function') {
					var temp = {
						name : $(e.target).html(),
						code: $(e.target).attr("value")
					}
					self.callback(temp);
				}
			});
			input.parent().append(div);
		} else {
			node.show();
		}

		//弹出层隐藏
		// if(!self.multiple){
		$(document.body).click(function() {
			//出发城市弹出层隐藏
			input.parent().find("div").hide();
			if (!input.val()) {
				input.removeAttr("code");
			}
		});
		// }
	}
});