/**
 * 多选日期控件
 */
(function(window, document, undefined) {
	//搜索内容默认模板
	var searchHtml = {
		//整体布局
		wrap: "<div id='&inputid_chzn' class='chzn-container chzn-container-multi chzn-container-multi' style='width: 220px;'> " +
                                           "<ul class='chzn-choices'> " +
                                           "<li class='search-field'></li> " +
                                        "</ul> " +
                                       "</div> ",
        //中间插入模板
		tempInputContent: "<li class='search-choice' id='&inputid_chzn_c_&choiceid'><span>&content</span><a href='javascript:void(0)' class='search-choice-close tn-kalendea-choice-close' rel='&choiceid'></a></li>",
	};
    
    /**
	 * TNSearch构造函数
	 * @param <String> selector
	 * @return <void>
	 */
	var TNKalendae = function TNKalendae(selector) {
        this.init.call(this, $(selector));
        this.multipleTime.call(this, $(selector));
    };
    
    
    $.extend(TNKalendae.prototype, {
        
        //初始化
        init: function(el) {
			var self = this;
            
            $.each(el, function(i ,item){
                var inputDom = $(item);
                inputDom.attr('style', 'width: 100%;');
                
                /**
                var inputid = item.id;
                var placeholder = item.placeholder;
                var name = item.name;
                var classStr = item.className;
                
                //添加tn-kalendea相关控件
                var html = searchHtml.wrap.replace(/&inputid/g, inputid);
                html = html.replace(/&placeholder/g, placeholder);
                html = html.replace(/&name/g, name);
                html = html.replace(/&className/g, classStr);
                **/
                var inputid = item.id;
                var html = searchHtml.wrap.replace(/&inputid/g, inputid);
                html = $(html);
                $('.search-field', html).append(inputDom.clone(true));
                
                //绑定日期控件弹出事件
                $.each($("#" + inputid, html), function(i, item) {
                    new Kalendae.Input(item, {
                        mode: 'range',
                        months: 2,
                        rangeDelimiter: ' 至 ',
                        direction: 'today-future',
                    });
                
                    //插入控件
                    $("#" + inputid).after(html);
                    
                    //删除原有日期输入框
                    $("#" + inputid + ":first").remove();
                });
            });
        },
        
		//将klendae选中的时间生成按钮
		multipleTime: function(el) {
			var self = this;
			$.each(el, function(i, item){
                var inputid = item.id;
                $(item).on("blur", function() {
                    var time = $(this).val();
                    if (time) {
                        time = time.split("至");
                        if (time.length <= 1) {
                            //$("#flightDepTime").addClass('ver-error').attr('data-original-title', "请填写时间段").tooltip();
                            return;
                        } else {
                            time = $(this).val();
                            var choiceid = $('#' + inputid + "_chzn>ul:first>li").length;
                            var choice = searchHtml.tempInputContent.replace(/&inputid/g, inputid);
                            choice = choice.replace(/&content/g, time);
                            choice = choice.replace(/&choiceid/g, choiceid);
                            
                            var html = $(choice);
                            
                            //绑定关闭事件
                            $('.tn-kalendea-choice-close', html).unbind("click").click(function(e){
                                $("#" + inputid + "_chzn_c_" + choiceid).remove();
                            })
                            
                            //添加到输入框中
                            $('#' + inputid + "_chzn>ul>li[class='search-field']").before(html);
                            $(this).val('');
                        }
                    } else {
                        //$("#flightDepTime").addClass('ver-error').attr('data-original-title', "请填写乘机日期").tooltip();
                        return;
                    }
                });
            });
		},
    });
    
    window.TNKalendae = TNKalendae;
    
})(window, document);