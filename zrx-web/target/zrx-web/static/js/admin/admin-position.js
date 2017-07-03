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
			this.bindEvent.tourSearchBtn.call(this);
			this.positionList();
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
		positionList:function(){
			var self=this;
			Ajax.request({
				url: self.getAction().findPos,
				type: "GET",
				data: {},
				listener: {
					success: function(json) {
						if(json.success) {
							var data = json.data.rows;
							var html=''
;							for(var i=0;i<data.length;i++){
								html+='<option value="'+data[i].dutiesName+'">'+data[i].dutiesName+'-'+data[i].descript+'</option>';
							}
							$('#dutiesName').append(html);
							
						}
					}
				}
			});
		},
		bindEvent: {
			tourSearchBtn: function() {
				var self = this;
				$("#tourSearchBtn").unbind("click").click(function() {
					//获取表单信息
					var data = tn.form.get($("#tourSearch"));
					data.delFlag=Number(data.delFlag);
					console.log(data)
					self.list.reload(data, function() {
						self.setListOperator();
					});
				});
			}
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					showData: Common.action.portalUrl + "duties/searchDuties",
					saveData: Common.action.portalUrl + "duties/saveOrUpdateDuties",
					findPos:Common.action.portalUrl + "user/findDutiesInfo"
				}
			} else {
				return {
					showData: Common.action.portalUrl + "duties/searchDuties",
					saveData: Common.action.portalUrl + "duties/saveOrUpdateDuties",
					findPos:Common.action.portalUrl + "user/findDutiesInfo"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().showData,
				colModel: [{
						display: '招聘职位',
						name: 'dutiesName',
						width: 160
					}, {
						display: '职务编号',
						name: 'dutiesNumber',
						width: 80
					}, {
						display: '部门详细描述',
						name: 'description',
						width: 260
					},
					{
						display: '学校排名',
						name: 'dutiesType',
						width: 120,
						handler:function(){
							
						}
					},
					{
						display: '拟招人数',
						name: 'recruitsCounts',
						width: 80,

					}, {
						display: '面试通过人数',
						name: 'passCounts',
						width: 80
					},
					{
						display: '已发offer数',
						name: 'offerCounts',
						width: 80
					}, {
						display: '状态',
						name: 'delFlag',
						width: 80,
						handler: function(v, data, n) {
							if(data.delFlag == 0) {
								n.html('生效');
							} else {
								n.html('未生效');
							}
						}
					}, {
						display: '操作',
						name: 'edit',
						width: 80,
						handler: $.noop
					}
				],
				buttons: [{
					name: "新增招聘职位",
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
		addAuthority: function() {
			var reqParam = {};
			reqParam.add = 1;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('新增招聘职位', 'admin-position-add.html#' + param, '', '360');
		},
		//编辑
		editTour: function(e, data) {
			var reqParam = {};
			reqParam.add = 0;
			reqParam.id = data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			layer_show('编辑招聘职位', 'admin-position-add.html#' + param, '', '360');
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