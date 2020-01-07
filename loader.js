var resouceUtil = {
    //获取组件在浏览器上的坐标
    pageXY: function (elem) {
        var pageXY = this.pageXY;
        var obj = {};
        obj.left = elem.offsetParent ? elem.offsetLeft + pageXY(elem.offsetParent).left : elem.offsetLeft;
        obj.top = elem.offsetParent ? elem.offsetTop + pageXY(elem.offsetParent).top : elem.offsetTop;
        return obj;
    },
    //加载器
    loadTemplate: function (option) {
        var url = option.url;
        var cb = option.cb;
        var contentType = option.contentType || "application/json";
        //此处不考虑ie6、7的情况
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.send(null);

        xhr.onreadystatechange = function (event) {
            if (event.target.readyState != 4) {
                return;
            }

            if (event.target.status == 200) {
                var res = event.target.responseText || "";
                cb ? cb(event.target.responseText || "") : "";
            }
            // debugger
        }
    },
    getSuffix: function (url) {
        var reg = /(\.)(\w+)$/g;
        return reg.exec(url)[2];
    },
    load: function (urls, cb) {
        if (!urls || !Array.isArray(urls) || urls.length == 0) {
            cb ? cb() : "";
            return;
        }
        var load = this.load;
        var getSuffix = this.getSuffix;

        //插入的资源片
        var $block = null;
        var url = urls.shift();
        var suffix = getSuffix(url);
        if (suffix === "js") {
            //js资源
            $block = document.createElement("script");
            $block.src = url;
        }
        else if (suffix === "css") {
            //css资源
            $block = document.createElement("link");
            $block.href = url;
            $block.rel = "stylesheet";
        }
        document.head.appendChild($block);
        suffix === "js" ? $block.onload = function () {
            load(urls, cb);
        } :
            load(urls, cb);
    }
};

resouceUtil.load = resouceUtil.load.bind(resouceUtil);
resouceUtil.getSuffix = resouceUtil.getSuffix.bind(resouceUtil);
