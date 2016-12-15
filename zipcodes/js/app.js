var app = new Vue({
    el: '#app',
    data: {
        fromZip: '',
        fromCity: '',
        toZip: '',
        toCity: ''
    },
    watch: {
        fromZip: function (){
            this.fromCity = '';
            if(this.fromZip.length == 5){
                this.searchZip(this.fromZip, 'fromCity');
            }
        },
        toZip: function (){
            this.toCity = '';
            if(this.toZip.length == 5){
                this.searchZip(this.toZip, 'toCity');
            }
        }
    },
    methods: {
        searchZip: _.debounce(function(zipcode, type){

            var vm = this;            

            switch(type){
                case 'fromCity':
                    this.fromCity = 'searching... ';
                    
                    axios.get('https://ziptasticapi.com/'+zipcode).then(function(res){
                        vm.fromCity = res.data.city+ ', '+res.data.state;
                    })
                    .catch(function (error){
                        vm.fromCity = 'Invalid ZIPCode';
                    });
                break;
                case 'toCity':
                    this.toCity = 'searching... ';
                    
                    axios.get('https://ziptasticapi.com/'+zipcode).then(function(res){
                        vm.toCity = res.data.city+ ', '+res.data.state;
                    })
                    .catch(function (error){
                        vm.toCity = 'Invalid ZIPCode';
                    });
                break;
            }


        },500)
    }
});