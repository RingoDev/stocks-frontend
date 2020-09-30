<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->

        <stats v-if="dataLoaded"></stats>

    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <big-chart :loaded="dataLoaded"></big-chart>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <add-position-form></add-position-form>
        </b-col>
      </b-row>


      <!--Tables-->
      <b-row class="mt-5">
<!--        <b-col xl="8" class="mb-5 mb-xl-0">-->
<!--          <page-visits-table></page-visits-table>-->
<!--        </b-col>-->
        <b-col xl="8" class=" mb-5 mb-xl-0">
          <position-table></position-table>
        </b-col>
<!--        <b-col xl="4" class="mb-5 mb-xl-0">-->
<!--          <social-traffic-table></social-traffic-table>-->
<!--        </b-col>-->
      </b-row>
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>

// Cards
import Stats from "@/views/Dashboard/Stats";

// Charts
import BigChart from "@/views/Dashboard/BigChart";

// Components
import BaseProgress from '@/components/BaseProgress';
import StatsCard from '@/components/Cards/StatsCard';

// Tables
import SocialTrafficTable from './Dashboard/SocialTrafficTable';
import PageVisitsTable from './Dashboard/PageVisitsTable';
import PositionTable from "@/views/Dashboard/PositionTable";

// Forms
import AddPositionForm from "@/views/Dashboard/AddPositionForm";

export default {
  components: {
    //BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
    PositionTable,
    AddPositionForm,
    BigChart,
    Stats
  },
  data() {
    return {
      dataLoaded:false
    };
  },
  created() {
    this.$store.dispatch('getUserData')
        // eslint-disable-next-line
        .then((response) => {

        }).catch(error => {
      // eslint-disable-next-line
          console.log(error)
      if (error.response.status === 403 && error.response.headers.expires === "1")
          // eslint-disable-next-line
        console.log("JWT EXPIRED");
      this.$store.dispatch('logout')
      this.$router.push({name: "auth"})
    });
    this.$store.dispatch('getStockData')
        // eslint-disable-next-line
        .then((response) => {
          this.dataLoaded = true;
        }).catch(error => {
      // eslint-disable-next-line
      console.log(error)
      if (error.response.status === 403 && error.response.headers.expires === "1")
          // eslint-disable-next-line
        console.log("JWT EXPIRED");
      this.$store.dispatch('logout')
      this.$router.push({name: "auth"})
    });

  }


};
</script>
<style>
/*.el-table .cell {*/
/*  padding-left: 0;*/
/*  padding-right: 0;*/
/*}*/
</style>
