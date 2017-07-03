/**
 * 功能说明：面试安排
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
		},
		/**
		 * 页面渲染
		 */
		render: function() {
			var self = this;
			var _params = {
				interviewerId:tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid
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
				for(var name in data){
					if(data[name]==''){
						delete data[name];
					}
				}
				data.interviewerId=tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid
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
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByInterviewerList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit"
				}
			} else {
				return {
					arrangedList: Common.action.portalUrl + "interviewer/findArrangedInterviewByInterviewerList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().arrangedList,
				colModel: [{
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
						display: '毕业学校',
						name: 'schoolName',
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
						display: '面试安排',
						name: 'initType',
						width: 80,
						handler:function(v,data,n){
							if(data.reType!=''&&data.reType!=null){
								n.html('复试');
							}else{
								n.html('初试');
							}
						}
					},
					{
						display: '面试类型',
						name: 'initInterviewerType',
						width: 80,
						handler:function(v,data,n){
							if(data.reInterviewerType!=''&&data.reInterviewerType!=null){
								if(data.reInterviewerType==0){
									n.html('单面');
								}else{
									n.html('群面');
								}
							}else{
								if(data.initInterviewerType==0){
									n.html('单面');
								}else{
									n.html('群面');
								}
							}
						}
					}, {
						display: '面试时间',
						name: 'initInterviewerTime',
						width: 120,
						handler:function(v,data,n){
							console.log(data);
							if(data.reInterviewerTime!=''&&data.reInterviewerTime!=null){
								n.html(data.reInterviewerTime);
							}else{
								n.html(data.initInterviewerTime);
							}
						}
					}, {
						display: '状态',
						name: 'state',
						width: 80,
						handler:function(v,data,n){
							if(data.state==5 || data.state==9){
								n.html('已通过');
							}else if(data.state==6 || data.state==10){
								n.html('未通过');
							}else if(data.state==3 || data.state==4 || data.state==7 || data.state==8){
								n.html('待反馈');
							}else if(data.state==11){
								n.html('已发offer');
							}else if(data.state==12 || data.state==13 || data.state == 14){
								n.html('待定');
							}
						}
					}, {
						display: '操作',
						name: 'edit',
						width: 80,
						handler: function(v, data, n) {
							if(data.state==3 || data.state==4 || data.state==7 || data.state==8) {
								n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>反馈</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.id = data.interviewerOrderId;
									reqParam.initInterviewerId = data.initInterviewerId;
									reqParam.add = 0;
									if(data.state == 4){
										reqParam.initInterviewArrangementsId=data.initInterviewArrangementsId;
									}else{
										reqParam.initInterviewArrangementsId=data.reInterviewArrangementsId;
									}
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('反馈', 'interviewer-arrange-back.html#' + param, '10001')
								});
							} else if(data.state == 5 || data.state == 9 || data.state == 6 || data.state == 10 ||
								data.state == 12 || data.state == 13 || data.state == 14 || data.state == 15){
								n.append('<a style="margin:0 3px;"><i class="icon-edit"></i>修改</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.add = 1;
									reqParam.id = data.interviewerOrderId;
									reqParam.initInterviewerId = data.initInterviewerId;
									if(data.state == 5||data.state == 6 || data.state == 13){
										reqParam.initInterviewArrangementsId=data.initInterviewArrangementsId;
									}else{
										reqParam.initInterviewArrangementsId=data.reInterviewArrangementsId;
									}
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('修改', 'interviewer-arrange-back.html#' + param, '10001')
								});
							}else if(data.state==11){
								n.append('<a style="margin:0 3px;"><i class="icon-view"></i>查看</a>');
								n.on('click', 'a', function() {
									var reqParam = {};
									reqParam.id = data.interviewerOrderId;
									reqParam.initInterviewerId = data.initInterviewerId;
									reqParam.add = 2;
									var param = Base64.encode(JSON.encode(reqParam));
									article_edit('查看', 'interviewer-arrange-back.html#' + param, '10001')
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
						//handler: $.noop
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
				//div.append(node);
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
			layer_show('编辑冻结时间', 'admin-time-add.html#' + param, '300', '360');
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
