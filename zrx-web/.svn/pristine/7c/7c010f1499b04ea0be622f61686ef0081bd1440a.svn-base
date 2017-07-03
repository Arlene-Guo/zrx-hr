/**
 * 功能说明：测评信息列表
 */
;
(function($, window) {
	function List() {
		var self = this;
		self.render();
		self.init();
    self.bindEvent();
	}
	$.extend(List.prototype, {
		/**
		 * 页面初始化
		 */
		init: function() {
		//	this.showCount();

		},
		/**
		 * 页面渲染
		 */
		render: function() {
			var self = this;
			var _params = {};
			var list = this.list = new TNGP(this.list()).tngp();
			//初始化参数
			list.reload(_params, function(data) {
				self.setListOperator();
			});
		},
		/**
		 * 页面AJAX请求URL统一处理
		 */
     bindEvent: function() {
       var self = this;
       $('#admin-role-save').click(function() {
         self.saveData();
       });
       $('#fileLoad').on('change', self.readFiles);
     },
		getAction: function() {
			if(this.devcfg) {
				return {
					roleList: Common.action.portalUrl + "user/findUsers"
				}
			} else {
				return {
					roleList: Common.action.portalUrl + "user/findUsers"
				}
			}
		},
		/**
		 * 配置页面列表
		 */
		list: function() {
			var self = this;
			var tableConfig = {
				url: self.getAction().roleList,
				colModel: [
					{
							display: '集团',
							name: 'headQuarters',
							width: 100,
							handler: function(v, data, n) {
								n.html(data.importDate)
							}
						},
					{
							display: '业务',
							name: 'business',
							width: 100,
							handler: function(v, data, n) {
								n.html(data.importCount)
							}
						},
					{
						display: '公司',
						name: 'company',
						width: 100
					},
					{
						display: '中心',
						name: 'core',
						width: 100
					},
					{
						display: '部门',
						name: 'department',
						width: 100
					},
					{
						display: '组别',
						name: 'group',
						width: 100
					},
					{
						display: '员工id',
						name: 'jobNumber',
						width: 200
					},
					{
						display: '姓名',
						name: 'userName',
						width: 100
					},
					{
						display: '移动电话',
						name: 'phone',
						width: 100
					},
					{
						display: '职等',
						name: 'dutiesType',
						width: 100
					},
					{
						display: '职务编号',
						name: 'dutiesNumber',
						width: 100
					},
					{
						display: '职务名称',
						name: 'dutiesName',
						width: 100
					},
					{
						display: '邮箱地址',
						name: 'email',
						width: 100
					}
				],
				css: {
					height: "auto",
				},
				model: "server",
				autoload: false,
				el: $("#tableList"),
				drop: true,
				toolColShow: false,
				bossAnalyButton: "",
				success: function(data) {}
			}
			return tableConfig;
		},
		/**
		 * 配置页面列表操作列操作项
		 */
		setListOperator: function() {
			var self = this;
			/**
			 * 根据绑定字段获取列对象
			 * @param  {string} field 绑定字段名称
			 * @return {array}       单元格td的数组
			 */
			var editCol = this.list.getColNodes("edit");
			$.each(editCol, function(i, n) {
				//n-----td每行，div
				var div = $("div", n);
				//getSelectRowsData()---------获取checked行的数据
				var rowData = self.list.getSelectRowsData(n.parent().index());
				var arr = {
					"editTour": $("<a style='margin:0 3px;'/>").html("<i class='icon-edit'></i>编辑")
				};
				for(var i in arr) {
					bind(arr[i], i, div);
				}
			});

			function bind(node, oper, div) {
				node.unbind("click").bind("click", function(e) {
					var index = $(e.target).parents("tr")[0].rowIndex;
					self[oper](e, self.list.getSelectRowsData(index), $(this));
				});
				div.append(node);
			}
		},
    readFiles: function(data) {
      //失败展示弹层
      function showTip(text) {
        var html = '<span class="tip">' + text + '</span>';
        $('.uploadContainer').append(html);
        setTimeout(function() {
          $('.tip').remove();
        }, 3000);
      }
      //$('#J_UploadFilesBtn2').attr('disabled',false);
      var $this = $(this);
      var files = $this[0].files;
      var filesCount = files.length;
      if(files && filesCount) {
        var verifyFlag = true;
        //var count = filesCount + imagesArr.length;
        //校验文件类型如果不是图片就返回 去掉就可以上传任意文件
        //				$.each(files, function(i, v) {
        //					var isImage = /image\/\w+/.test(v.type);
        //					var imageSize = Math.round(v.size / 1024 * 100) / 100;
        //					var errMsg = '';
        //					if(isImage!=''){
        //						if(!isImage || (imageSize > 1024 * 10)) {
        //							if(!isImage) {
        //								errMsg = '请选择图库图片';
        //							} else if(imageSize > 1024 * 10) {
        //								errMsg = '图片不能大于10M请重新上传';
        //							}
        //							showTip(errMsg);
        //							verifyFlag = false;
        //							return false;
        //						}
        //					}
        //				});

        if(!verifyFlag) {
          return;
        }
        //校验图片总数如果超过200张就返回
        //					if(count > 200) {
        //						config.noty.error('单次最多上传200张图片');
        //						return;
        //					}
        //提交表单获取文件路径
        getImagesPathData(files, function(data) {
          /*
          var filesData = {
            data: []
          };
          //筛选出CDN路径

          data = data.filter(function(v, i) {
            return i % 2 === 0;
          });
          data.forEach(function(v, i) {
            console.log(v);
            console.log(i)
            filesData.data.push({
              name: getFileName(files[i].name),
              path: v.url
            });
          });
          //缓存图片数据
          //imagesArr = $.merge(imagesArr, filesData.data);
          */
          //更新图片列表
          //					if($this.attr('id') == 'J_UploadFilesBtn2') {
          //						List.updateImagesList(data, $this);
          //					} else {
          //						Edit.updateImagesList(data, $this);
          //					}
        });
      }

      function getFileName(name) {
        if(!name) {
          return;
        }
        //查找最后一个"."的位置
        var pos = name.lastIndexOf('\.');

        //返回截取最后一个"."位置到字符长度
        return name.substring(0, pos);
      }

      function getImagesPathData(files, fn) {
        if(files && fn) {
          var $file = files[0];
          var formData = new FormData();
          $.each(files, function(i, v) {
            formData.append(('file' + i), v);
          });
          //console.log(formData.get('file1'));
          $.ajax({
            //url:'http://public-api.nj.pla.tuniu-sit.org/filebroker/upload',
            url: Common.action.portalUrl+'user/BatchInsert',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'text',
            success: function(json) {
							//showTip('文件上传成功');
              var json = tn.json.encode(tn.Base64.decode(json));
              console.log(json);
							if(json.success==true) {
								showTip('文件上传成功')
							} else {
								showTip('文件上传失败，请稍后重试');
							}
              //var url = json.data.success[0].substring(0, json.data.success[0].indexOf('_w640'));
              //var url1 = json.data.success[0].substring(json.data.success[0].lastIndexOf('.'));
              //$('.excel-box').html('<a href="' + json.data + '" download>' + files[0].name + '</a>');

            },
            error: function() {
              showTip('文件上传失败，请稍后重试');
            }
          });
        }
      }

      function Base64Decode(input) {
        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while(i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if(enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if(enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = _utf8_decode(output);
        return output;

        // private method for UTF-8 decoding
        function _utf8_decode(utftext) {
          var string = "";
          var i = 0;
          var c = c1 = c2 = 0;
          while(i < utftext.length) {
            c = utftext.charCodeAt(i);
            if(c < 128) {
              string += String.fromCharCode(c);
              i++;
            } else if((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
            } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
            }
          }
          return string;
        }
      }
    }
	});
	window.List = new List();
})(jQuery, window);
