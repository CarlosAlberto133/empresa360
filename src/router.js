// --- Início das rotas
import { createRouter, createWebHistory } from 'vue-router'

//createWebHashHistory
//import Contratos from '@/components/vendas/Contratos.vue'
//import Dashboard from '@/components/dashboard/Dashboard.vue'
//import DashboardRodape from '@/components/dashboard/DashboardRodape.vue'
//import Home from '@/views/Home.vue'
//import Indicadores from '@/components/servicos/Indicadores.vue'
//import Lead from '@/components/vendas/Lead.vue'
//import Leads from '@/components/vendas/Leads.vue'
//import Login from '@/views/Login.vue'
//import Opcoes from '@/components/servicos/Opcoes.vue'
//import PaginaNaoEncontrada from '@/views/PaginaNaoEncontrada.vue'
//import Servico from '@/components/servicos/Servico.vue'
//import Servicos from '@/components/servicos/Servicos.vue'
//import Site from '@/views/Site.vue'
//import Vendas from '@/components/vendas/Vendas.vue'
//import VendasPadrao from '@/components/vendas/VendasPadrao.vue'

//lazy loading = importação tardia 'com delay'
//Para melhorar a performace de carregamento, é recomendado ter todos os importes dessa forma, pois serão baixados 
//apeenas 1 vez, e ficarão em cache

const Contratos = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Contratos.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */'@/components/dashboard/Dashboard.vue')
const DashboardRodape = () => import(/* webpackChunkName: "dashboard" */'@/components/dashboard/DashboardRodape.vue')
const Home = () => import('@/views/Home.vue')
const Indicadores = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Indicadores.vue')
const Lead = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Lead.vue')
const Leads = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Leads.vue')
const Login = () => import('@/views/Login.vue')
const Opcoes = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Opcoes.vue')
const PaginaNaoEncontrada = () => import('@/views/PaginaNaoEncontrada.vue')
const Servico = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Servico.vue')
const Servicos = () => import(/* webpackChunkName: "servicos" */'@/components/servicos/Servicos.vue')
const Site = () => import('@/views/Site.vue')
const Vendas = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/Vendas.vue')
const VendasPadrao = () => import(/* webpackChunkName: "vendas" */'@/components/vendas/VendasPadrao.vue')

/* webpackChunkName: "vendas" */ //-Serve para unificar os pacotes para download, componentes que são 1 só 

const routes = [
    {
        path: '/',      //localhost:8080/
        component: Site,
        meta: { requerAutorizacao: false }
    },
    {
        path: '/home',  //localhost:8080/home
        meta: { requerAutorizacao: true },
        alieas: '/app',
        component: Home,
        children: [
            { path: 'vendas', component: Vendas, children: [
                { 
                    path:'leads', 
                    component: Leads, 
                    name: 'leads',
                    //beforeEnter(to, from) {
                    beforeEnter() {    
                        //poderiamos verificar se o usuário tem permissão de carregar a rota
                        console.log('Guarda de rota beforeEnter') 
                    }
                }, //localhost:8080/home/vendas/leads
                { path:'leads/:id', props: true, component: Lead, name: 'lead' }, //localhost:8080/home/vendas/leads/1
                { path:'contratos', component: Contratos, name: 'contratos' }, //localhost:8080/home/vendas/contratos
                { path: '', component: VendasPadrao, name: 'vendas'}    //localhost:8080/home/vendas/
            ] },    //localhost:8080/home/vendas
            
            { path: 'servicos', component: Servicos, name: 'serviços', children: [
                { 
                    path: ':id', 
                    props: {
                        default: true,
                        indicadores: true,
                        opcoes: true
                    }, 
                    alias: '/s/:id', 
                    name: 'servico', 
                    components: { //localhost:8080/home/servicos/1
                        default: Servico,
                        opcoes: Opcoes,
                        indicadores: Indicadores
                    } 
                }  
            ] },   //localhost:8080/home/servicos

            { path: 'dashboard', components: {
                default: Dashboard,
                rodape: DashboardRodape
                }
            }  //localhost:8080/home/dashboard
        ]
    },
    {
        path: '/login', //localhost:8080/login
        component: Login,
        meta: { requerAutorizacao: false, campo2: 'teste', campo3: 50 }
    },
    { path: '/redirecionamento-1', redirect: '/home/servicos' }, //Ex: pelo path
    { path: '/redirecionamento-2', redirect: { name: 'leads' } }, // Ex: pelo nome
    { path: '/redirecionamento-3', redirect: '/home/vendas' },
    { path: '/redirecionamento-4', redirect: to => {    // Ex: por uma função
        //Podemos programar algo antes do redirecionamento ser efetivado
            console.log(to)

            //return '/home/vendas'
            return {  name: 'vendas' }
        } 
    },
    //{ path: '/:catchall(.*)*', redirect: '/' } //Ex: exemplo de redirecionamento caso link errado
    { path: '/:catchall(.*)*', component: PaginaNaoEncontrada }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        //return { left: 0, top: 150 } //left = x - barra inferior; top = y - barra da direita
        console.log(to.hash)
        if(savedPosition) {
            return savedPosition
        }

        if(to.hash) {
            return { el: to.hash } //to.hash deve corresponder a um id de elemento html
            //fragmento = #secao_1 => id = secao_1
        }
        
        return { left: 0, top: 0 }
    },
    routes: routes  //Forma simplificada seria apenas o routes, ja que os 2 tem o mesmo nome
})

//router.beforeEach((to, from) => {
router.beforeEach(() => {
    console.log('Guarda global beforeEach')
})

//router.afterEach((to, from) => {
router.afterEach(() => {
    console.log('Guarda global afterEach')
}),

router.beforeResolve(() => {
    console.log('Guarda global beforeResolve')
})

export default router

// --- Fim das rotas