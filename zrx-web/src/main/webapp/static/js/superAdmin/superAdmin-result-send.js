/**
 * 功能说明：发送offer弹框
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
			this.id = this.urlJson.id;
			this.reInterviewArrangementsId= this.urlJson.reInterviewArrangementsId;
			this.bindEvent();
			this.showData();
		},
		showData: function() {
			var self = this;
			var data = {
				interviewArrangementsId: self.reInterviewArrangementsId
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
							$('#intervieweeMail').val(data.intervieweeMail);
							$('#description').val('中融信融资担保有限公司录取通知-'+data.intervieweeName);
							self.emailshow(data);
						}
					}
				}
			});
		},
		emailshow:function(data){
			var html='';
			html+='<p style="text-align: center;"><span data-fr-verified="true" style="font-size: 16px;">录取通知书</span></p>';
			html+='<p>尊敬的'+data.intervieweeName+'女士/先生：</p>';
			html+='<p>&nbsp; &nbsp; &nbsp;&nbsp;非常荣幸的通知您，经过我公司面试和讨论，现正式邀<span data-fr-verified="true" style="font-size: 15px;">&#8203;</span>请您加入北京中融信融资担保有限公司。</p>';;
			html+='<p>具体录用事宜如下：</p>';
			html+='<p>1、您的工作职位是 '+data.intervieweeDutiesName+'，工作地点：北京，入职时间为&nbsp;&nbsp; 年&nbsp;&nbsp; &nbsp;月&nbsp; &nbsp;日。</p>';
			html+='<p>2、您所属岗位薪资标准为税前￥  元/月，试用期税前： 元/月。前三个月入职岗位补助标准为税前￥&nbsp;&nbsp;&nbsp; 元/月。</p><p>3、报到地址：北京市朝阳门外大街乙12号院昆泰国际大厦18层</p>';
			html+='<p>联系电话：</p><p>联系人：</p>';
			html+='<p>4、报到时携带资料</p>';
			html+='<p>□身份证原件及复印件</p>';
			html+='<p>□毕业证书及学位证书原件及复印件</p>';
			html+='<p>□离职证明原件</p>';
			html+='<p>□本人身份证开户的光大银行卡复印件</p>';
			html+='<p>□本人上一家单位薪资证明或银行流水</p>';
			html+='<p>5、收到本offer后，请以邮件方式回复确认，本录用邀约在年月日前确认有效，若不能按规定时间报到并办理入职，应提前与人力资源部门联系人说明未能按期报到原因</p>';
			html+='<p>6、公司将保留最终录用决定权。</p>';
			html+='<p>衷心欢迎您加入公司！</p>';
			html+='<p>年月日</p>';
			$('#edit').append(html);
			$('#edit').editable({
				inlineMode: false,
				alwaysBlank: false,
				language: "zh_cn",
				theme: 'gray',
				//模版
				height: '200px' //高度
			});
		},
		saveData: function(self) {
			$('#admin-role-save').attr('disabled',true);
			$('#admin-role-close').attr('disabled',true);
			var data={};
			data.recipient=$('#intervieweeMail').val();
			data.subject=$('#description').val();
			data.content=$('#edit .froala-element').html();
			data.sendMainId=self.id;
			data.type=5;
			data.format=2;
			console.log(data)
			Ajax.request({
				url: self.getAction().saveData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						$('#admin-role-save').attr('disabled',false);
						$('#admin-role-close').attr('disabled',false);
						console.log(json)
						if(json.success) {
							self.noty.info("保存成功");
							parent.location.reload();
						}else{
							self.noty.error("保存失败，请稍后再试!");
						}
					}
				}
			});
			/*
			var dataSend = {
				id: self.id,
				state:11
			};
			Ajax.request({
				url: self.getAction().closeOffer,
				type: "GET",
				data: dataSend,
				listener: {
					success: function(json) {
						if(json.success) {
							self.noty.info("关闭成功");
							parent.location.reload();
						}
					}
				}
			});
			*/
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
						url: location.protocol+'//m.tuniu.com/commemorative-web/upload/uploadImage?type=1',
						type: 'GET',
						data: formData,
						processData: false,
						contentType: false,
						dataType:'text',
						success: function(json) {
							var json=tn.json.encode(tn.Base64.decode(json));
							console.log(json)
//							if(json.success==true&&json.data.success.length > 0) {
//								fn.call(this, json.data.success);
//							} else {
//								showTip('图片上传失败，请稍后重试');
//							}
							var url=json.data.success[0].substring(0,json.data.success[0].indexOf('_w640'));
							var url1=json.data.success[0].substring(json.data.success[0].lastIndexOf('.'));
							$('.resume-box').html('<a href="'+url+url1+'" download>'+files[0].name+'</a>');
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
		bindEvent: function() {
			var self = this;
			$('#admin-role-save').click(function() {
				self.saveData(self);
			});
			$('#admin-role-close').click(function(){
				self.closeOffer();
			});
			$('#admin-role-close').click(function(){
				 console.log(self);
			});
			$('#filename').on('change',self.readFiles);
		},
		closeOffer:function(){
			var self = this;
			var data = {
				id: self.id,
				state:12
			};
			Ajax.request({
				url: self.getAction().closeOffer,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							self.noty.info("关闭成功");
							parent.location.reload();
						}
					}
				}
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "interviewer/findInterviewerOrderList",
					saveData: Common.action.portalUrl + "mail/SendMail",
					closeOffer: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
				}
			} else {
				return {
					showData: Common.action.portalUrl + "interviewer/findInterviewerOrderList",
					saveData: Common.action.portalUrl + "mail/SendMail",
					closeOffer: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
				}
			}
		}
	});
	window.List = new List();
})(jQuery, window);
