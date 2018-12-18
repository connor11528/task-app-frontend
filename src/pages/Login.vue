<template>
	<div class="row">
		<div class='offset-md-4 col-md-4'>
			<h1>Login</h1>
			<div v-if="errors && errors.length">
				<div v-for="error of errors" class='alert alert-danger'>
			  		{{error}}
				</div>
			</div>

			<div class='form-group'>
				<label>Email</label>
				<input type="email" class='form-control' v-model='email'>
			</div>

			<div class='form-group'>
				<label>Password</label>
				<input type="password" class='form-control' v-model='password'>
			</div>

			<div class='btn btn-primary' @click='login'>Login</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	name: 'LoginPage',
	data(){
		return {
			email: '',
			password: '',
			errors: []
		}
	},
	methods: {
		login(){
			const { email, password } = this;

			this.$store.dispatch('login', { email, password })
				.then((res) => {
					this.$router.push('/dashboard');
				})
        .catch(error => {
        	this.errors.push(error)
        });
		}
	}
}

</script>