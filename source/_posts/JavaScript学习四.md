---
title: JavaScript学习四
date: 2024-08-27 11:46:51
tags:
---

#### 2024-08-27

- 浏览器对象模型
  ```javascript
  BOM
      浏览器对象模型
      BOM为我们提供了一组对象，通过这组对象可以完成对浏览器的各种操作
      BOM对象：
          "Window"    代表浏览器窗口（全局对象）
          "Navigator"    浏览器的对象（可以用来识别浏览器
          	navigator.userAgent 返回一个用来描述浏览器信息的字符串
          "Location"    浏览器的地址栏信息
          	可以直接将Location的值修改为一个新的地址，这样会使得网页发生跳转
              location.assign() 跳转到一个新的地址
              location.replace() 跳转到一个新的地址（无法通过回退按钮回退）
              location.reload() 刷新页面，可以传递一个true来强制清缓存刷新
              location.href 获取当前地址
          "History"    浏览器的历史记录（控制浏览器前进后退）
          	history.back() 回退
  			 history.forward() 前进
              history.go()	正负数控制前后跳转的界面量
              
          "Screen"   屏幕的信息
      BOM对象都是作为window对象的属性保存的，所以可以直接在JS中访问这些对象
      
  
  ```
  
  

- 定时器
  ```javascript
  通过定时器，可以使代码在指定时间后执行
  设置定时器的方式有两种
  setTimeout()   //一段时间后执行
      参数：
          1.回调函数（要执行的代码）
          2.等待的时间（毫秒）
      关闭定时器：clearTimeout()
  
  setInterval（）//一段时间执行一次
          参数：
             1.回调函数（要执行的代码）
             2.间隔的时间（毫秒）
  		关闭：clearInterval()
  
  <script>
      const timer1 = setTimeout(()=>{
          console.log(1)
      },1000)
      clearTimeout(timer1)	//这样写还没执行就关了
  
      const time2 = setInterval(()=>{
          console.log(2)
      },1000)
      clearInterval(time2)
  </script>
  ```
  
  
  
- 调用栈
  ```javascript
  "事件循环(event loop)"
      函数在每次执行时，都会产生一个执行环境
      执行环境负责存储函数执行时产生的一切数据
      问题：函数的执行环境要存储到哪里呢？
             函数的执行环境存储到了一个叫做调用栈的地方
       "调用栈"（call stack）
           1.调用栈负责存储函数的执行环境
           2.当一个函数被调用时，它的执行环境会作为一个栈帧，插入到调用栈的顶，函数执行完毕其栈帧会自动从中弹出
           3.栈底一开始放的是全局作用域
           
  	  "消息队列"
         消息队列负责存储将要执行的函数
         当我们触发一个事件时，其响应函数并不是直接添加到调用栈，因为调用栈中可能有一些还没有执行完的代码
         事件触发后，JS引擎是将事件响应函数插入到消息队列中排队
         "调用栈存储正在执行的，消息队列存储将要执行的"
  btn1.onclick = function () {
          const time = Date.now()
          alert("点击1")
          while (Date.now() - time < 5000){}
      }
  	//先点1再点2,2会被阻塞执行,在消息队列中排队
      btn2.onclick = function () {
          alert("点击2")
      }
  ```

  

- 定时器和消息队列
  ```javascript
  "定时器的本质就是在指定时间后将函数添加到消息队列中"
  <script>
      console.time("执行")
      setTimeout(()=>{
          console.log("定时器执行了")
          //2s后进消息队列，再过3s，5s结束，开始执行
          console.timeEnd("执行") // 5000ms
      },2000)
      const time = Date.now()
      while(Date.now() - time < 5000){}
  
      setInterval() 每隔一段时间就将函数添加到消息队列中
  但如果函数执行速度较慢，它就无法保证每次执行的间隔相同
      console.time("间隔")
      setInterval(()=>{
          console.timeEnd("间隔")
          alert("定时器执行了")
          console.time("间隔") //点得越快，开始计时越早，越接近3s；
          						//点的慢，这次的计时开始和下次计时结束几乎重合，时间就明显小于3s
      },3000)
      
      //希望函数每次执行都有相同的间隔
      console.time("间隔")
      setTimeout(function fn(){
          console.timeEnd("间隔")
          alert("定时器执行了")
          console.time("间隔")
          //在setTimeout回调函数的最后再调用一个setTimeout
          setTimeout(fn,3000)
      },3000)
  </script>
  ```

  

#### 2024-08-28

- 图片轮播2

#### 2024-08-29

