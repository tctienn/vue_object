<template>
  <v-dialog
    v-model="dialog1"
    style="margin: auto; width: 95%; position: fixed; top: 0"
    persistent
    no-click-animation
  >
  

    <template v-slot:activator="{ props }">
      <v-icon
        color="indigo-darken-4"
        size="20"
        v-bind="props"
        @click="handleClick"
      >
        mdi-clipboard-text
      </v-icon>
    </template>

    <v-card id="ay">
      <div
        class="pt-4 pb-2 pb-4"
        style="background-color: #2161b1; color: white; border-radius: 0 0 0 0"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            width: 95%;
            margin: auto;
          "
        >
          <div>Thông tin chi tiết sinh viên</div>
          <v-icon block @click="dialog1 = false"> mdi-close </v-icon>
        </div>
      </div>

      <div class="body_view">
        <div class="view_left">
          <div>Thông tin cơ bản  </div>
          <br />
          <div class="row_view">
            Họ và tên: <b>{{ data.name }}</b>
          </div>
          <br />
          <hr />
          <br />
          <div class="row_view">
            Ngày sinh: <b>{{ data.ngaysinh }}</b>
          </div>
          <br />
          <hr />
          <br />
          <div class="row_view">
            Số CCCD:<b>{{ data.Scccd }}</b>
          </div>
          <br />
          <hr />
          <br />
          <div class="row_view">
            Giới tính<b>{{ data.gioitinh.TenMuc }}</b>
          </div>
          <br />
          <hr />
          <br />
        </div>
        <div class="view_right">
          <div>Thông tin hành chính</div>
          <br />
          <div class="row_view">
            Mã sinh viên:<b>{{ data.masv }}</b>
          </div>
          <br />
          <hr />
          <br />
          <div class="row_view">
            Email:<b>{{ data.email }}</b>
          </div>
          <br />
          <hr />
          <br />
          <div class="row_view">
            Mã nhập học:<b>{{ data.maNH }}</b>
          </div>
          <br />
          <hr />
          <br />
          <div class="row_view">
            Số báo danh:<b>{{ data.sobaodanh }}</b>
          </div>
          <br />
          <hr />
          <br />
        </div>
      </div>
      <v-card-actions
        style="display: flex; justify-content: flex-end; background: #eee"
      >
        <v-btn
          color="white"
          class="bg-red"
          style="width: max-content"
          @click="dialog1 = false"
          ><v-icon>mdi-close</v-icon> Thoát</v-btn
        >

        <dialog_themsinhvien
          :typee="{ data: datas, type: 'update' }"
          @reloadd="reload"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
import { ref } from "vue";
import dialog_themsinhvien from "./dialog_themsinhvien.vue";
import { watch } from "vue";
import { toRefs } from "vue";

export default {
  name: "DiaLog_ViewSinhvien",
  components: { dialog_themsinhvien },
  props: ["props_sinhvien"],
  emits: ["reload2"],
  setup(propss, { emit }) {
 
   
    const data = ref({
      name: "",
      ngaysinh: "",
      Scccd: "",
      gioitinh: "",
      masv: "",
      email: "",
      maNH: "",
      sobaodanh: "",
    });
    const dialog1 = ref(false);

    const dateTime = new Date(propss.props_sinhvien.NgaySinh);
    
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const dateString = ref(`${day}/${month}/${year}`);

    const datas = ref(propss.props_sinhvien); // dữ liệu trả về đầy đủ của sinh viên

    
    

    const handleClick = () => {
      // console.log("data sinh vien", propss.props_sinhvien);
      data.value = {
        name: propss.props_sinhvien.HoVaTen,
        ngaysinh: dateString.value,
        Scccd: propss.props_sinhvien.ChungMinhThu,
        gioitinh: propss.props_sinhvien.GioiTinh,
        masv: propss.props_sinhvien.MaSinhVien,
        email: propss.props_sinhvien.EmailVNU,
        maNH: propss.props_sinhvien.MaNhapHoc,
        sobaodanh: propss.props_sinhvien.SoBaoDanh,
      };
    };

    // hàm này gửi dữa yêu cầu cập nhật lại dữ liệu trong component cha của nó (gio componet cập nhật sinh viên là con của view và cháu của form quản lý sinh viên)
    const reload = () => {
      // console.log("reload2");
      emit("reload2");
    };

    const {props_sinhvien} = toRefs(propss) 
    watch(props_sinhvien,(news) =>  {
      
      // console.log("view " , props_sinhvien.value.type)
      // console.log("view 2" , news.type)
      
      datas.value = news
      
      data.value = {
        name: news.HoVaTen,
        ngaysinh: dateString.value,
        Scccd: news.ChungMinhThu,
        gioitinh: news.GioiTinh,
        masv: news.MaSinhVien,
        email: news.EmailVNU,
        maNH: news.MaNhapHoc,
        sobaodanh: news.SoBaoDanh,
      };
      
      
    });
    return { handleClick, dialog1, data, datas, reload };
  },
};
</script>
  
  <style  >
#ay {
  height: 66vh;
  overflow-y: scroll;
}

.body_view {
  display: flex;
  justify-content: space-around;
  background-color: #eee;
  padding: 14px;
}

.view_left {
  width: 48%;
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;

  background-color: white;
}
.row_view {
  width: 90%;
  padding: 0 20px 0 20px;
  display: flex;
}
.view_right {
  width: 48%;
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
}
</style>