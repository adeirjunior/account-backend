<script>
    import axios from 'axios';
    
    let form = {
        username: '',
        email: '',
        password: ''
    }
    const Signup = () => axios.post('http://user-backend-test.vercel.app/api/user', form, { 
        headers: { 
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": true
        }})
        .then(res => console.log(res))
        .catch(err => console.error(err));
</script>

<form id="signup">
    <label for="username">
    Username
    <input id="username" name="username" type="text" bind:value={form.username} required>
    </label>
    <label for="email">
    Email
    <input id="email" name="email" type="email" bind:value={form.email} required>
    </label>
    <label for="password">
    Password
    <input id="password" name="password" type="password" bind:value={form.password} required>
    </label> 
    <button type="button" on:click={Signup}>Sign Up</button>
</form> 

<style>
    form {
        width: 200px;
        padding: 1em;
        height: auto;
        border: 1px black solid;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    label:not(:last-child) {
        margin-bottom: 1em;
    }
    button {
        margin: 1em 0;
        cursor: pointer;
    }
</style>