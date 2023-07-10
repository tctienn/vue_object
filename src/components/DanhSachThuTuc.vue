<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="#0468B1">
        <v-sheet
          
          color="#0468B1"
          class="pa-4"
          style="display: flex; text-align: center; align-items: center;">
          <!-- <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
          ></v-avatar> -->

          <v-icon color="white" style="opacity:1; margin-right: 10px;" size="40" > 
            mdi-account-circle-outline
          </v-icon>

          <div style="color: white;"> user  </div>
        </v-sheet>
        
        <hr/>
        
        <v-list>
          <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            link
            
          >
            <template v-slot:prepend>
              <v-icon color="white" style="opacity:1">{{ icon }}</v-icon>
            </template>
  
            <v-list-item-title  style="color:white ; opacity: 0.7;" >{{ text }}</v-list-item-title>
          </v-list-item>
        </v-list>
        
        <div style="position: absolute; bottom: 10px; color: white; width: 100%;">
          <hr/>
          <br>
          <v-icon class="ml-5">
            mdi-power 
          </v-icon>
            đăng xuất
            
        </div>
      </v-navigation-drawer  >

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
          <!-- <img
            src="../assets/logo.jpg"
            style="width: 3.4%; margin-right: 10px"
          /> -->
          <!-- HỆ THỐNG HỖ TRỢ SINH VIÊN - ĐẠI HỌC QUỐC GIA HÀ NỘI -->
        </v-card-text>
      </v-card>
      <!-- // error -->

      <v-container class="py-2 px-6" fluid>
        <h2 style="color: #2161b1">Danh sách thủ tục</h2>
        <hr style="border: solid #2161b1 1px" />

        <v-card
          flat
          class="pt-1 pr-1 pb-1 pl1 mt-4 mb-4"
          style="display: flex; justify-content: flex-end;  "
        >
          <form style="width: 30%" @submit.prevent="search_name">
            <v-text-field
              placeholder="Nhập từ khóa tìm kiếm"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              v-model="search_value"
              
              class="mr-2"
              
            ></v-text-field>
          </form>


          <v-btn  @click="clickDialogSearch()" style="background-color: #0468b1;" color="white" variant="outlined" prepend-icon="mdi-filter-variant-plus" >
            Tìm kiếm nâng cao
          </v-btn>
        </v-card>

        <v-card v-if="dialog_search" style="display: flex; flex-wrap: wrap; border: solid 1px gray; justify-content: space-between; margin-left: 15px;" class="pa-4" max-width="96%">
          <div style="width: 49%;">
            <div>Lĩnh vực</div>
            <v-select
              clearable
              :items="data_linhVuc"
              item-title="TenMuc"
              item-value="MaMuc"
              v-model="select_linhVuc"
              variant="outlined"
              density="compact"
              
            ></v-select>
          </div>

          <div style="width: 49%;">
            <div>Mức độ</div>
            <v-select
              clearable            
              :items="data_mucDo"
              item-title="TenMuc"
              item-value="MaMuc"
              v-model="select_mucDo"
              variant="outlined"
              density="compact"
              
            ></v-select>
          </div>

          <div style="width: 32%;  ">
            <div>Cấp thực hiện</div>
            <v-select
              clearable
              :items="data_cap"
              item-title="TenMuc"
              item-value="MaMuc"
              v-model="select_cap"
              variant="outlined"
              density="compact"
      
            ></v-select>
          </div>

          <div  style="width: 32%; ">
            <div>Cơ quan thực hiện</div>
            <v-select
              clearable
              :items="data_coQuan"
              item-title="TenMuc"
              item-value="MaMuc"
              v-model="select_coQuan"
              variant="outlined"
              density="compact"
                       
            ></v-select>
          </div>

          <div style="width: 32%; ">
            <div>Trạng thái tài liệu</div>
            <v-select
              clearable
              :items="data_trangthai"
              item-title="TenMuc"
              item-value="MaMuc"
              v-model="select_trangthai"
              variant="outlined"
              density="compact"
                           
              
            ></v-select>
          </div>

          <div style="margin: auto;" >
            <v-btn style="border: solid 1px #0468b1;" color="#0468b1" variant="outlined" prepend-icon="mdi-close" class=" mr-2 " @click="clickDialogSearch" >
              Đóng
            </v-btn>
            <v-btn style="background-color: #0468b1;" color="white" variant="outlined" @click="search" >
              Tìm kiếm
            </v-btn>
          </div>
        </v-card>

        <!-- ///////////////////// main -->

        <v-main class="pa-0">
          <v-container class="ma-0 pa-2">
            <v-main class="pa-0">
              <v-container class="scrollable ma-0 pa-2">
                <table
                  width="100%"
                  border="1"
                  cellspacing="0"
                  style="border-collapse: collapse; border: solid 1px #e5e5e5"
                >
                  <tr>
                    
                    <th>STT</th>
                    <th>Mã thủ tục</th>
                    <th>Tên thủ tục</th>

                    <th>Lĩnh vực</th>
                    <th>Trạng thái dữ liệu</th>
                    
                  </tr>
                  <tr v-if="check_loading">
                    <td colspan="7">
                      <v-card
                        :loading="check_loading"
                        style="width: 100%; height: 1px"
                      ></v-card>
                    </td>
                  </tr>
                  <tr v-for="(item, i) in data" :key="i" >
                    
                    <td>{{ i + 1 }}</td>
                    <td width="15%"><dialog_detail_DSTT :item="item"/></td>
                    <td>{{ item.TenMuc }}</td>
                    <td>{{  item.CoQuanThucHien?.map(
                          (obj) => obj.TenMuc
                        ).join(", ")
                       }}</td>
                    <td width="15%">{{ item.TrangThaiDuLieu.TenMuc }}</td>
                    
                    
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
            </div>
          </v-container>
        </v-main>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script>
