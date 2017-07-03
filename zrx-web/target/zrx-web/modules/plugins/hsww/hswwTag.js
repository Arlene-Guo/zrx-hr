
//base64使用变量
var hswwUrls, hswwUrl, dev = 'product',
    base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

hswwUrls = {
    'sst': 'http://hsww.sit.tuniu.org',
    'sit': 'http://hsww.sit.tuniu.org',
    'pre': 'http://hsww.tuniu.org',
    'product': 'http://hsww.tuniu.org'
}


//组件构造方法
function HswwTag(options) {
    this.options = options || {};
    this.init();
}

//组件初始化方法
HswwTag.prototype.init = function() {
    var self = this,
        options = self.options;
    var dev = options.dev ? options.dev : dev;
    hswwUrl = hswwUrls[dev];
    self.data = [];

    //处理初始化参数
    options.prdClassId = options.prdClassId >= 0 ? options.prdClassId : 0;
    options.areaId = options.areaId ? options.areaId : '1602';
    options.mode = options.mode == 'view' ? 'view' : 'edit';
    options.isReadonly = options.isReadonly === true ? true : false;
    options.conditions = options.conditions ? options.conditions : [];
    if (!options.containerId) {
        alert('请传入容器ID');
        return;
    }
    self.getTags();
}

//获取所有hsww筛选项
HswwTag.prototype.getTags = function() {
    var self = this,
        options = self.options,
        xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        var json;
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                try {
                    json = JSON.parse(base64decode(xhr.responseText));
                } catch (err) {
                    alert('HSWW自定义筛选项接口访问异常！');
                }
                json = JSON.parse(base64decode(xhr.responseText));
                json ? self.handleData(json) : false;
            } else {
                alert('HSWW自定义筛选项接口访问异常！');
            }
        }
    }

    xhr.open('post', hswwUrl + '/index.php/api/restfulServiceVtwo/customCondition/', true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(base64encode(JSON.stringify({
        prdClassId: options.prdClassId,
        areaId: options.areaId
    })));

}

//处理获取到的接口数据
HswwTag.prototype.handleData = function(json) {
    var self = this,
        msg;
    if (json.success) {
        if (json.data && json.data.length > 0) {
            self.data = json.data;
            self.createFilter(json.data);
        } else {
            alert('自定义筛选项为空！');
        }
    } else {
        msg = json.msg ? json.msg : '获取自定义筛选项失败！';
        alert(msg);
    }
}

//生成筛选项DOM
HswwTag.prototype.createFilter = function(data) {
    var self = this,
        options = self.options,
        container = document.getElementById(options.containerId),
        html = '<div class="hsww-wrapper">';

    //编辑模式
    if (options.mode == 'edit') {
        data.forEach(function(row, i) {
            var items = row.customConditionChildItem;
            if (items && items.length > 0) {

                html += '<div class="hsww-row hvr-wobble-top"><div class="hsww-left">' + row.customConditionName + '</div><div class="hsww-right">';

                items.forEach(function(item, j) {
                    html += '<label class="checkbox checkbox-inline"' + (options.isReadonly ? ' style="cursor:default;"' : '') + '><input type="checkbox" data-i="' + i + '" data-j="' + j + '"' + (options.isReadonly ? ' style="cursor:default;" disabled' : '') + '><i class="input-helper"></i>' + item.customConditionChildItemName + '</label>';
                });

                html += '</div></div>';
            } else {
                html += '<div class="hsww-row" style="display:none;"><div class="hsww-left">' + row.customConditionName + '</div></div>';
            }
            row.count = 0; //初始化已选中为0
        });

        html += '</div>';
        container.innerHTML = html;

        self.bindEvent(container, data);
        self.createDataStructure(options.conditions, true);
    }
    //查看模式
    else {
        self.createDataStructure(options.conditions, false);
        data.forEach(function(row) {
            if (row.count > 0) {
                html += '<div class="hsww-row view"><div class="hsww-left">' + row.customConditionName + '</div><div class="hsww-right">';

                row.customConditionChildItem.forEach(function(item) {
                    if (item.checked) {
                        html += '<label class="checkbox checkbox-inline">' + item.customConditionChildItemName + '</label>';
                    }
                });

                html += '</div></div>';
            }
        });

        html += '</div>';
        container.innerHTML = html;
    }
}

