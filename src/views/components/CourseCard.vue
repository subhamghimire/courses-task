<template>
  <div>
    <draggable group="courses" v-model="courses" draggable=".sortable">
      <b-card
        v-for="(course, index) in courses"
        :key="index"
        class="mb-1 p-0 sortable"
      >
        <b-card-body class="p-0">
          <div
            :ref="'course-collapse-' + course.id"
            v-b-toggle="'collapse-' + index"
            class="lead collapse-title"
          >
            <div class="d-flex">
              <div class="mr-auto p-0 d-flex align-items-center">
                <feather-icon
                  icon="AlignJustifyIcon"
                  size="18"
                  class="text-body align-middle m-0 p-0 handle mr-2"
                />
                {{ course.name }}
              </div>
              <div class="p-0">
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                  class="p-0"
                >
                  <template v-slot:button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="text-body align-middle m-0 p-0"
                    />
                  </template>
                  <b-form-checkbox
                    class="custom-control-primary p-1"
                    name="check-button"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    <span class="switch-icon-right">
                      <feather-icon icon="XIcon" />
                    </span>
                    <span class="position-absolute">Publish</span>
                  </b-form-checkbox>
                  <b-dropdown-item
                    @click="
                      $bvModal.show('add-lesson_group-modal-' + course.id)
                    "
                  >
                    <feather-icon icon="PlusIcon" class="mr-50" />
                    <span>{{ "Add-New" }}</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="$bvModal.show('edit-course-modal-' + course.id)"
                  >
                    <feather-icon icon="EditIcon" class="mr-50" />
                    <span>{{ "Edit" }}</span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    @click="$bvModal.show('delete-course-modal-' + course.id)"
                  >
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>{{ "Delete" }}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </b-card-body>

        <b-modal
          :id="'edit-course-modal-' + course.id"
          cancel-variant="outline-secondary"
          ok-title="Update"
          cancel-title="Close"
          centered
          ok-only
          title="Update Course"
          @ok="updateCourse(course)"
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
        <b-modal
          :id="'add-lesson_group-modal-' + course.id"
          title="Add Lesson Group"
          ok-only
          centered
          ok-title="Create Lesson Group"
          @ok="createLessonGroup(course.id)"
        >
          <b-form>
            <b-form-group>
              <label for="lesson_name">Lesson Group Name:</label>
              <b-form-input
                v-model="lesson_group.name"
                id="lesson_name"
                type="text"
                placeholder="Lesson Group Name"
              />
            </b-form-group>
          </b-form>
        </b-modal>

        <b-modal
          :id="'delete-course-modal-' + course.id"
          title="Delete Course"
          ok-only
          ok-variant="danger"
          modal-class="modal-danger"
          centered
          ok-title="Delete"
          @ok="deleteCourse(course.id)"
        >
          <b-card-text>
            <h5>Do you want to delete?</h5>
          </b-card-text>
        </b-modal>

        <b-collapse
          :id="`collapse-` + index"
          :ref="`collapse-` + index"
          class="mt-2 pr-1"
        >
          <b-list-group>
            <draggable
              v-model="course.lesson_groups"
              :options="{ animation: 300 }"
              handle=".lesson-group-handle"
            >
              <b-list-group-item
                v-for="(lesson_group, lesson_index) in course.lesson_groups"
                :key="lesson_index"
                class="pr-0"
              >
                <div class="d-flex">
                  <div class="mr-auto p-0 d-flex align-items-center">
                    <feather-icon
                      icon="AlignJustifyIcon"
                      size="16"
                      class="text-body align-middle m-0 p-0 lesson-group-handle mr-2"
                    />
                    {{ lesson_group.name }}
                  </div>
                  <div class="p-0">
                    <b-dropdown
                      variant="link"
                      toggle-class="text-decoration-none"
                      no-caret
                      class="p-0"
                    >
                      <template v-slot:button-content>
                        <feather-icon
                          icon="MoreVerticalIcon"
                          size="16"
                          class="text-body align-middle m-0 p-0"
                        />
                      </template>
                      <b-form-checkbox
                        class="custom-control-primary p-1"
                        name="check-button"
                        switch
                      >
                        <span class="switch-icon-left">
                          <feather-icon icon="CheckIcon" />
                        </span>
                        <span class="switch-icon-right">
                          <feather-icon icon="XIcon" />
                        </span>
                        <span class="position-absolute">Publish</span>
                      </b-form-checkbox>
                      <b-dropdown-item
                        @click="
                          $bvModal.show(
                            'edit-lesson_group-modal-' + lesson_group.id
                          )
                        "
                      >
                        <feather-icon icon="EditIcon" class="mr-50" />
                        <span>Edit</span>
                      </b-dropdown-item>
                      <b-dropdown-item
                        @click="deleteLessonGroup(lesson_group.id)"
                      >
                        <feather-icon icon="TrashIcon" class="mr-50" />
                        <span>Delete</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>

                  <b-modal
                    :id="'edit-lesson_group-modal-' + lesson_group.id"
                    title="Update Lesson Group"
                    ok-only
                    centered
                    ok-title="Update Lesson Group"
                    @ok="updateLessongroup(lesson_group, course.id)"
                  >
                    <b-form>
                      <b-form-group>
                        <label for="lesson_name">Lesson Group Name:</label>
                        <b-form-input
                          v-model="lesson_group.name"
                          id="lesson_name"
                          type="text"
                          placeholder="Lesson Group Name"
                        />
                      </b-form-group>
                    </b-form>
                  </b-modal>
                </div>
              </b-list-group-item>
            </draggable>
          </b-list-group>
        </b-collapse>
      </b-card>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";
