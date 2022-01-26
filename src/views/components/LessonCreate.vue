<template>
  <b-button
    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
    variant="outline-primary"
    v-b-modal.modal-lesson-create
  >
    Create Lesson
    <b-modal
      id="modal-lesson-create"
      cancel-variant="outline-secondary"
      ok-title="Create Lesson"
      cancel-title="Close"
      centered
      ok-only
      title="Create Lesson"
      size="lg"
    >
      <b-form>
        <b-form-group>
          <b-row align-v="center">
            <b-col sm="2">
              <label for="lesson_image">Lesson Name:</label>
              <b-avatar size="6rem" variant="secondary" rounded></b-avatar>
            </b-col>
            <b-col sm="10">
              <b-form-file
                id="image"
                v-model="lesson.image"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="2"> </b-col>
            <b-col sm="10">
              <h5>Allowed JPG, GIF or PNG. Max Size of 8000KB.</h5>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group>
          <label for="lesson_name">Lesson Name:</label>
          <b-form-input
            v-model="lesson.name"
            id="lesson_name"
            type="text"
            placeholder="Course Name"
          />
        </b-form-group>
        <b-form-group>
          <label for="lesson_type">Lesson Type</label>
          <b-form-input
            type="text"
            id="lesson_type"
            placeholder="Lesson type"
          />
        </b-form-group>
        <b-form-group>
          <label for="domain">Domain</label>
          <b-form-input id="domain" type="text" placeholder="Domain" />
        </b-form-group>
        <b-form-group>
          <label for="pass_percentage">Pass percentage</label>
          <b-form-input
            v-model="pass_percentage"
            id="pass_percentage"
            type="text"
            placeholder="Pass percentage"
          />
        </b-form-group>

        <b-form-group>
          <label for="access_type">Access type</label>
          <b-form-input
            v-model="access_type"
            id="access_type"
            type="text"
            placeholder="Access type"
          />
        </b-form-group>

        <b-form-group>
          <label for="live_link">Live link</label>
          <b-form-input id="live_link" type="text" placeholder="Live link" />
        </b-form-group>

        <b-form-group>
          <label for="file_upload">File Upload</label>
          <b-form-file
            id="file_upload"
            v-model="lesson.file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          />
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
  BFormFile,
  BImg,
  BRow,
  BCol,
  BAvatar,
} from "bootstrap-vue";
export default {
  components: {
    BButton,
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BFormFile,
    BImg,
    BRow,
    BCol,
    BAvatar,
  },

  data() {
    return {
      lesson: {
        image: null,
        name: "",
        file: null,
        access_type: "",
        pass_percentage: "",
      },
    };
  },

  methods: {
    createLesson() {
      axios.post("http://localhost:3000/lessons", this.lesson).then(() => {
        this.$root.$emit("fetchLesson");
      });
    },
  },
};
</script>

<style></style>
