<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="meal.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="weight">Weight</label>
        <input
          class="form-control"
          id="weight"
          required
          v-model="meal.weight"
          name="weight"
        />
      </div>

      <div class="form-group">
        <label for="ratio">Ratio</label>
        <input
          class="form-control"
          id="ratio"
          required
          v-model="meal.ratio"
          name="ratio"
        />
      </div>

      <div class="form-group">
        <label for="insuline">Glucides (/100g)</label>
        <input
          class="form-control"
          id="insuline"
          required
          v-model="meal.insuline"
          name="insuline"
        />
      </div>

      <label for="insuline">Insuline</label>
      <p class="form-control"> {{ meal.weight/meal.insuline*meal.ratio }} </p>

      <button @click="saveMeal" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMeal">Add</button>
    </div>
  </div>
</template>

<script>
import MealDataService from "../services/MealDataService";

export default {
  name: "add-meal",
  data() {
    return {
      meal: {
        id: null,
        title: "",
        weight: "",
        ratio: "",
        insuline: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveMeal() {
      var data = {
        title: this.meal.title,
        weight: this.meal.weight,
        ratio: this.meal.ratio,
        insuline: this.meal.insuline
      };

      MealDataService.create(data)
        .then(response => {
          this.meal.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newMeal() {
      this.submitted = false;
      this.meal = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>