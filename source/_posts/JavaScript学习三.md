---
title: JavaScript学习三
date: 2024-08-23 10:32:36
tags:
---



#### 2024-08-23

- 垃圾回收（garbage collection）
  - 如果一个对象没有任何的变量对其进行引用，那么这个对象就是一个垃圾
  - 垃圾对象的存在，会严重的影响程序的性能
  - 在JS中有自动的垃圾回收机制，这些垃圾对象会被解释器自动回收，我们无需手动处理
  - 对于垃圾回收来说，我们唯一能做的事情就是将不再使用的变量设置为null

- 文档节点
  ```javascript
  document对象
  
  -document对象表示的是整个网页
  -document对象的原型链
  	HTMLDocument -> Document -> Node -> EventTarget -> Object. prototype -> null 
  -凡是在原型链上存在的对象的属性和方法都可以通过Document去调用
  
  部分属性:
  document.documentElement --> html根元素 
  document.head --> head元素
  document.title --> title元素 
  document.body --> body元素
  document.links --> 获取页面中所有的超链接 
  ```

  

- 获取元素节点
  ```javascript
  元素节点对象(element)
  	-在网页中，每一个标签都是一个元素节点
  	-如何获取元素节点？
  		1.通过document对象来获取元素节点
         	    2.通过document对象来创建元素节点
         
  	"通过document来获取已有的元素节点"
  	"类数组对象":可以通过索引访问元素，可以for循环遍历，但不能调用数组的方法
  	可以使用var items = [].slice.call(document.querySelectorAll('.items li'));
  	将其转化为数组赋值给其他变量
      
      document. getElementById()
          -根据id获取一个元素节点对象
      document. getElementsByClassName()
          -根据元素的class属性值获取一组元素节点对象
          -返回的是一个类数组对象
          -方法返回的结果是一个实时更新的集合，网页中新添加元素时，集合也会实时的刷新
      document. getElementsByTagName()
          -根据标签名获取一组元素节点对象
          -返回的结果是可以实时更新的集合
          -document.getElementsByTagName("*")获取页面中所有的元素 
      document. getElementsByName()
          -根据name属性获取一组元素节点对象
          -返回一个实时更新的集合
          -主要用于表单项
  
      "下面这两个最灵活"
      document.querySelectorAll()
          -根据选择器去页面中查询元素
          -会返回一个类数组（不会实时更新）
      document.querySelector()
          -根据选择器去页面中查询第一个符合条件的元素
  
  /*-----------------------------------------*/
  "元素的属性和方法"
  通过元素节点对象获取其他节点的方法
  
  element.childNodes 获取当前元素的子节点（会包含空白的子节点）
  element.children 获取当前元素的子元素（无标签的文本不算）
  element.firstElementChild 获取当前元素的第一个子元素 
  element.lastElementChild 获取当前元素的最后一个子元素 
  element.nextElementSibling 获取当前元素的下一个兄弟元素 
  element.previousElementSibling 获取当前元素的前一个兄弟元素 
  element.parentNode 取当前元素的节点
  element.tagName 获取当前元素的标签名 
  ```
  
  
  
- 文本节点
  ```javascript
  在DOM中，网页中所有的文本内容都是文本节点对象，可以通过元素来获取其中的文本节点对象，但是我们通带不会这么做
  我们可以直接通过元素去修改其中的文本
  	修改文本的三个属性
      	element.innerText 获取或修改元素中的文本内容
  			innerText获取内容时，会考虑CSS样式
  			通过innerText去读取CSS样式，会触发网页的重排（计算CSS样式）
  			当字符串中有标签时，会自动对标签进行转义 <li>-->&lt;li&gt；
  		element.textContent 获取或修改元素中的文本内容
  			获取的是标签中的内容，不会考虑CSS样式
  		element.innerHTML 获取或修改元素中的htmL代码
  			可以直接向元素中添加html代码
  			innerHTML插入内容时，有被XSS注入的风险
              
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>练习</title>
  </head>
  <body>
      <div id="box1">
         <span style="text-transform: uppercase">我是box1</span>
      </div>
  <script>
      console.time("打印时间")
      console.timeEnd("打印时间")
      console.log(box1.innerText)     //'我是BOX1'
      console.log(box1.textContent)   //'\n        我是box1\n    '
      console.log(box1.innerHTML)     //'\n       <span>我是box1</span>\n    '
  </script>
  </body>
  </html>       
  ```

  

