<template>
  <div class="container m-auto mb-7">
    <h1 class="font-sans p-2 text-center text-4xl m-3 font-extrabold">
      Contact book
    </h1>
    <div>
      <form
        id="newContact"
        action="submit"
        class="text-black m-3 bg-slate-500 flex flex-col lg:flex-row items-center gap-3 p-2 place-content-center"
      >
        <input
          placeholder="First Name"
          class="rounded-md border-solid w-2/3 m-2 placeholder:px-1 flex-grow"
          type="text"
          name="first_name"
          v-model="newContact.first_name"
        />
        <input
          class="rounded-md border-solid w-2/3 m-2 placeholder:px-1"
          placeholder="Last Name"
          type="text"
          name="last_name"
          v-model="newContact.last_name"
        />
        <select v-model="newContact.gender" class="text-black m-3 p-1">
          <option disabled value="">Please select one</option>
          <option>Male</option>
          <option>Female</option>
          <option>Genderfluid</option>
          <option>Non-binary</option>
          <option>Bigender</option>
          <option>Agender</option>
        </select>
        <input
          placeholder="Email"
          class="rounded-md border-solid m-2 placeholder:px-1"
          type="text"
          name="email"
          v-model="newContact.email"
        />
        <input
          placeholder="Address"
          v-model="newContact.Address"
          class="rounded-md border-solid m-2 placeholder:px-1"
          type="text"
          name="Address"
        />
        <button
          class="bg-blue-300 rounded-lg px-3 shadow-md hover:shadow-lg shadow-slate-900 hover:shadow-slate-900 ease-in-out duration-100 active:shadow-sm"
          @click.prevent="addItem"
        >
          Submit🫡
        </button>
      </form>
    </div>
    <div class="flex md:flex-row p-3 bg-slate-400 gap-3 items-center">
      <h1 class="text-2xl font-black text-white">Search people :</h1>
      <form action="submit">
        <input
          @input="filter"
          class="p-1"
          v-model="this.search"
          type="text"
          name="text"
          id="search"
        />
      </form>
    </div>
    <div
      class="grid grid-cols-3 grid-rows gap-4 text-start uppercase text-sm p-2 m-2 text-white bg-slate-500"
    >
      <div class="col-start-2">
        <span
          class="cursor-pointer hover:text-red-600 hover:scale-150 focus:text-red-600 text-2xl font-black"
          @click="sortby('first_name')"
          >First Name</span
        >
      </div>
      <div>
        <span
          class="cursor-pointer hover:text-red-600 focus:text-red-600 text-2xl font-black"
          @click="sortby('last_name')"
          >Last Name</span
        >
      </div>
    </div>
    <PeopleGroup :people="people" :removeHandler="removeHandler" />
  </div>
</template>
<script>
import PeopleGroup from "../components/PeopleGroup.vue";
import contactBook from "../utils/contact_data";
import { sortBy } from "lodash";

export default {
  name: "Contactbook",
  components: {
    PeopleGroup,
  },
  data() {
    return {
      people: contactBook,
      newContact: {
        id: null,
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        Address: "",
        phone: null,
        latitude: null,
        longitude: null,
        Avatar:
          "	https://robohash.org/voluptatibusdelectusanimi.png?size=250x250&set=set1",
        job_title: null,
        car_brand: null,
        car_model: null,
        car_year: null,
        location: null,
      },
      search: "",
    };
  },

  methods: {
    sortby(element) {
      this.people = sortBy(this.people, element);
    },
    removeHandler(e) {
      this.people = this.people.filter((el) => el.id !== +e.target.dataset.id);
    },
    addItem() {
      const checkArr = Object.values(this.newContact);
      console.log();
      if (checkArr.includes("") !== true) {
        const newId = this.people.length + 1;
        this.newContact.id = newId;
        this.people.unshift(this.newContact);
        // this.mounted();
        console.log(this.newContact);
      } else {
        alert("don't enter empty value with form 😥");
      }
    },
    filter() {
      console.log(this.search);
      this.people = contactBook.filter((el) =>
        el.first_name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  // computed: the computed categories would return a values in a new categories
  // watch categories would excute the function while the "people" object change the value
  watch: {
    people: {
      handler: function (newPeople) {
        localStorage.setItem("people", JSON.stringify(newPeople));
      },
      deep: true,
    },
  },
  created() {
    const storedContact = localStorage.getItem("people");
    if (storedContact) {
      this.people = JSON.parse(storedContact);
    } else {
      localStorage.setItem("people", JSON.stringify(contactBook));
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.newContact.latitude = position.coords.latitude;
        this.newContact.longitude = position.coords.longitude;
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  },
};
</script>
<!-- console.log(isEmpty(this.newContact));
      if (isEmpty(this.newContact) === false) {
        const newId = this.people.length + 1;
        this.newContact.id = newId;
        this.people.push(this.newContact);
      } -->
