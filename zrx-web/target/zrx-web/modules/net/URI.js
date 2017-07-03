
/**
 * 功能说明：TODO
 */

function URI(sBase, sRel)
{
	this._params = {};

	this.setHref(sBase, sRel);
}

var $p = URI.prototype;

$p._params = null;

$p._scheme = "";

$p._userInfo = "";

$p._port = "";

$p._host = "";

$p._path = "";

$p._dirPath = "";

$p._fragment = "";

$p._query = "";

$p._hrefCache = null;

$p._generic = true;

$p.toString = function()
{
	return this.getHref();
}

$p.setHref = function(s, sRel)
{
	if (!s)
		return;

	s = String(s);
	this._hrefCache = null;
	this._scheme = "";
	this._userInfo = "";
	this._host = "";
	this._port = "";
	this._path = "";
	this._dirPath = "";
	this._query = "";
	this._fragment = "";
	this._params = {};

	var ok = tests.scheme.test(s);

	if (!ok)
	{
		throw new Error(0x0011, "URI.setHref(s,sRel):'" + s + "' is Not a well formatted URI.");
	}

	this._scheme = RegExp.$1;
	this._generic = s.substr(this._scheme.length, 3) == "://";

	s = s.substring(this._scheme.length + (this._generic ? 3 : 1));

	if (this._generic || "mailto|news|view-source".indexOf(this._scheme) > -1)
	{
		ok = tests.user.test(s);

		if (ok)
		{
			this._userInfo = RegExp.$1;
			s = s.substring(this._userInfo.length + 1);
		}

		if (this._scheme != "file" || s.charAt(0) != "/")
		{
			ok = tests.host.test(s);

			if (!ok)
			{
				throw new Error(0x0011, "URI.setHref(s,sRel):'" + s + "' is Not a well formatted URI.");
			}

			this._host = RegExp.$1;
			s = s.substring(this._host.length);
		}

		ok = tests.port.test(s);

		if (ok)
		{
			this._port = Number(RegExp.$1);
			s = s.substring(RegExp.$1.length + 1);
		}
	}

	var self = this;
	parsePathAndRest(s);

	if (sRel)
	{
		this._hrefCache = null;
		s = String(s);
		var isAbsolute = tests.absUri.test(s);

		if (isAbsolute)
		{
			this.setHref(s);
			return;
		}

		var dirPath = this._dirPath;
		this._path = "";
		this._dirPath = "";
		this._query = "";
		this._fragment = "";
		this._params = {};

		s.charAt(0) == "/" ? parsePathAndRest(s) : parsePathAndRest(dirPath + s);
	}

	function parsePathAndRest(s)
	{
		var ok = tests.path.test(s);

		if (!ok)
		{
			throw new Error(0x0011, "URI.setHref(s,sRel):'" + s + "' is Not a well formatted URI.");
		}

		self._path = RegExp.$1;
		s = s.substring(self._path.length);

		if (self._path == "" && "file|https|ftp".indexOf(self._scheme) > -1)
		{
			self._path = "/";
		}

		var segments = self._path.split("/"), sb = [], j = 0, i;

		for (i = 0; i < segments.length; i++)
		{
			if (segments[i] == ".")
				continue;

			if (segments[i] == "..")
			{
				j--;
				delete sb[j];
				sb.length = j;
				continue;
			}

			sb[j++] = segments[i];
		}

		self._path = sb.join("/");

		if (self._path.length > 0)
		{
			ok = tests.dirPath.test(self._path);

			if (!ok)
			{
				throw new Error(0x0011, "URI.setHref(s,sRel):'" + s + "' is Not a well formatted URI.");
			}

			self._dirPath = RegExp.$1;
		}

		ok = tests.fragment.test(s);

		if (ok)
		{
			self._fragment = RegExp.$1;
			s = s.substring(0, s.length - self._fragment.length - 1);
			self._fragment = "#" + self._fragment.replace("#", "%23");
		}

		self._query = s;
		s = s.substring(1);

		if (self._query != "")
		{
			var pairs = s.split(/\;|\&/), parts, ptv, name;

			for (i = 0; i < pairs.length; i++)
			{
				parts = pairs[i].split("=");

				try
				{
					name = decodeURIComponent(parts[0]);
				}
				catch (ex)
				{
					name = unescape(parts[0]);
				}

				if (parts.length == 2)
				{
					try
					{
						ptv = decodeURIComponent(parts[1]);
					}
					catch (ex)
					{
						ptv = unescape(parts[1]);
					}
				}
				else
					ptv = null;

				name in self._params ? self._params[name].push(ptv) : self._params[name] = [ptv];

			}
		}
	}
}

