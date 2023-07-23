<template>
  <div id="people">
    <ul
      v-for="person in people"
      :key="person.id"
      class="grid grid-cols-3 gap-4 text-start"
    >
      <button
        :data-id="person.id"
        class="cursor-pointer"
        @click="removeHandler"
      >
        ❌
      </button>
      <router-link :to="'/person/' + person.id">
        <li class="cursor-pointer">{{ person.first_name }}</li>
      </router-link>
      <li>{{ person.last_name }}</li>
    </ul>
  </div>
  <!-- <Paginate></Paginate> -->
</template>
<script>
// import Paginate from "vuejs-paginate";
export default {
  name: "PeopleGroup",
  props: ["people", "removeHandler"],
};
</script>
