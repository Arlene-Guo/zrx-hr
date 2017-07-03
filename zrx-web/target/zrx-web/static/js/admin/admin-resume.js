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
		self.render();
		self.init();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
			this.bindEvent();
			this.showInterviewer();
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
								html += '<option value="' + data[i].dutiesName + '">' + data[i].dutiesName + '-' + data[i].descript + '</option>';
							}
							$('#intervieweeDutiesName').append(html);

						}
					}
				}
			});
		},
		bindEvent: function() {
			var self = this;
			$("#tourSearchBtn").unbind("click").click(function() {
				//获取表单信息
				var data = tn.form.get($("#tourSearch"));
				for(var name in data) {
					if(data[name] == '') {
						delete data[name];
					}
				}
				console.log(data)
				self.list.reload(data, function() {
					self.setListOperator();
				});
			});
		},
		showInterviewer: function() {
			var self = this;
			var data = {
				"roleName": "招聘专员"
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
								html += '<option value="' + data[i].userName + '">' + data[i].userName + '</option>';
							}
							$('#resumeCommissionerName').append(html);
						}
					}
				}
			});
		},
		/**
		 * 页面渲染
		 */
		render: function() {
			var self = this;
			var _params = {};
			var list = this.list = new TNGP(this.list()).tngp();
			//初始化参数
			list.reload(_params, function(data) {
				self.setListOperator();
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showList: Common.action.portalUrl + "recruiter/searchResumeManagerList",
					saveResumeDistribution: Common.action.portalUrl + "recruiter/saveResumeDistribution",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					updateResumeDistribution: Common.action.portalUrl + "recruiter/updateResumeDistribution",
					showDuties: Common.action.portalUrl + "user/findDutiesInfo"

				}
			} else {
				return {
					showList: Common.action.portalUrl + "recruiter/searchResumeManagerList",
					saveResumeDistribution: Common.action.portalUrl + "recruiter/saveResumeDistribution",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					updateResumeDistribution: Common.action.portalUrl + "recruiter/updateResumeDistribution",
					showDuties: Common.action.portalUrl + "user/findDutiesInfo"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().showList,
				colModel: [{
						display: '应聘者姓名',
						name: 'intervieweeName',
						width: 80
					}, {
						display: '应聘职位',
						name: 'intervieweeDutiesName',
						width: 160
					}, {
						display: '手机号',
						name: 'intervieweePhone',
						width: 120,
						handler: function(v, data, n) {
							n.text((v + "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
						}
					},
					{
						display: '邮箱',
						name: 'intervieweeMail',
						width: 120
					},
					{
						display: '添加日期',
						name: 'resumeCreateTime',
						width: 80
					}, {
						display: '简历',
						name: 'resumeFilename',
						width: 80,
						handler:function(v,data,n){
							n.html('<a href="'+data.resumePath+'">'+data.resumeFilename+'</a>')
						}
					}, {
						display: '来源',
						name: 'recommendedSource',
						width: 80
					}, {
						display: '推荐人',
						name: 'recommendedName',
						width: 80
					}, {
						display: '工号',
						name: 'jobNumber',
						width: 80
					}, {
						display: '分配时间',
						name: 'distributionTime',
						width: 80
					},
					{
						display: '招聘专员',
						name: 'resumeCommissionerName',
						width: 180,
						handler: function(v, data, n) {
							//展示招聘专员信息
							var param = {
								"roleName": "招聘专员"
							}
							var html = '';
							Ajax.request({
								url: self.getAction().showInterviewer,
								type: "GET",
								data: param,
								listener: {
									success: function(json) {
										if(json.success) {
											var json = json.data.rows;
											html += '<select name="" id="" style="width:65%;margin-right:5px;">';
											for(var i = 0; i < json.length; i++) {
												html += '<option value="' + json[i].id + '">' + json[i].userName + '</option>';
											}
											html += '</select>';
											//暂时不做判断
											//if(data.filterState==0) {
											if(data.resumeCommissionerId == '' || data.resumeCommissionerId == null) {
												n.html('<div>' + html + '<a class="sure">确定</a></div>');
												n.on('click', '.sure', function() {
													var paramSave = {
														resumeId: data.resumeId,
														resumeCommissionerId: n.find('select').val()
													}
													console.log(paramSave)
													Ajax.request({
														url: self.getAction().saveResumeDistribution,
														type: "GET",
														data: paramSave,
														listener: {
															success: function(json) {
																if(json.success) {
																	self.noty.info("分配成功");
																	self.list.reload();
																} else {
																	self.noty.error("分配失败");
																}
															}
														}
													});
												});
											} else {
												n.html('<div><span style="margin-right:10px;">' + data.resumeCommissionerName + '</span><a class="edit">修改</a></div>');
												n.on('click', '.edit', function() {
													n.html('<div>' + html + '<a class="sure">确定</a></div>');
													n.on('click', '.sure', function() {
														console.log(data)
														var paramUpdate = {
															id: data.resumeDistributionId,
															resumeCommissionerName: n.find('select option:selected').text(),
															resumeCommissionerId: n.find('select').val()
														}
														Ajax.request({
															url: self.getAction().updateResumeDistribution,
															type: "GET",
															data: paramUpdate,
															listener: {
																success: function(json) {
																	if(json.success) {
																		self.noty.info("分配成功");
																		self.list.reload();
																	} else {
																		self.noty.error("分配失败");
																	}
																}
															}
														});
													});
												})
											}
											//}
										}
									}
								}
							});

						}
					}
				],
				css: {
					height: "auto",
				},
				model: "server",
				autoload: false,
				el: $("#tableList"),
				drop: true,
				toolColShow: false,
				bossAnalyButton: "",
				success: function(data) {}
			}
			return tableConfig;
		},
		/**
		 * 配置页面列表操作列操作项
		 */
		setListOperator: function() {
			var self = this;
			/**
			 * 根据绑定字段获取列对象
			 * @param  {string} field 绑定字段名称
			 * @return {array}       单元格td的数组
			 */
			var editCol = this.list.getColNodes("edit");
			$.each(editCol, function(i, n) {
				//n-----td每行，div
				var div = $("div", n);
				//getSelectRowsData()---------获取checked行的数据
				var rowData = self.list.getSelectRowsData(n.parent().index());
				var arr = {
					"editTour": $("<a style='margin:0 3px;'/>").html("<i class='icon-edit'></i>编辑")
				};
				for(var i in arr) {
					bind(arr[i], i, div);
				}
			});

			function bind(node, oper, div) {
				node.unbind("click").bind("click", function(e) {
					var index = $(e.target).parents("tr")[0].rowIndex;
					self[oper](e, self.list.getSelectRowsData(index), $(this));
				});
				div.append(node);
			}
		},
		checkSearchData: function(data) {
			var self = this;
			$.each(data, function(key, value) {
				if(!value && value != 0) {
					delete data[key];
				}
			});
			return data;
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
				showKey: "dutiesName",
				searchParam: "dutiesName",
				resultField: 'rows',
				attrs: ["dutiesName", "dutiesNumber"],
				maxShowCount: 0,
				autoComplete: false
			});
			vendor.blur(function() {});
		}
	});
	window.List = new List();
})(jQuery, window);