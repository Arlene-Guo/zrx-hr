
function UploadFile(options){
	$.extend(this, UploadFile_defaults, options);
	this.maxSize = 2048 * 16;
	this.sizeFlag = true;
	this.typeFlag = true;
	this.init();
}

$.extend(UploadFile.prototype,{
	init: function (){
		this.guid = GUID.guid();
		this.form = $("form",this._createForm());
		this.iframe = $(this._iframeTransport());
		this.fileInput = $("input[type='file']",this.form);
		if (this.multiple){
			this.fileInput.attr("multiple","");
		}

		this.renderTo.append(this.form);
		for (var i in this.event){
			this.event[i].call(this);
		}
		this.setDisabledStart(true);
	},
	_createForm: function (){
		return "<div style='clear:both;'><form style='margin:0;' encoding='multipart/form-data' enctype='multipart/form-data' method='post' target='iframe-transport-" + this.guid + "'><div class='row fileupload-buttonbar' style='margin-left:0px;'><div><span class='btn fileinput-button'><i class='icon-file' style='width:auto;'></i><span>选择文件</span><input type='file' name='files_upload'></span><a class='btn show-files'><i class='icon-upload-alt' style='display:inline;width:auto;'></i><span>上传</span></a></div></div></form></div>";
	},
	files: [],
	event: {
		onShowFiles: function (e){
			var self = this;
			$(".show-files",this.form).click(function (e){
				var  iframe = $('<iframe id="maskIframeByUploadFile" frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;filter:alpha(opacity=0);z-index:989;"></iframe>');
				var div = $('<div style="position:absolute;top:0;left:0;width:200px;height:170px;background:#fff;border:1px solid #ddd; border-radius:3px;padding:8px;z-index:99999;border-color:rgba(82, 168, 236, 0.8);box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);overflow:hidden;"><div id="fileListUploadFile"></div><div id="hintArea" style="color:red;height: 20px;"></div><div style="text-align:right;"><a id="innerOkUploadFile" style="margin-right:10px;display:inline;width:auto;" class="btn icon-ok">确定</a><a id="innerCancelUploadFile" class="btn icon-remove" style="display:inline;width:auto;">取消</a></div></div>');
				var node = e.target;
				if (node.nodeName == "I" || node.nodeName == "SPAN"){
					node = node.parentNode;
				}
				$(node).next().remove();
				$(node).after(div);
				var pos = $(node).position();
				div.css({'top':pos.top,'left':pos.left})
				$("#fileListUploadFile").empty().append(self._filesList());
				$("#innerOkUploadFile",div).click(function (e){
					self.event.submitFiles.call(self,e,div);
				});
				$("#innerCancelUploadFile",div).click(function (){
					div.hide();
					iframe.hide();
				});
				$("#maskIframeByUploadFile").remove();
				$(document.body).append(iframe);
			});
		},
		onChange: function (){
			var self = this;
			this.fileInput.change(function (e){
				if (e.target.files.length > 0){
					self.setDisabledStart.call(self,false);
				}
			});
		},
		deleteFile: function (e){
			if (!e) return;
			var fileName = $(e.target.parentNode).attr("value");
			$(e.target.parentNode.parentNode).remove();
			var files = this.fileInput[0].files;
			if (this.files.length > 0){
				files = this.files;
			}
			this.files = $.grep(files,function (n, i){
				return fileName != n.name;
			});
		},
		submitFiles: function (e,$box){
			if (!e) return;
			if (!this.url){
				throw new Error("请指定上传地址");
			}
			if (this.system.length == 0){
				throw new Error("请指定系统名称");
			}
			if(!this.typeFlag){
				//by yl http://bug.tuniu.org/issues/15576 添加'padding-bottom':30
				$('#hintArea').text('请上传jpg、jpeg、gif、bmp、png格式的图片').css({'margin-top':-30,'padding-bottom':30});
				return;
			}
			if(!this.sizeFlag){
				$('#hintArea').text('文件大小不能超过2M').css({'margin-top':-23,'padding-bottom':8});
				return;
			}
			var self = this;
			//updated by wanglei 修改bug：两次上传路径相同问题
			var param= "?cdn_required=" + this.cnd + "&sub_system=" + this.system + "&name=" + Base64.encode(this.fileName).replace(/\+/ig,"-").replace(/\//ig,"_") + "&sys_type=1&retype=1&folder=" + this.folder;
			//zhouhai: 如果需要传递额外的参数，就用参数data（hash对象）来传
			if(self.data){
				$.each(self.data, function(k,v){
					param = param + "&" + k +"=" + v;
				})
			}

			this.form[0].action = this.url+param;
			this.form.append(this.iframe);
			this.form[0].submit();
			$(e.target).text("正在上传...").addClass("icon-undo").attr("disabled",true).unbind("click");
			var timeout = setInterval(function (){
				var callbackStr = location.hash;
				if (callbackStr.length > 0){
					callbackStr = JSON.decode(Base64.decode(callbackStr.substring(1)));
					if (callbackStr.success){
						self.callbackStr = callbackStr;
						$(e.target).text("上传成功").removeClass("icon-undo");
						clearInterval(timeout);
						if (self.complete && $.isFunction(self.complete)){
							self.complete.call(self,callbackStr,self.fileName);
							$box.hide();
						}
					}else{
						$(e.target).text("上传失败");
						clearInterval(timeout);
					}
					$("#innerCancelUploadFile",self.form).text("关闭");
					//by yl 解决上传成功后会跳到页头
					// location.hash = "";
					self.iframe.remove();
					$("#maskIframeByUploadFile").remove();
				}else{
					self.iframe.remove();
					clearInterval(timeout);
				}
			},this.tiemout);
		},
		_setDisabledStart: function (flag){
			if (flag){
				$(".show-files",this.form).attr("disabled","true").unbind("click");
			}else{
				$(".show-files",this.form).removeAttr("disabled");
				this.files = this.fileInput[0].files;
				this.event.onShowFiles.call(this);
			}
		}
	},
	disabled: function(flag){
		if (flag) {
			this.fileInput[0].disabled = true;
		}else{
			this.fileInput[0].disabled = false;
		}
	},
	setDisabledStart: function (flag){
		this.event._setDisabledStart.call(this,flag);
	},
	isSelectFile: function (){
		return this.files.length > 0 ? this.files.length : 0;
	},
	getFiles: function (){
		return this.fileInput.val();
	},
	_filesList: function (){
		var self = this;
		var div = $("<div style='height:120px;overflow-y:auto;margin-bottom: 10px;'/>");
		var files = this.fileInput[0].files;
		if (this.files.length > 0){
			files = this.files;
		}
		if (files.length){
			$.each(files,function(i,n){
				self.fileName = n.name;
				var item = $("<div class='row' style='margin-bottom:5px;margin-left: 0px;'><div title='"+n.name+"' class='span2' style='height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:120px;margin-left:0px;'>" + n.name + "</div><div class='show del' style='text-align: right;' value='" + n.name + "'><a><i class='icon-trash'></i>删除</a></div></div>");
				div.append(item);
				$(".del",item).html("大小:"+(n.size/1024).toFixed(2)+"KB");
				//判断图片大小
				if(self.maxSize < n.size/1024){
					self.sizeFlag = false;
				}else{
					self.sizeFlag = true;
				}
				//判断图片类型
				var type = n.name.substring(n.name.lastIndexOf('.')).toLowerCase();
				if(self.fileType == 'all'){
					self.typeFlag = true;
				}else if(self.fileType.indexOf(type+"|")==-1){
					self.typeFlag = false;
				}else{
					self.typeFlag = true;
				}
				/*
				$(".del",item).click(function (e){
					self.event.deleteFile.call(self,e);
				});*/
			});
		}
		return div;
	},
	_iframeTransport: function (){
		return $("<iframe id='iframe-transport-" + this.guid + "' style='display:none;' name='iframe-transport-" + this.guid + "'></iframe>");
	}
});

var UploadFile_defaults = {
	multiple: false,
	renderTo: $(document.body),
	tiemout: 5000,
	system: "",
	folder: "",
	cnd: 0,
	url: "",
	fileType: ".jpg|.jpeg|.gif|.bmp|.png|"
}