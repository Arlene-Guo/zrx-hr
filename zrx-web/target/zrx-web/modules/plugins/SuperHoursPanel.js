

function SuperHoursPanel(options) {
	this.showTime = "default";
    this.selecting = false; //正在选择状态
    this.selectedStart;
    this.selectedHour;
	$.extend(this, options);
	this.init();
}

$.extend(SuperHoursPanel.prototype, {
	init: function() {
		this.generateDOM();
	},
	generateDOM: function() {
		var self = this;
		var showTime = this.showTime;
		if ($('#clockIframe_2').length > 0) {
			var pos = this.target.offset();
			$('#superHoursPanel').css({
				'top': pos.top + 29,
				'left': pos.left
			});
			$('#clockIframe_2').show();
			$('#superHoursPanel').show();
		} else {
			var iframe = $('<iframe id="clockIframe_2" frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;filter:alpha(opacity=0);z-index:99998;"></iframe>');
			var div = $('<div id="superHoursPanel" style="position:absolute;z-index:99999;background:white;width:0px;overflow:hidden;border:1px solid #ccc;border-radius:3px;box-shadow:0 1px 1px rgba(0,0,0,0.075) inset;padding:3px;display:none;"></div>');
			var hoursUl = $('<ul class="clockList" style="width:146px;margin:0;padding:0;float:left;"></ul>');
			// default以及showTime为hours时显示
			if (showTime === "default" || showTime === "hours") {
				div.append(hoursUl).css("width", "147px");
				if (showTime === "default") {
					$(".clockList", div).css("border-right", "1px solid #ccc");
				}
				for (var i = 0; i < 24; i++) {
					var li = $('<li class="oclockLi" style="display:inline-block;width:18px;padding:2px;border:1px solid #fff;border-radius:3px;text-align:center;cursor:pointer;"><a href="javascript:void(0);" style="text-decoration:none;">' + i + '</a></li>');
					$(".clockList", div).append(li);
					li.hover(function() {
						$(this).css({
							'border': '1px solid #ddd'
						});
					}, function() {
						$(this).css({
							'border': '1px solid #fff'
						});
					});
				}
			}
            
			var pos = this.target.offset();
			div.css({
				'top': pos.top + 29,
				'left': pos.left,
				'display': 'block'
			});
			this.target.parents('body').append(iframe).append(div);
		}
		$('.oclockLi').each(function(i, n) {
			$(n).unbind('click').click(function(e) {
				var value = $(this).text();
				self.fillInput(0, value);
			});
		});
		setTimeout(function() {
			$($('#clockIframe_2')[0].contentDocument).find('body').css({
				'width': '100%',
				'height': '100%'
			}).unbind('click').click(function() {
				$('#clockIframe_2').hide();
				$('#superHoursPanel').hide();
                self.target.blur();
			});
		}, 0);
	},
	//时分秒赋值显示
	fillInput: function(flag, v) {
		var self = this;
		var startTime = ["00", "00", "00"];
        var endTime = ["00", "59", "59"];
		var value = self.fillZero(v);
        startTime[flag] = value;
        endTime[flag] = value;
        //如果未选择开头或选择的结尾大于开头
        if (!self.selecting
         || parseInt(self.selectedHour) > parseInt(v))
        {
            value = startTime.join(":");
            self.selecting = true;
            self.target.val(value);
            self.selectedStart = value;
            self.selectedHour = v;
            self.target.focus();
        }
        else
        {
            value = endTime.join(":");
            self.selecting = false;
            value = self.selectedStart + self.rangeDelimiter + value;
            self.target.val(value);
            
            if (typeof(self.callback) == 'function') {
                self.callback(self.target.val());
            }
            self.target.focus();
        }
	},
	//时分秒为单位时前面补零 
	fillZero: function(v) {
		if (v < 10) {
			v = "0" + v;
		}
		return v;
	}
});