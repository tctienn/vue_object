<template>
    <!-- <div v-for="value in todos" v-bind:key = "value" >{{ value.check }}</div> -->
      <Todo v-for="value in todos" v-bind:key = "value" v-bind:dataprop="value"  v-on:emitt="f_emit"  />
      <div>uii{{ store.count }}</div>
</template>

<script>
import Todo from './Todo'
import { ref } from 'vue'
import { useCounterStore } from '@/pinia/Store'

    export default {
        name:'TodoS',
        components:{
            Todo
        },
        setup(){

          const store = useCounterStore()
            var todos = ref([
                {
                id:1,
                title:'s1',
                check:true
                },
                {
                id:2,
                title:'s1',
                check:false
                },
                {
                id:3,
                title:'s1',
                check:false
                }
            ])

      const f_emit = id =>{
        todos.value= todos.value.map(e=> (e.id==id?({...e,check:!e.check}):e))
        // console.log(todos)
        // alert(id)
        return todos
      }

      return {
         todos,
        f_emit,
        store,
      }
    }
        
    }
</script>

<style lang="scss" scoped>

</style>