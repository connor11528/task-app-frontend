<template>
	<div class="row">
		<div class='offset-md-4 col-md-4'>
			<h1>Register</h1>

			<div v-if="errors && errors.length">
				<div v-for="error of errors" class='alert alert-danger'>
			  		{{error.message}}
				</div>
			</div>
			<div v-if="success">
				<div class='alert alert-success'>{{ success }}</div>
			</div>

			<div class='form-group'>
				<label>Email</label>
				<input type="email" class='form-control' v-model='email'>
			</div>

			<div class='form-group'>
				<label>Password</label>
				<input type="password" class='form-control' v-model='password'>
			</div>
			
			<div class="btn btn-success" @click='register'>Submit</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'

export default {

	data(){
		return {
			email: '',
			password: '',
			errors: [],
			success: ''
		}
	},
	methods: {
		register(){

			axios.post('/api/register', {
				email: this.email,
				password: this.password
			}).then(response => {

				this.success  = response.data.message;
				this.email    = '';
				this.password = '';

			})
			.catch(error => {
		    this.errors.push(error.response.data);
		  });
		}
	}
}

</script>