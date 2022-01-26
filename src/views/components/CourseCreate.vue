<template>
  <b-button
    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
    variant="outline-primary"
    v-b-modal.modal-course-create
  >
    Create Course
    <b-modal
      id="modal-course-create"
      cancel-variant="outline-secondary"
      ok-title="Create"
      cancel-title="Close"
      centered
      ok-only
      title="Create Course"
      @ok="handleOk"
    >
      <b-form>
        <b-form-group>
          <label for="course_name">Course Name:</label>
          <b-form-input
            v-model="course.name"
            id="course_name"
            type="text"
            placeholder="Course Name"
          />
        </b-form-group>
        <b-form-group>
          <label for="grade">Grade</label>
          <b-form-select
            v-model="course.grade"
            :options="options"
          ></b-form-select>
        </b-form-group>
        <b-form-group>
          <label for="subject">Subject</label>
          <b-form-input disabled type="text" placeholder="Subject" />
        </b-form-group>
      </b-form>
    </b-modal>
  </b-button>
</template>

<script>
import axios from "axios";

import {
  BButton,
  BModal,
  BForm,
  BFormInput,
  BFormGroup,
  BFormSelect,
} from "bootstrap-vue";
export default {
  components: {
    BButton,
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
  },
  data() {
    return {
      course: {
        name: null,
        grade: 1,
      },
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    };
  },

  methods: {
    handleOk(bvModalEvt) {
      this.createCourse();
    },
    createCourse() {
      axios
        .post("http://localhost:3000/courses", this.course)
        .then((response) => {
          console.log(response.data);
          this.$root.$emit("fetchCourse");
        });
    },
  },
};
</script>

<style></style>
