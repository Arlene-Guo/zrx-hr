

 window.GridPanel = function(node,config){
	this.node = node;
	this.config = $.extend({},config);
	this.selectIndex = -1;
	this.checkbox = config.checkbox || false;
	this.radio = config.radio || false;
	this.chkfield = config.field;
	this.nofield = config.nofield;
	this.gridId = this.node.attr("id");
	this.checkboxAuto = config.checkboxAuto || false;
	this.init();
 }
 GridPanel.prototype = {
	 onselectCallback: null,
	 init: function (){
		if (this.checkbox || this.radio){
			this.addCheckbox(this.node);
		}
		this.node.flexigrid(this.config);
	 },
	 addCheckbox: function (node){
		var self = this;
		var checkboxCol = [
			{display: function(th){
				var selectAll = $("<input type='checkbox' style='width:20px;'/>");
				$(th).click(function(e){
					if(e.target.tagName == "INPUT"){
						$("input[type='checkbox']",node).attr("checked", e.target.checked);
					}
				});
				if (self.checkbox){
					$(th).html("").append(selectAll);
				}
			}, name : "id", width : 20, align: 'center',handler:function(v,data,n,i,row){
				var type = self.checkbox ? "checkbox" : "radio";
				var checkbox = $("<input ids='"+(data[self.chkfield] || data.id)+"' type='"+type+"' style='width:20px;'/>");
				if (self.radio){
					checkbox.attr("name",self.gridId+"_radio");
				}

				checkbox.bind("click",self.bindToObj(function(e) { e.stopPropagation();self.onselect(v,data,n,i,row); }));

				if(self.checkboxAuto){
					$(row).click(function(e){
						if(checkbox.attr('checked') == 'checked'){
							checkbox.removeAttr('checked');
						}else if(typeof(checkbox.attr('checked')) == 'undefined'){
							checkbox.attr('checked','checked');
						}
					});
				}

				if (data[self.nofield]){
					n.html("");
				}else{
					n.html("").append(checkbox);
				}
			}}
		];
		this.config.colModel = $.merge(checkboxCol,this.config.colModel);
	 },
	getNode : function (){
		return this.node;
	},
	getToolsNode : function (){
		return this.node.grids().grids[0].tDiv;
	},
	/**
	 * 功能说明：获取当前表格配置数据，包含表格数据
	 * 参数:
	 */
	 getStore: function (){
		return this.node.grids().config[0];
	 },
	/**
	 * 功能说明：设置列隐藏显示
	 * 参数:	列绑定字段名称，隐藏显示开关，默认隐藏
	 */
	colhide : function(field,flag){
		var self = this;
		if ($.isArray(field)){
			$.each(field,function(i,n){
				self.node.flexHideCol(n,flag);
			});
		}else{
			this.node.flexHideCol(field,flag);
		}
		return this;
	},
	/**
	* 功能说明：获取列表按钮数组
	* 返回值:　[{node:node,handler:handler}]，node按钮节点，handler触发事件
	*/
	buttons : function(id){
		var self = this;
		var buttons = this.node.grids().config[0].buttons;
		var ar = [];
		if (buttons && buttons.length > 0){
			if (id && id != "undefined"){
				ar = $.grep(buttons,function(n,i){
					return n.id == id;
				});
			}else{
				$.each(buttons,function(i,n){
					var btn = $(".fbutton",self.node.grids().grids[0].tDiv);
					ar.push({
						id: n.id,
						node: $(btn.eq(i)),
						parent: $(self.node.grids().grids[0].tDiv),
						handler: buttons[i].onpress
					});
				});
			}
		}
		return ar;
	},
	/**
	* 功能说明：绑定列表数据，后续加载，此时不需要进行url加载数据，如果有url需要在配置中设置autoload为false
	* 参数:　列表数据，{data:{count:count,rows:[{},{}]}}
	*/
	setData : function(data, success){
		if (this.config.url){
			this.node.grids().config[0].autoload = false;
		}
		if (success){
			this.getStore().onSuccess = success;
		}
		this.node.flexAddData(data);
		return this;
	},
 	/**
 	 * 功能说明：绑定列表数据，后续加载一行或几行数据，此时不需要进行url加载数据，如果有url需要在配置中设置autoload为false
 	 * 参数:　列表数据，[{},{},.....]，添加后触发回调函数，调用对象
 	 */
 	addRowData: function(datas, callback, target) {
 		if (this.config.url) {
 			this.node.grids().config[0].autoload = false;
 		}
 		var historyData = this.getStore().jsonData;
 		if (!historyData) {
 			this.setData({data:{count:0,rows:[]}});
 		};
 		var temp = $.merge([], historyData.rows);
 		var count = historyData.count;
 		if (historyData && $.isArray(datas)) {
 			$.merge(temp, datas);
 			count += datas.length;
 		}
 		var data = {
 			count: count,
 			rows: temp
 		};
 		this.node.flexAddData(data);
 		if (callback) {
 			callback.call(target, datas);
 		}
 		return this;
 	},
	getData: function (){
		if (this.getStore().jsonData){
			return this.getStore().jsonData;
		}
	},
	/**
	 * 功能说明：清空表格数据
	 * 参数: 清空数据和界面内容，清空界面
	 */
	clear : function(flag){
		if (!flag){
			if (this.config.url){
				if (this.node.grids().config[0].jsonData){
					this.node.grids().config[0].jsonData.count = 0;
					this.node.grids().config[0].jsonData.rows.length = 0;
					this.node.empty();
				}
			}
			this.node.flexAddData({count:0,rows:[]});
		}else{
			this.node.empty();
		}
		return this;
	},
	/**
	 * 功能说明：刷新表格数据
	 * 参数: 请求数据，格式{"test1":1,"test2":2},数据响应成功后的回调函数
	 */
	reload : function (datas,success){
		var data = {};
		var start = 0;
		$.extend(data,datas || {});
		if (success){
			this.getStore().onSuccess = success;
		}
//		if(typeof(data.start) != 'undefined'){start = data.start;delete data.start;}
		this.node.flexOptions({params:[{"name":"param","value":JSON.encode(data)}],start:start}).flexReload();
		return this;
	},
	/**
	 * 功能说明：设置选中行，并且记录当前选中行数据
	 * 参数: 当前选中行节点
	 */
	selectRow : function (row){
		if (this.selectIndex != -1){
			var td = $("tr:eq("+this.selectIndex+") td",this.node.grids().grids[0].bDiv);
			td.each(function (i,n){
				if ($(n).css("display") != "none"){
					$(n).removeAttr("style");
				}
			})
		}
		$("td",row).css({
			backgroundColor: "#edf7fc"
		});
		this.selectIndex = row[0].rowIndex;
		if (this.node.grids().config[0].jsonData && this.node.grids().config[0].jsonData.rows.length > 0){
			this.selectData = this.node.grids().config[0].jsonData.rows[this.selectIndex];
		}
		return this;
	},
	getSelectRowsId: function (){
		var ids = [], indexs = [];
		var chekcboxs = $("input[type='checkbox'],input[type='radio']",this.getNode());
		$.each(chekcboxs,function(i,item){
			if (item.checked){
				ids.push($(item).attr("ids"));
				indexs.push($(item).parent().parent().parent()[0].rowIndex);
			}
		});
		return {
			ids: ids,
			indexs: indexs
		};
	},
	getRowsData: function (){
		var datas = [];
		var jsonData = this.getStore().jsonData;
		if (jsonData && jsonData.rows && jsonData.rows.length > 0){
			var indexs = this.getSelectRowsId().indexs;
			$.each(indexs,function (i,item){
				datas.push(jsonData.rows[item]);
			})
		}
		return datas;
	},
	getSelectData: function (){
		return this.selectData;
	},
	/**
	 * 功能说明：清除选中行样式以及行数据
	 */
	clearSelect : function (){
		if (this.selectIndex != -1){
			$("tr:eq("+this.selectIndex+") td",this.node.grids().grids[0].bDiv).css({
				backgroundColor: "transparent"
			});
			this.selectData = null;
			this.selectIndex = -1;
		}
		return this;
	},
	/**
	 * 功能说明：删除选中行(包括数据)
	 * 参数: 当前选中行节点
	 */
	deleteRowData : function (row){
		var jsonData = this.getStore().jsonData;
		if (jsonData.rows.length == 0){
			$(row).remove();
		}
		var selectIndex = row.rowIndex;
		if (jsonData && jsonData.rows.length > 0){
			jsonData.rows.splice(selectIndex,1);
			jsonData.count -= 1;
			$(row).remove();
		}
		return this;
	},
	deleteRowsData: function (){
		var jsonData = this.getStore().jsonData;
		if (jsonData.rows.length == 0){
			$(row).remove();
			return this;
		}
		var ids = this.getSelectRowsId().ids, self = this
		$.each(ids,function(i,n){
			var row = $("tr[id='row"+n+"']",self.node.grids().grids[0].bDiv);
			jsonData.rows = $.grep(jsonData.rows,function (m, j){
				return m.id != n;
			});
			jsonData.count = jsonData.rows.length;
			row.remove();
		});
		return this;
	},
	/**
	 * 功能说明：对比两个表格之间某行数据
	 * 参数: 当前选中行数据对象，目标数据集列表对象，对比字段
	 * 返回值: true：数据存在，false：数据不存在
	 */
	diffRowData : function (data,targetGrid,field){
		if (!(field in data)){
			return "parameters:field is undefined";
		}
		var targetDatas = targetGrid.getStore().jsonData && targetGrid.getStore().jsonData.rows;
		if (!targetDatas){
			return false;
		}
		if (targetDatas.length > 0){
			var flag = false;
			$.each(targetDatas,function(i,n){
				if (data[field] == n[field]){
					flag = true;
					return false;
				}
			});
			return flag;
		}
	},
	replaceData : function (data,targetGrid,field,field2){
		if (!(field in data)){
			return "parameters:field is undefined";
		}
		var targetDatas = targetGrid.getStore().jsonData && targetGrid.getStore().jsonData.rows;
		if (!targetDatas){
			return false;
		}
		if (targetDatas.length > 0){
			var flag = false;
			$.each(targetDatas,function(i,n){
				if (fieldTwo(n)){
					if (data[field] == n[field]){
						$$.apply(n,data);
						for (var j in n){
							$("tbody tr:eq("+i+") td input[name='"+j+"'],tbody tr:eq("+i+") td select[name='"+j+"']",targetGrid.getNode()).val(n[j]);
						}
						flag = true;
					}
				}
			});
			return flag;
		}
		function fieldTwo(n){
			if (field2){
				return data[field2] == n[field2];
			}else{
				return true;
			}
		}
	},
	/**
	 * 功能说明：获取表格操作列
	 * 参数: 绑定操作列字段
	 * 返回: 数组，每行的操作节点，如[a,a],[b,b]
	 */
	getOperate : function (field){
		if (!field) field = "edit";
		var ncol = $("th[field='"+field+"']",this.node.grids().grids[0].hDiv)[0];
		if (!ncol){
			ncol = $("th",this.node.grids().grids[0].hDiv).last()[0];
		}
		var n = $('thead th',this.node.grids().grids[0].hDiv).index(ncol);
		var ar = [];
		$('tbody tr',this.node).each(function (){
			ar.push($('td:eq('+n+') a',this));
		});
		return ar;
	},
	/**
	 * 功能说明：获取某字段绑定的数据列
	 * 参数: 值，绑定字段
	 */
	getColNodes: function (field){
		var ncol = $("th[field='"+field+"']",this.node.grids().grids[0].hDiv)[0];
		var n = $('thead th',this.node.grids().grids[0].hDiv).index(ncol);
		var td = [];
		$('tbody tr',this.node).each(function (i){
			td.push($('td:eq('+n+')',this));
		});
		return td;
	},
	setColTitle: function (field,title){
		var ncol = $("th[field='"+field+"']",this.node.grids().grids[0].hDiv)[0];
		var n = $('thead th',this.node.grids().grids[0].hDiv).index(ncol);
		$('thead th div',this.node.grids().grids[0].hDiv).eq(n).html(title);
	},
	/**
	 * 功能说明：获取数据行
	 * 参数: 值，行索引，如果为空则返回所以行,索引从0开始
	 */
	getRows: function (index){
		if (index){
			return $('tbody tr:eq('+index+')',this.node);
		}else{
			return $('tbody tr',this.node);
		}
	},
	/**
	 * 功能说明：按绑定字段设置其中input的值
	 * 参数: 值，绑定字段
	 */
	setColValue : function (value,field,field2){
		var ncol = $("th[field='"+field+"']",this.node.grids().grids[0].hDiv)[0];
		var n = $('thead th',this.node.grids().grids[0].hDiv).index(ncol);

		var ndata = this.node.grids().config[0].jsonData && this.node.grids().config[0].jsonData.rows;

		if ($('tbody tr input',this.node).length > 0){
			$('tbody tr',this.node).each(function (){
				$('td:eq('+n+') input',this).val(value);
			});
		}
		if ($('tbody tr select',this.node).length > 0){
			$('tbody tr',this.node).each(function (){
				$('td:eq('+n+') select',this).html(value);
			});
		}

		$.each(ndata,function(i,n){
			if (field2){
				n[field] = field2;
			}else{
				n[field] = value;
			}
		});
		return this;
	},
	setParams : function(params){
		this.params = params;
	},
	getParams : function(){
		return this.params;
	},
	onselect: function (v,data,n,i,row){
		this.notify("onselect");
	},
	/**
	* 功能说明：获取列表url
	*/
	getUrl: function (){
		return this.node.grids().config[0].url;
	},
	/**
	* 功能说明：设置列表url
	* 参数: url地址
	*/
	setUrl: function (url){
		this.node.grids().config[0].url = url;
		return this;
	},
	/**
	* 功能说明：设置列表分页个数
	* 参数: 个数
	*/
	setLimit: function (limit){
		this.node.grids().config[0].limit = limit;
		this.node.grids().config[0].rp = limit;
		return this;
	},
	/**
	* 功能说明：设置列表标题
	* 参数: url地址
	*/
	setTitle: function (title){
		this.node.grids().config[0].title = title;
		$(".ftitle",this.node.grids().grids[0].mDiv).html(title);
		return this;
	},
	getWH: function (){
		var gDiv = this.node.grids().grids[0].gDiv;
		return {
			width: $(gDiv).width(),
			height: $(gDiv).height()
		}
	},
	/**
	* 功能说明：事件触发
	* 参数: 事件名称
	*/
	notify: function (evt){
		if (!$.isFunction(this[evt + "Callback"]))
			return;
		this[evt + "Callback"].call(this);
	},
	/**
	* 功能说明：事件绑定
	* 参数: function
	*/
	bindToObj: function(fn) {
		var self = this;
		return function() { return fn.apply(self, arguments) };
	}
 }