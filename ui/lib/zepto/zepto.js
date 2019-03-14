var Zepto = (function () {
    //声明变量 缓存一些方法
    var undefined,
        key,
        $,
        classList,
        emptyArray = [],
        concat = emptyArray.concat,
        filter = emptyArray.filter,
        slice = emptyArray.slice,
        document = window.document,
        elementDisplay = {},
        classCache = {},
        cssNumber = {
            'column-count': 1,
            'columns': 1,
            'font-weight': 1,
            'line-height': 1,
            'opacity': '1',
            'z-index': 1,
            'zoom': 1
        };
})()

/* 
 * 如果 $ ，没有定义 就用 to Zepto
 */
window.Zepto = Zepto;

window.$ === undefined && (window.$ = Zepto)