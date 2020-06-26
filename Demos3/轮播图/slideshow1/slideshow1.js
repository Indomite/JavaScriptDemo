      var slideshow = document.getElementById("slideshow");
      // if(baseBox.width == null) {

      // }
      // slideshow.style.width = baseBox.width + "px";
      // slideshow.style.height = baseBox.height + "px";
      this.create();
      // 获取节点
      var box = document.getElementById("box");
      var img = document.querySelectorAll("#box img");
      var span = document.querySelectorAll("#slideshow>.dot-box>div>span");
      var div = document.querySelectorAll("#slideshow>.dot-box>div");
      var pre = document.getElementsByClassName("btn")[0];
      var next = document.getElementsByClassName("btn")[1];
      var width = slideshow.clientWidth;
      console.log(width);
      var length = document.querySelectorAll("#box img").length;
      var timer = null;
      var counter = 1;
      var spanNow = 0;
      this.inter();
      box.style.transform = "translateX(" + (-width * counter) + "px)";
      span[spanNow].style.opacity = "1";
      // 创建
      function create() {
         // 创建slideshow下的子盒子
         var box = document.createElement("div");
         box.setAttribute("id", "box");
         slideshow.append(box);
         // 创建图片
         var img = document.createElement("img");
         // console.log(imgBox.length);
         img.src = baseImgPath + "/" + imgBox[imgBox.length - 1];
         box.append(img);
         for (var i = 0; i < imgBox.length; i++) {
            var img = document.createElement("img");
            img.src = baseImgPath+ "/" + imgBox[i];
            box.append(img);
         }
         var img = document.createElement("img");
         img.src = baseImgPath + "/" + imgBox[0];
         box.append(img);
         // 后退按钮
         var pre = document.createElement("div");
         pre.setAttribute("class", "btn pre");
         slideshow.append(pre);
         // 前进 
         var next = document.createElement("div");
         next.setAttribute("class", "btn next");
         slideshow.append(next);
         // 创建进度点
         // 创建进度点的子盒子
         var dotBox = document.createElement("div");
         dotBox.setAttribute("class", "dot-box");
         slideshow.append(dotBox);
         //创建点
         for (let i = 0; i < imgBox.length; i++) {
            var dotChildBox = document.createElement("div");
            var dotChildBoxSpan = document.createElement("span");
            dotChildBox.append(dotChildBoxSpan);
            dotBox.append(dotChildBox);
         }
      }
      // 循环
      function inter() {
         timer = setInterval(() => {
            counter++;
            dot();
            box.style.transform = "translateX(" + (-width * counter) + "px)";
            box.style.transition = "all 0.4s ease-in-out";
         }, time)
      }
      // 后退
      pre.addEventListener("click", () => {
         if (counter <= 0) return;
         clearInterval(timer);
         counter--;
         dot();
         box.style.transform = "translateX(" + (-width * counter) + "px)";
         box.style.transition = "all 0.4s ease-in-out";
         inter();
      })
      // 向前
      next.addEventListener("click", () => {
         if (counter >= length - 1) return;
         clearInterval(timer);
         box.style.transition = "all 0.4s ease-in-out";
         counter++;
         dot();
         box.style.transform = "translateX(" + (-width * counter) + "px)";
         inter();
      })
      // 让图片看似成环
      box.addEventListener("transitionend", () => {
         // console.log(length);
         if (counter >= length - 1) {
            // console.log(counter);
            box.style.transition = "none";
            counter = 1;
            box.style.transform = "translateX(" + (-width * counter) + "px)";

         }
         if (counter == 0) {
            box.style.transition = "none";
            counter = length - 2;
            box.style.transform = "translateX(" + (-width * counter) + "px)";
         }
      })
      // 将图片与点对应
      function dot() {
         spanNow = counter - 1;
         if (counter == 0) spanNow = 4;
         if (counter == 6) spanNow = 0;
         dotNow(spanNow);
      }
      // 显示现在图片对应的点
      function dotNow(x) {
         for (var i = 0; i < length - 2; i++) {
            if (i == x) span[i].style.opacity = "1";
            else span[i].style.opacity = "0";
         }
      }
      // 为点添加点击事件
      for (let i = 0; i < span.length; i++) {
         div[i].addEventListener("click", () => {
            clearInterval(timer);
            dotNow(i);
            counter = i + 1;
            box.style.transform = "translateX(" + (-width * counter) + "px)";
            box.style.transition = "all 0.4s ease-in-out";
            inter();
         })
      }