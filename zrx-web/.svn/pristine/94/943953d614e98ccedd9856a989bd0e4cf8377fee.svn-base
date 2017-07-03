/**
 * 功能说明：简历列表
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
			if(location.hash.indexOf('form=1') != -1) {
				$('.command-title').html('招聘专员');
				$('.command-content').html('添加应聘者');
			}
			this.bindEvent();
		},
		/**
		 * 页面渲染
		 */
		render: function() {
			var self = this;
			var _params = {
//				uid:tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
			};
			var list = this.list = new TNGP(this.list()).tngp();
			//初始化参数
			list.reload(_params, function(data) {
				self.setListOperator();
			});
		},
		bindEvent:function(){
			//搜索按钮绑定事件
			var self=this;
			$("#tourSearchBtn").unbind("click").click(function() {
				//获取表单信息
				var data = tn.form.get($("#tourSearch"));
				console.log(data);
				for(var name in data){
					if(data[name]==''){
						delete data[name];
					}
				}
				self.list.reload(data, function(data) {
					self.setListOperator();
				});
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					tourList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					changeState: Common.action.portalUrl + "interviewer/modifyIntervieOrder"
					
				}
			} else {
				return {
					tourList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					changeState: Common.action.portalUrl + "interviewer/modifyIntervieOrder"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().tourList,
				colModel: [{
						display: 'checkbox',
						name: 'checkbox',
						width: 20,
						handler: function(v, data, n, tr, index) {
							n.append($("<input type='checkbox'/>"));
						}
					}, {
						display: '应聘者姓名',
						name: 'intervieweeName',
						width: 80
					}, {
						display: '应聘职位',
						name: 'intervieweeDutiesName',
						width: 80
					}, {
						display: '手机号',
						name: 'intervieweePhone',
						width: 80,
						handler: function(v, data, n) {
							n.text((v + "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'"));
						}
					},
					{
						display: '邮箱',
						name: 'intervieweeMail',
						width: 160
					},
					{
						display: '身份证号',
						name: 'idNumber',
						width: 160
					},
					{
						display: '简历',
						name: 'resumeFilename',
						width: 80,
						handler:function(v,data,n){
							n.html('<a href="'+data.resumePath+'" >' + data.resumeFilename + '</a>');
						}
					},
					{
						display: '面试官',
						name: 'initInterviewerName',
						width: 80,
						handler: function(v, data, n) {
							if(data.reType != '' && data.reType != null) {
								n.html(data.reInterviewerName);
							} else {
								n.html(data.initInterviewerName);
							}
						}
					},
					{
						display: '面试安排',
						name: 'initType',
						width: 80,
						handler: function(v, data, n) {
							if(data.reType != '' && data.reType != null) {
								n.html('复试');
							} else {
								n.html('初试');
							}
						}
					},
					{
						display: '面试时间',
						name: 'initInterviewerTime',
						width: 160
					},
					{
						display: '测评结果',
						name: 'evaluationResult',
						width: 80,
						handler: function(v, data, n) {
							if(data.evaluationResult == 0) {
								n.html('还没做');
							} else if(data.evaluationResult == 1) {
								n.html('未通过');
							} else if(data.evaluationResult == 2) {
								n.html('通过');
							}
						}
					},
					{
						display: '操作',
						name: 'edit1',
						width: 240,
						handler: function(v, data, n) {
							console.log(data.state)
							if(data.state == 3||data.state == 7) {
								n.append('<a style="margin:0 3px;" class="sign"><i class="icon-edit"></i>签到</a>');
								n.find('.sign').click(function() {
									self.noty.confirm('应聘者' + data.intervieweeName + '，确认签到？', {
										type: "btn btn-primary",
										text: "<i class='icon-ok'></i>确认",
										click: function(noty) {
											var param={};
											param.id=data.interviewerOrderId;
											if(data.state==3){
												param.state=4;
											}else if(data.state==7){
												param.state=8;
											}
											Ajax.request({
												url: self.getAction().changeState,
												type: "GET",
												data:param,
												listener: {
													success: function(json) {
														if(json.success) {
															self.noty.info('签到成功');
															self.list.reload();
															noty.close();
														}
													}
												}
											});
										}
									});
								});
							}
							if(data.state<9){
								if(data.intervieweeMail != '') {
									n.append('<a style="margin:0 3px;" class="info-add"><i class="icon-edit"></i>完善信息</a>');
									var reqParam = {};
									reqParam.resumeId = data.resumeId;
									reqParam.id = data.interviewerOrderId;
									reqParam.resumeCommissionerId = data.resumeCommissionerId;
									var param = Base64.encode(JSON.encode(reqParam));
									n.on('click', '.info-add', function() {
										article_edit('完善信息', 'reception-info.html#' + param, '10001')
									});
								} else {
									n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>修改信息</a>');
								}
							}
							
							if(data.evaluationResult == ''||data.evaluationResult == null) {
								n.append('<a style="margin:0 3px;" class="result"><i class="icon-edit"></i>测评结果</a>');
								n.on('click', '.result', function() {
									self.noty.confirm('<div style="display:inline-block;" class="back"><span>请选择:</span><input type="radio" name="sure" value="2" checked="true">通过  <input type="radio" name="sure" value="1">不通过  <input type="radio" name="sure" value="0">还没做</div>', {
										type: "btn btn-primary",
										text: "<i class='icon-ok'></i>确认",
										click: function(noty) {
											var back = $('.back').find('input:checked').val();
											Ajax.request({
												url: self.getAction().changeState,
												type: "GET",
												data:{
													id:data.interviewerOrderId,
													evaluationResult:back
												},
												listener: {
													success: function(json) {
														if(json.success) {
															self.noty.info('测评结果更新成功');
															self.list.reload();
															noty.close();
														}
													}
												}
											});
										}
									});
								});
							} else {
								n.append('<a style="margin:0 3px;" class="edit-result"><i class="icon-edit"></i>修改结果</a>');
								n.on('click', '.edit-result', function() {
									self.noty.confirm('<div style="display:inline-block;" class="back"><span>请选择:</span><input type="radio" name="sure" value="2" checked="true">通过  <input type="radio" name="sure" value="1">不通过  <input type="radio" name="sure" value="0">还没做</div>', {
										type: "btn btn-primary",
										text: "<i class='icon-ok'></i>确认",
										click: function(noty) {
											var back = $('.back').find('input:checked').val();
											Ajax.request({
												url: self.getAction().changeState,
												type: "GET",
												data:{
													id:data.interviewerOrderId,
													evaluationResult:back
												},
												listener: {
													success: function(json) {
														if(json.success) {
															self.noty.info('测评结果更新成功');
															self.list.reload();
															noty.close();
														}
													}
												}
											});
										}
									});
								});
							}

							function article_edit(title, url, id, w, h) {
								var index = layer.open({
									type: 2,
									title: title,
									content: url
								});
								layer.full(index);
							}
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
					"editTour": $("<a style='margin:0 3px;'/>").html("<i class='icon-edit'></i>签到")
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
		//添加权限
		addAuthority: function() {
			var reqParam = {};
			reqParam.add = 1;
			var param = Base64.encode(JSON.encode(reqParam));
			article_edit('添加', 'resume-add.html#' + param, '10001')

			function article_edit(title, url, id, w, h) {
				var index = layer.open({
					type: 2,
					title: title,
					content: url
				});
				layer.full(index);
			}
			//layer_show('新增冻结时间', 'admin-time-add.html#'+param, '', '360');
		},
		//编辑
		editTour: function(e, data) {
			var reqParam = {};
			reqParam.add = 0;
			reqParam.id = data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			article_edit('编辑', 'resume-add.html#' + param, '10001')

			function article_edit(title, url, id, w, h) {
				var index = layer.open({
					type: 2,
					title: title,
					content: url
				});
				layer.full(index);
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
		}
	});
	window.List = new List();
})(jQuery, window);