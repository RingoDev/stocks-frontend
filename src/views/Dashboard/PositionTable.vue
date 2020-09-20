<template>
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

    <el-table class="table-responsive table"
              :data="getTableData"
              header-row-class-name="thead-light">
      <el-table-column label="Stock"
                       min-width="60px"
                       prop="stock">
        <template v-slot="{row}">
          <div class="font-weight-600">{{ row.stock }}</div>
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
                       prop="buyValue">
      </el-table-column>

      <el-table-column label="Current Value"
                       min-width="90px"
                       prop="currentValue">
      </el-table-column>
      <el-table-column label="Percentage"
                       min-width="90px"
                       prop="percentage">
      </el-table-column>
    </el-table>
  </b-card>
</template>

<script>
import {Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'

export default {
  name: 'position-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
  computed: {
    getTableData() {
      const positions = this.$store.getters.getPositions;
      for (let i = 0; i < positions.length; i++) {
        positions[i].date = positions[i].date.toString().split('T')[0]
        positions[i]['percentage'] = (Math.round((1 - (positions[i]['buyValue'] / positions[i]['currentValue']))*10000)/100).toString() + '%';
      }
      return positions;
    }
  }
}

</script>

<style scoped>

</style>