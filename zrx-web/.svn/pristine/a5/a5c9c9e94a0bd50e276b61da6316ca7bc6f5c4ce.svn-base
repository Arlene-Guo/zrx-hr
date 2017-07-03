/**
 * 功能说明：瀑布流
 */

(function(window, document, undefined) {
	var defaults = {
		element: null,
		scrollElement: null,
		param: null,
		first: "",
		end: "",
		url: "",
		packageParam: $.noop,
		tableConfig: null,
		addType: "int", //递增类型，目前仅支持整型和日期
		type: "default", //表格瀑布流或其他形式
		comCacheData: $.noop,
		show: function(cacheData) {
			var grid = this;
			if(grid.cacheData.rows) {
				grid.table.setData({
					count: grid.cacheData.rows.length,
					rows: grid.cacheData.rows
				}, function() {
					grid.first = false;
				});
			}
		}
	};
	var SpinnerOpts = {
		lines: 11,
		// The number of lines to draw
		length: 3,
		// The length of each line
		width: 4,
		// The line thickness
		radius: 11,
		// The radius of the inner circle
		corners: 1,
		// Corner roundness (0..1)
		rotate: 0,
		// The rotation offset
		color: '#000',
		// #rgb or #rrggbb
		speed: 1,
		// Rounds per second
		trail: 60,
		// Afterglow percentage
		shadow: false,
		// Whether to render a shadow
		hwaccel: false,
		// Whether to use hardware acceleration
		className: 'spinner',
		// The CSS class to assign to the spinner
		zIndex: 2e9,
		// The z-index (defaults to 2000000000)
		top: 'auto',
		// Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var TNPinterest = function TNPinterest(o) {
		var grid = this;

		// 重置参数
		if (o) {
			this.opts = tn.util.merge(o, defaults);
		}
		// 判断组装数据的方法
		// this.init();
	}

	// 增加原型方法，减少内存消耗
	tn.util.merge(TNPinterest.prototype, {
		// 初始化
		init: function() {
			var grid = this;
			// 渲染表格
			if(grid.opts.type === "default") {
				try {
					// 表格多次实例化
					if(!grid.opts.element.data("grid")) {
						grid.opts.element.data("grid", grid);
						grid.reset.call(grid);
					} else {
						// 合并当前参数和之前的对象参数
						var a = tn.util.merge(grid, grid.opts.element.data("grid"));
						grid = a;
					}
				} catch (e) {
					throw new Error("tableConfig,element为必填参数");
				}
			}
			// 重置数据			
			grid.render.call(grid);

			return grid;
		},

		// 渲染表格
		render: function() {
			var grid = this,
				opts = this.opts;

			// 如果是表格
			if(opts.type === "default") {
				// 渲染表格
				grid.table = new TNGP(this.opts.tableConfig).tngp();
				// 设置表格高度
				if (!opts.scrollElement && opts.height) {
					grid.table.nodes.body.closest(".tngpBody").css("max-height", opts.height);
				}
				// 绑定事件对象
				this.opts.scrollElement = this.opts.scrollElement ? this.opts.scrollElement : grid.table.nodes.body.closest(".tngpBodyContainer");
				// 调整表格的布局
				var tableHeader = grid.table.nodes.header.closest(".tngpHeader");
				grid.table.nodes.header.find("th").css("border-right", "1px solid #E2E2E2");
				opts.element.before(tableHeader.clone());
				// 获取头节点
				opts.tableHeader = opts.element.prev();
				// 增加数据提示节点
				// opts.tableHeader.append("<div")
				// 清空头信息
				tableHeader.remove();
				// 数据加载提示
				if(grid.table.nodes.footer) {
					grid.table.nodes.footer.hide();
				}
				// 添加边框
				// 表格宽度改变
				// 监听列表的宽度是否发生变化
	            setInterval(function() {
	                if($("tr:first td", opts.element).length) {
	                    var tds = $("tr:first td", opts.element);
	                    $.each(tds, function(i, item) {
	                        var col = $("div:first", $(item));
	                        if($("[col="+col.attr("col")+"]", opts.tableHeader).width() != col.width()) {
	                            $("[col="+col.attr("col")+"]", opts.tableHeader).css("width", col.width());
	                        }
	                    });
	                }
	            }, 0);
				// 重写方法
				grid.table.renderBody = grid.overwriteTNGP;
			}
			// 绑定滚动鼠标瀑布流事件
			if (opts.scrollElement) {
				grid.pool();
			}
		},

		// 重置数据
		reset: function() {
			var grid = this,
				opts = this.opts;

			// 缓存数据置空
			grid.cacheData = null;
			// 缓存结束点
			grid.endData = null;
			// 表格数据置空
			if (grid.table) {
				// 重写renderBody引起的body不自动清空
				grid.table.nodes.body.empty();
				// 塞入空数据
				grid.table.setData({
					count: 0,
					rows: []
				});
			}
			// 判断是否加载完成
			grid.isLoading = false;
			// 是否需要加载
			grid.isSrcoll = false;
			// 第一次请求
			grid.first = true;
			grid.isShow=false;

			return grid;
		},

		// 绑定滚动鼠标瀑布流事件
		pool: function() {
			var grid = this,
				opts = this.opts;

			// 绑定事件
			opts.scrollElement.scroll(function(e) {
				var scrollHeight = opts.scrollElement[0].scrollHeight;
				var scrollTop = opts.scrollElement[0].scrollTop;
				var viewHeight = opts.scrollElement.height();
				if (scrollHeight - (scrollTop + viewHeight) <= 200) {
					// 需要加载
					grid.isSrcoll = true;
					// 如果无在请求中则继续请求数据
					if (!grid.isLoading) {
						grid.getQuery(grid.fn);
					}
				}
			});
		},

		// 重写表格renderBody
		overwriteTNGP: function() {
			var opts = this.opts,
				grid = this;
			//判断渲染列表头的条数
			var count = 0;
			//重置tpl.body
			var tdWidth = [];
			$("th", this.nodes.header).each(function(i, n) {
				tdWidth.push($($(n).children()[0]).css("width"));
			});
			//拖拽线高度置为0
			this.createDragNode(null, 0);
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
			this.createDragNode(null, this.nodes.tools.height() + this.nodes.body.height());
		},

		// 瀑布流处理逻辑
		getQuery: function(fn) {
			var grid = this,
				opts = this.opts;
			// 加载样式
			var spinner;
			if(grid.opts.comCacheData) {
				grid.opts.comCacheData();
			}
			if(grid.cacheData) {
				if(grid.cacheData.count>0){
                    grid.isShow=true;
				}
				opts.show.call(grid, grid.cacheData);
			}
			grid.cacheData = null;
			if(fn) {
				grid.fn = fn;
				if(!grid.first) {
					fn.call(grid);
				}
			} else {
				grid.fn = null;
			}
			if(!grid.calChangeParam()) {
				return;
			}
			// 组装传给后台的数据
			try {
				opts.packageParam.call(grid, opts.param, opts.first, grid.endData);
			} catch (e) {
				throw new Error("packageParam不是一个方法");
			}
			Ajax.request({
				url: opts.url,
				data: opts.param,
				type: "GET",
				listener: {
					beforerequest: function() {
						spinner = new Spinner(SpinnerOpts).spin($(grid.opts.element)[0]);
						// 清除暂无数据标识
						if (grid.table && grid.table.nodes.footer) {	
							grid.table.nodes.footer.html("暂无数据").hide();		
						}
					},
					success: function(json) {
						spinner.stop();
						// 加载完成
						grid.isLoading = false;

						// 数据处理
						// var firstFlag = false;
						// if (grid.table && grid.table.nodes.body.find("tr").length == 0) {
						// 	firstFlag = true;
						// }
						// 信息缓存
						grid.cacheData = null;
						if (json.data) {
							grid.cacheData = json.data;
							// 需要判断高度
							if (grid.first || (grid.table && opts.height && grid.table.nodes.body.height() < opts.height) || grid.isSrcoll || (opts.scrollElement[0].scrollHeight <= opts.scrollElement.height())) {
								// 滚动加载置为false
								grid.isSrcoll = false;
								grid.getQuery(fn);
							}
						} else {
							grid.getQuery(fn);
						}
					}
				}
			});
		},

		// 变化参数计算
		calChangeParam: function() {
			var grid = this,
				opts = this.opts;

			var tempEnd = grid.endData,
				startData, tempEndDate;

			// 是否需要请求
			var flag = true;
			if (opts.addType === "date") {
				if (tempEnd && new Date(opts.end).getTime() == new Date(tempEnd).getTime()) {
					// 如果表格无数据显示无数据提示
					if (grid.table && grid.table.getData().length === 0 && grid.table.nodes.footer&&!grid.isShow) {	
						grid.table.nodes.footer.html("暂无数据").show();		
					}
					flag = false;
				}
				// 正在请求
				grid.isLoading = true;

				// 组装数据
				startData = opts.first = tempEnd ? tn.datePack.addDate(tempEnd, 1) : opts.first;
				tempEndDate = grid.endData = tn.datePack.addDate(startData, 2);
				if (new Date(tempEndDate).getTime() >= new Date(opts.end).getTime()) {
					grid.endData = opts.end;
				}
			} else if(opts.addType === "int") {
				if (tempEnd && opts.end == tempEnd) {
					// 如果表格无数据显示无数据提示
					if (grid.table && grid.table.getData().length === 0 && grid.table.nodes.footer) {	
						grid.table.nodes.footer.html("暂无数据").show();		
					}
					flag = false;
				}
				// 正在请求
				grid.isLoading = true;

				// 组装数据
				startData = opts.first = tempEnd ? tempEnd + 1 : opts.first;
				tempEndDate = grid.endData = startData + 2;
				if (tempEndDate >= opts.end) {
					grid.endData = opts.end;
				}
			}

			return flag;
		},

		// 配置参数
		setParam: function(object) {
			this.opts = tn.util.merge(object, this.opts);

			return this;
		}
	});
	window.TNPinterest = TNPinterest;
})(window, document);