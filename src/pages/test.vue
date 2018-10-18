<template>
    <div id="App">
        <p>测试</p>
        <pageing></pageing>
    </div>
</template>
<script>
import Pageing from "../components/Pageing"
new Vue( {
    el:"#App",
    data(){
        
    },
    components:{
        Pageing
    }
})
</script>
