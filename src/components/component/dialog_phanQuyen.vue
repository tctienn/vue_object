<template>
  <v-dialog v-model="dialog" style="margin: auto; width: 50%">
    <template v-slot:activator="{ props }">
      <v-btn
        style="float: right; font-size: 10px; padding: 0 10px"
        color="blue"
        v-bind="props"
        @click="handleClick"
      >
        <v-icon> mdi-plus-circle-outline </v-icon>
        Phân quền
      </v-btn>
    </template>

    <v-card>
      <v-card
        class="pt-2 pb-2"
        style="background-color: #2196f3; color: white; border-radius: 0 0 0 0"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 95%;
            margin: auto;
          "
        >
          <div>Phân quyền cán bộ</div>
          <!-- <v-btn block @click="dialog = false" style="min-width: 0%;">Close Dialog</v-btn> -->
          <v-icon block @click="dialog = false"> mdi-close </v-icon>
        </div>
      </v-card>
      <!-- <v-card class="ml-4 mt-4" flat style="height: 200vh; overflow-y: scroll">
        
      </v-card> -->

      <v-card class="ml-4 mt-4" flat>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          "
        >
          <div class="input_tt" id="fullWidth">
            <h4>cán bộ:</h4>

            <div>
              <v-select
                clearable
                chips
                v-model="select_canbo"
                item-title="HoVaTen"
                label="chọn"
                :items="tenCanBo"
                multiple
                return-object
                variant="solo"
                class="change"
              ></v-select>
            </div>

            <!-- {{ select.map((e) => e.state).join(",") }} -->
          </div>
        </div>

        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          "
        >
          <div class="input_tt" id="fullWidth">
            <h4>Nhóm quền:</h4>

            <v-select
              clearable
              chips
              v-model="select"
              item-title="TenNhomQuyen"
              label="chọn"
              :items="items"
              return-object
              multiple
              variant="solo"
              class="change"
              id="uiii"
              small
            ></v-select>

            <!-- {{ select.map((e) => e.state).join(",") }} -->
          </div>
        </div>
      </v-card>
      <v-card-actions class="" style="display: flex; justify-content: flex-end">
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
          ><v-icon>mdi-file-document-plus-outline</v-icon> Phân quyền</v-btn
        >
      </v-card-actions>
      <!-- <v-card v-for="(item, i) in select" :key="i">
          {{ item }}
       </v-card> -->
    </v-card>
  </v-dialog>
</template>

<script>
// import { watch } from "vue";
import { ref } from "vue";
import { get_nhomQuyen, post_capQuyen } from "@/api/api";

export default {
  name: "DiaLog_phanQuyen",
  props: ["data_prop2", "check_select"],
  setup(propss, contex) {
    const dialog = ref(false);

    const select = ref([]);
    const select_canbo = ref([]);

    const tenCanBo = ref(propss.data_prop2); // không nhận kịp props

    const items = ref([]);

    console.log("tenCanBo:", propss);

    const handleClick = () => {
      tenCanBo.value = propss.data_prop2;

      // console.log("click:", propss.data_prop2);
      // nextTick(() => {
      //   console.log("click...:", propss.data_prop2);
      // });

      //// lấy nhóm quyền
      get_nhomQuyen().then((datas) => {
        items.value = datas.data.content;
      });

      //lấy danh sách cán bộ đã chọn
      select_canbo.value = propss.check_select;
      select_canbo.value = select_canbo.value.filter((e) => e != undefined); // đặt tại index cho mảng theo đúng thứ tự vì dữ liệu cán bộ trong trang trên sẽ có thứ tự có thể nhảy và không lần lượt sẽ gây vấn đề khi duyệt qua từng phần tử
    };

    const click_them_tt = () => {
      /// xác nhận phân quyền
      // console.log("ayyy", select_canbo.value);
      loc_data();
      post_capQuyen(select_last.value);
      contex.emit("phanquyen");
    };

    // lọc dữ liệu , đây là hàm lọc dữ liệu trước khi gửi đi , loại bỏ các thuội tính thừa

    const select_last = ref([]);
    const loc_data = () => {
      select_last.value = Array.from(select_canbo.value, (e) => ({
        IdCanBo: e.PrimKey,
        PhanQuyenCanBo: Array.from(select.value, (e2) => ({
          MaDinhDanhNhomQuyen: e2.MaDinhDanh,
          MaDinhDanhCanBo: e.MaDinhDanh,
        })),
      }));

      // select.value = Array.from(select.value, (e) => ({
      //   MaDinhDanhNhomQuyen: e.MaDinhDanh,
      //   MaDinhDanhCanBo: e.MaDinhDanh,
      // }));

      console.log("ayy", select_last.value);
    };

    // const { data_prop2 } = propss;

    // watch(propss, (newName, oldName) => {
    //   // gọi hàm select_coQuanDonVi  khi name thay đổi
    //   console.log("watch ", newName, oldName);
    //   // if (newName != null) {
    //   //   console.log(newName);
    //   //   tenCanBo.value = newName;
    //   // }
    //   // alert(" watch cơ quan ", newName.values, oldName.values);
    // });

    return {
      dialog,
      handleClick,

      click_them_tt,
      items,
      select,
      tenCanBo,
      select_canbo,
      // loc_data,
    };
  },
};
</script>

<style  >
/* .change > .v-input__control > .v-field {
  height: 36px;
  box-shadow: none;
}
.change {
  height: 27px;
}
.change > .v-input__control > .v-field > .v-field__field > .v-field-label {
  margin-top: -8px;
}

.change > .v-input__control > .v-field > .v-field__append-inner {
  padding: 7px 0;
} */
/* 
.change {
  font-size: 12px;
} */
</style>