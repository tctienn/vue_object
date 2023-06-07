<template>
  <a href="#" @click="returnPage()"> trang này không tồn tại </a>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "ErrorPage",
  setup() {
    const router = useRouter();

    const returnPage = () => {
      router.replace("/quan-li-can-bo");
    };

    return {
      returnPage,
    };
  },
};
</script>

<style>
</style>