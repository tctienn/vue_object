<template>
  <v-dialog v-model="dialog" style="margin: auto; width: 80%">
    <template v-slot:activator="{ props }">
      <v-icon
        v-bind="props"
        @click="handClick"
        color="red"
        style="cursor: pointer"
        size="{1}"
        title="sửa"
        >mdi-pencil</v-icon
      >
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
          <div style="">Cập nhật cán bộ</div>
          <!-- <v-btn block @click="dialog = false" style="min-width: 0%;">Close Dialog</v-btn> -->
          <v-icon block @click="dialog = false"> mdi-close </v-icon>
        </div>
      </div>
      <div class="ml-4 mt-4" style="height: max-content">
        <h4>Mã cán bộ: <span class="text-red">*</span></h4>
        <input
          type="text"
          class="border_input"
          style="width: 98%"
          placeholder="Nhập mã chuyên mục..."
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
          <div class="input_tt">
            <h4>họ và tên: <span class="text-red">*</span></h4>
            <input
              type="text"
              style="width: 100%"
              class="border_input"
              placeholder="Nhập tên đầy đủ..."
              v-model="tenCanBo"
              required
            />
          </div>

          <div class="input_tt">
            <h4>Email VNU: <span class="text-red">*</span></h4>
            <input
              type="email"
              style="width: 100%"
              class="border_input"
              placeholder="Nhập EMAIL..."
              v-model="email"
              required
            />
          </div>

          <div class="input_tt">
            <h4>Ngày sinh: <span class="text-red">*</span></h4>
            <!-- <input type="text" style="width: 100%;" class="border_input" placeholder="Nhập số thứ tự..." v-model="stt" /> -->
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
            <h4>giới tính:</h4>

            <v-select
              v-model="select_gioiTinh"
              return-object
              item-title="tenMuc"
              :items="gioiTinh"
              style="height: 0"
              variant="solo"
              density="compact"
              class="custom-height-select"
            ></v-select>
            {{ "ui" + select_gioiTinh.tenMuc }}

            <!-- {{ select.map((e) => e.state).join(",") }} -->
          </div>

          <div class="input_tt" id="fullWidth">
            <h4>địa chỉ:</h4>
            <input
              type="text"
              class="border_input"
              style="width: 98%"
              v-model="diaChi"
            />

            <!-- <select class="input_select" v-model="chuyenmuccha">
              <option value="">chọn</option>
              <option value="Tin tức - sự kiện">Tin tức - sự kiện</option>
              <option value="Tin trong nước">Tin trong nước</option>
            </select> -->
          </div>

          <div class="input_tt" id="fullWidth">
            <div style="display: flex; justify-content: space-between">
              <div style="width: 31%">
                <h4>Tỉnh/thành:</h4>
                <select class="input_select" v-model="select_tinh">
                  <option v-for="(e, i) in data_tinh" v-bind:key="i" :value="e">
                    {{ e.tenMuc }}
                  </option>
                </select>
              </div>
              <div style="width: 31%">
                <h4>Quận/huyện:</h4>
                <select class="input_select" v-model="select_quan">
                  <option v-for="(e, i) in data_quan" :key="i" :value="e">
                    {{ e.tenMuc }}
                  </option>
                </select>
                <br />
              </div>
              <div style="width: 31%">
                <h4>Phường/xã:</h4>
                <select class="input_select" v-model="select_phuong">
                  <option v-for="(e, i) in data_phuong" :key="i" :value="e">
                    {{ e.tenMuc }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="input_tt" id="fullWidth">
            <h4>cơ quan đợn vị: <span class="text-red">*</span></h4>

            <v-select
              v-model="select_coQuanDonVi"
              :items="coQuanDonVi"
              label="chọn"
              item-title="tenGoi"
              return-object
              required
            ></v-select>

            {{ select.map((e) => e.state).join(",") }}
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
        <v-btn
          color="white"
          class="bg-blue"
          style="width: max-content"
          @click="click_them_tt()"
          ><v-icon>mdi-file-document-plus-outline</v-icon> cập nhật</v-btn
        >
      </v-card-actions>
      <!-- <v-card v-for="(item, i) in select" :key="i">
          {{ item }}
       </v-card> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch } from "vue";
