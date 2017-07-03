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
					freezenTimeList: Common.action.portalUrl + "freezentime/findFreezenTimeList",
					seeAble: Common.action.portalUrl + "commemorative-web/album/prohibit"
				}
			} else {
				return {
					freezenTimeList: Common.action.portalUrl + "freezentime/findFreezenTimeList",
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
				url: this.getAction().freezenTimeList,
				colModel: [{
						display: '冻结日期',
						name: 'createTime',
						width: 260,
						handler:function(v, data, n){
							if(data.startAmPm==0){
								data.startAmPm='上午';
							}else{
								data.startAmPm='下午';
							}
							if(data.endAmPm==0){
								data.endAmPm='上午';
							}else{
								data.endAmPm='下午';
							}
							n.html(data.startFreezenDate+data.startAmPm+'-'+data.endFreezenDate+data.endAmPm);
						}
					}, {
						display: '面试官',
						name: 'interviewerName',
						width: 260,
						handler: function(v, data, n) {
							console.log(data)
							if((data.interviewerName==""||data.interviewerId=="")&&data.isEvery==1){
								n.html('所有');
							}
						}
					},
					{
						display: '职务',
						name: 'dutiesName',
						width: 120
					},
					{
						display: '工号',
						name: 'jobNumber',
						width: 80
					}, {
						display: '添加人',
						name: 'praiseNum',
						width: 80
					},
					{
						display: '操作',
						name: 'edit',
						width: 320,
						handler: $.noop
					}
				],
				buttons:[{
					name: "新增冻结时间",
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
			layer_show('新增冻结时间', 'admin-time-add.html#'+param, '', '360');
		},
		//编辑
		editTour: function(e, data) {
			var reqParam = {};
			reqParam.add=0;
			reqParam.id=data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('编辑冻结时间', 'admin-time-add.html#'+param, '','360');
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