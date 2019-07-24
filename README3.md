###地址列表的添加删除MVC模式
---
1.运用js观察者模式监听
```
var observer = (function () {
    var events = {};
    return {
        subscribe: function (eventName, callback) {
            
            if (!events.hasOwnProperty(eventName)) {
                events[eventName] = []
            }
            events[eventName].push(callback)
        },
        unsubscribe: function (eventName, callback) {
            var index = 0,
                length = 0;
            if (events.hasOwnProperty(eventName)) {
                length = events[eventName].length
                for (; index < length; index++) {
                    if (events[eventName][index] === callback) {
                        events[eventName].splice(index, 1)
                        break
                    }
                }
            }
        },
        publish: function (eventName) {
            
            var data = Array.prototype.slice.call(arguments, 1),
                index = 0,
                length = 0;
            
            if (events.hasOwnProperty(eventName)) {
                length = events[eventName].length
                for (; index < length; index++) {
                    events[eventName][index].apply(this, data)
                }
            }
        }
    }
}())
```
2.定义数据Model
```
   function EmailModel(data) {
            this.emailAddress = data || []
        }
        EmailModel.prototype = {
            add: function (email) {
                
                this.emailAddress.unshift(email)
                //广播一个事件至该系统,指出已经添加了一个新的email地址
                observer.publish("model.email-address.added", email)
            },
            remove: function (email) {
                
                var index = 0,
                    length = this.emailAddress.length;
                for (; index < length; index++) {
                    if (this.emailAddress[index] == email) {
                        this.emailAddress.splice(index, 1)
                        observer.publish("model.email-address.removed", email)
                        break
                    }
                }
            },
            //定义方法，返回所保存的email地址完整列表
            getAll: function () {
                return this.emailAddress
            }
        }
```
3. 定义数据view
```
   function EmailFormView() {
            this.form = document.createElement("form");
            this.input = document.createElement("input");
            this.button = document.createElement("button")
            this.input.setAttribute("type", "text")
            this.input.setAttribute("placeholder", "NeW email address")
            this.button.setAttribute("type", "submit")
            this.button.innerHTML = "Add"
        }
        EmailFormView.prototype = {
            render: function () {
                this.form.appendChild(this.input)
                this.form.appendChild(this.button)
                document.body.appendChild(this.form)
                this.bindEvents()
            },
            bindEvents: function () {

                var that = this;
                this.form.addEventListener("submit", function (event) {
                    
                    // 屏蔽表单默认提交动作行为,(防止页面出现刷新)
                    event.preventDefault()
                    observer.publish("view.email-view.add", that.input.value)
                }, false);
                //订阅由模型发出的事件，此事件告诉我们，一个新的email地址被添加到系统中，
                //清空<input>表单域中文本
                observer.subscribe("model.email-address.added", function () {
                    that.clearInputField()
                })
            },
            clearInputField: function () {
                this.input.value = "";
            }
        }

        function EmailListView() {
            this.list = document.createElement("ul")
            this.listItem = document.createElement("li")
            this.listItemText = document.createElement("span")
            this.listItemRemoveButton = document.createElement("button")
            this.listItemRemoveButton.innerHTML = "Remove"
        }
        EmailListView.prototype = {
            render: function (modelData) {
                var index = 0,
                    length = modelData.length,
                    email;
                for (; index < length; index++) {

                    email = modelData[index]
                    this.list.appendChild(this.createListItem(email))
                }
                document.body.appendChild(this.list)
                this.bindEvents()
            },
            createListItem: function (email) {
                var listItem = this.listItem.cloneNode(false),
                    listItemText = this.listItemText.cloneNode(false),
                    listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);
                listItem.setAttribute("data-email", email)
                listItemRemoveButton.setAttribute("data-email", email)
                listItemText.innerHTML = email;
                listItem.appendChild(listItemText).appendChild(listItemRemoveButton)
                return listItem
            },
            bindEvents: function () {

                var that = this;
                this.list.addEventListener("click", function (event) {
                    
                    if (event.target && event.target.tagName === "BUTTON") {
                        var value = event.target.getAttribute("data-email");
                        observer.publish("view.email-view.remove", value)
                    }
                }, false)
                observer.subscribe("model.email-address.added", function (email) {
                    that.addEmail(email)
                });
                observer.subscribe("model.email-address.removed", function (email) {
                    that.removeEmail(email)
                })
            },
            addEmail: function (email) {
                
                this.list.insertBefore(this.createListItem(email), this.list.firstChild)
            },
            removeEmail: function (email) {
                
                var listItems = this.list.getElementsByTagName("li"),
                    index = 0,
                    length = listItems.length;
                for (; index < length; index++) {
                    if (listItems[index].getAttribute("data-email") === email) {
                        this.list.removeChild(listItems[index])
                        break;
                    }
                }
            }
        };

        function EmailView(views) {
            this.views = views || []
        }
        EmailView.prototype = {
            render: function (modelData) {
                var index = 0,
                    length = this.views.length;
                for (; index < length; index++) {

                    this.views[index].render(modelData)
                }
            }
        }
```
4. 定义控制器
```
    /****视图结束**  */
        /* ****controller*** */
        /* 控制器把模型连接到视图，定义改系统逻辑 */
        function EmailController(model, view) {
            this.model = model;
            this.view = view;
        }
        EmailController.prototype = {
            initialize: function () {
                var modelData = this.model.getAll()
                this.view.render(modelData)
                this.bindEvents()
            },
            bindEvents: function () {

                var that = this;
                observer.subscribe("view.email-view.add", function (email) {
                    that.addEmail(email)
                })
                observer.subscribe("view.email-view.remove", function (email) {
                    that.removeEmail(email)
                })
            },
            addEmail: function (email) {
                this.model.add(email)
            },
            removeEmail: function (email) {
                this.model.remove(email)
            }
        }
        /* *********** */

        /* **运用封装代码** */
        var emailModel = new EmailModel([
                "2436@qq.con",
                "dfr@168.com",
                "193.com"
            ]),
            emailFormView = new EmailFormView(),
            emailListView = new EmailListView(),
            emailView = new EmailView([emailFormView, emailListView]),
            emailController = new EmailController(emailModel, emailView)
        emailController.initialize()
        /* ********* */
```
###JS框架MVVM模式实现地址列表
```
  <form data-submit="addEmail">
        <input type="text" placeholder="NeW Email address" />
        <button type="submit">Add</button>
    </form>
    <ul data-loop>
        <li>
            <span data-text></span>
            <button data-click="removeEmail">Remove</button>
        </li>
    </ul>
    <script type="text/javascript">
        /*******Mvc模式 model****** */
        function EmailModel(data) {
            this.emailAddress = data || []
        }
        EmailModel.prototype = {
            add: function (email) {
                this.emailAddress.unshift(email)
                //广播一个事件至该系统,指出已经添加了一个新的email地址
                observer.publish("model.email-address.added", email)
            },
            remove: function (email) {

                var index = 0,
                    length = this.emailAddress.length;
                for (; index < length; index++) {
                    if (this.emailAddress[index] == email) {
                        this.emailAddress.splice(index, 1)
                        observer.publish("model.email-address.removed", email)
                        break
                    }
                }
            },
            //定义方法，返回所保存的email地址完整列表
            getAll: function () {
                return this.emailAddress
            }
        }

        function EmailViewModel(model, view) {

            var that = this;
            this.model = model;
            this.view = view;
            this.methods = {
                addEmail: function (email) {

                    that.model.add(email)
                },
                removeEmail: function (email) {
                    that.model.remove(email)
                }
            }
        }
        EmailViewModel.prototype.initialize = function () {
            this.listElement = this.view.querySelectorAll("[data-loop]")[0]
            this.listItemElement = this.listElement.getElementsByTagName("li")[0]
            this.bindForm()
            this.bindList()
            this.bindEvents()

        }
        EmailViewModel.prototype.bindForm = function () {

            var that = this,
                form = this.view.querySelectorAll("[data-submit]")[0],
                formSubmitMethod = form.getAttribute("data-submit");
            form.addEventListener("submit", function (event) {

                event.preventDefault()
                var email = form.getElementsByTagName("input")[0].value;
                if (that.methods[formSubmitMethod] && typeof that.methods[formSubmitMethod] ===
                    'function') {
                    that.methods[formSubmitMethod](email)
                }
            })
        }
        EmailViewModel.prototype.bindList = function () {

            var data = this.model.getAll(),
                index = 0,
                length = data.length,
                that = this;

            function makeClickFunction(email) {
                return function (event) {

                    var methodName = event.target.getAttribute("data-click")
                    if (that.methods[methodName] && typeof that.methods[methodName] === 'function') {
                        that.methods[methodName](email)
                    }
                }
            }
            this.listElement.innerHTML = "";
            for (; index < length; index++) {
                email = data[index];
                newListItem = this.listItemElement.cloneNode(true)
                newListItem.querySelectorAll("[data-text]")[0].innerHTML = email;
                newListItem.querySelectorAll("[data-click]")[0].addEventListener("click", makeClickFunction(email),
                    false)
                this.listElement.appendChild(newListItem)
            }
        }
        EmailViewModel.prototype.clearInputField = function () {
            var textField = this.view.querySelectorAll("input[type=text]")[0];
            textField.value = ""
        }
        EmailViewModel.prototype.bindEvents = function () {
            var that = this

            function upDataView() {
                that.bindList()
                that.clearInputField()
            }
            observer.subscribe("model.email-address.added", upDataView)
            observer.subscribe("model.email-address.removed", upDataView)
        }


        var emailModel = new EmailModel([
                "163@qq.com",
                "dsds@.com",
                "168@qq.com"
            ]),
            emailView = document.body,
            emailViewModel = new EmailViewModel(emailModel, emailView);
        emailViewModel.initialize()
```
