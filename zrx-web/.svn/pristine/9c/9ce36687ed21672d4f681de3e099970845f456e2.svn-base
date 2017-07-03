var cityConfig = {
	//缓存数据使用
	baseDataSet: function(callback) {
		var self = this;
		url = "http://www.tuniu.com/interface/MultiCity/GetMultiCityInfo/";
		
		if (!sessionStorage.getItem("multiCity")) {
			self.setData(url, "", function(data){
				cityConfig.data=data;
				sessionStorage.setItem("multiCity", tn.Base64.encode(tn.json.decode(data)));
				cityConfig.getDate("multiCity", data);
			});
		}else{
			cityConfig.data=tn.json.encode(tn.Base64.decode(sessionStorage.getItem("multiCity")));
			cityConfig.getDate("multiCity", tn.json.encode(tn.Base64.decode(sessionStorage.getItem("multiCity"))));
		}

		//回调函数
		if (typeof(callback) == 'function') {
			callback();
		}
	},

	getDate: function(type,data){
		if(type == "multiCity"){
			cityConfig.multiCity = {};
			//热门城市
			branchCity = {};
			//按字母存储数组。临时存放，最终赋给typeCity
			tmpCity = {};
			//展示数组
			typeCity = {};
			//所有城市，搜索用
			allCity = {};
			//字母
			cityLetter = new Array(['A','B','C','D','E','F','G'],['H','I','J','K','L','M','N'],['O','P','Q','R','S','T'],['U','V','W','X','Y','Z']);
			if (data && data.length > 0) {
				$.each(data, function(i, item) {
					$.each(item.cities, function(i2, item2) {
					//	if (item2.code == 3002) {
					//		item2.code = 3000;
					//	}
						allCity[item2.code] = item2;
						if (item2.hasBranch == 1) {
							branchCity[item2.code] = item2;
						}
						//截取第一个字母
						letter = item2.letter.substr(0, 1).toUpperCase();
						if (tmpCity[letter]) {
							tmpObj = tmpCity[letter];
						} else {
							tmpObj = {};
						}
						tmpObj[item2.code] = item2;
						tmpCity[letter] = tmpObj;
					});
				});
				//赋值给typeCity
				for (j=0; j<cityLetter.length; j++) {
					tmpStr = '';
					tmpObj = {};
					for (m=0; m<cityLetter[j].length; m++) {
						tmpLetter = cityLetter[j][m];
						if (tmpCity[tmpLetter]) {
							tmpStr += tmpLetter;
							tmpObj[tmpLetter] = tmpCity[tmpLetter];
						}
					}
					typeCity[tmpStr] = tmpObj;
				}
				cityConfig.multiCity.typeCity = typeCity;
				cityConfig.multiCity.branchCity = branchCity;
				cityConfig.multiCity.allCity = allCity;
				cityConfig.multiCity.cityLetter = cityLetter;
//				debugger;
			}
		}
	},

	setData: function (url,data,fn){
		var self = this;
		Ajax.request({
			url: url,
			type: "GET",
			data: data || {},
			listener: {
				success: function(json) {
					fn.call(self,json.data);
				}
			}
		});
	},
}

cityConfig.baseDataSet();

function initCity(options) {
	$.extend(this, options);
	this.init();
}

/**
 * 出发城市、预订城市效果和数据加载
 * @return null
 * author wl
 * time 2012年9月26日
 */
function initCityConfig(obj,callback,acceptType) {
	obj.unbind('click').click(function(e) {	
		if(acceptType!=1&&(obj.selector=='.startCity'||obj.selector=='#startCity')){			
			//仅自助游与自驾游，出发城市加上全国
			var allCity={};
			var cities=[];
			var city={};
			var data=[];
			allCity.bigClass="全国";
			city.code="0";
			city.name="全国";
			city.letter="qgcf";
			city.delFlag="0";
			city.hasBranch="1";
			cities.push(city);
			allCity.cities=cities;
			$.extend(data,cityConfig.data);
			data.push(allCity);
			cityConfig.getDate("multiCity", data);
		}else{
			cityConfig.getDate("multiCity", cityConfig.data);
		}
		e.stopPropagation();
		var input = $(this);
		var city = new initCity({
			target: $(this),
			showData: cityConfig.multiCity.typeCity,
			searchData: cityConfig.multiCity.allCity,
			branchData: cityConfig.multiCity.branchCity,
			cityLetter: cityConfig.multiCity.cityLetter,
			callback: callback
		});
	});
}

