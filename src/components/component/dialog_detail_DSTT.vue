<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
          <div style="cursor: pointer;"  v-bind="props" @click="handclick" > {{ items.MaMuc }} </div>
        </template>
        <v-card class="pl-10 pr-10">
            <div class="pt-4 pb-4" style="color:rgb(26, 93, 250)">
                <b style="float: left; font-size: 20px; ">
                    Thông tin thủ tục hành chính
                </b>
                <!-- <v-spacer></v-spacer> -->
                <button  @click="dialog = false" style=" padding: 4px 8px; float: right; box-shadow: none; border: solid 1px rgb(26, 93, 250);" >
                     <v-icon>mdi-keyboard-return</v-icon> Quay lại
                </button>
            </div>
            <!-- <br/> -->
            <hr style=" border-bottom: 2px solid rgb(26, 93, 250);"/>
          <table width="100%" id="detail_td">
              <tr>
                <td id="detail_td1">Mã thủ tục</td><td>{{ data.MaMuc }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Tên thủ tục</td><td>{{data.TenMuc}}</td>
              </tr>
              <tr>
                <td id="detail_td1"> Loại thủ tục</td><td>{{ data.LoaiTTHC? data.LoaiTTHC.TenMuc : "" }}</td>
              </tr>
              <tr>
                <td id="detail_td1"> Cơ quan có thẩm quyền</td><td>{{ data.CoQuanCoThamQuyen? join_text(data.CoQuanCoThamQuyen,"TenMuc"):"" }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Cơ quan thực hiện</td> <td>{{ data.CoQuanThucHien? join_text(data.CoQuanThucHien,"TenMuc"):'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Cơ quan phối hợp</td> <td>{{ data.CoQuanPhoiHop? join_text(data.CoQuanPhoiHop,"TenMuc"):'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Cấp thực hiện thủ tục</td><td>{{ data.CapThucHien? join_text(data.CapThucHien,"TenMuc"):'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Đối tượng thực hiện</td><td>{{ data.DoiTuongThucHien? join_text(data.DoiTuongThucHien,"TenMuc"):'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Lĩnh vực thực hiện</td><td>{{ data.LinhVucThucHien? join_text(data.LinhVucThucHien,'TenMuc'):'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Cơ quan được ủy quyền</td><td>{{ data.CoQuanDuocUyQuyen? join_text(CoQuanDuocUyQuyen,'TenMuc'):'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Mức độ</td><td>{{ data.MucDo? join_text(data.MucDo,"TenMuc") :''  }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Trạng thái dữ liệu</td><td>{{ data.TrangThaiDuLieu? join_text(data.TrangThaiDuLieu,'TeMuc') :'' }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Yêu cầu, điều kiện thực hiện</td><td>{{ data.YeuCau }}</td>
              </tr>
              <tr>
                <td id="detail_td1">Mô tả</td><td>{{ data.MoTa  }}</td>
              </tr>
              
          </table>

          <hr/>
          <b>Trình tự thực hiện</b>
          <table border="1px">
            <tr>
              <th>Trường hợp</th>
              <th>Trình tự</th>
            </tr>
            <tr v-for=" (item,i) in data.TrinhTuThucHien " :key="i">
              <td>{{ item.TruongHop }}</td><td>{{ item.TrinhTu[0].TenTrinhTu }}</td>
            </tr>
            </table>
          <hr/>
          <b>Cách Thức thực hiện</b>
          <table border="1px">
            <tr>
              <th>Hình thức nộp</th>
              <th>Thời hạn giải quết</th>
              <th>Mô tả</th>
              <th>Phí, lệ phí</th>
            </tr>
            <tr v-for="(item,i) in data.CachThucThucHien" :key="i">
              <td>{{ item.Kenh.TenMuc }}</td>
              <td>{{ item.ThoiGian[0].ThoiGianGiaiQuyet }} {{ item.ThoiGian[0].DonViTinh }}</td>
              <td>{{ item.ThoiGian[0].MoTa }}</td>
              <td>{{ item.ThoiGian[0].PhiLePhi.reduce((tong,e)=> tong + Number(e.SoTien) , 0 )}}</td>
            </tr>
            </table>
          <hr/>
          <b>Thành phần hồ sơ</b>
          <table border="1">
            <tr>
              <th>Trường hợp</th>
              <th>Tên giấy tờ</th>
              <th style="width: 20%;">Mẫu đơn, tờ khai</th>
              <th style="width: 15%;">Số lượng</th>
            </tr>

            <!-- <tr v-for="(item,i) in data.ThanhPhanHoSo" :key="i">
              <td :rowspan="2">{{ item.TruongHop }}</td>
            </tr> -->
            <template v-for="(item,i) in data.ThanhPhanHoSo" :key="i">
              <tr v-for="(item2 , i2) in item.GiayTo " :key="i2">
                <td v-if="i2==0" :rowspan="item.GiayTo.length">{{ item2.TruongHop }}</td>

                <td>{{ item2.TenGiayTo }}</td>
                <td><a :href="item2.DinhKem.url">{{ item2.DinhKem.TenMauDon }}</a></td>
                <td>
                  <div>Bản chính: {{ item2.SoBanChinh }}</div>
                  <div>Bản sao: {{ item2.SoBanSao }}</div>
                </td>
              </tr>
            </template>
            </table>
          <hr/>
          <b>Kết quả thực hiện:</b>
          <table border="1">
            <tr>
              <th>Mã kết quả</th>
              <th>Tên kết quản</th>
              <th>Đính kèm</th>
            </tr>
            <tr v-for="(item, i) in data.KetQuaThucHien " :key="i">
              <td>{{ item.MaKetQua }}</td>
              <td>{{ item.TenKetQua }}</td>
              <td><a :href="item.DinhKem.url">{{ item.DinhKem.TenTep }}</a> </td>
            </tr>

            </table>
          <hr/>
          <b>Căn cứ pháp lý</b>
          <table border="1">
            <tr>
              <th>Số ký hiệu</th>
              <th>Trích yếu</th>
              <th>Ngày ban hành </th>
              <th>Ngày hiệu lực</th>
              <th>Địa chỉ truy cập</th>
              <th>Cơ quan ban hành</th>
            </tr>

            <tr v-for="(item, i) in data.CanCuPhapLy" :key="i">
              <td>{{ item.SoVanBan }}</td>
              <td>{{ item.TenVanBan }}</td>
              <td>{{ item.NgayBanHanh.replace(/-/g, '/') }}</td>
              <td>{{ item.NgayHieuLuc.replace(/-/g, '/') }}</td>
              <td><a :href="item.DiaChiTruyCap">{{ item.DiaChiTruyCap }}</a> </td>
              <td>{{ item.CoQuanBanHanh.TenMuc }}</td>
            </tr>

          </table>

        </v-card>
      </v-dialog>
    </v-row>
  </template>
  
  <script>
import { get_DetailThuTuc } from '@/api/api';
import { ref } from 'vue';

    export default {
       
        name:"detailDSTT",
        props:["item"],
        setup(props){
            const items = ref(props.item)
            const dialog = ref(false)
            const data = ref({})
            const handclick=()=>{
                items.value = props.item
                get_DetailThuTuc(props.item.primKey).then((data_)=>{
                  data.value = data_.data.resp
                  console.log('ay',data_.data.resp.CachThucThucHien[0].ThoiGian)
                })

            }

            // hàm này dùng để nối chuỗi (đỡ phải khai báo nhiều)
            const join_text =(arr,path)=>{ // không thả trực tếp mảng vào hàm mà phải qua một bước kiểm tra mảng có tồn tại (vấn đề bất đồng bộ)
              if(arr.length>0)
              return  arr.map(e=>e[path]).join(", ")

            }

            

            return {
                dialog,
                items,
                handclick,
                data,
                join_text
            }

        }
        



    }
  </script>
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
  </style>
  <style scoped>
    th{
      /* background-color: rgb(166, 242, 255); */
      padding: 0 2px;
    }

    td{
      font-size: 14px;
      white-space: pre-wrap;
      padding: 8px;
    }

    table{
      border-collapse: collapse;
    }
    hr{
      border-bottom: solid 1px rgb(218, 218, 218);
      margin: 10px 0;
    }

    #detail_td>tr{
      border-bottom: solid 1px rgb(218, 218, 218);
    }

    #detail_td1{
      padding: 8px 4px;
      width: 30%;
    }
  </style>