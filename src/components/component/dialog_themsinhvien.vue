<template>
  
  <v-alert
      :type="pinia_status_load.alert_tatus.type"
      :title="pinia_status_load.alert_tatus.title"
      :text="pinia_status_load.alert_tatus.text"
      style="position: fixed; z-index: 1"
      v-model="pinia_status_load.alert_tatus.check">
  </v-alert>

  <v-dialog v-model="dialog" style="margin: auto; width: 100%">
    <template v-slot:activator="{ props }">

      <v-btn
        class="bg-blue-darken-3 text-body-2"
        density="compact"
        prepend-icon="mdi-filter-variant-plus"
        v-bind="props"
        @click="handClick"
        v-if="!type_input"
      >
        Thêm mới
      </v-btn>
      <v-btn
        color="white"
        class="bg-blue"
        style="width: max-content"
        prepend-icon="mdi-filter-variant-plus"
        v-bind="props"
        @click="handClick_update"
        v-if="type_input"
      >
        Sửa thông tin sinh viên
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
          <!-- <v-alert
            :type="err.type"
            :title="err.title"
            :text="err.text"
            style="position: fixed; z-index: 1"
            v-model="err.show"
          ></v-alert> -->
          <div style="">Thêm mới cán bộ</div>
          <!-- <v-btn block @click="dialog = false" style="min-width: 0%;">Close Dialog</v-btn> -->
          <v-icon block @click="dialog = false"> mdi-close </v-icon>
        </div>
      </div>

      <div class="ma-4" style="height: max-content">
        <div class="input_tt" id="fullWidth" style="margin: 0">
          <h4>Đơn vị: <span class="text-red">*</span></h4>

          <v-select
            v-model="select_coQuanDonVi"
            :items="coQuanDonVi"
            item-title="TenGoi"
            return-object
            variant="outlined"
            density="compact"
            label="chọn"
            :single-line="true"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            required
            @change="v$.name.$touch"
            @blur="v$.name.$touch"
            
            class=""
          ></v-select>
        </div>

        <div
          style="
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          "
        >
          <div class="input_tt">
            <h4>Họ và tên: <span class="text-red">*</span></h4>
            <input
              type="text"
              style="width: 100%"
              :class="checkNull.name.action ? 'red_border' : 'border_input'"
              placeholder="Nhập tên đầy đủ..."
              v-model="hoVaTen"
              @blur="checkNull_on(hoVaTen, 'name')"
              :rules="checkNull_on(hoVaTen, 'name')"
            />
            <p v-show="checkNull.name.action" style="color: red">
              <small>{{ checkNull.name.err }}</small>
            </p>
          </div>
          <div class="input_tt">
            <h4>Số CCCD: <span class="text-red">*</span></h4>
            <input
              style="width: 100%"
              :class="checkNull.cccd.action ? 'red_border' : 'border_input'"
              placeholder="Nhập CCCD..."
              v-model="soCCCD"
              @blur="checkNull_on(soCCCD, 'cccd')"
              @input="checkNull_on(soCCCD, 'cccd')"
            />
            <p v-show="checkNull.cccd.action" style="color: red">
              <small>{{ checkNull.cccd.err }}</small>
            </p>
          </div>
          <div class="input_tt">
            <h4>SDT: <span class="text-red">*</span></h4>
            <input
              type="email"
              style="width: 100%"
              :class="checkNull.SDT.action ? 'red_border' : 'border_input'"
              placeholder="Nhập SDT"
              v-model="SDT"
              @blur="checkNull_on(SDT, 'SDT')"
              @input="checkNull_on(SDT, 'SDT')"
            />
            <p v-show="checkNull.SDT.action" style="color: red">
              <small>{{ checkNull.SDT.err }}</small>
            </p>
          </div>

          <div class="input_tt">
            <h4>Email VNU: <span class="text-red">*</span></h4>
            <input
              :disabled="type_input"
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
              :class="checkNull.ngaySinh.action ? 'red_border' : 'border_input'"
              @input="checkNull_on(ngaySinh, 'ngaySinh')"
            />
            <p v-show="checkNull.ngaySinh.action" style="color: red">
              <small>{{ checkNull.ngaySinh.err }}</small>
            </p>
          </div>

          <div class="input_tt">
            <h4>giới tính:</h4>

            <v-select
              v-model="select_gioiTinh"
              return-object
              item-title="TenMuc"
              :items="gioiTinh"
              style="height: 0"
              variant="outlined"
              density="compact"
              class="custom-height-select"
            ></v-select>
          </div>

          <div class="input_tt" style="width: 100%">
            <span>
              <h4 v-show="type_input">
                {{
                  type_input?(data_sinhVien.ThuMucAnh.length > 0
                    ? "Thêm ảnh:"
                    : "Thêm thư mục"):""
                }}

                
              </h4>

              <dialog_addFoder
                v-if="type_input"
                :sinhvien="data_sinhVien"
                :prop_type="
                  data_sinhVien.ThuMucAnh.length <= 0 ? 'addfoder' : 'addimage'
                "
                @reload="emit_reload"
              />
            </span>
          </div>

          <div class="input_tt" id="fullWidth">
            <h4>địa chỉ:</h4>
            <input
              type="text"
              style="width: 100%"
              v-model="diaChi"
              :class="checkNull.diachi.action ? 'red_border' : 'border_input'"
              @blur="checkNull_on(diaChi, 'diachi')"
              @input="checkNull_on(diaChi, 'diachi')"
            />
            <p v-show="checkNull.diachi.action" style="color: red">
              <small>{{ checkNull.diachi.err }}</small>
            </p>
          </div>

          <div class="input_tt" id="fullWidth">
            <div style="display: flex; justify-content: space-between">
              <div style="width: 31%">
                <h4>Tỉnh/thành:</h4>
                <v-select
                  v-model="select_tinh"
                  :items="data_tinh"
                  item-title="tenMuc"
                  return-object
                  variant="outlined"
                  density="compact"
                  label="chọn"
                  :single-line="true"
                ></v-select>

                <!-- <p v-show="checkNull.tinh.action" style="color: red">
                  <small>{{ checkNull.tinh.err }}</small>
                </p> -->
              </div>
              <div style="width: 31%">
                <h4>Quận/huyện:</h4>
                <v-select
                  v-model="select_quan"
                  :items="data_quan"
                  item-title="tenMuc"
                  return-object
                  variant="outlined"
                  density="compact"
                  label="chọn"
                  :single-line="true"
                ></v-select>

                <!-- <p v-show="checkNull.quan.action" style="color: red">
                  <small>{{ checkNull.quan.err }}</small>
                </p> -->
              </div>
              <div style="width: 31%">
                <h4>Phường/xã:</h4>
                <v-select
                  v-model="select_phuong"
                  :items="data_phuong"
                  item-title="tenMuc"
                  return-object
                  variant="outlined"
                  density="compact"
                  label="chọn"
                  :single-line="true"
                ></v-select>

                <!-- <p v-show="checkNull.xa.action" style="color: red">
                  <small>{{ checkNull.xa.err }}</small>
                </p> -->
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <div class="input_tt">
                <h4>Mã sinh viên: <span class="text-red">*</span></h4>
                <input
                  style="width: 100%"
                  class="border_input"
                  placeholder="Nhập mã sinh viên"
                  v-model="maSV"
                  required
                />
              </div>
              <div class="input_tt">
                <h4>Số báo danh: <span class="text-red">*</span></h4>
                <input
                  :disabled="type_input"
                  style="width: 100%"
                  class="border_input"
                  placeholder="Nhập số báo danh..."
                  v-model="soBaoDanh"
                  required
                />
              </div>

              <div class="input_tt">
                <h4>Mã nhập học: <span class="text-red">*</span></h4>
                <input
                  style="width: 100%"
                  class="border_input"
                  placeholder="Nhập mã nhập học..."
                  v-model="maNhapHoc"
                  required
                />
              </div>
              <div class="input_tt">
                <h4>Số hồ sơ: <span class="text-red">*</span></h4>
                <input
                  :disabled="type_input"
                  style="width: 100%"
                  class="border_input"
                  placeholder="Nhập số hồ sơ..."
                  v-model="SoHoSo"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-card-actions class="mt-5 mb-10" style="margin: auto">
        <v-btn
          color="white"
          class="bg-red"
          style="width: max-content"
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
          Thoát
        </v-btn>
        <v-btn
          color="white"
          class="bg-blue"
          style="width: max-content"
          @click="!type_input ? click_them() : updateSV()"
        >
          <v-icon>mdi-file-document-plus-outline</v-icon>
          {{ !type_input ? "Thêm mới" : "Cập nhật" }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch } from "vue";
