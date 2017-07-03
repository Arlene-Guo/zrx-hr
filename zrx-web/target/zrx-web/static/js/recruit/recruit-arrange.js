/**
 * 功能说明：纪念册列表
 */
;
(function($, window) {
	function List() {
		var self = this;
		self.render();
		self.init();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
			this.bindEvent();
			//this.suggest();
			//this.suggest1();
			this.positionList();
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
			var listFinish = this.listFinish = new TNGP(this.listFinish()).tngp();
			//初始化参数
			list.reload(_params, function(data) {
				self.setListOperator();
				$("#tourSearch").show();
			});
			//
			listFinish.reload(_params, function(data) {
				self.setListOperator();
				$("#tourSearch1").show();
			});
		},
		//展示职位信息
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
								html += '<option value="' + data[i].dutiesName + '" >' + data[i].dutiesName + '-' + data[i].descript + '</option>';
							}
							$('#intervieweeDutiesName').append(html);
							$('#intervieweeDutiesName1').append(html);
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
				data.resumeCommissionerId=tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
				console.log(data);
				self.list.reload(data, function() {
					self.setListOperator();
				});
			});
			$("#tourSearchBtn1").unbind("click").click(function() {
				//获取表单信息
				var data = tn.form.get($("#tourSearch1"));
				for(var name in data) {
					if(data[name] == '') {
						delete data[name];
					}
				}
				if(data.intervieweeDutiesName1){
					data.intervieweeDutiesName=data.intervieweeDutiesName1;
					delete data.intervieweeDutiesName1;
				}
				
				data.resumeCommissionerId=tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid;
				console.log(data);
				self.listFinish.reload(data, function() {
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
					resumeList: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					showDuties: Common.action.portalUrl + "user/findDutiesInfo",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					readyInterview:Common.action.portalUrl + "recruiter/readyInterview"
				}
			} else {
				return {
					resumeList: Common.action.portalUrl + "recruiter/searchResumeDistributionList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					showDuties: Common.action.portalUrl + "user/findDutiesInfo",
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByCommissionerList",
					readyInterview:Common.action.portalUrl + "recruiter/readyInterview"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().readyInterview,
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
						width: 160
					}, {
						display: '手机号',
						name: 'intervieweePhone',
						width: 160,
						handler: function(v, data, n) {}
					},
					{
						display: '邮箱',
						name: 'intervieweeMail',
						width: 120
					},
					{
						display: '身份证号',
						name: 'idNumber',
						width: 160
					}, {
						display: '毕业学校',
						name: 'schoolName',
						width: 160
					},
					{
						display: '简历',
						name: 'resumeFilename',
						width: 160,
						handler: function(v, data, n) {
							n.html('<a href="'+data.resumePath+'" >' + data.resumeFilename + '</a>');
						}
					}, {
						display: '操作',
						name: 'option',
						width: 80,
						handler: function(v, data, n) {
							//data.filterState 判断简历是否合格
							if(data.filterState == 1 && data.state<3) {
								n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>安排初试</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.id = data.id;
									reqParam.arrangements = 0;
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('安排初试', 'recruit-arrange-first.html#' + param, '10001');
								});
							}
							//判断简历的流转状态
							if(data.state == 5){
								n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>安排复试</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.id = data.id;
									reqParam.arrangements = 1;
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('安排复试', 'recruit-arrange-first.html#' + param, '10001');
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
				success: function(data) {
					alert('123')
					$('#tourSearch').show();
				}
			}
			return tableConfig;
		},
		/**
		 * 配置页面列表
		 */
		listFinish: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().arrangedList,
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
						display: '应聘职位',
						name: 'intervieweeDutiesName',
						width: 80
					}, {
						display: '手机号',
						name: 'intervieweePhone',
						width: 160,
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
						display: '毕业学校',
						name: 'schoolName',
						width: 80
					}, {
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
					}, {
						display: '操作',
						name: 'edit1',
						width: 160,
						handler: function(v, data, n) {
							if(data.state == 3 || data.state == 7) {
								n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>修改安排</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									if(data.state == 3){
										reqParam.arrangementsId=data.initInterviewArrangementsId;
									}else{
										reqParam.arrangementsId=data.reInterviewArrangementsId;
									}
									reqParam.id = data.resumeDistributionId;
									reqParam.arrangements = 3;
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('修改安排', 'recruit-arrange-first.html#' + param, '10001');
								});
							} else {
								n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>查看安排</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.id = data.resumeDistributionId;
									reqParam.arrangements = 2;
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('查看安排', 'recruit-arrange-first.html#' + param, '10001');
								});
							}
						}
					}
				],
				css: {
					height: "auto",
				},
				model: "server",
				autoload: false,
				el: $("#tableList1"),
				drop: true,
				toolColShow: false,
				bossAnalyButton: "",
				success: function(data) {
					$('#tourSearch1').show();
				}
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
		},
		//匹配职位信息
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
		},
		suggest1: function() {
			var vendor = $("input[name='intervieweeDutiesName1']");
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