<template>
  <div class="body_login">
    <!-- <img src="../assets/logo.png"/> -->
    <div class="center">
      <img src="../assets/Coat_of_arms_of_Vietnam2.png" />
      <p class="title1">HỆ THỐNG XÁC THỰC TẬP TRUNG</p>

      <p class="title2">BỘ GIAO THÔNG VẬN TẢI</p>
      <br />
      <!-- <img src="../assets/Coat_of_arms_of_Vietnam2.png"/> -->
      <div class="box_login">
        <h2
          style="
            font-family: 'Roboto';
            font-weight: 900;
            font-size: 22px;
            margin: 10px 0;
          "
        >
          ĐĂNG NHẬP
        </h2>
        <hr
          style="
            width: 90%;
            border: none;
            border-top: solid 3px #bab7b5;
            margin: auto;
            margin-bottom: 40px;
          "
        />
        <form @submit.prevent="login">
          <div style="text-align: left">
            <label style="margin: 0 5%"> Tên đăng nhập </label>
            <div class="box_input">
              <Icon
                icon="icon-park-outline:user"
                color="white"
                style="margin: 3px 8px 0 8px"
              />
              <input
                type="text"
                class="input"
                placeholder="Nhập tên đăng nhập "
                v-model="name"
              />
            </div>
            <br />
            <label style="margin: 0 5%"> Mật khẩu </label>

            <div class="box_input">
              <Icon
                icon="ph:lock"
                color="white"
                style="margin: 3px 8px 0 8px"
              />
              <input
                type="password"
                class="input"
                placeholder="Nhập tên mật khẩu "
                v-model="password"
              />
            </div>
          </div>

          <v-btn color="primary" class="ml-0 mr-0 mt-10 mb-5" type="submit">
            Đăng nhập <span class="mdi mdi-account"></span>
          </v-btn>
        </form>
      </div>
    </div>
  </div>
  <Fooder />
</template>

<script>
import { Icon } from "@iconify/vue";
import Fooder from "./Fooder";
import { ref } from "vue";
// import axios from 'axios';
import {  login_khoSoHoa } from "../api/api.js";

import { useRouter } from "vue-router";
// import { menu_pina } from "@/pinia/Store";

export default {
  name: "HeaDers",
  components: {
    Icon,
    Fooder,
  },
  setup() {
    const router = useRouter();
    const name = ref(""); //duantv@fds.vn
    const password = ref(""); //Abcd@1234
    // const pina_menu = menu_pina();
    function login() {
      try {

        login_khoSoHoa({username:name.value, password:password.value})
          .then(() => {
            // Lưu token vào localStorage hoặc Vuex store
            // console.log('ay :',response.data.access_token)
            // pina_menu.actions_loadmenu().then(() => {
            //   /// không thêm () thì nó vẫn sảy ra bất đồng bộ đây là cấu trúc của then
            //   router.replace("/quan-li-can-bo");
            //   // console.log(pina_menu.menu)
            // });

            router.replace("/danhsachthutuc")
          });

        // console.log(data_login)
        // localStorage.setItem('user_name', name.value)

        // console.log(localStorage.getItem('user_name'))

        // chuyển hướng sang trang khác (ví dụ: dashboard)

        // chuyển hướng đến trang /home
        // router.push('/home')
        // lưu token vào localStorage
        //   localStorage.token = response.data.token;
        // console.log(response)
        // chuyển hướng sang trang khác (ví dụ: dashboard)
        // this.$router.replace("/");
      } catch (error) {
        console.log("lỗi", error);
        // console.log('error',error);
      }
    }

    return {
      login,
      name,
      password,
      router,
    };
  },
};
</script>

<style lang="css" scoped>
.body_login {
  background-image: url("../assets/image5.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 94.5vh;
  background-size: 100% 100%;
  padding: 50px 0 0 0;
}
.center {
  margin: auto;

  /* border: solid 1px black; */
  /* width: 33.5%; */
  text-align: center;
  color: white;
  font-family: Roboto Slab;
  font-style: bold;
  width: max-content;
}

.title1 {
  font-size: 30px;
  /* widows: max-contents; */
  font-weight: bold;
}

.title2 {
  font-size: 22px;
  font-weight: bold;
}

.box_login {
  border: solid 3px #bab7b5;
  width: 90%;
  margin: auto;
  border-radius: 20px;
  /* display: flex; */
}
.box_input {
  border: solid 1px white;
  width: 90%;
  margin: auto;
  border-radius: 6px;
  /* text-align: left; */
}
.input {
  outline: none;
  color: white;
}
input:-webkit-autofill {
  /* background-color: transparent; */
  -webkit-text-fill-color: white;
  /* -webkit-box-shadow: inset 0 0 0 1000px transparent !important; */
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
/* input:-webkit-autofill { background-color: transparent; -webkit-text-fill-color: white; -webkit-transition-delay: 9999s; -webkit-transition: color 9999s ease-out, background-color 9999s ease-out; } */
.input::placeholder {
  color: #ffffff;
  opacity: 0.5;
  font-family: Roboto;
}
</style>