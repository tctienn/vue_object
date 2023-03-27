<template>
          <v-dialog
            v-model="dialog"
            style="margin: auto; width: 80%;"
            
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="blue"
                v-bind="props"
                style="float: right;"
              >
                <v-icon >
                    mdi-plus-circle-outline
                </v-icon>
                Thêm thành phần
              </v-btn>
            </template>

            <v-card >
              <v-card  class="pt-5 pb-5 bg-blue" >
                
                <div style="display: flex; justify-content: space-between; width: 95%; margin: auto;">
                  <div style="">
                    Thêm mới chuyên mục tin tức
                  </div>
                  <!-- <v-btn block @click="dialog = false" style="min-width: 0%;">Close Dialog</v-btn> -->
                  <v-icon block @click="dialog = false">
                    mdi-close
                  </v-icon>
                </div>
                
              </v-card>
              <v-card class="ml-4 mt-4" flat>
                  <h4>
                    Mã chuên mục: <span class="text-red">*</span>
                  </h4>
                  <input type="text" class="border_input" style="width: 98%;" placeholder="Nhập mã chuyên mục..." v-model="machuyenmuc"/>
                  <div style="width: 100%;  display: flex;justify-content: space-between; flex-wrap: wrap;" >
                    <div class="input_tt">
                      <h4 >
                        Tên chuyên mục: <span class="text-red">*</span>
                      </h4>
                      <input type="text" style="width: 100%;" class="border_input" placeholder="Nhập tên đầy đủ..." v-model="tenchuyenmuc"/>
                    </div>
                    
                    <div class="input_tt">
                      <h4 >
                        Tên tiếng anh: <span class="text-red">*</span>
                      </h4>
                      <input type="text" style="width: 100%;" class="border_input" placeholder="Nhập tên tiếng anh..." v-model="tentiengAnh"/>
                    </div>
                    
                    <div class="input_tt">
                      <h4 >
                        Số thứ tự: <span class="text-red">*</span>
                      </h4>
                      <input type="text" style="width: 100%;" class="border_input" placeholder="Nhập số thứ tự..." v-model="stt" />
                    </div>

                    <div class="input_tt">
                      <h4 >
                        Nhóm quền: 
                      </h4>
                      <!-- <select class="input_select" multiple>
                        <option value="" >chọn</option>
                        <option value="ddf8e704-436c-49a7-9a49-530cf90a68b2-u3ujiaelx512e8ip">Admin cấp 1</option>
                        <option value="Admin cấp đơn vị">Admin cấp đơn vị</option>
                      </select> -->

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

                      {{ select.map(e=>e.state).join(',') }}
                    </div>

                    <div class="input_tt">
                      <h4 >
                        Chuyên mục cha: 
                      </h4>
                      
                      <select class="input_select" v-model="chuyenmuccha">
                        <option value="" >chọn</option>
                        <option value="Tin tức - sự kiện">Tin tức - sự kiện</option>
                        <option value="Tin trong nước">Tin trong nước</option>
                      </select>
                    </div>

                    <div class="input_tt">
                      <h4 >
                        Tình trạng: 
                      </h4>
                      <select class="input_select" v-model="tinhtrang">
                        <option value="" >
                          chọn
                        </option>
                        <option value="Hoạt động">Hoạt động</option>
                      </select>
                    </div>
                  </div>
                  
              </v-card>
              <v-card-actions class="mt-10 mb-10" style="margin: auto;">
                <v-btn color="white" class="bg-red"  style="width: max-content;" @click="dialog = false" ><v-icon>mdi-close</v-icon> Thoát</v-btn>
                <v-btn color="white" class="bg-blue" style="width: max-content;" @click="click_them_tt()" ><v-icon>mdi-file-document-plus-outline</v-icon> Thêm mới</v-btn>
              </v-card-actions>
             <!-- <v-card v-for="(item, i) in select" :key="i">
                {{ item }}
             </v-card> -->
            </v-card>
          </v-dialog>
</template>

<script>
import { ref } from 'vue';
import { them_tt } from '@/api/api';

export default {
    name:'DiaLog',
    setup(props,contex){
        const dialog = ref(false)
        const machuyenmuc = ref('test')
        const tenchuyenmuc = ref('test')
        const tentiengAnh = ref('')
        const stt = ref('')
        const chuyenmuccha =ref('')
        const nhomquyen = ref('')
        const tinhtrang = ref('')

 
        const select = ref([])
        
        const items = ref([
          {  MaDinhDanhNhomQuyen: 'ddf8e704-436c-49a7-9a49-530cf90a68b2-u3ujiaelx512e8ip',TenNhomQuyen: 'Quản trị tin bài' },
          { MaDinhDanhNhomQuyen: 'e35d8193-3ce7-4998-a905-122dd40f2872-uasi0qixa6ludtd1', TenNhomQuyen: 'Quản lý sinh viên' },
          { MaDinhDanhNhomQuyen: '23ef333a-b482-486d-bf80-e16e4a63b749-4hyfi6giusohpuze', TenNhomQuyen: 'Quản lý bản đồ số' },
          { MaDinhDanhNhomQuyen: 'c2f1c6d9-c69b-4065-9ec6-a47419048c17-modnuvnl4ynji30u' , TenNhomQuyen: 'test nhóm quyền'  },
          { MaDinhDanhNhomQuyen: 'ba520f8c-60b9-434f-b823-680e62cdd93e-r7y9ahxrrhxbaqwx' , TenNhomQuyen: 'Admin cấp đơn vị' },
        ])
        const click_them_tt =()=>{
            them_tt(
                {"MaChuyenMuc":machuyenmuc.value,
                "TenChuyenMuc":tenchuyenmuc.value,
                "TenTiengAnh":tentiengAnh.value,
                "SoThuTu":stt.value,
                "TinhTrang":tinhtrang.value,
                "MaChuyenMucCha":chuyenmuccha.value,
                "PhanQuyenChuyenMuc":select.value
              }).then( respon=>
                console.log('respon',respon),
                dialog.value = false,
                contex.emit('themtt',  {"MaChuyenMuc":machuyenmuc.value,
                "TenChuyenMuc":tenchuyenmuc.value,
                "TenTiengAnh":tentiengAnh.value,
                "SoThuTu":stt.value,
                "TinhTrang":tinhtrang.value,
                "MaChuyenMucCha":chuyenmuccha.value,
                "PhanQuyenChuyenMuc":select.value,})

            ).catch(error => {
                  console.log('LOI dialog thêm ti tức ',error.response)
              }
            )
              
            // contex.emit('themtt',  {"MaChuyenMuc":machuyenmuc.value,
            //     "TenChuyenMuc":tenchuyenmuc.value,
            //     "TenTiengAnh":tentiengAnh.value,
            //     "SoThuTu":stt.value,
            //     "TinhTrang":tinhtrang.value,
            //     "MaChuyenMucCha":chuyenmuccha.value,
            //     "PhanQuyenChuyenMuc":select.value})
            // console.log(select.value)
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
            items,
            select,

            
        }
    }
}
</script>

<style scoped>
     .border_input{
    border: solid 1px rgb(174, 174, 174);
    border-radius: 5px ;
    padding: 10px;
  }

  .input_tt{
    width: 45%;
    /* border: solid 1px black; */
    margin: 10px 21px 10px 0;

  }

  .input_select{
    border: solid 1px rgb(128, 128, 128);
    width: 100%;
    padding: 10px;
  }
</style>