- jQuery核心函数
  ```javascript
  核心函数的作用
  两种作用
    1.将它作为工具类使用
          在核心函数中jQuery为我们提供了多个工具方法
    2.将它作为函数使用
          2.1将一个函数作为$的参数
                -这个函数会在文档加载完毕之后执行
                -相当于：
                	document.addEventListener("DOMContentLoaded",function())
          2.2将选择器字符串作为参数
                jQuery自动去网页中查找元素
                作用类似于document.querySelectorAll(...）
                注意：
                   通过jQuery核心函数查询到的结果并不是原生的DOM对象，
                       而是一个经过jQuery包装过的新的对象，这个对象我们称其为jQuery对象
                       jQuery对象中为我们提供了很多新的方法，方便我们做各种DOM操作
                       但是jQuery对象不能直接调用原生DOM对象的方法
                       通常我们为jQuery对象命名时，会使用$开头，加以区分
           2.3将DOM对象作为参数
                可以将DOM对象转换为jQuery对象，从而使用jQuery对象的方法
           2.4将html代码作为参数
                会根据html代码来创建元素
  <body>
  <button id="btn01">111</button>
  <script>
      var num = 10
      function fn(){}
      alert($.isFunction(num))    // false
      alert($.isFunction(fn))    // true
      alert(typeof fn === "function") // true
      $(function () {
          $("#btn01").click(function () {
              var btn = document.getElementById("btn01")
              alert(btn)      // [object HTMLButtonElement]  DOM对象
              var $btn2 = $("#btn01")
              alert($btn2)     // [object Object]   jquery对象
              alert($(btn))   // [object Object]
          })
      })
  </script>
  </body>
  ```

  

#### 2024-08-30

- jQuery对象
  ```javascript
  jQuery对象
       -通过jQuery核心函数获取到的对象就是jQuery对象
       -jQuery对象是jQuery中定义的对象
           可以将其理解为是DOM对象的升级版，在jQuery对象中为我们提很多方法，来帮助我们简化DOM操作
       -jQuery对象本质上是一个DOM对象的数组（类数组），可以通过索引获取jQuery对象中的DOM对象
       -当我们修改jQuery对象时，它会自动修改jQuery中的所有元素，这一特点称为jQuery的"隐式迭代"
       -通常情况下，jQuery对象方法的返回值依然是一个jQuery对象所以我们可以在调用一个方法后继续调用其他的				jQuery对象的方法，这一特性，称为jQuery对象的"链式调用"
  <body>
  <button id="btn01">点击</button>
  <ul>
      <li id="swk">孙悟空</li>
      <li id="zbj">猪八戒</li>
      <li>沙和尚</li>
      <li>唐僧</li>
  </ul>
  <script>
      $("#btn01").click(function () {
          var $li = $("li")
  
          var text = $li.text()   // 获取所有li的文本内容  孙悟空猪八戒沙和尚唐僧
          var id = $li.attr("id") // 获取第一个id的属性   swk
  
          $li.text("新的文本内容").css("color", "red")
      })
  </script>
  </body>
  
  /*------------------------------------------*/
  <script>
          $(function () {
              $("#btn").click(function () {
                  // $(".box1").addClass(["box2","box3"])
                  "addClass可以接收回调函数作参数"
                  $("div").addClass(function (index, className) {
                      // alert(index + "--" + className)  // 0--box1  1--box2  2--box3
  
                      //回调函数中，this 指向的是当前元素
                      if (index & 1) this.classList.add("box3")	//DOM方法
                      else $(this).addClass("box2")				  //jQuery方法      
                  })
                  $("div").addClass(function (index){
                      //回调函数的返回值会成为当前元素的 class
                      //return ["box2", "box3"]
                      if(index & 1)return "box3"
                      else return "box2"
                  })
              })
          })
      </script>
  /*--------------------------------------------------------*/
  "复制和添加容器"
  $(function () {
              var $swk = $("#list1 li:nth-child(1)").clone()  //不加clone，是引用，不是复制，加true能把事件也复制过去
              var $list2 = $("#list2")
              $("#btn").click(function () {
                  // $("#list1 li").unwrap("ul")          // umwrap() 移除父元素，并返回被移除的元素，父元素是div或不符合条件就不移
                  // $("#list1 li").wrap("<div/>")        // wrap() 添加包裹元素
                  // $("#list1 li").wrapAll("<div/>")     // wrapAll() 添加容器，所有元素都包裹在一个元素中
                  // $("#list1 li").wrapInner("<div/>")   // wrapInner() 添加包裹元素，只包裹内部元素
  
                  $list2.append($swk)
              })
          })
  
  /*-------------------------------------------------*/
  "添加子元素"
  append() 向父元素后边添加一个子元素
  appendTo() 将子元素添加到父元素后达
  prepend()
  prependTo() 向父元素的前边添加子元素
  text()	获取/设置元素的文本内容
  html()  获取/设置元素的html代码
  $("#box1").append("<div id='box2'/>")
  $("<div id='box2'/>").appendTo("#box1")
  
  /*---------------------------------------*/
  <input type="radio" name="gender" value="male">男
  <input type="radio" name="gender" value="female">女
  <script>
      // attr() 读取布尔值返回实际值
      // prop() 读取布尔值返回true/false
      // 如果有多个对象，则返回第一个对象
      var $checkedAttr = $("input[name='gender']").attr("checked");
      var $checkedProp = $("input[type='radio']").prop("checked");
      console.log($checkedAttr)   // checked
      console.log($checkedProp)   // true
  
      // 修改属性
      $("input[name='gender']").attr("checked",true) // 后设置的优先级高
  </script>
  ```
  
  
