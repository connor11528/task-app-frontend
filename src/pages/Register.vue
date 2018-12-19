<template>
	<div class="row">
		<div class='offset-md-4 col-md-4'>
			<h1>Register</h1>

			<div v-if="errors && errors.length">
				<div v-for="error of errors" class='alert alert-danger'>
			  		{{ error }}
				</div>
			</div>
			<div v-if="success">
				<div class='alert alert-success'>✅ {{ success }}</div>
			</div>

			<div class='form-group'>
				<label>Email</label>
				<input type="email" class='form-control' v-model='email'>
			</div>
			
			<div class="btn btn-success" @click='register'>Submit</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import store from '../store'

export default {

	data(){
		return {
			email: '',
			errors: [],
			success: false
		}
	},
	methods: {
		register(){
			const { email } = this;

			this.$store.dispatch('register', { email })
				.then((response) => {
					this.success = response;
					this.email   = '';
				})
		    .catch(error => {
		    	this.errors.push(error)
		    });
		}
	}
}

</script>