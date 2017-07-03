/**
 * 功能说明：权限管理列表
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
			this.suggest();
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
					data.delFlag=Number(data.delFlag);
					self.list.reload(data, function() {
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
					roleList: Common.action.portalUrl + "user/findUserRole",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					findUsers:Common.action.portalUrl + "user/findUsers",
				}
			} else {
				return {
					roleList: Common.action.portalUrl + "user/findUserRole",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit",
					findUsers:Common.action.portalUrl + "user/findUsers",
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().roleList,
				colModel: [{
						display: '姓名',
						name: 'userName',
						width: 160
					}, {
						display: '职务',
						name: 'dutiesName',
						width: 160
					}, {
						display: '工号',
						name: 'jobNumber',
						width: 160
					},
					{
						display: '权限',
						name: 'roleName',
						width: 120
					},
					{
						display: '状态',
						name: 'delFlag',
						width: 80,
						handler: function(v, data, n) {
							if(data.delFlag==0){
								n.html('生效');
							}else{
								n.html('未生效');
							}
						}
					}, {
						display: '操作',
						name: 'option',
						width: 320,
						handler: function(v,data,n){
							console.log(data)
							n.html('<a style="margin:0 3px;"><i class="icon-edit"></i>编辑</a>');
							n.on('click','a',function(){
								var reqParam = {};
								reqParam.add=0;
								reqParam.id=data.userRoleId;
								var param = Base64.encode(JSON.encode(reqParam));
								layer_show('编辑权限', 'admin-role-add.html#'+param, '','360');
							})	
						}
					}
				],
				buttons:[{
					name: "添加权限",
					icon: "icon-plus",
					operator: "add",
					onpress: function(e) {
						self.addAuthority.call(self, e);
					}
				}],
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
		addAuthority:function(){
			var reqParam = {};
			reqParam.add=1;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('新增权限', 'admin-role-add.html#'+param, '', '360');
		},
		//编辑
		editTour: function(data) {
			console.log(data)
			var reqParam = {};
			reqParam.add=0;
			reqParam.id=data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('编辑权限', 'admin-role-add.html#'+param, '','360');
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
				attrs: ["userName", "jobNumber"],
				maxShowCount: 0,
				autoComplete: false,
				selectFn: function(data) {
					console.log(data)
					if(data!=''&&data!=null&&data.length!=0){
						
						$('#dutiesName').val(data[0].dutiesName);
						$('#jobNumber').val(data[0].jobNumber);
					}
				}
			});
			vendor.blur(function() {});
		}
	});
	window.List = new List();
})(jQuery, window);