import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID 2LQ6nJARFf4wGO6z2XhBLdv4oQQaudmEZn6lYU4TMHE",
  },
});
