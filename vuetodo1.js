
function getAjax(){
    $.ajax({
        url:'http://10.36.135.106:9999/todo/getMyTodos',
        data:'userId=SZ191713012',
        type:'GET',
        success:function(newdata){
            app.todolist=newdata.data.undone;
            app.donelist=newdata.data.done;
        }
    });
}
var app =new Vue({
    el:'#app',
    data:{
        todolist:[],
        donelist:[],
        msg:''
    },
    methods:{
        moveTodo(){
            if(this.msg.length === 0)return;
            $.ajax({
            url:'http://10.36.135.106:9999/todo/addTodo',
            data:'userId=SZ191713012&task='+app.msg,
            type:'post',
            success:function (){
                getAjax();
            }
        })
            this.msg=''
        },
        movedone(idx,type){
            var list='';
            if(!type){
                list1=app.todolist;
                list2=app.donelist;
                list1[idx].status=1;
            }else{
                list1=app.donelist;
                list2=app.todolist;
                list1[idx].status=0;
            }
            $.ajax({
                    url:'http://10.36.135.106:9999/todo/changeTodoStatus',
                    data:'userId=SZ191713012&id='+list1[idx]._id+'&status='+list1[idx].status,
                    type:'GET',
                    success:function (){
                        getAjax();
                    }
                })
        },
        tododel(id,idx,type){
            var list='';
            if(!type){
                list=app.todolist;
            }else{
                list=app.donelist;
            }
            $.ajax({
                    url:'http://10.36.135.106:9999/todo/deleteTodo',
                    data:'userId=SZ191713012&id='+id,
                    type:'GET',
                    success:function (){
                        getAjax();
                    }
                })
        },
        edit(idx,type){
            var list='';
            if(!type){
                list=app.todolist;
            }else{
                list=app.donelist;
            }
            $.ajax({
                    url:'http://10.36.135.106:9999/todo/editTodo',
                    data:'userId=SZ191713012&id='+list[idx]._id+'&task='+list[idx].task,
                    type:'post'
                })
        }
    },
    mounted(){
        getAjax();
    }
});