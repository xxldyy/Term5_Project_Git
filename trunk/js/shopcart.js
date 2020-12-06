/*购物车JS文件
 */
$(function (){
    //全选
    /*点击表头的全选框 获取表头全选框的选中状态 
      表格中的单选框需要一致
      结算中的全选状态一致
    */

   //定义三个变量
   var $theadInput= $('table thead input[type=checkbox]');
   var $tbodyInput= $('table tbody input[type=checkbox]');
   var $allPriceinput=$('.totalPrice input[type=checkbox]');


  $theadInput.change(function(){
       //获取选中状态
      var state=$(this).prop('checked')
      //让表格中的选择框状态保持一致结算中的选择框保持一致
      $tbodyInput.prop('checked',state);
      $allPriceinput.prop('checked',state);
      //$('.totalPrice input[type=checkbox]').prop('checked',state);
   })
   
   //结算中的选择框也需要有相同的功能
   $allPriceinput.change(function(){
        //获取选中状态
      var state=$(this).prop('checked')
      //上面的全选和表格中的input需要一致
      $theadInput.prop('checked',state);
      $tbodyInput.prop('checked',state);
    })

    //表单中的选中状态反过来影响全选
    $tbodyInput.change(function(){
        var flag=true;
        var totalPrice=0;
        //循环表格中所有选择框的选中状态
        $tbodyInput.each(function(i,input){
           if(!$(input).prop('checked')){
               flag=false;
           }else{
            totalPrice += parseFloat($(this).closest('tr').find('.subprice').text());
           }
        })
        $theadInput.prop('checked',flag)
        $allPriceinput.prop('checked',flag)
        //渲染到总价对应位置
        $('total').text(totalPrice.toFixed(2))
    })
    //数量的加减功能
    $('.add').on('click',function(){
        //下一个input节点
        var $nextInput=$(this).next();
       //获取输入框的值
       var oldVal=parseFloat($nextInput.val());
       //自增
       oldVal++;
       //重新赋值给这个输入框
       $nextInput.val(oldVal)

       //小计
      subTotalPrice(oldVal,$(this));

    })
    $('.reduce').on('click',function(){
         //上一个input节点
         var $prevInput=$(this).prev();
         //获取输入框的值
         var oldVal=parseFloat($prevInput.val());
         //自减
         oldVal--;
         oldVal=oldVal<1?1:oldVal;
         //重新赋值给这个输入框
         $prevInput.val(oldVal)
           //小计
           subTotalPrice(oldVal,$(this));


    })
    //抽取小计函数
    function subTotalPrice(Val,dom){
        var subtotal=Val*parseFloat(dom.closest('tr').find('.price').text());
        //把小计放入dom对应位置
        dom.closest('tr').find('.subprice').text(subtotal.toFixed(2))
 

    }
    //删除
    $('.del').click(function(){
        //删除整行
        $(this).closest('tr').remove();
    })
    //计算总价的函数
    $tbodyInpu.each(function(i,input){
        var totalPrice=0;
        //判断选中状态
        if($(input).prop('checked')){
            totalPrice += parseFloat($(this).closest('tr').find('.subprice').text());
        }
        //

    })

})