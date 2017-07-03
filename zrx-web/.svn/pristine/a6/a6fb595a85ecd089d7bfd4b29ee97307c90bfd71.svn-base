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
			this.urlJson = tn.json.encode(tn.Base64.decode(location.hash.substr(1)));
			console.log(this.urlJson);
			this.view = this.urlJson.view;
			this.edit = this.urlJson.edit;
			this.process = this.urlJson.process;
			this.id = this.urlJson.id;
			if(this.view == 1) {
				$('input').attr('disabled', 'true');
				$('.btn-row').hide();
			}
			this.showData();
			this.bindEvent();
			this.tabChange();
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
		tabChange: function() {
			var self = this;
			//init初始化
			$('.tabBar span').eq(0).addClass('current');
			$('.tabCon').eq(0).show();
			$('.tabBar span').click(function() {
				if(self.view == 1 || self.edit == 1) {
					$(this).addClass('current').siblings().removeClass('current');
					$('.tabCon').hide();
					$('.tabCon').eq($(this).index()).show();
					if(self.linkTab==2&&$('.tabBar span').eq(1).hasClass('current')){
						self.noty.error('已无可发送的测评链接，请联系管理员添加测评链接！');
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
							var data = json.data.rows[0];
							console.log(data);
							//初筛页数据
							$('.intervieweeName').html(data.intervieweeName);
							$('.intervieweeDutiesName').html(data.intervieweeDutiesName);
							$('.intervieweePhone').html(data.intervieweePhone);
							$('.intervieweeMail').html(data.intervieweeMail);
							$('.idNumber').html(data.idNumber);
							$('.schoolName').html(data.schoolName);
							$('.schoolRanking').html(data.ranking);
							$('.remarks').html(data.remarks);
							$('.resume-box').html('<a href="' + data.resumePath + '" download>' + data.resumeFilename + '</a>');
							if(data.filterState == 1 || data.filterState >= 3) {
								$('input[name=delFlag]').eq(0).attr('checked', true);
							} else if(data.filterState == 2) {
								$('input[name=delFlag]').eq(1).attr('checked', true);
							}
							if(data.remarks && data.remarks != '') {
								$('#remarks').val(data.remarks);
							}
							//保存面试安排入参相关数据
							var showResumeData = {};
							showResumeData.resumeId = data.resumeId;
							if(data.interviewOrderId == null) {
								showResumeData.interviewOrderId = 0;
							} else {
								showResumeData.interviewOrderId = data.interviewOrderId;
							}
							showResumeData.id = data.id;
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
							//展示基本数据
							self.showBaseData(data);
							//发过测评不可更改面试者相关数据，可拿到下面写
							if(data.filterState==1) {
								$('#form-admin-role-add textarea').attr('disabled', true);
								$('#admin-role-save').remove();
								$('.first-btn').remove();
							}
						}
					}
				}
			});

		},
		showBaseData: function(data) {
			$('input[name="resumeRecipient"]').val(data.intervieweeMail);
			$('.intervieweeName').html(data.intervieweeName);
			$('.intervieweeDutiesName').html(data.intervieweeDutiesName);
			$('.intervieweeMail').html(data.intervieweeMail);
			$('.intervieweePhone').html(data.intervieweePhone);
			//展示测评，安排初试野蛮
			this.emailshow(data);
			this.emailCpShow(data);

		},
		emailshow: function(data) {
			var html = '';
			var self = this;
			if(data.interviewOrderId != '' && data.interviewOrderId != null) {
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
								$('#edit1').editable({
									inlineMode: false,
									alwaysBlank: false,
									language: "zh_cn",
									theme: 'gray',
									//模版
									height: '200px' //高度
								});
								$('#edit1 .froala-element').html(html);
								//已安排过禁止再次安排
								$('.third-btn').remove();

							}
						}
					}
				});
			} else {
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
				$('#edit1').editable({
					inlineMode: false,
					alwaysBlank: false,
					language: "zh_cn",
					theme: 'gray',
					//模版
					height: '200px' //高度
				});
				$('#edit1 .froala-element').html(html);
			}
		},
		emailCpShow: function(data) {
			var self = this;
			var html = '';
			if(data.evaluationMailId != null && data.evaluationMailId != '') {
				Ajax.request({
					url: self.getAction().findMail,
					data: {
						id: data.evaluationMailId
					},
					type: "GET",
					listener: {
						success: function(json) {
							if(json.success) {
								var json = json.data.rows[0];
								html = json.content;
								//赋值主题
								$('input[name="resumeSubject"]').val(json.subject);
								$('#edit').editable({
									inlineMode: false,
									alwaysBlank: false,
									language: "zh_cn",
									theme: 'gray',
									//模版
									height: '200px' //高度
								});
								$('#edit .froala-element').html(html);
								$('.second-btn').remove();
							}
						}
					}
				});

			} else {
				//获取可用测评链接
				var link = '';
				Ajax.request({
					url: self.getAction().getLink,
					data: {
						dutiestype:1
					},
					type: "GET",
					listener: {
						success: function(json) {
							if(json.success) {
								if(json.data==null){
									self.linkTab=2;
									$('.second-btn').remove();
									return false;
								}else{
									self.linkTab=1;
									link = json.data.link1;
									html += '<p>' + data.intervieweeName + ':您好！</p>';
									html += '<p>  感谢您应聘我公司的' + data.intervieweeDutiesName + '职位，经我公司初步挑选，现荣幸地通知您参加我公司组织开展的人才测评。</p>';
									html += '<p>请点击以下地址进入测评：<a href="' + link + '" rel="nofollow">' + link + '</a></p>';
									html += '<p>请自行创建账户，登陆后进行测评。<br></p>';
									html += '<p><span data-fr-verified="true" style="color: #FF0000;">为了不影响您的面试安排，请在面试前一天完成此测评。</span> &nbsp; &nbsp; &nbsp;&nbsp;<span data-fr-verified="true" style="background-color: #FF0000;"><span data-fr-verified="true" style="background-color: #123456;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="background-color: #123456;"><br></span></span></span></span></span></span></span></span></span></span></p>';
									html += '<p>  如您有什么问题，请与我们联系。</p>';
									html += '<p>中融信招聘部</p>';
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
			}
		},
		saveDataFirst: function(saveFlag) {
			//测试不可用
			$('#admin-role-save').attr('disabled',true);
			$('#admin-role-close').attr('disabled',true);
			var self = this;
			var data = {};
			data.id = self.id;
			if($('input[name="delFlag"]:checked').val() == 0) {
				data.state = 1;
			} else {
				data.state = 2;
			}
			data.remarks=$('.remarks').val();
			console.log(data);
			Ajax.request({
				url: self.getAction().saveData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						console.log(json)
						if(json.success) {
							self.noty.info("保存成功");
							//测试不可用
							$('#admin-role-save').attr('disabled',false);
							$('#admin-role-close').attr('disabled',false);
							//保存成功后
							if(saveFlag==0){
								//self.showData();
								$('.tabBar span').eq(1).addClass('current').siblings().removeClass('current');
								$('.tabCon').hide();
								$('.tabCon').eq(1).show();
							}else{
								parent.location.reload();
							}
						} else {
							self.noty.error("保存失败，请稍后再试!");
							layer_close();
						}
					}
				}
			});
		},
		saveDataSecond: function(saveFlag) {
			//测试不可用
			$('#admin-role-save-second').attr('disabled',true);
			$('#admin-role-close-second').attr('disabled',true);
			var self = this;
			//去掉input的属性
			$('input').removeClass('ver-error');
			$('textarea').removeClass('ver-error');
			var subNode = $("#form-admin-cp-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			if($('#edit .froala-element').html() == '') {
				self.noty.info('请添加测评邮件正文');
				return false;
			}
			var data = {};
			data.recipient = $('input[name="resumeRecipient"]').val();
			data.subject = $('input[name="resumeSubject"]').val();
			data.content = $('.froala-element').html();
			data.sendMainId = self.id;
			data.type = 0;
			data.format=2;
			//保存成功后
			Ajax.request({
				url: self.getAction().sendLink,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							//测试不可用
							$('#admin-role-save-second').attr('disabled',false);
							$('#admin-role-close-second').attr('disabled',false);
							self.noty.info("发送成功");
							if(saveFlag==0){
								//保存成功后
								$('.tabBar span').eq(2).addClass('current').siblings().removeClass('current');
								$('.tabCon').hide();
								$('.tabCon').eq(2).show();
							}else{
								parent.location.reload();
							}
						} else {
							self.noty.error("保存失败，请稍后再试!");
							layer_close();
						}
					}
				}
			});
		},
		saveDataThird: function() {
			//测试不可用
			$('#admin-role-save-third').attr('disabled',true);
			var self = this;
			//去掉input的属性
			$('input').removeClass('ver-error');
			$('textarea').removeClass('ver-error');
			var subNode = $("#form-admin-arrange-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			if($('#edit1 .froala-element').html() == '') {
				self.noty.info('请添加面试通知邮件正文');
				return false;
			}
			var data = self.showResumeData;
			//校验冻结时间
			var dateT=$('#datepicker').val().replace(/\//g,'-');
			data.type = 0;
			
			data.interviewerId = $('#interviewerName').val();
			data.interviewerName = $('#interviewerName option:selected').html();
			data.interviewerTime = dateT + ' ' + $('#timeDuring').val();
			data.interviewerType = $('#type').val();
			data.intervieweeMailSubject = $('#intervieweeMailSubject').val();
			data.intervieweeMailContent = $('#edit1 .froala-element').html();
			data.interviewerMailTemp = $('input[name="interviewerMailTemp"]').val();
			console.log(data);
			
			var timeData = {
				uid: $('#interviewerName option:selected').val(),
				interviewerTime: dateT + ' ' + $('#timeDuring').val()
			}
			Ajax.request({
				url: self.getAction().isFreezen,
				type: "GET",
				data: timeData,
				listener: {
					success: function(json) {
						if(json.success && json.data == false) {
							Ajax.request({
								url: self.getAction().arrangementsInterview,
								type: "POST",
								data: data,
								listener: {
									success: function(json) {
										$('#admin-role-save-third').attr('disabled',false);
										if(json.success&&json.errorCode!=10080) {
												self.noty.info("保存成功");
												parent.location.reload();
										} else {
											self.noty.error("该面试官该时间段安排人数已达上线!");
										}
									}
								}
							});
						} else {
							$('#admin-role-save-third').attr('disabled',false);
							self.noty.error('该时间段已被冻结，请选择其他时间');
						}
					}
				}
			});
		},
		bindEvent: function() {
			var self = this;
			$('#admin-role-save').click(function() {
				self.saveDataFirst(0);
			});
			$('#admin-role-save-second').click(function() {
				self.saveDataSecond(0);
			});
			$('#admin-role-save-third').click(function() {
				self.saveDataThird();
			});
			$('#admin-role-quit').click(function() {
				layer_close();
			});
			//关闭页面
			$('#admin-role-close').click(function(){
				self.saveDataFirst(1);
			});
			$('#admin-role-close-second').click(function(){
				self.saveDataSecond(1);
			});
			//日期选择
			$("#datepicker").datepicker({
				minDate: 1,
				dateFormat: "yy/mm/dd",
				//beforeShowDay: disableSpecificDays,
				showButtonPanel: true,
				onSelect: function(selectedDate) {
					$('.froala-element .time').html('<b>&nbsp;&nbsp;面试时间：' + selectedDate + '  ' + $('#timeDuring').val() + '</b>');
				}
			});
			//添加面试时间
			$('#timeDuring').change(function() {
				$('.froala-element .time').html('<b>&nbsp;&nbsp;面试时间：' + $('#datepicker').val() + '  ' + $(this).val() + '</b>');
			});
			//关闭
			$('.btn-quit').click(function() {
				layer_close();
			});
			$('input[name="delFlag"]').change(function(){
				if($(this).val()==1){
					$('#admin-role-save').hide();
				}else{
					$('#admin-role-save').show();
				}
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					saveData: Common.action.portalUrl + "recruiter/updateResumeDistribution",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					sendLink: Common.action.portalUrl + "mail/SendMail",
					findMail: Common.action.portalUrl + "mail/findMail",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					getLink: Common.action.portalUrl + "evaluation/getEvaluationLink",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					saveData: Common.action.portalUrl + "recruiter/updateResumeDistribution",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					sendLink: Common.action.portalUrl + "mail/SendMail",
					findMail: Common.action.portalUrl + "mail/findMail",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					getLink: Common.action.portalUrl + "evaluation/getEvaluationLink",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);