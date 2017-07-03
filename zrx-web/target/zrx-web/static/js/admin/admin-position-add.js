/**
 * 功能说明：招聘职位增加
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
				//this.showData();
			} else {
				this.id = 0;
			}
			this.bindEvent();
			//this.suggest();
			this.positionList();
		},
		positionList: function() {
			var self = this;
			Ajax.request({
				url: self.getAction().showDuties,
				type: "GET",
				data: {},
				listener: {
					success: function(json) {
						if(json.success) {
							var data = json.data.rows;
							var html = '';
							for(var i = 0; i < data.length; i++) {
								if(data[i].dutiesType=='职能'){
									data[i].dutiesType='top50';
								}else{
									data[i].dutiesType='其他';
								}
								html += '<option value="' + data[i].dutiesName + '" dutiesType="' + data[i].dutiesType + '" description="' + data[i].descript + '" dutiesNumber="' + data[i].dutiesNumber + '">' + data[i].dutiesName + '-' + data[i].descript + '</option>';
							}
							$('#dutiesName').append(html);
							if(self.add == 0) {
								self.showData();
							} else {
								$('#dutiesNumber').val(data[0].dutiesNumber);
								$('#description').val(data[0].descript);
								if(data[0].dutiesType=='职能'){
									$('#dutiesType').val('top50');
								}else{
									$('#dutiesType').val('其他');
								}
							}
							$('#dutiesName').change(function() {
								$('#dutiesNumber').val($('#dutiesName option:selected').attr('dutiesNumber'));
								$('#description').val($('#dutiesName option:selected').attr('description'));
								$('#dutiesType').val($('#dutiesName option:selected').attr('dutiesType'));
							});
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
							console.log(data)
							$('#dutiesNumber').val(data.dutiesNumber);
							//$('#dutiesName').val(data.dutiesName);
							$('#description').val(data.description);
							$('#dutiesType').val(data.dutiesType);
							$('#recruitsCounts').val(data.recruitsCounts);
							$('#dutiesName option').each(function(i, v) {
								if($('#dutiesName option').eq(i).attr('dutiesnumber') == data.dutiesNumber) {
									$(this).attr("selected", "selected");
								}
							});
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
		saveData: function(self) {
			$('#admin-role-save').attr('disabled',true);
			//去掉input的属性
			$('input').removeClass('ver-error');
			$('textarea').removeClass('ver-error');
			var subNode = $("#form-admin-role-add");
			var verify = new Verify(subNode, {});
			var flag = verify.getFlag();
			if(!flag) return;
			var data = {};
			data.id = this.id;
			data.dutiesNumber = $('#dutiesNumber').val();
			data.dutiesName = $('#dutiesName').val();
			data.description = $('#description').val();
			data.dutiesType = '非职能';
			//data.dutiesType = $('#dutiesType').val();
			data.recruitsCounts = $('#recruitsCounts').val();
			if($('input[name="delFlag"]:checked').val()==1){
				data.delFlag=1;
			}else{
				data.delFlag=0;
			}
			Ajax.request({
				url: self.getAction().saveData,
				type: "GET",
				data: data,
				listener: {
					success: function(json) {
						$('#admin-role-save').attr('disabled',false);
						console.log(json)
						if(json.success) {
							self.noty.info("保存成功");
							parent.location.reload();
						} else {
							self.noty.error("保存失败，请稍后再试!");
						}
					}
				}
			});
		},
		bindEvent: function() {
			var self = this;
			$('#admin-role-save').click(function() {
				self.saveData(self);
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "duties/searchDuties",
					saveData: Common.action.portalUrl + "duties/editDuties",
					showDuties: Common.action.portalUrl + "user/findDutiesInfo",
				}
			} else {
				return {
					showData: Common.action.portalUrl + "duties/searchDuties",
					saveData: Common.action.portalUrl + "duties/editDuties",
					showDuties: Common.action.portalUrl + "user/findDutiesInfo",
				}
			}
		},
		suggest: function() {
			var vendor = $("input[name='dutiesName']");
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
				autoComplete: false,
				selectFn: function(data) {
					console.log(data)
					$('#dutiesNumber').val(data[0].dutiesNumber);
					$('#description').val(data[0].descript);
					$('#dutiesType').val(data[0].dutiesType);
				}
			});
			vendor.blur(function() {});
		}
	});
	window.List = new List();
})(jQuery, window);