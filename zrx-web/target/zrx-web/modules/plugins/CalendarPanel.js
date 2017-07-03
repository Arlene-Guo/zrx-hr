

function CalendarPanel(options){
	$.extend(this, {
		//第一列是否隐藏默认不隐藏
		firstColHide: true
	}, options);

	this.calendar = new Calendar(this);
}

$.extend(CalendarPanel.prototype,{
	/**
	 * 获取当前选择的日期范围
	 * @return object
	 * @editor
	 * @editor time
	 */
	getDateRange:function (){
		return this.calendar._dateRange;
	},
	/**
	 * 设置表格列头信息
	 * @param object 数据请求参数，其中必须包括开始、结束日期{beginDate:"",endDate:""}
	 * @return null
	 * @editor
	 * @editor time
	 */
	setHeader: function (data){
		this.calendar._setHeader(data);
	},
	/**
	 * 设置数据
	 * @param object 数据请求参数，其中必须包括开始、结束日期{beginDate:"",endDate:""}
	 * @return null
	 * @editor
	 * @editor time
	 */
	setData: function (data){
		data = $.extend(true,this.data,data);
		this._getServerData(data);
	},
	/**
	 * 设置数据列表内容，外部接口
	 * @param object 服务器返回的数据
	 * @return null
	 * @editor
	 * @editor time
	 */
	setBody: $.noop,
	/**
	 * 获取服务器数据
	 * @param object 其中必须包括开始、结束日期{beginDate:"",endDate:""}
	 * @return null
	 * @editor
	 * @editor time
	 */
	_getServerData: function (data){
		var self = this;
		Ajax.request({
			url: this.url,
			type: "GET",
			data: data,
			listener:{
				beforerequest:function (){
					$("tbody",self.calendar.renderTo).append("<tr><td colspan='8'><div><strong>正在读取数据......</strong></div></td></tr>");
					$(".c-prev,.c-next",self.calendar.renderTo).attr("disabled","disabled");
				},
				success: function (data){
					if (data.success){
						$("tbody tr",self.calendar.renderTo).remove();
						$(".c-prev,.c-next",self.calendar.renderTo).removeAttr("disabled");
						self.setBody.call(self,data.data);
					}
				},
				requestcomplete: function (data){
					if (data.success){
						if (!self.enforceSetBody){
							if (data.data === null || (data.data.rows && data.data.rows.length == 0)){
								$("tbody",self.calendar.renderTo).append("<tr><td colspan='8'><div><strong>暂无数据</strong></div></td></tr>");
							}
						}
					}
				}
			}
		});
	},
	/**
	 * 行数据模板
	 * @return null
	 * @editor
	 * @editor time
	 */
	rowTemplet: function (){
		if (!this.firstColHide){
			return "<tr><td><div>{_0}</div></td><td><div>{_1}</div></td><td><div>{_2}</div></td><td><div>{_3}</div></td><td><div>{_4}</div></td><td><div>{_5}</div></td><td><div>{_6}</div></td></tr>";
		}
		return "<tr><td><div id='{id_10000}' style='width:150px;overflow:hidden;'>{_10000}</div></td><td><div>{_0}</div></td><td><div>{_1}</div></td><td><div>{_2}</div></td><td><div>{_3}</div></td><td><div>{_4}</div></td><td><div>{_5}</div></td><td><div>{_6}</div></td></tr>";
	}
});

/**
 * 日期默认数据
 * @return null
 * @editor
 * @editor time
 */
var Calendar_defaults = {
	firstColName: "",
	limit: 7,
	handerClass: "table table-bordered",
	renderTo: $(document.body),
	enforceSetBody: false			//强制执行setBody方法
}

function Calendar(options){
	$.extend(this, Calendar_defaults, DatePack.defaultConfig, options, {
		_parentThis: options
	});
	this._renderHeader(this.beginDate,this.limit);
}

