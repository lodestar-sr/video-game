import moment from "moment";

export class VideoGameModel {
  id: number;
  name: string;
  rating: number;
  summary: string;
  releaseDate: number;

  constructor(init: any = {}) {
    const data = {
      id: null,
      name: '',
      rating: '',
      summary: '',
      first_release_date: '',
      ...init,
    };

    this.id = data.id;
    this.name = data.name;
    this.rating = data.rating;
    this.summary = data.summary;
    this.releaseDate = data.first_release_date;
  }

  formatReleaseDate() {
    return moment(this.releaseDate).format('DD/MM/YYYY');
  }
}
