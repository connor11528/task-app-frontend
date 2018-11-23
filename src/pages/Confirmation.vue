<template>
<div class="row">
	<div v-if='success' class='offset-md-4 col-md-4'>
		<h1>Account confirmed!</h1>
    <p>Your account is now activated. You're free to...</p>
    <router-link to='/login' class='btn btn-lg btn-primary'> Login here</router-link>
	</div>

	<div v-if='!success' class='offset-md-4 col-md-4'>
		<h1>Hmmm we had a problem verifying your account</h1>
		<p>Please <a href='mailto:support@domain.com'>contact support</a></p>
	</div>

</div>


</template>
<script>
import axios from 'axios';

export default {
  name: 'ConfirmationPage',
	mounted(){
    const { token } = this.$route.query;

    axios.get(`/api/confirmation?token=${token}`)
      .then((response)=>{
        const { success, message } = response.data;

        if(success){
          this.success = true;
          this.message = message;
        }
      })
      .catch(error => {
        console.log(error);
      })
	},
	data(){
    return {
      success: false,
    }
	}
}

</script>