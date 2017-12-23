<template>
  <div id="edit-member">
    <h3>Edit Member</h3>
    <div class="row">
      <!-- Form for Adding new member to the DB firebase -->
      <form @submit.prevent="updateMember" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="member_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required>
          </div>
        </div>
        <button type="submit" class="btn green">Submit</button>
         <!-- Back to Dashboard -->
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>  
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'edit-member',
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
    // update the Firebase db member info with new info from 'this' view
    updateMember (){
      db.collection('members').where
      ('members_id', '==', this.$route.params.member_id)
      .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              member_id: this.member_id,
              name: this.name,
              email: this.email
            })
            // return back to view-member page
            .then(() => {
              this.$router.push({name:'view-member',
              params: {member_id:this.member_id}})
            })
          })
        })
    }
  }
}
</script>
