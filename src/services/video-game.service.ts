import {HttpService} from "./http.service";
import {VideoGameModel} from "../types";

export class VideoGameService {

  static async search() {
    return HttpService.get('/applicant-test/')
      .then((data) => data.map((item) => new VideoGameModel(item)));
  }
}
