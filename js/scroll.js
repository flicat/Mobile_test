/*!
 * @author: liyuelong1020@gmail.com
 * @date: 2014/9/24
 */

(function(global, undefined) {

    var toString = function(obj) {
        return Object.prototype.toString.call(obj);
    };

    var Scroll = function(element, option) {
        this.wrap = element;                                // 外层节点
        this.ul = element.querySelector('ul');              // 列表ul
        this.items = this.ul ? this.ul.children : [];       // 列表项
        this.itemWidth = 0;
        this.listWidth = 0;
        this.wrapWidth = 0;
        this.option = toString(option) === '[object Object]' ? option : {}; // 配置参数
        this.scrollFlag = false;
        this.items.length && this.init();
    };

    Scroll.prototype = {
        constructor: Scroll,
        // 触摸点偏移量
        touchPoint: {
            transitionDiff: 0,               // 滚动偏移量
            start: 0,                        // 触摸开始位置
            end: 0                           // 触摸结束位置
        },
        // 触摸事件回调函数
        handleEvent: function(e) {
            e.preventDefault();
            e.stopPropagation();

            var that = this;
            var point = that.touchPoint;
            var ePoint = e.touches && e.touches.length ? e.touches[0] : e;
            var style = that.ul.style;

            switch(e.type) {
                case 'mousedown':
                case 'touchstart':
                    that.scrollFlag = true;
                    // 过渡的持续时间
                    that.ul.style.webkitTransitionDuration =
                        that.ul.style.MozTransitionDuration =
                            that.ul.style.transitionDuration =
                                that.progress.style.webkitTransitionDuration =
                                    that.progress.style.MozTransitionDuration =
                                        that.progress.style.transitionDuration = '0s';

                    point.start = ePoint.clientX;
                    break;
                case 'mousemove':
                case 'touchmove':
                    if(that.scrollFlag){
                        point.end = ePoint.clientX;
                        that.move(point.end - point.start + point.transitionDiff);
                    }
                    break;
                case 'mouseup':
                case 'mouseout':
                case 'touchcancel':
                case 'touchend':
                    if(that.scrollFlag){
                        that.scrollFlag = false;
                        // 过渡的持续时间
                        that.ul.style.webkitTransitionDuration =
                            that.ul.style.MozTransitionDuration =
                                that.ul.style.transitionDuration =
                                    that.progress.style.webkitTransitionDuration =
                                        that.progress.style.MozTransitionDuration =
                                            that.progress.style.transitionDuration = '0.3s';

                        point.transitionDiff = point.end - point.start + point.transitionDiff;

                        if(point.transitionDiff > 0){
                            point.transitionDiff = 0;
                        }

                        point.transitionDiff = Math.round(point.transitionDiff / that.itemWidth) * that.itemWidth;

                        if(that.listWidth + point.transitionDiff < that.wrapWidth) {
                            point.transitionDiff = that.wrapWidth - that.listWidth;
                        }

                        point.end = point.start = 0;
                        that.move(point.transitionDiff);
                    }
                    break;
            }
        },
        // 移动方法
        move: function(dist) {

            var that = this;
            var ul_style = that.ul.style;
            var progress_style = that.progress.style;
            var progress_diff = -(dist / that.listWidth * that.wrapWidth);

            // 列表滚动
            ul_style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';        // 定义3D转换，沿着X轴移动元素
            ul_style.MozTransform = ul_style.transform = 'translateX(' + dist + 'px)';         // 定义2D转换，沿着X轴移动元素

            // 滚动条
            progress_style.webkitTransform = 'translate(' + progress_diff + 'px,0)' + 'translateZ(0)';        // 定义3D转换，沿着X轴移动元素
            progress_style.MozTransform = progress_style.transform = 'translateX(' + progress_diff + 'px)';   // 定义2D转换，沿着X轴移动元素
        },
        // 初始化节点
        init: function() {
            var that = this;
            // 添加滚动条
            var scroll_bar = document.createElement('div');
            var progress = document.createElement('hr');
            scroll_bar.className = 'scroll-bar';
            progress.className = 'progress';
            scroll_bar.appendChild(progress);
            that.ul.parentNode.appendChild(scroll_bar);
            that.progress = progress;

            // 计算列表宽度
            that.itemWidth = that.items[0].clientWidth;
            that.listWidth = (function() {
                var width = 0;
                for(var i = that.items.length; i--;){
                    width += that.items[i].clientWidth;
                }
                return width;
            })();
            that.wrapWidth = that.wrap.clientWidth;

            that.ul.style.width = that.listWidth + 'px';
            that.progress.style.width = that.wrapWidth / that.listWidth * 100 + '%';

            // 触摸事件
            that.wrap.addEventListener('touchstart', that, false);
            that.wrap.addEventListener('touchmove', that, false);
            that.wrap.addEventListener('touchcancel', that, false);
            that.wrap.addEventListener('touchend', that, false);
            // 鼠标事件
            that.wrap.addEventListener('mousedown', that, false);
            that.wrap.addEventListener('mousemove', that, false);
            that.wrap.addEventListener('mouseout', that, false);
            that.wrap.addEventListener('mouseup', that, false);
        }
    };

    global.touchScroll = function(element, option) {
        return new Scroll(element, option)
    };
})(this);