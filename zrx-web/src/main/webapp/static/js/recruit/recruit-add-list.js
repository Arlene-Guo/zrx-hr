/**
 * 功能说明：简历列表
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
			//初始化参数
			list.reload(_params, function(data) {
				self.setListOperator();
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
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
		getAction: function() {
			if(this.devcfg) {
				return {
					resumeList: Common.action.portalUrl  + "recruiter/searchResumeDistributionList",
					showDuties: Common.action.portalUrl  + "user/findDutiesInfo",
				}
			} else {
				return {
					resumeList: Common.action.portalUrl  + "recruiter/searchResumeDistributionList",
					showDuties: Common.action.portalUrl  + "user/findDutiesInfo",
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: this.getAction().resumeList,
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
						width: 260
					}, {
						display: '电子简历',
						name: 'resumeFilename',
						width: 120,
						handler: function(v, data, n) {
							n.html('<a href="'+data.resumePath+'" >' + data.resumeFilename + '</a>');
						}
					},
					{
						display: '添加日期',
						name: 'createTime',
						width: 80,
						handler: function(v, data, n) {
//							var timestamp = data.createTime;
//							var newDate = new Date();
//							newDate.setTime(timestamp);
//							n.html(newDate.toLocaleDateString());
						}
					},
					{
						display: '操作',
						name: 'option',
						width: 120,
						handler: function(v, data, n) {
							if(data.interviewOrderId != null && data.evaluationMailId != null && data.interviewOrderId != '' && data.evaluationMailId != '') {
								n.html('<a style="margin:0 3px;"><i class="icon-edit"></i>查看</a>');
							} else {
								n.html('<a style="margin:0 3px;"><i class="icon-edit"></i>继续完善</a>');
							}
							n.on('click', 'a', function() {
								self.editTour(n, data);
							});
						}
					}
				],
				buttons: [{
					name: "新增应聘者",
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
			article_edit('录入简历', 'recruit-add.html#' + param, '10001')

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
			console.log(data)
			var reqParam = {};
			reqParam.add = 0;
			reqParam.id = data.id;
			reqParam.resumeId=data.resumeId;
			var param = Base64.encode(JSON.encode(reqParam));
			article_edit('编辑', 'recruit-add.html#' + param, '10001')

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
		},
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
		}
	});
	window.List = new List();
})(jQuery, window);