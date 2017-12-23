<template>
  <div id="view-member">
    <h3>View Member</h3>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Employee ID#:
        {{member_id}}</li>
              <li class="collection-item">Employee Email:
        {{email}}</li>
    </ul>
    <!-- Back to Dashboard / Delete member -->
    <router-link to="/" class="btn grey">Back</router-link>
    <!-- METHODS //  shorthand used of @click from v-on:click, Event Handling -->
    <button v-on:click="deleteMember" class="btn red">Delete</button>

    <!-- used router link to EDIT a NEW member -->
    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-member', 
        params: {member_id: member_id}}" 
      class="btn-floating btn-large red">
      <i class="fa fa-pencil"></i>
      </router-link>
    </div>

  </div>  
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-member',
  data () {
    return{
     member_id: null,
     name: null,
     email: null 
    }
  },
  // Used member_id from Dashboard
  beforeRouteEnter: (to, from, next) => {
    db.collection('members').where('members_id',
    '==', to.params.member_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.member_id = doc.data().members_id
            vm.name = doc.data().name
            vm.email = doc.data().email
          })
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('members').where
      ('members_id', '==', this.$route.params.member_id)
      .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.member_id = doc.data().member_id
          })
        })
    }, 
     // if @click delete Member need to remove form firebase db
    deleteMember () {
      if(confirm('Are you sure?')) {
        db.collection('members').where('members_id', '==',
        this.$route.params.member_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>