- 属性节点
  ```javascript
  属性节点（Attr）
        在DOM也是一个对象，通常不需要取对象而是直接通过元素即可完成对具的各种操作
        如何操作属性节点：
        	方式一：
              读取：元素属性名（注意，cLass性需要使用className来读取）
              		读取一个布尔值时，会返回true或false
              修改：元素.属性名 = 属性值
          方式二：
              读取：元素.getAttribute（属性名）
              修改：元素.setAttribute（属性名，属性值）
              删除：元素.removeAttribute（属性名）
  "方法一"
  <body>
  <input class="a" type="text" name="username" value="admin">
  <script>
      console.time("打印时间")
      console.timeEnd("打印时间")
      const input1 = document.querySelector("[name=username]")
      // const input2 = document.querySelector("username")[0]
      // const input3 = document.querySelector(".a")
      console.log(input1.type)        // text
      console.log(input1.class)       // undefined
      console.log(input1.className)   // a
      input1.value = "ADMIN"
      input1.disabled = true          //这属性设置了就生效，写false也生效
  </script>
  </body>
  
  "方法二"
  <body>
  <input class="a" type="text" name="username" value="admin">
  <script>
      console.time("打印时间")
      console.timeEnd("打印时间")
      const input1 = document.querySelector(".a")
      console.log(input1.getAttribute("type"))        // text
      console.log(input1.getAttribute("class"))       // a
      console.log(input1.getAttribute("className"))   // null
  
      input1.setAttribute("value", "admin123")        //value="admin123"
      input1.setAttribute("disabled","disabled")      //这种属性有就生效，写false也生效
      
      input1.removeAttribute("disabled")
  </script>
  </body>
  ```

  

- 事件
  ```javascript
  事件（event）
     -事件就是用户和页面之间发生的交互行为
       比如：点击按钮、鼠标移动、双击按钮、敲击键盘、松开按键...
     -可以通过为事件绑定响应函数（回调函数），来完成和用户之间的交互
     -绑定响应函数的方式
        1.可以直接在元素的属性中设置 //onclick="btn()"
        2.可以通过为元素的指定属性设置回调函数的形式来绑定事件（一个事件只能绑定一个响应函数，新的覆盖旧的）
        3.可以通过元素 addEventListener() 方法来绑定事件，可以绑定多个
        
  <body>
  <input class="a" type="text" name="username" value="admin">
  <button id="btn">点击一下</button>
  <script>
      const btn = document.getElementById('btn')
  	 //这三个都会生效
      btn.onclick = function () {
          alert('点击了一次')
      }
      btn.addEventListener('click',function (){
          alert('嘻嘻嘻')
      })
      btn.addEventListener('click',function (){
          alert('哈哈哈')
      })
  </script>
  </body>
  ```
  
  
  
