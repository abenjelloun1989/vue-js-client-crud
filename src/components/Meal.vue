<template>
  <div v-if="currentMeal" class="edit-form">
    <h4>Repas</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentMeal.title"
        />
      </div>
      <div class="form-group">
        <label for="weight">Weight</label>
        <input type="text" class="form-control" id="weight"
          v-model="currentMeal.weight"
        />
      </div>
      <div class="form-group">
        <label for="ratio">Ratio</label>
        <input type="text" class="form-control" id="ratio"
          v-model="currentMeal.ratio"
        />
      </div>
      <div class="form-group">
        <label for="insuline">Glucides (/100g)</label>
        <input type="text" class="form-control" id="insuline"
          v-model="currentMeal.insuline"
        />
      </div>
      <p class="form-control"> {{ currentMeal.weight/currentMeal.insuline*currentMeal.ratio }} </p>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentMeal.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentMeal.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteMeal"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateMeal"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Meal...</p>
  </div>
</template>

<script>
import MealDataService from "../services/MealDataService";

export default {
  name: "meal",
  data() {
    return {
      currentMeal: null,
      message: ''
    };
  },
  methods: {
    getMeal(id) {
      MealDataService.get(id)
        .then(response => {
          this.currentMeal = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentMeal.id,
        title: this.currentMeal.title,
        weight: this.currentMeal.weight,
        ratio: this.currentMeal.ratio,
        insuline: this.currentMeal.insuline,
        published: status
      };

      MealDataService.update(this.currentMeal.id, data)
        .then(response => {
          this.currentMeal.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateMeal() {
      MealDataService.update(this.currentMeal.id, this.currentMeal)
        .then(response => {
          console.log(response.data);
          this.message = 'The meal was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteMeal() {
      MealDataService.delete(this.currentMeal.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "meals" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getMeal(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>