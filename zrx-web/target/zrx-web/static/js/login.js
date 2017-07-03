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
					userName:user,
					pwd:md5(pass)
				}
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
							alert('用户名或密码错误');
						}
					}
				});
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
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			var hqServer = 'http://10.13.112.46:8080/zrx-web/';
			if(this.devcfg) {
				return {
					login: hqServer + "login/login",
					saveData: hqServer + "commemorative-web/album/prohibit"
				}
			} else {
				return {
					login: hqServer + "login/login",
					saveData: hqServer + "commemorative-web/album/prohibit"
				}
			}
		}
	});
	window.List = new List();
})(jQuery, window);