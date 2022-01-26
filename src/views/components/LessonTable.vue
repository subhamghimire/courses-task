<template>
  <div>
    <b-card>
      <b-table-simple class="table table-responsive">
        <b-thead class="thead-light">
          <b-tr>
            <b-th scope="col">#</b-th>
            <b-th scope="col">Image</b-th>
            <b-th scope="col">Lesson Name</b-th>
            <b-th scope="col">Pass Percentage (%)</b-th>
            <b-th scope="col">Access Type</b-th>
            <b-th scope="col">PDF</b-th>
            <b-th scope="col"></b-th>
            <b-th scope="col">Actions</b-th>
          </b-tr>
        </b-thead>
        <draggable v-model="lessons" tag="tbody">
          <b-tr v-for="(item, index) in lessons" :key="index">
            <b-td scope="row">
              <span class="mr-1">
                <feather-icon icon="AlignJustifyIcon" size="16" />
              </span>
            </b-td>
            <b-td>N/A</b-td>
            <b-td>{{ item.name }}</b-td>
            <b-td>{{ item.pass_percentage }}</b-td>
            <b-td>{{ item.access_type }}</b-td>
            <b-td>N/A</b-td>
            <b-td>
              <div>
                <b-form-checkbox
                  checked="true"
                  class="custom-control-primary"
                  name="check-button"
                  switch
                >
                  <span class="switch-icon-left">
                    <feather-icon icon="CheckIcon" />
                  </span>
                  <span class="switch-icon-right">
                    <feather-icon icon="XIcon" />
                  </span>
                </b-form-checkbox>
              </div>
            </b-td>
            <b-td>
              <div style="display: flex; justify-content: space-between">
                <b-button
                  variant="outline-primary"
                  @click="$bvModal.show('modal-lesson-update-' + item.id)"
                  class="btn-icon mr-1"
                >
                  <feather-icon icon="EditIcon" />
                </b-button>
                <b-modal
                  :id="'modal-lesson-update-' + item.id"
                  cancel-variant="outline-secondary"
                  ok-title="Update Lesson"
                  cancel-title="Close"
                  centered
                  title="Update Lesson"
                  size="lg"
                  ok-only
                  @ok="updateLesson(item)"
                >
                  <b-form>
                    <b-form-group>
                      <b-row align-v="center">
                        <b-col sm="2">
                          <label for="lesson_image">Lesson Name:</label>
                          <b-avatar
                            size="6rem"
                            variant="secondary"
                            rounded
                          ></b-avatar>
                        </b-col>
                        <b-col sm="10">
                          <b-form-file
                            id="image"
                            v-model="item.image"
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
                        v-model="item.name"
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
                      <b-form-input
                        v-model="item.domain"
                        id="domain"
                        type="text"
                        placeholder="Domain"
                      />
                    </b-form-group>
                    <b-form-group>
                      <label for="pass_percentage">Pass percentage</label>
                      <b-form-input
                        v-model="item.pass_percentage"
                        id="pass_percentage"
                        type="text"
                        placeholder="Pass percentage"
                      />
                    </b-form-group>

                    <b-form-group>
                      <label for="access_type">Access type</label>
                      <b-form-input
                        id="access_type"
                        type="text"
                        placeholder="Access type"
                      />
                    </b-form-group>

                    <b-form-group>
                      <label for="live_link">Live link</label>
                      <b-form-input
                        id="live_link"
                        type="text"
                        placeholder="Live link"
                      />
                    </b-form-group>

                    <b-form-group>
                      <label for="file_upload">File Upload</label>
                      <b-form-file
                        id="file_upload"
                        v-model="item.file"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      />
                    </b-form-group>
                  </b-form>
                </b-modal>
                <b-button
                  variant="outline-danger"
                  @click="$bvModal.show('delete-lesson-modal-' + item.id)"
                  class="btn-icon"
                >
                  <feather-icon icon="TrashIcon" />
                  <b-modal
                    :id="'delete-lesson-modal-' + item.id"
                    title="Delete Lesson"
                    ok-only
                    ok-variant="danger"
                    modal-class="modal-danger"
                    centered
                    ok-title="Delete"
                    @ok="deleteLesson(item.id)"
                  >
                    <b-card-text>
                      <h5>Do you want to delete?</h5>
                    </b-card-text>
                  </b-modal>
                </b-button>
              </div>
            </b-td>
          </b-tr>
        </draggable>
      </b-table-simple>
    </b-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { debounce } from "../partials/debounce";
import axios from "axios";

import {
  BButton,
  BCard,
  BTableSimple,
  BThead,
  BTr,
  BTh,
  BTd,
  BTbody,
  BTfoot,
  BFormCheckbox,
  BForm,
  BFormInput,
  BFormGroup,
  BFormSelect,
  BFormFile,
  BImg,
  BRow,
  BCol,
  BAvatar,
  BCardText,
} from "bootstrap-vue";

export default {
  components: {
    BButton,
    BCard,
    draggable,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTd,
    BTbody,
    BTfoot,
    BFormCheckbox,
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BFormFile,
    BImg,
    BRow,
    BCol,
    BAvatar,
    BCardText,
  },
  mounted() {
    this.$root.$on("fetchLesson", this.getLessons);
    this.getLessons();
  },
  watch: {
    searchLesson: debounce(function (newVal) {
      this.debouncedKeyword = newVal;
      let key = this.searchLesson;
      axios
        .get("http://localhost:3000/lessons/?name_like=" + key)
        .then((response) => {
          this.lessons = response.data;
        });
    }, 500),
  },
  data() {
    return {
      debouncedKeyword: "",
      lessons: null,
    };
  },
  props: ["searchLesson"],
  methods: {
    getLessons() {
      axios.get("http://localhost:3000/lessons").then((response) => {
        this.lessons = response.data;
      });
    },
    updateLesson(lesson) {
      let data = {
        name: lesson.name,
        pass_percentage: lesson.pass_percentage,
        access_type: "trial",
        image: null,
        file: null,
      };
      axios
        .put("http://localhost:3000/lessons/" + lesson.id, data)
        .then((response) => {
          this.getLessons();
        });
    },

    deleteLesson(lessonId) {
      axios.delete("http://localhost:3000/lessons/" + lessonId).then(() => {
        this.getLessons();
      });
    },
  },
};
</script>

<style></style>
