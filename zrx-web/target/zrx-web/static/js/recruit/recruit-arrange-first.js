/**
 * 功能说明：面试安排
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
			this.id = this.urlJson.id;
			this.arrangementsId=this.urlJson.arrangementsId;
			//安排初试复试类型 0初试 1复试 3编辑  2查看
			this.arrangements = this.urlJson.arrangements;
			if(this.arrangements == 2 || this.arrangements == 3) {
				if(this.arrangements == 2) {
					$('#form-admin-role-add').find('input').attr('disabled', 'disabled');
					$('#form-admin-role-add').find('textarea').attr('disabled', 'disabled');
					$('.option_button').remove();
				}
			}
			this.showData();
			this.bindEvent();
			this.showInterviewer();
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
								html += '<option value="' + data[i].id + '" data-jobNumber="' + data[i].jobNumber + '" data-dutiesName="' + data[i].dutiesName + '" data-email="' + data[i].email + '">' + data[i].userName + '</option>';
							}
							$('#interviewerName').append(html);
							$('.dutiesName').html($('#interviewerName').find('option:selected').attr('data-dutiesName'));
							$('.jobNumber').html($('#interviewerName').find('option:selected').attr('data-jobNumber'));
							$('.email').html($('#interviewerName').find('option:selected').attr('data-email'));
						}
					}
				}
			});
			//选择面试官
			$('#interviewerName').change(function() {
				$('.dutiesName').html($('#interviewerName').find('option:selected').attr('data-dutiesName'));
				$('.jobNumber').html($('#interviewerName').find('option:selected').attr('data-jobNumber'));
				$('.email').html($('#interviewerName').find('option:selected').attr('data-email'));
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
							var data = json.data.rows[0];
							var showResumeData = {};
							showResumeData.resumeId = data.resumeId;
							if(data.interviewOrderId == null) {
								showResumeData.interviewOrderId = 0;
							} else {
								showResumeData.interviewOrderId = data.interviewOrderId;
							}
							if(self.arrangements==0||self.arrangements==1){
								showResumeData.id=0;
							}else{
								showResumeData.id=self.arrangementsId;
							}
							showResumeData.intervieweeName = data.intervieweeName;
							showResumeData.intervieweePhone = data.intervieweePhone;
							showResumeData.intervieweeDutiesId = data.intervieweeDutiesId;
							showResumeData.intervieweeDutiesName = data.intervieweeDutiesName;
							showResumeData.intervieweeMail = data.intervieweeMail;
							showResumeData.schoolId = data.schoolId;
							showResumeData.schoolName = data.schoolName;
							showResumeData.resumeFilename = data.resumeFilename;
							showResumeData.resumePath = data.resumePath;
							showResumeData.idNumber = data.idNumber;
							showResumeData.resumeDistributionId = data.id;
							showResumeData.resumeCommissionerId = data.resumeCommissionerId;
							self.showResumeData = showResumeData;
							//基本信息展示
							$('input[name="resumeRecipient"]').val(data.intervieweeMail);
							$('.intervieweeName').html(data.intervieweeName);
							$('.intervieweeDutiesName').html(data.intervieweeDutiesName);
							$('.intervieweeMail').html(data.intervieweeMail);
							$('.intervieweePhone').html(data.intervieweePhone);
							self.emailshow(data);
						}
					}
				}
			});
		},
		emailshow: function(data) {
			var self = this;
			//如果面试单id存在展示全部信息
			if(data.interviewOrderId != '' && data.interviewOrderId != null && data.state != 5) {
				Ajax.request({
					url: self.getAction().arrangedList,
					data: {
						interviewerOrderId: data.interviewOrderId
					},
					type: "GET",
					listener: {
						success: function(json) {
							if(json.success) {
								var json = json.data.rows[0];
								console.log(json)
								if(json.reInterviewerId != '' && json.reInterviewerId != null) {
									$('#datepicker').val(json.reInterviewerTime.split(' ')[0]);
									$('#timeDuring').val(json.reInterviewerTime.split(' ')[1]);
									//设置面试类型
									$('#interviewerType option').each(function(i, v) {
										if($('#interviewerType option').eq(i).val() == json.reType) {
											$(this).attr("selected", "selected");
										}
									});
									//设置面试官
									$('#interviewerName option').each(function(i, v) {
										if($('#interviewerName option').eq(i).text() == json.reInterviewerName) {
											$(this).attr("selected", "selected");
											$('.dutiesName').html($(this).attr('data-dutiesname'));
											$('.jobNumber').html($(this).attr('data-jobnumber'));
											$('.email').html($(this).attr('data-email'));
										}
									});
									//赋值主题
									var html = '';
									html += '<p style="text-align: center;"><span style="font-size: 24px;">中融信面试邀请函</span></p>';
									html += '<p>亲爱的' + json.intervieweeName + '</p>';
									html += '<p>&nbsp;&nbsp;您好！</p>';
									html += '<p>&nbsp;&nbsp;感谢您对中融信的关注，您的经历和背景给我留下了深刻印象，为了我们能有进一步的了解，现诚邀您至我司进行面试详谈。</p>';
									html += '<p><u>&nbsp;&nbsp;具体信息如下：</u></p>';
									html += '<p><u></u><u>&nbsp;&nbsp;</u><b style="line-height: 22.4px;">公司名称</b><b style="line-height: 22.4px;">：</b><b style="line-height: 22.4px;"> </b>北京中融信融资担保有限公司</p>';
									html += '<p><b>&nbsp;&nbsp;应聘职位：' + json.intervieweeDutiesName + '</b> </p>';
									html += '<p class="time"><b>&nbsp;&nbsp;面试时间：' + json.reInterviewerTime + '</b> </p>';
									html += '<p><b>&nbsp;&nbsp;面试地址：</b>北京市东城区建国门北大街金成建国5号3层</p>';
									html += '<p><b>&nbsp;&nbsp;乘车路线：</b>1）公交：乘44内（外）、90内（外）、208（夜班）、609、650、特12内（外）、特2路到雅宝路站，步行230米即到金成建国5号。</p>';
									html += '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2）地铁：1、2号线建国门站下车(A西北口出)西北方向步行至建国门北大街直行450米即到。</p>';
									html += '<p><b>&nbsp;&nbsp;联系人：</b> </p>';
									html += '<p><b>&nbsp;&nbsp;联系电话：</b> </p>';
									html += '<p><b>面试</b><b> </b><b>特别</b><b> </b><b>注意事项：</b></p>';
									html += '<p>&nbsp;1、面试请务必准时，以体现您良好的职业素养。</p>';
									html += '<p><b>&nbsp;&nbsp;如因突发情况不能准时参加面试，请及时和我们联系，以便调整面试时间；</b></p>';
									html += '<p><b></b><b>&nbsp;&nbsp;如因个人原因放弃面试机会，请告知我们，今后如有合适机会我们将为您保留面试机会；</b></p>';
									html += '<p><b>&nbsp;&nbsp;如个人无故放弃面试机会，您将不能进入我们的人才储备库，也将失去今后的面试机会。</b></p>';
									html += '<p>&nbsp;2、请携带简历、笔和相关个人作品。</p>';
									html += '<p>&nbsp;北京中融信融资担保有限公司</p>';
									html += '<p>&nbsp;招聘部</p>';
									$('#edit').editable({
										inlineMode: false,
										alwaysBlank: false,
										language: "zh_cn",
										theme: 'gray',
										//模版
										height: '200px' //高度
									});
									$('#edit .froala-element').html(html);
								} else {
									$('#datepicker').val(json.initInterviewerTime.split(' ')[0]);
									$('#timeDuring').val(json.initInterviewerTime.split(' ')[1]);
									//设置面试类型
									$('#interviewerType option').each(function(i, v) {
										if($('#interviewerType option').eq(i).val() == json.initType) {
											$(this).attr("selected", "selected");
										}
									});
									//设置面试官
									$('#interviewerName option').each(function(i, v) {
										if($('#interviewerName option').eq(i).text() == json.initInterviewerName) {
											$(this).attr("selected", "selected");
											$('.dutiesName').html($(this).attr('data-dutiesname'));
											$('.jobNumber').html($(this).attr('data-jobnumber'));
											$('.email').html($(this).attr('data-email'));
										}
									});
									//赋值主题
									var html = '';
									html += '<p style="text-align: center;"><span style="font-size: 24px;">中融信面试邀请函</span></p>';
									html += '<p>亲爱的' + json.intervieweeName + '</p>';
									html += '<p>&nbsp;&nbsp;您好！</p>';
									html += '<p>&nbsp;&nbsp;感谢您对中融信的关注，您的经历和背景给我留下了深刻印象，为了我们能有进一步的了解，现诚邀您至我司进行面试详谈。</p>';
									html += '<p><u>&nbsp;&nbsp;具体信息如下：</u></p>';
									html += '<p><u></u><u>&nbsp;&nbsp;</u><b style="line-height: 22.4px;">公司名称</b><b style="line-height: 22.4px;">：</b><b style="line-height: 22.4px;"> </b>北京中融信融资担保有限公司</p>';
									html += '<p><b>&nbsp;&nbsp;应聘职位：' + json.intervieweeDutiesName + '</b> </p>';
									html += '<p class="time"><b>&nbsp;&nbsp;面试时间：' + json.initInterviewerTime + '</b> </p>';
									html += '<p><b>&nbsp;&nbsp;面试地址：</b>北京市东城区建国门北大街金成建国5号3层</p>';
									html += '<p><b>&nbsp;&nbsp;乘车路线：</b>1）公交：乘44内（外）、90内（外）、208（夜班）、609、650、特12内（外）、特2路到雅宝路站，步行230米即到金成建国5号。</p>';
									html += '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2）地铁：1、2号线建国门站下车(A西北口出)西北方向步行至建国门北大街直行450米即到。</p>';
									html += '<p><b>&nbsp;&nbsp;联系人：</b> </p>';
									html += '<p><b>&nbsp;&nbsp;联系电话：</b> </p>';
									html += '<p><b>面试</b><b> </b><b>特别</b><b> </b><b>注意事项：</b></p>';
									html += '<p>&nbsp;1、面试请务必准时，以体现您良好的职业素养。</p>';
									html += '<p><b>&nbsp;&nbsp;如因突发情况不能准时参加面试，请及时和我们联系，以便调整面试时间；</b></p>';
									html += '<p><b></b><b>&nbsp;&nbsp;如因个人原因放弃面试机会，请告知我们，今后如有合适机会我们将为您保留面试机会；</b></p>';
									html += '<p><b>&nbsp;&nbsp;如个人无故放弃面试机会，您将不能进入我们的人才储备库，也将失去今后的面试机会。</b></p>';
									html += '<p>&nbsp;2、请携带简历、笔和相关个人作品。</p>';
									html += '<p>&nbsp;北京中融信融资担保有限公司</p>';
									html += '<p>&nbsp;招聘部</p>';
									$('#edit').editable({
										inlineMode: false,
										alwaysBlank: false,
										language: "zh_cn",
										theme: 'gray',
										//模版
										height: '200px' //高度
									});
									$('#edit .froala-element').html(html);
								}

							}
						}
					}
				});
			} else {
				var html = '';
				html += '<p style="text-align: center;"><span style="font-size: 24px;">中融信面试邀请函</span></p>';
				html += '<p>亲爱的' + data.intervieweeName + '</p>';
				html += '<p>&nbsp;&nbsp;您好！</p>';
				html += '<p>&nbsp;&nbsp;感谢您对中融信的关注，您的经历和背景给我留下了深刻印象，为了我们能有进一步的了解，现诚邀您至我司进行面试详谈。</p>';
				html += '<p><u>&nbsp;&nbsp;具体信息如下：</u></p>';
				html += '<p><u></u><u>&nbsp;&nbsp;</u><b style="line-height: 22.4px;">公司名称</b><b style="line-height: 22.4px;">：</b><b style="line-height: 22.4px;"> </b>北京中融信融资担保有限公司</p>';
				html += '<p><b>&nbsp;&nbsp;应聘职位：' + data.intervieweeDutiesName + '</b> </p>';
				html += '<p class="time"><b>&nbsp;&nbsp;面试时间：</b> </p>';
				html += '<p><b>&nbsp;&nbsp;面试地址：</b>北京市东城区建国门北大街金成建国5号3层</p>';
				html += '<p><b>&nbsp;&nbsp;乘车路线：</b>1）公交：乘44内（外）、90内（外）、208（夜班）、609、650、特12内（外）、特2路到雅宝路站，步行230米即到金成建国5号。</p>';
				html += '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2）地铁：1、2号线建国门站下车(A西北口出)西北方向步行至建国门北大街直行450米即到。</p>';
				html += '<p><b>&nbsp;&nbsp;联系人：</b> </p>';
				html += '<p><b>&nbsp;&nbsp;联系电话：</b> </p>';
				html += '<p><b>面试</b><b> </b><b>特别</b><b> </b><b>注意事项：</b></p>';
				html += '<p>&nbsp;1、面试请务必准时，以体现您良好的职业素养。</p>';
				html += '<p><b>&nbsp;&nbsp;如因突发情况不能准时参加面试，请及时和我们联系，以便调整面试时间；</b></p>';
				html += '<p><b></b><b>&nbsp;&nbsp;如因个人原因放弃面试机会，请告知我们，今后如有合适机会我们将为您保留面试机会；</b></p>';
				html += '<p><b>&nbsp;&nbsp;如个人无故放弃面试机会，您将不能进入我们的人才储备库，也将失去今后的面试机会。</b></p>';
				html += '<p>&nbsp;2、请携带简历、笔和相关个人作品。</p>';
				html += '<p>&nbsp;北京中融信融资担保有限公司</p>';
				html += '<p>&nbsp;招聘部</p>';
				$('#edit').editable({
					inlineMode: false,
					alwaysBlank: false,
					language: "zh_cn",
					theme: 'gray',
					//模版
					height: '200px' //高度
				});
				$('#edit .froala-element').html(html);
			}
		},
		saveData: function() {
			$('#admin-role-save').attr('disabled',true);
			var self = this;
			//去掉input的属性
			$('input').removeClass('ver-error');
			$('textarea').removeClass('ver-error');
			//判断邮件发送面试官是否勾选
			if($('.interviewerMailTemp-check').attr('checked') == 'checked') {
				$('textarea[name="interviewerMailTemp"]').attr('ver-required', 'true');
			} else {
				$('textarea[name="interviewerMailTemp"]').removeAttr('ver-required');
			}
			//校验必填项
			var subNode = $("#form-admin-role-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			var data = self.showResumeData;
			if(self.arrangements == 0) {
				data.type = 0;
			} else if(self.arrangements == 1) {
				data.type = 1;
			}
			var dateT = $('#datepicker').val().replace(/\//g, '-');
			data.interviewerId = $('#interviewerName').val();
			data.interviewerName = $('#interviewerName option:selected').html();
			data.interviewerTime = dateT + ' ' + $('#timeDuring').val();
			data.interviewerType = $('#type').val();
			data.intervieweeMailSubject = $('#resumeSubject').val();
			data.intervieweeMailContent = $('#edit .froala-element').html();
			
			var timeData = {
				uid: $('#interviewerName option:selected').val(),
				interviewerTime: dateT + ' ' + $('#timeDuring').val()
			}
			//console.log(data);
			Ajax.request({
				url: self.getAction().isFreezen,
				type: "GET",
				data: timeData,
				listener: {
					success: function(json) {
						if(json.success && json.data == false) {
							var url = '';
							if(self.arrangements == 3) {
								url = self.getAction().updateArrangementsInterview;
								Ajax.request({
									url: url,
									type: "GET",
									data: data,
									listener: {
										success: function(json) {
											$('#admin-role-save').attr('disabled',false);
											if(json.success&&json.errorCode!=10080) {
												if(self.add == 0) {
													self.noty.info("保存成功");
												} else {
													self.noty.info("保存成功");
													parent.location.reload();
												}
											} else {
												self.noty.error("该面试官该时间段安排人数已达上线!");
											}
										}
									}
								});
							} else {
								url = self.getAction().arrangementsInterview;
								Ajax.request({
									url: url,
									type: "POST",
									data: data,
									listener: {
										success: function(json) {
											$('#admin-role-save').attr('disabled',false);
											if(json.success&&json.errorCode!=10080) {
												if(self.add == 0) {
													self.noty.info("保存成功");
												} else {
													self.noty.info("保存成功");
													parent.location.reload();
												}
											} else {
												self.noty.error("该面试官该时间段安排人数已达上线!");
											}
										}
									}
								});
							}
						} else {
							$('#admin-role-save').attr('disabled',false);
							self.noty.error('改时间段已被冻结，请选择其他时间');
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
				minDate: 1,
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
			$('#admin-role-quit').click(function() {
				layer_close();
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					saveData: Common.action.portalUrl + "commemorative-web/album/prohibit",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen",
					updateArrangementsInterview: Common.action.portalUrl + "interviewer/updateArrangementsInterview"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					saveData: Common.action.portalUrl + "commemorative-web/album/prohibit",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen",
					updateArrangementsInterview: Common.action.portalUrl + "interviewer/updateArrangementsInterview"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);