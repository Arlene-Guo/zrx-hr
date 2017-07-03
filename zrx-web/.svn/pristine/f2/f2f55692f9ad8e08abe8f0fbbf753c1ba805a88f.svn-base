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
		self.bindEvent();
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
				//this.showData();
			} else {
				this.id = 0;
			}
			console.log(this.id)
			this.suggest();
			this.showRolesList();

		},
		showRolesList:function(){
			var self = this;
			Ajax.request({
				url: self.getAction().rolesList,
				type: "GET",
				listener: {
					success: function(json) {
						if(json.success) {
							var data=json.data.rows;
							var html='';
							for(var i=0;i<data.length;i++){
								if(data[i].roleName!='管理员' && data[i].roleName!='超级管理员' && data[i].roleName!='推荐人' && data[i].roleName!='接待专员'){
									html+='<span class="mr-10">';
									html+='<input type="checkbox" name="roleId" value="'+data[i].id+'" data-name="'+data[i].roleName+'"/>';
									html+=data[i].roleName;
									html+='</span>';
								}
							}
							$('.roles-box').append(html);
							if(self.add == 0) {
								self.showData();
							}
						}
					}
				}
			});
		},
		showData: function() {
			//编辑致为不可编辑
			$('input[type=text]').attr('disabled','disabled');
			var self = this;
			var data = {
				'id': self.id
			};
			Ajax.request({
				url: self.getAction().showData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							var data=json.data.rows[0];
							console.log(data);
							tn.form.set($('#form-admin-role-add'),data);
							$('input[name="userName"]').attr('id',data.uid);
							//$('input[name="core"]').attr('disabled',false);
							$('input[name=roleId]').each(function(i, v) {
								if($('input[name=roleId]').eq(i).attr('data-name')==data.roleName){
									$('input[name=roleId]').eq(i).attr('checked','checked');
								}
							});
						}
					}
				}
			});
		},
		saveData: function() {
			var self=this;
			var subNode = $("#form-admin-role-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			$('#admin-role-save').attr('disabled',true);
			var data = {};
			var role = [];
			if(this.id!=0){
				data.id = this.id;
			}
			data.uid=$('input[name="userName"]').attr('id');
			$('input[name=roleId]').each(function(i, v) {
				if(v.checked == true) {
					role.push(Number(v.value));
				}
			});
			data.phone = $('#phone').val();
			data.core = $('#core').val();
			data.roleids = role;
			data.delFlag = $('input[name=delFlag]:checked').val();
			console.log(data);
			Ajax.request({
				url:self.getAction().saveData,
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
					showData: Common.action.portalUrl + "user/findUserRole",
					saveData: Common.action.portalUrl + "user/assignRoles",
					findUsers:Common.action.portalUrl + "user/findUsers",
					rolesList:Common.action.portalUrl + "user/rolesList"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "user/findUserRole",
					saveData: Common.action.portalUrl + "user/assignRoles",
					findUsers:Common.action.portalUrl + "user/findUsers",
					rolesList:Common.action.portalUrl + "user/rolesList"
				}
			}
		},
		//用户匹配
		suggest: function() {
			var vendor = $("input[name='userName']");
			var self=this;
			//jsrc/modudles/tn/TNSearch
			var suggest = new TNSearch({
				el: vendor,
				param: {
//					state: 1,
					start: 0,
					limit: 40
				},
				url: self.getAction().findUsers,
				width: 250,
				showKey: "userName",
				searchParam: "userName",
				resultField: 'rows',
				attrs: ["userName", "jobNumber","id"],
				maxShowCount: 0,
				autoComplete: false,
				selectFn: function(data) {
					console.log(data)
					if(data!=''&&data!=null&&data.length!=0){

						$('#dutiesName').val(data[0].dutiesName);
						$('#jobNumber').val(data[0].jobNumber);
						$('#phone').val(data[0].phone);
						$('#core').val(data[0].core);
						//$('#company').val(data[0].company);
					}
				}
			});
			vendor.blur(function() {});
		}
	});
	window.List = new List();
})(jQuery, window);
