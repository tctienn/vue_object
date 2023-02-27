<template>
    <p :class="[dataprop.check==true?'line':'']">
        <input type="checkbox" v-on:change="check_input"/>
        {{ dataprop }}
        <button class="button_delete"  v-on:click="fun">
            delete 
            {{ as }}
            
        </button>
        <button v-on:click="store.increment">
            ay
        </button>
    </p>
</template>

<script>
import { useCounterStore } from '@/pinia/Store'

    export default {
        name: "TodoS",
        
        
        props:['dataprop'],
        setup(props,contex){
            
            const store = useCounterStore()
            const check_input =()=>{
            // console.log(props.dataprop.id)
            contex.emit('emitt',props.dataprop.id)
            }
            
            const uis=0
            const as=0

            
            const fun= function(){
                this.as++
                console.log(this.as)
                // alert('')
                // return this.as
            }

        
           
            return{
                check_input,
                uis,
                fun,
                as,
                store
                
            }
        },


        
    }

</script>

<style lang="css" scoped>
    .button_delete{
        float: right;
    }

    .line{
        text-decoration: line-through;
    }
</style>