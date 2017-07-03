
/**
 * 功能说明：JavaScript类型处理
 */
var Type = {
	/**
	 * 测试给定的参数是否为array类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isArray
	 */
	isArray : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (Array.isArray && !Array.isArray(o) || !(Type.isObject(o) && o.constructor &&(o.constructor.toString().indexOf("Array") > -1 || o instanceof Array)))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数是否为boolean类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isBoolean
	 */
	,isBoolean : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (!(typeof o === "boolean" || Type.isObject(o) && o.constructor && (o.constructor.toString().indexOf("Boolean") > -1 || o instanceof Boolean)))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数是否为function类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isFunction
	 */
	,isFunction : function()
	{
		for (var i = 0, argsLen = arguments.length; i < argsLen; i++)
			if (typeof arguments[i] !== "function")
				return false;
		return true;
	}
	/**
	 * 测试给定的参数是否为null(undefined也被认为是null)
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isNull
	 */
	,isNull : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (o === null || Type.isUndefined(o))
				return true;
		}

		return false;
	}
	/**
	 * 测试给定的参数是否为number类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isNumber
	 */
	,isNumber : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (!(typeof o === "number" || Type.isObject(o) && o.constructor && (o.constructor.toString().indexOf("Number") > -1 || o instanceof Number)) || isNaN(o))
				return false;
		}

		return true;
	}
	/**
	 * 测试给定的参数是否为object类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isObject
	 */
	,isObject : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (typeof o != "object" || o === null)
				return false;
		}

		return true;
	}
	/**
	 * 测试给定的参数是否为string类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isString
	 */
	,isString : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (!(typeof o === "string" || Type.isObject(o) && o.constructor && (o.constructor.toString().indexOf("String") > -1 || o instanceof String)))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数是否为未被定义
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isUndefined
	 */
	,isUndefined : function()
	{
		for (var i = 0, argsLen = arguments.length; i < argsLen; i++)
		{
			if (typeof arguments[i] === "undefined")
				return true;
		}
		return false;
	}
	/**
	 * 测试给定的参数是否被定义
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isDefined
	 */
	,isDefined : function()
	{
		for (var i = 0; i < arguments.length; i++)
		{
			if (Type.isUndefined(arguments[i]))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数是否为数字(符合条件的字符串也被认为是数字)
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isNumeric
	 */
	,isNumeric : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (!(!isNaN(o) && isFinite(o) && (o != null) && !Type.isBoolean(o) && !Type.isArray(o)))
				return false;
		}

		return true;
	}
	/**
	 * 测试给定的参数是否为date类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isDate
	 */
	,isDate : function()
	{
		for (var i = 0, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (!(Type.isObject(o) && o.constructor && (o.constructor.toString().indexOf("Date") > -1 || o instanceof Date)))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数是否为error类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isError
	 */
	,isError : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];

			if (!(null != o && o.constructor && (o.constructor.toString().indexOf("Error") > -1 || o instanceof Error)))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数是否为regexp类型
	 * @public
	 * @param {mixed} arguments 要测试的参数
	 * @return {boolean} 通过测试为true,否则为false
	 * @id Type.isRegExp
	 */
	,isRegExp : function()
	{
		for (var i = 0, o, argsLen = arguments.length; i < argsLen; i++)
		{
			o = arguments[i];
			if (!(null != o && o.constructor && (o.constructor.toString().indexOf("RegExp") > -1 || o instanceof RegExp)))
				return false;
		}
		return true;
	}
	/**
	 * 测试给定的参数的类型
	 * @public
	 * @param {mixed} o 参数
	 * @return {string} 参数类型
	 * @id Type.typeOf
	 */
	,typeOf : function(o)
	{
		for(var t in natives)
			if(Type.isOfType(o, t))
				return t;
			return typeof o;
	}

	//this part from dojo
	/**
	 * 测试给定的参数是否为type所列类型
	 * @public
	 * @param {mixed} o 要测试的参数
	 * @param {function|string} type 要测试的类型
	 * @return {boolean} 符合条件为true,否则false
	 * @id Type.isOfType
	 */
	,isOfType : function(o, type)
	{
		if (Type.isArray(type))
		{
			for (var i = type.length - 1; i >= 0; i--)
			{
				if (Type.isOfType(o, type[i]))
				{
					return true;
				}
			}

			return false;
		}
		else
		{
			switch (type)
			{
				case Object:
				case "object":
					return Type.isObject(o);

				case undefined:
				case "undefined":
					return Type.isUndefined(o);

				case null:
				case "null":
					return (o === null);

				case "optional":
					return ((o === null) || Type.isUndefined(o));

				default:
					if(natives[type])
						return Type["is" + natives[type]](o);
					return o != null && o.constructor && ((o.constructor.toString().indexOf(Type.isString(type) ? type : type.toString()) > -1) || (Type.isFunction(type)? o instanceof type : false));
			}
		}
	}

	/**
	 * extend class,extend object,...
	 * @public
	 * @param {function|object} o subclass
	 * @param {function|object} cls superclass
	 * @param {boolean|array} [force] 覆盖子定义
	 * @return {object|function} 返回o
	 * @id Type.extend
	 */
	,extend : function(o, cls, force)
	{

		var t_o = Type.typeOf(o)
			, t_cls = Type.typeOf(cls)
			, prop
			, reserve = (force === false)
			, listed
			, i
			, pp//parent
			, ps;//sub

		if ("function,object".indexOf(t_o) < 0 || "function,object".indexOf(t_cls) < 0)
		{
			throw new Error("Type.extend(o, cls) Error:" + " the o or cls is required object or function.");
		}

		if(Type.isArray(force) && force.length > 0)
		{
			listed = {};
			for(i = force.length - 1; i >= 0;i--)
			{
				listed[force[i]] = true;
			}
		}

		if (t_o == "function" && !force)
		{
			if (t_cls == "function")
			{
				try
				{
					if(reserve)
						throw new Error("throw for not create instance");
					else
						o.prototype = new cls(); //for some abstract class crack
				}
				catch (ex)
				{
					pp = cls.prototype;
					ps = o.prototype;
					for (prop in pp)
					{
						if (window == pp[prop])
						{
							ps[prop] = window;
							continue;
						}

						if (null != pp[prop] && ps[prop] == pp[prop])
						{
							continue;
						}

						ps[prop] = Cloneable.cloneObject(pp[prop]);
					}

					if (pp.hasOwnProperty("toString")) //ie bug pack//&&!this.prototype.hasOwnProperty("toString")//override
						ps.toString = pp.toString;

					if (pp.hasOwnProperty("valueOf"))
						ps.valueOf = pp.valueOf;
				}
				o.constructor = o;
			}
			else
			{
				ps = o.prototype;
				for (prop in cls)
				{
					if (window == cls[prop])
					{
						ps[prop] = window;
						continue;
					}

					if (null != cls[prop] && o[prop] == cls[prop])
					{ //fix a bug here lost null //DSONet @2006-6-10
						continue;
					}

					ps[prop] = Cloneable.cloneObject(cls[prop]);
				}

				if (cls.hasOwnProperty("toString")) //ie bug pack//&&!this.prototype.hasOwnProperty("toString")//override
					ps.toString = cls.toString;

				if (cls.hasOwnProperty("valueOf"))
					ps.valueOf = cls.valueOf;
			}
		}
		else
		{
			for (prop in cls)
			{
				if(reserve && typeof o[prop] != "undefined")
				{
					continue;
				}
				if(listed && !listed[prop])
				{
					continue;
				}
				if (window == cls[prop])
				{
					o[prop] = window;
					continue;
				}

				if (null != cls[prop] && o[prop] == cls[prop])
				{ //fix a bug here lost null but as undefined
					continue;
				}

				o[prop] = Cloneable.cloneObject(cls[prop]);
			}

			if (cls.hasOwnProperty("toString"))
				o.toString = cls.toString;

			if (cls.hasOwnProperty("valueOf"))
				o.valueOf = cls.valueOf;
		}
		return o;
	}
	/**
	 * 绑定this变量和参数列表
	 * arguments 3..n 其他参数为原函数绑定的参数
	 * @public
	 * @id Type.bind
	 * @param {Function} method 需要绑定的函数
	 * @param {Ojbect} thisObj 为thisArg
	 * @return {Function} 绑定的函数
	 */
	, bind : function(method)
	{
		var args = Array.prototype.slice.call(arguments, 1)
			, object = args.shift();
		return function()
		{
			return method.apply(object, args);
		}
	}
	/**
	 * 得到对象Hash值
	 * @public
	 * @id Type.hashCode
	 * @param {mixed} o 对象
	 * @return {string} Hash值
	 */
	, hashCode : function(o)
	{
		if(o != null && o.uniqueID && ! o.constructor)
		{	//Type.isString(o.uniqueID) && ! Type.isFunction(o.constructor)
			return o.uniqueID;//for HTMLElement in IE
		}
		var type=Type.typeOf(o);

		switch (type)
		{
			case "null":
			case "undefined":
				return "hash:" + type;
			case "string":
			case "number":
			case "boolean":
				return "hash:" + o;
			default:
				var i = hsObjs.length;
				while (i > 0)
				{
					if (hsObjs[--i] == o)
					{
						return "hash:" + type + ":" + i;
					}
				}

				hsObjs.push(o);

				return "hash:" + type + ":" + (hsObjs.length - 1);
		}
	}
	/**
	 * 空的函数
	 * @public
	 * @return {void}
	 * @id Type.VOID_FUNC
	 */
	,voidFn : function() {}
	/**
	 * 返回true的函数
	 * @public
	 * @return {boolean} true
	 * @id Type.T_FUNC
	 */
	,trueFn : function()
	{
		return true;
	}
	/**
	 * 返回false的函数
	 * @public
	 * @return {boolean} false
	 * @id Type.F_FUNC
	 */
	,falseFn : function()
	{
		return false;
	}
	/**
	 * base empty object
	 * @public
	 * @id Type.O_BASE
	 */
	, emptyObject : {}
};
var natives =
{
	"undefined" : "Undefined"
	, "null"	: "Null"
	, "function" : "Function"
	, "string" : "String"
	, "number"	: "Number"
	, "array" : "Array"
	, "date" : "Date"
	, "regexp"	: "RegExp"
	, "error" : "Error"
	, "object" : "Object"
}, hsObjs = [];

