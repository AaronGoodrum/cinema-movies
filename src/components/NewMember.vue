<template>
  <div id="new-member">
    <h3>New Member</h3>
    <div class="row">
      <!-- Form for Adding new member to the DB firebase -->
      <form @submit.prevent="saveMember" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="Member ID #" type="text" v-model="member_id" required>
            <label></label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="Member Name" type="text" v-model="name" required>
            <label></label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="Member Email" type="text" v-model="email" required>
            <label></label>
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
import db from "./firebaseInit";
export default {
  name: 'new-member',
  data () {
    return{
      member_id: null,
      name: null,
      email: null 
    }
  },
  methods:{
    // Pulls from form "this" to add to db
    saveMember () {
      db.collection('members').add({
        members_id: this.member_id,
        name: this.name,
        email: this.email
      })
      // redir back to dashboard
      .then(docRef => this.$router.push('/'))
      // Log error
      .catch(error => console.log(err))
    }
  }
}
</script>
