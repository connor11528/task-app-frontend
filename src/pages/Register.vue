<template>
	<div class="row">
		<div class='offset-md-4 col-md-4'>
			<h1>Register</h1>

			<ul v-if="errors && errors.length">
				<li v-for="error of errors" style='color:red;'>
			  		{{error.message}}
				</li>
			</ul>

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
			errors: []
		}
	},
	methods: {
		register(){

			axios.post('/api/register', {
				email: this.email,
				password: this.password
			}).then(response => {
				console.log(response);
			})
			.catch(e => {
		    	this.errors.push(e)
		    });
		}
	}
}

</script>