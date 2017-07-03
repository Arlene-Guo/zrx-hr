
 function Search(node,config){
	 if(!(typeof(node)=="object")){
		 this.node=$(node);
	 }else{
		this.node = node;
	 }
	this.config = $.extend({
			 autoComplete: true,//自动把第一个符合的项赋给input
			 width: 400, //auto width
			 columnCount: 1, //默认的分栏数
			 url: "", //请求地址，若为本地搜索则置为"'或不作为config参数由控件默认
			 data:{},//传递过来的请求参数，如果没有url，将data数据作为源数据进行搜索(此时的数据格式必须为{xx:[{},{}],....}(此时默认取第一个数组)或{rows:[{},{}],....}}或[{},{}])
			 method: 'POST', //请求方法
			 dataType: 'text', // 返回的数据格式，支持json和text
			 page: 1, //当前页
			 count: 0, //总条数
			 searchArrayName:"",//本地搜索时的搜索名称，该配置仅在本地搜索及data为对象而非数组是有效，优先级高于data中默认的取数组规则
			 totalPage:1,//总页数，用于控制上一页下一页的显示，由控件自己计算取得
			 start: 0,//数据搜索的开始条数
			 limit: 10,//每页显示的数据条数
			 //kxp add usepager
			 usepager: true,//是否分页
			 //end
			 showKey:"text",//用于显示的key
			 //zk 搜索结果框右侧显示更多的额外信息
			 showTitle:"",
			 //end
			 showSplit:" ",//需要显示多个字段时的分隔符
			 searchParam:"",//后台请求时的文本框的参数，若没有则默认为输入框的name,对于给定的本地data搜索，可以有多个，用","隔开,如"a,b,c",若为url请求则只能是一个;
			 currPageTotal:10,//当前页显示的条数，仅用于显示，由控件计算得出，不作为config参数传递，传递过来也没有作用
			 selectedColor:'#3399FF',//选中内容的背景色
			 unSelectedColor:'#FFFFFF',//未选中的背景色
			 attrs:[],
			 top:30,//相对于input的位移
			 left:0,//相对于input的位移
			 background:"",//搜索结果div背景色,
			 noSearchKey:[33,34,37,38,39,40],//不执行查询操作的键值9,16,17,18,20,27,33,34,37,38,39,40,91,144
			 isMixCase:true,//本地搜索时是否区分大小写,默认区分
			 clickHandler:null,//选项单击事件
			 addSerParam: {}
		  },config);
	this.config.data.limit=this.config.limit;
	this.config.data.start=this.config.start;
	this.lastWord = '';
	this.init();
 }
 Search.prototype={
	init:function(){//搜索初始化
		var _searchSelf=this;
		_searchSelf.rows=[];
		_searchSelf.searchDiv=$(".ui_search_plugin_div");
		if(_searchSelf.searchDiv.length==0){
			_searchSelf.searchDiv=$("<div class='ui_search_plugin_div' style='max-height:220px;white-space:normal;display:none;z-index: 110000000; position: fixed;border:1px solid rgba(82, 168, 236, 0.8); border-radius:3px;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);outline: 0 none; word-wrap:break-word;width: "+_searchSelf.config.width+"px; background-color: #FFF;background:"+_searchSelf.config.background+"'/>");
			$("body").append(_searchSelf.searchDiv);
			_searchSelf.searchUl=$("<ul class='ui_search_plugin_ul unstyled' style='max-height:180px;overflow-y:auto;-moz-column-count:"+_searchSelf.config.columnCount+"'>");
			_searchSelf.searchUl.html("");
			_searchSelf.pageSpan=$("<div align='right' class='ui_search_plugin_wrap' style='text-align:right;margin-right:5px;'/>");
			_searchSelf.searchDiv.append(_searchSelf.searchUl).append(_searchSelf.pageSpan);
		}else{
			_searchSelf.searchUl=$(".ui_search_plugin_ul",_searchSelf.searchDiv);
			_searchSelf.pageSpan=$(".ui_search_plugin_wrap",_searchSelf.searchDiv);
		}
		_searchSelf.searchDiv.unbind("click").click(function(e){
			_searchSelf.node.focus();
			e.stopPropagation();
		});
		_searchSelf.scrollTop=0;
		var scrollFuc=function(){
			_searchSelf.scrollTop=(parseInt($(document).scrollTop()).toString()=="NaN"?0:parseInt($(document).scrollTop()));
			_searchSelf.searchDiv.css({
				left: _searchSelf.node.offset().left+_searchSelf.config.left,
				top: _searchSelf.node.offset().top+ _searchSelf.config.top-_searchSelf.scrollTop,
			});
		};
		_searchSelf.node.unbind('focus').focus(function(e){
			$(document).unbind("scroll",scrollFuc);
			$(document).bind("scroll",scrollFuc);
		});
		function setAttrs(data,obj){
			obj=obj||_searchSelf.node;
			$.each(_searchSelf.config.attrs,function(i,n){
				obj.attr(n,data[n]);
			});
		}
		function removeAttrs(){
			$.each(_searchSelf.config.attrs,function(i,n){
				_searchSelf.node.removeAttr(n);
			});
		}
		_searchSelf.isNewSearch=true;//分页时是否首次搜索标记，主要用于分页
		_searchSelf.preKeyWord="";//分页时的搜索内容，作用为由于鼠标悬停时造成文本框内容变化，分页时会出错

		//zhouhai:延时一段时间执行请求，防止每次按键都请求
		var t;
		_searchSelf.node.unbind('keyup').keyup(function(e){
			//zhouhai
			_searchSelf.node.unbind('blur',blurFunc);
			//end
			if(t != 'undefined'){
				clearTimeout(t);
			}
			//按键前后文本内容不一样才发送请求
			if(_searchSelf.lastWord != _searchSelf.node.val() || e.keyCode==13){
				t = setTimeout(function(){searchAction(e)}, 300);
			}

		});

		function searchAction(e){
			var keycode=e.keyCode;
			var searchFlag=true;
			var noSearchKeyLength=0;
			noSearchKeyLength=_searchSelf.config.noSearchKey.length;
			if(noSearchKeyLength>0){
				for(var i=0;i<noSearchKeyLength;i++){
					if(keycode==_searchSelf.config.noSearchKey[i]){
						searchFlag=false;
						break;
					};
				}
			}
			if(keycode==13){
				if($("li[isFocus=true]",_searchSelf.searchUl).length>0){
					searchFlag=false;
					_searchSelf.searchDiv.hide();
					$("li[isFocus=true]",_searchSelf.searchUl).removeAttr("isFocus");
				}
			}
			preNextPress(keycode);//上下翻页
			if(searchFlag){
				_searchSelf.isNewSearch=true;
				_searchSelf.preKeyWord="";
				_searchSelf.searchUl.empty();
				_searchSelf.rowData={};
				removeAttrs();
				_searchSelf.node.data=_searchSelf.rowData;
				_searchSelf.rows=[];
				_searchSelf.searchDiv.css({
					left: _searchSelf.node.offset().left+_searchSelf.config.left,
					top: _searchSelf.node.offset().top+ _searchSelf.config.top-_searchSelf.scrollTop,
				});
				$(document).scroll();
				searchAjax(1);//重新搜索
			}
			_searchSelf.node.focus();
			_searchSelf.lastWord = _searchSelf.node.val();
		}

		$(window).unbind('click',windowClick).bind("click",windowClick);
		function windowClick(){
			if(_searchSelf.searchDiv){
				_searchSelf.searchDiv.hide();
			}
		}
		//回车自动选择
		var keyupVar=function(e){
			if(e.keyCode==13 && $(".ui_search_plugin_div").css("display")!="none"){
				if($("li",$(".ui_search_plugin_div")).length>0 && $.isEmptyObject(_searchSelf.getCurrentRow())){
					$("li:eq(0)",$(".ui_search_plugin_div")).mousemove();
					$(".ui_search_plugin_div").hide();
				}else if(!$.isEmptyObject(_searchSelf.getCurrentRow())){
					$(".ui_search_plugin_div").hide();
				}
			}
		};
		_searchSelf.node.bind("keyup",function(e){
			keyupVar(e);
		});
		function blurFunc(){
			_searchSelf.node.unbind("keyup",keyupVar);
		}
		_searchSelf.node.unbind('blur',blurFunc).bind('blur',blurFunc);
		_searchSelf.node.unbind('keydown').keydown(function(e){//输入框keydown触发,触发上下键快捷选择
			upDownPress(e.keyCode);
		}).click(function(e){
			e.stopPropagation();
		});//pagedown,pageup快捷操作
		function preNextPress(keycode){//pagedown,pageup快捷操作
			if(keycode==33 || keycode==34){
				var pageNode=$("a[class="+((keycode==33?"pre":"next")+"a")+"]",_searchSelf.pageSpan);
				if(pageNode && (pageNode.css("display"))!="none"){
					pageNode.click();
				}
			}
		}
		function upDownPress(keycode){//上下键快捷操作
			if(keycode==40 || keycode==38){
				var lis=$("li",_searchSelf.searchUl);
				var indexOfFocus=0;
				var lengthOfLis=lis.length;
				if(lis.length==0)return;
				for(indexOfFocus;indexOfFocus<lengthOfLis;indexOfFocus++){
					if("true"==$(lis[indexOfFocus]).attr("isFocus") || true==$(lis[indexOfFocus]).attr("isFocus")){
						break;
					}
				}
				var selectIndex;//下一个下标位置
				if(keycode==38){//上键
					if(indexOfFocus==lengthOfLis || indexOfFocus==0){//获取到的数据还没有被选中或选中的是第一个，则下一个选中的为最后一个
						selectIndex=lengthOfLis-1;
					}else{
						selectIndex=indexOfFocus-1;
					};
				}else if(keycode==40){//下键
					if(indexOfFocus==lengthOfLis || indexOfFocus==lengthOfLis-1){//获取到的数据还没有被选中的或被选中的为最后一个，则下一个是第一个
						selectIndex=0;
					}else{
						selectIndex=indexOfFocus+1
					}
				}
				lis.css("background-color",_searchSelf.config.unSelectedColor);
				lis.attr("isFocus","false");
				$(lis[selectIndex]).css("background-color",_searchSelf.config.selectedColor);
				$(lis[selectIndex]).attr("isFocus","true");
				$(lis[selectIndex]).focus(function (e){
					$(e.target).parent().scrollTop(0);
					$(e.target).parent().scrollTop(e.target.offsetTop-($(e.target).height()+10));
				}).focus();
				_searchSelf.rowData=_searchSelf.rows[selectIndex];
				setAttrs(_searchSelf.rowData);
				_searchSelf.node.data=_searchSelf.rowData;
				_searchSelf.node.val(splitShowKey(_searchSelf.rowData));
			}
			_searchSelf.node.focus();
		}
		function splitShowKey(selectData){
			var showkeys=_searchSelf.config.showKey.split(",");
			var returnStr="";
			var showKeysLength=showkeys.length;
			if(showKeysLength==0){
				return;
			}else{
				$.each(showkeys,function(i,n){
					if(i==showKeysLength-1){
						returnStr=returnStr+selectData[n];
					}else{
						returnStr=returnStr+selectData[n]+_searchSelf.config.showSplit;
					}
				});
			}
			return returnStr;
		}
		//zk 处理额外信息，额外信息选择时不带入input框内
		function splitShowTitle(selectData){
			var showTitle=_searchSelf.config.showTitle.split(",");
			var returnStr="";
			var showTitleLength=showTitle.length;
			if(showTitleLength==0){
				return;
			}else{
				$.each(showTitle,function(i,n){
					if(i==showTitleLength-1){
						returnStr=returnStr+selectData[n];
					}else{
						returnStr=returnStr+selectData[n]+_searchSelf.config.showSplit;
					}
				});
			}
			return returnStr;
		}
		//end
		function searchAjax(page){//数据搜索
			_searchSelf.searchUl.empty();//清空结果
			_searchSelf.searchDiv.show();
			_searchSelf.config.page=page?page:1;
			_searchSelf.pageSpan.hide();//隐藏页数等信息
			if(!(_searchSelf.node.val() && _searchSelf.node.val().length>0)){
				_searchSelf.searchDiv.hide();
				return;
			}
			if(!_searchSelf.config.searchParam || _searchSelf.config.searchParam.length==0){//搜索参数
				_searchSelf.config.searchParam=_searchSelf.node.attr("name");
			}
			if(_searchSelf.config.url.length>0){//是url请求
				_searchSelf.config.data.start=(_searchSelf.config.page-1)*_searchSelf.config.limit;
				if(_searchSelf.isNewSearch || (!_searchSelf.preKeyWord || _searchSelf.preKeyWord.length==0)){
					_searchSelf.preKeyWord=_searchSelf.node.val();
					_searchSelf.isNewSearch=false;
					//zhangke 提交的数据去除前后空格
					_searchSelf.config.data[_searchSelf.config.searchParam]=$.trim(_searchSelf.node.val());
				}else{
					_searchSelf.config.data[_searchSelf.config.searchParam]=$.trim(_searchSelf.preKeyWord);
					//end
				}
				//kxp edit
				var data = $.extend(true,_searchSelf.config.data,_searchSelf.config.addSerParam)
				if (!_searchSelf.config.usepager){
					delete data.limit,
					delete data.start
				}

				Ajax.request({
					url: _searchSelf.config.url,
					data: data,
					type: "GET",
					listener:{
						beforerequest: function (){
							var div = _searchSelf.searchDiv;
							if ($(".load",_searchSelf.searchDiv).size() == 0){
								$("ul",_searchSelf.searchDiv).empty();
								div.append("<span class='load' style='margin:5px 5px 10px 5px;'>正在读取数据....</span>");
							}else{
								$(".load",_searchSelf.searchDiv).text('正在读取数据....');
							}
						},
						beforesuccess: function (data,type){
							$("ul",_searchSelf.searchDiv).empty();
						},
						success: function (json){
							if (json.success){
								//kxp edit add config.resultField,resultData: data:{"keyname":[.....]}
								//zhouhai: avoid firebug's error
								if(json.data){
									//by yl用全局变量_searchSelf.jsondata
									var jsondata = json.data;
									if (_searchSelf.config.resultField){
										jsondata = json.data[_searchSelf.config.resultField]
									}
									_searchSelf.jsondata = jsondata;
									resetDiv({
										count: json.data.length,
										rows: jsondata
									});

									//zhouhai:blur的时候自动把第一个值补上
									if(_searchSelf.config.autoComplete){
										//by yl用全局变量_searchSelf.jsondata
										setFirstValueToNode(_searchSelf.jsondata);
									}

									//end
									$(".load",_searchSelf.searchDiv).remove();
								}else{
									$(".load",_searchSelf.searchDiv).text('无相关数据');
								}
							}
						}
					}
				});
			}else{//给定data搜索，不用请求后台
				var searchResourceRows=[];//被搜索的本地源数据
				if(!(_searchSelf.config.data instanceof Array)){//源数据是json对象
					if(_searchSelf.config.searchArrayName && _searchSelf.config.searchArrayName.length>0){//有指定的取数组的key,取指定的数组作为搜索源
						searchResourceRows=_searchSelf.config.data[_searchSelf.config.searchArrayName]?_searchSelf.config.data[_searchSelf.config.searchArrayName]:[];
					}else{
						if("undefined"==_searchSelf.config.data.rows || !(_searchSelf.config.data.rows instanceof Array)){//不含rows或rows不是数组，寻找对象中的数据作为搜索源数据
							for(var i in _searchSelf.config.data){
								if(_searchSelf.config.data[i] instanceof Array){//第一个是数组的元素作为源数据进行搜索
									searchResourceRows=_searchSelf.config.data[i];
									break;
								}
							}
						}else{//含有rows数组，将rows作为源数据
							searchResourceRows=_searchSelf.config.data.rows;
						}
					}
				}else{//源数据是数组
					searchResourceRows=_searchSelf.config.data;
				}
				resetDiv(localSearch(searchResourceRows));//执行本地搜索，并显示搜索的结果
			}
		}
//zhouhai:
		function setFirstValueToNode(data){
			_searchSelf.node.unbind("blur",func).bind("blur",func);
			function func(){
				if($.isEmptyObject(_searchSelf.node.data)){
					if(_searchSelf.node.val() != ''){
						//此处的data是第一次搜索时的data，之后搜索的数据不取代此data，用_searchSelf.jsondata代替，by yl

						_searchSelf.node.val(splitShowKey(_searchSelf.jsondata[0]));
						_searchSelf.rowData=_searchSelf.jsondata[0];
						setAttrs(_searchSelf.rowData);
						_searchSelf.node.data=_searchSelf.rowData;
						//by yhj
						_searchSelf.lastWord = _searchSelf.node.val();
					}
				}
			}
		}


		function localSearch(rsRows){//非url请求,本地搜索
			var localSearchObj={count:0,rows:[]};
			var searchResultRows=[];//搜索出来的符合结果的数据
			var returnRows=[];//经过分页后的数据，用于返回
			if(_searchSelf.config.searchParam.length==0){
				return localSearchObj;
			}
			var localSearchKeys=_searchSelf.config.searchParam.split(",");//要模糊搜索的key
			var currentSearchKey;
			if(_searchSelf.isNewSearch || (!_searchSelf.preKeyWord || _searchSelf.preKeyWord.length==0)){
				_searchSelf.preKeyWord=_searchSelf.node.val();
				_searchSelf.isNewSearch=false;
				currentSearchKey=_searchSelf.node.val();
			}else{
				currentSearchKey=_searchSelf.preKeyWord;
			}
			if(!_searchSelf.config.isMixCase){
				currentSearchKey=currentSearchKey.toUpperCase();
			}
			for(var i=0;i<rsRows.length;i++){
				for(var j=0;j<localSearchKeys.length;j++){
					if(rsRows[i][localSearchKeys[j]]){
						if(!_searchSelf.config.isMixCase){
							rsRows[i][localSearchKeys[j]]=rsRows[i][localSearchKeys[j]].toString().toUpperCase();
						}
						if(rsRows[i][localSearchKeys[j]].indexOf(currentSearchKey)>=0){
							searchResultRows.push(rsRows[i]);
							break;
						}
					}
				}
			}
			localSearchObj.count=searchResultRows.length;
			var beginIndex=(_searchSelf.config.page-1)*_searchSelf.config.limit;
			var endIndex=_searchSelf.config.page*_searchSelf.config.limit;
			if(searchResultRows.length>0){
				for(beginIndex;beginIndex<searchResultRows.length && beginIndex<endIndex;beginIndex++){
					returnRows.push(searchResultRows[beginIndex]);
				}
			}
			localSearchObj.rows=returnRows;
			return localSearchObj;
		}

		function resetDiv(obj){//根据搜索结果重置div
//			if(_searchSelf.config.dataType!="json"){//如果数据格式不是json格式则将数据格式转换为json格式
//				obj=JSON.encode(obj);
//			}
			_searchSelf.config.count=obj.count?obj.count:0;
			if(_searchSelf.config.count>0){
				var modTotalPage=_searchSelf.config.count%_searchSelf.config.limit;//取余计算页数
				if(modTotalPage==0){
					_searchSelf.config.totalPage=parseInt(_searchSelf.config.count/_searchSelf.config.limit);
				}else{
					_searchSelf.config.totalPage=parseInt(_searchSelf.config.count/_searchSelf.config.limit)+1;
				}
			}else{//总记录数为0，将总页数重置为1
				_searchSelf.config.totalPage=1;
			}
			_searchSelf.pageSpan.empty();
			_searchSelf.pageSpan.show();//展示页数信息
			$("a",_searchSelf.pageSpan).unbind("click");
			if(obj.rows && obj.rows.length>0){//对搜索结果进行展示
				_searchSelf.rows=obj.rows;
				_searchSelf.config. currPageTotal=obj.rows.length;//当前页总条数
				var indexOf=0;
				$.each(obj.rows,function(i,n){
					var searchLi=$("<li style='padding:5px;'>");
					searchLi.click(function(e){
						e.stopPropagation();
						_searchSelf.searchDiv.hide();
						_searchSelf.node.val(splitShowKey(n));
						_searchSelf.rowData=n;
						setAttrs(_searchSelf.rowData);
						_searchSelf.node.data=_searchSelf.rowData;
						if(_searchSelf.config.clickHandler!=null)
						_searchSelf.config.clickHandler();
					});
					if(indexOf==0){
						searchLi.css({"background-color":"#0088CC"});
					}
					indexOf++;
//					searchLi.keyup(function(e){
//						$(this).css("background-color","blue");
//					});
					searchLi.mousemove(function(e){
						$("li",_searchSelf.searchUl).css("background-color",_searchSelf.config.unSelectedColor);
						$("li",_searchSelf.searchUl).attr("isFocus","false");
						_searchSelf.node.val(splitShowKey(n));

						$(this).css("background-color",_searchSelf.config.selectedColor);
						$(this).attr("isFocus","true");
						_searchSelf.rowData=n;
						setAttrs(_searchSelf.rowData);
						_searchSelf.node.data=_searchSelf.rowData;
					});
					setAttrs(n,searchLi);
					searchLi.append(splitShowKey(n));
					//zk 给信息框添加一个显示额外信息的span框
					if(_searchSelf.config.showTitle !== ""){
						var _showTitle = splitShowTitle(n);
						var span = $("<span>" + _showTitle +"</span>");
						span.css({
							"float":"right",
							"text-align":"right",
							"color":"#5E5E5E"
						});
						searchLi.append(span);
					}
					//end
					_searchSelf.searchUl.append(searchLi);
					if(i==0){
						searchLi.focus();
					}
				 });
				 //kxp add
				 if (!_searchSelf.config.usepager){
					return false;
				 }
				 //end
				var prea=$("a[class=prea]",_searchSelf.searchDiv);//上一页按钮
				if(!prea || prea.length==0){
					prea=$("<a class='prea' style='padding-left:5px;'>");
				}
				prea.css("display","none");
				prea.html("上一页").click(function(e){//上一页事件触发
					_searchSelf.node.focus();
					_searchSelf.config.page=_searchSelf.config.page-1;
					searchAjax(_searchSelf.config.page);
				});
				if(_searchSelf.config.page>1&&_searchSelf.config.totalPage>1){//当前为大于第一页时展示上一页按钮
					prea.css("display","inline");
				}
				var nexta=$("a[class=nexta]",_searchSelf.searchDiv);//下一页按钮
				if(!nexta || nexta.length==0){
					nexta=$("<a class='nexta' style='padding-left:5px;'>");
				}
				nexta.css("display","none");
				if(_searchSelf.config.totalPage>1&&(_searchSelf.config.page<_searchSelf.config.totalPage)){//当前页小于总页数时展示下一页按钮
					nexta.css("display","inline");
				}
				nexta.html("下一页").click(function(e){//下一页事件触发，显示上一页按钮
					_searchSelf.node.focus();
					_searchSelf.config.page=_searchSelf.config.page+1;
					searchAjax(_searchSelf.config.page);
				});
				_searchSelf.pageSpan.append("第"+_searchSelf.config.page+"页").append(prea).append(nexta).append("<span name='searchCount' style='padding-left:5px'>共"+_searchSelf.config.count+"条</span>");
//				_searchSelf.pageSpan.append("当前第"+_searchSelf.config.page+"页"+"("+((_searchSelf.config.page-1)*_searchSelf.config.limit+1)+"-"+((_searchSelf.config.page-1)*_searchSelf.config.limit+_searchSelf.config.currPageTotal)+")").append(prea).append(nexta).append("<span name='searchCount' style='padding-left:5px'>共"+_searchSelf.config.count+"条</span>");
			}else{
				_searchSelf.pageSpan.append("<center style='color:red'>没有符合条件的结果</center>");
				//by yl 当无数据返回的时候将字段默认为-1
				var configArr ={};
				 $.each(_searchSelf.config.attrs,function(i,n){
				 	configArr[n]=-1;
				}); 
				setAttrs(configArr);
			}
		}
	},
	getCurrentRow:function(){//获取当前选中的数据的row，json对象
		return this.rowData?this.rowData:{};
	},
	getAllRows:function(){//获取当前搜索结果的rows，json数组
		return this.rows?this.rows:[];
	},
	getDiv:function(){
		return this._searchDiv;
	}
 }