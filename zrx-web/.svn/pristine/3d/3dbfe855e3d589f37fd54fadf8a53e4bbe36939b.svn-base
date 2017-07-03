

BossAnaly = (function() {
	try {
		if (BossAnaly) {
			return BossAnaly;
		}
	} catch (e) {
	}
	// 配置
	var config = {
		"loadList" : [],// 页面加载时的ajax列表,["a1","a2","a3"];
		"specialButton":["locations"],//独有的不共用的提交按钮列表
		"opType" : 0,// 操作类型，新增，编辑等
		"opObjId" : 0,// 操作对象的id
		"opObj" : "",// 操作对象
		"pageAjaxUrl" : "",// 页面加载及ajax统计的请求地址
		"operateAjaxUrl" : "",// 操作前后的url地址
		"isDebug":false//是否是debug模式
	};
	// 开始时间
	var logStartTime = performance.timing.navigationStart;
	// 结束时间
	var endTime = -1;
	// dom是否已经加载完
	var domLoadFlag = false;
	// dom加载耗时
	var staticLoadCost = -1;
	// 页面加载对应的ajax加载完成情况
	var loadListFlag = [];
	// 设置是否已经完成
	var configSetFlag = false;
	// 页面是否已经加载的标记
	var pageLoadFlag = false;
	// 设置config之前已经完成的ajax
	var beforeComplete = [];
	// 设置config之前已经完成的ajax是否已经计入标记
	var beforeCompleteFlag = false;
	// 当前的访问url
	var url = window.location.href;
	// 来源页面
	var referrerUrl = getReferrer();
	// 需要监听的所有元素的初始值
	var startValues = {};
	// 需要监听的变化了的元素的终了值
	var changedEndValues = {};
	// 需要监听的变化了的元素的初始值
	var changedStartValues = {};
	// 客服操作的开始时间
	var operateStartTime = -1;
	// 事件执行的方法
	var method = "click change focus blur";
	// 如果监控的是大的容器,需要监控的元素
	var listenElements = "input,select,textarea";
	// 监听元素含有的属性
	var bossAnalyAttr = "bossAnalyId";
	// 监听元素的取值绑定事件
	var bossAnalyEvent = "bossAnalyEvent";
	// true页面上listenElements元素有事件触发即标记事件开始，否则以监听元素为准
	var isAllElement = true;
	// 向后台提交的数据
	var changes = {};
	// 为大容器时组装数据时的分隔符
	var containerSplite = ",";
	// 当前的tab
	var currTab = "bossAnalyBody";
	// bossAnalyTab的属性名
	var bossAnalyTab = "bossAnalyTab";
	/**
	 * 等待加载到body
	 */
	function waitBody() {
		if (document.body) {
			$(document.body).attr("onload", "BossAnaly.staticLoad()");
		} else {
			setTimeout("BossAnaly.waitBody()", 10);
		}
	}
	waitBody();
	// 匿名方法返回
	return {
		/**
		 * 等待加载到body,内部使用
		 */
		waitBody : function() {
			waitBody();
		},
		/**
		 * onload事件执行
		 */
		staticLoad : function() {
			domLoadFlag = true;
			endTime = (new Date()).getTime();
			if (logStartTime) {
				staticLoadCost = endTime - logStartTime;
			}
			pageLoad();
		},
		/**
		 * 设置配置
		 */
		setConfig : function(cfg) {
			$.extend(true, config, cfg);
			// 赋值页面ajax加载列表
			if (config.loadList && config.loadList.length > 0) {
				for ( var i = 0; i < config.loadList.length; i++) {
					var loadListVar = {};
					loadListVar.name = config.loadList[i];
					loadListVar.flag = false;
					loadListFlag.push(loadListVar);
				}
			}
			beforeCompleteFlag = true;
			// 检查在配置之前时候就有页面ajax请求存在
			if (beforeComplete && beforeComplete.length > 0) {
				for ( var i = 0; i < beforeComplete.length; i++) {
					setLoadListFlag(beforeComplete[i]);
				}
			}
			configSetFlag = true;
		},
		/**
		 * 提交ajax的统计数据
		 */
		sendData : function(sendObj) {
			if (sendObj) {
				// 是对应操作的按钮
				if (sendObj.bossAnalyButton != undefined) {
					analyButtonDo(sendObj.bossAnalyButton);
				}
				if (sendObj.bossAnaly != undefined) {
					 try{
						sendObj.data=jsonDecode(sendObj.data);
					 }catch(e){}
					ajax(config.pageAjaxUrl, {
						"url" : splitUrl(sendObj.url)[0],
						"referrerUrl" : "",
						"totalCost" : sendObj.costTime,
						"staticLoadCost" : -1,
						"param" : sendObj.data
					});
				}
				if (!configSetFlag || !beforeCompleteFlag) {
					pushBeforeComplete(sendObj.bossAnaly);
				}
				if (isInLoadList(sendObj.bossAnaly)) {
					setLoadListFlag(sendObj.bossAnaly);
					pageLoad();
				} else {

				}
			}
		},
		/**
		 * 元素自定义取值
		 */
		pushEvent : function(obj, func) {
			$(obj).live(
				bossAnalyEvent,
				function(e) {
					var rs = func(this);
					$(this).unbind(bossAnalyEvent, getRs).bind(
							bossAnalyEvent, getRs);
					function getRs() {
						return rs;
					}
				});
			}
		};

	/**
	 * json转为字符串
	 */
	function jsonDecode(o) {
		var useHasOwn = !!{}.hasOwnProperty;
		var pad = function(n) {
			return n < 10 ? "0" + n : n;
		};
		var m = {
			"\b" : '\\b',
			"\t" : '\\t',
			"\n" : '\\n',
			"\f" : '\\f',
			"\r" : '\\r',
			'"' : '\\"',
			"\\" : '\\\\'
		};
		var encodeString = function(s) {
			if (/["\\\x00-\x1f]/.test(s)) {
				return '"'
						+ s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
							var c = m[b];
							if (c) {
								return c;
							}
							c = b.charCodeAt();
							return "\\u00" + Math.floor(c / 16).toString(16)
									+ (c % 16).toString(16);
						}) + '"';
			}
			return '"' + s + '"';
		};
		var encodeArray = function(o) {
			var a = [ "[" ], b, i, l = o.length, v;
			for (i = 0; i < l; i += 1) {
				v = o[i];
				switch (typeof v) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if (b) {
						a.push(',');
					}
					a.push(v === null ? "null" : JSON.encode(v));
					b = true;
				}
			}
			a.push("]");
			return a.join("");
		};
		var encodeDate = function(o) {
			return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
					+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
					+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
		};
		if (typeof o == "undefined" || o === null) {
			return "null";
		} else if (o instanceof Array) {
			return encodeArray(o);
		} else if (o instanceof Date) {
			return encodeDate(o);
		} else if (typeof o == "string") {
			return encodeString(o);
		} else if (typeof o == "number") {
			return isFinite(o) ? String(o) : "null";
		} else if (typeof o == "boolean") {
			return String(o);
		} else {
			var a = [ "{" ], b, i, v;
			for (i in o) {
				if (!useHasOwn || o.hasOwnProperty(i)) {
					v = o[i];
					switch (typeof v) {
					case "undefined":
					case "function":
					case "unknown":
						break;
					default:
						if (b) {
							a.push(',');
						}
						a.push(jsonDecode(i), ":", v === null ? "null"
								: jsonDecode(v));
						b = true;
					}
				}
			}
			a.push("}");
			return a.join("");
		}
	}
	/**
	 * 分离url中的路径和参数
	 */
	function splitUrl(sendUrl, isBase64, isDecode) {
		var reg = new RegExp("(([^\\?]*)(\\?(.*)))+");
		ps = sendUrl.match(reg);
		var dataArray = [];
		if (ps && ps.length > 0) {
			dataArray.push(ps[2] ? ps[2] : sendUrl);
			dataArray.push(ps[4] ? ps[4] : "");
		} else {
			dataArray.push(sendUrl);
			dataArray.push("");
		}
		if (isBase64 && dataArray.length > 0) {
			try {
				dataArray[1] = Base64.decode(dataArray[1]);
			} catch (e) {
			}
		}
		if (isDecode
				&& ($.isPlainObject(dataArray[1]) || $.isArray(dataArray[1]))) {
			 try {
				dataArray[1] = jsonDecode(dataArray[1]);
			 } catch (e) {
			 }
		}
		return dataArray;
	}
	/**
	 * 判断是否已经执行完成，如果已经完成则提交数据
	 */
	function pageLoad() {
		// 如果页面已经全部加载，直接返回
		if (pageLoadFlag) {
			return;
		}
		if (domLoadFlag && configSetFlag) {
			if (loadListFlag && loadListFlag.length > 0) {
				var allFalg = true;
				for ( var i = 0; i < loadListFlag.length; i++) {
					if (!loadListFlag[i].flag) {
						allFalg = false;
						break;
					}
				}
				if (allFalg) {
					endTime = (new Date()).getTime();
					pageLoadFlag = true;
					// 初始化监听
					listenerInit();
					var urlInfo = splitUrl(url, true, true);
					ajax(config.pageAjaxUrl, {
						"url" : urlInfo[0],
						"referrerUrl" : referrerUrl,
						"totalCost" : endTime - logStartTime,
						"staticLoadCost" : staticLoadCost,
						"isPageLoad" : 1,
						"param" : urlInfo[1]
					});
				} else {
				}
			} else {
				endTime = (new Date()).getTime();
				pageLoadFlag = true;
				// 初始化监听
				listenerInit();
				var urlInfo = splitUrl(url, true, true);
				ajax(config.pageAjaxUrl, {
					"url" : urlInfo[0],
					"referrerUrl" : referrerUrl,
					"totalCost" : staticLoadCost,
					"staticLoadCost" : staticLoadCost,
					"isPageLoad" : 1,
					"param" : urlInfo[1]
				});
			}
		} else {
		}
		return;
	}

	/**
	 * 判断当前的ajax请求是不是页面加载的请求
	 */
	function isInLoadList(reqName) {
		reqName = reqName || "";
		if (reqName && config.loadList && config.loadList.length > 0) {
			for ( var i = 0; i < config.loadList.length; i++) {
				if (reqName == config.loadList[i]) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 改变页面的ajax的请求状态，设置为true
	 */
	function setLoadListFlag(ajaxName) {
		ajaxName = ajaxName || "";
		if (ajaxName.length > 0 && loadListFlag && loadListFlag.length > 0) {
			for ( var i = 0; i < loadListFlag.length; i++) {
				if (ajaxName == loadListFlag[i].name) {
					loadListFlag[i].flag = true;
				}
			}
		}
	}

	/**
	 * 将ajax,push到beforeComplete
	 */
	function pushBeforeComplete(ajaxName) {
		ajaxName = ajaxName || "";
		// ajaxName长度大于0才有资格
		if (ajaxName.length > 0) {
			var containFlag = false;
			// 是否已经存在
			if (beforeComplete.length > 0) {
				for ( var i = 0; i < beforeComplete.length; i++) {
					if (ajaxName == beforeComplete[i]) {
						containFlag = true;
					}
					break;
				}
			}
			// 不存在则push
			if (!containFlag) {
				beforeComplete.push(ajaxName);
			}
		}
	}

	/**
	 * 获取页面referrer信息
	 */
	function getReferrer() {
		var referrer = '';
		try {
			referrer = top.documentAlias.referrer;
		} catch (e) {
			if (parent) {
				try {
					referrer = parent.document.referrer;// iframe框架
				} catch (e2) {
					referrer = '';
				}
			}
		}
		if (referrer === '') {
			referrer = document.referrer;
		}
		return referrer;
	}

	/**
	 * ajax请求
	 */
	function ajax(url, data) {
		if(config.isDebug){
			console.debug("data",data);
		}
		data = Base64.encode(JSON.encode(data));
		$.ajax({
			url : url,
			type : "POST",
			data : data,
			dataType : "text",
			success : function() {
			},
			error : function() {
			}
		});
	}

	/**
	 * 初始化监听器
	 */
	function listenerInit() {
		var listenList;
		if (isAllElement) {
			listenList = $(listenElements);
		} else {
			listenList = $("[" + bossAnalyAttr + "]");
		}
		$("a,.btn,button,input[type=button],input[type=submit]").live("click",function(e){
			listenerDo(this);
		});
		listenList.live(method, function(e) {
			listenerDo(this);
		});
		for ( var i = 0; i < listenList.length; i++) {
			var liveObjs = getContainerObjs(listenList[i]);// 大容器处理
			if(liveObjs.length>0){
				$(liveObjs).live(method, function(e) {
					listenerDo(this);
				});
			}
		}
		startValues = getCurrValues();
	}
	/**
	 * 监听到终止按钮的操作
	 */
	function analyButtonDo(name) {
		var tabValue = $("[" + bossAnalyTab + "]");
		var isContain = false;
		if(name && name.length>0){
			for (var i = 0; i < config.specialButton.length; i++) {
				if (config.specialButton[i] == name) {
					isContain = true;
				}
			}
			if(isContain && currTab!=name){
				currTab=name;
				startValues = getCurrValues();
				oparateEnd(true);
			}else{
				oparateEnd();
			}
		}else{
			oparateEnd();
		}
	}
	/**
	 * 每次监听到的事件执行的方法
	 */
	function listenerDo(t) {
		if (operateStartTime == -1 || isTabChange()) {
			operateStartTime = (new Date()).getTime();
		}
		/**
		 * 判断当前的tab有没有发生变化
		 */
		function isTabChange() {
			var tabs = $(t).parents("[" + bossAnalyTab + "]");
			if (tabs.length > 0) {
				var tabName = $(tabs[0]).attr(bossAnalyTab);
				if (tabName != currTab) {
					currTab = tabName;
					startValues = getCurrValues();
					return true;
				}
			}
			return false;
		}
	}
	;

	/**
	 * 取得当前的受到监控的元素的值
	 */
	function getCurrValues() {
		var currValues = getObjValue(currTab == "bossAnalyBody" ? null : $("["
				+ bossAnalyTab + "=" + currTab + "]"));
		return currValues;
	}

	/**
	 * 取得所有的需要监听的第一层元素
	 */
	function getFisrtLevelListener(obj) {
		var returnListener = [];
		if (obj) {// 取得指定元素的第一层子元素，取得所有的子元素
			var allEles = getHasBAIdSon(obj);
			var containFlag = false;
			var bossAnalysId;
			for ( var i = 0; i < allEles.length; i++) {
				containFlag = false;
				var parents = getHasBAIdParents(allEles[i]);
				for ( var j = 0; j < parents.length; j++) {
					for ( var k = 0; k < allEles.length; k++) {
						if (i == k) {
							continue;
						}
						if (allEles[k] == parents[j]) {
							containFlag = true;
							break;
						}
					}
					if (containFlag) {
						break;
					}
				}
				if (!containFlag) {
					returnListener.push(allEles[i]);
				}
			}
		} else {
			var allEles = getHasBAIdSon();
			for ( var i = 0; i < allEles.length; i++) {
				if (!parentsHasBAId(allEles[i])) {
					returnListener.push(allEles[i]);
				}
			}
		}
		return returnListener;
	}

	/**
	 * 取得某个元素的监听标记值
	 */
	function getObjBAId(obj) {
		return $(obj).attr(bossAnalyAttr);
	}

	/**
	 * 是否有含有属性bossAnalyId的祖先节点
	 */
	function parentsHasBAId(obj) {
		return getHasBAIdParents(obj).length == 0 ? false : true;
	}

	/**
	 * 获取含有bossAnalyId属性的祖先节点
	 */
	function getHasBAIdParents(obj) {
		return $(obj).parents("[" + bossAnalyAttr + "]");
	}

	/**
	 * 取得指定元素下的所有的含有属性bossAnalyId的子元素
	 */
	function getHasBAIdSon(obj) {
		return obj ? $("[" + bossAnalyAttr + "]", obj) : $("[" + bossAnalyAttr
				+ "]");
	}

	/**
	 * 判断该元素下面有没有含有bossAnalyId的子元素
	 */
	function hasKeyListener(obj) {
		var eleHasKey = $([ bossAnalyAttr ], obj);
		return eleHasKey.length == 0 ? false : true;
	}
	;

	/**
	 * 判断一个元素是不是大的容器,里面包含input,textarea,select等
	 */
	function isContainer(obj) {
		var containerObjs = getContainerObjs(obj);
		if (containerObjs.length == 0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 获取容器里的所有可输入元素
	 */
	function getContainerObjs(container) {
		return $(listenElements, container);
	}

	/**
	 * 取得被监听元素的值
	 */
	function getObjValue(obj) {
		var objVal;
		var sonObjs = getFisrtLevelListener(obj);
		if (sonObjs.length > 0) {
			objVal = {};
			for ( var i = 0; i < sonObjs.length; i++) {
				var bossAnalyId = getObjBAId(sonObjs[i]);
				var currentValue=getObjValue(sonObjs[i])
				if(currentValue!=undefined){
					objVal[bossAnalyId] =currentValue;
				};
			}
		} else {
			if (!obj) {
				return {};
			} else {
				if (isContainer(obj)) {// 是容器
					objVal = {};
					var actVal = "";
					var sons = getContainerObjs(obj);
					for ( var i = 0; i < sons.length; i++) {
						var currentVal=getValue(sons[i]);
						if(currentVal!=undefined){
							actVal = actVal + currentVal;
						}
						if (i != sons.length - 1) {
							actVal = actVal + containerSplite;
						}
					}
					objVal.isContainer = true;// 单一容器标记
					objVal.value = actVal;
				} else {// 是单一的可输入元素
					objVal = getValue(obj);
				}
			}
		}
		return objVal;
	}

	/**
	 * 取得某一个具体的可输入对象的value值，取value属性或通过自定义事件取得
	 */
	function getValue(currObj) {
		//单选框，多选框特殊处理
		if($(currObj).attr("type")=="radio" && !(currObj.checked)){
			return undefined;
		}
		if($(currObj).attr("type")=="checkbox"){
			var checkFlag=false;
			if($(currObj).attr("bossAnalyCheck")!=undefined){
				checkFlag=true;
			}else{
				if(($(currObj).parents("[bossAnalyCheck]")).length>0){
					checkFlag=true;
				}
			}
			if(!checkFlag && !(currObj.checked)){
				return undefined;
			}
		}
		var objVal;
		try {
			$(currObj).trigger(bossAnalyEvent);
			objVal = $(currObj).triggerHandler(bossAnalyEvent);// 通过自定义事件取值
		} catch (e) {
			objVal = undefined;
		}
		if (objVal == undefined) {
			objVal = $(currObj).val();
		}
		//自定义操作类型
		if(!$.isEmptyObject(changes)){
			if($(currObj).attr("bossAnalyOpType")!=undefined || $(currObj).parents("[bossAnalyOpType]").length>0){
				var opType=$(currObj).attr("bossAnalyOpType");
				if(opType==undefined){
					opType=$(currObj).parents("[bossAnalyOpType]").attr("bossAnalyOpType");
				}
				if(opType=="add"){
					changes.add[$(currObj).attr(bossAnalyAttr)]=objVal;
					objVal=undefined;
				}else if(opType=="edit"){
					changes.edit.before[$(currObj).attr(bossAnalyAttr)]="";
					changes.edit.after[$(currObj).attr(bossAnalyAttr)]=objVal;
					objVal=undefined;
				}
			}
		}
		return objVal;
	}

	/**
	 * 比较操作前和操作后的数据
	 */
	function compare() {
		changes = {
			"edit" : {
				"before" : {},
				"after" : {}
			},
			"add" : {},
			"del" : {}
		};
		var endValue = getCurrValues();
		var containFlag = false;
		new2Old(endValue,startValues,true);
		new2Old(startValues,endValue,false);
		function new2Old(obj1,obj2,allFlag) {
			for ( var i in obj1) {
				containFlag = false;
				if ($.isPlainObject(obj1[i])) {
					if (obj1[i].isContainer) {
						compareWith(i, obj1[i].value, obj2, allFlag);
					}
				} else {
					compareWith(i, obj1[i], obj2, allFlag);
				}
			}
		}
		/**
		 * 对象和另外一个对象比较
		 *
		 * @param flag
		 *            如果是后面的和前面的比较，则用true
		 */
		function compareWith(key, value, cmpObj, flag) {
			if ($.isPlainObject(cmpObj)) {
				var hasFlag = false;
				deepCmp(cmpObj);
				if (!hasFlag) {
					if (flag) {// 是增加
						changes.add[key] = value;
					} else {// 是删除
						changes.del[key] = value;
					}
				}
			}
			function deepCmp(deepObj) {// 递归出所有的需要监控的值
				for ( var i in deepObj) {
					if (i == key) {
						if ($.isPlainObject(deepObj[i])) {
							if (!deepObj[i].isContainer) {
								break;
							}
							if (flag) {
								containerCmp(deepObj[i].value, value, key);
							}
						} else {
							if (flag && value != deepObj[i]) {
								changes.edit.before[key] = deepObj[i];
								changes.edit.after[key] = value;
							}
						}
						hasFlag = true;
						return;
					} else {
						if ($.isPlainObject(deepObj[i])) {
							deepCmp(deepObj[i]);
						}
					}
				}
			}
			/**
			 * 比较容器的新旧值
			 */
			function containerCmp(oldValue, newValue, key) {
				var oldvs = [];
				var newvs = [];
				if (oldValue && oldValue.length > 0) {
					oldvs = oldValue.split(containerSplite);
				}
				if (newValue && newValue.length > 0) {
					newvs = newValue.split(containerSplite);
				}
				// 循环出删除的
				var containFlag = false;
				for ( var i = 0; i < oldvs.length; i++) {
					for ( var j = 0; j < newvs.length; j++) {
						if (oldvs[i] == newvs[j]) {
							containFlag = true;
							break;
						}
					}
					if (!containFlag) {
						if (changes.del[key]) {
							changes.del[key] = changes.del[key]
									+ containerSplite + oldvs[i];
						} else {
							changes.del[key] = oldvs[i];
						}
					}
					containFlag = false;
				}
				// 循环出新增的
				for ( var i = 0; i < newvs.length; i++) {
					for ( var j = 0; j < oldvs.length; j++) {
						if (newvs[i] == oldvs[j]) {
							containFlag = true;
							break;
						}
					}
					if (!containFlag) {
						if (changes.add[key]) {
							changes.add[key] = changes.add[key]
									+ containerSplite + newvs[i];
						} else {
							changes.add[key] = newvs[i];
						}
					}
					containFlag = false;
				}
			}
		}
	}
	/**
	 * 操作终止按钮的操作
	 */
	function oparateEnd(noActionFlag) {
		var costTime;
		if(operateStartTime==-1){
			costTime = 0;
		}else{
			costTime = (new Date()).getTime() - operateStartTime;
		}
		if (!noActionFlag) {
			compare();// 操作前后比较
		} else {
			changes = {
				"edit" : {
					"before" : {},
					"after" : {}
				},
				"add" : {},
				"del" : {}
			};
		}
		var operateVars = {
			"opCost" : costTime,
			"opContent" : jsonDecode(changes),
			"opType" : config.opType,
			"opObjectId" : config.opObjId,
			"opObject" : config.opObj
		};
		ajax(config.operateAjaxUrl,operateVars);
		operateStartTime = -1;
		changes={};
		startValues = getCurrValues();
	}
}());