// import { them_tt } from '@/api/api';
import Datepicker from "vue3-datepicker";
import {
  get_gioitinh,
  get_phuong,
  get_quan,
  get_tinh,
  post_updateCanBo,
} from "@/api/api";

export default {
  name: "DiaLog_themcanbo",
  components: {
    Datepicker,
  },
  props: ["data_props", "itemCheck"],
  setup(props, contex) {
    const dialog = ref(false);
    const maCanBo = ref(props.itemCheck.MaSoCanBo);
    const tenCanBo = ref(props.itemCheck.HoVaTen);
    const email = ref(props.itemCheck.EmailVNU);
    const diaChi = ref(props.itemCheck.diaChiThuongTru.SoNhaChiTiet);
    const coQuanDonVi = ref(props.data_props);
    const select_coQuanDonVi = ref([]);

    const select_tinh = ref({});
    const data_tinh = ref([]);
    const select_quan = ref({});
    const data_quan = ref([]);
    const select_phuong = ref({});
    const data_phuong = ref([]);

    const ngaySinh = ref(new Date());
    // date1.toDateString() để lấy ngayf tháng năm

    const select = ref([]);

    const gioiTinh = ref([]);
    const select_gioiTinh = ref({});

    // const handClick = async () => {
    //   // chọn sẵn giới tính
    //   select_gioiTinh.value = gioiTinh.value.filter(
    //     (e) => e.maMuc == props.itemCheck.GioiTinh.MaMuc
    //   );

    //   const tinh = await get_tinh();
    //   data_tinh.value = tinh.data.content;
    //   select_tinh.value = data_tinh.value.find(
    //     (e) => e.maMuc == props.itemCheck.diaChiThuongTru.TinhThanh.MaMuc
    //   );

    //   const quan = await get_quan(
    //     props.itemCheck.diaChiThuongTru.TinhThanh.MaMuc
    //   );
    //   data_quan.value = quan.data.content;
    //   select_quan.value = data_quan.value.find(
    //     (e) => e.maMuc == props.itemCheck.diaChiThuongTru.QuanHuyen.MaMuc
    //   );

    //   // console.log("data", select_quan.value.maMuc);
    //   const phuong = await get_phuong(
    //     props.itemCheck.diaChiThuongTru.QuanHuyen.MaMuc
    //   );
    //   data_phuong.value = phuong.data.content;
    //   select_phuong.value = data_phuong.value.find(
    //     (e) => e.maMuc == props.itemCheck.diaChiThuongTru.PhuongXa.MaMuc
    //   );

    //   // console.log("quan", select_quan.value);

    //   // lấy dữ liệu cơ quan đơn vị trừ cha
    //   coQuanDonVi.value = props.data_props;

    //   select_coQuanDonVi.value = coQuanDonVi.value.find(
    //     (e) => e.MaHanhChinh == props.data_props.maHanhChinh
    //   );
    // };
    var a = 0;
    var a2 = 0;
    const handClick = () => {
      // biến này để kiểm soát watch không chạy lần đầu tiên khi handclick
      a = 0;
      a2 = 0;
      // chọn sẵn giới tính
      select_gioiTinh.value = gioiTinh.value.filter(
        (e) => e.maMuc == props.itemCheck.GioiTinh.MaMuc
      );
      get_tinh().then((tinh) => {
        data_tinh.value = tinh.data.content;
        select_tinh.value = data_tinh.value.find(
          (e) => e.maMuc == props.itemCheck.diaChiThuongTru.TinhThanh.MaMuc
        );
      });

      get_quan(props.itemCheck.diaChiThuongTru.TinhThanh.MaMuc).then((quan) => {
        data_quan.value = quan.data.content;
        select_quan.value = quan.data.content.find(
          (e) => e.maMuc == props.itemCheck.diaChiThuongTru.QuanHuyen.MaMuc
        );
        console.log("ayyyyyy", select_quan.value);
      });
      get_phuong(props.itemCheck.diaChiThuongTru.QuanHuyen.MaMuc).then(
        (phuong) => {
          data_phuong.value = phuong.data.content;
          select_phuong.value = phuong.data.content.find(
            (e) => e.maMuc == props.itemCheck.diaChiThuongTru.PhuongXa.MaMuc
          );
        }
      );

      // lấy dữ liệu cơ quan đơn vị trừ cha
      coQuanDonVi.value = props.data_props;
      select_coQuanDonVi.value = coQuanDonVi.value.find(
        (e) => e.MaHanhChinh == props.data_props.maHanhChinh
      );
    };

    const ay = ref({}); /// biến này lưu biến đối tượng trong sự kiện post thêm cán bộ
    const click_them_tt = () => {
      ay.value = {
        MaSoCanBo: maCanBo.value,
        GioiTinh: {
          MaMuc: select_gioiTinh.value.maMuc,
          TenMuc: select_gioiTinh.value.tenMuc,
          type: select_gioiTinh.value.type,
        },
        HoVaTen: tenCanBo.value,
        NgaySinh: 1680627600000,
        ListQuyenCanBo: [],
        EmailVNU: email.value,
        CoQuanDonVi: {
          MaHanhChinh: select_coQuanDonVi.value.maHanhChinh,
          TenGoi: select_coQuanDonVi.value.tenGoi,
        },
        TrangThaiTaiKhoan: "",
        TinhTrangCongTac: {
          TinhTrangCongTac: "",
          CoQuanDonVi: {
            MaHanhChinh: select_coQuanDonVi.value.maHanhChinh,
            TenGoi: select_coQuanDonVi.value.tenGoi,
          },
          ViTriChucDanh: [
            {
              MaDinhDanh: "",
              TenGoi: "",
            },
          ],
        },
        DiaChiThuongTru: {
          SoNhaChiTiet: diaChi.value,
          TinhThanh: {
            MaMuc: select_tinh.value.maMuc,
            TenMuc: select_tinh.value.tenMuc,
            type: select_tinh.value.type,
          },
          QuanHuyen: {
            MaMuc: select_quan.value.maMuc,
            TenMuc: select_quan.value.tenMuc,
            type: select_quan.value.type,
          },
          PhuongXa: {
            MaMuc: select_phuong.value.maMuc,
            TenMuc: select_phuong.value.tenMuc,
            type: select_phuong.value.type,
          },
        },
        PhanQuyenCanBo: [],
      };

      if (
        maCanBo.value == "" ||
        tenCanBo.value == "" ||
        ngaySinh.value == "" ||
        email.value == ""
      ) {
        alert("nhập chưa dủ thông tin");
        return;
      }
      post_updateCanBo(props.itemCheck.PrimKey, ay.value)
        .then(() => contex.emit("updatecanbo"))
        .catch(() => {
          // xử lý lỗi ở đây

          contex.emit("show_err");
        });

      dialog.value = false;
      // console.log(ay.value);
    };

    // get_tinh().then((data) => {
    //   data_tinh.value = data;
    //   console.log("ayyyyyy");
    // });

    watch(ngaySinh, (newName, oldName) => {
      console.log(newName, oldName);
      console.log("ngaf sinh ", newName.getTime());
      // if (newName != null) {
      // }
    });

    watch(select_tinh, (newName, oldName) => {
      // gọi hàm select_coQuanDonVi  khi name thay đổi
      console.log("watch tỉnh", newName, oldName);

      if (a > 0) {
        get_quan(newName.maMuc).then((datas) => {
          data_quan.value = datas.data.content;
        });

        select_phuong.value = {};
      }
      a++;
      // if (newName != null) {
      // }
    });

    watch(select_quan, (n, o) => {
      console.log(n, o);
      console.log("quận", n, o);

      if (a2 > 0) {
        get_phuong(n.maMuc).then((datas) => {
          data_phuong.value = datas.data.content;
        });
      }
      a2++;
    });

    get_gioitinh().then((datas) => {
      gioiTinh.value = datas.data.content;
    });

    // watch(select_gioiTinh, (n, o) => {
    //   console.log("chon", n, o);
    // });

    return {
      dialog,
      maCanBo,
      tenCanBo,
      email,

      coQuanDonVi,
      click_them_tt,

      select,
      ngaySinh,
      select_tinh,
      select_quan,
      select_phuong,
      data_tinh,
      data_quan,
      data_phuong,
      gioiTinh,
      select_gioiTinh,
      select_coQuanDonVi,
      handClick,
      diaChi,
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
}

.input_tt {
  width: 45%;
  /* border: solid 1px black; */
  margin: 10px 21px 10px 0;
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