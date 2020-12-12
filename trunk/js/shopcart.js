/**
 * 购物车JS文件
 */
$(function (){
    // 1.全选
    /*
 1.点击表头得全选框 获取表头得全选框得选中状态
 2.表格中的单选框状态需要一致
 3.结算三中的全选状态一致
    */
   //定义三个变量
   var  $theadinput = $('table thead input[type=checkbox]');//头部选择框
 
   var  $bodyinput = $('table tbody input[type=checkbox]');//中间选择框
 
   var  $all = $('.totalprice input[type=checkbox]');//结算选择框
 
 
 
 $theadinput.change(function(){
     //获取选中状态
    var state = $(this).prop('checked');
    //然表格中的选择框状态保持一致 且 结算中的选择框的状态保存一致
    $bodyinput.prop('checked',state);
    $all.prop('checked',state);
 
    
 //调用计算总价函数
 calctotalprice();
    //结算中的选择框 状态保持一致
   // $('total input[type-checkbox]').prop('checked',state);
 })
 
 
 //结算中的选择框也需要有相同的选择功能
 $all.change(function(){
       //获取选中状态
    var state = $(this).prop('checked');
 
    //上面的全选 和表格中的 input 需要状态保持一致
    $bodyinput .prop('checked',state);
    $theadinput .prop('checked',state);
    
 //调用计算总价函数
 calctotalprice();
 })
 
 
 //表单中的选中状态 反过来影响全选
 
 $bodyinput.change(function () {
 //第一个标杆
 var flag = true;
 
 
     //循环表格中所有选择框的选中状态
  $bodyinput.each(function (i, input) {
     if  (!$(input).prop('checked')) {  //只要有一个选择框没有选中 那么状态为false
        flag = false ;
     } 
     })
     //吧这个状态用来改变全选框
     $theadinput.prop('checked',flag)
     $all.prop('checked',flag)
 
     //渲染到总价对应的位置 $('.total').text( totalprice.toFixed(2))
 
 //调用计算总价函数
 calctotalprice();
     })
 
 
 
 
 
 
 //数量增加功能
   $('.add').on('click',function (){
 //下一个input节点
 var $nextinput = $(this).next();
 
 //获取输入框的值
 var oldval = parseInt($nextinput.val());
 //自增
 oldval ++;
 //重新赋值给这个输入框
 $nextinput.val(oldval);
 
 //小计
 subtotalprice(oldval,  $(this));
 
 //调用计算总价函数
 calctotalprice();
 })
 
 //数量减少功能
   $('.reduce').on('click',function(){
 //上一个input节点
 var $previnput = $(this).prev();
 
 //获取输入框的值
 var oldval = parseInt($previnput.val());
 //自减
 oldval --;
 
 oldval = oldval < 1 ? 1 : oldval //如果小于1 那么它就等于1 否则 就等于自己
 
 //重新赋值给这个输入框
 $previnput.val(oldval);
 
 //小计
 subtotalprice(oldval,  $(this));
 
 //调用计算总价函数
 calctotalprice();
 })
 
 //抽取一个小计的函数
 function subtotalprice(val, dom){
     //小计
     var subtotal = val *  parseFloat( dom.closest('tr').find('.price').text() ) ;
     //把小计的结果放入dom对应的位置
    dom.closest('tr').find('.subprice').text(subtotal.toFixed(2));
 }
 
 
 //删除
   $('.del').click(function () {
    //删除整行
    $(this).closest('tr').remove();
    calcgoodsconut()  //调用商品总数量
   })
 
 //计算总价和选中数量的函数
 function calctotalprice() {
    //定义一个数量
 var count = 0;
 
    //定义变量 保持总价格
     var totalprice = 0;
 console.log(totalprice)
 
    //循环表格中的所有选择框 如果选中状态 那么计算总价
  $('table tbody input[type=checkbox]').each(function(i, input) {
       if ($(input).prop('checked')) {
 
          // 自增
 count ++;
 
 
          //累加价格
 totalprice += parseFloat( $(input).closest('tr').find('.subprice').text())
       }
    })
    console.log(totalprice)
    
    //把总价渲染到对应的位置
    $('.total').text(totalprice.toFixed(2))
    //把数量渲染到对象的dom位置
    $('.count').text(count)
   }
 
 //全部商品
 function calcgoodsconut() {
 $('.goodscount').text( $('table tbody tr').length )
 }
 calctotalprice();//已进入界面 就自定调用一次
 
 //删除选中商品
 $('.deletechecked').on('click', function () {
    //循环单选框 如果选中 删除的是一行
    $bodyinput.each(function (i,input) {
 if ($(this).prop('checked')){
    $(this).closest('tr').remove();
      }
    })
 //计算总价
 calctotalprice();
 //计算商品数量
 calcgoodsconut();
    
 
 })
 
 
 })