// import { them_tt } from '@/api/api';
import Datepicker from "vue3-datepicker";
import {
  get_coquandonvi,
  get_gioitinh,
  get_phuong,
  get_quan,
  get_tinh,
  post_capNhatSinhVien,
  post_themSinhVien,
} from "@/api/api";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import dialog_addFoder from "./dialog_addFoder.vue";
import { sinhvien_model } from "./model/sinhvien.js";
import { status_load  } from "@/pinia/Store";
import { toRefs } from "vue";

export default {
  name: "DiaLog_themcsinhvien",
  components: {
    Datepicker,
    dialog_addFoder,
  },
  props: ["typee"],
  emits: ["reloadd"],
  setup(props, { emit }) {
    
    const type_input = ref(props.typee.type == "update" ? true : false);
    const data_sinhVien = ref(props.typee.data);

    const dialog = ref(false);

    const email = ref("");
    const diaChi = ref("");
    const coQuanDonVi = ref([]);
    const select_coQuanDonVi = ref([]);
    const hoVaTen = ref("test");
    const soCCCD = ref("");
    const SDT = ref("");
    const maSV = ref("test");
    const soBaoDanh = ref("");
    const maNhapHoc = ref("");
    const SoHoSo = ref("");

    const select_tinh = ref();
    const data_tinh = ref([]);
    const select_quan = ref();
    const data_quan = ref([]);
    const select_phuong = ref();
    const data_phuong = ref();

    const ngaySinh = ref();
    // date1.toDateString() để lấy ngayf tháng năm

    const gioiTinh = ref([]);
    const select_gioiTinh = ref([]);

    // dùng pinia để lấy trạng thái load lại trang thay cho việc emit liên tục qua 2 component (tránh bị chết ui dialog của vuetify)
    const pinia_status_load = status_load();
    // const pinia_status = alert_tatus()
    const emit_reload = () => {
      emit("reloadd"); ///!!!!!
      console.log("reload");
    };

    const err = ref({
      show: false,
      text: "xem lại thông tin nhập",
      type: "error",
      title: "lỗi",
    });

    // đổ dữ liệu của sinh viên được chọn vào các thẻ input trong update
    const handClick_update = () => {
      get_coquandonvi().then((data) => {
        coQuanDonVi.value = Array.from(data.data.content, (e) => ({
          type: e.type,
          MaHanhChinh: e.maHanhChinh,
          TenGoi: e.tenGoi,
          TenTiengAnh: e.tenTiengAnh,
          TenVietTat: e.tenVietTat,
        }));

        // console.log(" get cơ quan đơn vị ", coQuanDonVi.value);
        // console.log(" select cơ quan đơn vị ", props.typee.data.CoQuanDonVi);
        ///////////////////////////
        select_coQuanDonVi.value = props.typee.data.CoQuanDonVi;
      });

      soCCCD.value = data_sinhVien.value.ChungMinhThu;
      maSV.value = data_sinhVien.value.MaSinhVien;
      soBaoDanh.value = data_sinhVien.value.SoBaoDanh;

      select_gioiTinh.value = props.typee.data.GioiTinh;

      // console.log("select gioi tinh ", props.typee.data);

      hoVaTen.value = data_sinhVien.value.HoVaTen;
      maNhapHoc.value = data_sinhVien.value.MaNhapHoc;
      SoHoSo.value = data_sinhVien.value.SoHoSo;
      ngaySinh.value = new Date(data_sinhVien.value.NgaySinh);
      email.value = data_sinhVien.value.EmailVNU;
      diaChi.value = data_sinhVien.value.DiaChiThuongTru.SoNhaChiTiet;
      getTinh().then(() => {
        // dùng cái này để đổ sẵn dữ liệu vào thẻ select (trong thẻ select thường nếu muốn chọn sắn một giá trị trong thẻ select thì phải đổ sẵn dữ liệu vào cho nó)

        select_tinh.value = data_tinh.value.find(
          (e) => e.maMuc == data_sinhVien.value.DiaChiThuongTru.TinhThanh.MaMuc
        );

        get_quan(select_tinh.value.maMuc).then((dataQuan) => {
          data_quan.value = dataQuan.data.content;

          select_quan.value = data_quan.value.find(
            (e) => e.maMuc == props.typee.data.DiaChiThuongTru.QuanHuyen.MaMuc
          );

          get_phuong(select_quan.value.maMuc).then((dataphuong) => {
            dataphuong = dataphuong.data.content;

            data_phuong.value = dataphuong;
            select_phuong.value = data_phuong.value.find(
              (e) => e.maMuc == props.typee.data.DiaChiThuongTru.PhuongXa.MaMuc
            );
          });
        });
      });

      select_coQuanDonVi.value.maHanhChinh = data_sinhVien.value.MaHanhChinh;
      select_coQuanDonVi.value.tenGoi = data_sinhVien.value.TenGoi;

      SDT.value = data_sinhVien.value.DanhBaLienLac.SoDienThoai;
    };

    const handClick = () => {
      get_coquandonvi().then((data) => {
        coQuanDonVi.value = Array.from(data.data.content, (e) => ({
          type: e.type,
          MaHanhChinh: e.maHanhChinh,
          TenGoi: e.tenGoi,
          TenTiengAnh: e.tenTiengAnh,
          TenVietTat: e.tenVietTat,
        }));
      });

      getTinh();
    };

    const ay = ref({}); /// biến này lưu biến đối tượng trong sự kiện post thêm cán bộ
    const click_them = () => {
      ay.value = {
        ChungMinhThu: soCCCD.value,
        MaSinhVien: maSV.value,
        SoBaoDanh: soBaoDanh.value,
        GioiTinh: {
          type: "C_GioiTinh",
          MaMuc: select_gioiTinh.value.maMuc,
          TenMuc: select_gioiTinh.value.tenMuc,
        },
        HoVaTen: hoVaTen.value,
        MaNhapHoc: maNhapHoc.value,
        SoHoSo: SoHoSo.value,
        NgaySinh: ngaySinh.value,
        EmailVNU: email.value,
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
        CoQuanDonVi: {
          MaHanhChinh: select_coQuanDonVi.value.MaHanhChinh,
          TenGoi: select_coQuanDonVi.value.TenGoi,
        },
        TrangThaiTaiKhoan: "",
        DanhBaLienLac: {
          SoDienThoai: SDT.value,
        },
      };
      post_themSinhVien(ay.value)
        .then(() => {
          console.log("thêm sinh viên thành công");
          dialog.value = false;
          // emit_reload();
          pinia_status_load.load();
          pinia_status_load.alert("thành công", "cập nhật thành công" , "success")

          err.value = {
            show: true,
            text: "thêm thành công",
            type: "success",
            title: "thành công",
          };
          setTimeout(() => {
            err.value.show = false;
          }, 4000);
        })
        .catch((err) => {
          console.log("err: ", err);
          // xử lý lỗi ở đây
          pinia_status_load.alert("Thất bại", "Thêm thất bại" , "error")
          err.value = {
            show: true,
            text: "xem lại thông tin nhập",
            type: "error",
            title: "lỗi",
          };

          setTimeout(() => {
            err.value.show = false;
          }, 4000);
        });

      // dialog.value = false;
    };
    var data = {};
    const updateSV = () => {
      data = sinhvien_model(
        soCCCD.value,
        maSV.value,
        soBaoDanh.value,
        select_gioiTinh.value.MaMuc,
        select_gioiTinh.value.tenMuc,
        hoVaTen.value,
        maNhapHoc.value,
        SoHoSo.value,
        ngaySinh.value,
        email.value,
        diaChi.value,
        select_tinh.value.maMuc,
        select_tinh.value.tenMuc,
        select_tinh.value.type,
        select_quan.value.maMuc,
        select_quan.value.tenMuc,
        select_quan.value.type,
        select_phuong.value.maMuc,
        select_phuong.value.tenMuc,
        select_phuong.value.type,
        select_coQuanDonVi.value.MaHanhChinh,
        select_coQuanDonVi.value.TenGoi,
        "",
        SDT.value
      );

      post_capNhatSinhVien(data_sinhVien.value.PrimKey, data)
        .then(() => {
          console.log("cap nhat thanh cong ");
          dialog.value = false;
          pinia_status_load.load();
          pinia_status_load.alert("thành công", "cập nhật thành công" , "success")
          // emit_reload();
          err.value = {
            show: true,
            text: "thêm thành công",
            type: "success",
            title: "thành công",
          };
          setTimeout(() => {
            err.value.show = true;
          }, 4000);
        })
        .catch((errs) => {
          console.log("cập nhật lỗi ", errs);
          pinia_status_load.alert(" Cập nhật không thành công", "Xem lại các trường nhập" , "error")
          err.value = {
            show: true,
            text: "xem lại thông tin nhập",
            type: "error",
            title: "lỗi",
          };

          setTimeout(() => {
            err.value.show = false;
          }, 4000);

        });
    };


    const {typee} = toRefs(props)
    watch(typee, ()=>{
      
      data_sinhVien.value = typee.value.data;
      
      

      
    })
    
    watch(select_tinh, (newName) => {
      // gọi hàm select_coQuanDonVi  khi name thay đổi
      // console.log("watch tỉnh", newName, oldName);
      
      get_quan(newName.maMuc).then((datas) => {
        data_quan.value = datas.data.content;
        data_phuong.value = [];
      });
      // if (newName != null) {
      // }
    });

    watch(select_quan, (n) => {
      // console.log("watch quan", n);

      get_phuong(n.maMuc).then((datas) => {
        data_phuong.value = datas.data.content;
      });
    });

    const getTinh = async () => {
      data_tinh.value = await get_tinh();
      data_tinh.value = data_tinh.value.data.content;
    };
    // getTinh();

    get_gioitinh().then((datas) => {
      gioiTinh.value = Array.from(datas.data.content, (e) => ({
        type: e.type,
        MaMuc: e.maMuc,
        TenMuc: e.tenMuc,
      }));

      // console.log("gioi tinh", gioiTinh.value);
    });

    ////////// check null validete
    const err_text = "Không được để trống.";
    const state = ref({
      select_coQuanDonVi,
    });
    const rules = {
      name: { required },
      // TinhThanh: { required },
    };

    const v$ = useVuelidate(rules, state);
    //
    const checkNull = ref({
      name: {
        action: false,
        err: "không được để trống",
      },
      cccd: {
        action: false,
        err: "nhập sai định dạng",
      },
      SDT: {
        action: false,
        err: "nhập sai định dạng",
      },
      ngaySinh: {
        action: false,
        err: "Định dạng ngày sinh là: ngày/tháng/năm",
      },
      diachi: {
        action: false,
        err: "không được để trống",
      },
      tinh: {
        action: false,
        err: "không được để trống",
      },
      quan: {
        action: false,
        err: "không được để trống",
      },
      xa: {
        action: false,
        err: "không được để trống",
      },
    });

    const checkNull_on = (value, style) => {
      var RegExp;
      switch (style) {
        case "name":
          checkNull.value[style].action = value == "" ? true : false;
          break;
        case "cccd":
          RegExp = /^\d{12}$/;
          checkNull.value[style].action = RegExp.test(value) ? false : true;
          break;
        case "SDT":
          RegExp = /^0[0-9]{9}$/;
          checkNull.value[style].action = RegExp.test(value) ? false : true;
          break;

        case "gmail":
          RegExp = /^[a-z0-9]([\\w\\.]*[a-z0-9])?@gmail\\.com$/i;
          checkNull.value[style].action = RegExp.test(value) ? false : true;
          break;

        case "ngaySinh":
          checkNull.value[style].action = !value;
          break;

        case "diachi":
          checkNull.value[style].action = !value;
          break;
        case "tinh":
          checkNull.value[style].action = !value;
          break;

        case "quan":
          checkNull.value[style].action = !value;
          break;

        case "xa":
          checkNull.value[style].action = !value;
          break;
      }
    };

    ///////////
    return {
      dialog,
      email,

      coQuanDonVi,
      click_them,

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

      hoVaTen,
      soCCCD,
      SDT,
      maSV,
      soBaoDanh,
      maNhapHoc,
      SoHoSo,

      v$,
      err_text,
      state,
      checkNull,
      checkNull_on,
      err,
      type_input,
      data_sinhVien,
      updateSV,
      handClick_update,
      emit_reload,
      pinia_status_load
    };
  },
};
</script>

<style>
.v-field__outline {
  --v-field-border-opacity: 0.2;
}
</style>

<style  scoped>
#ay {
  height: 100vh;
  overflow-y: scroll;
}
.border_input {
  border: solid 1px #cacaca;

  padding: 3px 7px;
  border-radius: 6px;

  outline: none;
}
.red_border {
  border: solid 1px rgb(255, 8, 8);

  padding: 3px 7px;
  border-radius: 6px;

  outline: none;
}

.input_tt {
  width: 49%;
  /* border: solid 1px black; */
  margin: 10px 0px 10px 0;
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