- 文档的加载
  ```javascript
  网页是自上向下加载的，加果将js代码编写到网页的上边,js代码在执行时，网页还没有加载完毕，
  这时会出现无法获取到DOM对象的情况
        window.onload 事件会在窗口中的所有文档（当前网页可能引入其他网页）加载完毕之后才触发
        document的DOMContentLoaded事件会在当前文档加载完毕之后（不管引入的文档）触发
         如何解决这个问题
             1.将script标签编写到body的最后（第一快）
             2.将代码编写到 window.onload 的回调函数中，整个窗口全加载完成再执行（第四快）
             3.将代码编写到document对象的DOMContentLoaded的回调函数中（执行时机更早）（第三快）
             4.将代码编写到外部js文件中，然后以 defer 的形式进行引入（第二快）
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>练习</title>
      <script>
          //方法2.1 这个和2.2谁写在前面谁快
         window.onload = function () {
             const btn = document.getElementById("btn");
             alert(btn)
         }
         //方法2.2
  		//load:当整个页面（包括所有依赖资源如图片、样式表等）都加载完成后触发。
         window.addEventListener("load", function (){
             const btn = document.getElementById("btn");
             alert(btn)
         })
         //方法3
  		//DOMContentLoaded: 当DOM树构建完成时触发，此时样式表、图片等外部资源可能还未加载完成
         document.addEventListener("DOMContentLoaded", function (){
             const btn = document.getElementById("btn");
             alert(btn)
         })
  </script>
  		//方法4 加defer相当于把位置移到body的最下面
      <script defer src="xxx.js">
          
      </script>
  </head>
  <body>
  <button id="btn">点击一下</button>
  </body>
  </html>
  ```
  
  

#### 2024-08-24

- 在事件的响应函数中，响应函数绑定给谁this就指向谁，但响应函数若为箭头函数，则this指向由外部作用域决定。

- 元素修改
  ```javascript
  <body>
  <button id="btn01">按钮1添加</button>
  <button id="btn02">按钮2替换</button>
  <hr>
  <ul id="list">
      <li id="swk">孙悟空</li>
      <li id="zbj">猪八戒</li>
      <li id="shs">沙和尚</li>
  </ul>
  <script>
      //获取ul
      const list = document.getElementById("list")
      //获取按钮
      const btn01 = document.getElementById("btn01")
      btn01.onclick = function () {
          const li = document.createElement("li")
          li.id = "ts"
          li.textContent = "唐僧"
          console.log(li)
          //给一个节点添加子节点
          //list.appendChild(li)
  
          //向元素的四个相邻位置添加元素 adjacent相邻的
          //list.insertAdjacentElement("afterend",li)
  
          //插入代码
          list.insertAdjacentHTML("beforeend","<li id='blm'>白龙马</li>")
      }
      const btn02 = document.getElementById("btn02")
      btn02.onclick = function(){
          let swk = document.getElementById("swk")
          let bgj = document.createElement("li")
          bgj.id = "bgj"
          bgj.innerText = "白骨精"
          //1、修改节点的id和text
          // swk.id = "bgj"
          // swk.innerText = "白骨精"
  
          // 2、替换子节点
          // list.replaceChild(bgj,swk)
  
          // 3、替换节点
          //swk.replaceWith(bgj)
      }
  </script>
  </body>
  ```

  

#### 2024-08-25

- 删除信息
  ```javascript
  const links = document.links
  for (let i = 0; i < links.length; i++) {
      links[i].onclick = deleteHandler
      //links[i].onclick = function () {
      //alert('你点击了链接')
      //return false
      //只要点击超链接就会触发页面的跳转，事件中可以通过取消默认行为来阻止超链接的跳转
      //使用return false来取消默认行为，只在xxx.xxx=function(){}这种形式绑定的事件中才适用
      //}
      
      // links[i].addEventListener('click', function () {
      //         alert('你点击了链接')
      //         return false  //不管用
      //     })
  }
  button 默认type为submit，可以改为button取消跳转
  ```

  

- 节点的复制
  ```javascript
  <script>
      const list2 = document.getElementById("list2")
      const l1 = document.getElementById("l1")
      const btn01 = document.getElementById("btn01")
      btn01.onclick = function () {
          // 这样写原来的l1会被挪到list2中
          // list2.appendChild(l1)
          
          // 使用cloneNode（）方法对节点进行复制时，它会复制节点的所有特点包括各种属性
          // 这个方法默认只会复制当前节点，而不会复制节点的子节点
          // 可以传递一个true作为参数，这样该方法也会将元素的子节点一起复制
          const clone = l1.cloneNode(true)
          //复制完修改节点的id
          clone.id = "newl1"
          list2.appendChild(clone)
      }
  </script>
  ```

  

