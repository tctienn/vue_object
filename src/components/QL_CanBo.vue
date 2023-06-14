<template>
  <v-app id="inspire">
    <!-- <v-system-bar>
          <v-spacer></v-spacer>
    
          <v-icon>mdi-file-document-plus-outline</v-icon>
          <v-icon>mdi-circle</v-icon>
    
          <v-icon>mdi-triangle</v-icon>
        </v-system-bar> -->

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
      <!-- // error -->

      <v-container class="py-2 px-6" fluid>
        <h2 style="color: #2161b1">QUẢN LÝ CÁN BỘ</h2>
        <hr style="border: solid #2161b1 1px" />

        <v-card
          flat
          class="pt-1 pr-1 pb-1 pl1 mt-4 mb-4"
          style="display: flex; justify-content: space-between; display: flex"
        >
          <form style="width: 30%" @submit.prevent="search_name">
            <v-text-field
              placeholder="Nhập từ khóa tìm kiếm"
              append-inner-icon="mdi-magnify"
              variant="solo"
              density="compact"
              v-model="value_search"
            ></v-text-field>
          </form>
          <div style="width: 30%">
            <v-select
              clearable
              label="Cơ quan đơn vị"
              v-model="select_coQuanDonVi"
              :items="coQuanDonVi"
              item-title="tenGoi"
              item-value="maHanhChinh"
              return-object
              variant="solo"
              density="compact"
              chips
            ></v-select>
          </div>

          <div style="width: 24%; justify-content: space-around; display: flex">
            <dialog_phanQuyen
              :data_prop2="data"
              :check_select="arr_check"
              v-on:phanquyen="reload"
              v-on:show_err="console.log('ay')"
            />
            <dialog_themcanbo
              :data_props="coQuanDonVi"
              v-on:themcanbo="reload"
              v-on:show_err="err_show"
            />
          </div>
        </v-card>

        <!-- ///////////////////// main -->

        <v-main class="pa-0">
          <v-container class="ma-0 pa-2">
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
                    <th>
                      <input type="checkbox" @click="check_all" />
                    </th>
                    <th>STT</th>
                    <th>Mã cán bộ</th>
                    <th>Họ tên</th>

                    <th>Cơ quan, đơn vị</th>
                    <th>Tên nhóm quyền</th>
                    <th>Thao tac</th>
                  </tr>
                  <tr v-if="check_loading">
                    <td colspan="7">
                      <v-card
                        :loading="check_loading"
                        style="width: 100%; height: 1px"
                      ></v-card>
                    </td>
                  </tr>
                  <tr v-for="(item, i) in data" :key="i">
                    <td>
                      <input
                        type="checkbox"
                        @change="oncheck(i, item)"
                        v-if="item.EmailVNU != 'suadminTest@gmail.com'"
                        :checked="arr_check.includes(item) ? true : false"
                      />
                    </td>
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.MaSoCanBo }}</td>
                    <td>
                      {{ item.HoVaTen }} <br />
                      <v-icon class="text-disabled" size="20px"
                        >mdi-email-fast-outline</v-icon
                      >
                      {{ item.EmailVNU }} <br />
                      <div style="color: red">
                        {{
                          item.TrangThaiTaiKhoan == 3 ? "Tài khoản bị khóa" : ""
                        }}
                      </div>
                    </td>
                    <td>{{ item.CoQuanDonVi.TenGoi }}</td>
                    <!-- <td>{{ item.MaSoCanBo }}</td> -->

                    <td>
                      {{
                        item.ListQuyenCanBo?.map(
                          (obj) => obj.TenNhomQuyen
                        ).join(", ")
                      }}
                    </td>
                    <!-- <td>{{ item.TinhTrang }}</td> -->
                    <td style="text-align: center">
                      <dialog_updatecanbo
                        :data_props="coQuanDonVi"
                        :itemCheck="item"
                        v-on:updatecanbo="reload"
                      />
                    </td>
                  </tr>
                </table>
              </v-container>
            </v-main>
            <div class="d-flex justify-space-between mb-6 pa-2">
              <div>Tổng số: {{ page.count_item }}</div>
              <v-pagination
                v-model="page_number"
                :total-visible="1"
                :length="page.page_size"
              >
              </v-pagination>
              <select class="select_page pl-2 pr-2" v-model="page_number">
                <option v-for="i in page.page_size" :key="i" :value="i">
                  Trang {{ i }}
                </option>
              </select>
              <!-- {{ data.length +'|'+ (((data.length / 8) - Math.floor(data.length / 8)) > 0 ? (Math.floor(data.length / 8) + 1) : Math.floor(data.length / 8)) }} -->
            </div>
          </v-container>
        </v-main>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
import { ref, watch } from "vue";

