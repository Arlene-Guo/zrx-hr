
/**
 * 功能说明：验证控件，用户验证一个DOM内包含的所有input、select、textarea等控件，扩展一个回调函数，支持用户自定义校验方法
 * 校验的配置：我们在要校验的控件上用属性做配置。ver-required:是否必填，值不为空表示必填；ver-pattern:校验格式，参照Ver对象里面的方法；ver-length：长度校验
 */

 function Verify(node,options,callback){
	this.config = {};
	var defaultSettings = {
			displayTooltip:true//是否显示tooltip以及出错提示，不显示的情况主要用于搜索前校验
		};
	$.extend(this.config,defaultSettings,options);
	this.ver = new Ver();							//里面有很多正则表达式，可以用他们来校验many Regxs in it, and we can use it to verify widget's value
	this.patterns = this.getPatterns();				//让ver里面的所有属性组成一个数组，主要用于判断ver-pattern是否可以用ver来校验。make the 
	this.node = node || $(document.body);			//
	this.callback = callback;						//回调函数，让用户自定义校验方法，最终把参数flag 返回即可
	this.flag = true;								//控制校验成功与否的标识
	this.verPatternTitle = this.verPatternTitle();	//格式校验的提示信息

	this.init();
 }

 $.extend(Verify.prototype,{
	init: function(){
		var self = this;
		var validElArray = $('input:visible,textarea:visible,select:visible',self.node);
		// 追加额外需要检查的字段 add by xiaguannan 2016/05/27
		if (self.config.extValidEl) {
			validElArray = validElArray.add(self.config.extValidEl);
		}
		validElArray.each(function(i,n){
			var innerFlag = true;
			var title = '';
			var required = $(n).attr('ver-required');
			var pattern = $(n).attr('ver-pattern');
			//by yl 为模糊搜索作必填校验
			var searchRequire = $(n).attr('ver-searchRequired');

			//清空tooltip的痕迹，chosen控件的校验处理，如果有用chosen控件，则要特别处理一下，5Z2R54i555qEY2hvc2Vu5o6n5Lu2
			if($(n).hasClass('chzn-done')){
				if(typeof($(n).next().children().first().data('tooltip')) != 'undefined'){
					$(n).next().children().first().removeData('tooltip').removeAttr('style');
				}

			}else{
				if(typeof($(n).data('tooltip')) != 'undefined'){
					$(n).removeData('tooltip');
					$(n).removeClass('ver-error');
				}
			}
			
			if($.inArray(pattern, self.patterns) == -1){
				pattern = null;
			}
			var length = $(n).attr('ver-length');
			if(required){
				if($.trim($(n).val()) == '' || $(n).val() == null){
					innerFlag = false;
					self.flag = false;
					title += '不能为空';
				}
			}
			// by yl 
			if (searchRequire) {
				if($.trim($(n).attr(searchRequire)) == '' || ($(n).attr(searchRequire) == null) || (parseInt($(n).attr(searchRequire))  == -1) || (parseInt($(n).attr(searchRequire))  == 0) ){
					innerFlag = false;
					self.flag = false;
					title += '请选择存在的资源';
				}
			};
			if($.trim($(n).val())!='' && (pattern != null) && (!self.ver[pattern]($.trim($(n).val())))){
				innerFlag = false;
				self.flag = false;
				title += ' 格式有误,' + self.verPatternTitle[pattern];

			}
			if($.trim($(n).val()).length > length){
				innerFlag = false;
				self.flag = false;
				title += ' 字符长度不能超过' + length;
			}

			if(self.config.displayTooltip){
				if(!innerFlag){
					//chosen控件的tooltip要特别处理下
					if($(n).hasClass('chzn-done')){
						$(n).next().children().first().css({"border":"1px solid #B94A48","background":"rgba(255, 0, 0, 0.1)"}).tooltip({title:title});
					}else{
						$(n).addClass('ver-error');
						$(n).tooltip({title:title});
					}
				}
			}
		});
	},
	//获得ver对象的属性名，拼成数组
	getPatterns: function(){
		var allPatterns = [];
		for(var name in this.ver){
			allPatterns.push(name);
		}
		return allPatterns;
	},

	getFlag: function(){
		if(typeof(this.callback) == 'function'){
			this.flag = this.callback(this.flag);
		}
		return this.flag;
	},

	verPatternTitle: function(){
		var verTitle = {
			"cell": "请输入手机号，如：13899977777",
			"telCode": "请输入固话的区号，如：025,010,0510...",
			"tel": "请输入固话号码，如87654321",
			"telAll": "请输入固话区号加号码，如025-87654321",
			"date": "请输入日期，格式YYYY-MM-DD，如2012-01-01",
			"rangeDate": "请输入时间段，格式YYYY-MM-DD - YYYY-MM-DD，如2012-01-01 - 2012-07-01",
			"email": "请输入电子邮件地址，如link@link.com",
			"url": "请输入url地址，如http://www.lianjia.com",
			"charReg": "存在特殊字符...",
			"letterAndNum": "请输入字母和数字，如sd823",
			"price": "请输入价格，如4.99",
			"priceNew":"请输入价格，如4.9999",
			"priceNewAll":"请输入价格，如-4.9999或4.9999",
			"positiveInt": "请输入正整数，如2",
			"nonnegativeInt": "请输入非负整数，如0",
			"yearInt": "请输入年份，如2012",
			"dateEx": "请输入年份和月份，格式YYYY-MM，如2012-06",
			"telNum": "请输入固话区号加号码加分机号，如025-87654321-66666",
			"IsValidHour": "请输入小时，0~23",
			"IsValidMinute": "请输入分钟，0~59",
			"IsValidSecond": "请输入秒钟，0~59",
			"deduction": "请输入0-100的正数，小数点最多2位",
			"interger": "请输入整数，如 -1、0、1"
		};
		return verTitle;
	}

 });