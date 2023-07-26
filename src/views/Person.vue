<template>
  <div class="grid md:grid-cols-2 text-left mx-4 gap-4">
    <div>
      <img class="p-4" :src="person.Avatar" alt="avatar" />
      <h1 class="text-xl font-bold p-3 text-white bg-slate-400">
        Name: {{ fullName }}
      </h1>
      <h1 class="m-2 p-2 bg-slate-300 rounded-md">Email: {{ person.email }}</h1>
      <h1 v-if="person.phone">
        <h1 class="m-2 p-2 bg-slate-300 rounded-md">
          Telephone: {{ person.phone }}
        </h1>
      </h1>
      <h1 v-else>
        <form @submit.prevent="PhoneSubmitHandler" action="submit">
          <input
            class="rounded-md border-solid w-2/3 m-2 placeholder:px-1"
            placeholder="Telephone number"
            type="number"
            name="phone"
          />
        </form>
      </h1>
      <h1 class="m-2 p-2 bg-slate-300 rounded-md">
        Gender: {{ person.gender }}
      </h1>
      <h1 v-if="person.car_model">
        <h1 class="m-2 p-2 bg-slate-300 rounded-md">Car: {{ car }}</h1>
      </h1>
      <h1 v-else>
        <form>
          <input
            class="rounded-md border-solid w-2/3 m-2 placeholder:px-1"
            placeholder="Car year"
            type="number"
            name="year"
          />
          <input
            class="rounded-md border-solid w-2/3 m-2 placeholder:px-1"
            placeholder="car brand"
            type="text"
            name="brand"
          />
          <input
            class="rounded-md border-solid w-2/3 m-2 placeholder:px-1"
            placeholder="car model"
            type="text"
            name="model"
          />
          <button
            class="bg-slate-500 text-teal-50 p-2"
            @click.prevent="CarSubmitHandler"
          >
            Car model submit
          </button>
        </form>
      </h1>
      <h1 v-if="person.Job_title">
        <h1 class="m-2 p-2 bg-slate-300 rounded-md">
          Job: {{ person.Job_title }}
        </h1>
      </h1>
      <h1 v-else>
        <form action="submit" @submit.prevent="JobSubmitHandler">
          <input
            class="rounded-md border-solid w-2/3 m-2 placeholder:px-1"
            placeholder="job title"
            type="text"
            name="Job_title"
          />
        </form>
      </h1>
      <button
        class="bg-slate-500 text-white font-extrabold p-3 text-lg"
        @click.prevent="() => saveHandler(person.id)"
      >
        Save it!🫡
      </button>
    </div>
    <Spot :lat="person.latitude" :long="person.longitude" />
  </div>
</template>

<script>
import Spot from "../components/Map.vue";
export default {
  components: {
    Spot,
  },
  props: ["id"],
  data: function () {
    return {
      person: {},
      people: [],
    };
  },
  created() {
    console.log(Spot);
    const storedPeople = localStorage.getItem("people");
    if (storedPeople) {
      this.people = JSON.parse(storedPeople);
      this.person = JSON.parse(storedPeople).find((el) => el.id === +this.id);
    }
  },
  computed: {
    fullName: function () {
      return this.person.first_name + " " + this.person.last_name;
    },
    car: function () {
      return (
        this.person.car_year +
        " " +
        this.person.car_brand +
        " " +
        this.person.car_model
      );
    },
  },
  methods: {
    PhoneSubmitHandler(e) {
      this.person.phone = e.target[0].value;
    },

    CarSubmitHandler(e) {
      if (
        e.target.form[0].value &&
        e.target.form[1].value &&
        e.target.form[2].value !== ""
      ) {
        this.person.car_year = e.target.form[0].value;
        this.person.car_brand = e.target.form[1].value;
        this.person.car_model = e.target.form[2].value;
      } else {
        alert("Please fill 3 forms to updated car model🫡! ");
      }
    },
    JobSubmitHandler(e) {
      this.person.Job_title = e.target[0].value;
    },
    saveHandler(id) {
      const index = this.people.findIndex((el) => el.id === id);
      this.people.splice(index, 1);
      this.people.unshift(this.person);
      this.$router.push("/");
    },
  },
  watch: {
    people: {
      handler: function (el) {
        localStorage.setItem("people", JSON.stringify(el));
      },
      deep: true,
    },
  },
};
</script>
