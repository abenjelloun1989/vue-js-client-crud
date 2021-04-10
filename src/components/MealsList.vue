<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Meals List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(meal, index) in meals"
          :key="index"
          @click="setActiveMeal(meal, index)"
        >
          {{ meal.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllMeals">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentMeal">
        <h4>Meal</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentMeal.title }}
        </div>
        <div>
          <label><strong>Weight:</strong></label> {{ currentMeal.weight }}
        </div>
        <div>
          <label><strong>Ratio:</strong></label> {{ currentMeal.ratio }}
        </div>
        <div>
          <label><strong>Glucides (/100g):</strong></label> {{ currentMeal.insuline }}
        </div>
        <div>
          <label><strong>Insuline:</strong></label> {{ currentMeal.weight/currentMeal.insuline*currentMeal.ratio }}
        </div>
        <a class="badge badge-warning"
          :href="'/meals/' + currentMeal.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Meal...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MealDataService from "../services/MealDataService";

export default {
  name: "meals-list",
  data() {
    return {
      meals: [],
      currentMeal: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveMeals() {
      MealDataService.getAll()
        .then(response => {
          this.meals = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveMeals();
      this.currentMeal = null;
      this.currentIndex = -1;
    },

    setActiveMeal(meal, index) {
      this.currentMeal = meal;
      this.currentIndex = index;
    },

    removeAllMeals() {
      MealDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      MealDataService.findByTitle(this.title)
        .then(response => {
          this.meals = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveMeals();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>