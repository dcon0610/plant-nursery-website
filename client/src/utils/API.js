import axios from "axios";

export default {
  // Gets all posts
  getPlants: function() {
    return axios.get("/api/plants");
  },

  addToCart: function(cartdata) {
    return axios.post("/api/plants/addtocart", cartdata);
  },

  getUser: function(userdata) {
    return axios.post("/api/plants/getuser", userdata);
  },

  register: function(userdata) {

    return axios.post("/api/users/register", userdata)
  },

  login: function(userdata) {
    return axios.post("/api/users/login", userdata)
  },

  reviseCart: function(userdata, index) {
    return axios.post("/api/plants/removefromcart", userdata)
  }

  // // Gets the post with the given id
  // getPost: function(id) {
  //   return axios.get("/api/posts/" + id);
  // },
  // // Deletes the post with the given id
  // deletePost: function(id) {
  //   return axios.delete("/api/posts/" + id);
  // },
  // // Saves a post to the database
  // savePost: function(postData) {
  //   return axios.post("/api/posts", postData);
  // }
};
