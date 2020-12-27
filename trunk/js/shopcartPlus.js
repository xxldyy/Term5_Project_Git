/**
* 购物车功能js
* 2020-12-15 by zmj
*/

$(function () {
   //把三个类型的input分别获取
   var $theadInput = $('thead input[type=checkbox]');//表头中的全选
   var $tbodyInputs = $('tbody input[type=checkbox]');//表格中的每一行选择框
   var $totalpriceInput = $('.totalprice  input[type=checkbox]');//计算总价的全选框

   /*全选*/
   /**
    *  1.给表头中的全选按钮绑定点击事件 点击的时候 获取到它的选中状态(true /false)
    * 2.给表格中每一行的数据的input选择框，赋值为表头的选中状态(true/false)
    * 3.给计算中总价的全选框，也赋值给表头的选中状态(true/false)
    */
   //表头的全选
   $theadInput.change(function () {
      var checkState = $(this).prop('checked');//获取全选框的状态
      $tbodyInputs.prop('checked', checkState);//把状态给表格中的选择框
      $totalpriceInput.prop('checked', checkState);//把状态给计算总价的全选框
      allTotal();//总计         
   });
   /**
    * 计算总价的全选
    1.给计算总价的全选按钮 绑定点击事件 获取选择状态(true /false)
    2.把状态给表头的全选
    3.把状态给表格中的选择框
    */
   $totalpriceInput.change(function () {
      var checkState = $(this).prop('checked');//获取计算总价的全选状态
      $theadInput.prop('checked', checkState);//赋值给表头全选框
      $tbodyInputs.prop('checked', checkState);//赋值给表格中全选框


      allTotal();//总计
   })
   /**
    * 然表格中的选择框 反顾来影响全选框
    * 1.给表格中的选择框绑定点击事件
    *   定一个标杆 flag=true;
    * 2.循环表格中的选择框
    * 3、获取每一个的选中状态
    * 判断如果有个是false 那么就不是全选 flag=false
    * 4.吧flag的值赋值给对应的两个全选框
    *  */

   $tbodyInputs.change(function () { //给表格中单选框绑定事件
      var flag = true; //订标杆为flag
      $tbodyInputs.each(function (index, input) { //循环表格input
         var checkState = $(this).prop('checked');//获取选中状态
         if (checkState === false) {//如果有一个等于false
            flag = false; //标杆变为fals的状态

         }
      })
      $theadInput.prop('checked', flag);//把状态赋值给头部全选框
      $totalpriceInput.prop('checked', flag);//把状态赋值给计算价格全选框
      allTotal();//总计
   })


   /**
    * 加法功能：
    * 1.获取＋按钮 ，绑定点击事件
    *2.点击的时候，获取后面输入框的值 
    *3.输入框的值自增
    4.把自增后的值，重新赋值给后面的输入框
    */

   $('.add').click(function () { //给增加绑定事件
      var count = parseInt($(this).next().val()); //那后面输入框的值
      count++; //自增
      $(this).next().val(count);//把自增的值  赋给后面的输入框

      //小计
      subTotal($(this), count);
      allTotal();//总计  
   })
   /**
    * 减法功能：
    * 1.给 绑定点击事件
    * 2.获取前面输入框的值
    * 3.值自减少 ，边界判断 ，如果小于1，那么等于1，否则等于自己
    * 4把减少后的值  重新给前面的输入框赋值
    */

   $('.reduce').click(function () {//绑定事件
      var count = parseInt($(this).prev().val());//获取前面输入框的值
      count--;//自减
      count = count < 1 ? 1 : count;//边界判断
      $(this).prev().val(count);//把减少后的值  重新赋予给前面的输入框

      //小计
      subTotal($(this), count);
      allTotal();//总计 
   })


   /**
  封装一个小计函数:(点击+或-的时候 需要调用小计功能)
   */
   function subTotal(dom, count) {
      var singleprice = parseFloat(dom.closest('tr').find('.price').text());   //找到单价

      var subtoTalprice = singleprice * count;  //单价 * 数量 = 小计
      dom.closest('tr').find('.subprice').text(subtoTalprice.toFixed(2))  //把小计的结果渲染页面 保留两位小数
   }

   /*
      总计功能实现：（头部全选 计算总价全选 表格的选择框 + - 删除   六个地方调用总计）
         定义一个变量 用于保存总价 定义一个变量 用于保存已选择商品的数量
         1.获取所有表格中选择框的选中状态
         2.如果选中，那么就要累加这一行的小计
   */
   function allTotal() {
      var allPrice = 0;  //定义一个变量 用于保存总价
      var selectedCount = 0;  //定义一个变量 用于保存已选择商品的数量


           console.log(allPrice)

      $('table tbody input[type=checkbox]').each(function () {  //获取表格中的选择框 循环
         var checkstate = $(this).prop('checked');  //获取选中状态
         if (checkstate) {  //如果是true
            allPrice += parseFloat($(this).closest('tr').find('.subprice').text());  //累加这一行的小计
            selectedCount++;  //数量 + 1
         }
      })
    
      console.log(allPrice)
         
      //渲染
      $('.total').text(allPrice.toFixed(2));  //渲染总价
      $('.count').text(selectedCount);  //渲染数量
   }
   
   /*
      关于下面的删除功能： 模拟，不是真正的逻辑,是“伪”的
      
   */

   //删除
    $('.del').click(function(){
       $(this).closest('tr').remove()//干掉自己
       getGoodscount();//重新计算商品数量
       allTotal();计算总价
    })


     //删除选中
     $('.deletechecked').click(function(){
          $('tbody  input[type=checkbox]').each(function(){//获取表格中的选择框 循环
            var checkState = $(this).prop('checked');//获取选中状态
            if(checkState){//如果是true
               $(this).closest('tr').remove();   //干掉自己
            }
          })
          allTotal();计算总价
          getGoodscount();//重新计算商品数量
        
     })


     //封装一个获取全部商品的函数
     function getGoodscount(){
        //获取数量
        var Goodscount = $('tbody tr').length;
        //渲染
        $('.Goodscount').text(Goodscount)
     }
 
      getGoodscount();//页面加载调用一次
})