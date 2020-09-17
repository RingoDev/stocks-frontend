<template>
  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">Positions</h3>
        </b-col>
        <b-col class="text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </b-col>
      </b-row>
    </template>

    <el-table class="table-responsive table"
              :data="getTableData"
              header-row-class-name="thead-light">
      <el-table-column label="Stock"
                       min-width="130px"
                       prop="page">
        <template v-slot="{row}">
          <div class="font-weight-600">{{row.stock}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Quantity"
                       min-width="70px"
                       prop="quantity">
      </el-table-column>
      <el-table-column label="Buy Date"
                       min-width="90px"
                       prop="date">
      </el-table-column>

      <el-table-column label="buy value"
                       min-width="90px"
                       prop="bounceRate">
        <template v-slot="{row}">
          {{row.bounceRate}}
        </template>
      </el-table-column>

      <el-table-column label="Current Value"
                       min-width="90px"
                       prop="unique">
      </el-table-column>
    </el-table>
  </b-card>
</template>

<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
export default {
  name: 'position-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  computed:{
    getTableData(){
      return this.$store.getters.getPositions;
    }
  },
  data() {
    return {
      tableData: [
        {
          stock: 'GM',
          visitors: '4,569',
          unique: '340',
          bounceRate: '46,53%'
        },
        {
          stock: 'JNJ',
          visitors: '3,985',
          unique: '319',
          bounceRate: '46,53%'
        },
        {
          stock: 'AMZN',
          visitors: '3,513',
          unique: '294',
          bounceRate: '36,49%'
        },
      ]
    }
  }
}

</script>

<style scoped>

</style>