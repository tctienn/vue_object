<template>
  <!-- <input ref="myInput" /> -->
  <div ref="myInput" class="ay">ay</div>
  <button @click="logRef">Get Ref</button>

  <hr />
  <demo_refsVue ref="ref_" />
  <button @click="click_ref()">button refs</button>
  <br />
  <input type="text" placeholder="watch" v-model="message" />
  {{ message }}

  {{ computed_ }}
</template>

<script>
import { ref, watch, computed } from "vue";

import demo_refsVue from "./demo_refs.vue";
import { taocock } from "../../api/cookie.js";

export default {
  name: "ComPuted",
  components: {
    demo_refsVue,
  },
  setup() {
    const myInput = ref(null);
    const ref_ = ref(null);
    const logRef = () => {
      //  console.log(myInput.value.classList); // lấy class
      console.log(myInput.value.offsetWidth);
      myInput.value.innerHTML = " thayyyyyyyy";
      //  document.cookie = "token=Nguyen Van Hieus; max-age=31536000; path=/";
      taocock("demotoken ", "ayyyyy", "36000");
    };

    const click_ref = () => {
      console.log(ref_.value.funtion_ay());
      // refs lấy thông tin thẻ giống với document.getElementById , cũng có thể truy cập toàn bộ hàm hoặc các thuộc tính của component refs
    };
    const message = ref("1 s");
    ///watch
    watch(message, (ay, ayy) => {
      console.log(ay, ayy);
    });
    const computed_ = computed(() => {
      alert("ay");

      /// effectwatch chạy lần đầu khi load trang
      /// computed có thể return
      /// watch có thể kiểm soát được biến phản ứng nào cần được theo dõi
      return message.value.split(" ").reverse().join(" ");
    });
    return {
      logRef,
      myInput,
      ref_,
      click_ref,
      message,
      computed_,
    };
  },
};
</script>

<style>
</style>