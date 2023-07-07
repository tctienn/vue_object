<template>
    <v-app id="inspire" v-show="false">
      <!-- <v-system-bar>
        <v-spacer></v-spacer>
  
        <v-icon>mdi-file-document-plus-outline</v-icon>
        <v-icon>mdi-circle</v-icon>
  
        <v-icon>mdi-triangle</v-icon>
      </v-system-bar> -->
  
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

          <div style="color: white;"> {{ user }}  </div>
          <!-- <v-icon
          start
          icon="mdi-arrow-left"
          ></v-icon>
            <v-icon>mdi-file-document-plus-outline</v-icon>
            <span class="mdi mdi-account"></span> -->
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
  
      <v-main >
        <v-card >
          <v-card-text  style="display: flex; align-items: center; font-size: 30px; text-transform: uppercase; font-family: system-ui; "> 
            <img src="../assets/Coat_of_arms_of_Vietnam2.png" style="width: 3.4%; margin-right: 10px;"/>
              Hệ thống giám sát và Đánh giá thích ứng biến đổi khí hậu 
          </v-card-text> 
        </v-card>
        
        <v-container
          class="py-2 px-6"
          fluid
        >
        

        <div style="display: flex;">
          <div class="title">
            CHI TIẾT BÁO CÁO
            
          </div>
          <div class="triangle-up"></div>
          
          
        </div>
        <hr style=" border: solid blue 1px; "/>
        
        <v-card flat>
          Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biến đổi khí hậu được xây dựng và ban hành
        </v-card>
        
        <v-row align="center" justify="space-between">
          <v-col class="color">
            <b style="color: black;">
              Kỳ báo cáo: 
            </b>
            Quý 1 năm 2022
          </v-col>
          <v-col class="color">
            <b style="color: black;">
              Mã báo cáo:
            </b>
            BC-2200001
          </v-col>
          <v-col class="color">
            <b style="color: black;">
              Mã báo cáo:
            </b>
            BC-2200001
          </v-col>
          <v-col class="color">
            <b style="color: black;">
              Tình trạng
            </b>
            Đang sử lý
          </v-col>
        </v-row>
        <v-card flat class="pt-1 pr-1 pb-1 pl1 mt-4 mb-4">
          <v-btn  style="float: right;" color="blue">
            <v-icon >
              mdi-plus-circle-outline
            </v-icon>
            Thêm thành phần
          </v-btn>
        </v-card>
        <div style="display: flex;">
          <div class="title">
            DÁNH SÁCH BÁO CÁO
          </div>
          <div class="triangle-up"></div>
        </div>
        <hr style=" border: solid blue 1px; "/>
        
        <v-card >
          Số lượng văn bản quy phạm pháp luật liên quan đến thích ứng biến đổi khí hậu được xây dựng và ban hành
        </v-card>
        
        <!-- ///////////////////// main -->

        <v-main class=" pa-0">
          <v-container class="scrollable ma-0 pa-2">
            <!-- your content here -->
            <table width= 100% border="2px"  style="border-collapse: collapse; border: #E5E5E5"   >
              <tr>
                <th>
                  STT
                </th>
                <th>
                  Tên văn bản
                </th>
                <th>
                  Số hiệu văn bản/Loại văn bản
                </th>
                <th>
                  Cơ quan được giao
                </th>
                <th>
                  Ngày Phát hành
                </th>

                <th>
                  tình trạng
                </th>
                <th>
                  thao tác
                </th>



              </tr>
              <tr
                v-for="item in 1"
                :key="item"
              >
                <td>{{ item }}</td>
                <td> Văn bản 01 </td>
                <td>121/QĐ Quyết định</td>
                <td>Cục hàng hải</td>
                <td>12/12/2022</td>
                <td>Đang sử lý</td>
                <td>
                  <v-icon color="#0468B1" style="cursor: pointer;">mdi-file-find-outline</v-icon>
                  <v-icon color="#0468B1" style="cursor: pointer;">mdi-pencil-box-outline</v-icon>
                  <v-icon color="red" style="cursor: pointer;">mdi-trash-can-outline</v-icon>
                </td>

                
              </tr>
            </table>
          </v-container>
        </v-main>

        <!-- /////////////////// end main -->
          <!-- <v-row>
            <v-col
              v-for="card in cards"
              :key="card"
              cols="12"
              
            >
              <v-card>
  
                <v-list lines="two">
                  <v-list-subheader >{{ card }}</v-list-subheader>
                  <template v-for="n in 6" :key="n">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-avatar color="grey-darken-1"></v-avatar>
                      </template>
  
                      <v-list-item-title>Message {{ n }}</v-list-item-title>
  
                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item>
  
                    <v-divider
                      v-if="n !== 6"
                      :key="`divider-${n}`"
                      inset
                    ></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row> -->
        </v-container>
      </v-main>
      
    </v-app>
  </template>
  
  <script>
    
    import { api_profile } from '@/api/api';

    import { ref } from 'vue';

    export default {
        name:'BaoCao',
        // data: () => ({
        //     cards: ['Today', 'Yesterday'],
        //     drawer: null,
        //     links: [
        //     ['mdi-note-plus-outline', 'Tạo báo cáo'],
        //     ['mdi-send', 'Báo cáo chờ sử lý'],
        //     ['mdi-delete', 'Báo cáo chờ duyệt'],
        //     ['mdi-alert-octagon', 'Tổng hợp báo cáo'],
        //     ['mdi-alert-octagon', 'Kỳ báo cáo'],

        //     ],
        // }),
        setup(){
          const cards = ['Today', 'Yesterday']
          var drawer = '';
          const links = [
            ['mdi-note-plus-outline', 'Tạo báo cáo'],
            ['mdi-autorenew', 'Báo cáo chờ sử lý'],
            ['mdi-clipboard-text-clock-outline', 'Báo cáo chờ duyệt'],
            ['mdi-file-chart-outline', 'Tổng hợp báo cáo'],
            ['mdi-chart-areaspline', 'Kỳ báo cáo'],

          ]

          const user = ref('')
          api_profile.get('').then(data=>{

            user.value = data.data.hoVaTen
            console.log(data)
            }
          )

          return {
            cards,drawer,links,
            user,
            

          }
        }
    }
  </script>
  <style scoped>
    .triangle-up {
      
        width: 0px;
        height: 0px;
        /* background-color: black; */
        /* border-left: 50px solid transparent; */
        border-right: 20px solid transparent;
        border-bottom: 40px solid blue;
      }

    .title{
      /* display:  flex; */
      width:initial;
      background-color: blue ;
      padding: 8px;
      color: white;
    }

    .color{
      color: #0468B1;
    }

    .scrollable {
    max-height: 50vh;  
    /* vh là lấy chiều cao theo chiều cao của sửa sổ xem vh = % */
    overflow-y: auto;
  }

  th{
    background-color: #E3F1FB;
  }
  </style>