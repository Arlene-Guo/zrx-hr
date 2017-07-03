/**
 * 功能说明：推荐人
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
			var _params = {
				uid:tn.json.encode(tn.Base64.decode(sessionStorage.data)).uid
			};
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
					tourList: Common.action.portalUrl + "resume/searchResume"
				}
			} else {
				return {
					tourList: Common.action.portalUrl + "resume/searchResume"
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
						handler: function(v, data, n) {
							
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
					},{
						display: '电子简历',
						name: 'resumeFilename',
						width: 120,
						handler:function(v,data,n){
							n.html('<a href="'+data.resumePath+'" >' + data.resumeFilename + '</a>');
						}
					},
					{
						display: '添加日期',
						name: 'createTime',
						width: 80
					}, 
					{
						display: '操作',
						name: 'edit',
						width: 120,
						handler: $.noop
					}
				],
				buttons:[{
					name: "录入简历",
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
			article_edit('添加','resume-add.html#'+param,'10001')
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
			reqParam.add=0;
			reqParam.id=data.id;
			var param = Base64.encode(JSON.encode(reqParam));
			article_edit('编辑','resume-add.html#'+param,'10001')
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