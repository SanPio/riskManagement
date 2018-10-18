<template>
    <div class="passinfo">
        <div class="aaa" v-if="popshow">
            <div class="pop">
                <h2 style="color:black;font-weight:normal;margin-top: 20px;">确定将该账号回退到审核状态吗？</h2>
                <button style="background-color:#999999;color:white;" @click="sure">确定</button>
                <button style="background-color:#4fa2fe;color:white;" @click="cancel">取消</button>
            </div>
        </div>
        <h1>已经拒绝的账户信息</h1>
        <!-- css用选择id -->
        <router-link to="/manage"><button class="btn">返回</button></router-link>
        <ul class="titles" id="titles">
            <li>
                <p class="fl" v-for="item in titInfo" :key="item">{{item}}</p>
            </li>
        </ul>
        <ul class="contents" id="contents">
            <li v-for=" (item,ind) in info" :key="item.id" v-if="!searchResult">
                <p class="fl" :title="item.controlNumber">{{ item.controlNumber }}</p>
                <p class="fl" :title="item.usertradeacts">{{ item.usertradeacts }}</p>
                <p class="fl" :title="item.usertradepsd">{{ item.usertradepsd }}</p>
                <p class="fl" :title="item.usertradesvr">{{ item.usertradesvr }}</p>
                <p class="fl" :title="item.accountnote">{{ item.accountnote }}</p>
                <p class="fl" :title="item.auditorName">{{ item.auditorName }}</p>
                <p class="fl" :title="item.operatedTime">{{ item.operatedTime }}</p>
                <p class="fl" :title="item.operatedIp">{{ item.operatedIp }}</p>
                <p class="fl" :title="item.operatedMachineId">{{ item.operatedMachineId}}</p>
                <p class="fl" :title="item.audit">{{ item.audit }}</p>
                <p class="fl" ><button  @click="refuse(ind)">回退</button></p>
            </li>
        </ul>
        <ul v-if="searchResult" id="contents">
            <li v-for="(items,ind) in infos" :key="items.userId">
                <p class="fl" :title="items.controlNumber">{{ items.controlNumber }}</p>
                <p class="fl" :title="items.usertradeacts">{{ items.usertradeacts }}</p>
                <p class="fl" :title="items.usertradepsd">{{ items.usertradepsd }}</p>
                <p class="fl" :title="items.usertradesvr">{{ items.usertradesvr }}</p>
                <p class="fl" :title="items.accountnote">{{ items.accountnote }}</p>
                <p class="fl" :title="items.auditorName">{{ items.auditorName }}</p>
                <p class="fl" :title="items.operatedTime">{{ items.operatedTime}}</p>
                <p class="fl" :title="items.operatedIp">{{ items.operatedIp }}</p>
                <p class="fl" :title="items.operatedMachineId">{{ items.operatedMachineId}}</p>
                <p class="fl" :title="items.audit">{{ items.audit }}</p>
                <p class="fl" ><button  @click="refuses(ind)">回退</button></p>
            </li>
        </ul>

        <!-- 搜索功能 -->    
        <div class="contents" id="cententsearch">
            <!-- <select name="type" class="search fl" v-model="type" >
                <option :value="0" selected >用户交易账号</option>
                <option :value="1">控制编号</option>
            </select> -->
            <select name="type" class="search fl" id="" v-model="selected">
                <option v-for="option in options" :value="option.value" :key="option.text">{{option.text}}</option>
            </select>
            <input type="text" class="fl" v-model="searchs">
            <button class="fl" @click="search">搜索</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data(){
        return{
            titInfo: ["控制编号","账号","密码","服务器","拒绝理由","操作人","操作时间","操作人IP","机器码","操作结果","修改"],
            // url : 'http://132.232.44.112:8080/app/',
            url: "",
            info: [],
            services:[],
            timer: '' ,
            traderFollowedWord:[],
            ispass:'',
            popshow:false,

            // 搜索功能
            infos:[],
            searchResult:false,
            searchs:[],
            type:'',
            selected:'1',
            options:[
                { text:"用户交易账号", value:'0'},
                { text:"控制编号", value:'1' }
            ]

        }
    },
    computed:{
        
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
        
       sure(){
            this.$indicator.open({
                text: '正在提交...',
                spinnerType: 'fading-circle'
            });
            this.$http.get(this.url+'wx/member/updateAuditToOne',{
                params:{
                    accountId:sessionStorage.getItem("accountId")
                }
            }).then( (res)=> {   
                this.$indicator.close();            
                this.request();
                this.popshow = false;
                this.searchResult = false
            }).catch( (err)=> {
            　　console.log(err)
            }); 
        },
        cancel(){
            this.popshow = false
        },
        // 点击正常显示页面的回退按钮时
        refuse(ind){
            this.popshow = true
            sessionStorage.setItem("accountId",this.info[ind].accountsid)
        },
        // 点击搜索出来结果中的回退按钮时
        refuses(ind){
            this.popshow = true
            sessionStorage.setItem("accountId",this.infos[ind].accountsid)
            // console.log(sessionStorage.getItem("accountId"))
        },
        request(){
            // 请求已通过账号信息
            this.$http.get(this.url+'wx/member/accountListWithRealPassed',{ 
                params:{
                    ispass: 2
                }
          }).then((res) => { 
              console.log(res)
              var len = res.data.data.length;  
              this.info = res.data.data;
               for(var i=0;i<len;i++){
                    if(this.info[i].audit == 0){
                        this.info[i].audit="通过";
                    }else if(this.info[i].audit == 2){
                        this.info[i].audit="拒绝";
                    }
                    
                }   
                
          }).catch((err)=>{
              console.log(err)
          })
             
        },
        //  搜索功能
        search(){
            if(this.searchs == ""){
                this.searchResult = false
            }else{
                this.$http.get(this.url + 'wx/member/selectAccountInfoByCondition',{
                    params : {
                        searchs : this.searchs,
                        type: this.selected,
                        ispass : 2
                    }
                }).then((res)=>{
                    console.log(res)
                    // console.log(res.data.data)
                    this.infos = res.data.data
                    // console.log(this.infos)
                    var len = res.data.data.length
                    // console.log(len)
                    for(var i=0;i<len;i++){
                        if(this.infos[i].audit == 0){
                            this.infos[i].audit="通过";
                        }else if(this.infos[i].audit == 2){
                            this.infos[i].audit="拒绝";
                        }
                        
                    }
                    if(len){
                        this.searchResult = true
                    }else{
                        this.searchResult = false
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
           
        }
        
    }
}
</script>


