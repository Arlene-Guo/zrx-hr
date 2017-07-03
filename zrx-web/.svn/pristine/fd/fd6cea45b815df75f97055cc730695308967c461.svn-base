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
			this.bindEvent();
		},
		bindEvent: function() {
			var self = this;
			$('.login').click(function() {
				var user = $('#user').val();
				var pass = $('#password').val();
				if(user == '') {
					$('.user-tip').show();
				} else {
					$('.user-tip').hide();
				}
				if(pass == '') {
					$('.pass-tip').show();
				} else {
					$('.pass-tip').hide();
				}
				var data={
					phone:user,
					pwd:md5(pass)
				}
				console.log(pass);
				if (user!=="" && pass!=="") {
					$.ajax({
						url: self.getAction().login,
						type: "GET",
						data: Base64.encode(JSON.encode(data)),
						dataType:'text',
						success:function(json){
							var json = JSON.decode(Base64.decode(json));
							if(json.success){
								var data=json.data;
								console.log(data)
								if(data.userRoleId.length==0){
									self.noty.err('您没有访问此系统权限，请联系管理员添加权限');
								}else{
									sessionStorage.data=Base64.encode(JSON.encode(data));
									window.location.href='index.html';
								}
							}else{
								console.log(1);
								$('.user-pass-tip').show();
							}
						}
					});
				}
//				Ajax.request({
//					url: self.getAction().login,
//					type: "GET",
//					data: data,
//					listener: {
//						success: function(json) {
//							console.log(json)
//							if(json.success) {
//								var data=json.data;
//								console.log(data)
//								if(data.userRoleId.length==0){
//									self.noty.err('您没有访问此系统权限，请联系管理员添加权限');
//								}else{
//									sessionStorage.data=Base64.encode(JSON.encode(data));
//									window.location.href='index.html';
//								}
//
//							}
//						}
//					}
//				});
			});
			//修改密码
			$('.change').click(function() {

				var user = $('#user').val();
				var pass = $('#password').val();
				if(user == '') {
					$('.user-tip').show();
				} else {
					$('.user-tip').hide();
				}
				if(pass == '') {
					$('.pass-tip').show();
				} else {
					$('.pass-tip').hide();
				}
				var data={
					phone:user,
					pwd:md5(pass)
				}
				if (pass!=="") {
					$.ajax({
						url: self.getAction().login,
						type: "GET",
						data: Base64.encode(JSON.encode(data)),
						dataType:'text',
						success:function(json){
							var json = JSON.decode(Base64.decode(json));
							if(json.success){
								var data=json.data;
								console.log(data)
								if(data.userRoleId.length==0){
									self.noty.err('您没有访问此系统权限，请联系管理员添加权限');
								}else{
									sessionStorage.data=Base64.encode(JSON.encode(data));
									$("#loginform").addClass("none");
									$("#changeform").removeClass("none");
								}
							}else{
								$('.user-pass-tip').show();
							}
						}
					});
				}
			});
			$('.reback').click(function() {
				$("#changeform").addClass("none");
				$("#loginform").removeClass("none");
				$("#repassword").val('');
			});
			$('#changeUserPas').click(function() {
				var id = tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
				var pass = $('#repassword').val();
				if(pass == '') {
					$('.pass-tip').show();
					return;
				} else {
					$('.pass-tip').hide();
				}
				var changedata={
					id:id,
					pwd:md5(pass)
				}
				$.ajax({
					url: self.getAction().changeUserInfo,
					type: "GET",
					data: Base64.encode(JSON.encode(changedata)),
					dataType:'text',
					success:function(json){
						var json = JSON.decode(Base64.decode(json));
						if(json.success){
							var data=json.data;
							console.log(data);
							$('.popup-Box').removeClass("none");
							$(".mask").removeClass("none");
						}else{
							alert('修改失败');
						}
					}
				});
			});
			$('#change-ok-btn').click(function() {
				$("#changeform").addClass("none");
				$("#loginform").removeClass("none");
				$("#password").val('');
				$(".popup-Box").addClass("none");
				$(".mask").addClass("none");
			})
			$('input').blur(function(){
				$('.user-pass-tip').hide();
			})
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(location.href.indexOf('210.51.167.65')!=-1){
				url='http://210.51.167.65:8080/zrx-web/';
			}else{
			//	url='http://10.56.14.183/zrx-web/';
				url='http://10.56.12.166:8080/zrx-web/';
			//	url='http://172.29.32.21:8080/zrx-web/';
			}
//			var hqServer = 'http://210.51.167.65:8080/zrx-web/';
			var hqServer = url;
			if(this.devcfg) {
				return {
					login: hqServer + "login/login",
					saveData: hqServer + "commemorative-web/album/prohibit",
					changeUserInfo: hqServer + "user/saveOrUpdateUser"
				}
			} else {
				return {
					login: hqServer + "login/login",
					saveData: hqServer + "commemorative-web/album/prohibit",
					changeUserInfo: hqServer + "user/saveOrUpdateUser"
				}
			}
		}
	});
	window.List = new List();
})(jQuery, window);
