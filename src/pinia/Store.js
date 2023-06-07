// import { get_menu } from "@/api/api";
import { api_menu } from "@/api/api";
import { defineStore } from "pinia";


export const menu_pina = defineStore("data_load_affterlogin",{
    state:()=>{
        return {
            menu:[],
        }

    },
    actions:{
        async actions_loadmenu(){
            const data = await api_menu.get('/menu/filter?page=0&size=100&keyword=&orderFields=&orderTypes=&tinhTrang=&thamChieu_maMuc=')
            // console.log(data)
            this.menu = data.data.content;
            // console.log(data)
            // alert('')
            // this.menu= data
        }
    },
    getters:{
        pinia_getmenu(state){
            return state.menu
        }
    }

})
export const useCounterStore = defineStore("counter", {
        state: () => {
            return { 
                count: 0,
                menu:[]
            }
        },
        actions: {
            increment() {
                this.count++
            },
            incrementBy5() {
                this.count += 5;
            }
        },
        getters: {
            doublecount: (state) => state.count * 2,
            pina_menu:(state) =>state.menu
        }

    }

)


export const status_load = defineStore("status_load", {
    state: () => {
        return { 
            QL_sv:false,
            status_alert:{
                check : false,
                text :"ok",
                type:"success",
                title:"ok"
      
            }
        }
    },
    actions: {
        load() {
            this.QL_sv = true

            console.log("load")
        },
        unload() {
            this.QL_sv = false;
        },
        alert(title, text , type){
            this.status_alert = {
                check : true,
                text :text,
                type:type,
                title:title
      
            }
            
            setTimeout(() => {
                this.status_alert.check = false;
              }, 4000);
        },
        
    },
    getters: {
        status_load: (state) =>state.QL_sv,
        alert_tatus:(state) => state.status_alert
    }

}

)