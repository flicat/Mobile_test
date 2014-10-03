/*!
 * @author: liyuelong1020@gmail.com
 * @date: 2014/9/24
 */

(function(dom, undefined) {
    var $ = function(selector) {
        return dom.getElementById(selector) || dom.createDocumentFragment();
    };

    /**
     * 截图查看
     */
    var touEvent = touchScroll($('print-screen'));

    /**
     * 滚动至顶部
     */
    $('go-top').addEventListener('touchstart', function() {
        var body = dom.body;            // body 对象
        var top = body.scrollTop;            // 当前滚动像素
        var timeout = 500;                   // 动画效果持续时间
        var range = 10;                      // 动画频率

        var step = top / timeout * range;

        if(top > 0){
            setTimeout(function() {
                var func = arguments.callee;
                if(top > 0){
                    top -= step;
                    body.scrollTop = top;
                    setTimeout(func, range);
                } else {
                    body.scrollTop = 0;
                }
            }, range);
        }
    } ,false);

})(document);