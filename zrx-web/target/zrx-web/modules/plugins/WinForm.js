

function WinForm(cfg)
{
	this.formData = cfg.formData;
	var titleCss = {
		//backgroundColor: "#C6E3F1",
		textAlign: "left",
		padding: "4px 6px",
		fontSize: "18px",
		color: "#333333",
		borderBottom: "1px solid #EEEEEE",
		//background: "url('../../../common/images/tab-content-bg.gif') repeat-x scroll 0 0 transparent",
		fontWeight: "700",
		lineHeight: "normal"
	},
	msgCss = {
		lineHeight: "24px",
		padding: "10px",
		textAlign: "left",
//		borderBottom: "1px solid #8CBFDE",
		wordWrap: "break-word",
		borderBottom: "1px solid #ddd"
	},
	btnCss = {
		textAlign: "right",
		padding: "10px",
		borderTop: "1px solid #fff",
		background: "#f5f5f5"
	},
	title = $("<h2/>").css(titleCss).html(cfg.title || ""),
	msg = $("<div/>").css(msgCss).append(cfg.node),
	buttons = $("<div/>").css(btnCss);
	title.append('<a class="closeBlock" href="javascript:void(0);" style="float:right;margin-right:10px;text-decoration:none;color:#ccc;font-size:20px;"> × </a>');

	if (cfg.buttons && cfg.buttons.length){
		$.each(cfg.buttons,function(i,n){
			var btn = $("<button class='btn' style='margin-right:20px;'/>").html(n.name);
			btn.bind("click",n.click).addClass(n["class"] || "");
			buttons.append(btn);
		});
		if (cfg.buttons.length == 1){
			var cancel = $("<button class='btn btn-danger'/>").html("<i class='icon-remove'></i>"+ (cfg.cancelText || "取消")).click(function (e){
				if (cfg.cancel && $.isFunction(cfg.cancel)){
					cfg.cancel.call(this,e);
				}
				$.unblockUI();
			});
			buttons.append(cancel);
		}
	}else{
		var ok = $("<button class='btn btn-primary' style='margin-right:20px;'/>").html("<i class='" + (cfg.submitIcon || "icon-ok") + "'></i>" + (cfg.submitText || "确认")).click(function (e){
			if (cfg.submit && $.isFunction(cfg.submit)){
				cfg.submit.call(this,e,function (){
					$.unblockUI();
				});
			}
		});
		var cancel = $("<button class='btn btn-danger'/>").html("<i class='icon-remove'></i>" + (cfg.cancelText || "取消")).click(function (e){
			if (cfg.cancel && $.isFunction(cfg.cancel)){
				cfg.cancel.call(this,e,function (){
					$.unblockUI();
				});
			}
			$.unblockUI();
		});
		if (!cfg.btnHide){
			if (cfg.submit){
				buttons.append(ok);
			}
			buttons.append(cancel);
		}
	}

	var x,y,width,height,node,scrollx,scrolly;
	title.mousedown(function (e){
		node = $(e.target).parent().parent();
		x = e.clientX - $(e.target).parent().parent().offset().left;
		y = e.clientY - $(e.target).parent().parent().offset().top;
		scrollx = $(window).scrollLeft();
		scrolly = $(window).scrollTop();
		$(window).bind("scroll",function(){
			x = e.clientX - $(e.target).parent().parent().offset().left;
			y = e.clientY - $(e.target).parent().parent().offset().top;
			scrollx = $(window).scrollLeft();
			scrolly = $(window).scrollTop();
		});
		$(document).bind("mousemove",move);
	}).mousemove(function (){
		title.css({
			cursor: "move"
		});
	}).mouseout(function (){
		title.css({
			cursor: "default"
		});
	});
	$(document).mouseup(function (){
		$(document).unbind("mousemove");
		$(window).unbind("scroll");
	})

	var self = this;
	$('.closeBlock', title).unbind('mousedown click').click(function(e){
		self.hide();
		if (cfg.cancel && $.isFunction(cfg.cancel)){
			cfg.cancel.call(this,e);
		}
	});
	$('.closeBlock', title).hover(
	function(){
		$(this).css('color','#999');
	},
	function(){
		$(this).css('color','#ccc');
	}
	);

	function move(e){
		if (!node){return;}
		var dw = $(window).width(), dh = $(window).height(), nw = node.width(), nh = node.height();
		node.offset({ left: e.clientX - x, top: e.clientY - y });
		//左边距
		if (e.clientX - x < scrollx){
			node.offset({ left: scrollx, top: e.clientY - y });
		}
		//上边距
		if (e.clientY - y < scrolly){
			node.offset({ left: e.clientX - x, top: scrolly });
		}
		//左上角
		if (e.clientX - x < scrollx && e.clientY - y < scrolly){
			node.offset({ left: scrollx, top: scrolly });
		}
		//右边距
		if ((e.clientX - x + nw) > dw + scrollx){
			node.offset({ left: dw - nw + scrollx, top: e.clientY - y });
		}
		//右上角
		if ((e.clientX - x + nw) > dw + scrollx && e.clientY - y < scrolly){
			node.offset({ left: dw - nw + scrollx, top: scrolly });
		}
		//下边距
		if ((e.clientY - y + nh) > dh + scrolly){
			node.offset({ left: e.clientX - x, top: dh - nh + scrolly });
		}
		//左下角
		if (e.clientX - x < scrollx && (e.clientY - y + nh) > dh + scrolly){
			node.offset({ left: scrollx, top: dh - nh + scrolly});
		}
		//右下角
		if ((e.clientX - x + nw) > dw + scrollx&& (e.clientY - y + nh) > dh + scrolly){
			node.offset({ left: dw - nw + scrollx, top: dh - nh + scrolly});
		}
	}

	var msgBox = $("<div style='background-color:#fff;border: 1px solid #fff;border-radius:6px;box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.6)'/>").append(title).append(msg).append(buttons);

	msgBox.click(function (e){
		// e.stopPropagation();
		//e.preventDefault();
	});

	var config = {
		message: msgBox
	};
	if (cfg.css){
		$.extend(config,{
			css: cfg.css
		});
	}

	this.container = msgBox;

	this.form = Forms;

	this.getData = function (){
		return this.form.get(this.container);
	}

	this.hide = function(){
		$.unblockUI();
	}

	this.show = function(){
		$.blockUI(config);
	}
}