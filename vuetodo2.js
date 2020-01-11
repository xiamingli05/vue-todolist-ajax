

var app =new Vue({
    el:'#app',
    data:{
        todolist:[],
        donelist:[],
        msg:''
    },
    methods:{
        
        init(){
            //这是一个封装重新加载的方法
            var that=this;
            fetch('getMyTodos','get',{},function(jsondata){
                that.todolist=jsondata.undone;
                that.donelist=jsondata.done;
            });
        },
        // 增加未完成事件
        moveTodo(){
            var that =this;
            if(this.msg.length === 0)return;
            
            fetch('addTodo','post',{task:this.msg},function(){
                that.init();
            });
            
            that.msg='';
        },
        //改变事件状态
        movedone(idx,type){
            var that =this;
            var list ='';
            if(!type){
                list=this.todolist;
                list[idx].status='1';
            }else{
                list=this.donelist;
                list[idx].status='0';
            }
            fetch('changeTodoStatus','get',{id:list[idx]._id,status:list[idx].status},function(){
                that.init();
            })
            
        },
        //删除事件
        tododel(id,idx,type){
            var that=this;
            fetch('deleteTodo','get',{id:id},function(){
                that.init();
            });
        }, 
        //编辑事件
        edit(idx,type){
            var that = this;
            var list='';
            if(!type){
                list=this.todolist;
            }else{
                list=this.donelist;
            }
            fetch('editTodo','post',{id:list[idx]._id,task:list[idx].task},function(){
                that.init();
            });
        }
    },
    //vue生命周期挂载完成的钩子函数,在这里执行页面初始化加载数据
    mounted(){
        this.init();
    }
});