import Menu from "./component/Menu.vue";
// import { menu_pina } from '@/pinia/Store';
import dialog_themcanbo from "./component/dialog_themcanbo.vue";
import { getcanbo, getcanbo_by_coQuan, get_coquandonvi } from "@/api/api";
// import { api_menu } from '@/api/api';
// import {  getcanbo } from '@/api/api';
import dialog_phanQuyen from "./component/dialog_phanQuyen.vue";
import dialog_updatecanbo from "./component/dialog_updatecanbo.vue";
export default {
  name: "CanBo",
  components: {
    Menu,
    dialog_themcanbo,
    dialog_phanQuyen,
    dialog_updatecanbo,
  },
  setup() {
    const page_number = ref(1);
    const page = ref({
      page_size: 0,
      count_item: 0,
    });
    const data = ref([]);
    const old_data = ref([]);
    const coQuanDonVi = ref([]);
    const err = ref({
      show: false,
      text: "",
      type: "success",
      title: "",
    });
    const select_coQuanDonVi = ref([]);

    const value_search = ref("");

    const check_loading = ref(true);

    //// khởi tạo mảng check
    const arr_check = ref([]);
    const get_danhsachcanbo = async (page_) => {
      const result = await getcanbo(page_);
      // console.log("result", result);
      // data.value = await getcanbo();
      data.value = result.data.content;
      page.value.page_size = result.data.totalPages;
      page.value.count_item = result.data.totalElements;
      old_data.value = data.value; // dùng đẻ so sánh dữ liệu khi chạy tìm kiếm
      check_loading.value = false;
      // alert("ayyyy");
    };
    get_danhsachcanbo(0);

    const reload = () => {
      //đang có lỗi khi đặt thẳng hàm get_danhsachcanbo lên sự kiện emit nên dùng tạm cái này lỗi:  ue warn]: Property "get_danhsachcanbo" was accessed during render but is not defined on instance.

      get_danhsachcanbo(page_number.value - 1); // có thể sẽ ko update kịp trong trường hợp data chưa cập nhật xong trong database
      err.value = {
        show: true,
        text: " thành công",
        type: "success",
        title: "thành công",
      };

      setTimeout(() => {
        err.value.show = false;
      }, 2000);
    };

    get_coquandonvi().then((cq) => {
      /// lọc bỏ những trường không cần thiết
      coQuanDonVi.value = cq.data.content;
      coQuanDonVi.value = Array.from(coQuanDonVi.value, (e) => ({
        tenGoi: e.tenGoi,
        maHanhChinh: e.maHanhChinh,
      }));
      // console.log("cơ quan", coQuanDonVi.value);
    });

    ////// lấy khóa của hững dòng được chọn
    const oncheck = (i, item) => {
      if (arr_check.value.includes(item)) {
        arr_check.value = arr_check.value.filter((e) => e != item);
      } else {
        arr_check.value[i] = item;
      }
      console.log(arr_check.value);
    };
    const check_all = () => {
      if (data.value.length != arr_check.value.length) {
        arr_check.value = data.value;
      } else arr_check.value = [];
    };

    const search_name = () => {
      console.log("serch", old_data.value);
      data.value = old_data.value.filter(
        (e) => e.HoVaTen.search(value_search.value) != -1
      );
    };

    const get_danhsachcanbo_find_coQua = async (data_) => {
      const result = await getcanbo_by_coQuan(data_);
      console.log("result", result);
      // data.value = await getcanbo_by_coQuan(data_);
      data.value = result.data.content;
    };

    const err_show = () => {
      err.value = {
        show: true,
        text: "xem lại thông tin nhập",
        type: "error",
        title: "lỗi",
      };

      setTimeout(() => {
        err.value.show = false;
      }, 2000);
    };

    watch(select_coQuanDonVi, (newName, oldName) => {
      // gọi hàm select_coQuanDonVi  khi name thay đổi
      console.log("watch cơ quan", newName, oldName);
      if (newName != null) {
        get_danhsachcanbo_find_coQua(newName.maHanhChinh);
      }
      // alert(" watch cơ quan ", newName.values, oldName.values);
    });

    watch(page_number, (newName, oldName) => {
      // gọi lấy dữ liệu theo số trang
      console.log("watch cơ quan", newName, oldName);
      get_danhsachcanbo(page_number.value - 1);
    });

    return {
      // cards,
      // user,
      Menu,
      page_number,
      // ay,
      data,
      arr_check,
      oncheck,
      coQuanDonVi,
      select_coQuanDonVi,
      get_danhsachcanbo_find_coQua,
      dialog_phanQuyen,
      // change_coQuan,

      search_name,
      old_data,
      value_search,
      check_all,
      check_loading,
      reload,
      page,
      dialog_updatecanbo,
      err,
      err_show,
    };
  },
};
</script>
  
  <style>
#as {
  /* background-image: url(../assets/bg-header.png); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* background-color: red; */
  /* display: none; */
  background-image: url("../assets/bg-header.png");
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  /* background-color: red; */
}

/* class="v-card v-theme--light v-card--density-default v-card--variant-elevated background_header" */
.ayy {
  background-image: url("../assets/image5.png");
}
/* style="background: url( '../assets/logo.jpg') no-repeat center center" */

th {
  background-color: #e3f1fb;
}

td {
  padding: 10px 10px;
}
</style>