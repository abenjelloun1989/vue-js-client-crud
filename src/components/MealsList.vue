<template>
  <div class="list row">
    <div class="col-md-12 form-group">
      <b-input-group size="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>      
        <b-form-input type="search" size="lg" b-type="search" class="form-control" placeholder="Commencez à écrire ..."
          v-model="title"
          v-on:keyup.enter="searchTitle"
          v-on:change="searchTitle" />
      </b-input-group>
        <!--
        <div class="input-group-append">
          <b-button type="button"
            @click="searchTitle"
          >
            Miam !
          </b-button>
        </div> -->
    </div>
    
    <div class="col-md-12" >
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="fill"
      ></b-pagination>
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center"
          :class="{ active: index == currentIndex }"
          v-for="(meal, index) in mealsForList"
          :key="index"
          @click="setActiveMeal(meal, index)"
          button
        >
          {{ meal.title }}
          <!--<b-icon icon="camera" font-scale="1.5" class="rounded bg-primary p-1" variant="light" v-if="meal.url"></b-icon>
          -->
          <b-btn variant="light">
            <div v-if="meal.url"><b-icon icon="star-fill" size="mb-2" variant="warning"></b-icon></div>
            <div v-else><b-icon icon="star" font-scale="1.5" variant="warning"></b-icon></div>
          </b-btn>
          <!--<b-icon icon="star-fill" scale="1.5" variant="warning"></b-icon>-->
        </b-list-group-item>
      </b-list-group>
    </div>
    <b-modal id="meal-modal" ok-only v-bind:title="currentMeal?currentMeal.title:''">
      <div class="col-md-12">
        <div v-if="currentMeal">
          <div class="form-group" v-if="currentMeal.url">
            <b-card-img :src="require('../../../dia-smart-common/images/'+currentMeal.code+'.jpg')"></b-card-img>
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
      weight: 70,
      perPage: 10,
      currentPage: 1
    };
  },
  computed:{
    rows() {
      return this.meals.length
    },
    mealsForList() {
      return this.meals.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    }
  },
  methods: {
    retrieveMeals() {
      MealDataService.getAll()
        .then(response => {
          this.meals = response.data;
          this.meals.sort(this.compare);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    compare(a, b) {
      if ( a.title < b.title ){
        return -1;
      }
      if ( a.title > b.title ){
        return 1;
      }
      return 0;
    },

    refreshList() {
      this.retrieveMeals();
      this.currentMeal = null;
      this.currentIndex = 0;
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
          this.meals.sort(this.compare);
          this.currentIndex = 0;
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