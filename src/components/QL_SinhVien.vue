<template>
  <v-app id="inspire">
    <Menu />

    <!-- <v-alert
      :type="pinia_status.alert_tatus.type"
      :title="pinia_status.alert_tatus.title"
      :text="pinia_status.alert_tatus.text"
      style="position: fixed; z-index: 1"
      v-model="pinia_status.alert_tatus.check">
    </v-alert> -->

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
        <h2 style="color: #2161b1">QUẢN LÝ SINH VIÊN</h2>
        <hr style="border: solid #2161b1 1px" />

        <v-card
          flat
          class="pt-1 pr-1 pb-1 pl1 mt-4 mb-4"
          style="
            display: flex;
            justify-content: space-between;
            display: flex;
            width: 65%;
            float: right;
          "
        >
          <dialog_guithongbao />
          <v-btn
            class="bg-blue-darken-3 text-body-2"
            density="compact"
            prepend-icon="mdi-file-plus"
          >
            yêu cầu thêm ảnh
          </v-btn>
          <v-btn
            class="bg-blue-darken-3 text-body-2"
            density="compact"
            prepend-icon="mdi-file-outline"
          >
            Thêm dữ liệu
          </v-btn>
          <v-btn
            class="bg-blue-darken-3 text-body-2"
            density="compact"
            :prepend-icon="
              !search_check ? 'mdi-filter-variant-plus' : 'mdi-filter-variant'
            "
            @click="
              () => {
                search_check = !search_check;
              }
            "
          >
            Tìm kiếm
          </v-btn>

          <dialog_themsinhvienVue :typee="'add'" @reloadd="load_Data" />
        </v-card>

        <!-- ///////////////////// main -->

        <v-main class="pa-0">
          <v-container class="ma-0 pa-2">
            <v-main class="pa-0">
              <br />
              <div
                style="
                  width: 99%;
                  display: flex;
                  justify-content: space-between;
                  clear: right;
                  border: solid 1px #dadada;
                  margin: auto;
                  padding: 10px 10px;
                "
                v-if="search_check"
              >
                <div style="width: 30%">
                  Nhập từ khóa tìm kiếm
                  <br />
                  <form @submit.prevent="search">
                    <v-text-field
                      id="ey"
                      single-line
                      density="compact"
                      variant="outlined"
                      append-inner-icon="mdi-magnify"
                      placeholder="nhập từ khóa tìm kiếm"
                      v-model="searchValue"
                      
                      clear-icon="mdi-close"
                    >
                    </v-text-field>
                  </form>
                </div>
                <div style="width: 30%">
                  Trạng thái ảnh:
                  <br />
                  <v-select
                    clearable
                    placeholder="Trạng thái ảnh"
                    clear-icon="mdi-close"
                    ersistent-clear="true"
                    :items="['Có ảnh', 'Chưa có ảnh']"
                    v-model="select_search_image"
                    density="compact"
                    variant="outlined"
                  ></v-select>
                </div>
                <div style="width: 30%">
                  Cơ quan đơn vị:
                  <br />
                  <v-select
                    clearable
                    placeholder="Cơ quan đơn vị"
                    clear-icon="mdi-close"
                    ersistent-clear="true"
                    :items="dataCoQuan"
                    item-title="tenGoi"
                    item-value="maHanhChinh"
                    v-model="select_search_coquan"
                    density="compact"
                    variant="outlined"
                  ></v-select>
                </div>
              </div>
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
                    <th>Họ Và Tên</th>
                    <th>Mã đơn vị</th>

                    <th>Mã sinh viên</th>
                    <th>Email</th>
                    <th>Thao tác</th>
                  </tr>

                  <tr
                    v-for="(item, i) in dataSinhVien"
                    :key="i"
                    :class="arr_check.includes(item) ? 'check_hover' : 'hover'"
                  >
                    <td class="text_align">
                      <input
                        type="checkbox"
                        @change="oncheck(i, item)"
                        v-if="item.EmailVNU != 'suadminTest@gmail.com'"
                        :checked="arr_check.includes(item) ? true : false"
                      />
                    </td>
                    <td>
                      {{ i + 1 }}
                    </td>
                    <td>{{ item.HoVaTen }} | {{ item.ThuMucAnh[0]?.MaThuMuc }}</td>
                    <td>{{ item.CoQuanDonVi.MaHanhChinh }}</td>
                    <td>{{ item.MaSinhVien }}</td>
                    <td>{{ item.EmailVNU }}</td>
                    <td style="text-align: center">
                      <dialog_viewSinhVienVue
                        
                        :props_sinhvien="item"
                        @reload2="load_Data"
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
              <select class="select_page2 pl-2 pr-2" v-model="page_number">
                <option v-for="i in page.page_size" :key="i" :value="i">
                  Trang {{ i }}
                </option>
              </select>
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

import { get_coquandonvi, get_sinhVien } from "@/api/api";

