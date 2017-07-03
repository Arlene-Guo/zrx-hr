/**
 * 功能说明：测评新增
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
		self.bindEvent();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
			this.urlJson = tn.json.encode(tn.Base64.decode(location.hash.substr(1)));
		//	this.showInterviewer();
			this.suggest();
		},
		bindEvent: function() {
			var self = this;
			$('#admin-assign-save').click(function() {
				self.saveData();
			});
		},
		saveData: function() {
			var self = this;
			var paramSave = this.urlJson;
			console.log(paramSave);
			Ajax.request({
				url: self.getAction().saveResumeDistribution,
				type: "GET",
				data: paramSave,
				listener: {
					success: function(json) {
						if(json.success) {
							self.noty.info("分配成功");
						} else {
							self.noty.error("分配失败");
						}
					}
				}
			});
		},
		showInterviewer: function() {
			var self = this;
			var data = {
				"roleName": "招聘专员"
			}
			Ajax.request({
				url: self.getAction().showInterviewer,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							var data = json.data.rows;
							var html = '';
							for(var i = 0; i < data.length; i++) {
								html += '<option value="' + data[i].userName + '">' + data[i].userName + '</option>';
							}
							$('#resumeCommissionerName').append(html);
						}
					}
				}
			});
		},
		getAction: function() {
			if(this.devcfg) {
				return {
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					saveResumeDistribution: Common.action.portalUrl + "recruiter/saveResumeDistribution"
				}
			} else {
				return {
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					saveResumeDistribution: Common.action.portalUrl + "recruiter/saveResumeDistribution"
				}
			}
		},
		suggest: function() {
			var vendor = $("input[name='userName']");
			var self=this;
			//jsrc/modudles/tn/TNSearch
			var suggest = new TNSearch({
				el: vendor,
				param: {
//					state: 1,
					start: 0,
					limit: 40
				},
				url: self.getAction().showInterviewer,
				width: 250,
				showKey: "userName",
				searchParam: "userName",
				resultField: 'rows',
				attrs: ["userName"],
				maxShowCount: 0,
				autoComplete: false,
				selectFn: function(data) {
					console.log(data);

				}
			});
			vendor.blur(function() {});
		}
	});
	window.List = new List();
})(jQuery, window);
