/**
 * 功能说明：面试官时间设置
 */
;
(function($, window) {
	function List() {
		var self = this;
		$.extend(this, {
			noty: new Noty(),
			ver: new Ver()
		});
		self.init();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
			this.bindEvent();
			this.showData();
		},
		showData: function() {
			var self = this;
			var data = {
				uid: tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid,
				type:0
			};
			Ajax.request({
				url: self.getAction().showData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success&&json.data) {
							$('#sole').val(json.data.counts);
						}
					}
				}
			});
			
			var dataAll = {
				uid: tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid,
				type:1
			};
			Ajax.request({
				url: self.getAction().showData,
				type: "GET",
				data: dataAll,
				listener: {
					success: function(json) {
						if(json.success&&json.data) {
							$('#all').val(json.data.counts);
						}
					}
				}
			});
		},
		saveData: function() {
			var self=this;
			var data={};
			var param={};
			//单面data
			data.uid=tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
			data.type=0;
			data.counts=$('#sole').val();
			//群面data
			param.uid=tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
			param.type=1;
			param.counts=$('#all').val();
			
			var arr=[];
			arr.push(data);
			arr.push(param);
			
			Ajax.request({
				url: self.getAction().saveData,
				type: "GET",
				data: {
					interviewNumbers:arr
				},
				listener: {
					success: function(json) {
						if(json.success){
							self.noty.info('添加成功');
						}
					}
				}
			});
		},
		bindEvent: function() {
			var self = this;
			$('.save').click(function() {
				self.saveData();
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "interviewer/searchInterviewNumber",
					saveData: Common.action.portalUrl + "interviewer/editInterviewNumber"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "interviewer/searchInterviewNumber",
					saveData: Common.action.portalUrl + "interviewer/editInterviewNumber"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);