import { get_TTHC,get_linhVuc,get_mucDo,get_capTT, get_coQuan } from "@/api/api";
import { watch } from "vue";
import { ref } from "vue";
import dialog_detail_DSTT from './component/dialog_detail_DSTT.vue'

export default {
  name: "DanhSachThuTuc",
  components: {
    dialog_detail_DSTT
  },
  setup() {
    const page_number = ref(1);
    const page = ref({
      page_size: 0,
      count_item: 0,
    });
    const data = ref([]);
    const old_data = ref();
    var dialog_search = ref(false);
    const data_linhVuc = ref()
    const select_linhVuc= ref()
    const data_mucDo = ref()
    const select_mucDo = ref()
    const data_cap = ref()
    const select_cap = ref()
    const data_coQuan = ref()
    const select_coQuan = ref()
    
    const clickDialogSearch= () =>{
      dialog_search.value = !dialog_search.value
      
      get_linhVuc().then((linhvuc)=>{
         data_linhVuc.value = linhvuc.data.content
      })
      get_mucDo().then((mucdo)=>{
        data_mucDo.value = mucdo.data.content
      })
      get_capTT().then((cap)=>{
        data_cap.value = cap.data.content
      })
      get_coQuan().then((coquan)=>{
        data_coQuan.value = coquan.data.content
      })
      
    }


    var drawer = '';
    const links = [
      ['mdi-note-plus-outline', 'Danh sách thủ tục'],
    ]
    const check_loading = ref(true);

    var data_trangthai = [
      {        
         type: "C_TrangThaiDuLieu",
                MaMuc: "02",
                TenMuc: "Chính Thức"
      },
      {        
         type: "C_TrangThaiDuLieu",
                MaMuc: "01",
                TenMuc: "không chính thức"
      }
    ]
    const select_trangthai = ref(null) 

    const getData=(nowpage)=>{
      get_TTHC(nowpage,10).then((datas)=>{
        data.value = datas.data.content
        old_data.value = datas.data.content
        page.value.page_size = datas.data.totalPages
        page.value.count_item = datas.data.totalElements
        
      })
    }
    getData(0)

    const search_value = ref()
    const  search_name = () =>{
      data.value = old_data.value.filter( e => e.TenMuc.search(search_value.value) !=-1 )
    }

    const  search = () =>{

      if(select_trangthai.value != null)
      {
        data.value = old_data.value.filter(e=> e.TrangThaiDuLieu.MaMuc == select_trangthai.value)
      }
      

    }
    
    watch(page_number, (newValue)=>{
      getData(newValue)
    })

    return {

      page_number,
      data,
      drawer,
      links,
      check_loading,
      page,
      dialog_search,
      clickDialogSearch,

      data_trangthai,
      select_trangthai,
      search,
      data_linhVuc,
      select_linhVuc,
      data_mucDo,
      select_mucDo,
      data_cap,
      select_cap,
      data_coQuan,
      select_coQuan,
      search_value,
      search_name,

      dialog_detail_DSTT

    };
  },
};
</script>
  
  <style scoped>
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
  background-color: #b5e0ff;
  padding: 0 2px;
}

td {
  padding: 10px 10px;
  /* white-space: pre-wrap; */
}


</style>