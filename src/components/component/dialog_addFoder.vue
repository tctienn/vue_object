<template>
  <v-dialog v-model="dialog" style="margin: auto; width: 54%">
    <template v-slot:activator="{ props }">
      <v-btn
        class="bg-blue-darken-3 pl-4 pt-2 pb-7"
        v-bind="props"
        density="compact"
        prepend-icon="mdi-plus"
      >
        {{ action ? "Thêm thư mục" : "Thêm ảnh" }}
      </v-btn>
    </template>

    <v-card id="ay">
      <v-card class="pt-4 pb-10" style="max-height: 10%">
        <div
          style="
            display: flex;
            justify-content: right;
            width: 95%;
            margin: auto;
          "
        >
          <v-icon block @click="dialog = false"> mdi-close </v-icon>
        </div>
      </v-card>
      <div class="ml-4 mt-4" style="height: max-content">
        <input type="file" id="upload" @change="onselectFile" hidden />

        <span v-if="!action">
          <div
            class="mr-4"
            style="
              width: 14%;
              aspect-ratio: 2/2;
              display: inline-block;
              position: relative;
            "
            v-for="(e, i) in sinhvien.MainImage"
            :key="i"
          >
            <v-icon
              style="
                position: absolute;
                right: 0;
                opacity: 0.8;
                cursor: pointer;
              "
              size="25"
              @click="delete_image_c(e.Id)"
            >
              mdi-close-circle
            </v-icon>
            <img :src="e.FileUrl" style="width: 100%; aspect-ratio: 2/2" />
          </div>
          <br /><br />
          Thêm ảnh
          <label
            for="upload"
            style="
              display: inline-block;
              background-color: #2161b1;
              color: white;
              border-radius: 0.3rem;
              cursor: pointer;
              font-size: 15px;
              padding: 1px 8px 1px 4px;
            "
            v-if="!action"
          >
            <v-icon size="15">mdi-plus</v-icon>
            Thêm ảnh
          </label>
          <!-- /////////////////////////// -->
        </span>
        <span v-if="action">
          <label> Tên thư mục </label>
          <input
            type="text"
            class="border_input"
            style="width: 80%"
            placeholder="Nhập ... "
            v-model="nameFoder"
          />
        </span>
      </div>
      <v-card-actions
        v-if="action"
        class="mt-5 mb-10"
        style="justify-content: flex-end"
      >
        <v-btn
          color="white"
          class="bg-blue"
          style="width: max-content"
          @click="addFoder"
        >
          <v-icon>mdi-file-document-plus-outline</v-icon>
          Xác nhận
        </v-btn>
      </v-card-actions>
      <!-- <v-card v-for="(item, i) in select" :key="i">
          {{ item }}
       </v-card> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import { delete_image_, post_themThuMucAnh, upload_img } from "@/api/api";
import { status_load  } from "@/pinia/Store";
import { toRefs } from "vue";
import { watch } from "vue";
// import { them_tt } from '@/api/api';

export default {
  name: "DiaLog_themcanbo",

  props: ["sinhvien", "prop_type"],
  // emits: ["reload"],
  setup(props) {
    const dialog = ref(false);
    const nameFoder = ref("");
    const {sinhvien} = toRefs(props)
    const {prop_type} = toRefs(props)
    const data_sinhvien = ref(sinhvien.value);
    const action = ref(prop_type.value == "addfoder");
    watch(prop_type, (news)=>{
      action.value = (news == "addfoder")
    })


    const pinia_status_load = status_load();

    // const delete_image = () => {
    //   emit("reload");
    // };
    // const reload = () => {
    //   emit("reload");
    // };
    const addFoder = () => {
      console.log("sinhvien", data_sinhvien.value);
      data_sinhvien.value.ThuMucMoi = nameFoder.value;
      console.log("sinhvien", data_sinhvien.value);
      post_themThuMucAnh(data_sinhvien.value.PrimKey, data_sinhvien.value)
        .then(() => {
          console.log("thêm foder thành công");
          // reload();
          pinia_status_load.load();
          dialog.value = true
        })
        .catch((error) => {
          console.log(" lỗi thêm name foder ", error.response);
        });
    };
    
    
    const onselectFile = (event) =>{
      const file = event?.target.files[0]
      console.log('Selected file:', file)
      console.log("formdata: ", data_sinhvien.value.PrimKey)
      console.log('check',data_sinhvien.value)
      let formData = new FormData();
      formData.append('files', file);
      formData.append('id', data_sinhvien.value.PrimKey);
      formData.append('maThuMuc', data_sinhvien.value.ThuMucAnh[0]?.MaThuMuc);

      console.log("formdata:.... ", formData)

      upload_img(formData, file).then(()=>{
        console.log("ok")
        pinia_status_load.load();
      }
      ).catch(err=>{
        console.log('loi',err)
      })

    }

    const delete_image_c =(MainImage)=>{
      // console.log('key',sinhvien.PrimKey)
      delete_image_(sinhvien.value.PrimKey,MainImage).then(()=>{
        console.log('deleteed')
        pinia_status_load.load();
      })
      .catch((er)=>{
        console.log('loi ', er)
      })
    }

    return {
      dialog,
      data_sinhvien,
      nameFoder,
      addFoder,

      action,
      // delete_image,
      pinia_status_load,

      onselectFile,

      delete_image_c
    };
  },
};
</script>

<style scoped>
#ay {
  height: 50vh;
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


