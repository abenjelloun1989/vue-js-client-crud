import http from "../http-common";

class MealDataService {
  getAll() {
    return http.get("/meals");
  }

  get(id) {
    return http.get(`/meals/${id}`);
  }

  create(data) {
    return http.post("/meals", data);
  }

  update(id, data) {
    return http.put(`/meals/${id}`, data);
  }

  delete(id) {
    return http.delete(`/meals/${id}`);
  }

  deleteAll() {
    return http.delete(`/meals`);
  }

  findByTitle(title) {
    return http.get(`/meals?title=${title}`);
  }
}

export default new MealDataService();
