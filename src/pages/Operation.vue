<template>
    <div class="operationtab">
        <h1>操作记录表</h1>
        <router-link to="/manage"><button class="btn">返回</button></router-link>
        <ul class="operationtit">
            <li>
                <p class="fl" v-for="item in titInfo" :key="item">{{item}}</p>
            </li>
        </ul>
        <ul class="operationcon">
            <li v-for="item in info" :key="item.operatedRecordId">
                <p class="fl" :title="item.operatedRecordId">{{item.operatedRecordId}}</p> 
                <p class="fl" :title="item.accountsId">{{item.accountsId}}</p>
                <p class="fl" :title="item.usertradeacts">{{item.usertradeacts}}</p>
                <!-- 控制编号controlNumber -->
                <p class="fl" :title="item.controlNumber">{{item.controlNumber}}</p>
                <p class="fl" :title="item.usertradesvr">{{item.usertradesvr}}</p>
                <!-- 平台后缀traderfollowedword -->
                <p class="fl" :title="item.traderfollowedword">{{item.traderfollowedword}}</p>
                <p class="fl" :title="item.operatedType">{{item.operatedType}}</p>
                <p class="fl" :title="item.accountnote">{{item.accountnote}}</p>
                <p class="fl" :title="item.employeeId">{{item.employeeId}}</p>
                <p class="fl" :title="item.operatedIp">{{item.operatedIp}}</p>
                <p class="fl" :title="item.operatedMachineId">{{item.operatedMachineId}}</p>
                <p class="fl" :title="item.operatedTime">{{item.operatedTime}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'App',
    data(){
        return{
            titInfo: ["记录ID","账号ID","交易账号","控制编号","服务器","平台后缀","操作结果","拒绝理由","操作ID","操作IP","机器码","操作时间"],
            // url : 'http://132.232.44.112:8080/app/',
            url: "",
            info: [],
            services:[],
            timer: '' ,
            
        }
    },
    created(){
        this.url = localStorage.getItem("url")
    },
    mounted(){
        // this.request();
        if(sessionStorage.employeeName){
            this.request();  
        }else{
            this.$layer.msg("请先登录")
        }
    },
    methods:{
        request(){
            //所有操作记录列表
            this.$http.get(this.url+'web/emp/selectOperateRecordListAll',{   
          }).then((res) => { 
                console.log(res)
                this.info = res.data.data;
                var len = this.info.length
                //判断操作类型 
                for(var i=0;i<len;i++){
                    if(this.info[i].operatedType == 0){
                        this.info[i].operatedType="通过";
                    }else if(this.info[i].operatedType == 2){
                        this.info[i].operatedType="拒绝";
                    }else if(this.info[i].operatedType == 3){
                        this.info[i].operatedType="回退";
                    }
                
                }
                
          }).catch((err)=>{
                console.log(err)
          })
             
        },
        
    }
}
</script>


