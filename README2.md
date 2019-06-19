### 前端高频面试题
***
```
setTimeout(function () {
    console.log(1)
}, 0)
new Promise(function executor(resolve) {
    console.log(2)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(3)
}).then(function () {
    console.log(4)
})
console.log(5)
```
** 输出结果 2 3 5 4 1**
>> 这道题应该考察我 JavaScript 的运行机制的，让我理一下思路。

首先先碰到一个 setTimeout，于是会先设置一个定时，在定时结束后将传递这个函数放到任务队列里面，因此开始肯定不会输出 1 。

然后是一个 Promise，里面的函数是直接执行的，因此应该直接输出 2 3 。

然后，Promise 的 then 应当会放到当前 tick 的最后，但是还是在当前 tick 中。

因此，应当先输出 5，然后再输出 4 。

最后在到下一个 tick，就是 1 。
 
**1.vue 双向绑定的原理**

```
  <div id="myapp">
        <input type="text" v-model="message">
        <span v-bind="message"></span>
    </div>
  
    <script type="text/javascript">
        var data = {
            message: ""
        }
        var myapp = document.querySelector("#myapp")
        var models = myapp.querySelectorAll("[v-model=message]")
        //先循环添加 键盘按下事件
        for (let i = 0; i < models.length; i++) {
            models[i].onkeyup = function () {

                //getAttribute 返回v-model 属性值 message 没有返回null 或 ""
                data[this.getAttribute("v-model")] = this.value
            }
        }
        Object.defineProperty(data, "message", {
            set: function (newValue) {
                var binds = myapp.querySelectorAll("[v-bind=message]")
                for (let i = 0; i < binds.length; i++) {
                    binds[i].innerHTML = newValue
                }
                this.value = newValue
            },
            get: function () {
                console.log(this, 'this3')
                return this.value
            }
        })
      
    </script>

```
**js数组随机排序**
```
   var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        function randomArr1(arr) {
            for (let i = 0, len = arr.length; i < len; i++) {
                const ran = parseInt(Math.random() * len)
                const temp = arr[ran]
                arr[ran] = arr[i]
                arr[i] = temp
            }
            return arr
        }
        function randomArr3(arr) {
            return arr.sort(() => Math.random() - 0.5)
        }
        let a = randomArr1(arr)
```
**js深拷贝**
```
 function deepClone(obj) {
            let result = typeof obj.splice === 'function' ? [] : {}
            if (obj && typeof obj === 'object') {
                for (let key in obj) {
                    if (obj[key] && typeof obj[key] == 'object') {
                        result[key] = deepClone(obj[key])
                    } else {
                        result[key] = obj[key]
                    }
                }
                return result
            }
            return obj
        }
```
**PC端和移动端的区别**
1. PC考虑的浏览器的兼容性，移动端开发考虑的更多是手机兼容性，因为目前不管android手机还是ios手机,一般浏览器都是webkit 内核，所以移动端开发更多考虑是手机分辨率的适配和不同操作系统的略微差异化。
2. 部分事件处理上，移动端多出来的事件是触屏事件，而缺少的是hover事件。另外移动端弹出的手机键盘的处理，这样在pc端是遇不到的。
3. 在布局上，移动端开发一般要做到布局自适应的，一般用rem布局
4. 在动画处理上，pc端由于要考虑ie的兼容性，所以通常使用js做动画通用性会更好一些，但是css3做了很大牺牲，在手机端，如果要做一些动画，特效，第一选择css3,即简效率又高
5. 微信的一些接口组好能去实现一遍，熟悉一下肯定是有好处的，比如通过微信分享文章，title、description、icon等图标的配置，这些还是要会的。
6. 性能优化，包括首屏的打开速度、用户响应延迟、渲染性能、动画帧率等在手机上都需要特别注意。
7. 比如在手机上的300ms的延迟，这在PC端是没有的，如果我们希望做成webapp，那么自然就不需要这300ms的延迟，所以可以使用hammer-time.js来移除这300ms的延迟。
**浅谈单页面和多页面运用**
+ 多页面运用
1. 页面跳转html
2. 首屏时间快，seo效果好
3. 页面切换慢
+ 单页面
1. 用vue写的项目是单页应用，刷新页面会请求一个HTML文件，切换页面的时候，并不会发起新的请求一个HTML文件，只是页面内容发生了变化 

