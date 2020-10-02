<template>
  <div>
    <!--    <div v-for="position in tableData" :key="position.id"><p>{{ position.id }}, {{ position.checked }}</p></div>-->
    <b-card body-class="p-0" header-class="border-0">
      <template v-slot:header>
        <b-row align-v="center">
          <b-col>
            <h3 class="mb-0">Positions</h3>
          </b-col>
          <b-col class="text-right">
            <a href="#" class="btn btn-sm btn-primary">See all</a>
          </b-col>
        </b-row>
      </template>


      <el-table
          class="table-responsive table"
          :data="tableData"
          header-row-class-name="thead-light">
        <el-table-column label="Stock"
                         min-width="40px"
                         prop="stock">
          <template v-slot="{row}">
            <div class="font-weight-600">{{ row.stock }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Quantity"
                         min-width="50em"
                         prop="quantity">
        </el-table-column>
<!--        <el-table-column label="Buy Date"-->
<!--                         min-width="90px"-->
<!--                         prop="date">-->
<!--        </el-table-column>-->

<!--        <el-table-column label="buy value"-->
<!--                         min-width="70em"-->
<!--                         prop="buyValue">-->
<!--        </el-table-column>-->

<!--        <el-table-column label="Current Value"-->
<!--                         min-width="90px"-->
<!--                         prop="currentValue">-->
<!--        </el-table-column>-->
<!--        <el-table-column label="Change in %"-->
<!--                         min-width="60px"-->
<!--                         prop="percentage">-->
<!--        </el-table-column>-->
        <el-table-column label="Visible"
                         min-width="40px">
          <template slot-scope="scope">
            <el-switch
                @change="switchChecked(scope.row.id)"
                :value="scope.row.checked"
                color="black">

            </el-switch>

          </template>
        </el-table-column>
        <el-table-column label="Remove"
                         min-width="60px">
          <template slot-scope="scope">
            <b-button variant="danger" v-on:click="removePosition(scope.row.id)">
              Delete
            </b-button>
          </template>
        </el-table-column>
      </el-table>
    </b-card>
  </div>
</template>

<script>
import {Table, TableColumn, DropdownMenu, DropdownItem, Dropdown, Switch} from 'element-ui'
import CheckBox from "@/views/Dashboard/CheckBox";

export default {
  name: 'position-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Switch.name]: Switch,
    CheckBox,
  },
  methods: {
    switchChecked(id) {
      this.tableData = id;
    },
    removePosition(id){
      this.$store.dispatch("removePosition",id)
    },
  },

  computed: {
    tableData: {
      get() {
        const pos = this.$store.getters.getLocalPositions
        let result = []

        if (pos === undefined) return []

        for (let i = 0; i < pos.length; i++) {
          result[i] = pos[i]
          result[i].date = result[i].date.toString().split('T')[0]
          result[i]['percentage'] = (Math.round((1 - (result[i].buyValue / result[i].currentValue)) * 10000) / 100).toString() + '%';
          result[i].buyValue = Math.round(result[i]['buyValue'] * 100) / 100
        }
        return result;

      },
      set(id) {
        this.$store.dispatch('setPositionChecked', id)
      }
    },
  },

}

</script>

<style scoped>

</style>