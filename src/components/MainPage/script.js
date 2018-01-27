export default {
  name: 'MainPage',
  data () {
    return {
      shows: [],
      discoverUrl: 'https://api.themoviedb.org/3/discover/tv',
      months: {'1':'January', '2':'February', '3':'March', '4':'April', '5':'May', '6':'June', '7':'July', '8':'August', '9':'September', '10':'October', '11':'November', '12':'December'}
    }
  },
  computed: {
    years() {
      var years = [];
      for (var i = (new Date()).getFullYear(); i >= 1900; i--)
        years.push(i);
      return years;
    },
    chunks() {
      var r = [];
      for (var i = 0, len = this.shows.length; i < len; i += 4)
        r.push(this.shows.slice(i, i + 4));
      return r;
    }
  },
  created() {
    this.getShows(this.$route.params);
  },
  beforeRouteUpdate(to, from, next) {
    this.getShows(to.params);
    next();
  },
  methods: {
    ApiParams(routeParams) {
      return {
        params: {
          api_key: '15e38a2db71c51463c3f1f2cad732d72',
          sort_by: 'popularity.desc',
          'first_air_date.gte': routeParams.year + '-' + routeParams.month + '-01',
          'first_air_date.lte': routeParams.year + '-' + routeParams.month + '-' + (new Date(routeParams.year, routeParams.month, 0)).getDate(),
          page: '1',
          include_null_first_air_dates: 'false',
          with_original_language: 'en'
        }
      };
    },
    getShows(routeParams) {
      this.shows.splice(0);
      this.$http.jsonp(this.discoverUrl, new this.ApiParams(routeParams))
      .then(responce => {
        return responce.json();
      }).then(json => {
        this.addShows(json);
        for (var i = 2; i <= json.total_pages; i++) {
          var params = new this.ApiParams(routeParams);
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