$.extend(Calendar.prototype,{
	/**
	 * 设置日期选择范围
	 * @param 起始日期theDate
	 * @param 日期步长limit,默认值7，不可修改
	 * @return object {起始日期Date，结束日期Date，起始天数int，结束天数int}
	 * @editor
	 * @editor time
	 */
	_getDayRange: function (theDate,limit){
		var startDate = null;
		startDate = new Date();
		startDate.setDate(1);
		startDate.setHours(0,0,0,0);
		var startTime = startDate.getTime();

		theDate = typeof theDate == "undefined" ? startDate : theDate;

		var firstDate = new Date(theDate);
		var firstTime = firstDate.getTime(),
		      firstDay = firstDate.getDate();

		var lastDate = new Date(firstDate);
		lastDate.setMonth(lastDate.getMonth());
		lastDate.setDate(limit ? firstDay+limit : 0);
		var lastTime = lastDate.getTime(),
		      lastDay = lastDate.getDate();

		return {
			firstDate: firstDate,
			lastDate: lastDate,
			firstDay: firstDay,
			lastDay: lastDay
		}
	},
	/**
	 * 设置控件列头
	 * @param object 数据请求参数，其中必须包括开始、结束日期{beginDate:"",endDate:""}
	 * @return null
	 * @editor
	 * @editor time
	 */
	_setHeader: function (data){
		this._renderHeader(data.beginDate,data.limit);
		this.setData.call(this._parentThis,data);
	},
	/**
	 * 控件列头渲染
	 * @param object 数据请求参数，其中必须包括开始、结束日期{beginDate:"",endDate:""}
	 * @param int 日期步长
	 * @return null
	 * @editor
	 * @editor time
	 */
	_renderHeader: function (date,limit){
		if (!limit){
			limit = this.limit;
		}
		var dateRange = this._dateRange = this._getDayRange(date,limit);
		var node = this._henderTemplet();
		$("#col_10000",node).append(this.firstColName);

		for (var x = 0; x < limit; x++ ){
			var longTime = DatePack.getTime(dateRange.firstDate);
			var day = DatePack.getDay(longTime+ (this.days * x));
			$("#col_"+x,node).append(DatePack.toString(new Date(longTime+ (this.days * x)))+"&#160;"+this.weekNames[day]);
			$("#col_"+x,node).parent().attr("date",DatePack.toString(new Date(longTime+ (this.days * x))));
		}
		if ($("table",this.renderTo).size() == 0){
			this.renderTo.append(node);
		}else{
			$("table",this.renderTo).replaceWith($("table",node));
		}
		this._bindEvent();
	},
	/**
	 * 事件绑定，前后天数按钮
	 * @return null
	 * @editor
	 * @editor time
	 */
	_bindEvent: function (){
		var self = this;
		$(".c-prev",this.renderTo).unbind("click").click(function (e){
			self._prevWeek.call(self,e);
		});
		$(".c-next",this.renderTo).unbind("click").click(function (e){
			self._nextWeek.call(self,e);
		});
	},
	/**
	 * 前X天事件按钮处理
	 * @param event
	 * @return null
	 * @editor
	 * @editor time
	 */
	_prevWeek: function (e){
		this.changWeek("left");
	},
	/**
	 * 后X天事件按钮处理
	 * @param event
	 * @return null
	 * @editor
	 * @editor time
	 */
	_nextWeek: function (e){
		this.changWeek("right");
	},
	changWeek: function (position){
		var longTime = DatePack.getTime(this._dateRange.firstDate);
		if (position == "right"){
			longTime = longTime + (this.days * this.limit);
		}else{
			longTime = longTime - (this.days * this.limit);
		}
		var date = DatePack.toString(new Date(longTime));
		this._renderHeader(date,this.limit);
		this.setData.call(this._parentThis,{
			beginDate: date,
			endDate: DatePack.addDate(date,this.limit-1)
		});
	},
	/**
	 * 列头模板
	 * @return null
	 * @editor
	 * @editor time
	 */
	_henderTemplet: function (){
		if (!this.firstColHide){
			return $("<div id='cPanel'><div style='margin-left:5px;margin-bottom:10px;'><button class='btn c-prev'><i class='icon-chevron-left'></i>前"+this.limit+"天</button>&#160;&#160;<button class='btn c-next'>后"+this.limit+"天<i class='icon-chevron-right'></i></button></div><table class='"+this.handerClass+"'><thead><th><div id='col_0'></div></th><th><div id='col_1'></div></th><th><div id='col_2'></div></th><th><div id='col_3'></div></th><th><div id='col_4'></div></th><th><div id='col_5'></div></th><th><div id='col_6'></div></th></thead><tbody></tbody></table></div>");
		}
		return $("<div id='cPanel'><div style='margin-left:5px;margin-bottom:10px;'><button class='btn c-prev'><i class='icon-chevron-left'></i>前"+this.limit+"天</button>&#160;&#160;<button class='btn c-next'>后"+this.limit+"天<i class='icon-chevron-right'></i></button></div><table class='"+this.handerClass+"'><thead><th><div id='col_10000' style='width:150px;'></div></th><th><div id='col_0'></div></th><th><div id='col_1'></div></th><th><div id='col_2'></div></th><th><div id='col_3'></div></th><th><div id='col_4'></div></th><th><div id='col_5'></div></th><th><div id='col_6'></div></th></thead><tbody></tbody></table></div>");
	}
});