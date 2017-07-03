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
			console.log(this.urlJson);
			this.id = this.urlJson.id;
			this.add = this.urlJson.add;
			this.initInterviewerId = this.urlJson.initInterviewerId;
			this.initInterviewArrangementsId=this.urlJson.initInterviewArrangementsId;
			//安排初试复试类型 0初试 1复试 2编辑  3查看
			this.showData();
			this.bindEvent();

		},
		showData: function() {
			var self = this;
			var data = {
				orderId: self.id,
				//interviewerId: tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid
				interviewerId: self.initInterviewerId
			};
			console.log(data);
			Ajax.request({
				url: self.getAction().showData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							console.log(json);
							var data = json.data.rows[0];
							self.state = data.state;
							//基本信息展示
							var html = '';
							html += '<div class="row cl row1">';
							html += '<label class="form-label col-xs-3 col-sm-2">应聘者姓名:</label>';
							html += '<span>' + data.intervieweeName + '</span>';
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
							html += '<label class="ml-30">学校排名:</label>';
							if(data.ranking!=null){
								html += '<span>'+data.ranking+'</span>';
							}
							html += '</div>';
							html += '<div class="row cl row3">';
							html += '<label class="form-label col-xs-3 col-sm-2">简历名称:</label>';
							html += '<span>' + data.resumeFilename + '</span>';
							html += '</div>';
							//console.log(data);
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
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-3" value="13">';
									html += '<label for="sex-3">待定</label>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								} else if (data.state == 13) {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">面试结果：</label>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-1" value="5">';
									html += '<label for="sex-1">通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input type="radio" id="sex-2" name="sex" value="6">';
									html += '<label for="sex-2">未通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-3" checked value="13">';
									html += '<label for="sex-3">待定</label>';
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
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-3" value="13">';
									html += '<label for="sex-3">待定</label>';
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
								if(data.initInterviewerType == 0&&data.initInterviewerType!=null) {
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
								if(data.reInterviewerType == 0) {
									html += '<span>单面</span>';
								} else {
									html += '<span>群面</span>';
								}
								//html += '<span>' + data.reInterviewerType + '</span>';
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
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-3" value="14">';
									html += '<label for="sex-3">待定</label>';
									html += '</div>';
									html += '</div>';
									html += '</div>';
								} else if (data.state == 14) {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">面试结果：</label>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-1" value="9">';
									html += '<label for="sex-1">通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input type="radio" id="sex-2" name="sex" value="10">';
									html += '<label for="sex-2">未通过</label>';
									html += '</div>';
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-3" checked value="14">';
									html += '<label for="sex-3">待定</label>';
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
									html += '<div class="radio-box" style="padding-left:0;">';
									html += '<input name="sex" type="radio" id="sex-3" value="14">';
									html += '<label for="sex-3">待定</label>';
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
								if (self.add == 0 || self.add == 1) {
									html += '<div class="row cl row8">';
									html += '<label class="form-label col-xs-3 col-sm-2">上传复试结果:</label>';
									html += '<div class="formControls col-xs-8 col-sm-9 uploadContainer" style="margin-bottom:15px;">';
									//html +='<form action="http://10.56.14.166:8080/zrx-web/file/doPost" enctype="multipart/form-data" method="post" >'
									html += '<div class="upfile" style="position:relative;top:0;left:0;width:80px;display:inline-block;">';
									html += '<input id="fileLoad" type="file" name="file" style="position:absolute;top:0;left:0;height:31px;opacity: 0;z-index:999;" multiple="multiple">';
									html += '<span style="display: inline-block;height:31px;width:80px;background:#3bb4f2;line-height:31px;color:#fff;text-align:center;border-radius:5px;cursor:pointer;">上传附件</span>';
									html += '</div>';
									//html += '</form>'
									html += '<span style="margin-left:10px;">仅支持jpg,jpeg,png</span>'
									html += '<span class="img-box" style="margin-left:10px;margin-right:10px;"></span>';
									html += '</div>';
								}
							}
							html += '<div class="row cl">';
							html += '<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2">';
							if(data.state != 11) {
								if (self.add == 0 || self.add == 1) { //修改或反馈
									html += '<button class="btn btn-primary radius save" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存</button>';
									html += '<button class="btn btn-default radius quit ml-20" type="button" >&nbsp;&nbsp;取消&nbsp;&nbsp;</button>';
								}
							}
							html += '</div>';
							html += '</div>';
							$('#form-admin-role-add').html(html);
							$('#fileLoad').on('change', self.readFiles);
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
			var data = {};
			data.id = self.id;

			var remarksData={};
			remarksData.id=self.initInterviewArrangementsId;
			if(self.state == 3 || self.state == 4 || self.state == 5 || self.state == 6 || self.state == 13) {
				data.state = $('input[name="sex"]:checked').val();
				remarksData.remarks= $('.initRemarks').val();
			} else if(self.state == 7 || self.state == 8 || self.state == 9 || self.state == 10 || self.state == 14) {
				data.state = $('input[name="sex"]:checked').val();
				remarksData.remarks= $('.reRemarks').val();
			}
			console.log(data);
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
							/*
							self.noty.info("反馈成功");
							//parent.location.reload();
						} else {
							self.noty.error("保存失败，请稍后再试!");
							layer_close();
							*/
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
			$('#form-admin-role-add').on('click', '.save', function() {
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
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					updateArrangementsInterview: Common.action.portalUrl + "interviewer/updateArrangementsInterview"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "interviewer/findArrangedInterviewByInterviewerList",
					saveData: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					arrangementsInterview: Common.action.portalUrl + "interviewer/arrangementsInterview",
					updateArrangementsInterview: Common.action.portalUrl + "interviewer/updateArrangementsInterview"
				}
			}
		},
		readFiles: function() {
			//失败展示弹层
			function showTip(text) {
				var html = '<span class="tip">' + text + '</span>';
				$('.uploadContainer').append(html);
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
			//	var count = filesCount + imagesArr.length;
				//校验文件类型如果不是图片就返回 去掉就可以上传任意文件
					/*			$.each(files, function(i, v) {
									var isImage = /image\/\w+/.test(v.type);
									var imageSize = Math.round(v.size / 1024 * 100) / 100;
									var errMsg = '';
									if(isImage!=''){
										if(!isImage || (imageSize > 1024 * 10)) {
											if(!isImage) {
												errMsg = '请选择图库图片';
											} else if(imageSize > 1024 * 10) {
												errMsg = '图片不能大于10M请重新上传';
											}
											showTip(errMsg);
											verifyFlag = false;
											return false;
										}
									}
								}); */

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
				var fileData = {};
				if(files && fn) {
					var $file = files[0];
					var formData = new FormData();
					$.each(files, function(i, v) {
						console.log(v);
						formData.append(('file' + i), v);
					});
					//console.log(fileData);
					$.ajax({
						//url:'http://public-api.nj.pla.tuniu-sit.org/filebroker/upload',
						url: Common.action.portalUrl+'file/uploadImages',
						type: 'POST',
						data: formData,
						processData: false,
						contentType: false,
						dataType: 'text',
						success: function(json) {
							//var json = tn.json.encode(tn.Base64.decode(json));
							//console.log(json)
							//							if(json.success==true&&json.data.success.length > 0) {
							//								fn.call(this, json.data.success);
							//							} else {
							//								showTip('图片上传失败，请稍后重试');
							//							}
							//var url = json.data.success[0].substring(0, json.data.success[0].indexOf('_w640'));
							//var url1 = json.data.success[0].substring(json.data.success[0].lastIndexOf('.'));
							//$('.img-box').html('<a href="' + json.data + '" download>' + files[0].name + '</a>');
							//showTip('图片上传成功');
							showTip('图片上传成功');
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
		}

	});
	window.List = new List();
})(jQuery, window);
