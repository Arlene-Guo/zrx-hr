/**===========================================================================================**
*   bone.js[version@1.0.0] support by **jquery  etc**----jquery must!!-----
*   说明：
*        1.整合创建的应用
*        2.丰富对插件化编程的支持
*        3.增强对内部插件的管理
*        4.扩展！扩展！扩展！
* create by txp’s team::::::just run in window
*    step:
*        1.实现简单的mvc，简单支持模拟情景   ***current***
*        2.支持开启模式，页面作用域的实现 
*        3.扩展 钩子与插件
*    bug:
**============================================================================================**/
(function( w , factory ){
	if( typeof define != 'undefined' ){
		define.cmd?define(function( require , exports , module ){
			module.exports            =  factory.call( true ) ;
		}):define([],function(){
			return factory.call(true)
		})
	} else{
		if( w.Bone ){
			( 'console' in w )  &&  console.warn( 'Bone has exist!!' ) ;
			return ;
		}
		w.Bone                        =  factory.call(true,w)
	}
})(window,function( w ){
	//控制函数
	function Bone(){
		var key              =  arguments[0]
		if( $.type( key ) == 'string' ){
			return Bone.use.apply( this , arguments )
		}
	}
	//创建任务
	Bone.create              =  function(){}
	Bone.use                 =  function( key , fn ){
		var arr              =  key.split( ":" )
		,   data             =  []
		switch( arr[0].toLowerCase() ){
			case "view" :
			    data         =  Bone.View.cache( arr[1] )
			break ;
			case "model":
			    data         =  Bone.Model.cache( arr[1] )
			break ;
			case "plugin":
			    data         =  Bone.plugin.cache( arr[1] )
			break ;
		}
		if( fn && $.isFunction( fn )  ){
			fn.call( true , data )
		}else{
			return data
		}
	}

	Bone.cache               =  function( $data ){
		function cache( k , v ){
			var $cache       =  cache.$data || {}
			if( $.type( k ) == "object" ){
				$.extend( $cache , k ) ;
			}else if( $.type( k ) == "string" && !v ){
				return v===null?Bone.delAimValue( k , $cache ):Bone.getAimValue( k , $cache )
			}else if( $.type( k ) == "string" && v ){
				return Bone.setAimValue( k , v , $cache )
			}else if($.type( k ) == 'array'){
				cache.$data  =  k ;
			}
			return $cache;
		}
		cache.$data          =  $data
		return cache
	}
	//原型
	Bone.fn                  =   Bone.prototype ;
    //配置 不复制原型链上的属性,mix只复制到二级，请注意
	function keral( config ){
		var dev              =  keral.runModel ;
		if( $.type( config ) != 'object' || $.isEmptyObject( config ) )  return ;
		for (var i in config) {
			if( !config.hasOwnProperty( i ) ) continue ;
			var copy         =  config[i] 
			if( $.type( copy ) == 'object' &&  $.type(keral[i]) == 'object' ){
				$.extend( keral[i] , copy )
			}else{
				keral[i]     =  copy ;
			}
		}
		// keral.runModel       =  dev
	}
	Bone.fastCreateObject    =  function( key , value , type  ){
		type                 =  (type || "object").toLowerCase();
		if( $.inArray( type , ['object' , 'array'] ) == -1 )  return ;
		var ret              =  type == 'array'?[]:{} 
		,   flag             =  ret
		,   arr              =  key.split(".") 
		$.each( arr , function( i , t ){
			if( arr.length == i+1 ){
				flag[t]      =  value ;
			}else{
				flag[t]      =  type == 'array'?[]:{}
			}
			flag             =  flag[t]
		} )
		return ret
	}
	Bone.config              =  keral ;
	var $status              =  false //全局判断应用是否开启
	Bone.start               =  function(){
		$status              =  true
	}
	Bone.requestConfig       =  {
		dev                  :  {}
		, pro                :  {}
	}
	Bone.getUrl              =  function( key ){
		return Bone.getAimValue( [(keral.runModel || "dev") , key].join('.') , Bone.requestConfig() )
	}
	
	
	//强制报错，终止进程
	Bone.errors              =  function( m ){
		$status              =  false ;
		throw new Error( "Bone.js进程终止  ERROR:" + m )
	}
	//获取层级内的指定元素
	Bone.getAimValue         =  function( key , aim ){
		if( $.type( key ) != 'string' || $.inArray( $.type( aim ) , ['array' , 'object','function'] ) == -1 )  return ;
		var arr              =  key.split( '.' )
		,   flag             =  aim
		if( arr.length < 1 )  return ;
		$.each( arr , function( i , t ){
			flag             =  flag[t]
			if( !flag ) return false ;
		} )
		return flag ;
	}
	//获取层级内的指定元素
	Bone.delAimValue         =  function( key , aim ){
		if( $.type( key ) != 'string' || $.inArray( $.type( aim ) , ['array' , 'object','function'] ) == -1 )  return ;
		var arr              =  key.split( '.' )
		,   flag             =  aim
		if( arr.length < 1 )  return ;
		$.each( arr , function( i , t ){
			if( i == arr.length -1 && flag[t]){
				delete flag[t]
			}else{
				flag             =  flag[t]
			    if( !flag ) return false ;
			}
		} )
		return flag ;
	}
	//设置某个值
	Bone.setAimValue         =  function( key , value , aim  ){
		if( $.type( key ) != 'string' || $.inArray( $.type( aim ) , ['array' , 'object','function'] ) == -1 )  return ;
		var arr              =  key.split( '.' )
		,   flag             =  aim
		,   type             =  $.type( aim )
		if( arr.length < 1 )  return ;
		$.each( arr , function( i , t ){
			if( !flag[t] ) flag[t]    =  {}
			if( arr.length == i + 1 ){
				flag[t]         =  value ;
			}
			flag             =  flag[t]

		} )
		return flag ;
	}
	/**
	* 加载脚本
	*   path ： config.rootPath + alias.value
	* @param arr or single
	* @param fn  --  回调
	*/
	Bone.loader              =  function( arr , fn ){
		if( $.inArray( $.type( arr ) , ['array' , 'string'] ) == -1 )   return ;
		arr                  =  $.type( arr ) == 'string' ? [ arr ] : arr ;
		if( arr.length < 1 )  return ;
		var name             =  arr.shift()
		,   file             =  dealJSFilePath( name ) ; 
		if( !loader.JS )  loader.JS = {}
		if( !file )  return ;
		if(!loader.JS[name]) 
			loader(file,function( code ){
				loader.JS[name]      =  {
					path             :  file
					, status         :  code
				}
				// console.log( 'load js :' +file )
				if( arr.length < 1 )
					fn.call( true ) ;
				else
					Bone.loader( arr , fn )
			}) 
		else{
			if( arr.length < 1 )
				fn.call( true ) ;
			else
				Bone.loader( arr , fn )
		}
	}
	//处理加载的js路径
	function dealJSFilePath( name ){
		if( $.type( name ) != 'string' )  return ;
		var arr              =  []
		,   rootPath         =  Bone.getAimValue( 'loader.rootPath' , keral ) || ""
		,   aimPath          =  Bone.getAimValue( 'loader.alias.'+name , keral ) || name
		,   ret             
		rootPath && arr.push( rootPath ) 
		aimPath && arr.push( aimPath )
		ret                  =  arr.join( '/' ) 
		return ret.substr( -3 ).toLowerCase() == '.js'?ret:ret + '.js' ;
	}
    /**
    * 请查找资料解决非w3c标准下的onload bug的修改
    */
	function loader( js , fn ){
		var node             =  document.createElement( 'script' ) 
		,   header           =  document.getElementsByTagName('head')[0]
		node.type            =  'text/javascript'
		// supportLoad          =  'onload' in node
		node.onload          =  function(){
			fn.call( true )
		}
		node.onerror         =  function(){
			( 'console' in w ) && console.warn( 'Bone loader ERROR:path '+js + ' can not load' )
		}
		node.src             =  js ;
		header.appendChild( node )
	}

	/**----------------------创建应用------------------------------**/
	Bone.create              =  function( support , fn ){
		// 
	}
	var _coreViewSpace       =  function(){
		return {
				bindViewEvents       :  function(){
				var events           =  this.events && $.isFunction( this.events ) && this.events.call( this ) || {}
			    ,   $this            =  this
			    !$.isEmptyObject( events ) && $.each( events , function( it , fn ){
			    	var bool         =  true
			    	try{
			    		var arr      =  it.split( ":" )
			    	}catch(e){
			    		bool         =  false
			    	}
			    	if( !bool && arr.length != 2 )  return ;
			    	var dom          =  arr[1] 
			    	$this.$el.on( arr[0] , dom , function(e){
			    		fn           =  $.type( fn ) == 'string'?$this[fn]:fn
			    		fn.call( $this , {e:e,self:this} )
			    	} )
			    } ) 
			}
		}
	}
	
	function $view( data ){
		var $this            =  this
		data                 =  data || {}
		$.extend( this , data )
		this.$el             =  this.$el || $(this.el)
		this.el              =  this.el || this.$el.selector
		
		if( $( this.$el ).length < 1 )  return ;
		this.getDom          =  function(selector){
			return $this.$el.find( selector )
		}
		this.init && $.isFunction( this.init ) && this.init.call( this ) ;
		_coreViewSpace().bindViewEvents.call( this )

	}
	function _getRemoteUrl( tpl ){
		var rootPath         =  Bone.getAimValue( 'template.rootPath' , keral ) || null
		,   arr              =  [] , file
		,   ext              =  Bone.getAimValue('template.ext' , keral)
		rootPath && arr.push( rootPath )
		arr.push( tpl )
		file                 =  arr.join( "/" )
		return file.substr( ext.length*-1 ).toLowerCase() == ext.toLowerCase()?file:file+ext
	}
	$.extend(  $view.prototype , {
		getRemoteTemplate    :  function( tpl ){
			if( $.type( tpl ) != 'string' )  return  ;
			var template     =  null 
			try{
				var file               =  _getRemoteUrl( tpl )
			    template               =  $.ajax({async:false,url:file}).responseText  
			}catch(e){
			}
			return template ;
		}
	})


	Bone.View                =  function( cf ){
		var fac              =  new $view( cf )
		if( !Bone.View.cache ){
			var cache        =  {}
			cache[fac.$id]    =  fac 
			Bone.View.cache     =  Bone.cache( cache ) 
		}else{
			Bone.View.cache( fac.$id , fac )
		}
		return fac
	}
	Bone.Model               =  function( data ){
		var fac              =  new $model( data )
		,   $id              =  data.$id
		// console.log( fac )
		if( !Bone.Model.cache ){
			var cache        =  {}
			cache[data.$id]    =  fac 
			Bone.Model.cache     =  Bone.cache( cache ) 
		}else{
			Bone.Model.cache( data.$id , fac )
		}
		return fac 
	}
	function $model( data ){
		'use strict'
		this.attribute       =  data.defaults && ($.isFunction( data.defaults )?data.defaults():data.defaults) || {}
		this.init && $.isFunction( this.init ) && this.init() ;
		delete data.$it 
		delete data.defaults
		$.extend( this , data )
	}
	Bone.msg                 =  new Noty
	$.extend($model.prototype , {
		get                  :  function( key ){
			return Bone.getAimValue( key , this.attribute )
		}
		, clear              :  function(){
			var old          =  $.extend( {} , this.attribute )
			delete this.attribute  //pay attention
			this.attribute   =  {} ;
			listenCenter.observer.call(this,"model:"+this.$id,{},old ) ;
		}
		, set                :  function(){
			var key          =  arguments[0]
			,   value        =  arguments[1]
			if( key && value  ){
				var oldValue =  Bone.getAimValue( key , this.attribute ) ;
				Bone.setAimValue( key , value , this.attribute )
				listenCenter.observer.call(this,"model:"+this.$id,Bone.fastCreateObject(key,value),Bone.fastCreateObject( key , oldValue ) ) ;
			}else if( key && !value && $.type( key ) == 'object' ){
				var oldValue =  {} , $this = this
				$.each( key , function( i , t ){
					oldValue[i]      =  $this.attribute[i] || null
				})
				$.extend( this.attribute , key )
				listenCenter.observer.call(this,"model:"+this.$id,key,oldValue ) ;
			}else{
				return ;
			}
		}
		, change             :  function(fn){
			$.type( fn ) == 'function' && listenCenter.watch.call( this,  'model:'+this.$id , fn )
		}
		, toJSON             :  function(){
			var attribute    =  $.extend( {} , this.attribute  ) 
			,   filter       =  Bone.Model.filter
			$.each(attribute||{},function(i,it){
				if( it == "" ){
					attribute[i]     =  null
				}
			})
			delete attribute.$id ;
			delete attribute.$reflash ;
			return attribute ;
		}
		, save               :  function( opt ){
			// console.log( opt.data )
			TNAjax.request({
				data         :  opt.data
				, type       :  opt.type || "GET"
				// , dataType   :  opt.dataType || 'json'
				, url        :  opt.url
				, listener   :  {
					success  :  function( json ){
						if( json.param ){
							var param  =  {}
							param['url['+opt.url+']']    =  json.param ;
							console.info( param )
						}
						if( json.success )
							opt.success.apply( this , arguments )
						else{
							Bone.msg.error(json.msg)
						}
					}
					, error  :  opt.error || function(){
						// 
					}
				}  
			})
		}
		, del                :  function( key ){
			var oldValue     =  Bone.getAimValue( key , this.attribute ) 
			Bone.delAimValue( key , this.attribute )
			listenCenter.observer.call( this , "model:"+this.$id , null , Bone.fastCreateObject( key , oldValue ) )
		}
		, once               :  function(){}
	})
	//控制台
	function listenCenter(){
		// 
	}
	listenCenter.observer    =  function( key , newValue , oldValue ){
		var arr              =  key.split(':')
		,   newKey           =  arr.join('.') , funArr = [] , $this = this
		if( arr.length != 2 )  return ;
		funArr               =  Bone.getAimValue( newKey , listenCenter.watch.$data ) || []
		// console.log( [newKey,listenCenter.watch.$data] )
		if( funArr.length < 1 )  return ;
		$.each( funArr , function( i , fn ){
			fn && $.isFunction( fn ) && fn.call( $this , newValue , oldValue )
		} )
	}
	listenCenter.watch       =  function( key , fn ){
		if( !listenCenter.watch.$data ) listenCenter.watch.$data = {}
		var arr              =  key.split(":")
	    ,   newKey           =  arr.join( '.' )
	    ,   funArr           =  Bone.getAimValue( newKey , listenCenter.watch.$data ) || []
	    if( arr.length != 2 )  return ;
	    funArr.push( fn )
	    Bone.setAimValue( newKey , funArr , listenCenter.watch.$data )
	}
	Bone.interaction         =  function(){}
	Bone.plugin              =  function(id,fn){
		var fac              =  new plugin( id , fn )
		if( !Bone.plugin.cache ){
			var cache        =  {}
			cache[id]        =  fac ;
			Bone.plugin.cache         =  Bone.cache(cache)
		}else{
			Bone.plugin.cache( id , fac )
		}
	}

	function plugin( id , fn ){
		'use strict' ;
		this.id              =  id
		this.fn              =  fn
		this.behavior        =  Bone.cache({})  //不会清楚
		this.recorde         =  Bone.cache({})
	}

	$.extend( plugin.prototype , {
		bind                 :  function(){
			var dom          =  arguments[0]
			,   fn           =  arguments[1]
			,   $this        =  this
			,   config       =  this.bind.config || {} 
			!$.isEmptyObject(config) && ( delete this.bind.config)
			//对于dom节点的处理
			if( typeof dom == 'object' && dom instanceof jQuery  ){
				$.each( dom , function( i , it ){
					$this.fn && $.isFunction( $this.fn ) && $this.fn.call( $this , config , it )
				} )
			}else{
				// dom( $this.fn )
				$this.fn && $.isFunction( $this.fn ) && $this.fn.call( $this , config  )
				fn           =  dom
			}
			fn && $.isFunction( fn ) && fn.call(true,{
				listen       :  function( id , fn ){
					var key          =  'plugin:'+[$this.id,id].join('@')
					listenCenter.watch.call( $this , key , fn )
				}
				, behavior   :  function( id , fn ){
					if( $.type( id ) == 'string' ){
						id             =  [id]
					}
					var list           =  []
					$.each( id , function( i , it ){
						list.push( $this.behavior(it) )
					} )
					fn && $.isFunction( fn ) && fn.apply( true , list )
				}
			})
			// listenCenter.watch.call(this,"plugin:"+this.id)
		}
		, support            :  function(cf){
			this.behavior( cf )
			return this
		}
		, config             :  function( cf ){
			this.bind.config =  cf || {}
			return this ;
		}
		, getRecorde         :  function(arr){
			var ret          =  {} , $this = this
			$.each( arr , function( i , t ){
				ret[t]       =  $this.recorde(t)
			} )
			return ret ;
		}
		, exports            :  function( key , value ){
			var $this        =  this
			try{
				var data         =  $.type( key ) == 'object'?key:{}
				if($.type( key ) == 'string' && arguments.length == 2  )
					data[key]       =  value
				$.each( data , function( key , value ){
					var arr          =  key.split(":")
				    ,   type         =  arr.length == 2?arr[0]:"listen"
				    ,   id           =  arr.length < 2?arr[0]:arr[1]
				    if( type == 'listen' ){
				    	listenCenter.observer.call( $this , 'plugin:'+[$this.id,id].join('@') , value )
				    }else if( type == 'behavior' ){
				    	var addData  =  {}
				    	addData[id]            =  value
				    	$this.behavior(addData)
				    }
				} )
			}catch(e){
				console.error( w )
			}

		}
		, use                :  function(){}
	} )

	Bone.widget              =  function($id,fn){
		// 
	}
	function $widget(){
		// 
	}
	$.extend( $widget.prototype , {
		// 
	} )
	Bone.formToData          =  function(){
		var $el              =  $(arguments[0])
		,   $data            =  arguments[1]
		,   data             =  {}
		,   ret              =  {}
		if( $el.length < 1 )  return {}
		if( !$data ){
			data             =  $el.serializeArray()
			!$.isEmptyObject(data) && data.length > 0 && $.each( data , function( i , t ){
				var reg          =  /.*\[(.*?)\]/g ;
				if( reg.test(t.name) ){
					var nreg     =  /.*\[|.*?\]/g
					,   arr      =  t.name.match( nreg )
					,   Ky       =  arr[0].replace("[","")
					,   ky       =  arr[1].replace("]","")
					// console.log( [ky , Ky] )
					if( !Ky )  return ;
					if( !ret[Ky] )   ret[Ky] = []
					if( ky ){
						ret[Ky][ky]   =  t.value
					}else{
						ret[Ky].push(t.value)
					}
					// delete 
				}else{
					ret[t.name]      =  t.value
				}
				
			} )
		}else{
			$.each( $data , function( k , v ){
				$el.find('[name="'+k+'"]').val(v)
			} )
		}
	    return ret ;
	}
	Bone.splitObject     =  function( data , bool ){
		if( typeof data != 'object' )  return ;
		var ret          =  []
		,   val          =  []
		bool && ( bool = bool.toLowerCase() )
		$.each( data , function( i , t ){
			ret.push( i )
			val.push( t )
		} )
		if( !bool ){
			return {key:ret,value:val}
		}else if( bool == 'key' ){
			return ret
		}else if( bool == 'value' ){
			return val ;
		}
		
	}
	Bone.confirm        =  function( msg , fn ){
		var  id         =  'id-confirm-'+parseInt( Math.random() * 100000000 )
		,    button     =  {
			type: "btn btn-primary "+id,
            text : '确定',
            click: function ($noty) {
            	$noty.close() ;
            	fn && $.isFunction( fn ) && fn.call(this,arguments)
            }
        }
		Bone.msg.confirm(msg,button)
		
	}

	return Bone ;
})