
 function TreeTable(options){
	$.extend(this, defaults, options, {
		noty: new Noty()
	});
	this._init();
 }

 $.extend(TreeTable.prototype,{
	_init: function (){
		this._renderHeader();
	},
	_renderHeader: function (){
		var self = this;
		if (!this.grid){
			this.grid = $("<div id='ttGrid' class='ttGrid'/>");
			this.grid.append(this._henderTemplet())
						.append(this._bodyTemplet());
			this.renderTo.append(this.grid);
			var tr = this._hender_body_tr();
			this.tthDiv = $(".ttHDiv",this.grid);
			this.ttbDiv = $(".ttBDiv",this.grid);
			this.thWidth = 0;
			this.colSize = this.colModel.length;
			var level = 0;
			if (this.height){
				this.ttbDiv.css({"max-height":this.height});
			}

			if (this.colModel && this.colModel.length > 0){
				$.each(this.colModel,function(i,n){
					var th = $("<th field='"+n.name+"'><div style='width:"+(n.width || 0)+"px'>" + n.display + "</div></th>");
					var td = tr.append(th);
					$("thead",self.tthDiv).append(td);
					self.thWidth += n.width + 17;
					if (n.hide){
						th.hide();
						th.css("border","none");
					}
				});
				$("thead th",this.tthDiv).css({"border":"none","border-left":"1px solid #DDDDDD","border-radius":"0px"});
				$("thead th div",this.tthDiv).css({"padding":"5px 0"});
			}
			if (this.width){
				if (this.width < this.thWidth){
					this.grid.width(this.thWidth + 40);
				}else{
					this.grid.width(this.width + 40);
				}
			}
		}
	},
	setData: function (data, level, appendNode){
		if (!level){
			level = 0;
		}
		this.addData.call(this,data,level,appendNode);
	},
	addData: function (data,level,appendNode){
		var self = this;
		var tr = this._hender_body_tr();
		if (this.colModel && this.colModel.length > 0){
			$.each(this.colModel,function(i,n){
				var td = $("<td field='"+n.name+"' style='border-radius:0px;'><div><span></span></div></td>");
				var width = $("th[field='"+n.name+"']",self.tthDiv).width();
				$("div",td).width(width);
				if (n.name in data && i == 0){
					var icon = "";
					if (!data.leaf){
						icon = "<i class='icon-caret-down'></i>";
						$("div",td).css("cursor","pointer");
						tr.attr("leaf",false);
						if (data.url || data.type == 2){
							icon = "<i class='icon-link'></i>";
						}
					}else{
						icon = "<i class='icon-cog'></i>";
						tr.attr("leaf",true);
					}
					$("span",td).html(icon + "<label>" + data.name + "</label>").css("padding-left",(20 * parseInt(data.level))+"px");
					td.unbind("click").bind("click",function (e){
						self._leafClick.call(self,e, $(e.target).parents("tr"), data);
					});
				}else{
					if ($(td).attr("field") in data){
						$("span",td).html(data[$(td).attr("field")]);
					}
				}
				tr.append(td).data(data).attr({"pid":data.pid,"id":data.id});
				td.css({"border":"none","border-left":"1px solid #DDDDDD"});
				if (n.handler && $.isFunction(n.handler)){
					n.handler.call(self, data[$(td).attr("field")], data, $("div",td), tr);
					$("input,select,textarea",td).click(function (e){
						e.stopPropagation();
					})
				}
			});
			if (!appendNode){
				$("tbody",self.ttbDiv).append(tr);
			}else{
				$(appendNode,self.ttbDiv).after(tr);
			}
			if (tr.index() % 2 == 1){
				$("td",tr).css("background-color","#F9F9F9");
			}
		}
		if (data.children){
			$.each(data.children,function(i,n){
				self.addData.call(self,n,n.id);
			});
		}
	},
	getGrid: function (){
		return this.grid;
	},
	clear: function (){
		$("tbody",this.ttbDiv).empty();
	},
	getData: function (){
		return $("tr",this.ttbDiv).first().data();
	},
	resetData: function (data){
		$("tr",this.ttbDiv).first().data(data);
	},
	getLastId: function (data,lastId,fn){
		if (!lastId){
			lastId = 0;
		}
		if (!data.children || data.children.length == 0){
			if (fn && $.isFunction(fn)){
				fn.call(this,lastId);
				fn = null;
			}
		}
		if (data.children && data.children.length > 0){
			var lastData = data.children[data.children.length-1];
			this.getLastId(lastData,lastData.id,fn);
		}
	},
	_henderTemplet: function (){
		return $("<div class='ttHDiv'><table class='"+this.handerClass+"' style='width: auto;'><thead></thead></table></div>");
	},
	_bodyTemplet: function (){
		return $("<div class='ttBDiv' style='background-color:transparent;border-top:none;'><table class='"+this.handerClass+"' style='width: auto;'><tbody></tbody></table></div>");
	},
	_hender_body_tr: function (){
		return $("<tr></tr>");
	},
	_leafClick: function (e, tr, data){
		if (data.expand){
			this.collapse.call(this,e,tr,data);
		}else{
			this.expand.call(this,e,tr,data);
		}
	},
	//展开
	expand: function (e, tr, data){
		var self = this;
		data.expand = true;
		if (data.children){
			var id = data.id;
			$("i",e.target).removeClass("icon-caret-right");
			$("tr[pid='" + id + "']",this.ttBDiv).show();
		}
	},
	//收起
	collapse: function (e, tr, data){
		var self = this;
		data.expand = false;
		if (data.children){
			var id = data.id;
			$("i",e.target).addClass("icon-caret-right");
			$("tr[pid='" + id + "']",this.ttBDiv).hide();
			$("tr[pid='" + id + "'][leaf='false'] i",this.ttBDiv).addClass("icon-caret-right");
			$.each(data.children,function(i,n){
				self.collapse.call(self,e,tr,n);
			});
		}
	}
 });

 var defaults = {
	height: "auto",
	width: "auto",
	autoload: false,
	handerClass: "table table-bordered",
	renderTo: $(document.body)
}