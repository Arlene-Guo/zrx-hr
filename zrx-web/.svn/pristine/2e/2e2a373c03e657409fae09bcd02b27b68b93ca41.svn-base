var
_tac = _tac || [],
    _tat = _tat || (function () {
        var expireDateTime, loginTime = setCurrentTime(),
            plugins = {}, hasLoaded = false,
            registeredOnLoadHandlers = [],
            documentAlias = document,
            navigatorAlias = navigator,
            screenAlias = screen,
            windowAlias = window,
            escapeWrapper = windowAlias.encodeURIComponent || escape,
            unescapeWrapper = windowAlias.decodeURIComponent || unescape,
            _opera_ta = ["", "", ""];

        function setCurrentTime() {
            var currenttime = (new Date()).getTime();
            return currenttime;
        }

        function isDefined(property) {
            return (property = typeof property) !== 'undefined' && property !== 'unknown';
        }

        function apply(parameterArray) {
            var f = parameterArray.shift();
            if (typeof f == 'string') {
                asyncTracker[f].apply(this, parameterArray);
            } else {
                f.apply(this, parameterArray);
            }
        }

        function addEventListener(element, eventType, eventHandler, useCapture) {
            if (element.addEventListener) {
                element.addEventListener(eventType, eventHandler, useCapture);
                return true;
            }
            if (element.attachEvent) {
                return element.attachEvent('on' + eventType, eventHandler);
            }
            element['on' + eventType] = eventHandler;
        }

        function executePluginMethod(methodName, callback) {
            var result = '',
                i, pluginMethod;
            for (i in plugins) {
                pluginMethod = plugins[i][methodName];
                if (typeof pluginMethod === 'function') {
                    result += pluginMethod(callback);
                }
            }
            return result;
        }

        function beforeUnloadHandler(unloadEvent) {
            executePluginMethod('unload');
            if (isDefined(expireDateTime)) {
                var now;
                do {
                    now = new Date();
                } while (now.getTime() < expireDateTime);
            }
        }

        function loadHandler(loadEvent) {
            if (!hasLoaded) {
                hasLoaded = true;
                executePluginMethod('load');
                for (var i = 0; i < registeredOnLoadHandlers.length; i++) {
                    registeredOnLoadHandlers[i]();
                }
            }
            return true;
        }

        function addReadyListener() {
            if (documentAlias.addEventListener) {
                addEventListener(documentAlias, 'DOMContentLoaded', function readyDOMContentLoaded() {
                    documentAlias.removeEventListener('DOMContentLoaded', readyDOMContentLoaded, false);
                    loadHandler();
                });
            } else if (documentAlias.attachEvent) {
                documentAlias.attachEvent('onreadystatechange', function readyOnReadyStateChange() {
                    if (documentAlias.readyState === 'complete') {
                        documentAlias.detachEvent('onreadystatechange', readyOnReadyStateChange);
                        loadHandler();
                    }
                });
                if (documentAlias.documentElement.doScroll && windowAlias == windowAlias.top) {
                    (function ready() {
                        if (!hasLoaded) {
                            try {
                                documentAlias.documentElement.doScroll('left');
                            } catch (error) {
                                setTimeout(ready, 0);
                                return;
                            }
                            loadHandler();
                        }
                    }());
                }
            }
            addEventListener(windowAlias, 'load', loadHandler, false);
        }

        function getReferrer() {
            var referrer = '';
            try {
                referrer = top.documentAlias.referrer;
            } catch (e) {
                if (parent) {
                    try {
                        referrer = parent.documentAlias.referrer;
                    } catch (e2) {
                        referrer = '';
                    }
                }
            }
            if (referrer === '') {
                referrer = documentAlias.referrer;
            }
            return referrer;
        }

        function getHostname(url) {
            var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'),
                matches = e.exec(url);
            return matches ? matches[1] : url;
        }

        function getParameter(url, varName) {
            var e = new RegExp('^(?:https?|ftp)(?::/*(?:[^?]+)[?])([^#]+)'),
                matches = e.exec(url),
                f = new RegExp('(?:^|&)' + varName + '=([^&]*)'),
                result = matches ? f.exec(matches[1]) : 0;
            return result ? unescapeWrapper(result[1]) : '';
        }

        function urlFixup(hostname, href, referrer) {
            if (hostname == 'webcache.googleusercontent.com' || hostname == 'cc.bingj.com' || hostname.substr(0, 5) == '74.6.') {
                href = documentAlias.links[0].href;
                hostname = getHostname(href);
            } else if (hostname == 'translate.googleusercontent.com') {
                if (referrer === '') {
                    referrer = href;
                }
                href = getParameter(href, 'u');
                hostname = getHostname(href);
            }
            return [hostname, href, referrer];
        }

        function Tracker() {
            var registeredHooks = {}, configTrackerPause = 500,
                locationArray = urlFixup(windowAlias.location.hostname, windowAlias.location.href, getReferrer()),
                locationHostnameAlias = locationArray[0],
                configHostsAlias = [locationHostnameAlias],
                configIgnoreClasses = [],
                configDownloadClasses = [],
                configLinkClasses = [],
                ignoredReferrer = [".tuniu.com"],
                organicEngine = ["baidu.com", "baidu.com", "baidu.com", "google.com", "google.cn", "sogou.com", "zhongsou.com", "search.yahoo.com", "one.cn.yahoo.com", "soso.com", "114search.118114.cn", "youdao.com", "gougou.com", "bing.com", "qihoo.com", "21cn.com", "goso.cn", "so.360.cn"],
                organicKeyword = ["word", "wd", "query", "q", "q", "query", "w", "p", "p", "w", "kw", "q", "search", "q", "kw", "keyword", "q", "q"],
                organicPayVaule = ["1044", "1558", "1045", "1559", "1499", "1326", "12358", "12991"],
                organicPayEngine = ["baidu", "baidu", "google", "google", "sogou", "soso", "youdao", "bing"],
                tam_source = "utm_source",
                tam_medium = "utm_medium",
                tam_campaign = "utm_campaign",
                tam_content = "utm_content",
                tam_term = "utm_term",
                tam_cmp = "cmpid",
                tam_pay = "p",
                sourceValue = "",
                mediumValue = "",
                campaignValue = "",
                termValue = "",
                contentValue = "",
                linkTrackingInstalled = false,
                cpro = documentAlias.location.protocol,
                chost = 'bas.test.tuniu.org',
                cgif = 'analysisCollect/dataCollect.action',
                configTrackerURL = cpro + '//' + chost + '/' + cgif,
                cPageNotFoundDomain = "www.tuniu.com",
                cPageNotFoundPage = "html/404.html",
                url404Default = cpro + "//" + cPageNotFoundDomain + "/" + cPageNotFoundPage,
                fromUrl = locationArray[2],
                visitUrl = locationArray[1],
                browserArray = getBrowser(),
                browserHW = browserArray[1] + '*' + browserArray[0],
                screenColor = screenAlias.colorDepth,
                screenResolution = screenAlias.width + '*' + screenAlias.height,
                operatingSystem = getPlatform(),
                userAgent = navigatorAlias.userAgent.toLowerCase(),
                browserType = (userAgent.match(/(?:firefox|opera|safari|chrome|msie)/))[0],
                browserVersion = (userAgent.match(/(?:firefox|opera|safari|chrome|msie)[\/: ]([\d.]+)/))[1],
                flashVersion = _uFlash(),
                javaEnabled = 1,
                language = "-",
                cookieEnabled = navigatorAlias.cookieEnabled ? "1" : "0",
                titleName = documentAlias.title,
                pageName = "",
                configDownloadExtensions = '7z|aac|ar[cj]|as[fx]|bin|csv|deb|dmg|doc|docx|exe|gz|gzip|hqx|jar|ms[ip]|od[bfgpst]|og[gv]|pdf|ppt|pptx|pub|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd|xls|xlsx|xml|z|zip|vsd',
                tacaName = "_taca",
                tacbName = "_tacb",
                taccName = "_tacc",
                regUserCookieName = "tuniuuser",
                tacauName = "_tacau",
                tactName = "_tact",
                taczName = "_tacz2",
                cookieDomain = ".tuniu.com",
                cookiePath = "/",
                tacbTimeoutHours = 1 / 2,
                tacaTimeoutHours = 2 * 365 * 24,
                taczTimeoutHours = 30 * 24,
                innerNumUrl = "http://analysis.tuniu.com/",
                loadSpend = -1,
                executeSpend = -1,
                isEvent = 0,
                eventId = "",
                orderId = "",
                routeId = "",
                linkType = "link";
            linkTrackingInstalled = false;
            javaEnabled = navigatorAlias.javaEnabled() ? 1 : 0;
            if (navigatorAlias.appName === "Netscape") {
                screenColor = screenAlias.pixelDepth;
            }
            if (navigatorAlias.language) {
                language = navigatorAlias.language.toLowerCase();
            } else if (navigatorAlias.browserLanguage) {
                language = navigatorAlias.browserLanguage.toLowerCase();
            }
            if (!existInnerNumCookie(visitUrl) || needSetUtmCookie(visitUrl)) {
                getCookieImage();
            }

            function needSetUtmCookie(visit_url) {
                if ((decodeURIComponent(visit_url).indexOf("utm_source") > 0) && !hasCookie('tuniu_p_utm')) {
                    return true;
                } else {
                    return false;
                }
            }

            function getCookieImage() {
                var image = new Image(1, 1);
                image.onLoad = function () {};
                image.src = innerNumUrl + 'ta_cookie_script.php?visit_url=' + encodeURIComponent(visitUrl);
                image = null;
            }

            function existInnerNumCookie(visit_url) {
                if (isTuanUrl(visit_url)) {
                    return false;
                }
                var specialCharFlag = false;
                specialCharFlag = ((decodeURIComponent(visit_url).indexOf("#") == -1) ? false : true);
                if (!hasCookie("inner_num")) {
                    return false;
                } else if (getCookie("inner_num") == "MA==") {
                    return false;
                } else {
                    if (!specialCharFlag) {
                        return true;
                    } else {
                        if (!hasCookie("inner_num_ex")) {
                            return false;
                        } else if (getCookie("inner_num_ex") == "MA==") {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }

            function isTuanUrl(visit_url) {
                var strRegex = /^http:\/\/tuan|^tuan/;
                var re = new RegExp(strRegex);
                if (re.test(visit_url)) {
                    return (true);
                } else {
                    return (false);
                }
            }

            function getBrowser() {
                var pageWidth = windowAlias.innerWidth,
                    pageHeight = windowAlias.innerHeight;
                if (typeof pageWidth != "number") {
                    if (documentAlias.compatMode == "CSS1Compat") {
                        pageWidth = documentAlias.documentElement.clientWidth;
                        pageHeight = documentAlias.documentElement.clientHeight;
                    } else if (documentAlias.body == null) {
                        pageWidth = 0;
                        pageHeight = 0;
                    } else {
                        pageWidth = documentAlias.body.clientWidth;
                        pageHeight = documentAlias.body.clientHeight;
                    }
                }
                return [pageWidth, pageHeight];
            }

            function getRequest() {
                var cookie = "",
                    request = "";
                if (navigatorAlias.cookieEnabled) {
                    cookie = getAnalysisCookie();
                }
                if (typeof (analyTuniuBeginTime) !== "undefined" && !isNaN(analyTuniuBeginTime)) {
                    loadSpend = loginTime - analyTuniuBeginTime;
                }
                if (typeof (analyTuniuSpend) !== "undefined" && !isNaN(analyTuniuSpend)) {
                    executeSpend = Math.floor(analyTuniuSpend * 1000);
                }
                if (!pageName) {
                    pageName = visitUrl.split("\?")[0];
                };
                var innerNum = 0;
                if (hasCookie("inner_num")) {
                    innerNum = getCookie("inner_num");
                }
                if (hasCookie("inner_num_ex")) {
                    innerNumEx = getCookie("inner_num_ex");
                } else {
                    innerNumEx = 0;
                }
                var remark = "";
                request = "hw=" + browserHW + "&bt=" + browserType + "&bv=" + browserVersion + "&fu=" + escapeWrapper(fromUrl) + "&lg=" + loginTime + "&co=" + cookie + "&vu=" + escapeWrapper(visitUrl) + "&sr=" + screenResolution + "&sc=" + screenColor + "&os=" + operatingSystem + "&fv=" + flashVersion + "&la=" + language + "&je=" + javaEnabled + "&ce=" + cookieEnabled + "&tn=" + "" + "&pn=" + escapeWrapper(escapeWrapper(pageName)) + "&clt=" + linkType + "&ev=" + isEvent + "&ei=" + eventId + "&ps=" + loadSpend + "&es=" + executeSpend + "&nm=" + innerNum + "&ie=" + innerNumEx + "&oi=" + orderId + "&ri=" + routeId + "&rk="+remark;
                return request;
            }
            var tryTimes = 0;

            function logPageView(isPageView) {
                if ((isEvent == 0 || isPageView) && tryTimes < 10) {
                    if (existInnerNumCookie(visitUrl)) {
                        logPageViewRequest(true);
                        var request = getRequest();
                        sendRequest(request, configTrackerPause);
                    } else {
                        setTimeout(function () {
                            logPageView('"+true+"');
                        }, 100);
                        tryTimes = tryTimes + 1;
                    }
                } else {
                    logPageViewRequest();
                    var request = getRequest();
                    sendRequest(request, configTrackerPause);
                }
            }

            function logPageViewRequest(isPageView) {
                if (isPageView) {
                    isEvent = 0;
                }
            }

            function logLink(clickUrl, type) {
                fromUrl = locationArray[1];
                visitUrl = clickUrl;
                linkType = type;
                loginTime = setCurrentTime();
                var request = getRequest();
                sendRequest(request, configTrackerPause);
            }

            function sendRequest(request, delay) {
                var now = new Date();
                expireDateTime = now.getTime() + delay;
                getImage(request);
            }

            function getImage(request) {
                var image = new Image(1, 1);
                image.onLoad = function () {};
                image.src = configTrackerURL + '?' + request + "&sid=" + getSid();
                image = null;
            }

            function getSid() {
                var s = '' + loginTime,
                    a = '',
                    b = '',
                    y;
                s = s.substr(s.length - 8);
                for (var i = 0; i < s.length; i++) {
                    y = Math.floor(Math.random() * 10);
                    b += y;
                    a += s.charCodeAt(i) << y;
                }
                return b + a;
            }

            function isSiteHostName(hostName) {
                var i, alias, offset;
                for (i = 0; i < configHostsAlias.length; i++) {
                    alias = configHostsAlias[i].toLowerCase();
                    if (hostName == alias) {
                        return true;
                    }
                    if (hostName.indexOf("tuniu")) {
                        return true;
                    }
                    if (alias.substr(0, 2) == '*.') {
                        if ((hostName) == alias.substr(2)) {
                            return true;
                        }
                        offset = hostName.length - alias.length + 1;
                        if ((offset > 0) && (hostName.substr(offset) == alias.substr(1))) {
                            return true;
                        }
                    }
                }
                return false;
            }

            function getClassesRegExp(configClasses, defaultClass) {
                var i, classesRegExp = '(^| )(piwik[_-]' + defaultClass;
                if (isDefined(configClasses)) {
                    for (i = 0; i < configClasses.length; i++) {
                        classesRegExp += '|' + configClasses[i];
                    }
                }
                classesRegExp += ')( |$)';
                return new RegExp(classesRegExp);
            }

            function getLinkType(className, href, isInLink) {
                if (!isInLink) {
                    return 'link';
                }
                var downloadPattern = getClassesRegExp(configDownloadClasses, 'download'),
                    linkPattern = getClassesRegExp(configLinkClasses, 'link'),
                    downloadExtensionsPattern = new RegExp('\\.(' + configDownloadExtensions + ')([?&#]|$)', 'i');
                return linkPattern.test(className) ? 'link' : (downloadPattern.test(className) || downloadExtensionsPattern.test(href) ? 'download' : 0);
            }

            function clickHandler(clickEvent) {
                var sourceElement, parentElement, tag, linkType, originalSourceHostName, sourceHostName, sourceHref, scriptProtocol;
                if (!isDefined(clickEvent)) {
                    clickEvent = windowAlias.event;
                }
                if (isDefined(clickEvent.target)) {
                    sourceElement = clickEvent.target;
                } else if (isDefined(clickEvent.srcElement)) {
                    sourceElement = clickEvent.srcElement;
                } else {
                    return;
                }
                while ((parentElement = sourceElement.parentNode) && ((tag = sourceElement.tagName) != 'A' && tag != 'AREA')) {
                    sourceElement = parentElement;
                }
                if (isDefined(sourceElement.href)) {
                    originalSourceHostName = sourceElement.hostname;
                    sourceHostName = originalSourceHostName.toLowerCase();
                    sourceHref = sourceElement.href.replace(originalSourceHostName, sourceHostName);
                    scriptProtocol = new RegExp('^(javascript|vbscript|jscript|mocha|livescript|ecmascript): *', 'i');
                    if (!scriptProtocol.test(sourceHref)) {
                        linkType = getLinkType(sourceElement.className, sourceHref, isSiteHostName(sourceHostName));
                        if (linkType) {
                            logLink(sourceHref, linkType);
                        }
                    }
                }
            }

            function addClickListener(element) {
                addEventListener(element, 'click', clickHandler, false);
            }

            function addClickListeners() {
                if (!linkTrackingInstalled) {
                    linkTrackingInstalled = true;
                    var i, ignorePattern = getClassesRegExp(configIgnoreClasses, 'ignore'),
                        linkElements = documentAlias.links;
                    if (linkElements) {
                        for (i = 0; i < linkElements.length; i++) {
                            if (!ignorePattern.test(linkElements[i].className)) {
                                addClickListener(linkElements[i]);
                            }
                        }
                    }
                }
            }

            function registerHook(hookName, userHook) {
                var hookObj = null;
                if (typeof hookName == 'string' && !isDefined(registeredHooks[hookName])) {
                    if (typeof userHook == 'object') {
                        hookObj = userHook;
                    } else if (typeof userHook == 'string') {
                        try {
                            eval('hookObj =' + userHook);
                        } catch (e) {}
                    }
                    registeredHooks[hookName] = hookObj;
                }
                return hookObj;
            }

            function setAnalysisCookie() {
                setAnonyCookie(regUserCookieName, tacauName);
                setTraceCookie(tactName);
                setTaczCookie(taczName);
                setTacaCookie(taccName, tacbName, tacaName);
                setTacbCookie(taccName, tacbName);
                setTaccCookie(taccName);
            }

            function getAnalysisCookie() {
                setAnalysisCookie();
                var requestCookie = "";
                if (hasCookie(tacaName)) {
                    if (browserType === "opera" && _opera_ta[0] !== "") {
                        requestCookie += tacaName + "=" + _opera_ta[0] + ";";
                        _opera_ta[0] = "";
                    } else
                        requestCookie += tacaName + "=" + getCookie(tacaName) + ";";
                }
                if (hasCookie(tacbName)) {
                    if (browserType === "opera" && _opera_ta[1] !== "") {
                        requestCookie += tacbName + "=" + _opera_ta[1] + ";";
                        _opera_ta[1] = "";
                    } else
                        requestCookie += tacbName + "=" + getCookie(tacbName) + ";";
                }
                if (hasCookie(tacauName)) {
                    requestCookie += tacauName + "=" + getCookie(tacauName) + ";";
                }
                if (hasCookie(tactName)) {
                    requestCookie += tactName + "=" + getCookie(tactName) + ";";
                }
                if (hasCookie(taczName)) {
                    if (browserType === "opera" && _opera_ta[2] !== "") {
                        requestCookie += taczName + "=" + _opera_ta[2] + ";";
                        _opera_ta[2] = "";
                    } else
                        requestCookie += taczName + "=" + getCookie(taczName) + ";";
                }
                if (hasCookie("tuniu_partner")) {
                    requestCookie += "tuniu_partner=" + getCookie("tuniu_partner") + ";";
                }
                if (hasCookie("tuniuuser")) {
                    requestCookie += "tuniuuser=" + getCookie("tuniuuser") + ";";
                }
                if (hasCookie("tuniuuser_citycode")) {
                    requestCookie += "tuniuuser_citycode=" + getCookie("tuniuuser_citycode") + ";";
                }
                return requestCookie;
            }

            function setTaczCookie(taczName, fromUrl) {
                var arr = new Array();
                if (!(hasCookie(taczName))) {
                    setNewTaczCookie(fromUrl);
                } else {
                    if (isSearchEnginePay()) {
                        resetTaczCookie(true);
                        return;
                    }
                    if (isSearchEngine()) {
                        resetTaczCookie(true);
                        return;
                    }
                    if (isCampaign()) {
                        resetTaczCookie(true);
                        return;
                    }
                    if ((!(hasCookie(tacbName) && hasCookie(taccName))) && !isRight()) {
                        if (isReferral()) {
                            resetTaczCookie(true);
                            return;
                        }
                    }
                }
            }

            function setNewTaczCookie(referrer) {
                if (isSearchEnginePay()) {
                    resetTaczCookie(false);
                    return;
                }
                if (isSearchEngine()) {
                    resetTaczCookie(false);
                    return;
                }
                if (isCampaign()) {
                    resetTaczCookie(false);
                    return;
                }
                if (isReferral()) {
                    resetTaczCookie(false);
                    return;
                }
                if (isReferral()) {
                    resetTaczCookie(false);
                    return;
                }
                directInfo();
                resetTaczCookie(false);
            }

            function getQueryStringRegExp(url, key) {
                var reg = new RegExp("(^|&|\\?)" + key + "=([^&]*)(&|\x24|#)"),
                    k = url.match(reg);
                return k ? k[2] : "";
            }

            function resetTaczCookie(flag) {
                var cookieValue;
                if (flag || flag == 'true') {
                    delCookie(taczName);
                }
                cookieValue = "taccsr=" + sourceValue + "|tacccn=" + mediumValue + "|taccmd=" + campaignValue + "|taccct=" + termValue.replace(new RegExp("%", "g"), "%25") + "|taccrt=" + contentValue.replace(new RegExp("%", "g"), "%25");
                setCookie(taczName, cookieValue, taczTimeoutHours, cookiePath, cookieDomain);
            }

            function directInfo() {
                sourceValue = "(direct)";
                mediumValue = "(none)";
                campaignValue = "(none)";
                termValue = "(none)";
                contentValue = "(none)";
            }

            function isReferral() {
                if ((!isRight()) && getHostname(fromUrl)) {
                    sourceValue = getHostname(fromUrl);
                    mediumValue = "(referral)";
                    campaignValue = "(none)";
                    termValue = "(none)";
                    contentValue = "(none)";
                    return true;
                } else {
                    return false;
                }
            }

            function isSearchEngine() {
                var w = organicEngine,
                    u = organicKeyword,
                    arr;
                arr = new Array();
                arr = getSearchKey();
                if (arr.length == 2) {
                    sourceValue = arr[0];
                    mediumValue = "(organic)";
                    if (getQueryStringRegExp(visitUrl, tam_cmp)) {
                        campaignValue = getQueryStringRegExp(visitUrl, tam_cmp);
                    } else {
                        campaignValue = "(none)";
                    }
                    termValue = arr[1];
                    if (getQueryStringRegExp(visitUrl, tam_content)) {
                        contentValue = getQueryStringRegExp(visitUrl, tam_content);
                    } else {
                        contentValue = "(none)";
                    }
                    return true;
                }
                return false;
            }

            function getSearchKey() {
                var w = organicEngine,
                    u = organicKeyword,
                    arr;
                arr = new Array();
                for (var i = 0; i < w.length; i++) {
                    if ((fromUrl.indexOf(w[i]) > -1) && (getQueryStringRegExp(fromUrl, u[i]))) {
                        arr[0] = w[i].replace(/(.*)(\.(com|cn|org).*)$/ig, "$1");
                        arr[1] = getQueryStringRegExp(fromUrl, u[i]);
                        break;
                    }
                }
                return arr;
            }

            function isSearchEnginePay() {
                var v = organicPayVaule,
                    e = organicPayEngine,
                    arr;
                arr = new Array();
                for (var i = 0; i < v.length; i++) {
                    if (v[i] == getQueryStringRegExp(visitUrl, tam_pay)) {
                        mediumValue = "(cpc)";
                        sourceValue = e[i];
                        if (getQueryStringRegExp(visitUrl, tam_cmp)) {
                            campaignValue = getQueryStringRegExp(visitUrl, tam_cmp);
                        } else if (getQueryStringRegExp(visitUrl, tam_campaign)) {
                            campaignValue = getQueryStringRegExp(visitUrl, tam_campaign);
                        } else {
                            campaignValue = "(none)";
                        }
                        arr = getSearchKey();
                        if (arr.length == 2) {
                            termValue = arr[1];
                        } else {
                            termValue = "(none)";
                        }
                        if (getQueryStringRegExp(visitUrl, tam_content)) {
                            contentValue = getQueryStringRegExp(visitUrl, tam_content);
                        } else {
                            contentValue = "(none)";
                        }
                        return true;
                    }
                }
                return false;
            }

            function isCampaign() {
                if (!getQueryStringRegExp(visitUrl, tam_cmp)) {
                    return false;
                } else {
                    campaignValue = getQueryStringRegExp(visitUrl, tam_cmp);
                }
                mediumValue = "(campaign)";
                if (!fromUrl) {
                    sourceValue = "(direct)";
                } else {
                    sourceValue = getHostname(fromUrl);
                }
                if (getQueryStringRegExp(visitUrl, tam_term)) {
                    termValue = getQueryStringRegExp(visitUrl, tam_term);
                } else {
                    termValue = "(none)";
                }
                if (getQueryStringRegExp(visitUrl, tam_content)) {
                    contentValue = getQueryStringRegExp(visitUrl, tam_content);
                } else {
                    contentValue = "(none)";
                }
                return true;
            }

            function isRight() {
                var v = ignoredReferrer,
                    m = v.length;
                for (var i = 0; i < m; i++) {
                    if (getHostname(fromUrl).indexOf(v[i]) > -1) {
                        return true;
                    }
                }
                return false;
            }

            function setAnonyCookie(regUserCookieName, auName) {
                if (hasCookie(regUserCookieName)) {
                    if (hasCookie(auName)) {
                        delCookie(auName);
                    }
                } else {
                    if (hasCookie(auName) == false) {
                        var anonyName = "0," + newGuid() + ",";
                        setCookie(auName, base64encode(anonyName), (15 * 24), cookiePath, cookieDomain);
                    }
                }
            }

            function setTraceCookie(tName) {
                if (hasCookie(tName)) {
                    resetCookie(tName, tacaTimeoutHours, cookiePath, cookieDomain);
                } else {
                    setCookie(tName, base64encode(newGuid()), tacaTimeoutHours, cookiePath, cookieDomain);
                }
            }

            function setTaccCookie(cName) {
                if (hasCookie(cName) == false) {
                    setCookie(cName, "1", "", cookiePath, cookieDomain);
                }
            }

            function setTacbCookie(cName, bName) {
                if (hasCookie(cName)) {
                    if (hasCookie(bName)) {
                        resetCookie(bName, tacbTimeoutHours, cookiePath, cookieDomain);
                    } else {
                        setCookie(bName, base64encode(newGuid()), tacbTimeoutHours, cookiePath, cookieDomain);
                    }
                } else {
                    if (hasCookie(bName)) {
                        delCookie(bName);
                        setCookie(bName, base64encode(newGuid()), tacbTimeoutHours, cookiePath, cookieDomain);
                    } else {
                        setCookie(bName, base64encode(newGuid()), tacbTimeoutHours, cookiePath, cookieDomain);
                    }
                }
            }

            function setTacaCookie(cName, bName, aName) {
                if (hasCookie(cName)) {
                    if (hasCookie(bName)) {
                        if (hasCookie(aName) == false) {
                            setFirstTacaCookie();
                        }
                    } else {
                        if (hasCookie(aName)) {
                            resetTacaCookie(aName);
                        } else {
                            setFirstTacaCookie();
                        }
                    }
                } else {
                    if (hasCookie(aName)) {
                        resetTacaCookie(aName);
                    } else {
                        setFirstTacaCookie();
                    }
                }
            }

            function resetTacaCookie(tacaName) {
                var tacaValue = getCookie(tacaName),
                    tacaValueArray = tacaValue.split(".");
                delCookie(tacaName);
                tacaValue = tacaValueArray[0] + "." + tacaValueArray[2] + "." + loginTime + "." + (parseInt(tacaValueArray[3]) + 1);
                setCookie(tacaName, tacaValue, tacaTimeoutHours, cookiePath, cookieDomain);
            }

            function setFirstTacaCookie() {
                var count = 1,
                    tacaFirstValue = loginTime + "." + loginTime + "." + loginTime + "." + count;
                setCookie(tacaName, tacaFirstValue, tacaTimeoutHours, cookiePath, cookieDomain);
            }

            function setCookie(cookieName, value, hoursToExpire, path, domain) {
                var expiryDate;
                if (browserType === "opera") {
                    if (cookieName === "_taca")
                        _opera_ta[0] = value;
                    else if (cookieName === "_tacb")
                        _opera_ta[1] = value;
                    else if (cookieName === "_tacz")
                        _opera_ta[2] = value;
                }
                if (hoursToExpire) {
                    expiryDate = new Date();
                    expiryDate.setTime(expiryDate.getTime() + hoursToExpire * 3.6e6);
                }
                documentAlias.cookie = cookieName + '=' + escape(value) + (hoursToExpire ? ';expires=' + expiryDate.toGMTString() : '') + ';path=' + (path ? path : '/') + (domain ? ';domain=' + domain : '');
            }

            function resetCookie(cookieName, hoursToExpire, path, domain) {
                var cookieValue = getCookie(cookieName);
                delCookie(cookieName);
                setCookie(cookieName, cookieValue, hoursToExpire, path, domain);
            }

            function hasCookie(name) {
                var bikky = documentAlias.cookie,
                    i = 0,
                    len = bikky.length,
                    offset;
                name += "=";
                while (i < len) {
                    offset = i + name.length;
                    if (bikky.substring(i, offset) == name) {
                        return true;
                    }
                    i = bikky.indexOf(" ", i) + 1;
                    if (i == 0)
                        break;
                }
                return false;
            }

            function delCookie(name) {
                var exp = new Date(),
                    cval = getCookie(name);
                exp.setTime(exp.getTime() - 1);
                if (cval != null) {
                    documentAlias.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                }
            }

            function getCookie(name) {
                var arr = documentAlias.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null)
                    return unescape(arr[2]);
                return null;
            }
            executePluginMethod('run', registerHook);
            return {
                setTrackerURL: function (trackerURL) {
                    if (isDefined(trackerURL)) {
                        configTrackerURL = trackerURL;
                    }
                },
                setSessionCookieTimeout: function (cookieTimeoutMillis) {
                    if (isDefined(cookieTimeoutMillis)) {
                        tacbTimeoutHours = parseFloat(cookieTimeoutMillis) / 3600000;
                    }
                },
                setVisitorCookieTimeout: function (cookieTimeoutMillis) {
                    if (isDefined(cookieTimeoutMillis)) {
                        tacaTimeoutHours = parseFloat(cookieTimeoutMillis) / 3600000;
                    }
                },
                addOrganic: function (newOrganicEngine, newOrganicKeyword, opt_prepend) {
                    if (isDefined(newOrganicEngine) && isDefined(newOrganicKeyword) && isDefined(opt_prepend)) {
                        if (opt_prepend == true) {
                            organicEngine.unshift(newOrganicEngine);
                            organicKeyword.unshift(newOrganicKeyword);
                        } else {
                            organicEngine.push(newOrganicEngine);
                            organicKeyword.push(newOrganicKeyword);
                        }
                    }
                },
                setTrafficSourceCookieTimeout: function (cookieTimeoutMillis) {
                    if (isDefined(cookieTimeoutMillis)) {
                        taczTimeoutHours = parseFloat(cookieTimeoutMillis) / 3600000;
                    }
                },
                setPageName: function (newPageName) {
                    if (isDefined(newPageName)) {
                        pageName = newPageName;
                    }
                },
                trackEvent: function (newEventId, newOrder, newRoute) {
                    if (isDefined(newEventId) && isDefined(newOrder) && isDefined(newRoute)) {
                        isEvent = 1;
                        eventId = newEventId;
                        loginTime = setCurrentTime();
                        orderId = newOrder;
                        routeId = newRoute;
                        logPageView();
                    }
                },
                addSearchPay: function (value, searchEngine) {
                    if (isDefined(value) && isDefined(searchEngine)) {
                        organicPayVaule.push(value);
                        organicPayEngine.push(searchEngine);
                    }
                },
                setCampaignArg: function (value) {
                    if (isDefined(value)) {
                        tam_cmp = value;
                    }
                },
                setSearchPayArg: function (value) {
                    if (isDefined(value)) {
                        tam_pay = value;
                    }
                },
                setDocumentTitle: function (documentTitle) {
                    if (isDefined(documentTitle)) {
                        titleName = documentTitle;
                    }
                },
                addDownloadExtensions: function (extensions) {
                    if (isDefined(extensions)) {
                        configDownloadExtensions += '|' + extensions;
                    }
                },
                enableLinkTracking: function () {
                    if (hasLoaded) {
                        addClickListeners();
                    } else {
                        registeredOnLoadHandlers[registeredOnLoadHandlers.length] = function () {
                            addClickListeners();
                        };
                    }
                },
                setPageNotFoundUrl: function (url) {
                    if (isDefined(url)) {
                        var p = url.indexOf('___');
                        if (p > -1) {
                            visitUrl = url.substr(0, p);
                            if (visitUrl == '/404/url/') {
                                visitUrl += url404Default;
                            }
                            fromUrl = url.substr(p + 3);
                        }
                    }
                },
                setDefaultPageNotFoundUrl: function () {
                    visitUrl = '/404/url/' + url404Default;
                },
                trackLink: function (sourceUrl, linkType) {
                    logLink(sourceUrl, linkType);
                },
                trackPageView: function () {
                    logPageView();
                }
            };

            function getPlatform() {
                var platform = "not set",
                    isWin = (navigatorAlias.platform == "Win32") || (navigatorAlias.platform == "Windows"),
                    isMac = (navigatorAlias.platform == "Mac68K") || (navigatorAlias.platform == "MacPPC") || (navigatorAlias.platform == "Macintosh"),
                    isUnix = (navigatorAlias.platform == "X11") && !isWin && !isMac;
                if (isMac) {
                    platform = "Mac";
                }
                if (isUnix) {
                    platform = "Unix";
                }
                if ((String(navigator.platform).indexOf("Linux") > -1))
                    platform = "Linux";
                if (isWin) {
                    if (navigatorAlias.userAgent.indexOf("Win95") > -1 || navigatorAlias.userAgent.indexOf("Windows 95") > -1) {
                        platform = "windows 95";
                    }
                    if (navigatorAlias.userAgent.indexOf("Win98") > -1 || navigatorAlias.userAgent.indexOf("Windows 98") > -1) {
                        platform = "windows 98";
                    }
                    if (navigatorAlias.userAgent.indexOf("Windows 9x 4.90") > -1 || navigatorAlias.userAgent.indexOf("Windows ME") > -1) {
                        platform = "windows ME";
                    }
                    if (navigatorAlias.userAgent.indexOf("Windows NT 5.0") > -1 || navigatorAlias.userAgent.indexOf("Windows 2000") > -1) {
                        platform = "windows 2000";
                    }
                    if (navigatorAlias.userAgent.indexOf("Windows NT 5.1") > -1 || navigatorAlias.userAgent.indexOf("Windows XP") > -1) {
                        platform = "windows XP";
                    }
                    if (navigatorAlias.userAgent.indexOf("Windows NT 5.2") > -1 || navigatorAlias.userAgent.indexOf("Windows 2003") > -1) {
                        platform = "windows 2003";
                    }
                    if (navigatorAlias.userAgent.indexOf("Windows NT 6.0") > -1 || navigatorAlias.userAgent.indexOf("Windows Vista") > -1) {
                        platform = "Windows Vista";
                    }
                    if (navigatorAlias.userAgent.indexOf("Windows NT 6.1") > -1 || navigatorAlias.userAgent.indexOf("Windows 7") > -1)
                        platform = "Win7";
                }
                return platform;
            }

            function _uFlash() {
                var f = "-",
                    fl;
                if (navigatorAlias.plugins && navigatorAlias.plugins.length) {
                    for (var ii = 0; ii < navigatorAlias.plugins.length; ii++) {
                        if (navigatorAlias.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
                            f = navigatorAlias.plugins[ii].description.split('Shockwave Flash ')[1];
                            break;
                        }
                    }
                } else {
                    try {
                        fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                        f = fl.GetVariable("$version");
                    } catch (e) {}
                    if (f == "-") {
                        try {
                            fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                            f = "WIN 6,0,21,0";
                            fl.AllowScriptAccess = "always";
                            f = fl.GetVariable("$version");
                        } catch (e) {}
                    }
                    if (f == "-") {
                        try {
                            fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            f = fl.GetVariable("$version");
                        } catch (e) {}
                    }
                    if (f != "-") {
                        f = f.split(" ")[1].split(",");
                        f = f[0] + "." + f[1] + " r" + f[2];
                    }
                }
                return f;
            }

            function newGuid() {
                var guid = "",
                    n;
                for (var i = 1; i <= 32; i++) {
                    n = Math.floor(Math.random() * 16.0).toString(16);
                    guid += n;
                    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                        guid += "-";
                    }
                }
                return guid;
            }

            function base64encode(str) {
                str = utf16to8(str);
                var out = "",
                    i = 0,
                    len = str.length,
                    c1, c2, c3, base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            }

            function utf16to8(str) {
                var out, i, len, c;
                out = "";
                len = str.length;
                for (i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    } else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    } else {
                        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                    }
                }
                return out;
            }
        }
        var asyncTracker = new Tracker();

        function TrackerProxy() {
            return {
                push: apply
            };
        }
        addEventListener(windowAlias, 'beforeunload', beforeUnloadHandler, false);
        addReadyListener();
        for (var index = 0; index < _tac.length; index++) {
            apply(_tac[index]);
        }
        _tac = new TrackerProxy();
        return {
            getTracker: function () {
                return new Tracker();
            }
        };
    }());