$p.getHref = function()
{
	if (this._hrefCache != null)
		return this._hrefCache;

	var s = this._scheme + (this._generic ? "://" : ":")
						+ this._userInfo + (this._userInfo == "" ? "" : "@")
						+ this._host + (this._port != "" ? ":" + this._port : "")
						+ this._path;

	if (s == "://" || s == ":")
		return null; //DSONet fixed @ 11:21 2006-6-4

	return this._hrefCache = s + this.getQuery() + this._fragment;
}

$p.getParam = function(sName)
{
	if (sName in this._params)
		return this._params[sName][this._params[sName].length - 1];

	return undefined;
}

$p.setParam = function(sName, sValue)
{
	this._hrefCache = null;
	return this._params[sName] = [String(sValue)];
}

$p.removeParam = function(sName)
{
	this._hrefCache = null;
	delete this._params[sName];
}

$p.hasParam = function(sName)
{
	return sName in this._params;
}

$p.getParams = function(sName)
{
	if (sName in this._params)
		return this._params[sName].concat();

	return [];
}

$p.addParam = function(sName, sValue)
{
	this._hrefCache = null;
	var v = sValue == null ? null : String(sValue);

	sName in this._params ? this._params[sName].push(v) : this._params[sName] = [v];
}

$p.getQuery = function()
{
	var sb = [], sb2, sb3, v, name, i;

	for (name in this._params)
	{
		sb2 = [];

		for (i = 0; i < this._params[name].length; i++)
		{
			sb3 = [];
			v = this._params[name][i];

			try
			{
				name = encodeURIComponent(name);
			}
			catch (ex)
			{
				name = escape(name);
			}

			if (v == null)
				sb2.push(name);
			else
			{
				try
				{
					v = encodeURIComponent(v);
				}
				catch (ex)
				{
					v = escape(v);
				}

				sb3.push(name, "=", v);
				sb2.push(sb3.join(""));
			}
		}

		sb.push(sb2.join("&"));
	}

	return sb.length > 0 ? "?" + sb.join("&") : "";
}

$p.getScheme = function()
{
	return this._scheme;
}

$p.getPath = function()
{
	return this._path;
}

$p.getDirPath = function()
{
	return this._dirPath;
}

$p.getHost = function()
{
	return this._host;
}

$p.getPort = function()
{
	return this._port;
}

$p.getFragment = function()
{
	return this._fragment;
}

$p.getUserInfo = function()
{
	return this._userInfo;
}

/*
* editor: 1160155 2012年04月01日 16:01:55 kxp
* begin
*/
$p.encode = function (o){
	if(!o){
		return "";
	}
	var buf = [];
	for(var key in o){
		var ov = o[key], k = encodeURIComponent(key);
		var type = typeof ov;
		if(type == 'undefined'){
			buf.push(k, "=&");
		}else if(type != "function" && type != "object"){
			buf.push(k, "=", encodeURIComponent(ov), "&");
		}else if(Util.isArray(ov)){
			if (ov.length) {
				for(var i = 0, len = ov.length; i < len; i++) {
					buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
				}
			} else {
				buf.push(k, "=&");
			}
		}
	}
	buf.pop();
	return buf.join("");
}

$p.decode = function (string, overwrite){
	if(!string || !string.length){
		return {};
	}
	var obj = {};
	var pairs = string.split('&');
	var pair, name, value;
	for(var i = 0, len = pairs.length; i < len; i++){
		pair = pairs[i].split('=');
		name = decodeURIComponent(pair[0]);
		value = decodeURIComponent(pair[1]);
		if(overwrite !== true){
			if(typeof obj[name] == "undefined"){
				obj[name] = value;
			}else if(typeof obj[name] == "string"){
				obj[name] = [obj[name]];
				obj[name].push(value);
			}else{
				obj[name].push(value);
			}
		}else{
			obj[name] = value;
		}
	}
	return obj;
}

$p.toJSON = function (){
	var query = this.getQuery();
	if (query.length == 0){
		return null;
	}
	var json = JSON.decode(Base64.decode(query.replace('?','')));
	for (var i in json){
		var value = json[i];
		json[i] = decodeURIComponent(value);
	}
	return json;
	//return this.decode(query.replace('?',''));
}

/*
* end
*/

$p = null;

var tests =
{
	scheme: /^([^:]+)\:.+$/,
	user: /^([^@\/]+)@.+$/,
	host: /^([^:\/\?\#]+).*$/,
	port: /^:(\d+)/,
	path: /^([^\?#]*)/,
	dirPath: /^(.*\/)[^\/]*$/,
	fragment: /^[^#]*#(.*)$/,
	absUri: /^\w(\w|\d|\+|\-|\.)*:/i
};