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
			this.positionList();
			this.showInterviewer();
		},
		/**
		 * 页面渲染
		 */
		render: function() {
			var self = this;
			var _params = {
				resumeCommissionerId:tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid
			};
			var list = this.list = new TNGP(this.list()).tngp();
			//初始化参数
			list.reload(_params, function(data) {
				//self.setListOperator();
			});
		},
		//展示职位信息
		positionList:function(){
			var self=this;
			Ajax.request({
				url: self.getAction().showDuties,
				type: "GET",
				data: {},
				listener: {
					success: function(json) {
						if(json.success) {
							var data = json.data.rows;
							var html=''
;							for(var i=0;i<data.length;i++){
								html+='<option value="'+data[i].dutiesName+'" >'+data[i].dutiesName+'-'+data[i].descript+'</option>';
							}
							$('#intervieweeDutiesName').append(html);
						}
					}
				}
			});
		},
		showInterviewer: function() {
			var self = this;
			var data = {
				"roleName": "面试官"
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
							$('#interviewerName').append(html);
						}
					}
				}
			});
			Ajax.request({
				url: self.getAction().showInterviewer,
				type: "GET",
				data: {
					"roleName": "招聘专员"
				},
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
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					orderList: Common.action.portalUrl + "interviewer/findInterviewerOrderList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					changeState: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					showDuties:Common.action.portalUrl + "user/findDutiesInfo",
				}
			} else {
				return {
					orderList: Common.action.portalUrl + "interviewer/findInterviewerOrderList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					changeState: Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					showDuties:Common.action.portalUrl + "user/findDutiesInfo",
				}
			}
		},
		bindEvent:function(){
			var self=this;
			$("#tourSearchBtn").unbind("click").click(function() {
					//获取表单信息
					var data = tn.form.get($("#tourSearch"));
					for(var name in data){
						if(data[name]==''){
							delete data[name];
						}
					}
					data.resumeCommissionerId=tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
					console.log(data);
					self.list.reload(data, function() {
						self.setListOperator();
					});
				});
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().orderList,
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
						width: 160
					}, {
						display: '应聘者职位',
						name: 'intervieweeDutiesName',
						width: 80
					}, {
						display: '手机号',
						name: 'intervieweePhone',
						width: 80,
						handler: function(v, data, n) {

						}
					},
					{
						display: '邮箱',
						name: 'intervieweeMail',
						width: 120
					},
					{
						display: '初试面试官',
						name: 'initInterviewerName',
						width: 80
					}, {
						display: '初试时间',
						name: 'initInterviewerTime',
						width: 80
					},
					{
						display: '初试结果',
						name: 'initPassed',
						width: 80,
						handler: function(v, data, n) {
							console.log(data);
							if(data.offerState == 5||data.offerState == 7||data.offerState == 9||data.offerState == 11||data.offerState == 14||data.offerState == 15||data.offerState == 12) {
								n.html('初试通过');
							}else if(data.offerState == 6){
								n.html('初试未通过');
							}else if(data.offerState == 13){
								n.html('初试待定');
//								n.html('<a style="margin:0 3px;"><i class="icon-edit"></i>反馈</a>');
//								n.on('click', 'a', function() {
//									var reqParam = {};
//									reqParam.initInterviewArrangementsId = data.initInterviewArrangementsId;
//									reqParam.orderId = data.id;
//									reqParam.initInterviewerId=data.initInterviewerId;
//									var param = Base64.encode(JSON.encode(reqParam));
//									article_edit('反馈', 'recruit-result-back.html#' + param, '10001')
//								});
							}else if(data.offerState < 5){
								n.html('');
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
					}, {
						display: '测评结果',
						name: 'evaluationResult',
						width: 80,
						handler: function(v, data, n) {
							if(data.evaluationResult == 2) {
								n.html('通过');
							} else if(data.evaluationResult == 1){
								n.html('未通过');
							} else if(data.evaluationResult == 0){
								n.html('<a style="margin:0 3px;">反馈</a>');
								n.on('click', 'a', function() {
									self.noty.confirm('<div style="display:inline-block;" class="back"><span>请选择:</span><input type="radio" name="sure" value="2" checked="true">通过    <input type="radio" name="sure" value="1">不通过</div>', {
										type: "btn btn-primary",
										text: "<i class='icon-ok'></i>确认",
										click: function(noty) {
											var back=$('.back').find('input:checked').val();
											Ajax.request({
												url: self.getAction().changeState,
												type: "GET",
												data:{
													id:data.id,
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

						}
						//						handler: $.noop
					},
					{
						display: '复试面试官',
						name: 'reInterviewerName',
						width: 80
					},
					{
						display: '复试时间',
						name: 'reInterviewerTime',
						width: 80
					},
					{
						display: '复试结果',
						name: 'rePassed',
						width: 80,
						handler:function(v,data,n){
							//console.log(data);
							if(data.offerState == 9||data.offerState == 11||data.offerState == 15) {
								n.html('复试通过');
							}else if(data.offerState == 10){
								n.html('复试不通过');
							}else if (data.offerState == 14 || data.offerState == 12) {
								n.html('复试待定')
							}else if(data.offerState == 8){
								n.html('<a style="margin:0 3px;"><i class="icon-edit"></i>反馈</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.initInterviewArrangementsId = data.reInterviewArrangementsId;
									reqParam.orderId = data.id;
									reqParam.initInterviewerId=data.reInterviewerId;
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('反馈', 'recruit-result-back.html#' + param, '10001')
								});
							}else{
								n.html('');
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
					},
					{
						display: 'offer',
						name: 'offerState',
						width: 80,
						handler:function(v,data,n){
							if(data.offerState==15){
								n.html('待发');
							}else if(data.offerState==11){
								n.html('已发');
							}else{
								n.html('');
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
		//添加权限
		addAuthority: function() {
			var reqParam = {};
			reqParam.add = 1;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('新增冻结时间', 'admin-time-add.html#' + param, '', '360');
		},
		//编辑
		editTour: function(e, data) {
			var reqParam = {};
			reqParam.add = 0;
			reqParam.id = data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('编辑冻结时间', 'admin-time-add.html#' + param, '', '360');
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
