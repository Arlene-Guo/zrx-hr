

(function(window, document, undefined) {
	var defaultParam = {
		orderId: "",
		productId: "",
		agencyId: "",
		purchaseId: "",
		uid: tn.cookie.get("honeydukesUid")
	};
	var TrackOpeTime = function TrackOpeTime(param, callback) {
		var self = this;
		// if (!this.tuniuTracker) {
		// 	if ((typeof(_tat)) != "undefined") {
		// 		this.tuniuTracker = _tat.getTracker();
		// 	} else {
				this.tuniuTracker = {
					trackEvent: function() {
						console.log("bas system done.");
					}
				};
		// 	}

		// }
		// this.idsParam = defaultParam;
		// this.trackHandler = trackHandler;
		// if (typeof(_tat) == "undefined") {
			this.trackHandler = function() {
				console.log("bas system done.");
			};
		// }
		// //配置参数
		// if(param && tn.type.isObject(param)) {
		// 	this.idsParam = $.extend({}, defaultParam, param);
		// }
		// //绑定事件
		// $("[class*=trackAnaly]").live("click", function(e) {
		// 	trackHandler.call(self, $(e.currentTarget));
		// });
		// //回调函数
		// if (callback && tn.type.isFunction(callback)) {
		// 	callback.call(this);
		// }

		/**
		* 跟踪处理函数
		*/
		function trackHandler(element) {
			var self = this;
			//获取记录的事件id
			var eventId = "";
			//获取class类
			if(!element.attr("class")) {
				return
			}
			var trackClasses = element.attr("class").split(" ");
			$.each(trackClasses, function(i, item) {
				//判断是否具有跟踪记录的属性
				if(item.indexOf("trackAnaly_") == 0) {
					eventId = parseInt(item.split("_")[1], 10) || "";
				}
				return;
			});
			if(eventId == "") {
				return;
			}
			self.idsParam.eventId = eventId;
			self.tuniuTracker.trackEvent(self.idsParam.eventId, self.idsParam.orderId, self.idsParam.uid);
			// self.tuniuTracker.trackEvent(111);
		}
	}

	window.TrackOpeTime = TrackOpeTime;
	// new TrackOpeTime();
})(window, document);