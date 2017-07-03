/**
 * 功能说明：招聘专员简历添加
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
			this.add = this.urlJson.add;
			if(this.add == 0) {
				this.id = this.urlJson.id;
				this.resumeId = this.urlJson.resumeId;
				//this.showData();
			} else {
				this.id = 0;
				$('.tabBar span').unbind('click');
			}

			this.bindEvent();
			this.tabChange();
			//this.suggest();
			//this.showInterviewer();
			this.schoolSuggest();
			this.showInterviewer();
			this.positionList();
		},
		positionList: function() {
			var self = this;
			Ajax.request({
				url: self.getAction().showDuties,
				type: "GET",
				data: {
					start:0,
					limit:1000,
					delFlag:0
				},
				listener: {
					success: function(json) {
						if(json.success) {
							var data = json.data.rows;
							var html = '';
							for(var i = 0; i < data.length; i++) {
								html += '<option value="' + data[i].dutiesName + '" intervieweeDutiesId="' + data[i].dutiesNumber + '">' + data[i].dutiesName + '-' + data[i].description + '</option>';
							}
							$('#intervieweeDutiesName').append(html);
							if(self.add == 0) {
								self.showData();
							}
						}
					}
				}
			});
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
								var core = data[i].core == null ? "" : data[i].core;
								html += '<option value="' + data[i].id + '" data-jobNumber="' + data[i].jobNumber + '" data-dutiesName="' + data[i].dutiesName +
								'" data-email="' + data[i].email + '" data-company="' + data[i].company + '" data-core="' + core + '">' + data[i].userName + '</option>';
							}
							console.log(data);
							$('#interviewerName').append(html);
							$('.dutiesName').html($('#interviewerName').find('option:selected').attr('data-dutiesName'));
							$('.jobNumber').html($('#interviewerName').find('option:selected').attr('data-jobNumber'));
							$('.email').html($('#interviewerName').find('option:selected').attr('data-email'));
							$('.company').html($('#interviewerName').find('option:selected').attr('data-company'));
							$('.core').html($('#interviewerName').find('option:selected').attr('data-core'));
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
				if(self.add == 0) {
					self.showData();
					$(this).addClass('current').siblings().removeClass('current');
					$('.tabCon').hide();
					$('.tabCon').eq($(this).index()).show();
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
							var showResumeData = {};
							showResumeData.resumeId = data.resumeId;
							if(data.interviewOrderId != null && data.interviewOrderId != '') {
								showResumeData.interviewOrderId = data.interviewOrderId;
							}
							if(data.resumeDistributionId != null && data.resumeDistributionId != '') {
								showResumeData.resumeDistributionId = data.resumeDistributionId;
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
							//发过测评不可更改应聘者相关信息
							if(data.evaluationMailId != null && data.evaluationMailId != '') {
								$('#form-admin-role-add input').attr('disabled', true);
								$('#form-admin-role-add textarea').attr('disabled', true);
								$('#admin-role-save').remove();
								$('.first-btn').remove();
								tn.form.set($('#form-admin-cp-add'), data);
							}
							console.log(data);
							self.showBaseData(data);
							tn.form.set($('#form-admin-role-add'), data);
							if(data.resumeFilename && data.resumeFilename != '') {
								$('.resume-box').html('<a href="' + data.resumePath + '" download>' + data.resumeFilename + '</a>');
							}
							if(data.delFlag == 0) {
								$('input[name=delFlag]').eq(1).attr('checked', true);
							} else {
								$('input[name=delFlag]').eq(0).attr('checked', true);
							}
							//主题
							$('#resumeSubject').val('欢迎参加北京贝壳金控集团在线测评-'+data.intervieweeName);
							$('#intervieweeMailSubject').val('北京贝壳金控集团面试邀请-'+data.intervieweeName);
						}
					}
				}
			});
		},
		showBaseData: function(data) {
			$('input[name="resumeRecipient1"]').val(data.intervieweeMail);
			$('input[name="resumeRecipient"]').val(data.intervieweeMail);
			$('.intervieweeName').html(data.intervieweeName);
			$('.intervieweeDutiesName').html(data.intervieweeDutiesName);
			$('.intervieweeMail').html(data.intervieweeMail);
			$('.intervieweePhone').html(data.intervieweePhone);
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
								html += '<p style="text-align: center;"><span style="font-size: 24px;">北京贝壳金控集团面试邀请函</span></p>';
								html += '<p>亲爱的' + json.intervieweeName + '</p>';
								html += '<p>&nbsp;&nbsp;您好！</p>';
								html += '<p>&nbsp;&nbsp;感谢您对北京贝壳金控集团的关注，您的经历和背景给我留下了深刻印象，为了我们能有进一步的了解，现诚邀您至我司进行面试详谈。</p>';
								html += '<p><u>&nbsp;&nbsp;具体信息如下：</u></p>';
								html += '<p><u></u><u>&nbsp;&nbsp;</u><b style="line-height: 22.4px;">公司名称</b><b style="line-height: 22.4px;">：</b><b style="line-height: 22.4px;"> </b>北京贝壳金控集团</p>';
								html += '<p><b>&nbsp;&nbsp;应聘职位：' + json.intervieweeDutiesName + '</b> </p>';
								html += '<p class="time"><b>&nbsp;&nbsp;面试时间：' + json.initInterviewerTime + '</b> </p>';
								html += '<p><b>&nbsp;&nbsp;面试地址：</b>北京市朝阳门外大街乙12号院昆泰国际大厦16层</p>';
								html += '<p><b>&nbsp;&nbsp;乘车路线：</b>地铁：地铁朝阳门A口出，昆泰国际大厦16层。</p>';
								html += '<p><b>&nbsp;&nbsp;联系人：</b> </p>';
								html += '<p><b>&nbsp;&nbsp;联系电话：</b> </p>';
								html += '<p><b>面试</b><b> </b><b>特别</b><b> </b><b>注意事项：</b></p>';
								html += '<p>&nbsp;1、面试请务必准时，以体现您良好的职业素养。</p>';
								html += '<p><b>&nbsp;&nbsp;如因突发情况不能准时参加面试，请及时和我们联系，以便调整面试时间；</b></p>';
								html += '<p><b></b><b>&nbsp;&nbsp;如因个人原因放弃面试机会，请告知我们，今后如有合适机会我们将为您保留面试机会；</b></p>';
								html += '<p><b>&nbsp;&nbsp;如个人无故放弃面试机会，您将不能进入我们的人才储备库，也将失去今后的面试机会。</b></p>';
								html += '<p>&nbsp;2、请携带简历、笔和相关个人作品。</p>';
								html += '<p>&nbsp;北京贝壳金控集团</p>';
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
				html += '<p style="text-align: center;"><span style="font-size: 24px;">北京贝壳金控集团面试邀请函</span></p>';
				html += '<p>亲爱的' + data.intervieweeName + '</p>';
				html += '<p>&nbsp;&nbsp;您好！</p>';
				html += '<p>&nbsp;&nbsp;感谢您对北京贝壳金控集团的关注，您的经历和背景给我留下了深刻印象，为了我们能有进一步的了解，现诚邀您至我司进行面试详谈。</p>';
				html += '<p><u>&nbsp;&nbsp;具体信息如下：</u></p>';
				html += '<p><u></u><u>&nbsp;&nbsp;</u><b style="line-height: 22.4px;">公司名称</b><b style="line-height: 22.4px;">：</b><b style="line-height: 22.4px;"> </b>北京贝壳金控集团</p>';
				html += '<p><b>&nbsp;&nbsp;应聘职位：' + data.intervieweeDutiesName + '</b> </p>';
				html += '<p class="time"><b>&nbsp;&nbsp;面试时间：</b> </p>';
				html += '<p><b>&nbsp;&nbsp;面试地址：</b>北京市朝阳门外大街乙12号院昆泰国际大厦16层</p>';
				html += '<p><b>&nbsp;&nbsp;乘车路线：</b>地铁：地铁朝阳门A口出，昆泰国际大厦16层。</p>';
				html += '<p><b>&nbsp;&nbsp;联系人：</b> </p>';
				html += '<p><b>&nbsp;&nbsp;联系电话：</b> </p>';
				html += '<p><b>面试</b><b> </b><b>特别</b><b> </b><b>注意事项：</b></p>';
				html += '<p>&nbsp;1、面试请务必准时，以体现您良好的职业素养。</p>';
				html += '<p><b>&nbsp;&nbsp;如因突发情况不能准时参加面试，请及时和我们联系，以便调整面试时间；</b></p>';
				html += '<p><b></b><b>&nbsp;&nbsp;如因个人原因放弃面试机会，请告知我们，今后如有合适机会我们将为您保留面试机会；</b></p>';
				html += '<p><b>&nbsp;&nbsp;如个人无故放弃面试机会，您将不能进入我们的人才储备库，也将失去今后的面试机会。</b></p>';
				html += '<p>&nbsp;2、请携带简历、笔和相关个人作品。</p>';
				html += '<p>&nbsp;北京贝壳金控集团</p>';
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
									if($('.tabBar span').eq(1).hasClass('current')){
										self.noty.error('已无可发送的测评链接，请联系管理员添加测评链接！');
									}
									$('.second-btn').remove();
									return false;
								}else{
									link = json.data.link1;
									self.linkId=json.data.id;
									html += '<p>' + data.intervieweeName + ':您好！</p>';
									html += '<p>  感谢您应聘我公司的' + data.intervieweeDutiesName + '职位，经我公司初步挑选，现荣幸地通知您参加我公司组织开展的人才测评。</p>';
									html += '<p>请点击以下地址进入测评：<a href="' + link + '" rel="nofollow">' + link + '</a></p>';
									html += '<p>请自行创建账户，登陆后进行测评。<br></p>';
									html += '<p><span data-fr-verified="true" style="color: #FF0000;">为了不影响您的面试安排，请在面试前一天完成此测评。</span> &nbsp; &nbsp; &nbsp;&nbsp;<span data-fr-verified="true" style="background-color: #FF0000;"><span data-fr-verified="true" style="background-color: #123456;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="color: #FF0000;"><span data-fr-verified="true" style="background-color: #123456;"><br></span></span></span></span></span></span></span></span></span></span></p>';
									html += '<p>  如您有什么问题，请与我们联系。</p>';
									html += '<p>北京贝壳金控集团招聘部</p>';
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
			var self = this;
			//去掉input的属性
			$('input').removeClass('ver-error');
			$('textarea').removeClass('ver-error');
			var subNode = $("#form-admin-role-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			if($('.resume-box a').html() == null || $('.resume-box a').html() == 'null') {
				self.noty.info('请添加电子简历');
				return false;
			}
			//测试不可用
			$('#admin-role-save').attr('disabled',true);
			$('#admin-role-close').attr('disabled',true);
			var data = tn.form.get($("#form-admin-role-add"));
			//data.id = self.id;
			data.resumeFilename = $('.resume-box').find('a').html();
			data.resumePath = $('.resume-box').find('a').attr('href');
			data.intervieweeDutiesId = $('#intervieweeDutiesName option:selected').attr('intervieweeDutiesId');
			data.schoolId = 0;
			data.uid = tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
			console.log(data);
			delete data.filename;
			var url1=';'
			if(self.id!=0){
				data.id = self.resumeId;
				url1=self.getAction().saveOrUpdateResume;
			}else{
				data.id = self.id;
				url1=self.getAction().saveResume;
			}
			console.log(data);
			$.ajax({
				url:url1,
				type: "GET",
				data: tn.Base64.encode(tn.json.decode(data)),
				dataType:'text',
				success:function(json){
					//测试不可用
					$('#admin-role-save').attr('disabled',false);
					$('#admin-role-close').attr('disabled',false);
					var json=tn.json.encode(tn.Base64.decode(json));
					console.log(json);
					if(json.success==false&&json.errorCode==10070){
						self.noty.error(json.msg);
					}else{
						self.noty.info("保存成功");
							//保存成功后
							if(saveFlag==0){
								if(self.id==0){
									self.id = json.data;
								}
								self.showData();
								$('.tabBar span').eq(1).addClass('current').siblings().removeClass('current');
								$('.tabCon').hide();
								$('.tabCon').eq(1).show();
							}else{
								parent.location.reload();
							}
					}
				}
			})
			/*
			Ajax.request({
				url: self.getAction().saveResume,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							self.noty.info("保存成功");
							//保存成功后
							if(saveFlag==0){
								self.id = json.data;
								self.showData();
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
			*/
		},
		saveDataSecond: function(saveFlag) {
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
			//测试不可用
			$('#admin-role-save-second').attr('disabled',true);
			$('#admin-role-close-second').attr('disabled',true);
			var data = {};
			data.recipient = $('input[name="resumeRecipient1"]').val();
			data.subject = $('input[name="resumeSubject"]').val();
			data.content = $('.froala-element').html();
			data.sendMainId = self.id;
			data.type = 0;
			data.format=2;
			data.linkId = self.linkId;
			//保存成功后
			Ajax.request({
				url: self.getAction().sendLink,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							self.noty.info("发送成功");
							$('#admin-role-save-second').attr('disabled',false);
							$('#admin-role-close-second').attr('disabled',true);
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
			var self = this;
			//去掉input的属性
			console.log(1);
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
			//点击不可用
			$('#admin-role-save-third').attr('disabled',true);
			var data = self.showResumeData;
			//校验冻结时间
			var dateT=$('#datepicker').val().replace(/\//g,'-');
			//面试类型，初试复试
			data.type = 0;
			data.interviewerId = $('#interviewerName').val();
			data.interviewerName = $('#interviewerName option:selected').html();
			data.interviewerTime = dateT+ ' ' + $('#timeDuring').val();
			//面试的单面，群面
			data.interviewerType = $('#interviewerType').val();
			data.intervieweeMailSubject = $('#intervieweeMailSubject').val();
			data.intervieweeMailContent = $('#edit1 .froala-element').html();
			data.interviewerMailContent = $('textarea[name="interviewerMailTemp"]').val();
			data.intervieweeMail=$('input[name="resumeRecipient"]').val();

			var timeIndex = $('#timeDuring').prop('selectedIndex');
			var time = "上午"; //上午
			if (timeIndex > 6) {
				time = "下午";  //下午
			}
			var timeData = {
				uid: $('#interviewerName option:selected').val(),
				interviewerTime: dateT + ' ' + time
			}
			console.log(timeData);
			Ajax.request({
				url: self.getAction().isFreezenDan,
				type: "GET",
				data: timeData,
				listener: {
					success: function(json) {
						console.log(json);
						if(json.success && json.data == false) {
							Ajax.request({
								url: self.getAction().arrangementsInterview,
								type: "POST",
								data: data,
								listener: {
									success: function(json) {
										$('#admin-role-save-third').attr('disabled',false);
										if(json.success&&json.errorCode!=10080) {
											if(self.add == 0) {
												self.noty.info("保存成功");
												parent.location.reload();
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
							//点击不可用
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
			$('#filename').on('change', self.readFiles);
		},
		readFiles: function() {
			//失败展示弹层
			function showTip(text) {
				var html = '<div class="tip">' + text + '</div>';
				$('body').append(html);
				setTimeout(function() {
					$('.tip').remove();
				}, 3000);
			}
			//$('#J_UploadFilesBtn2').attr('disabled',false);
			var $this = $(this);
			var files = $this[0].files;
			var filesCount = files.length;
			if(files && filesCount) {
				var verifyFlag = true;
				//var count = filesCount + imagesArr.length;
				//校验文件类型如果不是图片就返回 去掉就可以上传任意文件
				//				$.each(files, function(i, v) {
				//					var isImage = /image\/\w+/.test(v.type);
				//					var imageSize = Math.round(v.size / 1024 * 100) / 100;
				//					var errMsg = '';
				//					if(isImage!=''){
				//						if(!isImage || (imageSize > 1024 * 10)) {
				//							if(!isImage) {
				//								errMsg = '请选择图库图片';
				//							} else if(imageSize > 1024 * 10) {
				//								errMsg = '图片不能大于10M请重新上传';
				//							}
				//							showTip(errMsg);
				//							verifyFlag = false;
				//							return false;
				//						}
				//					}
				//				});

				if(!verifyFlag) {
					return;
				}
				//校验图片总数如果超过200张就返回
				//					if(count > 200) {
				//						config.noty.error('单次最多上传200张图片');
				//						return;
				//					}
				//提交表单获取文件路径
				getImagesPathData(files, function(data) {
					/*
					var filesData = {
						data: []
					};
					//筛选出CDN路径

					data = data.filter(function(v, i) {
						return i % 2 === 0;
					});
					data.forEach(function(v, i) {
						console.log(v);
						console.log(i)
						filesData.data.push({
							name: getFileName(files[i].name),
							path: v.url
						});
					});
					//缓存图片数据
					//imagesArr = $.merge(imagesArr, filesData.data);
					*/
					//更新图片列表
					//					if($this.attr('id') == 'J_UploadFilesBtn2') {
					//						List.updateImagesList(data, $this);
					//					} else {
					//						Edit.updateImagesList(data, $this);
					//					}
				});
			}

			function getFileName(name) {
				if(!name) {
					return;
				}
				//查找最后一个"."的位置
				var pos = name.lastIndexOf('\.');

				//返回截取最后一个"."位置到字符长度
				return name.substring(0, pos);
			}

			function getImagesPathData(files, fn) {
				console.log(files)
				if(files && fn) {
					var $file = files[0];
					var formData = new FormData();
					$.each(files, function(i, v) {
						formData.append(('file' + i), v);
					});
					$.ajax({
						//url:'http://public-api.nj.pla.tuniu-sit.org/filebroker/upload',
						url: Common.action.portalUrl+'file/uploadFile',
						type: 'POST',
						data: formData,
						processData: false,
						contentType: false,
						dataType: 'text',
						success: function(json) {
							var json = tn.json.encode(tn.Base64.decode(json));
							console.log(json)
							//							if(json.success==true&&json.data.success.length > 0) {
							//								fn.call(this, json.data.success);
							//							} else {
							//								showTip('图片上传失败，请稍后重试');
							//							}
							//var url = json.data.success[0].substring(0, json.data.success[0].indexOf('_w640'));
							//var url1 = json.data.success[0].substring(json.data.success[0].lastIndexOf('.'));
							$('.resume-box').html('<a href="'+Common.action.portalUrl+'file/downLoadFile?filepath=' + json.data + '&filename='+ files[0].name+'">'  + files[0].name + '</a>');
						},
						error: function() {
							showTip('图片上传失败，请稍后重试');
						}
					});
				}
			}

			function Base64Decode(input) {
				// private property
				_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				while(i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if(enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if(enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				output = _utf8_decode(output);
				return output;

				// private method for UTF-8 decoding
				function _utf8_decode(utftext) {
					var string = "";
					var i = 0;
					var c = c1 = c2 = 0;
					while(i < utftext.length) {
						c = utftext.charCodeAt(i);
						if(c < 128) {
							string += String.fromCharCode(c);
							i++;
						} else if((c > 191) && (c < 224)) {
							c2 = utftext.charCodeAt(i + 1);
							string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
							i += 2;
						} else {
							c2 = utftext.charCodeAt(i + 1);
							c3 = utftext.charCodeAt(i + 2);
							string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
							i += 3;
						}
					}
					return string;
				}
			}
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					saveOrUpdateResume: Common.action.portalUrl + "resume/saveOrUpdateResume",
					showData: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					saveResume: Common.action.portalUrl + "recruiter/saveResumeAndDistribution",
					showDuties: Common.action.portalUrl + "duties/searchDuties",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					findSchools: Common.action.portalUrl + "school/findSchools",
					getLink: Common.action.portalUrl + "evaluation/getEvaluationLink",
					sendLink: Common.action.portalUrl + "mail/SendMail",
					findMail: Common.action.portalUrl + "mail/findMail",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen",
					isFreezenDan: Common.action.portalUrl + "freezentime/isFreezenDan",
					showInterviewerByCompany: Common.action.portalUrl + "user/findInterviewerByCompang"
				}
			} else {
				return {
					saveOrUpdateResume: Common.action.portalUrl + "resume/saveOrUpdateResume",
					showData: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					saveResume: Common.action.portalUrl + "recruiter/saveResumeAndDistribution",
					showDuties: Common.action.portalUrl + "duties/searchDuties",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					findSchools: Common.action.portalUrl + "school/findSchools",
					getLink: Common.action.portalUrl + "evaluation/getEvaluationLink",
					sendLink: Common.action.portalUrl + "mail/SendMail",
					findMail: Common.action.portalUrl + "mail/findMail",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					isFreezen: Common.action.portalUrl + "freezentime/isFreezen",
					isFreezenDan: Common.action.portalUrl + "freezentime/isFreezenDan",
					showInterviewerByCompany: Common.action.portalUrl + "user/findInterviewerByCompang"
				}
			}
		},
		//匹配职位信息
		suggest: function() {
			var vendor = $("input[name='intervieweeDutiesName']");
			var self = this;
			//jsrc/modudles/tn/TNSearch
			var suggest = new TNSearch({
				el: vendor,
				param: {
					state: 1,
					start: 0,
					limit: 40
				},
				url: self.getAction().showDuties,
				width: 250,
				showKey: "dutiesName",
				searchParam: "dutiesName",
				resultField: 'rows',
				attrs: ["dutiesName", "dutiesNumber"],
				maxShowCount: 0,
				autoComplete: false
			});
			vendor.blur(function() {

			});
		},
		schoolSuggest: function() {
			var vendor = $("input[name='schoolName']");
			var self = this;
			//jsrc/modudles/tn/TNSearch
			var suggest = new TNSearch({
				el: vendor,
				param: {
					state: 1,
					start: 0,
					limit: 40
				},
				url: self.getAction().findSchools,
				width: 250,
				showKey: "schoolName",
				searchParam: "schoolName",
				resultField: 'rows',
				attrs: ["id"],
				maxShowCount: 0,
				autoComplete: false,
				selectFn: function(data) {
					if(!data||data.length!=''){
						if($('input[name="schoolName"]').val()==''){
							$('.ranking').hide();
						}else{
							$('.ranking').show();
							$('.ranking div').html(data[0].ranking);
						}
					}
				}
			});
			vendor.blur(function() {
				if($('input[name="schoolName"]').val()==''){
					$('.ranking').hide();
				}
			});
		}

	});
	window.List = new List();
})(jQuery, window);
