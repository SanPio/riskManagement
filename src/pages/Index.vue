<template>
    <div id="app">
        <div class="logintab">
            <h1>登录页</h1>
            <div class="info">
                <p><span class="fl">账&nbsp;&nbsp;&nbsp;&nbsp;号</span><input class="fr" type="text" placeholder="请输入账号" v-model="employeeName"></p>
                <p><span class="fl">密&nbsp;&nbsp;&nbsp;&nbsp;码</span><input class="fr" type="password" placeholder="请输入密码" v-model="employeePassword"></p>
                <!-- <p class="msg" v-if="info==0">{{msg}}</p> -->
            </div>
            
            <button class="btn4" @click="lg">登录</button>
            <!-- <router-link to="/ceshi"><button >测试</button></router-link> -->
        </div>
    </div>
</template>
<script>
export default {
    name:"App",
    data(){
        return{
            url : 'http://132.232.44.112:8080/app/',
            // url: "http://192.168.0.100:8080/",
            // url: "http://192.168.0.197:8080/",
            info:[],
            employeeId:"",
            employeeName:"",
            employeePassword:"",
            msg:""
            
        }
    },
    mounted(){
        

    },
    created(){
        //储存域名端口
      localStorage.setItem('url', this.url);
    },
    methods:{
        
        //点击登录
        lg(){
            
            var that = this;
            sessionStorage.setItem("employeeName",this.employeeName)
            var params = new URLSearchParams();
            params.append('employeeName', this.employeeName);
            params.append('employeeId', sessionStorage.employeeId);
            params.append('employeePassword', this.employeePassword);
            if(this.employeeName != "" && this.employeePassword != "" ){
                
                this.$http.post(this.url+'web/emp/login', params).then(function (res) {
                　　console.log(res)
                var info = res.data
                    // 判断输入的账号密码是否正确
                    if(res.data.code == 1){
                        window.location.href = "#/manage"; 
                        sessionStorage.setItem( "employeeId",res.data.data.employeeId );
                        params.append('employeeId', res.data.data.employeeId );
                    }else if( res.data.code == -1 ){
                        // console.log(res.data.message)
                        that.$layer.msg( info.message );
                    }
                    // console.log(info.message)
                    
                }).catch( function ( err ) {    
                    console.log( err )                
                });


            }else{
                that.$layer.msg("请输入正确的用户名和密码");
                
            }
        }               
    }
}
</script>
<style>
    .logintab{
        width: 400px;
        height: 300px;
        margin: 14px auto;
        background-color: gray;
    }
    .logintab h1{
            text-align: center; 
            font-family: "宋体"; 
            padding: 20px 0 0 0;
            font-size: 40px;
    }
    .logintab .info{
        width: 350px;
        margin: 40px auto 40px;
        position: relative;
        margin-left: -6px;
    }
    .logintab .info p{
        height: 70px;
        margin-top: 10px;
        line-height: 40px;
    }
    .logintab button{
        width: 80px;
        height: 40px;
        border: none;
        left: 166px;
        background: #4fa2fe;
        color: #2c3e50;
        border-radius: 4px;
    }
    .logintab input{
        width: 250px;
        height: 36px;
        padding: 0 0 0 10px;
        font-size: 14px;
        /* letter-spacing: 2px; */
    }
    .logintab span{
        width: 80px;
        /* letter-spacing: 20px; */
        font-size: 18px;
        display: block;
        text-align: center;
    }
    .logintab .msg{
        color: red;
        position:absolute;
        bottom:-40px;
        font-size: 14px;
        left: 90px;
    }
    
</style>