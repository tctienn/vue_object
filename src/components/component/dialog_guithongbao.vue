<template>
  <v-dialog v-model="dialog" style="margin: auto; width: 54%">
    <template v-slot:activator="{ props }">
      <v-btn
        class="bg-blue-darken-3 text-body-2"
        v-bind="props"
        style="float: right"
        density="compact"
        prepend-icon="mdi-send"
      >
        GỬI THÔNG BÁO
      </v-btn>
    </template>

    <v-card id="ay">
      <div class="pt-5 pb-5 bg-blue">
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 95%;
            margin: auto;
          "
        >
          <div style="">Gửi thông báo</div>
          <!-- <v-btn block @click="dialog = false" style="min-width: 0%;">Close Dialog</v-btn> -->
          <v-icon block @click="dialog = false"> mdi-close </v-icon>
        </div>
      </div>
      <div class="ml-4 mt-4" style="height: max-content">
        <h4>Tiêu đề: <span class="text-red">*</span></h4>
        <input
          type="text"
          class="border_input"
          style="width: 98%"
          placeholder="Nhập ... "
          v-model="maCanBo"
          required
        />

        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          "
        >
          <div class="input_tt" id="fullWidth">
            <h4>nội dung: <span class="text-red">*</span></h4>
            <textarea
              placeholder="Nhập nội dung..."
              style="
                width: 100%;
                border: solid 1px gray;
                border-radius: 8px;
                padding: 4px;
              "
            ></textarea>
          </div>

          <div class="input_tt">
            <h4>Tên người gửi thông báo:</h4>
            <input
              type="text"
              class="border_input"
              style="width: 100%"
              v-model="diaChi"

              @change="onselectFile"
            />
          </div>
          <div class="input_tt">
            <h4>Số điệm thoại:</h4>
            <input
              type="text"
              class="border_input"
              style="width: 100%"
              v-model="diaChi"
            />
          </div>

          <div class="input_tt">
            <h4>Hẹn lịch gửi thông báo :</h4>
            <Datepicker
              v-model="ngaySinh"
              style="
                border: solid 1px rgb(139 139 139);
                width: 100%;
                padding: 3px 7px;
                border-radius: 6px;
              "
            />
          </div>
          <div class="input_tt">
            <h4>Cơ quan đơn vị: <span class="text-red">*</span></h4>
            <input
              type="text"
              class="border_input"
              style="width: 100%"
              v-model="diaChi"
            />
          </div>
        </div>
      </div>
      <v-card-actions class="mt-5 mb-10" style="margin: auto">
        <v-btn
          color="white"
          class="bg-red"
          style="width: max-content"
          @click="dialog = false"
          ><v-icon>mdi-close</v-icon> Thoát</v-btn
        >
        <v-btn color="white" class="bg-blue" style="width: max-content"
          ><v-icon>mdi-file-document-plus-outline</v-icon> Xác nhận</v-btn
        >
      </v-card-actions>
      <!-- <v-card v-for="(item, i) in select" :key="i">
          {{ item }}
       </v-card> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
// import { them_tt } from '@/api/api';
import Datepicker from "vue3-datepicker";
import { get_coquandonvi } from "@/api/api";

export default {
  name: "DiaLog_themcanbo",
  components: {
    Datepicker,
  },

  setup() {
    const dialog = ref(false);

    const coQuanDonVi = ref("");
    const select_coQuanDonVi = ref([]);

    const ngaySinh = ref(new Date());
    // date1.toDateString() để lấy ngayf tháng năm

    const select = ref([]);

    const handClick = async () => {
      coQuanDonVi.value = await get_coquandonvi();
    };

    

    

    const ay = ref({}); /// biến này lưu biến đối tượng trong sự kiện post thêm cán bộ

    return {
      dialog,

      coQuanDonVi,

      select,
      ngaySinh,

      select_coQuanDonVi,
      handClick,

      ay,

      
    };
  },
};
</script>

<style scoped>
#ay {
  height: 90vh;
  overflow-y: scroll;
}
.border_input {
  border: solid 1px rgb(174, 174, 174);

  padding: 3px 7px;
  border-radius: 6px;
  /* margin: 10px 0 0 0; */
}

.input_tt {
  width: 47%;

  /* border: solid 1px black; */
  margin: 24px 15px 0px 0;
}

.input_select {
  border: solid 1px rgb(128, 128, 128);
  width: 100%;
  padding: 2px 7px;
  border-radius: 5px;
}

#fullWidth {
  width: 100%;
  /* display: none; */
}
.container {
  border: 2px solid #ccc;
  width: 300px;
  height: 100px;
}

/* .v-select__selection {
  width: auto;
  height: 10px;
} */

.input-form:not(.v-textarea),
.input-form:not(.v-textarea) .v-input__slot {
  height: 32px;
}

.custom-height-select > .v-input__control > .v-input__slot {
  height: 26px !important;
}

.custom-height-select .v-field {
  height: 75%;
  box-shadow: none;
  border: solid 1px #a0a0a0;
}

.v-input > .v-input__control > .v-field > .v-field__field > .v-field-label {
  margin-top: -4px;
}
</style>

<!-- <style lang=“scss”>
@import "~vuetify/src/styles/styles.sass";

/* // Định nghĩa các giá trị mới cho các biến SASS  */
"select-chips-control-min-height": "48px";
select-chips-margin-bottom: (
  "default": 4px,
  "comfortable": 8px,
  "compact": 2px
);
select-content-border-radius: 8px;

/* // Nhập các thành phần Vuetify cần thiết  */
@import "~vuetify/src/components/VSelect/_index";
@import "~vuetify/src/components/VTextField/_index";
</style> -->