(function(window, document, undefined) {
	var initDate = new Date();
	var defaults = {
		url: "",
		//数据读取方式
		model: "server",
		type: "GET",
		//工具栏中是否开启“列显示隐藏”功能
		toolColShow: true,
		prev: '&#160;&#9664;&#160;上一页&nbsp&nbsp',
		next: '下一页&#160;&#9654;&#160;',
		first: '首页&#160;',
		last: '尾页&#160;',
		procmsg: '正在读取数据，请稍后...',
		//pageStat: '当前显示第<%=Math.ceil(to/20)%>页，共<%=count%>记录',
		pageStat: '当前显示<%=from%>到<%=to%>记录，共<%=count%>记录',
		nomsg: '暂无数据',
		errorMsg: '<span>查询接口出错 (<%=errorCode%>)</span>',
		//分页格式选择
		pageSizes: [10, 20, 30, 50, 100],
		//默认请求参数
		param: {
			start: 0,
			limit: 20
		},
		//默认表格样式
		baseTableCss: "table table-striped table-hover",
		//列最小宽度
		colMinWidth: 20,
		//单元格内边距
		tdPadding: 7,
		//列拖拽最小宽度
		dragMinWidth: 80,
		//定时刷新时间设置
		refreshTime: 3000,
		//请求时间
		requestTime: 0,
		view: "table",
		treeDisplay: "&#160;",
		treeName: "",
		treeHandler: $.noop,
		//默认展示条数, view = 'tree'有效
		displayNum: 3,
		drag: false,
		search: false,
		loginName: tn.cookie.get("honeydukesUspelling"),
		success: $.noop,
		//不符合数据结构的数据处理方法
		dataHandler: null,
		requestcomplete: null,
		//是否需要隐藏底部
		usepager: true
	},
		cssDefault = {
			css: {
				zIndex: 2e9,
				width: "auto"
			}
		},
		tpl = {
			wrapper: "<div class='tngpContainer'><div class='tngpBtns'></div><div class='tngpTools'><div class='colTools'><span class='tableSearch'><a href='javascript:void(0);'><i class='icon-search icon-2x'></i></a></span><span class='cancelTableSearch hide'><a href='javascript:void(0);'><i class='icon-remove  icon-2x'></i></a></span><span class='colToggle'><a href='javascript:void(0);'><i class='icon-table  icon-2x'></i></a></span><div class='colList'></div></div></div><div class='tngpBodyContainer'><div class='tngpHeader'><table cellspacing='0' cellpadding='0'><thead><tr></tr></thead></table></div><div class='tngpMessage alert alert-info'></div><div class='tngpBody " + defaults.baseTableCss + "'><table cellspacing='0' cellpadding='0'><tbody></tbody></table></div><div class='tngpDrag'></div></div><div class='tngpFooter'></div></div>",
			tool: {
				btn: ['<a href="javascript:void(0);" class="btn btn_tool"><i class="<%=icon%>"></i><span><%=name%></span></a>'],
				options: ['<span class="colItem"><label><input value="<%=name%>" type="checkbox"  checked="checked"/><%=display%></label></span>'],
				search: ['<span>查找：<input type="text"/><span class="resultRowsCount"></span><a href="javascript:void(0);" class="btn closeMsg hide"><i class="icon-remove"></i>关闭</a>（小提示：可以使用拼音快速搜索哦）</span>']
			},
			head: {
				nomal: ['<th><div style="width:<%=width%>px;" col="<%=name%>" title="<%=displayTitle%>"><%=display%></div></th>'],
				sortCol: ['<th><div style="width:<%=width%>px" col="<%=name%>" title="<%=displayTitle%>"><%=display%><i class="icon-chevron-up tngpSorted" title="升序"  abbr="asc"></i></div></th>'],
				checkbox: ['<th><div style="width:<%=width%>px;" col="<%=name%>"><input type="checkbox"/></div></th>']
			},
			bodyTemp: ['<td><div style="width:<%=width%>px;" col="<%=name%>" title="@<%=name%>#">@<%=name%>#</div></td>'],
		treeHead: ['<td class="treeHead" colspan="<%=colspan%>"><div col="treeHead" style="width:<%=width%>px;"><div col="treeHead" style="width:<%=width%>px;"><a href="javascript:void(0);"><i class="icon-minus"></i><%=name%></a></div></div></td>'],
			footer: {
				paging: ['<div style="float:left"><a class="pag_firstTool pag_tool" href="javascript:void(0)"><span><%=first%></span></a>', '<a class="pag_prevTool pag_tool" href="javascript:void(0)"><span><%=prev%></span></a>', '<a class="pag_nextTool pag_tool" href="javascript:void(0)"><span><%=next%></span></a>', '<a class="pag_lastTool pag_tool" href="javascript:void(0)"><span><%=last%></span></a></div>', '<div class="pag_pageInfo" style="float:left"></div>', '<div class="pag_selLimit" style="float:right"><select><option value="<%=pageSizes[0]%>"><%=pageSizes[0]%></option><option value="<%=pageSizes[1]%>"><%=pageSizes[1]%></option><option value="<%=pageSizes[2]%>"><%=pageSizes[2]%></option><option value="<%=pageSizes[3]%>"><%=pageSizes[3]%></option><option value="<%=pageSizes[4]%>"><%=pageSizes[4]%></option></select></div>']
			}
		};
	var TNQuoteGridPanel = function TNQuoteGridPanel(o) {
		if (!this.tngp) return new TNQuoteGridPanel(o);
		if (o.css) {
			tn.util.merge(o.css, cssDefault.css);
		}
		if (o.param) {
			tn.util.merge(o.param, defaults.param);
		}
		this.tpl = tn.util.merge({}, tpl);
		this.tpl.body = [];
		//外部调用需要隐藏的字段
		// defaults.hideField = [];
		this.opts = tn.util.merge(o || {}, TNQuoteGridPanel.defaults, defaults, cssDefault);
	};
	TNQuoteGridPanel.defaults = {};

	tn.util.merge(TNQuoteGridPanel.prototype, {
		tngp: function() {
			// window.localStorage.clear()
			var opts = this.opts;
			var id = tn.guid();
			this.id = id;

			//存储搜索标签,对应col的绑定字段
			this.searchTag = [];
			//列回调对象集合
			this.handlerEvent = {};

			this.setDefaultEmptyData();

			this.grid = this;

			this.endNode = null;
			this.moveNode = null;

			var cal = $(this.tpl.wrapper).attr('id', id).bind({
				click: this.click,
				mousedown: this.mouse,
				keypress: this.keypress,
				hover: this.hover
			}).data({
				'opts': opts,
				'grid': this
			}).css(opts.css);

			$(opts.el).append(cal);
			this.render(cal);

			if (opts.drag) {
				cal.unbind('drop dragover dragleave dragenter').bind({
					drop: this.drag,
					dragover: this.dragover,
					dragleave: this.dragleave,
					dragenter: this.dragenter
				});
				this.nodes.body.parent().addClass("tngpRowMove");
			}

			if (!opts.search) {
				this.nodes.search.hide();
			};
			this.store = new Store({
				url: opts.url,
				model: opts.model
			}).init().setParam(opts.param);

			if (opts.autoload) {
				this.setData();
			}
			return this;
		},
		render: function(el, target) {
			var opts = this.opts;
			this.nodes = {
				bodyContainer: $(".tngpBodyContainer", opts.el),
				tools: $(".tngpTools", opts.el),
				btns: $(".tngpBtns", opts.el),
				colSelect: $(".tngpTools .colTools .colList", opts.el),
				colDrag: $(".tngpDrag", opts.el),
				header: $(".tngpHeader table tr", opts.el),
				body: $(".tngpBody tbody", opts.el),
				drag: $(".tngpDrag", opts.el),
				footer: $(".tngpFooter", opts.el),
				msg: $(".tngpMessage", opts.el),
				search: $(".tableSearch", opts.el)
			};
			this.renderTools().renderHead().renderMessage();
			if (opts.usepager && opts.model === "server") {
				this.renderFooter();
			} else {
				this.nodes.footer.hide();
			}
			return this;
		},
		/**
		 * 渲染工具栏
		 * @return {object} 列表对象
		 */
		renderTools: function() {
			var opts = this.opts,
				html, grid = this;
			if (opts.buttons && opts.buttons.length > 0) {
				$.each(opts.buttons, function(i, item) {
					html = tn.tmpl(grid.tpl.tool.btn.join(","), item);
					html = $(html).data("click", item.onpress);
					grid.nodes.btns.append(html);
					if(item.bclass) {
						$(html).addClass(item.bclass);
					}
				});
			} else {
				//隐藏表格列
				grid.nodes.btns.remove();
				//如果不需要选择列隐藏功能并且列表无按钮则彻底隐藏工具栏
				if (!opts.toolColShow && !opts.search) {
					this.nodes.tools.hide();
				}
			}
			return this;
		},
		/**
		 * 渲染列头
		 * @return {object} 列表对象
		 */
		renderHead: function() {
			var opts = this.opts,
				html, grid = this,
				defaultFieldData = {},
				width = 0;
			(opts.colModel && opts.colModel.length > 0) && $.each(opts.colModel, function(i, item) {
				if (item.hide && item.hide === true) {
					return;
				}
				if (!item.width) {
					item.width = 0;
				}
				var tempHead = item.sortable ? grid.tpl.head.sortCol.join("") : grid.tpl.head.nomal.join("");
				//默认排序
				if(grid.opts.param.sortname && grid.opts.param.sortorder && grid.opts.param.sortname == item.name && grid.opts.param.sortorder != 'asc') {
					tempHead = tempHead.replace('<i class="icon-chevron-up tngpSorted" title="升序"  abbr="asc"></i>', '<i class="icon-chevron-down tngpSorted" title="倒序"  abbr="desc"></i>');
				}
				if (item.display === "checkbox" && i === 0) {
					tempHead = grid.tpl.head.checkbox.join("");
				}

				//title显示bug修复
				item.displayTitle = item.display.replace(/<[^>]+>/g,"");

				html = tn.tmpl(tempHead, item);
				grid.nodes.header.append(html);
				if (grid.searchTag.length != opts.colModel.length) {
					grid.searchTag.push(item.name);
				}
				//操作列不可以隐藏，并且需要选择隐藏列功能
				//如果table没有名字和id，则隐藏该功能
				grid.tableFlag = grid.opts.tablename || $(grid.opts.el).attr("id");
				if (opts.toolColShow && (!grid.tableFlag)) {
					throw new Error("隐藏列功能需要给加载table的节点设置id或者传入配置时设置tablename");
				}
				if (!opts.toolColShow) {
					$(".tngpTools .colToggle", opts.el).hide();
				}
				if (item.name !== "edit" && item.name !== "checkbox") {
					/*if(item.hide && item.hide === true) {
						html = $(html).css("display", "none");
					}*/
					html = tn.tmpl(grid.tpl.tool.options.join(","), item);
					grid.nodes.colSelect.append(html);
					defaultFieldData[item.name] = "";
				}
				/*if (item.hide && item.hide === true) {
					grid.opts.hideField.push(item.name);
				}*/
				html = tn.tmpl(grid.tpl.bodyTemp.join(","), item);
				html = html.replace(/@/gi, "<%=").replace(/#/gi, "%>");
				grid.tpl.body.push(html);
				width += item.width + opts.tdPadding;
				grid.createDragNode.call(grid, width || opts.colMinWidth);

				if (item.handler) {
					grid.handlerEvent[item.name] = item.handler;
				}
			});
			this.emptyFields = tn.util.merge({}, defaultFieldData);
			//当列存在hide:true属性时需要隐藏拖拽线
			this.refColhide(false);
			return this;
		},
		/**
		 * 渲染消息提示
		 * @param  {htmlStrring} msg 消息内容，可以为html字符串
		 * @return {object}     列表对象
		 */
		renderMessage: function(msg) {
			var opts = this.opts;
			this.nodes.msg.width(this.nodes.body.width() - opts.colModel.length - 2);
			this.nodes.msg.html(msg);
			return this;
		},
		/**
		 * 渲染列内容
		 * @param {[type]} flag 隐藏或显示列
		 * @return {object} 列表对象
		 */
		renderBody: function(flag) {
			try {
				var opts = this.opts,
					grid = this;
				this.nodes.body.empty();
				var displayNum = (this.jsonData && this.jsonData.data && this.jsonData.data.rows && opts.displayNum >= this.jsonData.data.rows.length) ? this.jsonData.data.rows.length : opts.displayNum;
				//判断渲染列表头的条数
				var count = 0;
				//重置tpl.body
				var tdWidth = [];
				$("th", this.nodes.header).each(function(i, n) {
					tdWidth.push($($(n).children()[0]).css("width"));
				});
				//拖拽线高度置为0
				this.createDragNode(null, 0);
				switch (opts.view) {
					case "table":
						(this.jsonData && this.jsonData.data && this.jsonData.data.rows && this.jsonData.data.rows.length > 0) && $.each(this.jsonData.data.rows, function(i, item) {
							item.checkbox = "";
							item.edit = "";
							var tr = $("<tr>" + tn.tmpl(grid.tpl.body.join(","), item) + "</tr>");
							tr.data("rowdata", item);
							//重置单元格宽度
							tr.children("td").each(function(j, m) {
								$(m).children("div").eq(0).width(tdWidth[j]);
							});
							grid.nodes.body.append(tr);
							for (var j in item) {
								if (grid.handlerEvent[j]) {
									//单元格绑定字段值，行数据，单元格，行索引，行对象
									grid.handlerEvent[j].call(grid, item[j], item, $("div[col='" + j + "']", tr), tr.index(), tr);
								};
							}
							if (opts.drag) {
								tr.bind("dragstart", function(e) {
									e.originalEvent.dataTransfer.setData('move', e.target.rowIndex);
								}).attr("draggable", true);
							}
						});
						break;
					case "tree":
						if (!opts.treeName || opts.treeName.length === 0) {
							throw new Error("列表参数配置错误，请配置treeName属性");
							return false;
						};
						(this.jsonData && this.jsonData.data && this.jsonData.data.rows && this.jsonData.data.rows.length > 0) && $.each(this.jsonData.data.rows, function(i, item) {
							item.checkbox = "";
							item.edit = "";
							if (!item.leaf) {
								count++;
								var colspan = opts.colModel.length;
								var temp = {
									colspan: colspan,
									width: grid.nodes.header.width() - opts.tdPadding,
									name: (opts.treeDisplay)
								}
								var tr = $("<tr>" + tn.tmpl(grid.tpl.treeHead.join(","), temp) + "</tr>");
								tr.data("pid", item[opts.treeName]).data("rowdata", item);
								//重置单元格宽度
								tr.children("td").each(function(j, m) {
									$(m).children("div").eq(0).width(tdWidth[j]);
								});
								grid.nodes.body.append(tr);
								if (opts.treeHandler) {
									opts.treeHandler.call(grid, item[opts.treeName], item, $("div div", tr), tr.index(), tr);
								};
								//在列表的treeHead上加一个checkbox
								if(grid.nodes.header.find("input[type='checkbox']").length){
									$("a:first", tr).before('<div col = "checkbox" style = "overflow:auto;text-overflow:clip;"><input type="checkbox" style="width:24px;margin-left:-5px" col = "checkbox"></div>').css({
										"margin-left":"23px"
									});
								}
								if($("input[type = 'checkbox']", tr).length){
									//如果item[opts.treeName]为Number时，无法添加Class，只能转成字符串
									$("input[type = 'checkbox']", tr).addClass((item[opts.treeName]).toString());
								}
								//是否已经渲染树叶
								tr.data("renderFlag", false);
								//渲染了以后将icon改成减号
								grid.setDefaultIcon.call(grid, tr, true);
								if (count <= displayNum) {
									//是否已经渲染树叶
									tr.data("renderFlag", true);
									//渲染了以后将icon改成减号
									grid.setDefaultIcon.call(grid, tr, false);
								}
							} else {
								if (count <= displayNum) {
									var tr = $("<tr>" + tn.tmpl(grid.tpl.body.join(","), item) + "</tr>");
									tr.data("pid", item[opts.treeName]).data("rowdata", item);
									grid.nodes.body.append(tr);
									for (var j in item) {
										if (grid.handlerEvent[j]) {
											grid.handlerEvent[j].call(grid, item[j], item, $("div[col='" + j + "']", tr), tr.index(), tr);
										};
									}
									if($("input[type = 'checkbox']", tr).length){
										//如果item[opts.treeName]为Number时，无法添加Class，只能转成字符串
										$("input[type = 'checkbox']", tr).addClass((item[opts.treeName]).toString());
									}
								}
							}
						});
						break;
				}
				//隐藏设置的隐藏列
				this.refColhide(flag);
				// this.setBodyWidth();
				this.createDragNode(null, this.nodes.tools.height() + this.nodes.body.height() + 31);
				return this;
			} catch (e) {
				throw new Error("预绑定字段，后台数据中不存在，" + e);
			}
		},
		/**
		 * 设置默认展开收起Icon
		 * @param {element} ele 需要设置的列
		 * @param  {boolen} flag 为true时为收起的icon-plus，false为展开的icon-minus
		 * @return {[type]}      [description]
		 */
		setDefaultIcon: function(ele, flag) {
			if (flag) {
				$("i:first", ele).removeClass("icon-minus");
				$("i:first", ele).addClass("icon-plus");
			} else {
				$("i:first", ele).removeClass("icon-plus");
				$("i:first", ele).addClass("icon-minus");
			}
		},
		/**
		 * 渲染树的树叶
		 * @param  {element}   element  树头节点
		 * @param  {int}   pid      树头节点ID
		 * @param  {Function} callback 渲染以后的回调函数
		 * @return {[type]}            [description]
		 */
		renderTreeBody: function(element, pid, callback) {
			var grid = this;
			var opts = grid.opts;
			if (!element.data("renderFlag")) {
				if (this.jsonData && this.jsonData.data && this.jsonData.data.rows && this.jsonData.data.rows.length) {
					var leafData = $.grep(this.jsonData.data.rows, function(data) {
						return data.leaf && data[grid.opts.treeName] == pid;
					});
					leafData = leafData.reverse();
					$.each(leafData, function(i, item) {
						var tr = $("<tr>" + tn.tmpl(grid.tpl.body.join(","), item) + "</tr>");
						tr.data("pid", item[opts.treeName]).data("rowdata", item);
						element.after(tr);
						for (var j in item) {
							if (grid.handlerEvent[j]) {
								grid.handlerEvent[j].call(grid, item[j], item, $("div[col='" + j + "']", tr), tr.index(), tr);
							};
						}
						if($("input[type = 'checkbox']", tr).length){
							//如果item[opts.treeName]为Number时，无法添加Class，只能转成字符串
							$("input[type = 'checkbox']", tr).addClass((item[opts.treeName]).toString());
						}
						//是否已经渲染树叶
						element.data("renderFlag", true);
						//渲染了以后将icon改成减号
						grid.setDefaultIcon.call(grid, element, false);
					});
				}
			} else if (callback && $.isFunction(callback)) {
				callback.call(grid, element, pid);
			}
		},
		/**
		 * 渲染脚
		 * @return {object} 列表对象
		 */
		renderFooter: function() {
			var opts = this.opts;
			var count = this.count;
			html = tn.tmpl(this.tpl.footer.paging.join(""), {
				prev: opts.prev,
				next: opts.next,
				first: opts.first,
				last: opts.last,
				count: count,
				pageSizes: opts.pageSizes
			});
			this.nodes.footer.html(html);
			if($.inArray(opts.param.limit, opts.pageSizes) != -1) {
				$(".pag_selLimit select", this.nodes.footer).val(opts.param.limit);
			} else {
				opts.param.limit = opts.pageSizes[0];
			}
			return this;
		},
		/**
		 * 列表点击操作的事件绑定集合
		 * @param  {element} e 当前点击的节点
		 * @return {null}
		 */
		click: function(e) {
			// e.stopPropagation();
			//当前this为tpl.wrapper
			var grid = $(this).data("grid");
			var el = $(e.target);

			//在列表中每个点击操作，都是取父节点的class
			var parent = el.parent();

			//点击工具栏中的配置按钮
			if (el.closest("a").hasClass("btn_tool")) {
				grid.clickToolBtns.call(grid, el.closest("a"));
			}

			if (parent.hasClass("pag_selLimit")) {
				$(parent).unbind('change').bind('change', function(e) {
					grid.clickPagBtns.call(grid, parent);
				});
			}

			if (parent.hasClass("pag_tool")) {
				grid.clickPagBtns.call(grid, parent);
			}
			if (el.closest("span").hasClass("colToggle")) {
				grid.colListToggle.call(grid, el.closest("span"));
				if (parent[0].nodeName === "LABEL") {
					grid.colListToggle.call(grid, el.closest("span"), true);
				};
			} else if(!el.closest("span").hasClass("colItem")) {
				grid.colListToggle.call(grid, parent, false);
			}

			if (el.closest("span").hasClass("tableSearch")) {
				grid.tableSearch.call(grid, el.closest("span"));
			} else {
				grid.closeMsg.call(grid, parent);
			}

			if (el.closest("span").hasClass("cancelTableSearch")) {
				grid.cancelTableSearch.call(grid, el.closest("span"));
			}

			if (parent.parents("div").hasClass("tngpMessage")) {
				grid.closeMsg.call(grid, parent);
			}

			//input框点击事件以及浏览器默认触发事件
			if (parent.parent().hasClass("colItem")) {
				grid.colToggleCheck.call(grid, parent);
			}

			if (parent.hasClass("tngpDrag")) {
				return false;
			}

			//全选按钮的点击时，树的时候特殊处理
			if (parent.attr("col") === "checkbox" && parent.parent().is("TH")) {
				if(grid.opts.view === "tree") {
					var tr = $(".treeHead", grid.nodes.body).parents("tr");
					tr.each(function(i, item){
						var treeElement = $(item);
						var pid = treeElement.data("pid");
						if($("i", item).attr("class") === "icon-plus"){
							grid.renderTreeBody.call(grid, treeElement, pid, grid.treeRowToggle);
						}
					});
				}
				grid.selectAllRows.call(grid, parent);
			};

			//当树叶上有选择框被取消时，同时取消树头的选择框，防止树头被删除，树叶还存在。
			if (parent.attr("col") === "checkbox" && !parent.parent().is("TH") && !parent.parents("td").hasClass("treeHead")) {
				if(!e.target.checked) {
					if($("." + el.attr("class") + "[col = 'checkbox']", grid.nodes.body).length) {
						$("." + el.attr("class") + "[col = 'checkbox']", grid.nodes.body)[0].checked = false;
					}
				}
				grid.cancelSelectCheck.call(grid, el);
			}

			//treeHead上的全选按钮
			if (parent.parents("td").hasClass("treeHead")) {
				var treeElement = parent.parents("tr");
				var pid = treeElement.data("pid");
				if(el.attr("col") === "checkbox") {
					if($("i", treeElement).attr("class") === "icon-plus") {
						grid.renderTreeBody.call(grid, treeElement, pid, grid.treeRowToggle);
					}
					grid.selectTreeLeaf.call(grid, el);
				} else {
					grid.renderTreeBody.call(grid, treeElement, pid, grid.treeRowToggle);
				}
			};

			//升序和降序
			if (el.hasClass("tngpSorted")) {
				e.stopPropagation();
				grid.sortEve(el);
				grid.opts.param.sortorder = el.attr("abbr");
				grid.opts.param.sortname = el.parents("div").attr("col");
				grid.setData(null, null, 2);
			}
		},
		/**
		 * 列表鼠标操作的事件绑定集合
		 * @param  {element} e 当前点击的节点
		 * @return {null}
		 */
		mouse: function(e) {
			e.stopPropagation();
			//当前this为tpl.wrapper
			var grid = $(this).data("grid");
			var el = $(e.target);

			//在列表中每个点击操作，都是取父节点的class
			var parent = el.parent();

			if (parent.hasClass("tngpDrag")) {
				grid.colDragStart.call(grid, parent, e);
			}
		},
		keypress: function(e) {
			var grid = $(this).data("grid");
			var el = $(e.target);

			//在列表中每个点击操作，都是取父节点的class
			var parent = el.parent();
			if (parent.parents().hasClass("tngpMessage") && (e.keyCode === 13 || e.keyCode === 27)) {
				grid.closeMsg.call(grid, parent);
			}
		},
		hover: function(e) {
			var grid = $(this).data("grid");
			var el = $(e.target);
			// $(".tngpSorted").parents("th").unbind("hover").bind("hover", function(evt) {
			// 	grid.sortEve.call(grid, $(evt.target).closest("th").find(".tngpSorted")[0]);
			// });
		},
		sortEve: function(e) {
			var grid = this;
			var targetEve = $(e);
			if(targetEve.attr("abbr") == "asc") {
				targetEve.removeClass("icon-chevron-up").addClass("icon-chevron-down").attr("title", "倒序");
				targetEve.attr("abbr", "desc");
			} else {
				targetEve.removeClass("icon-chevron-down").addClass("icon-chevron-up").attr("title", "升序");
				targetEve.attr("abbr", "asc");
			}
		},
		drag: function(e) {
			var grid;
			if (!grid) {
				grid = $(this).data("grid");
			}
			var id = parseInt(e.originalEvent.dataTransfer.getData('move')),
				moveTr = $("tr:eq(" + id + ")", grid.nodes.body),
				targetTr;

			tagetTr = $(grid.endNode).parents("tr");
			//by yl 拖拽到外面报错
			if (!tagetTr.length) {
				return false;
			}
			var targetTrIndex = tagetTr[0].rowIndex;
			//http://bug.tuniu.org/issues/17309 by yl
			if (!tagetTr.parent().parent().parent().hasClass("tngpBody")) {
				return false;
			}
			if (id == targetTrIndex) {
				return false;
			};
			// tagetTr.after(moveTr);
			if(id > targetTrIndex) {
				tagetTr.before(moveTr);
			} else {
				tagetTr.after(moveTr);
			}

			var newData = [];
			$("tr", grid.nodes.body).each(function(i, item) {
				$(item).removeClass();
				$("td", item).css('background-color', '');
				if (i % 2) item.className = 'erow';
				// by zk
				newData.push($(item).data("rowdata"));
			});
			grid.jsonData.data.rows = newData;

			grid.endNode = null;
			grid.moveNode = null;
			return false;
		},
		dragover: function(e) {
			var grid;
			if (!grid) {
				grid = $(this).data("grid");
			};
			var id = parseInt(e.originalEvent.dataTransfer.getData('move'));

			var parentNode = $(e.target).parents("tr");

			if (id != parentNode.rowIndex) {
				$("td", parentNode).css("background-color", "rgba(70,136,71,0.1)");
				grid.moveNode = parentNode;
			};
			return false;
		},
		dragleave: function(e) {
			var grid;
			if (!grid) {
				grid = $(this).data("grid");
			}
			$("td", grid.moveNode).css("background-color", "transparent");
			return false;
		},
		dragenter: function(e) {
			var grid;
			if (!grid) {
				grid = $(this).data("grid");
			}
			grid.endNode = e.target;
			return false;
		},
		setDefaultEmptyData: function() {
			this.emptyData = {
				count: 0,
				rows: []
			}
		},
		/**
		 * 取消过滤
		 * @param  {element} e 取消过滤节点
		 * @return {null}
		 */
		cancelTableSearch: function(e) {
			var trs = $("tr", this.nodes.body).removeAttr("style");
			$(e).hide();
			this.setBodyHight();
		},
		/**
		 * 当前表格内容查找，调用外部JS，拼音处理
		 * @param  {element} e 查找按钮节点
		 * @return {null}
		 */
		tableSearch: function(e) {
			var opts = this.opts,
				grid = this;
			this.renderMessage(this.tpl.tool.search.join(","));
			this.nodes.msg.show();
			var engine = pinyinEngine();

			$.each(this.jsonData.data.rows, function(i, item) {
				var temp = [];
				for (var j in grid.searchTag) {
					var tag = item[grid.searchTag[j]];
					if (tag) {
						temp.push(tag.toString());
					}
				}
				item.index = i;
				engine.setCache(temp, item);
			});

			var input = $("input", this.nodes.msg);
			input.focus();
			inputEl = input[0], oldVal = inputEl.value;

			input.unbind("click").bind("click", function(e) {
				e.stopPropagation();
			});

			inputEl.oninput = inputEl.onpropertychange = function() {
				var keyword = inputEl.value;
				if (keyword === oldVal) return;
				if (keyword.length === 0) {
					$(".resultRowsCount", grid.nodes.msg).html("<strong>已查找到0条记录</strong>");
					grid.cancelTableSearch();
					return;
				}
				oldVal = inputEl.value;
				var indexs = [];
				engine.search(keyword, function(data) {
					indexs.push(data.index);
				});
				grid.rowToggle.call(grid, indexs);
				e.next().css({
					"display": "block",
					"margin-top": "10px"
				});
			};
		},
		/**
		 * 添加本地数据行
		 */
		addLocalRows: function() {
			var opts = this.opts;
			if (opts.model != "local") {
				return;
			}
			var temp = tn.util.merge({}, this.emptyFields);
			this.emptyData.rows.push(temp);
			this.emptyData.count = this.emptyData.rows.length;
			this.setData(this.emptyData);
		},
		/**
		 * 数据行的显示或隐藏
		 * @param  {array} indexs 行索引集合
		 * @return {null}
		 */
		rowToggle: function(indexs) {
			var opts = this.opts;
			var trs = this.nodes.body.children("tr");
			trs.each(function(i, item) {
				if ($.inArray(i, indexs) !== -1) {
					$(item).removeAttr("style");
				} else {
					$(item).hide();
				}
			});
			$(".resultRowsCount", this.nodes.msg).html("<strong>已查找到" + indexs.length + "条记录</strong>");
			this.setBodyHight();
		},
		treeRowToggle: function(e, pid) {
			var trs = $("tr", this.nodes.body),
				indexs = [];
			trs.each(function(i, item) {
				if ($(item).data("pid") === pid && $("td", item).size() !== 1) {
					$(item).toggle();
				}
			});
			//toggleClass这个方法用不起来，不知道为啥。
			if ($($(".treeHead i", e)[0]).hasClass("icon-minus")) {
				$($(".treeHead i", e)[0]).addClass("icon-plus");
				$($(".treeHead i", e)[0]).removeClass("icon-minus");
			} else {
				$($(".treeHead i", e)[0]).addClass("icon-minus");
				$($(".treeHead i", e)[0]).removeClass("icon-plus");
			}
			this.setBodyHight();
		},
		/**
		 * 如果数据中没有colmodel中所定义的字段，那么将colmodel整定义字段加在jsonData中
		 * @param  {object} data 获取到的数据
		 * @return {object}      [description]
		 */
		_complementFields: function(data) {
			//处理{count: 0, rows: [null]}或者data:null
			if (!data.data || (data && data.data && data.data.rows && data.data.rows.length == 1 && data.data.rows[0] == null)) {
				data = {
					count: 0,
					rows: null
				}
			}
			if (data && data.data && data.data.rows && data.data.rows.length > 0) {
				for (var i in this.emptyFields) {
					$.each(data.data.rows, function(j, item) {
						if (item[i] === undefined) {
							item[i] = null;
						}
					});
				}
				return data;
			}
		},
		/**
		 * 设置表格内部高度
		 */
		setBodyHight: function() {
			var opts = this.opts;
			$("div", this.nodes.colDrag).css({
				height: this.nodes.tools.height() + this.nodes.body.height() - 10
			});
		},
		/**
		 * 关闭消息框
		 * @param  {element} e 关闭按钮
		 * @return {null}
		 */
		closeMsg: function(e) {
			this.nodes.msg.html("").hide();
		},
		/**
		 * 选择所有行
		 * @param  {element} e 列头的checkbox
		 * @return {null}
		 */
		selectAllRows: function(e) {
			var checkbox = $("input[type='checkbox']", e)[0];
			var tr = $("div[col='checkbox'] input[type='checkbox']", this.nodes.body).closest("tr");
			tr.each(function(i, item) {
				if (!$(item).attr("style") || $(item).css("display") === "table-row") {
					$("div[col='checkbox'] input[type='checkbox']", item).attr("checked", checkbox.checked);
				}
			});
			$(".treeHead input[col = 'checkbox']", this.nodes.body).attr("checked", checkbox.checked);
			if(this.opts.onSelectAll){
				this.opts.onSelectAll.call(this,this.getCheckedRowsData());
			}
		},
		/**
		 * 选中一列树的树叶
		 * @param  {element} e treeHead的checkbox
		 * @return {null}
		 */
		selectTreeLeaf: function(e) {
			var checkbox = e[0];
			var className = e.attr("class");
			var td = e.parents("td");
			var tr = $("input." + className, this.nodes.body).closest("tr");
			tr.each(function(i, item) {
				if (!$(item).attr("style") || $(item).css("display") === "table-row" || $(item).attr("style") === "display: none;") {
					$("[col='checkbox'] input[type='checkbox']", item).attr("checked", checkbox.checked);
				}
			});
		},
		/**
		 * 取消选中复选框时的按钮操作
		 * @return {array} 选中行数据格式[{},{},{},.....]
		 */
		cancelSelectCheck: function(el) {
			var grid = this;
			//判断树叶是否全部选中
			if(grid.opts.view == "tree" && $("." + el.attr("class") + ":not(:checked)", grid.nodes.body).length == 1) {
				$("." + el.attr("class") + "[col = 'checkbox']", grid.nodes.body)[0].checked = true;
			}
			//判断是否全选
			if($("div[col='checkbox'] input[type='checkbox']:not(:checked)", grid.nodes.body).length == 0) {
				grid.nodes.header.find("div[col='checkbox'] input[type='checkbox']")[0].checked = true;
			} else {
				grid.nodes.header.find("div[col='checkbox'] input[type='checkbox']")[0].checked = false;
			}
		},
		/**
		 * 获取checked行的数据
		 * @return {array} 选中行数据格式[{},{},{},.....]
		 */
		getCheckedRowsData: function() {
			var tr = $("[col='checkbox'] input[type='checkbox']", this.nodes.body).closest("tr");
			var selectIndexs = [];
			tr.each(function(i, item) {
				if (!$(item).attr("style") || $(item).css("display") === "table-row") {
					var input = $("[col='checkbox'] input[type='checkbox']", item);
					if (input[0].checked) {
						selectIndexs.push(item.rowIndex);
					};
				}
			});
			$.unique(selectIndexs);
			selectIndexs = selectIndexs.reverse();
			return this.getSelectRowsData(selectIndexs);
		},
		/**
		 * 获取所选择的行的行索引
		 * @return {array} 选中行的索引[1,2,3,...]
		 */
		getCheckedRowsIndex: function() {
			var tr = $("[col='checkbox'] input[type='checkbox']", this.nodes.body).closest("tr");
			var selectIndexs = [];
			tr.each(function(i, item) {
				if (!$(item).attr("style") || $(item).css("display") === "table-row") {
					var input = $("[col='checkbox'] input[type='checkbox']", item);
					if (input[0].checked) {
						selectIndexs.push(item.rowIndex);
					};
				}
			});
			selectIndexs = selectIndexs.reverse();
			return selectIndexs;
		},
		/**
		 * 删除拖拽线
		 * @return {null}
		 */
		removeDrag:function(){
			$(".tngpDrag", this.opts.el).remove();
		},
		/**
		 * 根据绑定字段返回选中行数据
		 * @param  {string} field 绑定字段
		 * @return {array}        选中行数据格式["","",....]只包含某字段数据
		 */
		getCheckedRowsDataByField: function(field) {
			var datas = this.getCheckedRowsData();
			var temp = [];
			if (!field || field.length === 0) {
				return temp;
			}
			for (var i in datas) {
				temp.push(datas[i][field]);
			}
			return temp;
		},
		/**
		 * 获取索引行数据，数据处理
		 * @param  {null or string or array} indexs 行索引，为空时返回所有数据，string格式："1,2,3,4"，array格式[1,2,3,4]
		 * @return {array}        索引行数据格式[{},{},{},.....]
		 */
		getSelectRowsData: function(indexs) {
			var grid = this;
			var datas = this.getData();
			if (arguments.length === 0) {
				return datas;
			};
			//获取表格所有的tr
			var trAll = grid.nodes.body.children("tr");
			if(trAll.length === 0) {
				return datas;
			}
			var temp = [];
			if (!tn.type.isArray(indexs)) {
				if (tn.type.isNumber(indexs)) {
					// indexs = [indexs];
					return trAll.eq(parseInt(indexs)).data("rowdata");
				} else {
					indexs = indexs.split(",");
				}
			}
			for (var i in indexs) {
				var trIndex = parseInt(indexs[i]);
				if (trIndex < trAll.length) {
					temp.push(trAll.eq(trIndex).data("rowdata"));
				}
			}
			return temp;
		},
		/**
		 * 获取索引行节点
		 * @param  {null or string or array} indexs 行索引，为空时返回所有数据，string格式："1,2,3,4"，array格式[1,2,3,4]
		 * @return {array}        索引行数据格式[element,element,element,.....]
		 */
		getSelectRowsNodes: function(indexs) {
			var grid = this;
			//获取表格所有的tr
			var trAll = grid.nodes.body.children("tr");
			if (arguments.length === 0) {
				return trAll;
			};

			var temp = [];
			if (!tn.type.isArray(indexs)) {
				if (tn.type.isNumber(indexs)) {
					indexs = [indexs];
					// temp.push($("tr:eq(" + indexs + ")", this.nodes.body));
				} else {
					indexs = indexs.split(",");
				}
			}
			for (var i in indexs) {
				if (parseInt(indexs[i]) < trAll.length) {
					temp.push(trAll.get(parseInt(indexs[i])));
				}
			}
			$.unique(temp);
			return temp;
		},
		/**
		 * 创建拖拽线
		 * @param  {int} width  拖拽线左边距
		 * @param  {int} height 拖拽线高度
		 * @return {[type]}        [description]
		 */
		createDragNode: function(width, height) {
			if (height) {
				$("div", this.nodes.colDrag).css({
					height: Math.abs(height)
				});
			}
			if (width) {
				var dragNode = $("<div></div>");
				dragNode.css({
					left: width - 2
				});
				this.nodes.colDrag.append(dragNode);
			}
		},
		/**
		 * 重置拖拽线
		 * @return {null}
		 */
		resetDragNode: function() {
			var dragLines = $("div", this.nodes.drag);
			dragLines.each(function(i, item) {
				var left = parseInt($(item).css("left").replace("px", ""));
				$(item).css({
					left: left - scrollLeft
				})
			});
		},
		/**
		 * 拖拽开始
		 * @param  {element} node 拖拽线父节点
		 * @param  {element} e    拖拽线节点
		 * @return {null}
		 */
		colDragStart: function(node, e) {
			var x = $(e.target).offset().left,
				grid = this;
			this.dragX = x;
			$(document).unbind("mousemove").bind("mousemove", function(evt) {
				grid.colDragMove.call(grid, evt, e, x);
			});
			$(document).unbind("mouseup").bind("mouseup", function(evt) {
				grid.colDragEnd.call(grid, evt, e, x);
			});
			$(document.body).noSelect();
		},
		/**
		 * 拖拽移动
		 * @param  {element} e    document
		 * @param  {element} node 拖拽线节点
		 * @param  {int} x    拖拽线左边距
		 * @return {null}
		 */
		colDragMove: function(e, node, x) {
			var colIndex = $(node.target).index();
			var tdWidth = this.tdWidth = $(node.target).prev().length > 0 ? (e.clientX - $(node.target).prev().offset().left) : (e.clientX + 2 - this.opts.tdPadding);
			if (tdWidth > this.opts.dragMinWidth) {
				$(node.target).offset({
					left: e.clientX
				});
			};
		},
		/**
		 * 拖拽结束
		 * @param  {element} e    document
		 * @param  {element} node 拖拽线节点
		 * @param  {int} x    拖拽线左边距
		 * @return {null}
		 */
		colDragEnd: function(e, node, x) {
			//判断是否是第一个拖线来定距离左侧的长度
			var tdLeft = $(node.target).prev().length > 0 ? ($(node.target).prev().offset().left + this.opts.dragMinWidth) : (this.opts.dragMinWidth + 2 - this.opts.tdPadding)
			var tdMinWidth = (this.tdWidth > this.opts.dragMinWidth) ? e.clientX : tdLeft;
			$(node.target).offset({
				left: tdMinWidth
			});
			var colIndex = $(node.target).index();
			var endX = tdMinWidth - this.dragX;
			var grid = this;

			var startWidth = $("th:eq(" + colIndex + ") div", this.nodes.header).width();

			$("th:eq(" + colIndex + ") div", this.nodes.header).width(startWidth + endX);
			$("tr", this.nodes.body).each(function(i, item) {
				$("td:eq(" + colIndex + ") div[col!='treeHead']", item).width(startWidth + endX);
			});
			$(node.target).nextAll().each(function(i, item) {
				var left = $(item).offset().left;
				$(item).offset({
					left: left + endX
				});
			});
			this.resetTreeRowsWidth();
			$(document).unbind("mousemove mouseup");
			$(document.body).noSelect(false);
		},
		/**
		 * 显示或隐藏列功能
		 * @param  {element} e 显示或隐藏列按钮
		 * @return {null}
		 */
		colListToggle: function(e, flag) {
			this.nodes.colSelect.toggle(flag);
		},
		colToggleCheck: function(e) {
			this.colToggle.call(this, e);
		},
		/**
		 * 隐藏或显示列
		 * @param  {element} e       主动选择列隐藏时的节点
		 * @param  {string} colName 列绑定字段
		 * @param  {bool} flag    隐藏或显示
		 * @return {null}
		 */
		colToggle: function(e, colName, flag) {
			var localData = this.getLocalData(this.opts.loginName);
			if (e) {
				colName = $("input", e).val();
			}
			this.colHidden(colName, 1);
			var list = localData || {};
			if (!list[this.tableFlag]) {
				list[this.tableFlag] = {};
			}
			list[this.tableFlag].hideCols = this.saveLocalData();
			this.setLocalData(this.opts.loginName, list);
		},

		/**
		 * 隐藏或显示列
		 * @param  {[type]} colName 列名
		 * @param  {[type]} flag    隐藏或显示：1：显示隐藏；2：选择条目数；3：渲染隐藏头部。其他是刷新的情况；注意：刷新和隐藏头部时候都不需要改吧拖拽宽度
		 * @return {[type]}         [description]
		 */
		colHidden: function(colName, flag) {
			var header = this.nodes.header,
				colDrag = this.nodes.colDrag,
				body = this.nodes.body;

			var colIndex = $("div[col='" + colName + "']", header).parent().index();
			var endX = -($("div[col='" + colName + "']", header).width() + this.opts.tdPadding);
			var dragSeleNode = $($("div", colDrag)[colIndex]);
			var colNode = $("th:eq(" + colIndex + ")", header);
			if (flag == 1) {
				colNode.toggle();
				$("tr", body).each(function(i, item) {
					$("td:eq(" + colIndex + ")", item).toggle();
				});
				//将拖拽线也隐藏
				if (dragSeleNode.attr("isHide") != 1) {
					dragSeleNode.toggle().attr("isHide", "1");
				} else {
					endX = -endX;
					dragSeleNode.toggle().attr("isHide", "0");
				}
				setDragDes(dragSeleNode);
			} else if (flag == 4) {
				endX = -endX;
				colNode.show();
				$("tr", body).each(function(i, item) {
					$("td:eq(" + colIndex + ")", item).show();
				});
				//将拖拽线显示
				dragSeleNode.show();
				dragSeleNode.attr("isHide", "0");
			} else {
				colNode.hide();
				$("tr", body).each(function(i, item) {
					$("td:eq(" + colIndex + ")", item).hide();
				});
				//将拖拽线也隐藏
				dragSeleNode.hide();
				dragSeleNode.attr("isHide", "1");
				if (flag != 2 && flag != 3) {
					setDragDes(dragSeleNode);
				}
			}

			function setDragDes(dragSeleNode) {
				dragSeleNode.nextAll().each(function(i, item) {
					var left = $(item).offset().left;
					$(item).offset({
						left: left + endX
					});
				});
			}
			this.resetTreeRowsWidth();
		},
		/**
		 * 提供给外部调用的隐藏列函数
		 * @param  {[type]} colName 列名
		 * @param  {[type]} flag    false 为隐藏
		 * @return {[type]}         [description]
		 */
		colhide: function(colName, flag) {
			var grid = this;
			var localData = grid.getLocalData(grid.opts.loginName) || {};
			if (!flag) {
				//本地存储与colhide同时存在时return
				//将需要隐藏的字段放入本地存储数据中
				if (localData[this.tableFlag] && localData[this.tableFlag].hideCols && localData[this.tableFlag].hideCols[colName]) {
					if (grid.opts.toolColShow) {
						$('input[value=' + colName + ']', this.nodes.colSelect).attr("checked", false).parents("span").hide();
					}
					grid.colHidden(colName, 2);
					return;
				} else {
					localData[this.tableFlag] = localData[this.tableFlag] || {};
					localData[this.tableFlag].hideCols = localData[this.tableFlag].hideCols || {};
					localData[this.tableFlag].hideCols[colName] = true;
					grid.colHidden(colName, flag);
					grid.setLocalData(this.opts.loginName, localData);
					if (grid.opts.toolColShow) {
						$('input[value=' + colName + ']', this.nodes.colSelect).attr("checked", false).parents("span").hide();
						// $('input[value=' + colName + ']', this.nodes.colSelect).parents("span").hide();
					}
				}
			} else {
				if (localData[this.tableFlag] && localData[this.tableFlag].hideCols[colName]) {
					delete localData[this.tableFlag].hideCols[colName];
					grid.setLocalData(this.opts.loginName, localData); //by yl 保存修改
					grid.colHidden(colName, 1);
					if (grid.opts.toolColShow) {
						$('input[value=' + colName + ']', this.nodes.colSelect).attr("checked", true).parents("span").show();
					}
				}
			}
		},
		/**
		 * 提供给外部调用的隐藏列函数，主要用于表格太长时默认隐藏某些列
		 * @param  {string、array} colName 列名
		 * @return {[type]}         [description]
		 */
		colhideForShortTable: function(colName) {
			var grid = this;
			var colNames = [];
			var localData = grid.getLocalData(grid.opts.loginName) || {};
			if (localData && localData[grid.tableFlag] && localData[grid.tableFlag].hideCols) {
				return;
			}
			if (tn.type.isString(colName)) {
				colNames.push(colName);
			} else {
				colNames = colName;
			}
			//过滤相同的数组
			$.unique(colNames);
			localData[grid.tableFlag] = localData[grid.tableFlag] || {};
			localData[grid.tableFlag].hideCols = localData[grid.tableFlag].hideCols || {};
			$.each(colNames, function(i, item) {
				localData[grid.tableFlag].hideCols[item] = true;
				grid.colHidden(item, false);
				if (grid.opts.toolColShow) {
					$('input[value=' + item + ']', grid.nodes.colSelect).attr("checked", false);
				}
			});
			grid.setLocalData(this.opts.loginName, localData);
		},
		/**
		 * 设置本地存储key
		 * @param {String}
		 * @return {All}
		 */
		setLocalData: function(key, value) {
			var strValue = tn.json.decode(value);
			try {
				window.localStorage[key.toString()] = strValue;
			} catch (e) {
				throw new Error("本地存储无法写入");
			}
		},
		/**
		 * 得到本地存储
		 * @return {null}
		 */
		getLocalData: function(key) {
			if(window.localStorage.length == 0) {
				return null;
			} else {
				return tn.json.encode(window.localStorage[key.toString()]);
			}
		},
		/**
		 * 存储需要隐藏的列
		 * @return {Object} 返回隐藏列名
		 */
		saveLocalData: function() {
			var hideCols = $.grep($('input', this.nodes.colSelect), function(n, i) {
				return !($(n).attr("checked"));
			});
			var hideColsStr = {};
			$.each(hideCols, function(i, item) {
				hideColsStr[$(item).attr("value")] = true;
			});
			return hideColsStr;
		},
		resetTreeRowsWidth: function() {
			if (this.opts.view === "tree") {
				$(".treeHead div", this.nodes.body).width(this.nodes.header.width() - this.opts.tdPadding);
			};
		},
		/**
		 * 刷新时隐藏列
		 * @return {null}
		 */
		refColhide: function(flag) {
			var opts = this.opts;
			var grid = this;
			var localData = this.getLocalData(opts.loginName);
			if (localData) {
				if (localData[this.tableFlag]) {
					for (key in localData[this.tableFlag].hideCols) {
						if (key) {
							grid.colHidden(key, flag);
							$('input[value=' + key + ']', this.nodes.colSelect).attr("checked", false);
						}
					}
				}
			}
		},
		/**
		 * 工具栏按钮点击事件绑定
		 * @param  {element} e 点击按钮节点
		 * @return {null}
		 */
		clickToolBtns: function(e) {
			e.data("click").call(this, e);
		},
		/**
		 * 列表分页点击事件绑定集合
		 * @param  {element} e 当前点击的节点
		 * @return {null}
		 */
		clickPagBtns: function(e) {
			this.pagDeal.call(this, e);
		},
		/**
		 * 列表分页点击事件处理
		 * @param  {element} e 当前点击的节点
		 * @return {null}
		 */
		pagDeal: function(e) {
			if (!e) {
				return;
			};
			if (!this.jsonData) {
				return;
			}
			var opts = this.opts;
			if (e.hasClass("pag_firstTool")) {
				if ((opts.param.start - opts.param.limit) < 0) {
					return;
				};
				opts.param.start = 0;
			} else if (e.hasClass("pag_prevTool")) {
				if ((opts.param.start - opts.param.limit) < 0) {
					return;
				};
				opts.param.start = opts.param.start - opts.param.limit;
			} else if (e.hasClass("pag_nextTool")) {
				if ((opts.param.start + opts.param.limit) >= this.count) {
					return;
				};
				opts.param.start = opts.param.start + opts.param.limit;
			} else if (e.hasClass("pag_lastTool")) {
				if ((opts.param.start + opts.param.limit) > this.count) {
					return;
				};
				opts.param.start = (this.count % opts.param.limit == 0) ? this.count - opts.param.limit : this.count - this.count % opts.param.limit;
			} else if (e.hasClass('pag_selLimit')) {
				opts.param.start = 0;
				opts.param.limit = parseInt(e.children().val(), 10);
			}
			this.setData(null, null, 2);
		},
		/**
		 * 获取列表数据
		 * @return {null}
		 */
		getData: function() {
			return this.jsonData ? this.jsonData.data.rows : [];
		},
		/**
		 * 获取列表数据个数
		 * @return {[type]} [description]
		 */
		getCount: function() {
			return this.count;
		},
		/**
		 * 设置本地或者远程数据数据
		 * @param {object} data 设置本地数据时使用
		 */
		setData: function(data, success, flag, currentPage) {
			if (success && tn.type.isFunction(success)) {
				this.opts.success = success;
			}
			this.store.getData(this, data, flag, currentPage);
		},
		reload: function(param, success,currentPage) {
			this.opts.param.start = 0;
			if (param) {
				this.store.setParam(param);
			}
			if (success && tn.type.isFunction(success)) {
				this.opts.success = success;
			}
			this.setData(null, null, 2, currentPage);
		},
		/**
		 * 私有方法设置数据回调方法
		 * @param {object} data 远程或者本地数据
		 */
		_setData: function(data, flag) {
			this.jsonData = this._complementFields(data);
			this.count = data.data.total;
			this.renderBody(flag);
			this.showPageInfo(0);
			this.opts.success.call(this, data);
		},
		showPageInfo: function(flag) {
			var pageHtml = "";
			if (flag === 0) {
				if (this.nodes && this.jsonData && this.jsonData.data.rows.length !== 0) {
					pageHtml = tn.tmpl(this.opts.pageStat, {
						from: this.opts.param.start + 1,
						to: Math.min(this.opts.param.start + this.opts.param.limit, this.count),
						count: this.count
					});
				} else {
					pageHtml = this.opts.nomsg;
				}
				$('.pag_pageInfo', this.nodes.footer).html(pageHtml);
			} else {
				if (this.nodes) {
					pageHtml = this.opts.procmsg;
					$('.pag_pageInfo', this.nodes.footer).html(pageHtml);
				}
			}
		},
		/**
		 * yl 设置body中单元格的宽度
		 *
		 */
		setBodyWidth: function() {
			var grid = this;
			$("th", this.nodes.header).each(function(i, n) {
				var headWidth = $($(n).children()[0]).css("width");
				$("tr", grid.nodes.body).each(function(j, m) { //treeHead
					if (!(grid.opts.view == "tree" && $("td", m).length == 1)) {
						$("td:eq(" + i + ") div[col!='treeHead']", m).width(headWidth);
					}
				});
			});
		},
		/**
		 * 根据绑定字段获取列对象
		 * @param  {string} field 绑定字段名称
		 * @return {array}       单元格td的数组
		 */
		getColNodes: function(field) {
			var header = this.nodes.header,
				colDrag = this.nodes.colDrag,
				body = this.nodes.body,
				colIndex = $("div[col='" + field + "']", header).parent().index(),
				td = [];
			$("tr", body).each(function(i, item) {
				td.push($('td:eq(' + colIndex + ')', item));
			});
			return td;
		},
		getColDataByField: function(field) {
			if (this.jsonData && this.jsonData.data && this.jsonData.data.rows.length > 0) {
				var data = [];
				$.each(this.jsonData.data.rows, function(i, item) {
					if (item[field]) {
						data.push(item[field]);
					}
				})
				return data;
			}
		},
		getBody: function() {
			return this.nodes.body;
		},
		removeSelectRows: function(indexs) {
			var nodes = this.getSelectRowsNodes(indexs),
				datas = this.getData();
			if (nodes.length > 0) {

				if (!tn.type.isArray(indexs)) {
					if (tn.type.isNumber(indexs)) {
						indexs = [indexs];
					} else {
						indexs = indexs.split(",");
					}
				}

				for (var i in nodes) {
					var trIndex = $.inArray($(nodes[i]).data("rowdata"), datas);
					if(trIndex !== -1) {
						datas.splice(trIndex, 1);
						$(nodes[i]).remove();
					}
				}
				this.setBodyHight();
			}
		},
		setUrl: function(url) {
			this.store.setUrl(url);
		},
		/**
		 * 获取表格功能按钮列表
		 * @return {object} 返回按钮对象列表[{node:...,parent:...,handler:....},{}]
		 */
		buttons: function() {
			var temp = [],
				grid = this,
				buttons = $(".btn_tool", this.nodes.tools);
			$.each(buttons, function(i, item) {
				var obj = {
					node: $(item),
					parent: $(item).parent(),
					handler: grid.opts.buttons[i].onpress
				}
				temp.push(obj);
			});
			return temp;
		},
		addData: function() {

		},
		timeStart: function() {

		}
	});

	var Store = function Store(options) {
		if (!this.init) return new Store(options);
		this.opts = tn.util.merge(options || {}, Store.defaults);
	};

	Store.defaults = {
		model: "server",
		url: "",
		param: {}
	};

	tn.util.merge(Store.prototype, {
		init: function() {
			return this;
		},
		setUrl: function(url) {
			this.opts.url = url;
			return this;
		},
		setParam: function(param) {
			if (this.param) {
				this.param = {};
			};
			this.param = param;
			return this;
		},
		getData: function(grid, data, flag, currentPage) {
			var url, opts = this.opts;
			if (currentPage) {
				grid.opts.param.start = grid.opts.param.limit * (parseInt(currentPage) - 1);
			}

			this.param.start = grid.opts.param.start;
			this.param.limit = grid.opts.param.limit;
			this.param.sortname = grid.opts.param.sortname;
			this.param.sortorder = grid.opts.param.sortorder;
			try {
				// url = new tn.URI(opts.url);
				url = opts.url;
			} catch (e) {
				throw new Error("URL地址错误，请输入正确地址");
			}
			// url = url.getHref();
			if (opts.model === "server" && url && !data) {
				TNAjax.request({
					url: url,
					type: grid.opts.type || "GET",
					data: this.param,
					listener: {
						success: function(json) {
							if (json.success) {
								if (!json.data) {
									json.data = {
										count: 0,
										rows: []
									}
								};
								//调用数据重新组装函数
								if(grid.opts.dataHandler && tn.type.isFunction(grid.opts.dataHandler)){
									json = grid.opts.dataHandler.call(grid, json);
								}
								grid._setData.call(grid, json, flag);
							}
						},
						beforerequest: function() {
							grid.showPageInfo();
						},
						requestcomplete: function(json) {
							//请求完全
							if(grid.opts.requestcomplete && tn.type.isFunction(grid.opts.requestcomplete)){
                   				var json = tn.json.encode(tn.json.encode(json));
								if(!json.success){
									$('.pag_pageInfo', grid.nodes.footer).html('<span>查询出错</span>');
								}
								grid.opts.requestcomplete.call(grid, json);
							}
						},
						error: function(json){
							var errorText = tn.tmpl(grid.opts.errorMsg, {
								errorCode: json[0].statusText,
							});
							$('.pag_pageInfo', grid.nodes.footer).html(errorText);
						}
					}
				});
			} else {
				if (data && tn.type.isObject(data)) {
					var temp = {
						success: true,
						data: data
					}
					grid._setData.call(grid, temp, flag);
				};
			}
		}
	});
	window.TNGP = TNQuoteGridPanel;
})(window, document);

$.fn.noSelect = function(p) {
	if (p == null) {
		prevent = true;
	} else {
		prevent = p;
	}
	if (prevent) {
		return this.each(function() {
			if ($.browser.msie || $.browser.safari) {
				$(this).bind('selectstart', function() {
					return false;
				});
			} else if ($.browser.mozilla) {
				$(this).css('MozUserSelect', 'none');
				$(document.body).trigger('focus');
			} else if ($.browser.opera) {
				$(this).bind('mousedown', function() {
					return false;
				});
			} else {
				$(this).attr('unselectable', 'on');
			}
		});
	} else {
		return this.each(function() {
			if ($.browser.msie || $.browser.safari) $(this).unbind('selectstart');
			else if ($.browser.mozilla) $(this).css('MozUserSelect', 'inherit');
			else if ($.browser.opera) $(this).unbind('mousedown');
			else $(this).removeAttr('unselectable', 'on');
		});
	}
};
