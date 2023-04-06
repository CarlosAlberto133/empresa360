<template>
    <div>
        <h5>Componente Opçoes</h5>
        <p>Poderíamos recuperar os indicadores do serviço id {{ id }}</p>
    </div>
</template>

<script>
export default {
    name: 'Opcoes',
    props: ['id'],
    created() {
        //console.log('Parâmetro via props', this.id)
    },
    //beforeRouteUpdate(tp, from) {
    beforeRouteUpdate() {
        console.log('Guarda de componente beforeRoteUpdate')
    }
}    
</script>

<style scoped>

</style>