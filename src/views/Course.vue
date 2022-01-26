<template>
  <section id="dashboard-course">
    <b-row class="match-height">
      <b-col md="3" xl="4" class="mb-1">
        <course-create></course-create>
      </b-col>

      <b-col md="3" xl="3" class="mb-1">
        <b-form-group>
          <b-form-input v-model="keyword" placeholder="Type to search" />
        </b-form-group>
      </b-col>

      <b-col md="3" xl="3" class="mb-1">
        <b-form-group>
          <b-form-select v-model="selectedDomain" :options="domains" />
        </b-form-group>
      </b-col>

      <b-col md="3" xl="2" class="mb-1">
        <b-form-group>
          <b-form-select v-model="selectedStandard" :options="standards" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col md="2" xl="2" class="mb-1">
        <b-form-group>
          <b-form-select v-model="selectedGrade" :options="grades" />
        </b-form-group>
      </b-col>

      <b-col md="2" xl="2" class="mb-1">
        <b-form-group>
          <b-form-select v-model="selectedSubject" :options="subjects" />
        </b-form-group>
      </b-col>

      <b-col md="6" xl="6" class="mb-1"> </b-col>
      <b-col md="2" xl="2" class="mb-1">
        <lesson-create></lesson-create>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <course-card :selected-grade="selectedGrade"></course-card>
      </b-col>
      <b-col cols="8">
        <lesson-table :search-lesson="keyword"></lesson-table>
      </b-col>
    </b-row>
  </section>
</template>
<script>
import CourseCard from "./components/CourseCard.vue";
import LessonTable from "./components/LessonTable.vue";
import CourseCreate from "./components/CourseCreate.vue";
import LessonCreate from "./components/LessonCreate.vue";

import {
  BButton,
  BFormInput,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BListGroupItem,
  BCardText,
  BCard,
  BDropdown,
  BDropdownItem,
  BCollapse,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BModal,
  VBModal,
  BForm,
} from "bootstrap-vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import Ripple from "vue-ripple-directive";

import draggable from "vuedraggable";
export default {
  components: {
    BButton,
    BFormInput,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BListGroupItem,
    BCardText,
    draggable,
    BCard,
    BDropdown,
    BDropdownItem,
    AppCollapse,
    AppCollapseItem,
    BCollapse,
    BCardHeader,
    BCardBody,
    BCardTitle,
    CourseCard,
    LessonTable,
    BModal,
    VBModal,
    BForm,
    CourseCreate,
    LessonCreate,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  data() {
    return {
      keyword: "",
      selected: null,
      selectedDomain: null,
      selectedStandard: null,
      selectedGrade: null,
      selectedSubject: null,
      domains: [
        { value: null, text: "Please select a domain" },
        { value: "d1", text: "Domain one" },
        { value: "d2", text: "Domain two" },
        { value: "d3", text: "Domain three" },
      ],
      standards: [
        { value: null, text: "Please select a standard" },
        { value: "s1", text: "Standard one" },
        { value: "s2", text: "Standard 2" },
        { value: "s3", text: "Standard 3" },
        { value: "s4", text: "Standard 4" },
      ],
      grades: [
        { value: null, text: "Please select a grade" },
        { value: "1", text: "One" },
        { value: "2", text: "Two" },
        { value: "3", text: "Three" },
        { value: "4", text: "Four" },
        { value: "5", text: "Five" },
        { value: "6", text: "Six" },
        { value: "7", text: "Seven" },
        { value: "8", text: "Eight" },
        { value: "9", text: "Nine" },
      ],
      subjects: [
        { value: null, text: "Please select a subject" },
        { value: "math", text: "Math" },
        { value: "science", text: "Science" },
        { value: "english", text: "English" },
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
