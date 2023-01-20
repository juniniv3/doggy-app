import axios from "axios";

export const dogApi = axios.create();
export const controllerDogApi = new AbortController();