import dialog_guithongbao from "./component/dialog_guithongbao.vue";
import dialog_themsinhvienVue from "./component/dialog_themsinhvien.vue";
import dialog_viewSinhVienVue from "./component/dialog_viewSinhVien.vue";
import { status_load } from "@/pinia/Store";

export default {
  name: "QLSinhVien",
  components: {
    Menu,
    dialog_guithongbao,
    dialog_themsinhvienVue,
    dialog_viewSinhVienVue,
  },
  setup() {
    const page_number = ref(1);
    const page = ref({
      page_size: 0,
      count_item: 0,
    });

    const dataSinhVien = ref([]);
    const oldDataSinhVien = ref([]);

    const dataCoQuan = ref([]);
    get_coquandonvi().then((data) => {
      dataCoQuan.value = data.data.content;
    });
    //// khởi tạo mảng check mảng giúp kiểm tra các ô check box trong bảng
    const arr_check = ref([]);
    const search_check = ref(false);
    const searchValue = ref("");
    const select_search_image = ref("");
    const select_search_coquan = ref("");

    const getSinhVien = async (page_) => {
      const result = await get_sinhVien(page_);
      dataSinhVien.value = result.data.content; // lấy danh sách sinh viên
      
      oldDataSinhVien.value = result.data.content;
      page.value.page_size = result.data.totalPages; // lấy số trang có thể có
      page.value.count_item = result.data.totalElements; // lấy tổng sô bản ghi sinh viên
    };
    getSinhVien(0);
    

    const oncheck = (i, item) => {
      // sự kiện chọn một sinh viên bằng ô checkbox

      if (arr_check.value.includes(item)) {
        arr_check.value = arr_check.value.filter((e) => e != item);
      } else {
        arr_check.value[i] = item;
      }
    };
    const check_all = () => {
      // chọn tất cả một lúc
      if (dataSinhVien.value.length != arr_check.value.length) {
        arr_check.value = dataSinhVien.value;
      } else arr_check.value = [];
    };

    const search = () => {
      dataSinhVien.value = oldDataSinhVien.value.filter(
        (e) =>
          e.ChungMinhThu.search(searchValue.value) != -1 ||
          e.HoVaTen.search(searchValue.value) != -1 ||
          e.MaSinhVien.search(searchValue.value) != -1 ||
          e.EmailVNU.search(searchValue.value) != -1
      );
    };

    
    
    const pinia_status = status_load();
    // console.log(pina_menu.status_load)
    watch(pinia_status,(n)=>{
      if(n.status_load){
        load_Data()
        
      }

      pinia_status.unload()
    })
    watch(page_number, () => {
      // gọi lấy dữ liệu theo số trang
      // console.log("watch pagenumber", newName, oldName);
      getSinhVien(page_number.value - 1);
    });

    watch(searchValue, (newName) => {
      // gọi lấy dữ liệu theo số trang
      // console.log("search value", newName, oldName);
      if (newName.value != "") {
        getSinhVien(page_number.value - 1);
      }
      select_search_coquan.value = "";
      select_search_image.value = "";
    });
    watch(select_search_image, (newName) => {
      // gọi lấy dữ liệu theo số trang
      if (newName != "") {
        if (newName == "Có ảnh") {
          dataSinhVien.value = oldDataSinhVien.value.filter(
            (e) => e.MainImage.length > 0
          );
        } else {
          dataSinhVien.value = oldDataSinhVien.value.filter(
            (e) => e.MainImage.length == 0
          );
        }
      }

      select_search_coquan.value = "";
      searchValue.value = "";
    });
    watch(select_search_coquan, (newName) => {
      // gọi lấy dữ liệu theo số trang

      if (newName != "") {
        // console.log(newName);
        dataSinhVien.value = oldDataSinhVien.value.filter(
          (e) => e.CoQuanDonVi.MaHanhChinh.search(newName) != -1
        );
      }
      select_search_image.value = "";
      searchValue.value = "";
    });

    const load_Data = () => {
      getSinhVien(page_number.value - 1);
      
    };
    
    return {
      dataSinhVien,
      oldDataSinhVien,
      page_number,
      page,
      oncheck,
      check_all,
      arr_check,
      search_check,
      searchValue,
      search,
      select_search_image,
      select_search_coquan,
      dataCoQuan,
      load_Data,
      pinia_status,
      
    };
  },
};
</script>
  
  <style scoped>
#as {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/bg-header.png");
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  /* background-color: red; */
}

/* class="v-card v-theme--light v-card--density-default v-card--variant-elevated background_header" */
.ayy {
  background-image: url("../assets/image5.png");
}

.text_align {
  text-align: center;
}
.select_page2 {
  border: solid 1px blue;
  border-radius: 5px;
  height: 8vh;
}

/* cái này là phần phần tối màu của các ô trong bảng khi được chọn */
.check_hover {
  background-color: #f1f1f1;
}
.hover:hover {
  background-color: #f1f1f1;
}
/* style="background: url( '../assets/logo.jpg') no-repeat center center" */

/* .v-input > .v-input__control {
  min-height: 0px !important;
  background-color: red !important;
}
#ey {
  padding: 0;
} */
</style>