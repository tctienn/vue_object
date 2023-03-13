<template>
    <div>
      <h2>Đăng nhập</h2>
      <div class="triangle-up"></div>
      <!-- <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/> -->
      <!-- <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/> -->

      <div v-if="loginError" class="error">
        Sai email hoặc mật khẩu.
      </div>
  
      <form @submit.prevent="login">
        <label for="email">Email:</label> {{ email }}
        <input type="email" id="email" required v-model="email">
  
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" required v-model="password">
  
        <button>Đăng nhập</button>
      </form>
  
      <hr>
  
      <h2>Đăng ký</h2>
  
      <div v-if="registerSuccess" class="success">
        Bạn đã đăng ký thành công!
      </div>
  
      <div v-if="registerError" class="error">
        Lỗi khi đăng ký.
      </div>
  
      <form @submit.prevent="register">
        <label for="name">Tên đăng nhập:</label>
        <input type="text" id="name" required v-model="name">
  
        <label for="email">Email:</label>
        <input type="email" id="email1" required v-model="email">
  
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password1" required v-model="password">
  
        <button>Đăng ký</button>
      </form>
      <!-- {{ response }} -->

      
    </div>

    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Open Dialog
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
//   import Login from '../Login.vue'

  export default {
    

    name:'LogIn',
    // components:{
    //     Login,
    // }
    
    data() {
      return {
        email: "",
        password: "",
        name: "",
        loginError: false,
        registerSuccess: false,
        registerError: false,
        dialog:false,
        
        
      };
    },
    // setup(){

    //   var dialog= false;

    //   return {
    //     dialog
    //   }
    // },
    methods: {
      async login() {
        try {
          var response = await axios.post("https://6404dcf7eed195a99f779a5e.mockapi.io/login", {
            email: this.email,
            password: this.password,
          });
  
          // lưu token vào localStorage
        //   localStorage.token = response.data.token;
          console.log(response)
          // chuyển hướng sang trang khác (ví dụ: dashboard)
          this.$router.replace("/");
        
        } catch (error) {
          this.loginError = true;
          console.log('error',error);
        }
      },
  
      async register() {
        try {
          const response = await axios.post("https://6404dcf7eed195a99f779a5e.mockapi.io/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
  
          // hiển thị thông báo đăng ký thành công
          console.log(response)
          this.registerSuccess = true;
        } catch (error) {
          this.registerError = true;
          console.error(error);
        }
      },
    },
  };
  </script>
  <style>
    .triangle-up {
        width: 0;
        height: 0;
        /* border-left: 50px solid transparent; */
        border-right: 50px solid transparent;
        border-bottom: 40px solid blue;
      }
  </style>
  



   <!-- <template>
    <v-app>
      <v-navigation-drawer >
      
        drawer
      </v-navigation-drawer>

      <v-toolbar >
        
        tollbar
      </v-toolbar>

      <v-content>
        <v-container>
          
          conten ?
        </v-container>
      </v-content>

      <v-footer app>
    
      </v-footer>
    </v-app>
  </template>
   
   <script>
   export default {
    name:'LogIn',

   }
   </script>
   
   <style>
   
   </style> -->