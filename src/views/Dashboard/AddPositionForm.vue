<template>
  <card header-classes="bg-transparent">
    <b-row align-v="center" slot="header">
      <b-col>
        <h5 class="h3 mb-0">Add a Position</h5>
      </b-col>
    </b-row>

    <validation-observer v-slot="{handleSubmit}" ref="formValidator">
      <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
        <datalist-input
            :item-list="getStockList"
            alternative
            class="mb-3"
            name="Stock"
            :required="true"
            rules="stock-exists"
            prepend-icon="ni ni-sound-wave"
            placeholder="Enter a stock eg: AMZN"
            v-model="model.stock"
        ></datalist-input>
        <base-input alternative
                    class="mb-3"
                    name="Date"
                    :rules="{required: true}"
                    prepend-icon="ni ni-calendar-grid-58"
                    type="date"
                    v-model="model.date">
        </base-input>
        <base-input alternative
                    class="mb-3"
                    name="Quantity"
                    :rules="{required: true}"
                    prepend-icon="ni ni-archive-2"
                    type="number"
                    placeholder="Enter the amount of stock"
                    v-model="model.quantity">
        </base-input>

        <div class="text-center">
          <base-button type="primary" native-type="submit" class="my-4">Add</base-button>
        </div>
      </b-form>
    </validation-observer>
  </card>
</template>

<script>
import {extend} from 'vee-validate';
import {store} from "@/store";

import DatalistInput from "@/views/Dashboard/DatalistInput";

extend('stock-exists', {
  validate(stock) {
    return store.getters.getStockList.includes(stock.toUpperCase());
  },
  message: 'The stock doesn\'t exist'

});

export default {
  name: "add-position-form",
  components: {
    DatalistInput,
  },
  computed: {
    getStockList() {
      return this.$store.getters.getStockList
    }
  },
  methods: {
    onSubmit() {
      // this will be called only after form is valid. You can do api call here to login
      // eslint-disable-next-line
      console.log(this.model)
      this.$store.dispatch('addPosition', {
        stock: this.model.stock.toUpperCase(),
        date: this.model.date,
        quantity: this.model.quantity
      }).catch(error => {
        if (error.response.status === 403 && error.response.headers.expires === "1")
            // eslint-disable-next-line
          console.log("JWT EXPIRED");
        this.$store.dispatch('logout')
        this.$router.push({name: "auth"})
      })
    }
  },
  data() {
    return {
      model: {
        quantity: 0,
        stock: '',
        date: null,
      },

    }

  },
  created() {
    this.$store.dispatch('getStockList')
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
        }).catch(error => {
      if (error.response.status === 403 && error.response.headers.expires === "1")
          // eslint-disable-next-line
        console.log("JWT EXPIRED");
      this.$store.dispatch('logout')
      this.$router.push({name: "auth"});
    })

  },
}
</script>

<style scoped>

</style>