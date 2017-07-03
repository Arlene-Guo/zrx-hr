/**
 * 功能说明：测评信息列表
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
			this.showCount();
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
					evaluationList: Common.action.portalUrl +  'evaluation/findEvaluation',
					showCount: Common.action.portalUrl + "evaluation/findDutiesTypeCount"
				}
			} else {
				return {
					evaluationList:  Common.action.portalUrl + 'evaluation/findEvaluation',
					showCount: Common.action.portalUrl + "evaluation/findDutiesTypeCount"
				}
			}
		},
		showCount:function(){
			var self=this;
			Ajax.request({
				url: self.getAction().showCount,
				type: "GET",
				listener: {
					success: function(json) {
						console.log(json)
						if(json.success&&json.data) {
							if(json.data.top50==null){
								$('.top-count').html('top50剩余数量:0');
							}else{
								$('.top-count').html('top50剩余数量:'+json.data.top50);
							}
							if(json.data.notTop50==null){
								$('.low-count').html('非top50剩余数量:0');
							}else{
								$('.low-count').html('非top50剩余数量:'+json.data.notTop50);
							}

						}
					}
				}
			});
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: self.getAction().evaluationList,
				colModel: [
					{
							display: '导入时间',
							name: 'importDate',
							width: 240,
							handler: function(v, data, n) {
								n.html(data.importDate)
							}
						},
					{
							display: '导入数量',
							name: 'importCount',
							width: 240,
							handler: function(v, data, n) {
								if (data.importCount == null) {
									n.html(0)
								} else {
									n.html(data.importCount)
								}
							}
						},
					{
						display: '学校类型',
						name: 'dutiestype',
						width: 240,
						handler: function(v, data, n) {
							if(data.dutiestype==0){
								n.html('top50');
							}else{
								n.html('非top50');
							}
						}
					},
					{
						display: '状态',
						name: 'delFlag',
						width: 240,
						handler: function(v, data, n) {
							console.log(data);
							if(data.delFlag==0){
								n.html('生效');
							}else{
								n.html('未生效');
							}
						}
					},
					{
						display: '操作',
						name: 'edit',
						width: 240,
						handler: $.noop
					}
				],
				buttons:[{
					name: "新增链接",
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
			layer_show('新增链接','admin-evaluation-add.html#'+param,'','310')
		},
		//编辑
		editTour: function(e, data) {
			var reqParam = {};
			reqParam.add=0;
			reqParam.id=data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('编辑测评链接', 'admin-evaluation-add.html#'+param, '','360');
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
