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
			this.showInterviewer();
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
		showInterviewer: function() {
			var self = this;
			var data = {
				"roleName": "面试官"
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
								html += '<option value="' + data[i].id + '" data-jobNumber="' + data[i].jobNumber + '" data-dutiesName="' + data[i].dutiesName + '" data-dutiesNumber="' + data[i].dutiesNumber + '">' + data[i].userName + '</option>';
							}
							$('#interviewerName').append(html);
						}
					}
				}
			});
			//选择面试官
			$('#interviewerName').change(function() {
				if($(this).val() != '全部') {
					$('#dutiesName').val($('#interviewerName option:selected').attr('data-dutiesName'));
					$('#jobNumber').val($('#interviewerName option:selected').attr('data-jobnumber'));
					$('.dutiesName-box').show();
					$('.jobNumber-box').show();
				} else {
					$('.dutiesName-box').hide();
					$('.jobNumber-box').hide();
				}
			});
		},
		testData: {
			freezenDateStart: '2017-4-14',
			freezenDateEnd: '2017-4-16',
			am_pmStart: '上午',
			am_pmEnd: '下午',
			interviewerName: '面试官',
			dutiesName: '职务',
			jobNumber: '工号',
			delFlag: 0
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
			if($('#interviewerName').val() == '全部') {
				data.isEvery = 1;
				data.interviewerId = '';
				data.interviewerName = '';
				data.dutiesNumber = '';
				data.dutiesName = '';
				data.jobNumber = '';
			} else {
				data.isEvery = 0;
				data.interviewerId = $('#interviewerName').find('option:selected').val();
				data.interviewerName = $('#interviewerName').find('option:selected').html();
				data.dutiesNumber = $('#interviewerName').find('option:selected').attr('data-dutiesNumber');
				data.dutiesName = $('#interviewerName').find('option:selected').attr('data-dutiesName');
				data.jobNumber = $('#interviewerName').find('option:selected').attr('data-jobNumber');
			}
			console.log(data);
			//校验冻结时间
			var timeData={};
			var dateT = data.startFreezenDate + $('select[name="startAmPm"] option:selected').html() + ' ' + data.endFreezenDate + $('select[name="endAmPm"] option:selected').html();
			if($('#interviewerName option:selected').val()=='全部'){
				timeData.uid=0;
				timeData.interviewerTime=dateT;
			}else{
				timeData.uid=$('#interviewerName option:selected').val();
				timeData.interviewerTime=dateT;
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
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "freezentime/findFreezenTimeList",
					saveData: Common.action.portalUrl + "freezentime/editFreezentime",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);