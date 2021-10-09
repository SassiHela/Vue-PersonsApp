<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>

    <b-row class="m-5">
      <b-col sm="8">
        <b-form-input
          id="input-large"
          size="lg"
          placeholder="Filter by person name"
          v-model="filter"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-card>
        <b-row align-h="between">
          <b-col cols="6">
            <h3>Total Persons : {{ numberOfPersons }}</h3>
          </b-col>
          <b-col cols="2">
            <b-row>
              <b-col>
                <b-button
                  variant="secondary"
                  id="show-btn"
                  @click="showCreateModal"
                >
                  <b-icon-plus class="text-white"></b-icon-plus>
                  <span class="h6 text-white">New Person</span>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-table
            striped
            hover
            :items="filteredRows"
            :fields="fields"
            class="text-center"
          >
            <template #cell(person_name)="data">
              {{ `${data.item.first_name} ${data.item.last_name}` }}
            </template>

            <template #cell(actions)="data">
              <b-row>
                <b-col cols="7">
                  <b-icon-pencil-square
                    class="action-item"
                    variant="primary"
                    @click="showEditModal(data.item.id)"
                  ></b-icon-pencil-square>
                </b-col>
                <b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item.id)"
                  ></b-icon-trash-fill>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-row>
      </b-card>
    </b-row>

    <!-- Modal for adding new persons -->
    <b-modal ref="create-person-modal" size="xl" hide-footer title="New Person">
      <create-person-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getPersonData"
        @showSuccessAlert="showAlertCreate"
      ></create-person-form>
    </b-modal>

    <!-- Modal for updating persons -->
    <b-modal ref="edit-person-modal" size="xl" hide-footer title="Edit Person">
      <edit-person-form
        @closeEditModal="closeEditModal"
        @reloadDataTable="getPersonData"
        @showSuccessAlert="showAlertUpdate"
        :personId="personId"
      ></edit-person-form>
    </b-modal>

    <!-- Delete Person Modal -->
    <b-modal
      ref="delete-person-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-person-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getPersonData"
        @showDeleteAlert="showDeleteSuccess"
        :personId="personId"
      ></delete-person-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import CreatePersonForm from "@/components/CreatePersonForm.vue";
import EditPersonForm from "@/components/EditPersonForm.vue";
import DeletePersonModal from "@/components/DeletePersonModal.vue";

export default {
  components: {
    CreatePersonForm,
    EditPersonForm,
    DeletePersonModal,
  },
  data() {
    return {
      fields: [
        {
          key: "person_name",
          label: "Person Name",
        },
        {
          key: "email",
          label: "Person E-Mail",
        },

        "actions",
      ],
      filter: "",
      items: [],
      numberOfPersons: 0,
      personId: 0,
      showSuccessAlert: false,
      alertMessage: "",
    };
  },
  mounted() {
    this.getPersonData();
  },
  methods: {
    showCreateModal() {
      this.$refs["create-person-modal"].show();
    },
    closeCreateModal() {
      this.$refs["create-person-modal"].hide();
    },
    getPersonData() {
      axios
        .get("http://localhost:3000/persons/")
        .then((response) => {
          this.items = response.data;
          this.numberOfPersons = response.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showEditModal(id) {
      this.$refs["edit-person-modal"].show();
      this.personId = id;
    },
    closeEditModal() {
      this.$refs["edit-person-modal"].hide();
    },

    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Person was created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Person was updated successfully";
    },
    showDeleteModal(id) {
      this.$refs["delete-person-modal"].show();
      this.personId = id;
    },
    closeDeleteModal() {
      this.$refs["delete-person-modal"].hide();
    },
    showDeleteSuccess() {
      this.showSuccessAlert = true;
      this.alertMessage = "Person was deleted successfully!";
    },
  },
  computed: {
    // Filter by person name
    filteredRows() {
      return this.items.filter((item) => {
        //We’re lowercasing everything to ensure that the search is case insensitive
        const first_name = item.first_name.toString().toLowerCase();
        const last_name = item.last_name.toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return (
          first_name.includes(searchTerm) || last_name.includes(searchTerm)
        );
      });
    },
  },
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}
</style>
