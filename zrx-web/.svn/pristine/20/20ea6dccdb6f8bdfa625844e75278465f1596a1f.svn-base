

 function FastSelectCalendarPanel(options){
	$.extend(this, options);

	this.init();
 }

 $.extend(FastSelectCalendarPanel.prototype, {
	 /**
	 * 功能说明 初始化
	 * @id FastSelectCalendarPanel.init
	 * @param [null]
	 * @return null
	 * @editor zh
	 * @editor 22143447 2012年06月22日 14:34:47 zh
	 */
	init: function(){
		this.kdemo = null;					//日历对象Kalendae
		this.myDateStart = undefined;		//团期开始时间
		this.myDateEnd = undefined;			//团期结束时间
		this.holidaysDates = [
			['2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01'],//元旦
			['2012-01-23', '2013-02-10', '2014-01-31', '2015-02-19', '2016-02-08'],//春节
			['2012-02-06', '2013-02-24', '2014-02-14', '2015-03-05', '2016-02-22'],//元宵
			['2012-04-04', '2013-04-04', '2014-04-05', '2015-04-05', '2016-04-04'],//清明
			['2012-05-01', '2013-05-01', '2014-05-01', '2015-05-01', '2016-05-01'],//五一
			['2012-06-23', '2013-06-12', '2014-06-02', '2015-06-20', '2016-06-09'],//端午
			['2012-09-30', '2013-09-19', '2014-10-08', '2015-09-27', '2016-09-15'],//中秋
			['2012-10-01', '2013-10-01', '2014-10-01', '2015-10-01', '2016-10-01'],//国庆
			['2012-12-25', '2013-12-25', '2014-12-25', '2015-12-25', '2016-12-25']//圣诞
		];
		this.holidays = [];					//用来存放选中的节假日
		this.generateDOM();					//生成面板dom
	},

	/**
	* 功能说明 生成团期快速选择面板
	* @id FastSelectCalendarPanel.generateDOM
	* @param [null]
	* @return null
	* @editor zh
	* @editor 22143640 2012年06月22日 14:36:40 zh
	*/
	generateDOM: function(){
		var self = this;
		//如果已经生成过，就不再生成，直接显示出来即可
		if($('#fsDatesPanel').length > 0 && $('#maskIframe').length > 0){
			var pos = this.target.offset();
			$('#fsDatesPanel').css({'top':pos.top,'left':pos.left});
			$('#fsDatesPanel').show();
			$('#maskIframe').show();
		}else{
			//具体的DOM定义和生成
			var iframe = $('<iframe id="maskIframe" frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;filter:alpha(opacity=0);z-index:999;"></iframe>');
			var div = $('<div id="fsDatesPanel" style="position:fixed;top:0;left:0;width:270px;height:330px;background:#fff;border:1px solid #ddd; border-radius:3px;padding:8px;z-index:99999;border-color:rgba(82, 168, 236, 0.8);box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);overflow:hidden;"><div id="content" style="width:620px;position:relative;"><div style="float:left;"><div style="float:left;"><a id="clearBtn" href="javascript:void(0);"><i class="icon-trash"></i>清除选择</a></div><div id="toggleBtn" style="float:right;"><a id="fsBtn" href="javascript:void(0);">快速选择<i class="icon-chevron-right"></i></a></div><div id="calenderDemo"></div><div id="footer" style="text-align:right;margin-top:5px;"><a id="fsToday" style="margin-right:10px;" class="btn icon-pushpin">今天</a><a id="fsOk" style="margin-right:10px;" class="btn icon-ok">确定</a></div></div><div id="fs" style="float:left;margin-left:20px;"><div style="margin-bottom:4px;margin-top:22px;">选定开始与结束时间：</div><div style="margin-bottom:10px;"><input id="dateRange" type="text" style="width:246px;" /></div><div id="mode"><div style="margin-bottom:4px;">从上面的时间范围中筛选出：</div><div><select id="modeSelect" style="width:120px;margin-top:5px;"><option value="0">全部</option><option value="1">星期</option><option value="2">单双日</option><option value="3">节假日</option></select></div><div id="optionArea" style="margin:10px;color:#555555;height:136px;"></div><div style="text-align:right;"><a id="innerOk" style="margin-right:10px;" class="btn icon-ok">确定</a><a id="innerCancel" class="btn icon-remove">取消</a></div></div></div></div></div>');
			//this.target.after(div);
			var pos = this.target.offset();
			div.css({'top':pos.top,'left':pos.left});
			this.target.parents('body').append(iframe).append(div);
			//禁用快速选择
			if(self.fsFun !== undefined && !self.fsFun){
				$("#fsBtn", div).remove();
			}

			//Kalendae控件随意给document绑定mousedown事件，引起了bug，这个hack解决了这个异常问题。
			div.mousedown(function(e){
				e.stopPropagation();
			});


			if(typeof(this.direction) != 'undefined'){
				//快速选择中的“选定开始与结束时间”
				var kr = new window.Kalendae.Input('dateRange', {
					mode:"range",
					rangeDelimiter:' - ',
					months:2,
					side: this.side || 'bottom',
					noOffsetLeft: this.noOffsetLeft,
					offsetTop: this.offsetTop || 0,
					direction:this.direction
				});
				//用于手动离散选择的日历
				$('#calenderDemo').empty();
				kdemo = new window.Kalendae('calenderDemo', {
							mode: "multiple",
							direction:this.direction
						});
			}else{
				//快速选择中的“选定开始与结束时间”
				var kr = new window.Kalendae.Input('dateRange', {
					mode:"range",
					rangeDelimiter:' - ',
					months:2
				});
				//用于手动离散选择的日历
				$('#calenderDemo').empty();
				kdemo = new window.Kalendae('calenderDemo', {
							mode: "multiple"
						});
			}

			}



			//用来做团期输入框和日历面板的显示同步
			if(self.dateInput.val() != ""){
				var editDates = self.dateInput.val().split(',');
				kdemo.viewStartDate = window.Kalendae.moment(editDates[0],'YYYY-MM-DD');
				kdemo.setSelected(editDates, true);
			}else if(self.dateInput.val() == ""){
				kdemo.setSelected([''], true);
				if(typeof(this.selectArray) != 'undefined'){
					kdemo.viewStartDate = window.Kalendae.moment(this.selectArray[0],'YYYY-MM-DD');
					kdemo.setSelected(this.selectArray, true);
				}
			}

			$('#fsBtn',div).click(function(){
				$('#content').animate({
					left: -280
				},'normal');
				$('#dateRange').val("");
				self.myDateStart = undefined;
				self.myDateEnd = undefined;
				$('#modeSelect').val(0);
				$('#optionArea',div).empty();
				self.holidays = [];
			});

			$('#innerOk',div).click(function(){
				$('#content').animate({
						left: 0
				},'normal');
				self.bindEvent.setCalValueAction.call(self, null);
			});

			$('#innerCancel',div).click(function(){
				$('#content').animate({
						left: 0
				},'normal');
			});

			//核心事件：选择周末、单双日和节假日
			$('#modeSelect',div).change(function(){
				if($(this).val() == 0){
					$('#optionArea',div).empty();
				}else if($(this).val() == 1){
					$('#optionArea',div).empty().append('<label class="checkbox" style="display:block;color:#555555;"><input id="inverse" type="checkbox" name="inverse" />反选</label><label class="checkbox" style="display:block;color:#555555;"><input id="workday" type="checkbox" name="weekList" value="1" />周一</label><label class="checkbox" style="display:block;color:#555555;"><input id="weekday" type="checkbox" name="weekList" value="2" />周二</label><label class="checkbox" style="display:block;color:#555555;"><input id="weekday" type="checkbox" name="weekList" value="2" />周三</label><label class="checkbox" style="display:block;color:#555555;"><input id="weekday" type="checkbox" name="weekList" value="2" />周四</label><label class="checkbox" style="display:block;color:#555555;"><input id="weekday" type="checkbox" name="weekList" value="2" />周五</label><label class="checkbox" style="display:block;color:#555555;"><input id="weekday" type="checkbox" name="weekList" value="2" />周六</label><label class="checkbox" style="display:block;color:#555555;"><input id="weekday" type="checkbox" name="weekList" value="2" />周日</label>');
					$("input[name='inverse']").click(function(){
						$("input[name='weekList']").click();
					});
				}else if($(this).val() == 2){
					$('#optionArea',div).empty().append('<label class="radio" style="display:block;color:#555555;"><input id="oddday" type="radio" name="optionsRadios" value="1" checked />单日</label><label class="radio" style="display:block;color:#555555;"><input id="evenday" type="radio" name="optionsRadios" value="2" />双日</label>');
				}else if($(this).val() == 3){
					$('#optionArea',div).empty().append('<div><div style="float:left;width:100px;"><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="1" />元旦</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="2" />春节</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="3" />元宵</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="4" />清明</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="5" />五一</label></div><div style="float:left;"><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="6" />端午</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="7" />中秋</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="8" />国庆</label><label class="checkbox" style="display:block;color:#555555;"><input type="checkbox" name="holidaysList" value="9" />圣诞</label></div>');
				}else{
					return;
				}
			});

			this.bindEvent.clearAction.call(this,null);
			this.bindEvent.startEndDateAction.call(this,null);
			this.bindEvent.okAction.call(this,null);
			this.bindEvent.todayAction.call(this,null);

			/**
			* 功能说明 iframe一方面屏蔽日历外的控件，另一方面承载着点击使日历控件隐藏的任务，使用setTimeout是为了确保iframe内的body被载入后再绑定事件
			* @id
			* @param [null]
			* @return null
			* @editor zh
			* @editor 22144023 2012年06月22日 14:40:23 zh
			*/
			setTimeout(function(){
				$($('#maskIframe')[0].contentDocument).find('body').css({'width':'100%','height':'100%','overflow':'hidden'}).unbind('click').click(function(){
					$('#fsDatesPanel').hide();
					$('#maskIframe').hide();
					//self.dateInput.val(self.getDate());
				});
				//Kalendae控件随意给document绑定mousedown事件，引起了bug，这个hack解决了这个异常问题。
				$($('#maskIframe')[0].contentDocument).find('body').css({'width':'100%','height':'100%'}).mousedown(function(e){
					e.stopPropagation();
				});
			},0);

	},

	/**
	* 功能说明 页面事件的集合
	* @id FastSelectCalendarPanel.bindEvent
	* @param [null]
	* @return null
	* @editor zh
	* @editor 22144209 2012年06月22日 14:42:09 zh
	*/
	bindEvent:{

		/**
		* 功能说明 把控件获得的团期开始时间的值赋给self.myDateStart，团期结束时间的值赋给self.myDateEnd
		* @id FastSelectCalendarPanel.bindEvent.startEndDateAction
		* @param [null]
		* @return null
		* @editor zh
		* @editor 22144320 2012年06月22日 14:43:20 zh
		*/
		startEndDateAction:function(){
			var self = this;
			$('#dateRange').blur(function(){
				self.myDateStart = $(this).val().split(" - ")[0];
				self.myDateEnd = $(this).val().split(" - ")[1];
			});
		},

		/**
		* 功能说明 设置日历的值，快速选择的设置反映到日历面板上。
		* @id FastSelectCalendarPanel.bindEvent.setCalValueAction
		* @param [null]
		* @return null
		* @editor zh
		* @editor 22144433 2012年06月22日 14:44:33 zh
		*/
		setCalValueAction: function(){
			var self = this;
			var rule = function(date){return false;};
			var modeStyle = $('#modeSelect').val();
			switch (modeStyle){
				case "0": rule = function(date){return false;};
					break;
				case "1":
					var weekArray = [];
					$('#optionArea input[name|=weekList]').each(function(i,n){
						if(n.checked){
							weekArray.push(0);
						}else{
							weekArray.push(1);
						}
					});
					var lastElemnt = weekArray.pop();
					weekArray.unshift(lastElemnt);
					rule = function(date){
						return weekArray[date.day()];
					};
					break;
				case "2":
					if($('#oddday')[0].checked){
						rule = function(date){
							return (date.date()+1) % 2;
						};
					}else if($('#evenday')[0].checked){
						rule = function(date){
							return date.date() % 2;
						};
					}
					break;
				case "3":
					$('#optionArea input[name|=holidaysList]').each(function(i,n){
						if(n.checked){
							$.merge(self.holidays, self.holidaysDates[i]);
						}
					});
					rule = function(date){
						var flag = true;
						$.each(self.holidays,function(i,n){
							var day = date.format("YYYY-MM-DD");
							if(day == n){
								flag = false;
							}
						});
						return flag;
					}
					break;
				default:
			}
			var oldDate = this.selectArray;
			if(self.mergeFlag && oldDate && oldDate.length > 0){
				var startDate = self.myDateStart;
				var endDate = self.myDateEnd;
				oldDate = this.selectArray;
				if(typeof(startDate) == 'undefined' || typeof(endDate) == 'undefined'){
					kdemo.selectMulDays(self.myDateStart, self.myDateEnd, rule);
					return;	
				}
				var day = Kalendae.moment(startDate);
				var endDay = Kalendae.moment(endDate);
				var days = [];
				do{
					if(!(rule(day))) {
						days.push(day.format('YYYY-MM-DD'));
					}
					day.add('days', 1);
				}while(day <= endDay);

				days = $.unique($.merge(oldDate,days));
				if(days.length > 0){
					kdemo.viewStartDate = Kalendae.moment(days[0],'YYYY-MM-DD');
					kdemo.setSelected(days, true);
				}
			}else{
				kdemo.selectMulDays(self.myDateStart, self.myDateEnd, rule);
			}
			
		},

		/**
		* 功能说明 确定事件，把值赋给团期输入框，并隐藏控件
		* @id FastSelectCalendarPanel.bindEvent.okAction
		* @param [null]
		* @return null
		* @editor zh
		* @editor 22145121 2012年06月22日 14:51:21 zh
		*/
		okAction: function(){
			var self = this;
			$('#fsOk').unbind('click').click(function(){
				self.dateInput.val(self.getDate());
				if(typeof(self.callback) == 'function'){
					self.callback(self.getDate());
				}
				$('#fsDatesPanel').hide();
				$('#maskIframe').hide();
			});
		},

		todayAction: function(){
			var self = this;
			$('#fsToday').unbind('click').click(function(){
				kdemo.viewStartDate = window.Kalendae.moment(new Date());
				kdemo.draw();
			});
		},

		/**
		* 功能说明 清除选择的团期
		* @id FastSelectCalendarPanel.bindEvent.clearAction
		* @param [null]
		* @return null
		* @editor zh
		* @editor 22145156 2012年06月22日 14:51:56 zh
		*/
		clearAction: function(){
			var self = this;
			$('#clearBtn').unbind('click').click(function(){
				kdemo.setSelected([""], true);
			});
		}
	},

	/**
	* 功能说明 返回日历中所选择的团期
	* @id FastSelectCalendarPanel.getDate
	* @param [null]
	* @return [String]时间字符串，格式为"YYYY-MM-DD","YYYY-MM-DD"...
	* @editor zh
	* @editor 22145245 2012年06月22日 14:52:45 zh
	*/
	getDate: function(){
		var date = kdemo.getSelected('YYYY-MM-DD');
		if(date == 'NaN-NaN-NaN'){
			return "";
		}{
			return date;
		}
	}

 });