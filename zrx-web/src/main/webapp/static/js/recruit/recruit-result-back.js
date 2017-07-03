/**
 * 功能说明：面试反馈
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
			this.urlJson = tn.json.encode(tn.Base64.decode(location.hash.substr(1)));
			//简历id,需要一个面试官id
			this.orderId = this.urlJson.orderId;
			this.interviewerId = this.urlJson.interviewerId;
			this.initInterviewArrangementsId=this.urlJson.initInterviewArrangementsId;
			//安排初试复试类型 0初试 1复试 2编辑  3查看

			this.showData();
			this.bindEvent();

		},
		showData: function() {
			var self = this;
			var data = {
				orderId: self.orderId,
				interviewerId:self.interviewerId
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
							self.state=data.state;
							console.log(data)
							//基本信息展示
							var html = '';
							html += '<div class="row cl row1">';
							html += '<label class="form-label col-xs-3 col-sm-2">应聘者姓名:</label>';
							html += '<span>' + data.initInterviewerName + '</span>';
							html += '<label class="ml-30">应聘职位:</label>';
							html += '<span>' + data.intervieweeDutiesName + '</span>';
							html += '<label class="ml-30">手机号:</label>';
							html += '<span>' + data.intervieweePhone + '</span>';
							html += '</div>';
							html += '<div class="row cl row2">';
							html += '<label class="form-label col-xs-3 col-sm-2">邮箱:</label>';
							html += '<span>' + data.intervieweeMail + '</span>';
							html += '<label class="ml-30">身份证号:</label>';
							html += '<span>' + data.idNumber + '</span>';
							html += '<label class="ml-30">毕业学校:</label>';
							html += '<span>' + data.schoolName + '</span>';
							html += '</div>';
							html += '<div class="row cl row3">';
							html += '<label class="form-label col-xs-3 col-sm-2">简历名称:</label>';
							html += '<span>' + data.resumeFilename + '</span>';
							html += '</div>';
							//console.log(data);
							//初试反馈345613
							if(data.state == 3 || data.state == 4 || data.state == 5 || data.state == 6 || data.state == 13) {
								html += '<div class="row cl row4">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试安排:</label>';
								html += '<span>初试</span>';
								html += '<label class="ml-30">面试类型:</label>';
								if(data.initInterviewerType == 0) {
									html += '<span>单面</span>';
								} else {
									html += '<span>群面</span>';
								}
								html += '<label class="ml-30">面试时间:</label>';
								html += '<span>' + data.initInterviewerTime + '</span>';
								html += '</div>';
								if(data.state == 3 || data.state == 4 || data.state == 5) {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">面试结果：</label>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-1" checked  value="5">';
									html += '<label for="sex-1">通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input type="radio" id="sex-2" name="sex"  value="6">';
									html += '<label for="sex-2">未通过</label>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								} else {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">面试结果：</label>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-1" value="5">';
									html += '<label for="sex-1">通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input type="radio" id="sex-2" name="sex" checked  value="6">';
									html += '<label for="sex-2">未通过</label>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								}
								if(data.initRemark==null){
									data.initRemark='';
								}
								html += '<div class="row cl row7">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试反馈:</label>';
								html += '<textarea name="" rows="" cols="" style="width:400px;height:100px;" class="initRemarks">' + data.initRemark + '</textarea>';
								html += '</div>';
							} else if(data.state == 7 || data.state == 8 || data.state == 9 || data.state == 10 || data.state == 11 || data.state == 14) {
								html += '<div class="row cl row4">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试安排:</label>';
								html += '<span>初试</span>';
								html += '<label class="ml-30">面试类型:</label>';
								if(data.initInterviewerType == 0) {
									html += '<span>单面</span>';
								} else {
									html += '<span>群面</span>';
								}
								if(data.initRemark==null){
									data.initRemark='';
								}
								html += '<label class="ml-30">面试时间:</label>';
								html += '<span>' + data.initInterviewerTime + '</span>';
								html += '</div>';
								html += '<div class="row cl row5">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试结果:</label>';
								html += '<span>通过</span>';
								html += '</div>';
								html += '<div class="row cl row6">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试反馈:</label>';
								html += '<span>' + data.initRemark + '</span>';
								html += '</div>';
								html += '<div class="row cl row7">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试安排:</label>';
								html += '<span>复试</span>';
								html += '<label class="ml-30">面试类型:</label>';
								html += '<span>' + data.reInterviewerType + '</span>';
								html += '<label class="ml-30">面试时间:</label>';
								html += '<span>' + data.reInterviewerTime + '</span>';
								html += '</div>';
								if(data.state == 7 || data.state == 8 || data.state == 9 || data.state == 11) {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">面试结果：</label>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-1" checked value="9">';
									html += '<label for="sex-1">通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input type="radio" id="sex-2" name="sex" value="10">';
									html += '<label for="sex-2">未通过</label>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								} else {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">面试结果：</label>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-1" value="9">';
									html += '<label for="sex-1">通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input type="radio" id="sex-2" name="sex" checked value="10">';
									html += '<label for="sex-2">未通过</label>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								}
								if(data.reRemarks==null){
									data.reRemarks='';
								}
								html += '<div class="row cl row7">';
								html += '<label class="form-label col-xs-3 col-sm-2">面试反馈:</label>';
								html += '<textarea name="" rows="" cols="" style="width:400px;height:100px;" class="reRemarks">' + data.reRemarks + '</textarea>';
								html += '</div>';
								html += '</div>';
							}
							html += '<div class="row cl">';
							html += '<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">';
							if(data.state != 3 && data.state != 7 && data.state != 11) {
								html += '<button class="btn btn-primary radius save" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存</button>';
								html += '<button class="btn btn-default radius quit ml-20" type="button" >&nbsp;&nbsp;取消&nbsp;&nbsp;</button>';
							}
							html += '</div>';
							html += '</div>';
							$('#form-admin-role-add').html(html);

							//取消
							$('.quit').click(function() {
								layer_close();
							});
						}
					}
				}
			});
		},
		saveData: function() {
			$('#save').attr('disabled',true);
			var self = this;
			//state 5初试通过   9复试通过
			var data={};
			data.id=self.orderId;
			var remarksData={};
			remarksData.id=self.initInterviewArrangementsId;
			if(self.state==4 || self.state==5 || self.state==6 || self.state==13){
				data.state=$('input[name="sex"]:checked').val();
				remarksData.remarks= $('.initRemarks').val();
			}else if(self.state==8 || self.state==9 || self.state==10 || self.state==14){
				data.state=$('input[name="sex"]:checked').val();
				remarksData.remarks= $('.reRemarks').val();
			}
			console.log(data)
			Ajax.request({
				url: self.getAction().saveData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						$('#save').attr('disabled',false);
						if(json.success) {
							self.noty.info("反馈成功");
							parent.location.reload();
						} else {
							self.noty.error("保存失败，请稍后再试!");
							layer_close();
						}
					}
				}
			});
			console.log(remarksData)
			Ajax.request({
				url: self.getAction().updateArrangementsInterview,
				type: "GET",
				data: remarksData,
				listener: {
					success: function(json) {
						if(json.success) {

						}
					}
				}
			});
		},
		bindEvent: function() {
			var self = this;
			$('#admin-role-save').click(function() {
				self.saveData();
			});
			//日期选择
			$("#datepicker").datepicker({
				minDate: new Date(),
				dateFormat: "yy/mm/dd",
				//				beforeShowDay: disableSpecificDays,
				showButtonPanel: true,
				onSelect: function(selectedDate) {
					$('.froala-element .time').html('<b>&nbsp;&nbsp;面试时间：' + selectedDate + '  ' + $('#timeDuring').val() + '</b>');
				}
			});
			//添加面试时间
			$('#timeDuring').change(function() {
				$('.froala-element .time').html('<b>&nbsp;&nbsp;面试时间：' + $('#datepicker').val() + '  ' + $(this).val() + '</b>');
			});

			//保存 取消保存
			$('#form-admin-role-add').on('click','.save',function(){
				self.saveData();
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "interviewer/findArrangedInterviewByInterviewerList",
					saveData: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview:Common.action.portalUrl + "interviewer/arrangementsInterview",
					updateArrangementsInterview: Common.action.portalUrl + "interviewer/updateArrangementsInterview"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "interviewer/findArrangedInterviewByInterviewerList",
					saveData: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview:Common.action.portalUrl + "interviewer/arrangementsInterview",
					updateArrangementsInterview: Common.action.portalUrl + "interviewer/updateArrangementsInterview"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);
