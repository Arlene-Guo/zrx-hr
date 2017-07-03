

;(function(){
  //定义DxSelect构造函数
  var DxSelect = function(ele, opt){
  	this.element = ele,
    this.defaults = {
      'menuText': [],           //tabs标题
      'ajaxUrl': '',            //ajax地址
      'ajaxUrlGroup': [],       //ajax地址,数组
      'param': {                //初始入参
        'polymerType':'vendor',
        'vendorCode':'',
        'countryCode':'',
        'provinceCode':'',
        'cityCode':'',
        'vendorCountryCode':'',
        'vendorProvinceCode':'',
        'vendorCityCode':'',
        'mappedStatus':1
      },
      'selectIndex': [],        //为索引值对应的选择区域添加下拉框，例如：[3,4]就是为第三和第四级选择区域添加下拉框
      'articleLens': 25,        //列表超过对应条数插入搜索框，默认25
      'type': 'hotel',          //列表类型：city, hotel, room, hotelManage
      'letter': false,          //字母快速定位
      'count': false,           //最后一级显示总个数
      callback: function(){}    //最后一级触发回调函数
    },
    this.options = $.extend({}, this.defaults, opt),
    //首次发送请求
    this.flag = true
  };

  //定义DxSelect的方法
  DxSelect.prototype = {
    init : function(){
      this.createMenuUl();
      this.getData();
      //添加扩展方法
      var abc = this.extends();
      return abc;
    },
    createMenuUl : function(){
    	var menuArr = this.options.menuText,
    	    menuArrLen = menuArr.length,
    	    menuUl = $('<ul class="nav nav-pills dx-nav-pills"></ul>'),
          menuLi = $('<li></li>'),
          menuA = $('<a href="javascript:;"></a>'),
          item;
      for(var i = 0; i < menuArrLen; i++){
        item = menuLi.clone().append(menuA.clone().text(menuArr[i]));
        menuUl.append(item);
      }
      menuUl.find('li').eq(0).addClass('active').siblings('li').addClass('disable');
      this.renderMenuUl(menuUl);
    },
    createChoiceAreaUl: function(json){
      var choiceAreaUl = $('<ul class="choice-area-list"></ul>'),
          choiceAreaLi = $('<li></li>'),
          temp;
      if(json && json.length > 0){
        for(var i = 0; i < json.length; i++){
          temp = this.bindPageData.choiceAreaLiData.call(this, choiceAreaLi.clone(), json[i], json.length);
          choiceAreaUl.append(temp);
        }
      }
      else{
        choiceAreaUl.append('<p style="padding:0 5px;">未找到匹配数据</p>');
      }
      return choiceAreaUl;
    },
    createChoiceArea: function(json, isSelect, isLetter, isCount, type){
      var choiceArea = $('<div class="choice-area"></div>'),
          choiceAreaDiv = $('<div class="choice-area-main"></div>');
      if(this.element.find('.choice-area').css('display') == 'block'){
        choiceArea.css('display','none');
      }
      if(isSelect){
        var ele = this.createMappedSelect(type);
        choiceArea.prepend(ele);
        this.bindEvent.mappedSelectChange.call(this, ele);
      }
      if(json && json.length > this.options.articleLens){
        choiceArea.append(this.createSearchArea());
        this.bindEvent.searchBtnClick.call(this);
      }
      if(isLetter && this.options.letter && json && json.length > this.options.articleLens){
        choiceAreaDiv.append(this.createLetter());
        this.bindEvent.letterClick.call(this);
      }
      if(isCount && this.options.count){
        var ele = this.createCount(json);
        choiceAreaDiv.prepend(ele);
      }
      choiceAreaDiv.append(this.createChoiceAreaUl(json));
      choiceArea.append(choiceAreaDiv);
      this.renderChoiceArea(choiceArea);
      this.setHeightchoiceArea(choiceAreaDiv);
      this.bindEvent.windowResize.call(this);
    },
    createSearchArea: function(){
      var searchArea = $('<div class="form-search dx-form-search">'
                          +'<input type="text" placeholder="搜索" class="input-medium search-query" />'
                          +'<button type="submit" class="btn btn-primary">GO</button>'
                        +'</div>');
      return searchArea;
    },
    createMappedSelect: function(type){
      var mappedSelect = $('<select class="mapped-status">'
                            +'<option value="1">已聚待审</option>'
                            +'<option value="2">已聚已审</option>'
                            +'<option value="0">未聚待审</option>'
                          +'</select>');
      mappedSelect.attr({
        'data-vendorCode': this.options.param.vendorCode || this.options.param.vendorId,
        'data-vendorId': this.options.param.vendorId || this.options.param.vendorCode,
        'data-countryCode': this.options.param.countryCode,
        'data-provinceCode': this.options.param.provinceCode,
        'data-cityCode': this.options.param.cityCode,
        'data-hotelId': this.options.param.hotelId,
        'data-hotelName': this.options.param.hotelName,
        'data-vendorCountryCode': this.options.param.vendorCountryCode,
        'data-vendorProvinceCode': this.options.param.vendorProvinceCode,
        'data-vendorCityCode': this.options.param.vendorCityCode,
        'data-vendorHotelId': this.options.param.vendorHotelId,
        'data-mappedStatus': this.options.param.mappedStatus,
        'data-mappedTymeredSize': this.options.param.mappedTymeredSize
      });
      return mappedSelect;
    },
    createLetter: function(){
      var letter = $('<dl class="letter">'
                      +'<dd><a href="#A">A</a></dd>'
                      +'<dd><a href="#B">B</a></dd>'
                      +'<dd><a href="#C">C</a></dd>'
                      +'<dd><a href="#D">D</a></dd>'
                      +'<dd><a href="#E">E</a></dd>'
                      +'<dd><a href="#F">F</a></dd>'
                      +'<dd><a href="#G">G</a></dd>'
                      +'<dd><a href="#H">H</a></dd>'
                      +'<dd><a href="#I">I</a></dd>'
                      +'<dd><a href="#J">J</a></dd>'
                      +'<dd><a href="#K">K</a></dd>'
                      +'<dd><a href="#L">L</a></dd>'
                      +'<dd><a href="#M">M</a></dd>'
                      +'<dd><a href="#N">N</a></dd>'
                      +'<dd><a href="#O">O</a></dd>'
                      +'<dd><a href="#P">P</a></dd>'
                      +'<dd><a href="#Q">Q</a></dd>'
                      +'<dd><a href="#R">R</a></dd>'
                      +'<dd><a href="#S">S</a></dd>'
                      +'<dd><a href="#T">T</a></dd>'
                      +'<dd><a href="#U">U</a></dd>'
                      +'<dd><a href="#V">V</a></dd>'
                      +'<dd><a href="#W">W</a></dd>'
                      +'<dd><a href="#X">X</a></dd>'
                      +'<dd><a href="#Y">Y</a></dd>'
                      +'<dd><a href="#Z">Z</a></dd>'
                    +'</dl>');
      return letter;
    },
    createCount: function(json){
      var count = $('<div class="count"></div>');
      count.html('共'+json.length+'家酒店');
      return count;
    },
    renderMenuUl : function(menuUl){
      this.element.append(menuUl);
    },
    renderChoiceArea : function(choiceArea){
      this.element.append(choiceArea);
      this.bindEvent.cascadeClick.call(this);
    },
    bindEvent: {
      windowResize: function(){
        var self = this;
        $(window).resize(function(){
          self.setHeightchoiceArea($('.choice-area-main:visible'));
        });
      },
      cascadeClick: function(){
        var self = this,
            navPillsLi = this.element.find('.nav-pills li'),
            choiceAreaItem = this.element.find('.choice-area-list li:not(".let")');
        navPillsLi.off('click').on('click', function(e){
          self.tabs.call(self, e);
        });
        //鼠标单击选中当前行
        choiceAreaItem.off('click').on('click', function(){
          if($(this).hasClass('active')){
            $(this).siblings().removeClass('hover');
          }
          else{
            $(this).addClass('hover').siblings().removeClass('hover');
          }
          return false;
        });
        //鼠标双击显示下一级
        this.element.off('dblclick').on('dblclick', '.choice-area-list li:not(".let")', function(e){
            var e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var index = navPillsLi.filter('.active').index() + 1,
                curChoiceArea = $(this).parents('.choice-area');
            //更新入参
            if(self.options.param.polymerType == 'vendor'){
              self.options.param.vendorCode = $(this).attr('data-vendorCode') || self.options.param.vendorCode;
              self.options.param.vendorId = $(this).attr('data-vendorId') || self.options.param.vendorId;
            }
            self.options.param.countryCode = parseInt($(this).attr('data-countryCode'), 10);
            self.options.param.provinceCode = parseInt($(this).attr('data-provinceCode'), 10);
            self.options.param.cityCode = parseInt($(this).attr('data-cityCode'), 10);
            self.options.param.vendorCountryCode = $(this).attr('data-vendorCountryCode');
            self.options.param.vendorProvinceCode = $(this).attr('data-name') == '未知' ? '' : ($(this).attr('data-vendorProvinceCode') || NaN);
            self.options.param.vendorCityCode = $(this).attr('data-vendorCityCode');
            self.options.param.vendorHotelId = $(this).attr('data-vendorHotelId');
            ////domestic
            if (self.options.param.polymerType == 0 || self.options.param.polymerType == 1) {
                self.options.param.vendorCode = $(this).attr('data-vendorCode') || self.options.param.vendorCode;
                self.options.param.vendorId = $(this).attr('data-vendorId') || self.options.param.vendorId;
                if (self.options.param.polymerType == 0) {///0 查全部供应商 1级联下级操作 2酒店id查询
                  self.options.param.polymerType = 1;
                }
                if ((!$(this).attr('data-vendorId')) && (!$(this).attr('data-vendorCode'))) { ///如果vendorId没有 则未全部查询
                  delete self.options.param.vendorId;
                  delete self.options.param.vendorCode;
                }
                if (self.options.param.cityCode) {
                    self.options.param.limit = 1000;
                }
            }
            /////domestic end
            if($(this).attr('data-hotelId')){
              self.options.param.hotelId = $(this).attr('data-hotelId');
            }
            else{
              delete self.options.param.hotelId;
            }
            self.options.param.name = $(this).attr('data-name');
            self.options.param.chineseName = $(this).attr('data-chineseName');
            self.options.param.englishName = $(this).attr('data-englishName');
            self.options.param.mappedStatus = $(this).attr('data-mappedStatus') || '';
			//
			if(index >= 5){
				var tmpHtml = $(this).html();
				var indexNum = tmpHtml.indexOf("</i><span>");			 
				tmpHtml = tmpHtml.substring(0,indexNum).replace("<i>","");			 
				var trueStatus = '';
				if(tmpHtml){
					 
					var eachStatusNum = tmpHtml.split("/");
					if(eachStatusNum && eachStatusNum.length == 3){
						if(eachStatusNum[0] == 0 && eachStatusNum[1] == 0 && eachStatusNum[2] != 0){
							trueStatus = 0;
						}else if(eachStatusNum[0] == 0 && eachStatusNum[1] != 0 && eachStatusNum[2] == 0){
							trueStatus = 1;
						}else if(eachStatusNum[0] != 0 && eachStatusNum[1] == 0 && eachStatusNum[2] == 0){
							trueStatus = 2;
						}
					}
					self.options.param.mappedStatus = trueStatus;
				}				
				
			}
			
			//
            self.options.param.mappedTymeredSize = $(this).attr('data-mappedTymeredSize') || null;
            $(this).removeClass('hover').addClass('active').siblings().removeClass('active');
            if(self.options.type == 'hotel' || self.options.type == 'room' || self.options.type == 'hotelManage' ||self.options.type == 'domesticRoom'){
              if(index === self.options.menuText.length || self.options.param.vendorHotelId || self.options.param.hotelId){
                //双击酒店调用回调函数并返回
                self.options.callback(self.options.param, $(this));
                return;
              }
            }
            else if(self.options.type == 'city'){
              if(index === self.options.menuText.length || (self.options.param.vendorCityCode && !self.options.param.vendorProvinceCode) || (self.options.param.cityCode && !self.options.param.provinceCode)){
                //双击城市调用回调函数并返回
                self.options.callback(self.options.param, $(this));
                return;
              }
            }
            if(index < self.options.menuText.length){
              curChoiceArea.hide();
              navPillsLi.eq(index).addClass('active').removeClass('disable').siblings().removeClass('active');
              self.staus = 'dblclick';
              //获取数据
              self.getData($(this), index, navPillsLi, curChoiceArea, self.options.type);
            }
        });
      },
      mappedSelectChange: function(ele){
        var self = this;
        ele.change(function(){
          if(self.options.param.polymerType == 'vendor'){
            self.options.param.vendorCode = $(this).attr('data-vendorCode') || self.options.param.vendorCode;
            self.options.param.vendorId = $(this).attr('data-vendorId') || self.options.param.vendorId;
          }
          if (self.options.param.polymerType == 1 || self.options.param.polymerType== 0) {///////
            self.options.param.vendorCode = $(this).attr('data-vendorCode') || self.options.param.vendorCode;
            self.options.param.vendorId = $(this).attr('data-vendorId') || self.options.param.vendorId;
          }
          self.options.param.countryCode = parseInt($(this).attr('data-countryCode'), 10);
          self.options.param.provinceCode = parseInt($(this).attr('data-provinceCode'), 10);
          self.options.param.cityCode = parseInt($(this).attr('data-cityCode'), 10);
          self.options.param.vendorCountryCode = $(this).attr('data-vendorCountryCode');
          self.options.param.vendorProvinceCode = $(this).attr('data-vendorProvinceCode') == 'NaN' ? NaN : $(this).attr('data-vendorProvinceCode');
          self.options.param.vendorCityCode = $(this).attr('data-vendorCityCode');
          self.options.param.vendorHotelId = $(this).attr('data-vendorHotelId');
          self.options.param.hotelId = $(this).attr('data-hotelId');
          self.options.param.hotelName = $(this).attr('data-hotelName');
          self.options.param.mappedTymeredSize = $(this).attr('data-mappedTymeredSize');
          if(self.options.param.mappedStatus != $(this).val()){
            self.options.param.mappedStatus = $(this).val();
            self.staus = 'change';
            $(this).closest('.choice-area').hide();
            //刷新列表
            self.getData($(this));
          }
        });
      },
      searchBtnClick: function(){
        var self = this;
        $(this.element).on('click', '.btn-primary', self.searchFn);
        $(this.element).on('keyup', '.search-query', self.keyDownFn);
      },
      letterClick: function(){
        var self = this;
        $(this.element).on('click', '.letter a', self.roll);
      }
    },
    //页面数据绑定
    bindPageData: {
      choiceAreaLiData: function(element, json, jsonLen){
        var self = this,
            html = '',
            data = json,
            vendorCode = data.vendorCode || '',
            vendorId = data.vendorId || '',
            countryCode = data.countryCode || '',
            provinceCode = data.provinceCode == 0 ? 0 : data.provinceCode ? data.provinceCode : '',
            cityCode = data.cityCode || '',
            vendorCountryCode = data.vendorCountryCode || '',
            vendorProvinceCode = data.vendorProvinceCode || '',
            vendorCityCode = data.vendorCityCode || '',
            vendorHotelId = data.vendorHotelId || '',
            hotelId = (data.hotelId == 0 ? 0 : data.hotelId || ''),
            name = data.name || data.chineseName || data.hotelName,
            chineseName = data.chineseName,
            englishName = data.englishName,
            mappedStatus = data.mappedStatus || self.options.param.mappedStatus,
            mappedTymeredSize = data.mappedTymeredSize,
            mappedNoTymeredSize = data.mappedNoTymeredSize,
            nonMappedSize = data.nonMappedSize,
            mappedTymeredSize = data.mappedTymeredSize;
        var reg= /^[A-Za-z]+$/;
        //判断name是否为字母
        if (name && reg.test(name) && name.length <= 1){
          element.addClass('let').attr('id', name).html(name);
          return element;
        }
        element.attr({
          'data-vendorCode': vendorCode || vendorId,
          'data-vendorId': vendorId || vendorCode,
          'data-countryCode': countryCode,
          'data-provinceCode': provinceCode,
          'data-cityCode': cityCode,
          'data-vendorCountryCode': vendorCountryCode,
          'data-vendorProvinceCode': vendorProvinceCode,
          'data-vendorCityCode': vendorCityCode,
          'data-vendorHotelId': vendorHotelId,
          'data-hotelId': hotelId,
          'data-name': name,
          'data-chineseName': chineseName,
          'data-englishName': englishName,
          'data-mappedStatus': mappedStatus,
          'data-mappedTymeredSize': mappedTymeredSize,
          'data-mappedNoTymeredSize': mappedNoTymeredSize,
          'data-nonMappedSize': nonMappedSize,
          'data-mappedTymeredSize': mappedTymeredSize
        });
        //name = data.name;
        // if(data.name || data.name == null || data.name == ''){
        //   name = data.name;
        // }
        // else{
        //   name = data.hotelName + (data.hotelName == "" ? data.hotelNameEn : (data.hotelNameEn == "" ? data.hotelNameEn : "/" + data.hotelNameEn));
        // }
        if(self.options.type == 'city'){
          if((vendorCityCode && !vendorProvinceCode) || (cityCode && !provinceCode)){
            if(!(self.element.find('.nav-pills li.active a').text() == '城市')){
              name = name + '<em>c</em>';
            }
            html += '<i>';
            if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
              html += data.mappedTymeredSize;
            }
            if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
              if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
                html += '/';
              }
              html += data.mappedNoTymeredSize;
            }
            if(data.nonMappedSize != null && typeof(data.nonMappedSize) != "undefined" && data.nonMappedSize > -1){
              if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
                html += '/';
              }
              html += data.nonMappedSize;
            }
            // if(parseInt(data.mappedTymeredSize, 10) === 1){
            //   html += '<i>' + '已聚已审';
            // }
            // else if(parseInt(data.mappedNoTymeredSize, 10) === 1){
            //   html += '<i>' + '已聚待审';
            // }
            // else if(parseInt(data.nonMappedSize, 10) === 1){
            //   html += '<i>' + '未聚待审';
            // }
          }
          else{
            html += '<i>';
            if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
              html += data.mappedTymeredSize;
            }
            if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
              if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
                html += '/';
              }
              html += data.mappedNoTymeredSize;
            }
            if(data.nonMappedSize != null && typeof(data.nonMappedSize) != "undefined" && data.nonMappedSize > -1){
              if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
                html += '/';
              }
              html += data.nonMappedSize;
            }
          }
          html += '</i><span>'+name+'</span>';
        }
        else if(self.options.type == 'hotel'){
          if((vendorCityCode && !vendorProvinceCode && !vendorHotelId && !hotelId) || (cityCode && !provinceCode && !vendorHotelId && !hotelId)){
            if(!(self.element.find('.nav-pills li.active a').text() == '城市')){
              name = name + '<em>c</em>';
            }
          }
          (self.options.letter && jsonLen > this.options.articleLens) ? html += '<i style="margin:0 12px 0 5px;">' :  html += '<i>';
          if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
            html += data.mappedTymeredSize;
          }
          if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
            if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
              html += '/';
            }
            html += data.mappedNoTymeredSize;
          }
          if(data.nonMappedSize != null && typeof(data.nonMappedSize) != "undefined" && data.nonMappedSize > -1){
            if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
              html += '/';
            }
            html += data.nonMappedSize;
          }
          html += '</i><span>'+name+'</span>';
        }
        else if(self.options.type == 'room'){
          if((vendorCityCode && !vendorProvinceCode && !vendorHotelId && !hotelId) || (cityCode && !provinceCode && !vendorHotelId && !hotelId)){
            if(!(self.element.find('.nav-pills li.active a').text() == '城市')){
              name = name + '<em>c</em>';
            }
          }
          if(hotelId){
            html += '<span>'+name+'</span><i class="hotel-info clearfix">';
            html += '<em class="float:left;">'+hotelId+'</em>';
            //html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          }
          else{
            (self.options.letter && jsonLen > this.options.articleLens) ? html += '<i style="margin:0 12px 0 5px;">' :  html += '<i>';
          }
          if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
            html += '<em style="float:right;">'+data.mappedTymeredSize;
          }
          if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
            if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
              html += '/';
            }
            html += data.mappedNoTymeredSize;
          }
          if(data.nonMappedSize != null && typeof(data.nonMappedSize) != "undefined" && data.nonMappedSize > -1){
            if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
              html += '/';
            }
            html += data.nonMappedSize+'</em>';
          }
          if(hotelId){
            html += '</i>';
          }
          else{
            html += '</i><span>'+name+'</span>';
          }
        }
        else if(self.options.type == 'hotelManage'){
          if(data.chineseName && typeof(data.pictureCount) == "undefined" ){
            name = data.chineseName;
          }
          else if(data.chineseName || data.englishName){
            if(data.chineseName){
              if(data.englishName){
                name = data.chineseName + '(' + data.englishName + ')';
              }
              else{
                name = data.chineseName;
              }
            }
            else{
              name = data.englishName;
            }
          }
          if((vendorCityCode && !vendorProvinceCode && !vendorHotelId && !hotelId) || (cityCode && !provinceCode && countryCode && !vendorHotelId && !hotelId)){
            if(!(self.element.find('.nav-pills li.active a').text() == '城市')){
              name = name + '<em>c</em>';
            }
          }
          if(hotelId){
            html += '<span>'+name+'</span><i class="hotel-info">';
            html += hotelId;
            html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            if(data.mappedTymeredSize && data.mappedNoTymeredSize){
              html += '<i>'+(data.mappedTymeredSize + data.mappedNoTymeredSize)+'</i>';
            }
            else if(data.mappedTymeredSize){
              html += '<i>'+data.mappedTymeredSize+'</i>';
            }
            else if(data.mappedNoTymeredSize){
              html += '<i>'+data.mappedNoTymeredSize+'</i>';
            }
            else if(data.mappedCount != null && typeof(data.mappedCount) != "undefined" && data.mappedCount > -1){
              html += data.mappedCount+'</i>';
            }
            else if(data.pictureCount != null && typeof(data.pictureCount) != "undefined" && data.pictureCount > -1){
              html += data.pictureCount+'</i>';
            }
          }
          else{
            html += '<span>'+name;
            if(data.mappedTymeredSize && data.mappedNoTymeredSize){
              html += '<i>'+(data.mappedTymeredSize + data.mappedNoTymeredSize)+'</i>';
            }
            else if(data.mappedTymeredSize){
              html += '<i>'+data.mappedTymeredSize+'</i>';
            }
            else if(data.mappedNoTymeredSize){
              html += '<i>'+data.mappedNoTymeredSize+'</i>';
            }
            else if(data.mappedCount != null && typeof(data.mappedCount) != "undefined" && data.mappedCount > -1){
              html += '<i>'+data.mappedCount+'</i>';
            }
            else if(data.pictureCount != null && typeof(data.pictureCount) != "undefined" && data.pictureCount > -1){
              html += data.pictureCount+'</i>';
            }
            html += '</span>';
          }
        }
        else if(self.options.type == 'domesticRoom'){/////国内房型聚合
            if(hotelId){
              html += '<span>'+name+'</span><i class="hotel-info">';
              html += hotelId;
              html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            }
            else{
              (self.options.letter && jsonLen > this.options.articleLens) ? html += '<i style="margin:0 12px 0 5px;">' :  html += '<i>';
            }
            ///已聚待审(1)+未聚待审(0)房型数量  /已聚合（已聚已审2）房型数量/未聚已审（-1）房型数量
            ///已聚已审/ 未聚已审/ 已聚待审+未聚待审
              /**
              "mappedTymeredSize" : 5,  //已聚已审
              "mappedNoTymeredSize" : 4, // 已聚未审
              "nonMappedTymeredSize" : 3, //未聚已审
              "nonMappedNoTymeredSize" : 2//未聚未审
              **/
            if(data.mappedTymeredSize != null && typeof(data.mappedTymeredSize) != "undefined" && data.mappedTymeredSize > -1){
                html += data.mappedTymeredSize;
            }

            if(data.nonMappedTymeredSize != null && typeof(data.nonMappedTymeredSize) != "undefined" && data.nonMappedTymeredSize > -1){
                html += '/';
                html += data.nonMappedTymeredSize;
            }

            if(data.mappedNoTymeredSize != null && typeof(data.mappedNoTymeredSize) != "undefined" && data.mappedNoTymeredSize > -1){
              if(data.nonMappedNoTymeredSize != null && typeof(data.nonMappedNoTymeredSize) != "undefined" && data.nonMappedNoTymeredSize > -1){
                html += '/';
              }
              html += parseInt(data.mappedNoTymeredSize,10) + parseInt(data.nonMappedNoTymeredSize,10);
            }
            if(hotelId){
              html += '</i>';
            }
            else{
              html += '</i><span>'+name+'</span>';
            }
            ////该维度下已聚合房型（状态为1和2）占比/未聚合房型（状态为-1 和0）占比。
            try {
                var mapInfo = '';
                var roomSum = parseInt(data.mappedTymeredSize,10) + parseInt(data.mappedNoTymeredSize,10) + parseInt(data.nonMappedTymeredSize,10) + parseInt(data.nonMappedNoTymeredSize,10);
                if (roomSum) {
                  var mappedPer = ((parseInt(data.mappedTymeredSize,10) + parseInt(data.mappedNoTymeredSize,10))/roomSum)*100;
                  var unMappedPer = ((parseInt(data.nonMappedTymeredSize,10) + parseInt(data.nonMappedNoTymeredSize,10))/roomSum)*100;
                  mapInfo = '已聚合：'+ parseFloat(mappedPer).toFixed(2) +'%  未聚合：'+ parseFloat(unMappedPer).toFixed(2) +'%';
                }else{
                  mapInfo = '已聚合：0  未聚合：0';
                }
                element.attr('title', mapInfo);
            }catch(e){
              console.log(e);
            }

        }/////国内房型聚合
        element.html(html);
        return element;
      }
    },
    //获取数据
    getData: function($this, index, navPillsLi, curChoiceArea, type){
      var self = this,
          el = this.element,
          param = this.options.param,
          ajax = this.options.ajaxUrl,
          loadingDiv = $('<div class="choice-area-loading">正在读取数据，请稍后...</div>'),
          data;
      index = index || 0;
      if(this.options.ajaxUrlGroup.length){
        ajax = this.options.ajaxUrlGroup[index];
      }
      if(param && ajax){
        Ajax.request({
          url: ajax,
          type: "POST",
          data: this.options.param,
          listener: {
            beforerequest: function(){
              el.append(loadingDiv);
            },
            success: function(json) {
              loadingDiv.remove();
              data = json.data.result || json.data.rows || json.data;
              if(self.flag){
                var isSelect = false;
                $.each(self.options.selectIndex, function(i, item){
                  if(item === 1){
                    isSelect = true;
                    return false;
                  }
                });
                var isLetter = true;
                self.createChoiceArea(data, isSelect, isLetter, type);
                self.flag = false;
              }
              else{
                if(self.staus === 'dblclick'){
                  self.handleCascadeClick($this, index, navPillsLi, curChoiceArea, data);
                  $this.addClass('loaded').siblings().removeClass('loaded');
                }
                else if(self.staus === 'change'){
                  self.handleMappedSelectChange($this, data);
                }
              }
            },
            error: function(json) {
              alert('请求出错');
            }
          }
        });
      }
      return data;
    },
    handleCascadeClick: function($this, index, navPillsLi, curChoiceArea, data){
      var oldIndex = index;
      //酒店城市显示下拉框
      if(this.options.type == 'hotel'){
        if($this.find('em').size() > 0){
          index = (index + 1) == this.options.menuText.length ? index : (index + 1);
        }
      }
      else if(this.options.type == 'city'){
        if(data.length){
          if((data[0].vendorCityCode && !data[0].vendorProvinceCode) || (data[0].cityCode && !data[0].provinceCode)){
            index = (index + 1) == this.options.menuText.length ? index : (index + 1);
          }
        }
        else{
          if($this.attr('data-mappednotymeredsize') == 0){
            index = (index + 1) == this.options.menuText.length ? index : (index + 1);
          }
        }
      }
      // if(data.length){
      //   if(this.options.type == 'hotel'){
      //     if(data[0].vendorHotelId || data[0].hotelId){
      //       index = (index + 1) == this.options.menuText.length ? index : (index + 1);
      //     }
      //   }
      //   else if(this.options.type == 'city'){
      //     if((data[0].vendorCityCode && !data[0].vendorProvinceCode) || (data[0].cityCode && !data[0].provinceCode)){
      //       index = (index + 1) == this.options.menuText.length ? index : (index + 1);
      //     }
      //   }
      // }
      if(index < this.options.menuText.length){
        var isSelect = false;
        $.each(this.options.selectIndex, function(i, item){
          if(item === index + 1){
            isSelect = true;
            return false;
          }
        });
        var isLetter = true,
            isCount = false;
        if(index === this.options.menuText.length - 1){
          isLetter = false;
          isCount = true;
        }
        var nextChoiceArea = curChoiceArea.next('.choice-area');
        navPillsLi.eq(oldIndex).nextAll().addClass('disable');
        if(nextChoiceArea.length === 0){
          this.createChoiceArea(data, isSelect, isLetter, isCount, this.options.type);
        }
        else{
          nextChoiceArea.show();
          //if(!$this.hasClass('loaded')){
            var nextChoiceAreaMain = nextChoiceArea.find('.choice-area-main'),
                nextChoiceAreaList = nextChoiceAreaMain.find('.choice-area-list');
            if(data.length > this.options.articleLens){
              if(nextChoiceArea.find('.dx-form-search').size() > 0){
                nextChoiceArea.find('.search-query').attr('value','');
              }
              else{
                nextChoiceAreaMain.before(this.createSearchArea());
                this.bindEvent.searchBtnClick.call(this);
              }
              if(this.options.letter && isLetter && nextChoiceAreaMain.find('.letter').size() <= 0){
                nextChoiceAreaMain.append(this.createLetter());
                this.bindEvent.letterClick.call(this);
              }
            }
            else{
              if(nextChoiceArea.find('.dx-form-search').size() > 0){
                nextChoiceArea.find('.dx-form-search').remove();
              }
              if(nextChoiceAreaMain.find('.letter').size() > 0){
                nextChoiceAreaMain.find('.letter').remove();
              }
              if(nextChoiceAreaMain.find('.letter').size() > 0){
                nextChoiceAreaMain.find('.letter').remove();
              }
            }
            if(nextChoiceArea.find('.mapped-status').size() > 0){
              if(!isSelect){
                nextChoiceArea.find('.mapped-status').remove();
              }
              else{
                nextChoiceArea.find('.mapped-status option:first').attr('selected', true);
                nextChoiceArea.find('.mapped-status').attr({
                  'data-vendorCode': this.options.param.vendorCode || this.options.param.vendorId,
                  'data-vendorId': this.options.param.vendorId || this.options.param.vendorCode,
                  'data-countryCode': this.options.param.countryCode,
                  'data-provinceCode': this.options.param.provinceCode,
                  'data-cityCode': this.options.param.cityCode,
                  'data-vendorCountryCode': this.options.param.vendorCountryCode,
                  'data-vendorProvinceCode': this.options.param.vendorProvinceCode,
                  'data-vendorCityCode': this.options.param.vendorCityCode,
                  'data-vendorHotelId': this.options.param.vendorHotelId,
                  'data-hotelId': this.options.param.hotelId,
                  'data-hotelName': this.options.param.hotelName,
                  'data-mappedStatus': this.options.param.mappedStatus,
                });
              }
            }
            else if(isSelect){
              var ele = this.createMappedSelect();
              nextChoiceArea.prepend(ele);
              this.bindEvent.mappedSelectChange.call(this, ele);
            }
            if(isCount){
              if(nextChoiceAreaMain.find('.count').size() > 0){
                nextChoiceAreaMain.find('.count').remove();
                nextChoiceAreaMain.append(this.createCount(data));
              }
            }
            else{
              nextChoiceAreaMain.find('.count').remove();
            }
            nextChoiceAreaList.remove();
            nextChoiceAreaMain.append(this.createChoiceAreaUl(data));
            this.bindEvent.cascadeClick.call(this);
          }
        //}
      }
    },
    handleMappedSelectChange: function($this, data){
      var curChoiceArea = $this.closest('.choice-area'),
          curChoiceAreaMain = curChoiceArea.find('.choice-area-main'),
          curChoiceAreaList = curChoiceAreaMain.find('.choice-area-list');
      curChoiceArea.show();
      if(data.length > this.options.articleLens){
        if(curChoiceArea.find('.dx-form-search').size() > 0){
          curChoiceArea.find('.search-query').attr('value','');
        }
        else{
          curChoiceAreaMain.before(this.createSearchArea());
          this.bindEvent.searchBtnClick.call(this);
        }
      }
      else{
        if(curChoiceArea.find('.dx-form-search')){
          curChoiceArea.find('.dx-form-search').remove();
        }
      }
      curChoiceAreaList.remove();
      curChoiceAreaMain.append(this.createChoiceAreaUl(data));
      this.bindEvent.cascadeClick.call(this);
    },
    //tabs选项卡
    tabs: function(e){
      var e = e || window.event;
      var $this = $(e.target).parent();
      var index = $this.index();
      if($this.hasClass('disable')){
        return;
      }
      if($this.prevAll().hasClass('disable')){
        if(index == (this.options.menuText.length - 1)){
          index = (this.element.find('.choice-area').length - 1);
        }
        else{
          index = index - this.options.menuText.length + 2;
        }
      }
      $this.addClass('active').siblings().removeClass('active');
      this.element.find('.choice-area').eq(index).show().siblings('.choice-area').hide();
    },
    //搜索功能
    searchFn: function(e){
      var e = e || window.event;
      var self = this,
          el = $(e.target),
          searchQuery = el.prev('.search-query'),
          sVal = $.trim(searchQuery.val()),
          con = searchQuery.closest('.choice-area').find('.choice-area-main'),
          list = $(con.find('.choice-area-list')[0]),
          listClone = list.next().length === 0 ? list.clone().empty() : list.next().empty(),
          item = list.find('li'),
          pos = -1,
          result = [];
      //没有输入内容，则返回
      if(sVal === ''){
        return;
      }
      if(con.find('.letter').size() > 0){
        con.find('.letter').addClass('hide');
      }
      for(var i = 0; i < item.length; i++){
        var sLi = item[i];
        var sTxt = $.trim($(sLi).text()) || '';
        pos = find(sVal, sTxt);
        if(pos > -1){
          result[result.length] = $(sLi).clone();
        }
      }
      list.addClass('hide');
      if(list.next().length === 0){
        con.append(listClone);
      }
      else{
        listClone.removeClass('hide');
      }
      if(result.length <= 0){
        listClone.html('未找到匹配的数据');
      }
      else{
        for(var j= 0; j < result.length; j++){
          listClone.append(result[j]);
        }
      }
      function find(val, txt){
        var size = val.length;
        var len = txt.length;
        var compare;
        if(size <= len ){
          for(var i = 0; i <= len - size + 1; i++){
            compare = txt.substring(i, i + size);
            if(compare == val || compare.toUpperCase() == val.toUpperCase()){
              return i;
            }
          }
        }
        return -1;
      }
      searchQuery.on('keyup', function(e){
        var event = e || window.event;
        if(searchQuery.val() === '' && list.hasClass('hide')){
          list.removeClass('hide');
          listClone.addClass('hide');
          if(con.find('.letter').size() > 0){
            con.find('.letter').removeClass('hide');
          }
          if(listClone.find('.active')){
            for(i = 0; i < item.length; i++){
              if(item.eq(i).text() === listClone.find('.active').text()){
                item.eq(i).addClass('active').siblings().removeClass('active');
                break;
              }
            }
          }
        }
      });
    },
    keyDownFn: function(e){
      var e = e || e.window,
          el = $(e.target).next('.btn');
      if(e.keyCode === 13){
        el.trigger("click");
      }
    },
    //设置选择区高度
    setHeightchoiceArea: function(el){
      var thisTop,
          windowHeight = $(window).height();
      if(el.offset()){
        thisTop = el.offset().top
      }
      if(thisTop === 0 || thisTop === 'undefined'){
        if(!$('.dx-nav-pills:visible').offset()){
          return;
        }
        thisTop = $('.dx-nav-pills:visible').offset().top + 36;
        if(el.parent().find('.dx-form-search').size() > 0){
          thisTop = thisTop + 40;
        }
        if(el.parent().find('.mapped-status').size() > 0){
          thisTop = thisTop + 36;
        }
      }
      el.height(windowHeight - thisTop - 20);
    },
    roll: function(e){
      var e = e || window.event,
          el = $(e.target),
          main = el.closest('.choice-area-main'),
          list = main.find('.choice-area-list'),
          scrollTo = main.find(el.attr('href'));
      if(!scrollTo.offset()){
        return;
      }
      list.scrollTop(
        scrollTo.offset().top - list.offset().top + list.scrollTop()
      );
      list.animate({scrollTop: scrollTo.offset().top - list.offset().top + list.scrollTop()});
      return false;
    },
    //扩展方法
    extends: function(){
      var self = this,
          obj = {};
      obj = {
        //搜索结果
        searchResult: function(obj){
          var that = this,
              el = self.element,
              loadingDiv = $('<div class="choice-area-loading">正在读取数据，请稍后...</div>'),
              data;
          obj = obj || {'ajaxUrl': '', 'param': {}, 'curMenuIndex': 1, 'isCount': false};
          Ajax.request({
            url: obj.ajaxUrl,
            type: "POST",
            data: obj.param,
            listener: {
              beforerequest: function(){
                if(el.find('.choice-area-loading').size() <= 0){
                  el.append(loadingDiv);
                }
                el.find('.choice-area').hide();
                that.curMenu(obj.curMenuIndex);
              },
              success: function(json) {
                loadingDiv.remove();
                var data = json.data.result || json.data.rows || json.data,
                    choiceArea = el.find('.choice-area'),
                    choiceAreaLen = choiceArea.size();
                data = that.reformData(data);
                choiceArea.hide();
                if(choiceAreaLen <= 1){
                  var isSelect = false,
                      isLetter = false,
                      isCount = obj.isCount;
                  self.createChoiceArea(data, isSelect, isLetter, isCount, null);
                }
                else if(choiceAreaLen > 1 && choiceAreaLen <= self.options.menuText.length){
                    var lastChoiceArea = $(choiceArea[choiceAreaLen - 1]),
                        lastChoiceAreaMain = lastChoiceArea.find('.choice-area-main'),
                        lastChoiceAreaList = lastChoiceAreaMain.find('.choice-area-list');
                    lastChoiceArea.show().siblings('.choice-area').hide();
                    if(data.length > self.options.articleLens){
                      if(lastChoiceArea.find('.dx-form-search').size() > 0){
                        lastChoiceArea.find('.search-query').attr('value','');
                      }
                      else{
                        lastChoiceAreaMain.before(self.createSearchArea());
                        self.bindEvent.searchBtnClick.call(self);
                      }
                    }
                    else{
                      if(lastChoiceArea.find('.dx-form-search').size() > 0){
                        lastChoiceArea.find('.dx-form-search').remove();
                      }
                    }
                    if(obj.isCount){
                      if(lastChoiceAreaMain.find('.count').size() > 0){
                        lastChoiceAreaMain.find('.count').remove();
                        lastChoiceAreaMain.append(self.createCount(data));
                      }
                    }
                    else{
                      lastChoiceAreaMain.find('.count').remove();
                    }
                    if(lastChoiceArea.find('.mapped-status').size() > 0){
                      lastChoiceArea.find('.mapped-status').remove();
                    }
                    lastChoiceAreaList.remove();
                    lastChoiceAreaMain.append(self.createChoiceAreaUl(data));
                    self.bindEvent.cascadeClick.call(self);
                  }
                }
              },
              error: function(json) {
                alert('请求出错');
              }
          });
        },
        curMenu: function(index){
          var el = self.element,
              menuUl = el.find('.dx-nav-pills'),
              index = index - 1;
          if(index > 0){
            menuUl.find('li').eq(index).removeClass('disable').addClass('active').siblings('li').removeClass('active').end().siblings('li:not(:first)').addClass('disable');
          }
        },
        reformData: function(data){
          if(data instanceof Array){
            return data;
          }
          else{
            var arr = [];
            arr.push(data);
            return arr;
          }
        }
      };
      return obj;
    }
  };

  //在插件中使用DxSelect对象
  $.fn.dxSelect = function(options){
    //创建DxSelect的实体
    var dxSelect = new DxSelect(this, options);

    //调用其方法
    return dxSelect.init();
  };

})(window.jquery);
