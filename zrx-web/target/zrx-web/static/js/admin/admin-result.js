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
			var _params = {};
			var list = this.list = new TNGP(this.list()).tngp();
			//初始化参数
			list.reload(_params, function(data) {
				self.setListOperator();
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
					console.log(data)
					self.list.reload(data, function() {
						self.setListOperator();
					});
				});
			//导出简历数据
			$('.downResult').click(function(){
				location.href='http://10.13.112.46:8080/zrx-web/interviewer/exportExcel?e30=';
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
					openOffer:  Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showDuties:Common.action.portalUrl + "user/findDutiesInfo",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					exportExcel: Common.action.portalUrl + "interviewer/exportExcel"
				}
			} else {
				return {
					orderList: Common.action.portalUrl + "interviewer/findInterviewerOrderList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					openOffer:  Common.action.portalUrl + "interviewer/modifyIntervieOrder",
					showDuties:Common.action.portalUrl + "user/findDutiesInfo",
					showInterviewer: Common.action.portalUrl + "user/findUserIdAllByRoleId",
					exportExcel: Common.action.portalUrl + "interviewer/exportExcel"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().orderList,
				colModel: [{
						display: '应聘者姓名',
						name: 'intervieweeName',
						width: 160
					}, {
						display: '应聘职位',
						name: 'intervieweeDutiesName',
						width: 80
					}, {
						display: '手机号',
						name: 'intervieweePhone',
						width: 100,
						handler: function(v, data, n) {
						}
					},
					{
						display: '身份证号',
						name: 'userName',
						width: 120
					},
					{
						display: '邮箱',
						name: 'intervieweeMail',
						width: 80
					}, {
						display: '简历',
						name: 'praiseNum',
						width: 80
					},
					{
						display: '初试面试官',
						name: 'initInterviewerName',
						width: 80
					},
					{
						display: '初试时间',
						name: 'initInterviewerTime',
						width: 80
					},
					{
						display: '初试状态',
						name: 'initPassed',
						width: 80,
						handler:function(v, data, n){
							if(data.offerState==5){
								n.html('初试通过');
							}else if(data.offerState==6){
								n.html('初试未通过');
							}else if(data.offerState<5){
								n.html('');
							}else if(data.offerState>6){
								n.html('初试通过');
							}
						}
					},
					{
						display: '测评结果',
						name: 'evaluationResult',
						width: 80,
						handler: function(v, data, n) {
							if(data.evaluationResult == 2) {
								n.html('通过');
							} else if(data.evaluationResult == 1){
								n.html('未通过');
							} else if(data.evaluationResult == 0){
								n.html('待处理');
							}

						}
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
							if(data.offerState==9||data.offerState>10){
								n.html('复试通过');
							}else if(data.offerState==10){
								n.html('复试未通过');
							}else if(data.offerState>6||data.offerState<5){
								n.html('');
							}
						}
					},
					{
						display: 'offer',
						name: 'offerState',
						width: 80,
						handler: function(v, data, n) {
							if(data.offerState == 9) {
								n.html('<a style="margin:0 3px;" class="send">待发</a>');
								n.on('click', '.send', function() {
									var param = {};
									param.reInterviewArrangementsId = data.reInterviewArrangementsId;
									param.id = data.id;
									var param = Base64.encode(JSON.encode(param));
									layer_show('发送offer', 'admin-result-send.html#' + param, '', '360');
								});
							} else if(data.offerState == 12) {
								n.html('关闭<a style="margin:0 3px;" class="open">打开</a>');
								n.on('click', '.open', function() {
									//掉接口打开
									var param = {
										id: data.id,
										state: 9
									};
									Ajax.request({
										url: self.getAction().openOffer,
										type: "GET",
										data: param,
										listener: {
											success: function(json) {
												if(json.success) {
													self.list.reload();
												}
											}
										}
									});
								});
							} else if(data.offerState == 11) {
								n.html('已发');
							} else {
								n.html('');
							}
						}
					},
					{
						display: '招聘专员',
						name: 'resumeCommissionerName',
						width: 80,
						handler: $.noop
					}
				],
				//				buttons:[{
				//					name: "新增冻结时间",
				//					icon: "icon-plus",
				//					operator: "add",
				//					onpress: function(e) {
				//						self.addAuthority.call(self, e);
				//					}
				//				}],
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