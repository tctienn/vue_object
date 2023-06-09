<template>
  <v-alert
        :type="pinia_status_load.alert_tatus.type"
        :title="pinia_status_load.alert_tatus.title"
        :text="pinia_status_load.alert_tatus.text"
        style="position: fixed; z-index: 1"
        v-model="pinia_status_load.alert_tatus.check">
    </v-alert>
  <v-app id="inspire">
    <Menu />


    <v-main>
      <v-card class="background_header pl-2 pt-1 pb-1" id="as">
        <v-card-text
          class="pa-1"
          style="
            display: flex;
            align-items: center;
            font-size: 18px;
            text-transform: uppercase;
            font-family: system-ui; 
          "
        >
          <img
            src="../assets/logo.jpg"
            style="width: 3.4%; margin-right: 10px"
          />
          HỆ THỐNG HỖ TRỢ SINH VIÊN - ĐẠI HỌC QUỐC GIA HÀ NỘI 
        </v-card-text>
      </v-card>

      <v-container class="py-2 px-6" fluid>
        

       

        


        <div style="display: flex">
          <h4 >QUẢN LÝ CHUYÊN MỤC TIN TỨC</h4>
          
        </div>
        
        <hr style="border: solid blue 1px ;margin-top: 10px;" />

        <v-card flat class="pt-1 pr-1 pb-1 pl1 mt-4 mb-4">
          <dialog_themttVue  />
        </v-card>

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
                <th style="padding: 10px; width: ;">STT</th>
                <th style="padding: 10px; width: ;" >Mã chuyên mục</th>
                <th style="padding: 10px; width: ;" >Tên chuyên mục</th>

                <th style="padding: 10px; width: ;" >Tên nhóm quyền</th>
                <th style="padding: 10px; width: ;" >Tình trạng</th>
                <th style="padding: 10px; width: ;" >Thao tac</th>
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
                <td>{{ !(item.TinhTrang ==2) ? 'Không hoạt động' : 'hoạt động' }}</td>
                <td style="text-align: center">
                  <dialog_capnhatt v-bind:dataprop="item"/>
                  
                  
                  <!-- /////////////// -->
                  <v-dialog v-model="dialog" class="ui" >
                      <template v-slot:activator="{ props }">
                        
                        <v-icon v-bind="props" color="red" style="cursor: pointer" size="{1}">
                          mdi-trash-can-outline
                        </v-icon>
                      </template>
                      <v-card width="20%" style="margin: auto;" >
                        <v-card-title class="text-h5">
                          Xóa loại chuyên mục tin tức
                        </v-card-title>
                        <v-card-text style="font-size: 20px;">
                          Bạn có chắc chắn muốn xóa chuyên mục tin tức này
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                            không
                          </v-btn>
                          <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                            có
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>


                  <!-- ///////////// -->


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
import {  get_Tintuc } from "@/api/api";

import dialog_themttVue from "./component/dialog_themtt.vue";
import dialog_capnhatt from "./component/dialog_capnhatt.vue";
import { taocock } from "@/api/cookie";

import Menu from "./component/Menu.vue";
import { status_load } from "@/pinia/Store";

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
    Menu
  },
  setup() {

    const dialog = ref(false)

    const cards = ["Today", "Yesterday"];
    const router = useRouter();

    const logout = () => {
      // localStorage.removeItem('token')
      taocock("login_token", "", "0");
      router.replace("/");
    };
    var drawer = "";

    const pinia_status_load = status_load();

    const links = [
      ["mdi-note-plus-outline", "Quản lý chuyên mục tin tức"],
      // ['mdi-autorenew', 'Báo cáo chờ sử lý'],
      // ['mdi-clipboard-text-clock-outline', 'Báo cáo chờ duyệt'],
      // ['mdi-file-chart-outline', 'Tổng hợp báo cáo'],
      // ['mdi-chart-areaspline', 'Kỳ báo cáo'],
    ];

    const data = ref([]);
    const page_number = ref(1);

    

    const load_Data =(page)=>{
      get_Tintuc(page)
      .then((datas) => {
        data.value = datas.data.content;
       
      });
    }
    load_Data(page_number.value-1);

    const reload_get = (item) => {
      // console.log("dataa: ", item);
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
      pinia_status_load,
      dialog
    };
  },
};
</script>
<style scoped>
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
  /* background-color: blue; */
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

<style>
  .ui>.v-overlay__scrim{
    opacity: 0.1 !important;
  }

  .ui>.v-overlay__content>.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated{
    box-shadow: none !important;
  }
</style>