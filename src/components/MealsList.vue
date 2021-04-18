<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <b-input type="text" size="lg" class="form-control" placeholder="Commencez à écrire ..."
          v-model="title"
          v-on:keyup.enter="searchTitle"
          v-on:change="searchTitle" />
        <!--
        <div class="input-group-append">
          <b-button type="button"
            @click="searchTitle"
          >
            Miam !
          </b-button>
        </div> -->
      </div>
    </div>
    <div class="col-md-12">
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(meal, index) in meals"
          :key="index"
          @click="setActiveMeal(meal, index)"
        >
          {{ meal.title }} <span v-if="meal.url">🐱</span>
        </li>
      </ul>
    </div>
    <b-modal id="meal-modal" ok-only v-bind:title="currentMeal?currentMeal.title:''">
      <div class="col-md-12">
        <div v-if="currentMeal">
          <div class="form-group" v-if="currentMeal.url">
            <b-card-img :src="require('../../../common/images/'+currentMeal.code+'.jpg')"></b-card-img>
          </div>
          <div v-else>
            <b-card-img :src="require('../assets/default.jpg')"></b-card-img>
          </div>
          <div class="form-group">
            <label for="carbo">Glucides pour 100g</label>
            <input type="text" class="form-control" id="carbo"
              v-model="currentMeal.carbo"
            />
          </div>
          <div class="form-group">
            <label for="weight">Combien je mange? (en g)</label>
            <b-form-spinbutton id="weight" v-model="weight" min="10" max="500" step="10"></b-form-spinbutton>
          </div>
          <div class="form-group">
            <label for="sb-step">Ratio</label>
            <b-form-spinbutton
              id="sb-step"
              v-model="ratio"
              min="0"
              max="10"
              step="0.10"
            ></b-form-spinbutton>
          </div>
          <div class="form-group">
            <h5>Total unités d'insuline:</h5>
            <label class="form-control">
            {{ (weight && currentMeal.carbo && ratio 
              ? weight/100*currentMeal.carbo.replace(",",".")/10*ratio
              : 0).toFixed(2) }}
            </label>
          </div>
          <!--
          <a class="badge badge-warning"
            :href="'/meals/' + currentMeal.id"
          >
            Edit
          </a>-->
        </div>
        <div v-else>
          <br />
          <p>Veuillez appuyer sur un repas...</p>
        </div>
      </div>
    </b-modal>
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
      title: "",
      ratio: 1,
      weight: 70
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
      this.$bvModal.show("meal-modal");
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