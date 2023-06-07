<template>
  <div v-if="v$.name.$error">Name field has an error.</div>
  <form>
    <v-text-field
      v-model="state.names"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      :counter="10"
      label="Name"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      label="E-mail"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :items="items"
      :error-messages="v$.select.$errors.map((e) => e.$message)"
      label="Item"
      required
      @change="v$.select.$touch"
      @blur="v$.select.$touch"
    ></v-select>

    <v-checkbox
      v-model="state.checkbox"
      :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
      label="Do you agree?"
      required
      @change="v$.checkbox.$touch"
      @blur="v$.checkbox.$touch"
    ></v-checkbox>

    <v-btn class="me-4" @click="v$.$validate"> submit </v-btn>
    <v-btn @click="clear"> clear </v-btn>
  </form>

  <v-textarea
    solo
    label="Nhập câu trả lời..."
    hide-details="auto"
    :rules="[ruless.required]"
    @blur="ay"
    class="flex input-form"
    rows="7"
  ></v-textarea>
  <div v-if="oy">loi</div>
</template>
    <script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

export default {
  name: "DemoChecknull",
  setup() {
    const initialState = {
      name: "",
      email: "",
      select: null,
      checkbox: null,
    };

    // const state = reactive({
    //   ...initialState,
    // });

    const oy = ref(false);
    const ay = (val) => {
      console.log("ay", val.srcElement._value);
      if (!!val.srcElement._value == false) {
        oy.value = true;
      } else oy.value = false;
    };

    const ruless = ref({
      required: (val) => !!val || "Không được để trống.",
      file: (value) =>
        !value || value.size < 2000000 || "Kich thước fle nhỏ hơn 2MB",
    });

    const state = ref({
      names: "",
      email: "",
      select: null,
      checkbox: null,
    });
    const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

    const rules = {
      name: { required },
      email: { required, email },
      select: { required },
      items: { required },
      checkbox: { required },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    return { state, items, clear, v$, ruless, ay, oy };
  },
};
</script>