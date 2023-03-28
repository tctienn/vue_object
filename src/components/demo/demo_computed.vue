<template>
     <!-- <input ref="myInput" /> -->
     <div ref="myInput" class="ay"> ay</div>
     <button @click="logRef">Get Ref</button>

     <hr/>
     <demo_refsVue ref="ref_"/>
    <button @click="click_ref()">
        button refs
    </button>

</template>

<script>
import { ref } from 'vue';

import demo_refsVue from './demo_refs.vue';
import {taocock} from'../../api/cookie.js'

export default {
    name:'ComPuted',
    components:{
        demo_refsVue,

    },
    setup(){
        const myInput = ref(null)
        const ref_ = ref(null)
        const logRef = () => {
                //  console.log(myInput.value.classList); // lấy class
                 console.log(myInput.value.offsetWidth);
                //  document.cookie = "token=Nguyen Van Hieus; max-age=31536000; path=/";
                taocock('demotoken ','ayyyyy')
             }
             
        const click_ref = () =>{
            console.log(ref_.value.funtion_ay())
            // refs lấy thông tin thẻ giống với document.getElementById , cũng có thể truy cập toàn bộ hàm hoặc các thuộc tính của component refs


        }
        return {
            logRef,
            myInput,
            ref_,
            click_ref,
            


        }
    }
}
</script>

<style>

</style>