<template>
  <div>profile {{ data }}</div>
</template>

<script>
// import { Icon } from '@iconify/vue';
// import Fooder from './Fooder'
// import { ref } from 'vue'
// import axios from 'axios';
import { ref } from "vue";

import { api_profile } from "@/api/api";

export default {
  name: "ProFine",
  setup() {
    const data = ref("");
    // const ayy='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPUV9nMHJ6U2pvWWh1a0ZvUkl6N1VsaXZnT013bGFCMFZYeHVKQTdYVkFRIn0.eyJleHAiOjE2Nzg2NzQ2NjEsImlhdCI6MTY3ODY3MTA2MSwianRpIjoiNzA1Y2IwOWMtYWM5OS00MDAzLWJmZDItNDYxODQ3ODdjM2ExIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5mZHMudm4vYXV0aC9yZWFsbXMvZmxleC1kYXRhLWJndHZ0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImI4NjE0NTFjLTg1ZjgtNGMzOC05YTk0LTA2Yjc0ZTk3YzA0ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1vYmlsZS1zc28iLCJzZXNzaW9uX3N0YXRlIjoiNTY5Y2U0YzktOTc3OS00NTc0LTljOTktMzYyYzhjMjEyNTJhIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJFbXBsb3llZSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWZsZXgtZGF0YS1iZ3R2dCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlRy4bqnbiBWxINuIER14bqpbiIsInByZWZlcnJlZF91c2VybmFtZSI6ImR1YW50diIsImdpdmVuX25hbWUiOiJUcuG6p24iLCJmYW1pbHlfbmFtZSI6IlbEg24gRHXhuqluIiwiZW1haWwiOiJkdWFudHZAZmRzLnZuIn0.mynkjveqnovRv1fZTliduIVN27W42Cn0yDcXKIJmh4sV5dUVLtZPe2EoP4lC4objh5TomKkFAu2FxbttaWHK-oW0oYBjGzlySiYqdWNAvpcEc5KCEE2O_lvpePY8xX7WVHVv4nNhLjDnYadsPVXursTTWyu2hgY1ME2ZWxq98ZCOUx89D1vnzyuL0bamU1tH9qUI2pCGa4XwdyO3ZbtruPBHQCzQvgCTi2wUMcSJzfkNm7EOomebRneIt5XwWMv0LLZbZThVVRp00dAUQbWjiUImWIMbZoY4KcskvE8nPWgtal-AeQDfUJol9bAAZAd9UUE6ObHvsP3LKNMHyfniHA'
    api_profile
      .get(
        ""
        // ,{data:null}

        // {

        //     headers: {
        //         Authorization:
        //         `Bearer ${ayy}` ,
        //         'Accept': 'application/json', // báo cho máy chủ muốn nhận dữ liệu response dạng json
        //         'Content-Type': 'application/json' // báo cho máy chủ jonbiết dữ liệu được mã hóa theo kiểu
        //     },
        //     data:null

        // }
      )
      .then((response) => {
        // Lưu token vào localStorage hoặc Vuex store
        // console.log('ay :',response)
        data.value = response.data.hoVaTen;
        // localStorage.setItem('token', response.data.access_token)
      });

    return {
      data,
    };
  },
};
</script>

<style>
</style>