//绑定事件
HswwTag.prototype.bindEvent = function(container, data) {
    var self = this,
        newContainer = container.cloneNode(true);

    container.parentNode.replaceChild(newContainer, container);

    self.container = newContainer;

    newContainer.addEventListener('change', function(e) {
        var target = e.target,
            i = +target.getAttribute('data-i'),
            j = +target.getAttribute('data-j'),
            checked = target.checked,
            row = data[i],
            limit = +row.customConditionLimit; //最多可以选择多少项

        if (checked) {
            //超出了限制
            if (limit > 0 && row.count >= limit) {
                target.checked = false;
                alert(row.customConditionName + '最多只能选择 ' + limit + ' 个筛选项！');
                return;
            }
            row.count++;
        } else {
            row.count--;
        }

        data[i].customConditionChildItem[j].checked = checked;
        target.parentNode.className = checked ? 'checkbox checkbox-inline checked' : 'checkbox checkbox-inline';
    });
}

//获取选中数据
HswwTag.prototype.getData = function() {
    var self = this,
        data = self.data,
        customConditions = [],
        flag = false;

    if (data) {
        data.forEach(function(row) {
            if (row.count > 0) {

                if (row.customConditionLimit > 0 && row.count > row.customConditionLimit) {
                    alert(row.customConditionName + '最多只能选择 ' + row.customConditionLimit + ' 个筛选项！');
                    flag = true;
                    return;
                }

                row.customConditionChildItem.forEach(function(item) {
                    if (item.checked) {
                        customConditions.push(item.customConditionChildItemId);
                    }
                });
            }
        });

        if (flag) return false;

        return customConditions;
    } else {
        alert('筛选项为空或系统异常！');
        return false;
    }
}

//根据所有的子标签ID构造子父级数据结构
HswwTag.prototype.createDataStructure = function(conditions, isEdit) {
    var self = this,
        data = self.data,
        temp = {},
        customConditions = [],
        conditionChild, customCondition;

    conditions.forEach(function(conditionId) {
        temp[conditionId] = true;
    });

    data.forEach(function(row, i) {
        conditionChild = row.customConditionChildItem || [];
        customCondition = {
            conditionId: row.customConditionId,
            conditionChild: []
        };
        conditionChild.forEach(function(item) {
            if (item.customConditionChildItemId in temp) {
                customConditions[row.customConditionId] = customConditions[row.customConditionId] || { conditionId: row.customConditionId, };
                customCondition.conditionChild.push({
                    conditionId: item.customConditionChildItemId
                });
            }
        });
        if (customCondition.conditionChild.length > 0) {
            customConditions.push(customCondition);
        }
    });

    self.setData(customConditions, isEdit);
}

//设置组件选中项
HswwTag.prototype.setData = function(customConditions, isEdit) {
    var self = this,
        temp = {},
        children,
        data = self.data,
        rows = isEdit && self.container.getElementsByClassName('hsww-row'),
        inputs, selectedCondition, conditionChild;

    if (Object.prototype.toString.call(customConditions) == '[object Array]') {
        if (customConditions.length <= 0) {
            return;
        }

        customConditions.forEach(function(row) {
            conditionChild = row.conditionChild;
            if (Object.prototype.toString.call(conditionChild) == '[object Array]' && conditionChild.length > 0) {
                children = {};
                conditionChild.forEach(function(item) {
                    children[item.conditionId] = true;
                });

                temp[row.conditionId] = {
                    count: conditionChild.length,
                    children: children
                };
            }
        })

        data.forEach(function(row, i) {
            if (row.customConditionId in temp) {
                selectedCondition = temp[row.customConditionId];
                row.count = selectedCondition.count;
                inputs = rows && rows[i].getElementsByTagName('input');

                row.customConditionChildItem.forEach(function(item, j) {
                    if (item.customConditionChildItemId in selectedCondition.children) {
                        item.checked = true;
                        inputs && (inputs[j].checked = true);
                        inputs && (inputs[j].parentNode.className = 'checkbox checkbox-inline checked');
                    }
                });

                if (row.customConditionLimit > 0 && row.count > row.customConditionLimit) {
                    alert(row.customConditionName + '最多只能选择 ' + row.customConditionLimit + ' 个筛选项，而您选择了 ' + row.count + ' 个，请修改！');
                }
            }
        });
    } else {
        alert('请传入数组来设置已选选项！');
    }
}

/** 
 * base64编码 
 * @param {Object} str 
 */
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
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
/** 
 * base64解码 
 * @param {Object} str 
 */
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
