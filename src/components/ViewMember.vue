<template>
  <div id="view-members">
    <h3>View Members</h3>    
  </div>  
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-members',
  data () {
    return{
     member_id: null,
     name: null,
     email: null 
    }
  },
  beforeRouteEnter: (to, from, next) => {
    db.collection('members').where('member_id',
    '==', to.params.member_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.member_id = doc.data().member_id
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
      ('member_id', '==', this.$route.params.member_id)
      .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.member_id = doc.data().member_id
          })
        })
    }
  }
}
</script>
