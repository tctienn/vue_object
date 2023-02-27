import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
        state: () => {
            return { count: 0 }
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
            doublecount: (state) => state.count * 2
        }

    }

)