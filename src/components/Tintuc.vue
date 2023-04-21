<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="#0468B1">
      <v-sheet
        color="#0468B1"
        class="pa-4"
        style="display: flex; text-align: center; align-items: center"
      >
        <!-- <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          ></v-avatar> -->

        <v-icon color="white" style="opacity: 1; margin-right: 10px" size="40">
          mdi-account-circle-outline
        </v-icon>

        <div style="color: white">người dùng</div>
        <!-- <v-icon
          start
          icon="mdi-arrow-left"
          ></v-icon>
            <v-icon>mdi-file-document-plus-outline</v-icon>
            <span class="mdi mdi-account"></span> -->
      </v-sheet>

      <hr />

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <template v-slot:prepend>
            <v-icon color="white" style="opacity: 1">{{ icon }}</v-icon>
          </template>

          <v-list-item-title style="color: white; opacity: 0.7">{{
            text
          }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <div
        style="
          position: absolute;
          bottom: 10px;
          color: white;
          width: 100%;
          cursor: pointer;
        "
        @click="logout()"
      >
        <hr />
        <br />
        <v-icon class="ml-5"> mdi-power </v-icon>
        đăng xuất
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-card>
        <v-card-text
          style="
            display: flex;
            align-items: center;
            font-size: 30px;
            text-transform: uppercase;
            font-family: system-ui;
          "
        >
          <img
            src="../assets/Coat_of_arms_of_Vietnam2.png"
            style="width: 3.4%; margin-right: 10px"
          />
          quản lý chuyên mục tin tức
        </v-card-text>
      </v-card>

      <v-container class="py-2 px-6" fluid>
        <div style="display: flex">
          <div class="title">CHI TIẾT BÁO CÁO</div>
          <div class="triangle-up"></div>
        </div>
        <hr style="border: solid blue 1px" />

        <v-card flat>
          Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biến đổi
          khí hậu được xây dựng và ban hành
        </v-card>

        <v-row align="center" justify="space-between">
          <v-col class="color">
            <b style="color: black"> Kỳ báo cáo: </b>
            Quý 1 năm 2022
          </v-col>
          <v-col class="color">
            <b style="color: black"> Mã báo cáo: </b>
            BC-2200001
          </v-col>
          <v-col class="color">
            <b style="color: black"> Mã báo cáo: </b>
            BC-2200001
          </v-col>
          <v-col class="color">
            <b style="color: black"> Tình trạng </b>
            Đang sử lý
          </v-col>
        </v-row>
        <v-card flat class="pt-1 pr-1 pb-1 pl1 mt-4 mb-4">
          <!-- <v-btn  >
            
            Thêm thành phần
          </v-btn> -->
          <dialog_themttVue @themtt="reload_them" />
        </v-card>

        <div style="display: flex">
          <div class="title">Danh sách tin tức</div>
          <div class="triangle-up"></div>
        </div>
        <hr style="border: solid blue 1px" />

        <!-- <v-card>
          Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biến đổi khí hậu được xây dựng và ban hành
        </v-card> -->

        <!-- ///////////////////// main -->

        <v-main class="pa-0">
          <v-container class="scrollable ma-0 pa-2">
            <!-- your content here -->
            <table
              width="100%"
              border="1"
              cellspacing="0"
              style="border-collapse: collapse; border: solid 1px #e5e5e5"
            >
              <tr>
                <th>STT</th>
                <th>Mã chuyên mục</th>
                <th>Tên chuyên mục</th>

                <th>Tên nhóm quyền</th>
                <th>Tình trạng</th>
                <th>Thao tac</th>
              </tr>
              <tr
                v-for="(item, i) in data"
                :key="i"
                v-show="
                  i + 1 >=
                    (page_number == 1 ? page_number : page_number * 8 - 8) &&
                  i + 1 < (page_number == 1 ? 8 : page_number * 8 + 2)
                "
              >
                <td>{{ i + 1 }}</td>
                <td>{{ item.MaChuyenMuc }}</td>
                <td>{{ item.TenChuyenMuc }}</td>
                <td>
                  {{
                    item.ListQuyenChuyenMuc?.map(
                      (obj) => obj.TenNhomQuyen
                    ).join(", ")
                  }}
                  {{
                    item.PhanQuyenChuyenMuc?.map(
                      (obj) => obj.TenNhomQuyen
                    ).join(",")
                  }}
                </td>
                <td>{{ item.TinhTrang }}</td>
                <td style="text-align: center">
                  <dialog_capnhatt
                    v-bind:dataprop="item"
                    @reload_get_tt="reload_get"
                  />
                  <v-icon color="red" style="cursor: pointer" size="{1}"
                    >mdi-trash-can-outline</v-icon
                  >
                </td>
              </tr>
            </table>
          </v-container>
        </v-main>

        <div class="d-flex justify-space-between mb-6 pa-2">
          <div>Tổng số: {{ data.length }}</div>
          <v-pagination
            v-model="page_number"
            :total-visible="1"
            :length="Math.ceil(data.length / 8)"
          >
          </v-pagination>
          <select class="select_page pl-2 pr-2" v-model="page_number">
            <option v-for="i in Math.ceil(data.length / 8)" :key="i" :value="i">
              Trang {{ i }}
            </option>
          </select>
          <!-- {{ data.length +'|'+ (((data.length / 8) - Math.floor(data.length / 8)) > 0 ? (Math.floor(data.length / 8) + 1) : Math.floor(data.length / 8)) }} -->
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
// import { api_profile } from '@/api/api';

import { ref } from "vue";
import { useRouter } from "vue-router";
import { api_tintuc } from "@/api/api";

import dialog_themttVue from "./component/dialog_themtt.vue";
import dialog_capnhatt from "./component/dialog_capnhatt.vue";
import { taocock } from "@/api/cookie";

export default {
  name: "TinTuc",
  // data: () => ({
  //     cards: ['Today', 'Yesterday'],
  //     drawer: null,
  //     links: [
  //     ['mdi-note-plus-outline', 'Tạo báo cáo'],
  //     ['mdi-send', 'Báo cáo chờ sử lý'],
  //     ['mdi-delete', 'Báo cáo chờ duyệt'],
  //     ['mdi-alert-octagon', 'Tổng hợp báo cáo'],
  //     ['mdi-alert-octagon', 'Kỳ báo cáo'],

  //     ],
  // }),
  components: {
    dialog_themttVue,
    dialog_capnhatt,
  },
  setup() {
    const cards = ["Today", "Yesterday"];
    const router = useRouter();

    const logout = () => {
      // localStorage.removeItem('token')
      taocock("login_token", "", "0");
      router.replace("/");
    };
    var drawer = "";

    const links = [
      ["mdi-note-plus-outline", "Quản lý chuyên mục tin tức"],
      // ['mdi-autorenew', 'Báo cáo chờ sử lý'],
      // ['mdi-clipboard-text-clock-outline', 'Báo cáo chờ duyệt'],
      // ['mdi-file-chart-outline', 'Tổng hợp báo cáo'],
      // ['mdi-chart-areaspline', 'Kỳ báo cáo'],
    ];

    const data = ref([]);
    const page_number = ref(1);
    api_tintuc
      .get(
        "/filter?page=0&size=20&keyword=&orderFields=&orderTypes=&tinhTrang=&thamChieu_maMuc=&NgayTaoFrom=0&NgayTaoTo=0"
      )
      .then((datas) => {
        // console.log("reload:",datas.data.content)
        data.value = datas.data.content;
        console.log("data _", data.value);
        // console.log(data.value, ((data.value.length / 8) - Math.floor(data.value.length / 8)) > 0 ? (Math.floor(data.value.length / 8) + 1) : Math.floor(data.value.length / 8))
      });

    const reload_get = (item) => {
      console.log("dataa: ", item);
      data.value = data.value.reduce((res, cur) => {
        console.log("ss", item.PhanQuyenChuyenMuc);
        if (cur.PrimKey === item.idItem) return [...res, { ...cur, ...item }];
        else return [...res, cur];
      }, []);

      console.log("result: ", data.value);
    };
    const reload_them = (item) => {
      // alert('ay')
      // console.log(item)
      data.value.push(item);
      console.log(data.value);

      // alert(data.value.length)
    };
    return {
      cards,
      drawer,
      links,
      data,
      page_number,
      dialog_themttVue,
      dialog_capnhatt,
      reload_get,
      logout,
      reload_them,
    };
  },
};
</script>
<style>
.triangle-up {
  width: 0px;
  height: 0px;
  /* background-color: black; */
  /* border-left: 50px solid transparent; */
  border-right: 20px solid transparent;
  border-bottom: 40px solid blue;
}

.title {
  /* display:  flex; */
  width: initial;
  background-color: blue;
  padding: 8px;
  color: white;
}

.color {
  color: #0468b1;
}

.scrollable {
  max-height: 45vh;
  /* vh là lấy chiều cao theo chiều cao của sửa sổ xem vh = % */
  overflow-y: auto;
}

th {
  background-color: #e3f1fb;
}

td {
  padding: 10px 10px;
}

.select_page {
  border: solid 1px blue;
  border-radius: 5px;
}
</style>