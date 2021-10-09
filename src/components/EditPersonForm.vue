<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Person Details</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group id="first-name" label="First Name" label-for="first-name">
          <b-form-input
            id="first-name"
            type="text"
            placeholder="First Name"
            v-model="person.first_name"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="last-name" label="Last Name" label-for="last-name">
          <b-form-input
            id="last-name"
            type="text"
            placeholder="Last Name"
            v-model="person.last_name"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="email" label="E-Mail" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            v-model="person.email"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="updatePerson"
          >Update Person</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePersonModal",
  props: {
    personId: Number,
  },
  data() {
    return {
      person: {},
    };
  },
  mounted() {
    this.getPersonByID();
  },
  methods: {
    triggerClose() {
      this.$emit("closeEditModal");
    },
    getPersonByID() {
      axios
        .get(`http://localhost:3000/persons/${this.personId}`)
        .then((response) => {
          this.person = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePerson() {
      axios
        .put(`http://localhost:3000/persons/${this.personId}`, this.person)
        .then((response) => {
          console.log(response.data);
          this.$emit("closeEditModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