#### 2024-08-26

- 修改CSS样式
  ```javascript
  修改属性时，属性中的"-"会被识别成减号，去掉"-"采用驼峰命名法
  
  getComputedstyle()
  它会返回一个对象，这个对象中包含了当前元素所有的生效的样式
  参数：
      1.要获取样式的对象
      2.要获取的伪元素(可选)
  返回值：
      返回的一个对象，对象中存储了当前元素的样式
  注意：
      样式对象中返回的样式值，不一定能来拿来直接计算,可能是auto
      所以使用时，一定要确保值是可以计算的才去计算
           
  box1.style.backgroundColor = "skyblue"
  const styleObj = getComputedStyle(box1)
  
  // 读取到的样式都是字符串且带单位，需要转换成数字
  box1.style.width = parseInt(styleObj.width) + 200 + "px"
  box1.style.height = "400px"
  
  
  // 获取伪元素样式
  const beforeStyle = getComputedStyle(box1, "::before")
  console.log(beforeStyle.content)  // hello world!
  ```

  

- 读取样式的方法
  ```javascript
  元素.clientHeight
  元素.clientwidth
        获取元素内部的宽度和高度（包括内容区和内边距）
  元素.offsetHeight
  元素.offsetWidth
        获取元素的可见框的大小（包括内容区、内边距和边框）
  元素.scrollHeight
  元素.ScrolWidth
        获取元素滚动区域的大小
  元素.offsetParent
          获取元素的定位父元素
         定位父元素：离当前元素最近的开启了定位的祖先元素，如果所有的元素都没有开启定位则返回body
  元素.offsetTop
  元素.offsetLeft
        获取元素相对于其定位父元素的偏移量
  "上面的都是只读的，下面这个可以设置滚动条的位置"
  元素.scroLLTop
  元素.scrollLeft
        获取或设置元素滚动条的偏移量
  box1.scrollTop = 200  //这其实时内容滚动了200px，然后滚动条到了相应的位置
  ```

  

- 操作class
  ```javascript
  除了直接修改样式外，也可以通过修改cLass属性来间接的修改样式
    通过class修改样式的好处：
        1.可以一次性修改大量样式
        2.对JS和CSS进行解耦（设置样式尽量使用CSS而不是JS）
  box1.className +=  "box2"  //这种会加重复
  
  元素.classList 是一个对象，对象中提供了对当前元素的类的各种操作方法
  	 元素.classList.add() 向元素中添加一个或多个class
      元素.classList.remove() 移除元素中的一个或多个cass
      元素.classList.toggle() 切换元素中的class
      元素.classList.replace() 替换class
      元素.classList.contains() 检查class
  box1.classList.add("box2","box3","box4"）
  box1.classList.add("box1"）
  box1.classList.remove（"box2"）
  box1.classList.toggle（"box2"）
  box1.classList.replace("box1","box2"）
  ```

  

