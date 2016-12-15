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
            if(this.fromZip.length == 5)
                this.searchZip(this.fromZip, 'fromCity');
        },
        toZip: function (){
            this.toCity = '';
            if(this.toZip.length == 5)
                this.searchZip(this.toZip, 'toCity');
        }
    },
    methods: {

        searchZip: function(zipcode, type){

            var vm = this;

            this.setCityName('Searching...', type);            

            var resultado = axios.get('https://ziptasticapi.com/'+zipcode).then(function(res){               
                    
                if(typeof res.data.error == 'undefined'){
                    vm.setCityName(res.data.city+ '. '+res.data.state, type);
                }
                else{
                    vm.setCityName('Invalid ZIPCode',type);
                }
                
            })
            .catch(function (error){
                vm.setCityName('Invalid ZIPCode',type);
            });

        },
        setCityName: function(texto, type){            
            switch(type){
                case 'fromCity':
                    this.fromCity = texto;
                break;
                case 'toCity':
                    this.toCity = texto;
                break;
            }
        }

    }
});