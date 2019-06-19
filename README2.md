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
===
 1.vue 双向绑定的原理 
===
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

