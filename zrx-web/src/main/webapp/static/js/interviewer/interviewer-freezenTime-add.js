/**
 * 功能说明：纪念册列表
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
			this.showSelfInfo();
			this.urlJson = tn.json.encode(tn.Base64.decode(location.hash.substr(1)));
			this.add = this.urlJson.add;
			if(this.add == 0) {
				this.id = this.urlJson.id;
				this.showData();
			} else {
				this.id = 0;
			}
			this.bindEvent();
		},
		showSelfInfo: function() {
			var self = this;
			var data = {
				userName: tn.json.encode(tn.Base64.decode(sessionStorage.data)).userName,
				id: tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid
			}
			Ajax.request({
				url: self.getAction().showSelfInfo,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success && json.data.rows.length != 0) {
							var data = json.data.rows[0];
							$('.interviewerName').html(data.userName);
							$('.interviewerName').attr('data-interviewerId', data.id);
							$('.dutiesName').html(data.dutiesName);
							$('.dutiesName').attr('data-dutiesNumber', data.dutiesNumber);
							$('.jobNumber').html(data.jobNumber);
						}
					}
				}
			});
		},
		showData: function() {
			var self = this;
			var data = {
				id: self.id
			};
			Ajax.request({
				url: self.getAction().showData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							console.log(json);
							var data = json.data.rows[0];
							tn.form.set($("#form-admin-role-add"), data);
							if(data.isEvery == 0 && data.interviewerName != '') {
								$('#interviewerName').val(data.interviewerId);
								$('#dutiesName').val(data.dutiesName);
								$('#jobNumber').val(data.jobNumber);
								$('.dutiesName-box').show();
								$('.jobNumber-box').show();
							}
						}
					}
				}
			});
		},
		saveData: function() {
			$('#admin-role-save').attr('disabled',true);
			var self = this;
			var subNode = $("#form-admin-role-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			var data = tn.form.get($("#form-admin-role-add"));
			data.id = self.id;
			data.isEvery = 0;
			data.interviewerId = $('.interviewerName').attr('data-interviewerId');
			data.interviewerName = $('.interviewerName').html();
			data.dutiesName = $('.dutiesName').html();
			data.dutiesNumber = $('.dutiesName').attr('data-dutiesNumber');
			data.jobNumber = $('.jobNumber').html();
			console.log(data);
			//校验冻结时间
			var dateT=data.startFreezenDate+$('select[name="startAmPm"] option:selected').html()+' '+data.endFreezenDate+$('select[name="endAmPm"] option:selected').html();
			var timeData = {
				uid: tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid,
				interviewerTime: dateT
			}
//			Ajax.request({
//				url: self.getAction().isFreezen,
//				type: "GET",
//				data: timeData,
//				listener: {
//					success: function(json) {
//						if(json.success && json.data == false) {
							Ajax.request({
								url: self.getAction().saveData,
								type: "GET",
								data: data,
								listener: {
									success: function(json) {
										$('#admin-role-save').attr('disabled',false);
										if(json.success) {
											self.noty.info("保存成功");
											parent.location.reload();
										} else {
											self.noty.error("保存失败，请稍后再试!");
											layer_close();
										}
									}
								}
							});
//						} else {
//							self.noty.error('该时间段已被冻结，请选择其他时间');
//						}
//					}
//				}
//			});
		},
		bindEvent: function() {
			var self = this;
			$('#admin-role-save').click(function() {
				self.saveData();
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "freezentime/findFreezenTimeList",
					saveData: Common.action.portalUrl + "freezentime/editFreezentime",
					showSelfInfo: Common.action.portalUrl + "user/findUsers",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "freezentime/findFreezenTimeList",
					saveData: Common.action.portalUrl + "freezentime/editFreezentime",
					showSelfInfo: Common.action.portalUrl + "user/findUsers",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);
