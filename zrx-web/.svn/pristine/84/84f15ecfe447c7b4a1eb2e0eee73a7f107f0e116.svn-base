/**
 * 功能说明：推荐人简历增加
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
			this.positionList();
			if(this.add == 0) {
				this.id = this.urlJson.id;
				//this.showData();
			} else {
				this.id = 0;
			}
			this.bindEvent();
			//this.suggest();
			this.schoolSuggest();
		},
		positionList: function() {
			var self = this;
			var company = tn.json.encode(tn.Base64.decode(sessionStorage.data)).company;
			console.log(company);
			Ajax.request({
				url: self.getAction().showDuties,
				type: "GET",
				data: {
					start:0,
					limit:1000,
					delFlag:0,
					company: company
				},
				listener: {
					success: function(json) {
						console.log(json);
						if(json.success&&json.data.rows.length>0) {
							var data = json.data.rows;
							console.log(data);
							var html = '';
							for(var i = 0; i < data.length; i++) {
								html += '<option value="' + data[i].dutiesName + '" dutiesNumber="' + data[i].dutiesNumber + '">' + data[i].dutiesName + '-' + data[i].description + '</option>';
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
							tn.form.set($('#form-admin-role-add'), data);
							$('input[name="schoolName"]').attr('id', data.schoolId);
							$('#intervieweeDutiesName option').each(function(i, v) {
								if($('#intervieweeDutiesName option').eq(i).attr('dutiesnumber') == data.intervieweeDutiesId) {
									$(this).attr("selected", "selected");
								}
							});
							if(data.resumeFilename && data.resumeFilename != '') {
								$('.resume-box').html('<a href="' + data.resumePath + '" download>' + data.resumeFilename + '</a>');
							}
							if(data.delFlag == 0) {
								$('input[name=delFlag]').eq(0).attr('checked', true);
							} else {
								$('input[name=delFlag]').eq(1).attr('checked', true);
							}
						}
					}
				}
			});
		},
		saveData: function() {
			$('#admin-role-save').attr('disabled',false);
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
			var data = tn.form.get($("#form-admin-role-add"));
			data.id = self.id;
			data.resumeFilename = $('.resume-box').find('a').html();
			data.resumePath = $('.resume-box').find('a').attr('href');
			data.intervieweeDutiesId = $('#intervieweeDutiesName option:selected').attr('dutiesnumber');
			delete data.filename;
			data.schoolId = $('input[name="schoolName"]').attr('id');
			data.uid = tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
			data.delFlag=0;
			console.log(data);
			$.ajax({
				url:self.getAction().saveData,
				type: "GET",
				data: tn.Base64.encode(tn.json.decode(data)),
				dataType:'text',
				success:function(json){
					$('#admin-role-save').attr('disabled',true);
					var json=tn.json.encode(tn.Base64.decode(json));
					console.log(json);
					if(json.success==false&&json.errorCode==10070){
						self.noty.error(json.msg);
					}else{
						self.noty.info("保存成功");
						parent.location.reload();
					}
				}
			})
//			Ajax.request({
//				url: self.getAction().saveData,
//				type: "GET",
//				data: data,
//				listener: {
//					success: function(json) {
//						if(json.success) {
//							self.noty.info("保存成功");
//							parent.location.reload();
//						} else {
//							self.noty.error("保存失败，请稍后再试!");
//							layer_close();
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
			$('#admin-role-quit').click(function() {
				layer_close();
			});
			$('#filename').on('change', self.readFiles);
			$('input[name="schoolName"]').change(function(){

			});
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
							//var url=json.data.success[0].substring(0,json.data.success[0].indexOf('_w640'));
							//var url1=json.data.success[0].substring(json.data.success[0].lastIndexOf('.'));
							$('.resume-box').html('<a href="'+Common.action.portalUrl+'file/downLoadFile?filepath=' + json.data + '&filename='+ files[0].name+'">' + files[0].name + '</a>');
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
					showData: Common.action.portalUrl + "resume/searchResume",
					saveData: Common.action.portalUrl + "resume/saveOrUpdateResume",
					showDuties: Common.action.portalUrl + "duties/searchDuties",
					findSchools: Common.action.portalUrl + "school/findSchools",
				}
			} else {
				return {
					showData: Common.action.portalUrl + "resume/searchResume",
					saveData: Common.action.portalUrl + "resume/saveOrUpdateResume",
					showDuties: Common.action.portalUrl + "duties/searchDuties",
					findSchools: Common.action.portalUrl + "school/findSchools",
				}
			}
		},
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
				showNode: "dutiesName",
				searchParam: "dutiesName",
				resultField: 'rows',
				attrs: ["dutiesName", "dutiesNumber"],
				maxShowCount: 0,
				autoComplete: false
			});
			vendor.blur(function() {});
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
				attrs: ["id","ranking"],
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