/**
 * 功能说明：克隆对象
 * @author: 孔祥鹏 sado (kongxiangpeng@tuniu.com)
 * @version $Id: 31111338 2012年03月31日 11:13:38 kxp $
 */


function Cloneable () {}

/**
 * Creates and returns a copy of this object.  The precise meaning
 * of "copy" may depend on the class of the object. The general
 * intent is that, for any object x, the expression:
 * The method clone for class Object performs a
 * specific cloning operation.
 * The class does not itself extends the class
 * Cloneable, so calling the clone method on an object
 * whose class is Object will result in throwing an
 * exception at run time.
 *
 * @return a clone of this instance.
 * @type Object
 */
Cloneable.prototype.clone = function ()
{
	var co = new this.constructor;//use eval pass JSA
	for (var p in this)
	{
		co[p] = this[p];
	}
	return co;
}

/**
 * Creates and returns a copy of this parameter.
 * @param {mixed} o an object
 * @return {mixed} a clone of this parameter.
 */
Cloneable.cloneObject = function (o)
{
	if (o instanceof Cloneable)
	{
		return o.clone();
	}

	var type = Type.typeOf(o);
	switch (type)
	{

		case "date":
			return new Date(o.getTime());
		case "array":
			return o.slice(0);
		case "error":
			return new Error(o.number, o.message);
		case "object":
			var co = {};
			for (var k in o)
			{
				co[k] = Cloneable.cloneObject(o[k]);
			}
			return co;
		default :
			return o;
	}
}