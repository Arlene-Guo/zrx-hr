
(function(window, document, undefined) {
	var defaults = {
		//上传地址
		url: "http://public-api.nj.pla.tuniu.org/filebroker/upload",
		id: tn.guid(),
		//三种上传方式， multiple 多文件选择，单一请求。 single 单文件多次选择，多次请求。 ajax 多文件选择，单一请求。
		requestType: "single",
		//注册请求方法
		requestFunction: {
			single: {
				render: "renderSingleFilesList",
				submit: "singleSubmit"
			},
			multiple: {
				render: "renderMultipleFilesList",
				submit: "multipleSubmit"
			},
			ajax: {
				render: "renderAjaxFilesList",
				submit: "ajaxSubmit"
			}
		},
		el: $(document.body),
		//调整单文件大小基数
		floatSingleMax: 8,
		//单文件大小
		singleMax: 1024,
		//总上传文件数
		filesCount: 5,
		//上传检查时间
		tiemout: 1000,
		//文件类型
		fileType: ["jpg", "jpeg", "gif", "bmp", "png", "pdf", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "csv", "txt", "zip", "rar", "msg"],
		//文件类型限制
		fileExtForBidden: ["exe", "jar"],
		//信息提示
		msg: {
			waiting: "等待上传",
			processing: "正在上传...",
			success: "上传完成",
			failing: "上传失败",
			error: {
				"10000": "超出单文件大小限制",
				"10001": "文件类型不符合",
				"10003": "该文件类型已被限制",
				"10004": "到达总上传文件数"
			}
		},
		//上传文件的系统名称
		systemName: "",
		folder: "",
		minPicwidth: 0,
		minPicheight:0,
		cnd: 0,
		domain: (callbackTNUFUrl || ""),
		complete: $.noop,
		ver: function(){
			return true;
		},
		errorCss: "alert-danger",
		success: ""
	},
		tpl = {
			wrapper: "<div class='tnufContainer'><div><span class='btn fileinputButton'><i class='icon-file'></i><span>选择文件</span><input type='file' name='files_upload'></span><a class='btn showFiles'><i class='icon-upload-alt'></i><span>上传</span></a><div class='tnufBody'><ul class='filesList'></ul><div class='tnufFooter'></div></div></div></div>",
			cloneInput: '<input type="file" name="files_upload">',
			filesList: {
				item: '<li class="clearfix"></li>',
				multipleForm: ['<div><%=name%></div><div>大小:<%=size%>KB</div><div><a class="removeFile" href="javascript:void(0);"><i class="icon-trash"></i>删除</a></div><div><%=error%></div><form action="<%=action%>" class="hide" encoding="multipart/form-data" enctype="multipart/form-data" method="post" target="<%=id%>" id="<%=id%>"><iframe src="http://boss.tuniu.org/empty.html" name="<%=id%>" class="hide"></iframe></form>'],
			},
			footer: '<a class="btn btn-primary submit"><i class="icon-upload-alt"></i>上传</a><a class="btn btn-danger closeList"><i class="icon-remove"></i>关闭</a>'
		};
	var TNUploadFile = function TNUploadFile(o) {
		if (!this.tnuf) return new TNUploadFile(o);
		this.tpl = tn.util.merge({}, tpl);
		this.opts = tn.util.merge(o || {}, TNUploadFile.defaults, defaults);
	};
	TNUploadFile.defaults = {};

	tn.util.merge(TNUploadFile.prototype, {
		tnuf: function() {
			var opts = this.opts;

			this.files = new Files({
				floatSingleMax: opts.floatSingleMax,
				singleMax: opts.singleMax,
				fileType: opts.fileType,
				fileExtForBidden: opts.fileExtForBidden,
				filesCount: opts.filesCount
			}).init();

			var cal = $(this.tpl.wrapper).attr('id', this.id).bind({
				click: this.click
			}).data({
				'opts': opts,
				'up': this
			});

			$("input[name='files_upload']", cal).bind({
				change: this.change
			}).data({
				'opts': opts,
				'up': this
			});

			$(opts.el).append(cal);

			this.render(cal);

			this.setDisabledStart(true);

			return this;
		},
		render: function(el) {
			var opts = this.opts;
			this.nodes = {
				container: $(".tnufContainer", opts.el),
				cloneBox: $(".fileinputButton", opts.el),
				body: $(".tnufBody", opts.el),
				footer: $(".tnufFooter", opts.el),
				showFiles: $(".showFiles", opts.el),
				filesList: $(".filesList", opts.el),
				fileInput: $(".fileinputButton input[type='file']")
			};
			this.renderFooter();
			return this;
		},
		renderFilesList: function() {
			var self = this;
			var opts = this.opts;
			var filesList = this.files.getFielsInfo().items;
			this.nodes.filesList.empty();
		},
		renderSingleFilesList: function() {
			var self = this;
			var opts = this.opts;
			var filesList = this.files.getFielsInfo().items;
			this.nodes.filesList.empty();
			$.each(filesList, function(i, item) {
				var li = $(self.tpl.filesList.item).attr("title", item.name);

				var param = "?cdn_required=" + opts.cnd + "&sub_system=" + opts.systemName + "&name=" + tn.Base64.encode(item.name).replace(/\+/ig, "-").replace(/\//ig, "_") + "&sys_type=1&folder=" + opts.folder + "&domain=" + opts.domain;
				
				if ( opts.minPicwidth > 0 ) {
					param = param+ "&min_picwidth=" + opts.minPicwidth;
				}
				if ( opts.minPicheight > 0 ) {
					param = param+ "&min_picheight=" + opts.minPicheight;
				}

				if (opts.data) {
					$.each(opts.data, function(k, v) {
						param = param + "&" + k + "=" + v;
					})
				}
				item.action = self.opts.url + param;
				$(li).append(tn.tmpl(self.tpl.filesList.multipleForm.join(","), item));
				$("form", li).append(item.input);
				if (self.opts.msg.error[item.error]) {
					$("div:last", li).html(self.opts.msg.error[item.error]);
					$(li).addClass("alert-danger");
				}
				self.nodes.filesList.append(li);
			});
			var submitBtn = $(".submit", opts.el);
			submitBtn.removeAttr("disabled");
			return this;
		},
		renderMultipleFilesList: function() {
			console.debug("multiple")
		},
		renderAjaxFilesList: function() {
			console.debug("ajax")
		},
		/**
		 * 渲染脚
		 * @return {object} 列表对象
		 */
		renderFooter: function() {
			var opts = this.opts;
			this.nodes.footer.append(this.tpl.footer);
			return this;
		},
		/**
		 * 列表点击操作的事件绑定集合
		 * @param  {element} e 当前点击的节点
		 * @return {null}
		 */
		click: function(e) {
			var up = $(this).data("up");
			var opts = up.opts;
			var el = $(e.target);
			var parent = el.parent();
			if ((parent.hasClass("showFiles") && !parent.attr("disabled")) || (el.hasClass("showFiles") && !el.attr("disabled"))) {
				up.showFilesList.call(up);
			}
			if (parent.hasClass("fileinputButton") || el.hasClass("fileinputButton")) {
				var flag = opts.ver.call(up);
				if (flag) {
					up.createCloneInput.call(up);
					up.hideFilesList.call(up);
				}else{
					return false;
				}
			}
			if (parent.hasClass("closeList") || el.hasClass("closeList")) {
				up.hideFilesList.call(up);
			}
			if (parent.hasClass("submit") || el.hasClass("submit")) {
				up[opts.requestFunction[opts.requestType].submit](up);
			}
			if (parent.hasClass("removeFile") || el.hasClass("removeFile")) {
				up.removeFile.call(up, el);
			}
		},
		singleSubmit: function() {
			var self = this;
			var opts = this.opts;
			var forms = $(".filesList form", opts.el);
			var iframes = $(".filesList iframe", opts.el);
			var files = this.files.getFielsInfo().items;
			var submitBtn = $(".submit", opts.el);
			this.setDisabledStart(true);
			var validCount = 0;
			var uploadTime = [];
			var resultJson = [];
			$.each(files, function(i, item) {
				if (!item.error) {
					var formItem = forms.eq(i);
					formItem[0].submit();
				}
			});

			var time = setInterval(function() {
				if (self.files.getValidCount() === validCount) {
					clearInterval(time);
					var iframes = $(".filesList form", opts.el);
					$.each(iframes, function(i, item){
						var callbackStr = $(item).find("iframe").contents().find("body").text();
						var msgInfo =  $(item).parent().find("div:last");
						if (callbackStr.length > 0) {
							callbackStr = tn.json.encode(tn.Base64.decode(callbackStr));
							if (callbackStr.success) {
								var data = {
									urls: callbackStr.data,
									name: $(item).parent().attr("title")
								}
								resultJson.push(data);
							} 
						}
					});
					//处理提交成功后，无法再上传同名附件问题
					self.files.files.items.length = 0;
					self.files.filesName.length = 0;
					self.files.validCount = 0;
					self.clear.call(self);
					self.opts.complete.call(self, resultJson);
				};
				var iframesOk = $(".filesList form", opts.el);
				validCount = 0;
				$.each(iframesOk, function(i, item){
					var callbackStr = $(item).find("iframe").contents().find("body").text();
					var msgInfo =  $(item).parent().find("div:last");
					msgInfo.html(opts.msg.processing);
					if (callbackStr.length > 0) {
						callbackStr = tn.json.encode(tn.Base64.decode(callbackStr));
						if (callbackStr.success) {
							validCount++;
							msgInfo.html(opts.msg.success);
						} else {
							validCount++;
							msgInfo.html(opts.msg.failing+","+callbackStr.msg);
						}
					}
				});
			}, opts.tiemout);

			$("i", submitBtn).addClass("icon-undo");
			submitBtn.attr("disabled", true).unbind("click");
		},
		multipleSubmit: function() {
			console.debug("multiple")
		},
		ajaxSubmit: function() {
			console.debug("ajax")
		},
		change: function(e) {
			var up = $(this).data("up");
			if (e.target.files.length > 0) {
				up.setDisabledStart.call(up, false, e);
			}
		},
		removeFile: function(e) {
			var opts = this.opts;
			var eq = e.parents("li").index();
			this.files.removeFile(eq);
			this[opts.requestFunction[opts.requestType].render]();
		},
		setDisabledStart: function(flag, e) {
			if (flag) {
				this.nodes.showFiles.attr("disabled", "true").unbind("click");
			} else {
				this.nodes.showFiles.removeAttr("disabled");
				this.filesList = e.target.files;
				this.files.setFileInfo(this.filesList, $(e.target));
			}
		},
		showFilesList: function() {
			if (!this.filesList) {
				return false;
			}
			var opts = this.opts;
			this[opts.requestFunction[opts.requestType].render]();
			this.nodes.body.show();
		},
		hideFilesList: function() {
			this.nodes.body.hide();

			//如果上传文件列表为空，关闭上传窗口后，上传按钮置灰
			if(1 > this.files.files.items.length) this.setDisabledStart.call(this, true);
		},
		createCloneInput: function() {
			var opts = this.opts;
			var cloneInput = $(this.tpl.cloneInput);
			cloneInput.bind({
				change: this.change
			}).data({
				'opts': opts,
				'up': this
			});
			this.nodes.input = cloneInput;
			this.nodes.cloneBox.append(cloneInput);
		},
		clear: function() {
			this.files.clearFiles();
		}
	});

	var Files = function Files(options) {
		if (!this.init) return new Files(options);
		this.opts = tn.util.merge(options || {}, Files.defaults);
		this.files = {
			error: "",
			items: []
		};
		this.filesName = [];
		//有效文件个数
		this.validCount = 0;
	};

	Files.defaults = {};

	tn.util.merge(Files.prototype, {
		init: function() {
			return this;
		},
		setFileInfo: function(files, input) {
			var self = this,
				opts = this.opts;

			//解决单选附件，上传弹出层点击关闭后，重选文件不刷新的bug
			if (opts.filesCount == 1) {
				self.clearFiles();
			}

			if (this.files.items.length == opts.filesCount) {
				this.files.error = "10004";
				return false;
			};
			$.each(files, function(i, item) {
				var flag = true;
				var type = item.name.substring(item.name.lastIndexOf('.') + 1).toLowerCase();
				var file = {
					id: tn.guid(),
					name: item.name,
					size: ((item.size / 1024).toFixed(2)),
					type: type,
					sysType: item.type,
					input: input,
					error: ""
				}
				//判断单文件大小
				if ((item.size / 1024).toFixed(2) > opts.singleMax * opts.floatSingleMax) {
					file.error = "10000";
					flag = false;
				};
				//判断文件类型
				if (opts.fileType && opts.fileType != "all") {
					if ($.inArray(type, opts.fileType) === -1) {
						file.error = "10001";
						flag = false;
					};
				}
				//判断上传文件类型的限制
				if ($.inArray(type, opts.fileExtForBidden) != -1) {
					file.error = "10003";
					flag = false;
				};
				//文件重复控制
				if ($.inArray(item.name, self.filesName) === -1) {
					self.files.items.push(file);
					self.filesName.push(item.name);
					if (flag) {
						self.validCount++;
					};
				}
			});
			return this;
		},
		getFielsInfo: function() {
			return this.files;
		},
		removeFile: function(index) {
			this.files.items.splice(index, 1);
			//解决删除上传list后不能再次选中上传问题
			this.filesName.splice(index, 1);
			this.validCount--;
			//bug 修复
			this.validCount = this.validCount < 0 ? 0 : this.validCount;
			return this.files;
		},
		clearFiles: function() {
			this.files.items.length = 0;
			this.validCount = 0;
		},
		getValidCount: function() {
			return this.validCount;
		}
	});
	window.TNUF = TNUploadFile;
})(window, document);