/**
 * jquery spots category tree for product
 * by liqing3	2012.6.30
 */
if(typeof jQuery != 'undefined'){
	jQuery.fn.extend({
		SpotCategory:function(opt){
			//register global cache
			if (undefined == window.cache) {
				window.cache = {};
			}
			var CHINACODE = '40002';
			var ASIACODE = '3900'
			if(this.length == 0 || this.length > 1) return false;
			var DEFAULTOPTION = {
				//元素ID前缀
				PREFIX:'spotcat',
				//是否增加前三级内容默认显示 不通过接口查询 
				SHOWFLAG: false,
				//是否多选
				MULTIPLE:false,
				//已选的景点ID，可以是以半角逗号分隔的ID字符串
				SELECTED:-1,
				//已选的地区CODE，如果单选已经选择了景点ID，则地区CODE忽略。
				SELECTEDCODE:-1,
				//是否是产品
				ISPRODUCT:0,
				//景点下拉列表框的宽度，只对多选的情况有效
				WIDTH:250,
				//景点下拉列表框的高度，只对多选的情况有效
				HEIGHT:100,
				//接口访问的域名
				DOMAIN:'www.tuniu.com',
				SPOTDDCALLBACK: '',
				//大洲提示title
				DEFTITLE_CONTINENT:'选择洲',
				//国家提示title
				DEFTITLE_COUNTRY:'选择国家',
				//省份提示title
				DEFTITLE_PROVINCE:'选择省',
				//市提示title
				DEFTITLE_CITY:'选择市',
				//区/县提示title
				DEFTITLE_COUNTY:'选择区/县',
				//街道提示title
				DEFTITLE_STREET:'选择街道',
				//景点提示title
				DEFTITLE_SPOT:'选择景点',
				//景点匹配显示title   18165146 2012年07月18日 16:51:46 kxp
				SEARCH_SPOT: '景点匹配：',
				//城市景点选择title   18165147 2012年07月18日 16:51:47 kxp
				CITY_SPOT: '省市选择：',
				CHINANAME:'中国',
				//autocomplate显示的ul的高度，大于300无效
				SEARCH_UL_HEIGHT: '300',
				//提取出公共路径
				API_PATH: '/guide/api/',
				//是否自动显示模糊搜索下拉框
				SHOW_SEARCH_RES: 1,
				//kxp add noSearchKey  18143647 2012年07月18日 14:36:47 kxp
				noSearchKey: [9,16,17,18,20,27,33,34,37,38,39,40,91,144]
			};
			this.callbackfunc  = function(){
				if (DEFAULTOPTION['SPOTDDCALLBACK'] && $.isFunction(DEFAULTOPTION['SPOTDDCALLBACK'])) {
					DEFAULTOPTION['SPOTDDCALLBACK']();
				}
			};
			for(var i in opt) DEFAULTOPTION[i] = opt[i];
			/*********************//*********************//*********************/
			this.search_div = $('<div style="position:relative; width:400px;" id="spot_search_div"></div>');
			this.search_span = $("<div></div>");
			this.search_ip = $('<input style="margin:5px 0;" autocomplete="off"/>')
													 .attr('id', DEFAULTOPTION['PREFIX'] + '_search')
													 .attr('name',DEFAULTOPTION['PREFIX'] + '_search');
			this.search_span.append("<span style='font-size:13px;'>"+DEFAULTOPTION.SEARCH_SPOT+"</span>")
			.append(this.search_ip);
			this.search_res = $('<ul style="display:none; position: absolute;z-index:99;margin: 16px 0; min-width: 153px;max-width: 300px; max-height:'+ DEFAULTOPTION["SEARCH_UL_HEIGHT"] +'px;background: none repeat rgb(255, 255, 255); top: 10px; border: 1px solid #D2DEEA; padding-left: 0px; left: 65px;"></ul>')
												 	 .attr('id', DEFAULTOPTION['PREFIX'] + '_search_res')
													 .attr('name',DEFAULTOPTION['PREFIX'] + '_search_res');
			/*********************//*********************//*********************/
			this.continent_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_continent')
													 .attr('name',DEFAULTOPTION['PREFIX'] + '_continent')
													 .append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_CONTINENT']+"</option>")
													 .append("<option value='3900'>亚洲</option>")
													 .append("<option value='3600'>欧洲</option>")
													 .append("<option value='3700'>北美洲</option>")
													 .append("<option value='3800'>南美洲</option>")
													 .append("<option value='4000'>非洲</option>")
													 .append("<option value='4100'>大洋洲</option>")
													 .append("<option value='44994'>南极洲</option>");
			this.country_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_country')
													.attr('name',DEFAULTOPTION['PREFIX'] + '_country')
													.append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_COUNTRY']+"</option>");
			this.province_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_province')
													 .attr('name',DEFAULTOPTION['PREFIX'] + '_province')
													 .append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_PROVINCE']+"</option>");
			this.city_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_city')
												 .attr('name',DEFAULTOPTION['PREFIX'] + '_city')
												 .append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_CITY']+"</option>");
			this.county_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_county')
												 .attr('name',DEFAULTOPTION['PREFIX'] + '_county')
												 .append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_COUNTY']+"</option>");
			this.street_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_street')
												 .attr('name',DEFAULTOPTION['PREFIX'] + '_street')
												 .append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_STREET']+"</option>");

			$(this).replaceWith(this.search_div);
			//调整顺序
			this.search_div.append(this.search_span).append(this.search_res)
							 .before(this.continent_dd)
							 .before(this.country_dd)
							 .before(this.province_dd)
							 .before(this.city_dd)
							 .before(this.county_dd)
							 .before(this.street_dd);
			this.continent_dd.before($("<span style='font-size:13px;'>"+DEFAULTOPTION.CITY_SPOT+"</span>"));
			//kxp add search config false ---> hide, default is true 19112534 2012年07月19日 11:25:34 kxp
			if (!DEFAULTOPTION['SEARCH']){
				this.search_ip.hide();
				this.search_ip.prev().hide();
				$(".br").hide();
			}
			//多选
			if (DEFAULTOPTION['MULTIPLE']) {
				this.spot_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_spot')
													 .attr('name',DEFAULTOPTION['PREFIX'] + '_spot')
													 .attr('multiple', 1)
													 .css('width', DEFAULTOPTION['WIDTH'] + 'px')
													 .css('height', DEFAULTOPTION['HEIGHT'] + 'px');
				this.mulselect_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_mulselect')
														  .attr('name',DEFAULTOPTION['PREFIX'] + '_mulselect')
														  .attr('multiple', 1)
														  .css('width', DEFAULTOPTION['WIDTH'] + 'px')
														  .css('height', DEFAULTOPTION['HEIGHT'] + 'px');
				this.add_cat = $('<input value="&gt;&gt;" id="'+DEFAULTOPTION['PREFIX']+'_addcat" type="button"/>');
				this.del_cat = $('<input value="&lt;&lt;" id="'+DEFAULTOPTION['PREFIX']+'_delcat" type="button"/>');
				$('<table><tr><td class="spot_td"></td><td class="btn_td"></td><td class="mulselect_td"></td></tr></table>')
					.attr('id', DEFAULTOPTION['PREFIX'] + '_spotwrapper')
					.attr('class', DEFAULTOPTION['PREFIX'] + '_spotwrapper')
					.find('.spot_td').append(this.spot_dd).end()
					.find('.btn_td').append(this.add_cat)
									.append('<br /><br />')
									.append(this.del_cat)
									.end()
					.find('.mulselect_td').append(this.mulselect_dd).end()
					.insertAfter(this.search_ip);

				this.add_cat.unbind('click').bind('click', function(){
					var cat_part = sthis.spot_dd.val();
					var pcodes = [];
					$.each(sthis.mulselect_dd.find("option"), function(i, item){
						pcodes.push($(item).attr("pcodes"))
					});
					if (cat_part) {
						var cat_part_len = cat_part.length;
						for(var i=0;i<cat_part_len;i++){
							var cat = cat_part[i];
							if (-1 != cat) {
								var cat_id = cat_part[i];
								var cat_name = sthis.spot_dd.find("option[value='" + cat_id + "']").text();
								var length = sthis.mulselect_dd.get(0).options.length;
								var selected_exist = sthis.mulselect_dd.find("option[value='" + cat_id + "']").length;
								if(selected_exist==0){
									sthis.initialSpot(cat_id);
								}
							}
							if(DEFAULTOPTION['SHOWFLAG']){
								$.each($(sthis.spot_dd.find("option[value='" + cat + "']")), function(i, item){
									if($(item).attr("showflag") == "areaShow"){
										var temp = $(item).clone();
									    if ($.inArray($(item).attr("pcodes"), pcodes ) == -1){
											sthis.mulselect_dd.append(temp);
									    }
									}
								});
							}
						}
					}
					sthis.callbackfunc();
				});
				this.del_cat.unbind('click').bind('click', function(){
					var cat_part = sthis.mulselect_dd.val();
					var pcodes = [];
					$.each(sthis.mulselect_dd.find("option:selected"), function(i, item){
						pcodes.push($(item).attr("pcodes"))
					});
					if (cat_part) {
						var cat_part_len = cat_part.length;
						for(var i=0;i<cat_part_len;i++){
							if(cat_part[i] == -1 && DEFAULTOPTION['SHOWFLAG']){
								sthis.mulselect_dd.find('option[pcodes="'+ pcodes[i] +'"]').remove();
							}else{
								sthis.mulselect_dd.find('option[value='+cat_part[i]+']').remove();
							}
							if($(".mainArea",sthis.continent_dd.parent().parent()).attr("pcodes")==pcodes[i]||$(".mainArea",sthis.continent_dd.parent().parent()).attr("pcodes")==cat_part[i]){
								$(".mainArea",sthis.continent_dd.parent().parent()).attr("title","").val("").attr("pcodes","");
							}						}
					}
					sthis.callbackfunc();
				});
			} else {
				//单选
				this.spot_dd = $('<select></select>').attr('id', DEFAULTOPTION['PREFIX'] + '_spot')
													 .attr('name',DEFAULTOPTION['PREFIX'] + '_spot')
													 .css('margin-left','65px')
													 .css('margin-top','5px')
													 .append("<option value='-1'>"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
				this.street_dd.after(this.spot_dd).after('<div></div');
			}
			//重置下拉列表
			this.initialAreaList = function(selobj, json, deftitle, bol_spot, isShowParents) {
				if (deftitle) {
					selobj.empty().append("<option value=\"-1\">" + deftitle + "</option>").show();
					if(isShowParents && DEFAULTOPTION["SHOWFLAG"]){
						var secondName = "", secondValue = "";
					
						var continent = sthis.continent_dd.find("option:selected").val() > 0 ? sthis.continent_dd.find("option:selected").text() : '' ;
						var country = sthis.country_dd.find("option:selected").val() > 0 ? "--" + sthis.country_dd.find("option:selected").text() : '' ;
						var province = sthis.province_dd.find("option:selected").val() > 0 ? "--" + sthis.province_dd.find("option:selected").text()  : '' ;
						var city = sthis.city_dd.find("option:selected").val() > 0 ? "--" + sthis.city_dd.find("option:selected").text() : '';
						var county = sthis.county_dd.find("option:selected").val() > 0 ? "--" + sthis.county_dd.find("option:selected").text() : '';
						var street = sthis.street_dd.find("option:selected").val() > 0  ? "--" + sthis.street_dd.find("option:selected").text() : '';

						var continent_code = sthis.continent_dd.find("option:selected").val() + "|";
						var country_code = sthis.country_dd.find("option:selected").val() + "|";
						var province_code = sthis.province_dd.find("option:selected").val() + "|";
						var city_code = sthis.city_dd.find("option:selected").val() ? sthis.city_dd.find("option:selected").val() + "|" : "-1|";
						var county_code = sthis.county_dd.find("option:selected").val() ? sthis.county_dd.find("option:selected").val() + "|" : "-1|";
						var street_code = sthis.street_dd.find("option:selected").val() ? sthis.street_dd.find("option:selected").val() + "|" : "-1|";
						
						secondName = continent + country + province + city + county + street ;
						secondValue = continent_code + country_code + province_code + city_code + county_code + street_code + "-1";

						selobj.append("<option  showflag='areaShow' title='"+secondName+"' value=\"" + "-1" + "\"  nm=\"" + "" + "\" pcodes=\"" + secondValue + "\" >" + secondName + "</option>");
					}
				}
				for (index in json) {
					if (!$.isFunction(json[index])) {
						var name = json[index].name;
						var pcodes ='';
						//kxp add arguments isShowProvince 24215436 2012年07月24日 21:54:36 kxp
						if (isShowParents){
							var continent = json[index].continent_name ? json[index].continent_name + "--" : '';
							var country = json[index].country_name ? json[index].country_name + "--" : '';
							var province = json[index].province_name ? json[index].province_name + "--" : "";
							var city = json[index].city_name ? json[index].city_name+"--" : "";
							var county = json[index].county_name ? json[index].county_name+"--" : "";
							var street = json[index].street_name ? json[index].street_name+"--" : "";
							
							var continent_code = json[index].continent_code ? json[index].continent_code + "|" : "-1";
							var country_code = json[index].country_code ? json[index].country_code + "|" : '';
							var province_code = json[index].province_code ? json[index].province_code + "|" : "-1";
							var city_code = json[index].city_code ? json[index].city_code+"|" : "-1";
							var county_code = json[index].county_code ? json[index].county_code+"|" : "-1";
							var street_code = json[index].street_code ? json[index].street_code+"|" : "-1";
							
							name = continent + country + province + city + county + street + json[index].name;
							pcodes = continent_code + country_code + province_code + city_code + county_code + street_code + json[index].id;
						}
						var val = bol_spot ? json[index].id + "_" + name : json[index].id;
						selobj.append("<option title='"+name+"' value=\"" + val + "\"  nm=\"" + json[index].name + "\" pcodes=\"" + pcodes + "\" >" + name + "</option>");
					}
				}
				selobj.show();
			};
			var sthis = this;
			//洲
			this.continent_dd.bind('change', function(){
				var newvalue = sthis.continent_dd.val();
				sthis.search_ip.val("");//18165128 2012年07月18日 16:51:28 kxp
				sthis.country_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_COUNTRY']+"</option>");
				sthis.province_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_PROVINCE']+"</option>");
				sthis.city_dd.empty().hide();
				sthis.county_dd.empty().hide();
				sthis.street_dd.empty().hide();
				sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
				sthis.callbackfunc();
				//reset
				if(-1 == newvalue) {

				} else {
					if (undefined == cache.countrylist || undefined == cache.countrylist[newvalue]) {
						$.ajax({
							type:"GET",
							dataType:"json",
							data:{"type":"city", "code": newvalue},
							url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH']+ "searchajax",
							success:function(json){
								regionlist = json.region;
								//if Asia, add China
								if (ASIACODE == newvalue) {
									regionlist[regionlist.length] = {id: CHINACODE, name: DEFAULTOPTION['CHINANAME']};
									regionlist.reverse();
								}
								if (undefined == cache.countrylist) {
									cache.countrylist = [];
								}
								cache.countrylist[newvalue] = json;
								sthis.initialAreaList(sthis.country_dd,cache.countrylist[newvalue].region,DEFAULTOPTION['DEFTITLE_COUNTRY']);

								if (CHINACODE != sthis.country_dd.val()) {
									sthis.initialAreaList(sthis.spot_dd,cache.countrylist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'],false,true);
									sthis.callbackfunc();
								}
							}
						});
					} else {
						sthis.initialAreaList(sthis.country_dd,cache.countrylist[newvalue].region,DEFAULTOPTION['DEFTITLE_COUNTRY']);
						sthis.initialAreaList(sthis.spot_dd,cache.countrylist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'],false,true);
						sthis.callbackfunc();
					}
				}
			});
			//国家
			this.country_dd.bind("change", function(){
				var newvalue = sthis.country_dd.val();
				sthis.search_ip.val("");//18165107 2012年07月18日 16:51:07 kxp
				sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
				sthis.province_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_PROVINCE']+"</option>");
				sthis.city_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_CITY']+"</option>");
				sthis.county_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_COUNTY']+"</option>");
				sthis.street_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_STREET']+"</option>").hide();
				sthis.callbackfunc();
				//reset
				if (-1 == newvalue) {
					if('3900' != sthis.continent_dd.val()){
						sthis.continent_dd.change();
					}
				} else if (CHINACODE != newvalue) {
					sthis.city_dd.hide();
					sthis.county_dd.hide();
					sthis.street_dd.hide();
					if(undefined == cache.spotlist || undefined == cache.spotlist[newvalue]) {
						$.ajax({
							type:"GET",
							dataType:"json",
							data:{"type":"spot", "code":newvalue},
							url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
							success:function(json){
								if (undefined == cache.spotlist) {
									cache.spotlist = [];
								}
								if (undefined == cache.provincelist) {
									cache.provincelist = [];
								}
								cache.provincelist[newvalue] = json.region;
								cache.spotlist[newvalue] = json.spots;
								sthis.initialAreaList(sthis.province_dd,cache.provincelist[newvalue],DEFAULTOPTION['DEFTITLE_PROVINCE']);
								sthis.initialAreaList(sthis.spot_dd,cache.spotlist[newvalue],DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
								sthis.callbackfunc();
							}
						});
					} else {
						sthis.initialAreaList(sthis.province_dd,cache.provincelist[newvalue],DEFAULTOPTION['DEFTITLE_PROVINCE']);
						sthis.initialAreaList(sthis.spot_dd,cache.spotlist[newvalue],DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
						sthis.callbackfunc();
					}
				} else {
					//china
					sthis.city_dd.empty().show().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_CITY']+"</option>");
					sthis.county_dd.empty().show().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_COUNTY']+"</option>");
					sthis.street_dd.empty().show().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_STREET']+"</option>");
					if(undefined == cache.provincelist || undefined == cache.provincelist[CHINACODE]) {
						$.ajax({
							type:"GET",
							dataType:"json",
							data:{"type":"province"},
							url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
							success:function(json){
								if (undefined == cache.provincelist) {
									cache.provincelist = [];
								}
								cache.provincelist[CHINACODE] = json.region_province;
								sthis.initialAreaList(sthis.province_dd,cache.provincelist[CHINACODE],DEFAULTOPTION['DEFTITLE_PROVINCE'],false);
								if(DEFAULTOPTION['SHOWFLAG']){
									sthis.initialAreaList(sthis.spot_dd,{},DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
								}
							}
						});
					} else{
						sthis.initialAreaList(sthis.province_dd,cache.provincelist[CHINACODE],DEFAULTOPTION['DEFTITLE_PROVINCE'],false);
						if(DEFAULTOPTION['SHOWFLAG']){
							sthis.initialAreaList(sthis.spot_dd,{},DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
						}
					}
				}
			});
			//省
			this.province_dd.bind("change", function(){
				sthis.search_ip.val("");//18165117 2012年07月18日 16:51:17 kxp
				sthis.city_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_CITY']+"</option>");
				sthis.county_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_COUNTY']+"</option>");
				sthis.street_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_STREET']+"</option>");
				sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>").hide();
				sthis.callbackfunc();
				var newvalue = sthis.province_dd.val();
				if('-1' == newvalue){
					var current_countrycode = sthis.country_dd.val();
					if( CHINACODE == current_countrycode){
						sthis.city_dd.show();
						sthis.county_dd.show();
						sthis.street_dd.show();
					}
					sthis.spot_dd.show();
					sthis.country_dd.change();
				}else if(undefined == cache.citylist || undefined == cache.citylist[newvalue]) {
					$.ajax({
						type:"GET",
						dataType:"json",
						data:{"type":"spot", "code": newvalue},
						url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
						success:function(json){
							if (undefined == cache.citylist) {
								cache.citylist = [];
							}
							cache.citylist[newvalue] = json;
							if(cache.citylist[newvalue].region.length!=0){
								if(json.ismunicipal){
									sthis.initialAreaList(sthis.county_dd,cache.citylist[newvalue].region,DEFAULTOPTION['DEFTITLE_COUNTY']);
								}else{
									sthis.initialAreaList(sthis.city_dd,cache.citylist[newvalue].region,DEFAULTOPTION['DEFTITLE_CITY']);
								}
							}
							sthis.initialAreaList(sthis.spot_dd,cache.citylist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
							sthis.callbackfunc();
						}
					});
				} else {
					if(cache.citylist[newvalue].ismunicipal){
						sthis.initialAreaList(sthis.county_dd,cache.citylist[newvalue].region,DEFAULTOPTION['DEFTITLE_COUNTY']);
					}else{
						sthis.initialAreaList(sthis.city_dd,cache.citylist[newvalue].region,DEFAULTOPTION['DEFTITLE_CITY']);
					}
					sthis.initialAreaList(sthis.spot_dd,cache.citylist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
					sthis.callbackfunc();
				}
			});
			//市
			this.city_dd.bind("change", function(e){
				sthis.search_ip.val("");//18165122 2012年07月18日 16:51:22 kxp
				sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
				sthis.callbackfunc();
				var newvalue = sthis.city_dd.val();
				if('-1'==newvalue){
					sthis.street_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_STREET']+"</option>");
					sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
					sthis.province_dd.change();
				}else if(undefined == cache.countylist || undefined == cache.countylist[newvalue]) {
					$.ajax({
						type:"GET",
						dataType:"json",
						data:{"type":"spot", "code":newvalue},
						url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
						success:function(json){
							if (undefined == cache.countylist) {
								cache.countylist = [];
							}
							//kxp add selected city in spot_list 18173016 2012年07月18日 17:30:16 kxp
							var selectedText = $("option[value='"+newvalue+"']",e.target).text();
							cache.countylist[newvalue] = json;
							sthis.initialAreaList(sthis.county_dd,cache.countylist[newvalue].region,DEFAULTOPTION['DEFTITLE_COUNTY']);
							////kxp add isShowProvince 24232651 2012年07月24日 23:26:51 kxp
							sthis.initialAreaList(sthis.spot_dd,cache.countylist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
							sthis.callbackfunc();
						}
					});
				} else {
					sthis.initialAreaList(sthis.county_dd,cache.countylist[newvalue].region,DEFAULTOPTION['DEFTITLE_COUNTY']);
					//kxp add isShowProvince 24232657 2012年07月24日 23:26:57 kxp
					sthis.initialAreaList(sthis.spot_dd,cache.countylist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
					sthis.callbackfunc();
				}
			});
			//县区
			this.county_dd.bind("change", function(e){
				sthis.search_ip.val("");//18165122 2012年07月18日 16:51:22 kxp
				sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
				sthis.callbackfunc();
				var newvalue = sthis.county_dd.val();
				if('-1' == newvalue){
					sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
					sthis.city_dd.change();
				}else{
					if(undefined == cache.streetlist || undefined == cache.streetlist[newvalue]) {
						$.ajax({
							type:"GET",
							dataType:"json",
							data:{"type":"spot", "code":newvalue},
							url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
							success:function(json){
								if (undefined == cache.streetlist) {
									cache.streetlist = [];
								}
								//kxp add selected city in spot_list 18173016 2012年07月18日 17:30:16 kxp
								var selectedText = $("option[value='"+newvalue+"']",e.target).text();
								cache.streetlist[newvalue] = json;
								sthis.initialAreaList(sthis.street_dd,cache.streetlist[newvalue].region,DEFAULTOPTION['DEFTITLE_STREET']);
								////kxp add isShowProvince 24232651 2012年07月24日 23:26:51 kxp
								sthis.initialAreaList(sthis.spot_dd,cache.streetlist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
								sthis.callbackfunc();
							}
						});
					} else {
						sthis.initialAreaList(sthis.street_dd,cache.streetlist[newvalue].region,DEFAULTOPTION['DEFTITLE_STREET']);
						//kxp add isShowProvince 24232657 2012年07月24日 23:26:57 kxp
						sthis.initialAreaList(sthis.spot_dd,cache.streetlist[newvalue].spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
						sthis.callbackfunc();
					}
				}
			});
			//街道
			this.street_dd.bind("change", function(e){
				sthis.search_ip.val("");//18165122 2012年07月18日 16:51:22 kxp
				sthis.spot_dd.empty().append("<option value=\"-1\">"+DEFAULTOPTION['DEFTITLE_SPOT']+"</option>");
				sthis.callbackfunc();
				var newvalue = sthis.street_dd.val();
				if('-1' == newvalue){
					sthis.county_dd.change();
				}else{
					if(undefined == cache.spotlist || undefined == cache.spotlist[newvalue]) {
						$.ajax({
							type:"GET",
							dataType:"json",
							data:{"type":"spot", "code":newvalue},
							url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
							success:function(json){
								if (undefined == cache.spotlist) {
									cache.spotlist = [];
								}
								//kxp add selected city in spot_list 18173016 2012年07月18日 17:30:16 kxp
								var selectedText = $("option[value='"+newvalue+"']",e.target).text();
								cache.spotlist[newvalue] = json.spots;
								////kxp add isShowProvince 24232651 2012年07月24日 23:26:51 kxp
								sthis.initialAreaList(sthis.spot_dd,cache.spotlist[newvalue],DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
								sthis.callbackfunc();
							}
						});
					} else {
						//kxp add isShowProvince 24232657 2012年07月24日 23:26:57 kxp
						sthis.initialAreaList(sthis.spot_dd,cache.spotlist[newvalue],DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
						sthis.callbackfunc();
					}
				}
			});

			//景点
			this.spot_dd.bind("change",function(e){
				//只中国存在选中省 就能选景点
				if((('-1' == sthis.city_dd.val() || '-1' == sthis.city_dd.val() || '-1' == sthis.county_dd.val() || '-1' == sthis.street_dd.val()) && '40002' == sthis.country_dd.val()) || '-1' == sthis.continent_dd.val() || '-1' == sthis.province_dd.val()){
					if(!DEFAULTOPTION['MULTIPLE']){
						sthis.initialSpot(e.target.value);
					}
				}
			});
			
			//初始化，默认选择中国
			this.initialChina = function(){
				$.ajax({
					type:"GET",
					dataType:"json",
					data:{"type":"initial"},
					url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
					success:function(json){
						if (undefined != json.region_country && json.region_country ) {
							//initial cache
							if (undefined == cache.countrylist) {
								cache.countrylist = [];
							}
							if (undefined == cache.provincelist) {
								cache.provincelist = [];
							}
							if (undefined == cache.countrylist[ASIACODE]) {
								cache.countrylist[ASIACODE] = {};
							}
							json.region_country[json.region_country.length] = {id: CHINACODE, name: DEFAULTOPTION['CHINANAME']};
							json.region_country.reverse();
							cache.countrylist[ASIACODE].region = json.region_country;
							cache.provincelist[CHINACODE] = json.region_province;
							sthis.continent_dd.val(ASIACODE).change();
							sthis.initialAreaList(sthis.country_dd,json.region_country,DEFAULTOPTION['DEFTITLE_COUNTRY'],false);
							sthis.country_dd.val(CHINACODE).change();
							sthis.initialAreaList(sthis.province_dd,json.region_province,DEFAULTOPTION['DEFTITLE_PROVINCE'],false);
							sthis.initialAreaList(sthis.city_dd,json.region_municipal,DEFAULTOPTION['DEFTITLE_CITY'],false);
						}
					}
				});
			};
			this.initialCity = function(areacode) {
				$.ajax({
					type:"GET",
					dataType:"json",
					data:{"type":"initialbycode", "code":areacode},
					url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
					success:function(json){
						//initial cache
						if (undefined == cache.countrylist) {
							cache.countrylist = [];
						}
						if (undefined == cache.provincelist) {
							cache.provincelist = [];
						}
						if (undefined == cache.citylist) {
							cache.citylist = [];
						}
						if (undefined == cache.countylist) {
							cache.countylist = [];
						}
						if (undefined == cache.spotlist) {
							cache.spotlist = [];
						}
						if (undefined != json.abroad && json.abroad ) {
							sthis.city_dd.hide();
							sthis.county_dd.hide();
							sthis.street_dd.hide();
							//initial cache
							cache.countrylist[json.selected_continent] = {region:json.region_country, spots:json.all_spots};
							cache.spotlist[areacode] = json.all_spots;

							sthis.continent_dd.val(json.selected_continent);
							sthis.initialAreaList(sthis.country_dd,json.region_country,DEFAULTOPTION['DEFTITLE_COUNTRY']);
							sthis.country_dd.val(json.selected_country);
							sthis.initialAreaList(sthis.province_dd,json.region_province,DEFAULTOPTION['DEFTITLE_PROVINCE']);
							if (json.iscity) {
								sthis.province_dd.val(json.selected_province);
							}
							sthis.initialAreaList(sthis.spot_dd,json.all_spots,DEFAULTOPTION['DEFTITLE_SPOT'], false, true);
							sthis.callbackfunc();
						} else if (undefined != json.abroad) {
							//initial cache
							cache.spotlist[areacode] = json.all_spots;
							cache.provincelist[CHINACODE] = json.region_province;

							sthis.continent_dd.val(ASIACODE);
							json.region_country[json.region_country.length] = {id: CHINACODE, name: DEFAULTOPTION['CHINANAME']};
							json.region_country.reverse();
							sthis.initialAreaList(sthis.country_dd,json.region_country,DEFAULTOPTION['DEFTITLE_COUNTRY']);
							sthis.country_dd.val(CHINACODE);
							sthis.initialAreaList(sthis.province_dd,json.region_province,DEFAULTOPTION['DEFTITLE_PROVINCE']);
							sthis.province_dd.val(json.selected_province);
							sthis.initialAreaList(sthis.city_dd,json.region_city,DEFAULTOPTION['DEFTITLE_CITY']);
							if (json.iscity || json.ismunicipal) {
								//县区的缓存
								cache.countylist[areacode] = {region:json.region_county, spots:json.all_spots};
								sthis.initialAreaList(sthis.county_dd,json.region_county,DEFAULTOPTION['DEFTITLE_COUNTY']);
								if(json.ismunicipal){
									sthis.province_dd.val(json.selected_province);
									sthis.county_dd.val(json.selected_county);
								}else{
									sthis.city_dd.val(json.selected_city);
								}
							}else{
								//省级市的缓存
								cache.citylist[areacode] = {region:json.region_city, spots:json.all_spots};
							}
							if('-1' != json.selected_county){
								sthis.initialAreaList(sthis.county_dd,json.region_county,DEFAULTOPTION['DEFTITLE_COUNTY']);
								sthis.initialAreaList(sthis.street_dd,json.region_street,DEFAULTOPTION['DEFTITLE_STREET']);
								sthis.city_dd.val(json.selected_city);
								sthis.county_dd.val(json.selected_county);
							}
							sthis.initialAreaList(sthis.spot_dd,json.all_spots,DEFAULTOPTION['DEFTITLE_SPOT'], false,true);
							sthis.callbackfunc();
						}
					}
				});
			};
			this.initialSpot = function(values){
				$.ajax({
					type:"GET",
					dataType:"json",
					data:{"type":"spot", "ids":values},
					url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax",
					success:function(json){
						if (undefined != json.spots && json.spots.length ) {
							if (DEFAULTOPTION['MULTIPLE']) {
								sthis.initialAreaList(sthis.mulselect_dd,json.spots,"", false, true);
								if (-1 != DEFAULTOPTION['SELECTEDCODE']) {
									var code = parseInt(DEFAULTOPTION['SELECTEDCODE']);
									sthis.initialCity(code);
								}
							} else {
								//china
								if(!json.abroad) {
									sthis.continent_dd.val(ASIACODE);
									json.region_country[json.region_country.length] = {id: CHINACODE, name: DEFAULTOPTION['CHINANAME']};
									json.region_country.reverse();
									sthis.initialAreaList(sthis.country_dd,json.region_country,DEFAULTOPTION['DEFTITLE_COUNTRY']);
									sthis.country_dd.val(CHINACODE);
									sthis.initialAreaList(sthis.province_dd,json.region_province,DEFAULTOPTION['DEFTITLE_PROVINCE']);
									sthis.province_dd.val(json.spots[0].province_code);
									sthis.initialAreaList(sthis.city_dd,json.region_city,DEFAULTOPTION['DEFTITLE_CITY'], false);
									sthis.city_dd.val(json.spots[0].city_code);
									sthis.initialAreaList(sthis.county_dd,json.region_county,DEFAULTOPTION['DEFTITLE_COUNTY'], false);
									sthis.county_dd.val(json.spots[0].county_code);
									sthis.initialAreaList(sthis.street_dd,json.region_street,DEFAULTOPTION['DEFTITLE_STREET'], false);
									sthis.street_dd.val(json.spots[0].street_code);
									sthis.initialAreaList(sthis.spot_dd,json.all_spots,DEFAULTOPTION['DEFTITLE_SPOT'], false,true);
									sthis.spot_dd.val(values);
								} else {
									if(undefined == cache.spotlist || undefined == cache.spotlist[json.selected_country]){
										cache.spotlist = [];
									}
									cache.spotlist[json.selected_country] = json.all_spots;
									json.region_country[json.region_country.length] = {id: CHINACODE, name: DEFAULTOPTION['CHINANAME']};
									json.region_country.reverse();
									sthis.continent_dd.val(json.selected_continent);
									sthis.initialAreaList(sthis.country_dd,json.region_country,DEFAULTOPTION['DEFTITLE_COUNTRY']);
									sthis.country_dd.val(json.selected_country);
									sthis.initialAreaList(sthis.province_dd,json.region_province,DEFAULTOPTION['DEFTITLE_PROVINCE']);
									sthis.province_dd.val(json.spots[0].province_code);
									sthis.city_dd.hide();
									sthis.county_dd.hide();
									sthis.street_dd.hide();
									sthis.initialAreaList(sthis.spot_dd,json.all_spots,DEFAULTOPTION['DEFTITLE_SPOT'], false,true);
									sthis.spot_dd.val(values);
								}
							}
						}
					}
				});
			};
			if (-1 == DEFAULTOPTION['SELECTED']) {
				if (-1 != DEFAULTOPTION['SELECTEDCODE']) {
					var code = parseInt(DEFAULTOPTION['SELECTEDCODE']);
					this.initialCity(code);
				} else {
					this.initialChina();
				}
			} else {
				//去掉所有空格
				var values = DEFAULTOPTION['SELECTED'].toString().replace(/\s/g, '');
				//单选
				if (!DEFAULTOPTION['MULTIPLE']) {
					values = parseInt(values);
					if (isNaN(values) || !values) {
						if (-1 != DEFAULTOPTION['SELECTEDCODE']) {
							var code = parseInt(DEFAULTOPTION['SELECTEDCODE']);
							this.initialCity(code);
						} else {
							this.initialChina();
						}
						values = '';
					}
				} else {
					//多选
					if (!values.match(/^\d(([\d,]*)\d|)$/)) {
						values = '';
					}
				}
				if(values){
					this.initialSpot(values);
				}
			}

			//kxp add search event keyup 18164212 2012年07月18日 16:42:12 kxp
			this.search_ip.bind("keyup", function (e){
				var keyCode = e.keyCode;
				if(sthis.search_res.children("li").length > 0){
					var current_li_selected = sthis.search_res.show().children("li.selected");
					var max_height = $(sthis.search_res).height();
					if(keyCode == '40'){//down
						current_li_selected.next().addClass("selected").css("background-color","#EEEEEE" ).siblings().css("background-color","#FFF" ).removeClass("selected");
						if(sthis.search_res.show().children("li.selected").position().top >= max_height-20){
							sthis.search_res.scrollTop(sthis.search_res.show().children("li.selected").position().top);
						};
						return false;
					}
					if(keyCode == '38'){//up
						current_li_selected.prev().addClass("selected").css("background-color","#EEEEEE" ).siblings().css("background-color","#FFF" ).removeClass("selected");
						if(sthis.search_res.show().children("li.selected").position().top <= 0){
							sthis.search_res.scrollTop(sthis.search_res.show().children("li.selected").position().top);
						};
						return false;
					}
					if(keyCode == '13'){//enter
						current_li_selected.trigger('click');
						return false;
					}
				}
				if ($.inArray(keyCode, DEFAULTOPTION.noSearchKey) >= 0){
					return false;
				}
				if (e.target.value.length == 0){
					sthis.initialAreaList(sthis.spot_dd,[],DEFAULTOPTION['DEFTITLE_SPOT'], false);
					sthis.callbackfunc();
					return false;
				}
				hide.call(sthis);
				var name = e.target.value;
				var data = Base64.encode('{"product":1,"name":"'+name+'"}');
				setTimeout(function (){
					getData(data);
				},500);
			});

			//kxp add getData 18165028 2012年07月18日 16:50:28 kxp
			function getData(data){
				var searchKey = data;
				if(undefined == cache.searchSpots || undefined == cache.searchSpots[searchKey]) {
					$.ajax({
						type:"GET",
						dataType:"text",
						url:"http://" + DEFAULTOPTION['DOMAIN'] + DEFAULTOPTION['API_PATH'] + "searchajax/match?" + data,
						success:function(json){
							var data = JSON.decode(Base64.decode(json));
							if (data.success){
								if (undefined == cache.searchSpots || undefined == cache.searchSpots[searchKey]) {
									cache.searchSpots = [];
								}
								cache.searchSpots[searchKey] = data.data;
								sthis.showSearchRes(cache.searchSpots[searchKey],true);
								sthis.initialAreaList(sthis.spot_dd,cache.searchSpots[searchKey],DEFAULTOPTION['DEFTITLE_SPOT'], false,true);
								sthis.callbackfunc();
							}else{
								alert(data.msg + '[' + data.errorCode + ']');
								return false;
							}
						}
					});
				}else{
					sthis.showSearchRes(cache.searchSpots[searchKey],true);
					sthis.initialAreaList(sthis.spot_dd,cache.searchSpots[searchKey],DEFAULTOPTION['DEFTITLE_SPOT'], false,true);
					sthis.callbackfunc();
				}
			}

			//huangweirong 搜索后显示列表 2012-07-24
			this.showSearchRes = function(json_data, bol_spot){
				if(DEFAULTOPTION['SHOW_SEARCH_RES'] == 0){
					return false;
				}
				this.search_res.empty();
				var i = 1;
				for (index in json_data) {
					if (!$.isFunction(json_data[index])) {
						var poi_name = bol_spot ?  json_data[index].name + ' ['+json_data[index].id+']' : json_data[index].code;
						var poi_code = json_data[index].poi_code;
						this.search_res.append('<li style="list-style:none;text-align:left; white-space: nowrap;overflow: hidden;cursor:default;" value="' + json_data[index].id + '" poicode="'+ poi_code +'">' + poi_name + "</li>");
					}
					i++;
					this.search_res.height = i*10 + 65;
					if(this.search_res.height>DEFAULTOPTION['SEARCH_UL_HEIGHT']){
						$(this.search_res).css('overflow','auto');
					}
				}
				sthis.search_res.show().children("li:first").addClass("selected").css("background-color","#EEEEEE");
				sthis.search_res.children("li").bind('click',this.selectSpot);
				sthis.search_res.children("li").bind('hover mouseover',function(e){
					$(e.target).addClass("selected").css("background-color","#EEEEEE" ).siblings().css("background-color","#FFF" ).removeClass("selected");
				});
			}
			
			//huangweirong 选择搜索出来的景点
			this.selectSpot = function(e){
				//DPX 重置父级选框
				if(DEFAULTOPTION['MULTIPLE']){
					var option_exist = sthis.mulselect_dd.find("option[value='" + e.target.value + "']").length;
					if(option_exist){
						return false;
					}
				}
				sthis.initialSpot(e.target.value);
				sthis.search_res.hide();
				sthis.spot_dd.val(e.target.value);
			}
			//dpx 失去焦点隐藏
			var mousein_res;
			sthis.search_res.hover(function(){
				mousein_res = true;
			},function(){
				mousein_res = false;
			});
			this.search_ip.focusout(function(e){
				//鼠标是否在search_res内
				if(!mousein_res){
					sthis.search_res.hide();
				};
			}).focusin(function(){
				if(sthis.search_res.children().length>0){
					sthis.search_res.show();
				}
			});
			
			//kxp add hide 18165041 2012年07月18日 16:50:41 kxp
			function hide(){
				this.continent_dd[0].options[0].selected = true;
				this.country_dd.empty().hide();
				this.province_dd.empty().hide();
				this.city_dd.empty().hide();
				this.county_dd.empty().hide();
				this.street_dd.empty().hide();
			}
		}
	});
}
//kxp add Base64
var Nibbler=function(N){var L,C,F,J,A,O,G,M,D,P,K,B,I,H,E;L=function(){var H,B,E;C=N.pad||"";F=N.dataBits;J=N.codeBits;A=N.keyString;O=N.arrayData;B=Math.max(F,J);E=0;G=[];for(H=0;H<B;H+=1){G.push(E);E+=E+1}D=E;M=F/P(F,J)};P=function(C,B){var A;while(B!==0){A=B;B=C%B;C=A}return C};K=function(K,B,F,L){var H,E,R,Q,J,I,P,N;N=function(B){if(!L)P.push(A.charAt(B));else if(O)P.push(B);else P.push(String.fromCharCode(B))};J=0;I=0;P=[];E=K.length;for(H=0;H<E;H+=1){I+=B;if(L){R=K.charAt(H);Q=A.indexOf(R);if(R===C)break;else if(Q<0)throw"the character \""+R+"\" is not a member of "+A}else{if(O)Q=K[H];else Q=K.charCodeAt(H);if((Q|D)!==D)throw Q+" is outside the range 0-"+D}J=(J<<B)|Q;while(I>=F){I-=F;N(J>>I);J&=G[I]}}if(!L&&I>0){N(J<<(F-I));E=P.length%M;for(H=0;H<E;H+=1)P.push(C)}return(O&&L)?P:P.join("")};B=function(B){B=H(B);var I="",G=0,E=B.length,A,C,D,F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";while(G<E){A=B.charCodeAt(G++)&255;if(G==E){I+=F.charAt(A>>2);I+=F.charAt((A&3)<<4);I+="==";break}C=B.charCodeAt(G++);if(G==E){I+=F.charAt(A>>2);I+=F.charAt(((A&3)<<4)|((C&240)>>4));I+=F.charAt((C&15)<<2);I+="=";break}D=B.charCodeAt(G++);I+=F.charAt(A>>2);I+=F.charAt(((A&3)<<4)|((C&240)>>4));I+=F.charAt(((C&15)<<2)|((D&192)>>6));I+=F.charAt(D&63)}return I};I=function(B){var A,D,H,F,J,G,I,C=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);G=B.length;J=0;I="";while(J<G){do A=C[B.charCodeAt(J++)&255];while(J<G&&A==-1);if(A==-1)break;do D=C[B.charCodeAt(J++)&255];while(J<G&&D==-1);if(D==-1)break;I+=String.fromCharCode((A<<2)|((D&48)>>4));do{H=B.charCodeAt(J++)&255;if(H==61){I=E(I);return I}H=C[H]}while(J<G&&H==-1);if(H==-1)break;I+=String.fromCharCode(((D&15)<<4)|((H&60)>>2));do{F=B.charCodeAt(J++)&255;if(F==61){I=E(I);return I}F=C[F]}while(J<G&&F==-1);if(F==-1)break;I+=String.fromCharCode(((H&3)<<6)|F)}I=E(I);return I};H=function(A){var E,D,C,B;E="";C=A.length;for(D=0;D<C;D++){B=A.charCodeAt(D);if((B>=1)&&(B<=127))E+=A.charAt(D);else if(B>2047){E+=String.fromCharCode(224|((B>>12)&15));E+=String.fromCharCode(128|((B>>6)&63));E+=String.fromCharCode(128|((B>>0)&63))}else{E+=String.fromCharCode(192|((B>>6)&31));E+=String.fromCharCode(128|((B>>0)&63))}}return E};E=function(A){var G,F,C,B,E,D;G="";C=A.length;F=0;while(F<C){B=A.charCodeAt(F++);switch(B>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:G+=A.charAt(F-1);break;case 12:case 13:E=A.charCodeAt(F++);G+=String.fromCharCode(((B&31)<<6)|(E&63));break;case 14:E=A.charCodeAt(F++);D=A.charCodeAt(F++);G+=String.fromCharCode(((B&15)<<12)|((E&63)<<6)|((D&63)<<0));break}}return G};this.encode=B;this.decode=I;L()};window.Base32=new Nibbler({dataBits:8,codeBits:5,keyString:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",pad:"="});window.Base64=new Nibbler({dataBits:8,codeBits:6,keyString:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",pad:"="})
window.JSON=new function(){var useHasOwn=!!{}.hasOwnProperty,pad=function(A){return A<10?"0"+A:A},m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},encodeString=function(A){if(/["\\\x00-\x1f]/.test(A))return"\""+A.replace(/([\x00-\x1f\\"])/g,function(C,A){var B=m[A];if(B)return B;B=A.charCodeAt();return"\\u00"+Math.floor(B/16).toString(16)+(B%16).toString(16)})+"\"";return"\""+A+"\""},encodeArray=function(D){var C=["["],B,F,E=D.length,A;for(F=0;F<E;F+=1){A=D[F];switch(typeof A){case"undefined":case"function":case"unknown":break;default:if(B)C.push(",");C.push(A===null?"null":JSON.encode(A));B=true}}C.push("]");return C.join("")},encodeDate=function(A){return"\""+A.getFullYear()+"-"+pad(A.getMonth()+1)+"-"+pad(A.getDate())+"T"+pad(A.getHours())+":"+pad(A.getMinutes())+":"+pad(A.getSeconds())+"\""};this.encode=function(D){if(typeof D=="undefined"||D===null)return"null";else if(D instanceof Array)return encodeArray(D);else if(D instanceof Date)return encodeDate(D);else if(typeof D=="string")return encodeString(D);else if(typeof D=="number")return isFinite(D)?String(D):"null";else if(typeof D=="boolean")return String(D);else{var C=["{"],B,E,A;for(E in D)if(!useHasOwn||D.hasOwnProperty(E)){A=D[E];switch(typeof A){case"undefined":case"function":case"unknown":break;default:if(B)C.push(",");C.push(this.encode(E),":",A===null?"null":this.encode(A));B=true}}C.push("}");return C.join("")}};this.decode=function(json){return eval("("+json+")")}}