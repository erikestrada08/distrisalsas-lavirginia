<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col d-flex justify-content-center">
                <div
                class="card shadow" 
                style="max-width: 400px;min-width: 300px;">
                    <div class="card-body">
                        <h5 class="card-title text-center">Iniciar sesión</h5>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                            <input 
                            type="email" 
                            class="form-control" 
                            id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electrónico"
                            v-model="form.email">
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                            <input 
                            type="password" 
                            class="form-control" id="exampleInputPassword1" placeholder="Contraseña"
                            v-model="form.password"
                            >
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
                        </form>
                        <div v-show="messageError" class="alert alert-danger mb-0 mt-2" role="alert">
                            Atención: {{ messageError }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            form: {
                email:null,
                password:null
            },
            messageError:null
        }
    },
    methods:{
        async login() {
            await this.$axios.get('/sanctum/csrf-cookie').then(()=>{
                this.$axios.post('/login',this.form).then(res=>{
                    if(res.status==204){
                        console.log('Bienvenido');
                        this.messageError = null;
                    }
                }).catch(err=>{
                    console.error(err);
                    this.messageError = err.response.data.message;
                });
            }).catch(err=>{
                console.error(err);
            });
        }
    }
}
</script>

<style>

</style>