- event 事件
  ```javascript
  event 事件
  	事件对象
  		事件对象是有浏览器在事件触发时所创建的对象，这个对象中封装了事件相关的各种信息
         通过事件对象可以获取到事件的详细信息，比如：鼠标的坐标、键盘的按键，
         浏览器在创建事件对象后，会将事件对象作为响应函数的参数传递，所以我们可以在事件的回调函数中定义一个形参来接收事件对象
         
  <script>
      const box1 = document.getElementById("box1")
      // box1.onmousemove = function (event) {
      //     console.log(event)
      // }
      box1.addEventListener("mousemove",event =>{
          console.log("鼠标移动了")
      })
  </script>
  /*-------------------------------------------------------*/
  "propagation" （动植物等的）繁殖，增殖，；（观点、理论等的）传播；（运动、光线、声音等的）传送
  
  在DOM中存在着多种不同类型的事件对象
          多种事件对象有一个共同的祖先Event
             event.target 触发事件的对象
             event.currentTarget 绑定事件的对象（同this）
             event.stopPropagation() 停止事件的传导(冒泡)
             event.preventDefault() 取消默认行为 （return false 做不到的它能做到，常用好用）
           事件的"冒泡"（bubble）
               -事件的冒泡就是指事件的向上传导
               -当元素上的某个事件被触发后，其祖先元素上的相同事件也会同时被触发
               -冒泡的存在大大的简化了代码的编写，但是在一些场景下我们并不希望冒泡存在不希望事件冒泡时，可						以通过事件对象来取消冒泡
  在事件的响应函数中：
  	event.target 表示的是触发事件的对象，触发的可能是多个事件或其他事件
  	this 绑定事件的对象
  /*----------------------------------------------------------*/  
  "box1 绝对定位，跟着鼠标移动"
  <script>
      const box1 = document.getElementById("box1")
      document.addEventListener("mousemove",function (event){
          box1.style.left = event.x + "px"
          box1.style.top = event.y + "px"
      })
  </script>
  "事件的冒泡与CSS样式无关，与HTML结构有关，只要HTML上冒泡，用CSS将元素移走也不会影响冒泡"
  
  /*--------------------------------------------------------------*/
  "事件的委派"
  我有一个委派：
        只绑定一次事件，既可以让所有的超链接，包括当前的和未来新建的超链接都具有这些事件
        思路：
        	可以将事件统一绑定给document，这样点击超链接时由于事件的冒泡，
             会导致document上的点击事件被触发，这样只绑定一次，所有的超链接都会具有这些事件
  	"委派就是将本该绑定给多个元素的事件，统一绑定给document，这样可以降低代码复杂度方便维护"
  <script>
      const btn = document.getElementById("btn")
      const list = document.getElementById("list")
      // 获取list中的超链接
      const links = list.getElementsByTagName("a")
  	
      //委派完成所有超链接弹窗
      document.addEventListener("click", event =>{
          // 判断点击的是不是超链接
          if([...links].includes(event.target)){
              alert(event.target.innerText)
          }
  })
  
      btn.addEventListener("click", function () {
  		 list.insertAdjacentHTML("beforeend", `<li><a href="javascript:;">
              链接${document.querySelectorAll("ul a").length + 1}
                  </a></li>`)       
      })
  </script>
  
  //对超链接的委派
  const links = document.getElementsByTagName('a')
  document.addEventListener('click', function (event){
      if([...links].includes(event.target)&& !event.target.onclick){
          event.target.onclick = deleteHandler
          event.target.onclick()
      }
  })
  /*--------------------------------------------------*/
  事件的传播机制：
        在DOM中，事件的传播可以分为三个阶段：
           1.捕获阶段（由祖先元素向目标元素进行事件的捕获）（默认情况下，事件不会在捕获阶段触发）
           2.目标阶段（触发事件的对象）
           3.冒泡阶段（由目标元素向祖先元素进行事件的冒泡）
         事件的捕获，指事件从外向内的传导，
            当前元素触发事件以后，会先从当前元素最大的祖先元素开始向当前元素进行事件的捕获
            
         如果希望在捕获阶段触发事件，可以将addEventListener的第三个参数设置为true
              一般情况下我们不希望事件在获阶段触发，所有通常都不需要设置第三个参数
  //事件触发的阶段            
  event.eventPhase  // 0没有触发	1捕获阶段	2目标阶段	3冒泡阶段
  // 自己触发自己永远是目标阶段
  <body>
  <div id="box1">
      <div id="box2">
          <div id="box3"></div>
      </div>
  </div>
  <script>
      const box1 = document.getElementById("box1")
      const box2 = document.getElementById("box2")
      const box3 = document.getElementById("box3")
      box1.addEventListener("click", function (event){
          alert("我是box1")
      },true)
      box2.addEventListener("click", function (event){
          alert("我是box2")
      })
      box3.addEventListener("click", function (event){
          alert("我是box3")
      },true)
  </script>
  </body>
  ```
  
  
