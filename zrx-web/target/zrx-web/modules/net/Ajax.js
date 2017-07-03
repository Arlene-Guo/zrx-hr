
/**
 * 功能说明：Ajax
 */
window.serverTransferTest = false;
var Ajax = new function() {
		this.request = function(options) {
			return new function() {
				var uid = Cookie.get("honeydukesUid");
				var nickname = tn.Base64.decode(Cookie.get("honeydukesUname"));
				var token = Cookie.get("honeydukesSessionID");
				// if (!token || token == null || token.length == 0) {
				// 	location.href = "http://boss.tuniu.org/browser/error.html";
				// 	return false;
				// }
				if (!uid || uid == null || uid.length == 0) {
					uid = -1;
				}
				if (!nickname || nickname == null || nickname.length == 0) {
					nickname = "";
				}
				$.extend(this, defaults, options);
				var _this = this;
				_this.originalData = this.data;
				//ajax开始时间
				_this.ajaxStartTime = -1;
				//数据获取时间
				_this.dateCost = -1;
				//获取加展示
				_this.allCost = -1;
				for (var i in this.listener) {
					var functionStr = 'if ("' + i + '" == "success"){' + 'this.ajaxEnd(1);var data = arguments[0], textStatus = arguments[1];' + 'if (this.encode){' + 'try{' + 'data = Base64.decode(data);' + '}catch (e){' + 'throw new Error("后台数据返回格式错误，请进行Base64编码处理！请求地址："+this.url+"返回数据："+data);' + '}' + 'try{' + 'data = JSON.decode(data);' + '}catch (e){' + 'throw new Error("后台数据返回格式错误，请进行JSON格式检查！请求地址："+this.url+"返回数据："+data);' + '}' + '}else{' + 'data = JSON.decode(data);' + '}' + 'if(!data.success){alert(".后台数据报错：错误代码：" + data.errorCode + "，错误信息：" + data.msg);return;}else{this.listener["' + i + '"].call(this, data, textStatus);}' + '}else if("' + i + '" == "requestcomplete"){this.ajaxEnd(2);' + 'var data = arguments[0];' + 'try{' + 'data = Base64.decode(data.responseText);' + '}catch (e){' + 'throw new Error("后台数据返回格式错误，请进行Base64编码处理！请求地址："+this.url+"返回数据："+data);' + '}' + 'try{' + 'data = JSON.decode(data);' + '}catch (e){' + 'throw new Error("后台数据返回格式错误，请进行JSON格式检查！请求地址："+this.url+"返回数据："+data);' + '}' + 'this.listener["' + i + '"].call(this, data, textStatus);' + '}else if("' + i + '" == "beforesuccess"){' + 'var data = arguments[0], type = arguments[1];' + 'this.listener["' + i + '"].call(this, data, type);return data' + '}else if("' + i + '" == "error"){' + 'this.ajaxEnd(1);this.listener["' + i + '"].call(this, arguments);' + '}else{' + 'this.listener["' + i + '"].call(this, arguments);' + '}';
					this[this.addlistener[i]] = new Function(functionStr);
				}
				if (this.data && this.encode) {
					try {
						//是否由服务器中转
						var href,
							serverHref;
						if (serverTransferTest) {
							href = "http://boss.tuniu.org/ajax.php";
							serverHref = this.url.replace(/http:\/\//gi, "");
						};
						var userData;
						if (this.type === "GET") {
							userData = $.extend({
								uid: uid,
								token: token,
								nickname: nickname,
								r: Math.random()
							}, this.data);
							if (!serverTransfer) {
								userData = tn.Base64.encode(tn.json.decode(userData));
								this.url = this.url + "?" + userData;
							} else {
								userData = tn.Base64.encode(serverHref + "?" + tn.Base64.encode(tn.json.decode(userData)));
								this.url = href + "?" + userData;
							}
							delete this.data;
						}
						if (this.type === "POST") {
							var defaultData = {
								uid: uid,
								token: token,
								nickname: nickname,
								r: Math.random()
							}
							var defaultDataStr = tn.Base64.encode(tn.json.decode(defaultData));

							userData = $.extend(true, {}, defaultData, this.data)

							this.data = tn.Base64.encode(tn.json.decode(userData));
							if (serverTransfer) {
								serverHref = tn.Base64.encode(serverHref + "?" + defaultDataStr);
								this.url = href + "?" + serverHref;
							} else {
								// userData = tn.Base64.encode(tn.json.decode(userData));
								this.url = this.url + "?" + defaultDataStr;
							}
						}
					} catch (e) {
						alert(e.message);
					}
				}

				/**ajax统计开始**/
				if (_this.bossAnaly != undefined || _this.bossAnalyButton != undefined) {
					if (!isContain("beforerequest")) {
						_this.beforeSend = function(xhr) {
							_this.ajaxStart();
						};
					}
					if (!isContain("requestcomplete")) {
						_this.complete = function(xhr, status) {
							_this.ajaxEnd(2);
						};
					}
					if (!isContain("success")) {
						_this.success = function() {
							_this.ajaxEnd(1);
						};
					}
					if (!isContain("error")) {
						_this.error = function() {
							_this.ajaxEnd(1);
						};
					}
				}
				//ajax开始,执行
				_this.ajaxStart = function() {
					_this.ajaxStartTime = (new Date()).getTime();
				}
				//ajax结束,执行
				_this.ajaxEnd = function(endType) {
					_this.ajaxEndTime = (new Date()).getTime();
					if (1 == endType) {
						_this.dateCost = _this.ajaxEndTime - _this.ajaxStartTime;
					} else if (2 == endType) {
						_this.allCost = _this.ajaxEndTime - _this.ajaxStartTime;
						BossAnaly.sendData({
							"bossAnaly": _this.bossAnaly,
							"costTime": _this.allCost,
							"url": _this.url,
							"transCost": _this.dateCost,
							"data": _this.originalData,
							"bossAnalyButton": this.bossAnalyButton
						});
					}
				}
				//判断一个监听是否在该ajax的监听列表中，是返回true，否返回false;

				function isContain(actionName) {
					actionName = actionName || "";
					if (actionName.length > 0 && _this.listener) {
						for (var i in _this.listener) {
							if (actionName == i) {
								return true;
							}
						}
					}
					return false;
				} /** ajax统计结束 **/

				$.ajax(this);
				$.ajaxSetup({
					error: function(xhr) {
						if (xhr.status == 0) return;
						if (xhr.status == 200) return;
						alert("服务器请求错误，状态：" + xhr.status, "错误信息");
					}
				});
			}
		}

		var defaults = {
			url: "",
			async: true,
			cache: true,
			dataType: "text",
			type: "POST",
			encode: true,
			bossAnaly: undefined,
			bossAnalyButton: undefined,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			addlistener: {
				beforerequest: "beforeSend",
				success: "success",
				requestcomplete: "complete",
				error: "error",
				beforesuccess: "dataFilter"
			}
		}
	}