import {
  BListGroup,
  BListGroupItem,
  BCardText,
  BCard,
  BDropdown,
  BDropdownItem,
  BCollapse,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BFormCheckbox,
  BRow,
  BCol,
  BForm,
  BFormInput,
  BFormGroup,
  BFormSelect,
} from "bootstrap-vue";
export default {
  components: {
    BListGroup,
    BListGroupItem,
    BCardText,
    draggable,
    BCard,
    BDropdown,
    BDropdownItem,
    BCollapse,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BFormCheckbox,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
  },
  mounted() {
    this.$root.$on("fetchCourse", this.getCourses);
    this.getCourses();
  },
  props: ["selectedGrade"],
  data() {
    return {
      courses: [],
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      lesson_group: {
        name: "",
      },
    };
  },
  watch: {
    selectedGrade: function () {
      axios
        .get("http://localhost:3000/courses/?grade=" + this.selectedGrade)
        .then((response) => {
          this.courses = response.data;
        });
    },
  },
  methods: {
    getCourses() {
      axios
        .get("http://localhost:3000/courses?_embed=lesson_groups")
        .then((res) => {
          this.courses = res.data;
          console.log(this.courses);
        });
    },

    createLessonGroup(id) {
      let data = {
        name: this.lesson_group.name,
        courseId: id,
      };
      axios.post("http://localhost:3000/lesson_groups", data).then(() => {
        this.getCourses();
      });
    },

    updateLessongroup(group, cId) {
      let data = {
        name: group.name,
        courseId: cId,
      };
      axios
        .put("http://localhost:3000/lesson_groups/" + group.id, data)
        .then(() => {
          this.getCourses();
        });
    },
    deleteLessonGroup(id) {
      axios.delete("http://localhost:3000/lesson_groups/" + id).then(() => {
        this.getCourses();
      });
    },

    updateCourse(course) {
      let data = {
        name: course.name,
        grade: course.grade,
      };
      axios.put("http://localhost:3000/courses/" + course.id, data).then(() => {
        this.getCourses();
      });
    },
    deleteCourse(id) {
      axios.delete("http://localhost:3000/courses/" + id).then(() => {
        this.getCourses();
      });
    },
  },
};
</script>

<style></style>