$.extend(initCity.prototype, {
	init: function() {
		this.generateDOM();
	},
	generateDOM: function() {
		var self = this;
		var input = self.target;
		var node;
		//-----------------------start  控件样式--------------------------
		var div = $("<div id='" + input.attr("id") + "CityConfigArea' class='cityConfigArea' />");
		if (!self.multiple) {
			div.css({
				left: input[0].offsetLeft,
			});
		}
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
				for (var o in obj) {
					var city = {
						"name": obj[o].name,
						"title": obj[o].name,
						"id": obj[o].code
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
							input.removeClass("ver-error").removeAttr("data-original-title").tooltip();
						} else {
							input.addClass("ver-error").attr("data-original-title", "请重新选择预订城市").tooltip();
						}
						if (data[0] && input.val() != "") {
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
				}).setData(data);
				//点击input隐藏搜索控件 解决搜索控件闪一下再出现弹出层的问题
				input.unbind("focus");
				input.keyup(function(e) {
					input.parent().find(".searchDiv").css({
						"margin-top": "0px",
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
			//热门城市
			var dl = $("<dl><dt>热门城市</dt>");
			var dd = $("<dd>");
			$.each(self.branchData, function(i, item) {
				dd.append($("<a name=\"city\" value='" + item.code + "'>" + item.name + "</a>"));
			});
			dl.append(dd);
			div.append(dl);

			var conDiv = $("<div id=\"con\">");
			var conUl = $("<ul id=\"tags\"/>");
			var contentDiv = $("<div id=\"tagContent\">");
			//按字母归类城市
			var num = 0;
			$.each(self.showData, function(i, item) {
				var tmpStr = "";
				if (num == 0) {
					tmpStr = " selectTag";
				}
				var lii = $("<li id=\"" + num + "\" class=" + tmpStr + ">" + i + "</li>");
				conUl.append(lii);
				var tagContentDiv = $("<div name=\"tagContents\" id=\"tagContent" + num + "\" class=\"tagContent" + tmpStr + "\">");
				$.each(item, function(k, obj) {
					//同一字母开头
					var lineDiv = $("<div class=\"line\">");
					var lineLeft = $("<div class=\"line_left\">" + k +"</div>");
					var lineRight = $("<div class=\"line_right\">");
					$.each(obj, function(k2, obj2) {
						lineRight.append($("<a value='" + obj2.code + "' name=\"city\">" + obj2.name + "</a>"));
					});

					lineDiv.append(lineLeft);
					lineDiv.append(lineRight);
					tagContentDiv.append(lineDiv);
				});
				contentDiv.append(tagContentDiv);
				num ++;
			});
			conDiv.append(conUl);
			conDiv.append(contentDiv);
			div.append(conDiv);

			input.parent().append(div);
			
			//点击城市处理事件
			$("a[name=city]", div).click(function(e) {

				e.stopPropagation();
				if (self.multiple) {
					input.val($(e.target).text()).blur();//自动触发blur时间 将选中的显示出来
					input.attr("code", $(e.target).attr("value"));
				} else {
					input.val($(e.target).text());
					input.attr("code", $(e.target).attr("value"));
					div.hide();
				}
				if (typeof(self.callback) == 'function') {
					var temp = {
						name : $(e.target).html(),
						code: $(e.target).attr("value")
					}
					self.callback(temp);
				}
				
				//弹出层隐藏
				div.hide();
				$(".searchDiv").hide();
				if (!input.val()) {
					input.removeAttr("code");
				}
			});

			//拼音选择事件
			$("li", div).click(function(e) {
				e.stopPropagation();
				$.each($("li", div), function(i, item) {
					this.className = "";
				});
				this.className = "selectTag";
				num = this.id;
				// 操作内容
				$.each($("div[name=tagContents]", div), function(i, item) {
					if (this.id == "tagContent" + num) {
						this.style.display = "block";
					} else {
						this.style.display = "none";
					}
				});
			});
		} else {
			node.show();
		}
		$(document.body).click(function(e) {
			e.stopPropagation();
			//出发城市弹出层隐藏
			div.hide();
			$(".searchDiv").hide();
			if (!input.val()) {
				input.removeAttr("code");
			}
		});
	}
});

