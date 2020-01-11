$.ajax({
    url:'http://10.36.135.106:9999/todo/getMyTodos',
    data:'userId=SZ191713012',
    type:'GET',
    success:function(jsondata){
        
        
    var app =new Vue({
        el:'#app',
        data:{
            todolist:jsondata.data.undone,
            donelist:jsondata.data.done,
            msg:''
        },
        methods:{
            moveTodo(){
                if(this.msg.length === 0)return;
                $.ajax({
                url:'http://10.36.135.106:9999/todo/addTodo',
                data:'userId=SZ191713012&task='+app.msg,
                type:'post',
                success:function(){
                    $.ajax({
                        url:'http://10.36.135.106:9999/todo/getMyTodos',
                        data:'userId=SZ191713012',
                        type:'GET',
                        success:function(newdata){
                            app.todolist=newdata.data.undone;
                        }
                    })
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
                        success:function(){
                            var npval=list1.splice(idx,1);
                            list2.push(npval[0]);
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
                        success:function(){
                            list.splice(idx,1);
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
                        type:'post',
                        success:function(){

                        }
                    })
            }
        }
    });
        }
    })