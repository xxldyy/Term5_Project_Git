/**
 * 购物车JS文件
 */
$(function (){
   //把三个类型的input分别选获取
   var  $theadinput = $('table thead input[type=checkbox]');//头部选择框
 
   var  $bodyinputs = $('table tbody input[type=checkbox]');//中间选择框
 
   var  $totalpriceinput = $('.totalprice input[type=checkbox]');//结算选择框
 /*表头全选 */
 /**
  * 1.给表头中的全选按钮绑定点击事件 点击的时候 获取它的选中状态(ture/false)
  * 2.给表格中的每一行的数据的input选择框，赋值为表头的选中状态(ture/false)
  * 3.给计算总价中的全选框，也赋值为表头的选中状态(ture/false)
  */
 
  
 $theadinput.change(function(){
    var checkstate = $(this).prop('checked');//获取全选框选中状态
   
    $bodyinputs.prop('checked',checkstate);//把状态给表格中的选择框
    $totalpriceinput.prop('checked',checkstate);//把状态给计算总价中的全选框

    allTotal();//调用总计
 })

    /**
   计算总价的全选
      1.给计算总价的全选按钮 绑定点击事件，获取选择状态(ture/false)
      2.把状态给表头的全选
      3.把状态给表格中的选择框
   */
 
    $totalpriceinput.change(function(){
       var checkstate=$(this).prop('checked');//获取计算总计中的全选状态
       $theadinput.prop('checked',checkstate);//赋值给表头全选框
       $bodyinputs.prop('checked',checkstate);//赋值给表格中全选框

       allTotal();//调用总计
    })
  

    /**
     * 表格中的选择框，反过来影响两个全选框
     *  1.给表格中的选择框绑定
     * 2.定一个标杆 flag=ture
        3.循环表格中的选择框
        4.获取每一个选中的选中状态
           判断：如果有一个是false ，那么就不是全选 flag=false
        5.把falg的值赋值给两个全选框(因为flag就是对应选中状态
         )
     */

    $bodyinputs.change(function () {//给表格总单选框绑定事件
   
      var flag = true;//定一个标杆
       $bodyinputs.each(function (index, input) {//循环表格input
          var checkstate=$(this).prop('checked');//获取选中状态
          if(checkstate===false) {  //只要有一个选择框没有选中 那么状态为false
             flag = false ;//标杆变为false(全选的状态变为false)
          } 
          })
          //吧这个状态用来改变全选框
          $theadinput.prop('checked',flag);//把状态赋值给头部全选框
          $totalpriceinput.prop('checked',flag);//把状态赋值给计算价格全选框

          allTotal();//调用总计
         })

    /**
     1.1获取+按钮，绑定点击事件
     2.点击的时候，获取后面输入框的值
     3.输入框的值自增
     4.把自增后的值，重新赋值给后面的输入框
     */
   
    $('.add').on('click',function (){//给增加绑定事件
      var count=parseInt($(this).next().val());//取后面输入框的值
      count ++;//自增
      $(this).next().val(count);//把自增的值 赋值给后面输入框
     

      //调用小计
      subTotal($(this),count);
      allTotal();//调用总计
    })
 
    /**
     1.给-绑定点击事件
     2.获取前面输入框的值
     3.值自减
     4.把减少后的值，重新赋值给前面的输入框
     */
   $('.reduce').on('click',function(){//绑定事件
      var count=parseInt($(this).prev().val());//获取前面输入框的值
      count--;//自增
      count =count < 1 ? 1 : count;//如果小于1 那么它就等于1 否则 就等于自己
      $(this).prev().val(count);//把自增的值赋值给前面的输入框
      
   
       //调用小计
       subTotal($(this),count);
       allTotal();//调用总计
      })
     
  
   /**
    封装一个小计函数：（点击 + 或 - 的时候 需要调用小计功能)
    */
   function subTotal(dom,count){
    var singlePrice=parseFloat(dom.closest('tr').find('.price').text());//找到单价

      var subtotalPrice =singlePrice * count;
      //把小计的结果放入dom对应的位置
     dom.closest('tr').find('.subprice').text(subtotalPrice.toFixed(2));//把小计的结果渲染对应的位置，保留两位小数
  }
  
  /**
     总计功能实现:(头部全选 计算总价全选 表格的选择框+ -删除 六个地方调用总计)
     1.定一个变量，用于保持总价，定义一个变量，用于保存已选商品 数量
     1.获取所有表格中选择框，循环，获取选中状态，判断。
     2.如果选中，那么就要累加这一行的小计
    */
    
 function allTotal() {
   
var allPrice = 0;  //定一个变量，用于保持总价
   
var selectedCount = 0;//定义变量 保持总价格
 $('table tbody input[type=checkbox]').each(function() {//循环表格中的所有选择框
   var checkstate=$(this).prop('checked');//获取选状态
    if (checkstate) {//如果是ture
  allPrice += parseFloat( $(this).closest('tr').find('.subprice').text());//累加
    selectedCount++;//数量+1
      }
     
   })
    //渲染
   $('.total').text(allPrice.toFixed(2));//渲染总价
   
   $('.count').text(selectedCount);//渲染数量
  
  }


  /**
   关于下面 的删除功能:模拟，不是真正的逻辑，是
   */
  //删除
  $('.del').click(function () {
   //删除整行
   $(this).closest('tr').remove();
   getGoodscount();//重新计算商品数量
   allTotal();//计算总价
  })
//删除选中
$('.deletechecked').click(function(){
   $('table tbody input[type=checkbox]').each(function() {//循环表格中的所有选择框
      var checkstate=$(this).prop('checked');//获取选状态
       if (checkstate) {//如果是ture
         $(this).closest('tr').remove();//删除自己 
         
         }
      
      })
      allTotal();//重新计算商品数量
     getGoodscount();//页面加载调用一次
     
})

//封装一个获取全部商品的函数
function getGoodscount(){
   //获取数量
   var goodscount=$('table tbody tr').length;
   //渲染
   $('.goodscount').text(goodscount);
}
getGoodscount();//页面加载调用一次

   })
