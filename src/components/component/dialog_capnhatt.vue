<template>

    

  <v-dialog v-model="dialog" style="margin: auto; width: 80%">
    <template v-slot:activator="{ props }">
      <v-icon color="#0468B1" v-bind="props" style="cursor: pointer" size="{1}"
        >mdi-pencil</v-icon
      >
    </template>

    <v-card id="ay">
      <v-card class="pt-5 pb-5 bg-blue">
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 95%;
            margin: auto;
          "
        >
          <div style="">Cập nhật</div>
          <!-- <v-btn block @click="dialog = false" style="min-width: 0%;">Close Dialog</v-btn> -->
          <v-icon block @click="dialog = false"> mdi-close </v-icon>
        </div>
      </v-card>
      <div class="ml-4 mt-4" >
        <h4>Mã chuên mục: <span class="text-red">*</span></h4>
        <input
          type="text"
          class="border_input disabled_input"
          disabled
          style="width: 98%"
          placeholder="Nhập mã chuyên mục..."
          :value="machuyenmuc"
        />
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          "
        >
          <div class="input_tt">
            <h4>Tên chuyên mục: <span class="text-red">*</span></h4>
            <input
              type="text"
              style="width: 100%"
              class="border_input"
              placeholder="Nhập tên đầy đủ..."
              v-model="tenchuyenmuc"
            />
          </div>

          <div class="input_tt">
            <h4>Tên tiếng anh: <span class="text-red">*</span></h4>
            <input
              type="text"
              style="width: 100%"
              class="border_input"
              placeholder="Nhập tên tiếng anh..."
              v-model="tentiengAnh"
            />
          </div>

          <div class="input_tt">
            <h4>Số thứ tự: <span class="text-red">*</span></h4>
            <input
              type="text"
              style="width: 100%"
              class="border_input"
              placeholder="Nhập số thứ tự..."
              v-model="stt"
            />
          </div>

          <div class="input_tt">
            <h4>Nhóm quền:</h4>
            <v-select
              clearable
              chips
              v-model="select"
              item-title="TenNhomQuyen"
              item-value="MaDinhDanhNhomQuyen"
              label="chọn"
              :items="items"
              return-object
              multiple
              variant="solo"
            ></v-select>
          </div>

          <div class="input_tt">
            <h4>Chuyên mục cha:</h4>
            <select class="input_select" v-model="chuyenmuccha">
              <option value="">chọn</option>
              <option value="Tin tức - sự kiện">Tin tức - sự kiện</option>
              <option value="Tin trong nước">Tin trong nước</option>
            </select>
          </div>

          <div class="input_tt">
            <h4>Tình trạng:</h4>
            <select class="input_select" v-model="tinhtrang" placeholder="Chọn">
              
              <option value="2">Hoạt động</option>
              <option value="1">Không hoạt động</option>

            </select>
          </div>
        </div>
      </div>
      <v-card-actions class="mt-10 mb-10" style="margin: auto">
        <v-btn
          color="white"
          class="bg-red"
          style="width: max-content"
          @click="dialog = false"
          ><v-icon>mdi-close</v-icon> Thoát</v-btn
        >
        <v-btn
          color="white"
          class="bg-blue"
          style="width: max-content"
          @click="click_them_tt()"
          ><v-icon>mdi-file-document-plus-outline</v-icon> Cập nhật</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import {  post_capNhatTinTuc } from "@/api/api";
import { status_load } from "@/pinia/Store";



export default {
  name: "DiaLogcn",
  props: ["dataprop"],

  setup(props,) {

    
    const dialog = ref(false);
    const machuyenmuc = ref(props.dataprop.MaChuyenMuc);
    const tenchuyenmuc = ref(props.dataprop.TenChuyenMuc);
    const tentiengAnh = ref(props.dataprop.TenTiengAnh);
    const stt = ref(props.dataprop.SoThuTu);
    const chuyenmuccha = ref(props.dataprop.MaChuyenMucCha);
    const nhomquyen = ref(props.dataprop[0]?.TenNhomQuyen);
    const tinhtrang = ref(props.dataprop.TinhTrang);
    var ay = ref(props.dataprop.MaChuyenMuc);

    //// v-select
    const select = ref([]);
    const items = ref([
      {
        MaDinhDanhNhomQuyen:
          "ddf8e704-436c-49a7-9a49-530cf90a68b2-u3ujiaelx512e8ip",
        TenNhomQuyen: "Quản trị tin bài",
      },
      {
        MaDinhDanhNhomQuyen:
          "e35d8193-3ce7-4998-a905-122dd40f2872-uasi0qixa6ludtd1",
        TenNhomQuyen: "Quản lý sinh viên",
      },
      {
        MaDinhDanhNhomQuyen:
          "23ef333a-b482-486d-bf80-e16e4a63b749-4hyfi6giusohpuze",
        TenNhomQuyen: "Quản lý bản đồ số",
      },
      {
        MaDinhDanhNhomQuyen:
          "c2f1c6d9-c69b-4065-9ec6-a47419048c17-modnuvnl4ynji30u",
        TenNhomQuyen: "test nhóm quyền",
      },
      {
        MaDinhDanhNhomQuyen:
          "ba520f8c-60b9-434f-b823-680e62cdd93e-r7y9ahxrrhxbaqwx",
        TenNhomQuyen: "Admin cấp đơn vị",
      },
    ]);

    const pinia_status_load = status_load();
    
    

    function click_them_tt() {
      post_capNhatTinTuc(props.dataprop.PrimKey,machuyenmuc.value,tenchuyenmuc.value,tentiengAnh.value,stt.value,tinhtrang.value,chuyenmuccha.value,select.value)
      .then( ()=>{
        dialog.value = false
        pinia_status_load.load();
        pinia_status_load.alert("thành công", "cập nhật thành công" , "success")
        
          // setTimeout(() => {
          //   err.value.show = false;
          // }, 4000);
      
      } )
    }

    return {
      dialog,
      machuyenmuc,
      tenchuyenmuc,
      tentiengAnh,
      stt,
      chuyenmuccha,
      nhomquyen,
      tinhtrang,
      click_them_tt,
      ay,

      select,
      items,
      
      pinia_status_load
    };
  },
};
</script >

<style scoped>
.border_input {
  border: solid 1px rgb(209 209 209);
    border-radius: 5px;
    padding: 5px 0 5px 7px;
    font-size: 15px;
}

.input_tt {
  width: 47%;
  /* border: solid 1px black; */
  margin: 10px 21px 10px 0;
}

.input_select {
  border: solid 1px rgb(206 206 206);
    width: 100%;
    padding: 5px 0 5px 7px;
    border-radius: 7px;
}

#ay {
  height: 66vh;
  overflow-y: scroll;
}
.ay{
  height: 38px;
}

</style>