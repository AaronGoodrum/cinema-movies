import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Movielist from '@/components/MovieList'
import Newmember from '@/components/NewMember'
import Viewmember from '@/components/ViewMember'
import Editmember from '@/components/EditMember'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/movies',
      name:'movie-list',
      component: Movielist
    },
    {
      path: '/new',
      name: 'new-member',
      component: Newmember
    },
    {
      path: '/:member_id',
      name: 'view-member',
      component: Viewmember
    },
    {
      path: '/edit/:member_id',
      name: 'edit-member',
      component: Editmember
    }
  ]
})
