<template>
  <v-navigation-drawer v-model="drawer" color="#0468B1" class="hidden_Scroll">
    <v-sheet
      color="#0468B1"
      class="pa-4"
      style="
        display: flex;
        text-align: center;
        align-items: center;
        position: absolute;
        background-color: #0468b1;
        width: 100%;
        z-index: 1;
      "
    >
      <v-icon color="white" style="opacity: 1; margin-right: 10px" size="40">
        mdi-account-circle-outline
      </v-icon>

      <div style="color: white">Quản trị</div>

      <!-- <v-icon
          start
          icon="mdi-arrow-left"
          ></v-icon>
            <v-icon>mdi-file-document-plus-outline</v-icon>
            <span class="mdi mdi-account"></span> -->
    </v-sheet>

    <v-list>
      <!-- ///// tạo một item đầu để thừa ra phần login -->
      <v-list-item v-for="item in 1" :key="item" link>
        <template v-slot:prepend>
          <!-- <v-icon color="white" style="opacity:1">{{ item }}</v-icon> -->
        </template>

        <v-list-item-title
          style="color: white; opacity: 0.7"
        ></v-list-item-title>
      </v-list-item>
      <!-- ////// -->

      <br />
      <hr />
      <v-list-item
        v-for="(item, i) in links"
        :key="item.TenMenu"
        link
        v-show="item.LoaiMenu == '0'"
        :active="i <= 1 ? true : false"
      >
        <template v-slot:prepend>
          <v-icon color="white" style="opacity: 1">{{
            geticon(item.DuongDan)
          }}</v-icon>
          <!-- <div  v-html="geticon(item.DuongDan)" ></div>
              <div >{{ geticon(item.DuongDan) }}</div> -->
        </template>

        <v-list-item-title style="color: white; opacity: 0.7">{{
          item.TenMenu
        }}</v-list-item-title>
      </v-list-item>
      <!-- ///// tạo một item cuối để thừa ra phần login -->
      <v-list-item v-for="item in 1" :key="item" link>
        <template v-slot:prepend>
          <!-- <v-icon color="white" style="opacity:1">{{ item }}</v-icon> -->
        </template>

        <v-list-item-title
          style="color: white; opacity: 0.7"
        ></v-list-item-title>
      </v-list-item>
      <!-- ////// -->
    </v-list>

    <div
      style="
        position: absolute;
        bottom: 0px;
        color: white;
        width: 100%;
        background-color: #0468b1;
      "
    >
      <hr />
      <br />
      <v-icon class="ml-5"> mdi-power </v-icon>
      đăng xuất
      <!-- <Icon icon="mdi:map-marker-distance" /> -->
    </div>
  </v-navigation-drawer>
</template>

<script>
import { menu_pina } from "@/pinia/Store";
import { ref } from "vue";
import { geticon } from "@/api/icon";
// import { ref } from 'vue';

export default {
  name: "MEnu",
  setup() {
    const cards = ["Today", "Yesterday"];
    var drawer = "";
    // const links = [
    //   ['mdi-note-plus-outline', 'Tạo báo cáo'],
    //   ['mdi-autorenew', 'Báo cáo chờ sử lý'],
    //   ['mdi-clipboard-text-clock-outline', 'Báo cáo chờ duyệt'],
    //   ['mdi-file-chart-outline', 'Tổng hợp báo cáo'],
    //   ['mdi-chart-areaspline', 'Kỳ báo cáo'],

    // ]
    const links = ref([]);

    //// pinia menu
    const pina_menu = menu_pina();

    pina_menu.actions_loadmenu().then(() => {
      links.value = pina_menu.menu.sort((a, b) => a.SoThuTu - b.SoThuTu);
    });

    return {
      cards,
      drawer,
      links,
      geticon,
    };
  },
};
</script>
    
<style>
.hidden_Scroll .v-navigation-drawer__content {
  /* overflow: hidden; */
  /* opacity: 0.4; */
  /* overflow-y: hidden; */
  /* overflow-y: scroll; */
}

/* ẩn thanh scroll */
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}
</style>