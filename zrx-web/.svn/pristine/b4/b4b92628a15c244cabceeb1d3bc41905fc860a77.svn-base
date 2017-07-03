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
			this.add = this.urlJson.add;
			if(this.add == 0) {
				this.id = this.urlJson.id;
				this.showData();
			} else {
				this.id = 0;
			}
			this.bindEvent();
		},
		testData:{
			freezenDateStart:'2017-4-14',
			freezenDateEnd:'2017-4-16',
			am_pmStart:'上午',
			am_pmEnd:'下午',
			interviewerName:'面试官',
			dutiesName:'职务',
			jobNumber:'工号',
			delFlag:0
		},
		showData: function() {
			var self = this;
			var data = {
				id: self.id
			};
			Ajax.request({
				url: self.getAction.showData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							var data=data.data.rows[0];
							tn.form.set($('#form-admin-role-add'),data);
							if(data.delFlag == 0) {
								('input[name=delFlag]').eq(1).attr('checked', true);
							} else {
								('input[name=delFlag]').eq(1).attr('checked', true);
							}
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
			var data=tn.form.get($("#form-admin-role-add"));
			Ajax.request({
				url: self.getAction.showData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						if(json.success) {
							self.noty.info("保存成功");
							layer_close();
						}else{
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
					showData: Common.action.portalUrl + "commemorative-web/album/list",
					saveData: Common.action.portalUrl + "commemorative-web/album/prohibit"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "commemorative-web/album/list",
					saveData: Common.action.portalUrl + "commemorative-web/album/prohibit"
				}
			}
		}

	});
	window.List = new List();
})(jQuery, window);