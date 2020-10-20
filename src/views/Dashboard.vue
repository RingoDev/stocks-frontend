<template>
  <div>
    <div v-if="userDataLoaded && stockDataLoaded">

      <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
        <!-- Card stats -->
        <stats v-if="dataLoaded"></stats>
      </base-header>

      <!--Charts-->
      <b-container fluid class="mt--7">
        <b-row xl="3">
          <b-col xl="12" class="mb-5 mb-xl-0">
            <big-chart :loaded="dataLoaded"></big-chart>
          </b-col>
        </b-row>


        <!--Tables-->
        <b-row class="mt-5">
          <!--        <b-col xl="8" class="mb-5 mb-xl-0">-->
          <!--          <page-visits-table></page-visits-table>-->
          <!--        </b-col>-->
          <b-col xl="12" class=" mb-5 mb-xl-0">
            <position-table></position-table>
          </b-col>


        </b-row>
        <b-row class="mt-5">
          <b-col xl="6" class="mb-5 mb-xl-0">
            <add-position-form></add-position-form>
          </b-col>

          <!--        <b-col xl="6" class="mb-5 mb-xl-0">-->
          <!--          <social-traffic-table></social-traffic-table>-->
          <!--        </b-col>-->

        </b-row>

        <!--End tables-->
      </b-container>
    </div>
    <div style="align-content: center; text-align: center" class="mt-5">
      <div v-if="!userDataLoaded || !stockDataLoaded" class="loader"></div>
    </div>
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
      dataLoaded: false,
      userDataLoaded: false,
      stockDataLoaded: false
    };
  },
  created() {

    this.$store.dispatch('getUserData')
        // eslint-disable-next-line
        .then((response) => {
          this.userDataLoaded = true;

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
          this.stockDataLoaded = true;
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
.loader {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: inline-block;
  border-top: 12px solid #5e72e4;
  border-right: 12px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border-bottom: 12px solid #2bffc6;
  border-left: 12px solid transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
