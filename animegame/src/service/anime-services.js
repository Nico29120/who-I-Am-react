import axios from "axios";


export default class AnimeService {

    

  static async getRandomCharacter() {
    
    const res = await axios.get("https://api.jikan.moe/v4/random/characters");
    console.log(res.data.data);
    return res.data.data;
  }

  static async getWork(id) {
    let res;
    let type = "anime";
    res = await axios.get(`https://api.jikan.moe/v4/characters/${id}/anime`);
    if (res.data.data.length === 0) {
      res = await axios.get(`https://api.jikan.moe/v4/characters/${id}/manga`);
      type = "manga";
    }
    console.log(res.data.data[0][type].title);
    return res.data.data[0][type].title;
  }
}
