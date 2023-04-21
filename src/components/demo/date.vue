<!-- <template>
    <div>
      <v-layout row wrap>
        <v-flex xs12 sm3>
          <v-checkbox v-model="landscape" hide-details label="Landscape"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm3>
          <v-checkbox v-model="reactive" hide-details label="Reactive"></v-checkbox>
        </v-flex>
      </v-layout>
  
      <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
    </div>
  </template>
  
<script>
export default {
    name:"DaTe",
     data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false
      }
    }
}
</script>

<style>

</style> -->

<template>
    <!-- <v-date-picker v-model="date" /> -->
    <!-- <datepicker v-model="selected" :locale="locale" :upperLimit="to" :lowerLimit="from" :clearable="true" /> -->

    <Datepicker v-model="picked" />
    <p>Selected date: {{ picked }}</p>
  
</template>
  
  <script>
  // import { ref } from 'vue'
  // import { VDatePicker } from 'vuetify'
  import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'

  export default {
    name:"DaTe",
    components: {
    // VDatePicker,
    Datepicker,
  },
    setup() {
      // const date = ref(null)
      const picked = ref(new Date())
      console.log(picked);
      return { 
        picked,
       }
    },
  }
  </script>