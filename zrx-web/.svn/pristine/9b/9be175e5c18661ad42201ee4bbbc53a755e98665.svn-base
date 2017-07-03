
(function(){	
if (typeof Eye != "object") {
Eye = 
{
    /**
     *  property
     *  
     * */	
	emptyFn : function () {},
	
	empty : undefined,
	
	eveTarget : {},
	
	eventBusCount : 1,
	
	browserType : function() {
		var n = navigator.userAgent;
		var v = navigator.appVersion;
		
		var browsers = ['MSIE','Firefox','OPR','Chrome','Safari'];
		var browserType;
		for(var i = 0,len = browsers.length; i < len ; i++) {
			browserType = browsers[i];
			if(n.indexOf(browserType) > 0) {
				return browserType;
			}
		}
	}(),
	
	
    /**
     *  Eye API
     *  
     * */
	apply : function(o, c, defaults) {
		if (defaults) {
			Eye.apply(o, defaults);
		}
		if (o && c && typeof c == 'object') {
			for (var p in c) {
				var v = c[p];
				if(o.hasOwnProperty(p) || v !== Eye.empty) 
					o[p] = v;
			}
		}
		return o;
	},
	
	
	applyRemoves : function(o,c) {
        if (o && c) {
            for (var p in o) {
				if(c[p] !== Eye.empty) o[p] = c[p];
				delete c[p];
            }
        }
		return o;		
	},
	
    applyIf : function(o, c) {
        if (o && c) {
            for (var p in c) {
                if (o[p] === Eye.empty && c[p] !== Eye.empty) { 
                    o[p] = c[p]; 
                }
            }
        }
        return o;
    },
	
	
	applyAll : function(o,c) {
		if (o && c && typeof c == 'object') {
			for (var p in c) {
				var v = c[p];
				if($.isPlainObject(v)) {
					if($.isPlainObject(o[p])) {
						Eye.applyAll(o[p],v);
					}
					else {
						o[p] = v;
					}
				}
				else if(o.hasOwnProperty(p) || v !== Eye.empty) {
					o[p] = v;
				}
			}
		}
		return o;	
	},
	
	copy : function(s){
		return Eye.applyIf({},s);
	},
	    
    namespace : function() 
    {
        var a = arguments, o = null, i, j, d, rt;
        for (i = 0; i < a.length; ++i) {
            d = a[i].split(".");
            rt = d[0];
            eval('if (typeof ' + rt + ' === "undefined"){' + rt + ' = {};} o = ' + rt + ';');
            for (j = 1; j < d.length; ++j) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
    },

	
	
	onGlobalEvent : function(type,listener,scope,priority) {
		Eye.addEvent(Eye.eveTarget,type,listener,false,scope,priority);
	},
	
	removeGlobalEvent : function(type,listener,priority) {
		Eye.removeEvent(Eye.eveTarget,type,listener,false);
	},
	
	dispatchGlobalEvent:function(type,args){
		Eye.dispatchEvent(Eye.eveTarget,type,args);
	},
	
	addEventListener : function(o,type,listener,userCapture,scope,priority) {
		
		if(o == this)
			return;
		// W3C Event
		if(o.addEventListener) {
			type = (type == 'mousewheel' && Eye.browserType == "Firefox") ? 'DOMMouseScroll' : type;
		   	o.addEventListener(type,listener,userCapture);	
		}
		else {
			// IE8,IE7 IE6
			Eye.addEventListener.dispatchEventHandles = function(eve) {
				if (!this.__eventHandles__) {return true;}  
				eve = eve || window.event;  
				Eye.dispatchEvent(this,eve.type); 
			}
			
			if(!listener.__eventID__) 
				listener.__eventID__ = Eye.eventBusCount++;
			
			if (!o.__eventHandles__) 
				 o.__eventHandles__= {}; 
	
			var handlers = o.__eventHandles__[type];
			if (!handlers) {  
				handlers = o.__eventHandles__[type] = {};  
				if (o["on" + type]) {  
					handlers[0] = o["on" + type];  
				}  
			}
			handlers[listener.__eventID__] = {handler : listener,scope : scope,priority : priority}; 
			o["on" + type] = Eye.addEventListener.dispatchEventHandles;
		}
	},
	
	dispatchEvent : function(o,type,args) {
		if(o.__eventHandles__) {
			var fns = o.__eventHandles__[type];  
			var handlers = [],h;
			for (var i in fns) {
				 handlers.push(fns[i]);  
				 //hodler = fns[i];
				 //hodler.handler.call(o,hodler.data,parameter);
			} 	
			
			handlers = handlers.sort(
                function(a, b) {
					if(a.priority && b.priority) {
						if(a.priority > b.priority) return -1;
						if(a.priority < b.priority) return 1;
					}
                    return 1;
                }
            );
			
			$.each(handlers,function(index,h){
				 //h = fns[i];
				 h.handler.apply((h.scope || o),args);			
			});

		}
	},
	
	removeEventListener : function(o,type,listener,userCapture) {
		if(o.removeEventListener) {
		   type = (type == 'mousewheel' && Eye.browserType == "Firefox") ? 'DOMMouseScroll' : type;
		   o.removeEventListener(type,listener,userCapture);
		}		
		else if (o.__eventHandles__ && o.__eventHandles__[type]) { 
		   if(listener && listener.__eventID__)
		   		delete o.__eventHandles__[type][listener.__eventID__];
		   else
		   		delete o.__eventHandles__[type];		  
  		}		
	},
	
    /*
     * Class extends SuperClass
     * 
     * @param sb subclass
     * @param sp superclass
     * @param overrides override object
     * 
     * @return sb;
     */
     extend: function() {
         var io = function(o) {
             for (var m in o) {
                 this[m] = o[m];
             }
         };
         var oc = Object.prototype.constructor;
         return function(sb, sp, overrides) {
			 
			 if(!sp) {
			 	console.log(sb.toString());
			 }
			 
             if (typeof sp == 'object') {
                 overrides = sp;
                 sp = sb;
                 sb = overrides.constructor != oc ? overrides.constructor : function() { sp.apply(this, arguments); };
             }
             var F = function() { }, sbp, spp = sp.prototype;
             F.prototype = spp;
             sbp = sb.prototype = new F();
             sbp.constructor = sb;
             sb.superclass = spp;
             if (spp.constructor == oc) {
                 spp.constructor = sp;
             }
             sb.override = function(o) { Eye.override(sb, o);};
             sb.extend = function(o) { Eye.extend(sb, o); };
             
             sbp.override = io;
             Eye.override(sb, overrides);
             
			 //Eye.override(Eye.fn.classes, sb.prototype);
			 //Eye.fn.extend(sb.prototype);
			 
             return sb;
         };
     } (),


    /*
     * override Methods
     */
     override : function(origclass, overrides) {
         if (overrides) {
             var p = origclass.prototype;
             for (var method in overrides) {
                 p[method] = overrides[method];
             }
         }
     },
     
     type : function(o) {
         if (o === undefined || o === null) {
             return false;
         }
         if (o.htmlElement) {
             return 'element';
         }
         var t = typeof o;
         if (t == 'object' && o.nodeName) {
             switch (o.nodeType) {
                 case 1: return 'element';
                 case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
				 case 9: return 'document';
             }
         }
         if (t == 'object' || t == 'function') {
             switch (o.constructor) {
                 case Array: return 'array';
                 case RegExp: return 'regexp';
             }
             if (typeof o.length == 'number' && typeof o.item == 'function') {
                 return 'nodelist';
             }
         }
         return t;
     }
}

Eye.on          = Eye.onGlobalEvent;
Eye.un          = Eye.removeGlobalEvent;
Eye.dis         = Eye.dispatchGlobalEvent;
Eye.addEvent    = Eye.addEventListener;
Eye.removeEvent = Eye.removeEventListener;
Eye.disEvent    = Eye.dispatchEvent;

}
})();













