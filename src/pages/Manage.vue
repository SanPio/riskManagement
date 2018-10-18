<template>
  <div id="box">
    <!-- 倒计时 -->
    <div class="countdown">距离下一次刷新还有 {{num}} s</div>
    <h1>管理系统</h1>
    <ul class="manage">
        <li><router-link to="/" replace><button @click="exit">退出登录</button></router-link></li>
        <li><router-link to="/refuseinfo"><button>已拒绝账号</button></router-link></li>
        <li><router-link to="/operation"><button>操作记录</button></router-link></li>
        <li><router-link to="/passinfo"><button>已通过账号</button></router-link></li>
    </ul>    
    <ul class="clearfix header">
        <li v-for="item in titInfo" class="title left" :key="item">
            {{item}}
        </li>
    </ul>
    <ul class="content" id="content">
        <li v-for=" ( item, ind ) in info" class="clearfix" :key="item.account">
            <p class="left">
                {{ item.userTradeActs }}
            </p>
            <p class="left" >
                {{ item.userTradePsd }}
            </p>
            <p class="left">
                <!-- {{ item.userTradeSvr }} -->
                <input type="text" v-model="service[ind]">
            </p>
            <p class="left">
                <!-- 平台后缀 -->
                <input type="text" v-model="traderFollowedWord[ind]">
            </p>           
            <p class="left">
                <textarea name="" id="" cols="30" rows="2" v-model="remarks[ind]"></textarea>
            </p>
            <p class="left">
                <input type="text" v-model="controlNumber[ind]">
            </p>
            <p class="left btnbox">
                <button class="adopt" @click="adopt(ind)">通过</button>
                <button class="refuse" @click="refuse(ind)">拒绝</button>
            </p>
        </li>
    </ul>
    
    <audio  preload controls  id="music" style="display: none;"> 
        <source src="../assets/music/6966.mp3" type="audio/mpeg">
    </audio>
    <!-- <router-view/> -->
  </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            titInfo: ["账号","密码","服务器","平台后缀","拒绝理由","控制编号","是否通过"],
            // url : 'http://132.232.44.112:8080/app/',
            url: "",
            info: [],
            remarks: [],
            service:[],
            employeeName:[],
            timer: '',
            // 倒计时
            timers:'',
            num: 19,
            controlNumber:[],
            traderFollowedWord:[]
        }
    },
    
    created(){
        this.url = localStorage.getItem("url")
    },
    mounted(){
        
        // 页面刷新
        this.timer = setInterval(this.request,20000);

        // 显示20s倒计时
        this.timers = setInterval(this.countdown,1000)

        // 保证操作人是通过登录进入的
        if(sessionStorage.employeeName){         
            this.request();  
        }else{
            this.$layer.msg("请先登录")
        }  
        
    },
    methods:{

        //点击通过
         adopt(ind){
          
            this.$indicator.open({
                text: '正在提交...',
                spinnerType: 'fading-circle'
            });
            var that = this;
            var params = new URLSearchParams();
            params.append('accountsid', this.info[ind].accountSid);
            params.append('audit', 0);
            params.append('remark', this.remarks[ind]);
            params.append('service',this.service[ind]);
            params.append('controlNumber',this.controlNumber[ind]);
            if(!this.traderFollowedWord[ind]){
                this.traderFollowedWord[ind] = ""
            }
            params.append('traderFollowedWord',this.traderFollowedWord[ind]);
            params.append('employeeName',sessionStorage.employeeName);
            params.append('employeeId', sessionStorage.employeeId);        
            this.$http.post(this.url+'wx/member/accountAudit', params).then(function (res) {

                that.$indicator.close();
                // 判断控制编号是否为整数
                // if( typeof that.controlNumber === "number"){
                    
                    that.info = [];
                    that.remarks = [];
                    that.service = [];
                    that.controlNumber = [];
                    that.traderFollowedWord = [];
                    // that.request();
                　　console.log(res)
                // }else{
                //     that.$layer.msg("控制编号必须填整数");
                // }
                that.request();

            }).catch(function (err) {                    
            });
        
        },

      //点击拒绝
        refuse(ind){ 
            this.$indicator.open({
                text: '正在提交...',
                spinnerType: 'fading-circle'
            });
            var that = this;
            var params = new URLSearchParams();
            params.append('accountsid', this.info[ind].accountSid);
            params.append('audit', 2);
            params.append('remark', this.remarks[ind]);
            params.append('service', this.service[ind]);
            if(!this.controlNumber[ind]){
                this.controlNumber[ind] = ""
            }
            params.append('controlNumber',this.controlNumber[ind]);
            if(!this.traderFollowedWord[ind]){
                this.traderFollowedWord[ind] = ""
            }
            params.append('traderFollowedWord',this.traderFollowedWord[ind]);
            params.append('employeeName',sessionStorage.employeeName);
            params.append('employeeId', sessionStorage.employeeId);
            this.$http.post(this.url+'wx/member/accountAudit', params).then(function (res) {
                that.$indicator.close();
                // 判断控制编号是否为整数  && (parseInt(that.controlNumber) == that.controlNumber) 
                // if( typeof that.controlNumber === "number"){
                    
                    that.info = [];
                    that.remarks = [];
                    that.service = [];
                    that.controlNumber = [];
                    that.traderFollowedWord = [];
                    // that.request();  
                // }else{
                //     that.$layer.msg("控制编号必须填整数");
                // }
                that.request();

            }).catch(function (err) {
            　　console.log(err)
            }); 
        },
        
      //请求数据，获取待绑定账号信息，并显示到页面中
        request(){
            this.$http.get(this.url+'wx/member/accountList',{  
                 
            }).then((res) => { 
                console.log(res)
                var len = res.data.data.length; 
                this.$nextTick(()=> {
                        if ( len ) {
                            document.getElementById('music').play(); 
                        }   
                })
                this.info = res.data.data;                
                // console.log(this.info) 
                this.service = []
                this.controlNumber = []
                this.remarks = []
                this.traderFollowedWord = []
                // console.log(this.service)
                for (let i = 0; i < len; i ++){

                    this.remarks.push("") 
                    this.service.push(res.data.data[i].userTradeSvr)                     
                    this.traderFollowedWord.push(res.data.data[i].traderFollowedWord)
                    this.controlNumber.push(res.data.data[i].controlNumber)
                }
                // console.log(this.service)
        }).catch((err)=>{
                    console.log(err)
            })
        },
        //退出登录
        exit(){
            console.log(sessionStorage)
            sessionStorage.setItem("employeeId","");
            sessionStorage.setItem("employeeName","");
            this.timer = clearInterval(this.request);
        },
        // 倒计时
        countdown(){
            this.num--
            if(this.num < 0 ){
                this.num = 19
            }else if(this.num < 10){
                this.num = "0" + this.num
            }
           
        }
  }
}
</script>
<style>
   .countdown{
       width: 300px;
       position: fixed;
       top: 30px;
       left: 0;
       z-index: 100;
       font-size: 20px;
   } 
</style>



