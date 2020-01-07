/*
 * @Author: your name
 * @Date: 2020-01-06 14:07:19
 * @LastEditTime : 2020-01-06 16:11:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \iframe\sequential\js\popup.js
 */
    var popupUtils= {
        //获取组件在浏览器上的坐标
        pageXY: function (elem) {
            var pageXY = this.pageXY;
            var obj = {};
            obj.left = elem.offsetParent ? elem.offsetLeft + pageXY(elem.offsetParent).left : elem.offsetLeft;
            obj.top = elem.offsetParent ? elem.offsetTop + pageXY(elem.offsetParent).top : elem.offsetTop;
            return obj;
        },
        //插入dom,处理script执行操作
        appendChild:function($parent,domStr,appendClass){
            // var $parent = window.parent||window;
            var $fragment = document.createElement("div");
            $fragment.innerHTML = domStr;
            var element = $fragment.children[0];
            appendClass?element.classList.add(appendClass||""):"";
            function step(element){
                var children = Array.prototype.slice.call(element.children);
                if(!children || children.length==0){
                    return;
                }

                var child = null
                for(var index=0;index<children.length;index++){
                    child = children[index];
                    if(child.nodeName == "SCRIPT"){
                        element.removeChild(child);
                        var newScript = document.createElement("script");
                        newScript.innerHTML = child.innerHTML;
                        newScript.type = "text/javascript";
                        if(child.src){
                            newScript.src = child.src;
                        }
                        element.appendChild(newScript);
                    }
                    else{
                        step(child);
                    }
                }
            }

            step(element);
            $parent.appendChild( element);
        },
        // iframe外弹窗
        /**
         * @description: 
         * @param {type} domStr 弹窗内容
         * @param {type} ismodel 是否是模态窗口
         * @param {type} isstack 是否允许堆叠
         * @return: 
         */
        outIframePopup:function(domStr,ismodel,isstack){
            var $parent = window.parent||window;
            //计算锚点坐标
            var appendClass = "iframe_outside_XXXXX_container";
            var $oldPopup = $parent.document.getElementsByClassName(appendClass);
            if($oldPopup.length>0){
                isstack?"":$oldPopup[0].parentNode.removeChild($oldPopup[0]);
            }
            ;
            //是否是模态窗口
            if(ismodel){
                domStr="<div style='position:fixed;top:0px;bottom:0px;left:0px;right:0px; background:#00000061;' class='"+appendClass+"' onclick='(function(event){document.body.removeChild(document.getElementsByClassName(\"iframe_outside_XXXXX_container\")[0])})(event)'>"+domStr+"</div>";
                appendClass = "";
            }

            this.appendChild( $parent.document.body,domStr,appendClass);
        }
    };
    
    popupUtils.pageXY = popupUtils.pageXY.bind(popupUtils);
    popupUtils.appendChild = popupUtils.appendChild.bind(popupUtils);
    
