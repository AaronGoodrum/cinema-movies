<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <!-- Loop all member in DB from -->
      <li v-for="member in members" 
      v-bind:key="member.id"
      class="collection-item">
      <div class="chip">{{member.members_id}}</div>
      {{member.name}} : {{member.eMail}}
      
      <!-- Router link to "member ID #" with member_id to edit member -->
      <router-link class="secondary-content"
      v-bind:to="{name: 'view-member', params:{member_id:member.members_id}}">
      <i class="fa fa-eye"></i>
      </router-link>
      </li>
    </ul>
<!-- used router link to Add a NEW member -->
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
      <i class="fa fa-plus"></i>
      </router-link>
    </div>

  </div>  
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return{
      members: []
    }
  },
  created () {
    // GET from firebase db 
    db.collection('members').orderBy('members_id').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'members_id': doc.data().members_id,
          'name': doc.data().name,
          'eMail': doc.data().email
        }
        this.members.push(data)
      })
    })
  }
}
</script>
