<template>
  <div>
    <header-bar></header-bar>
    <b-row>
      <data-table></data-table>
    </b-row>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  components: {
    HeaderBar,
    DataTable,
  },
};
</script>
