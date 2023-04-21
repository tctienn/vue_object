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