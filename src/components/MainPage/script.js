export default {
  name: 'MainPage',
  data () {
    return {
      shows: [],
      discoverUrl: 'https://api.themoviedb.org/3/discover/tv'
    }
  },
  created() {
    this.getShows()
  },
  methods: {
    ApiParams() {
      return {
        params: {
          api_key: '15e38a2db71c51463c3f1f2cad732d72',
          sort_by: 'popularity.desc',
          'first_air_date.gte': '2018-01-01',
          'first_air_date.lte': '2018-01-31',
          page: '1',
          include_null_first_air_dates: 'false',
          with_original_language: 'en'
        }
      };
    },
    getShows() {
      this.$http.jsonp(this.discoverUrl, new this.ApiParams())
      .then(responce => {
        return responce.json();
      }).then(json => {
        this.addShows(json);
        for (var i = 2; i <= json.total_pages; i++) {
          var params = new this.ApiParams();
          params.params.page = i;
          this.$http.jsonp(this.discoverUrl, params)
          .then(responce => {
            return responce.json();
          }).then(json => {
            this.addShows(json);
          })
        }
      });
    },
    chunk(arr, chunkSize) {
      var R = [];
      for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
      return R;
    },
    addShows(json) {
      for (var y = 0; y < json.results.length; y++) {
        var show = json.results[y];
        if (show != null && show.poster_path != null) {
          show.selected = false;
          this.shows.push(show);
        }
      }
    }
  }
}
