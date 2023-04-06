<template>
    <div class="card">
        <div class="card-header bg-primary text-white">{{ dados.servico }}</div>
        <div class="card-body">
            <p class="card-text">{{ dados.descricao }}</p>
        </div>
    </div>
</template>

<script>
import ApiMixin from '@/mixins/ApiMixin.js'

export default {
    name: 'Servico',
    mixins: [ ApiMixin ],
    props: ['id'],
    created() {
        this.getDadosApi(`http://localhost:3000/servicos/${this.id}`)
    },
    beforeRouteUpdate(to, from, next) {
        //to: $route para onde estamos indo
        //from: $route de onde estamos vindo
        //next: faz com que o fluxo de navegação diga em frente

        if(to.params.id != undefined) {
            this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`)
        }
        //console.log(from.params.id)
        next()
    }
    /* OU o explemplo a baixo
    watch: {
        $route(to) { //convenção: to para novo valor e o from: para valor antigo
            if(to.params.id != undefined ) {
                this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`)
            }
        }
    }*/
}    
</script>

<style scoped>

</style>