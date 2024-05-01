<template>
    <div>
        <form>
            <div class="mb-2">
                <input v-model="producto.nombre" type="text" class="form-control form-control-sm" id="nombre-producto" placeholder="Nombre del producto">
            </div>
            <!-- <div class="mb-2">
                <input v-model="producto.referencia" type="text" class="form-control form-control-sm" id="nombre-referencia" placeholder="Referencia">
            </div>
            <div class="mb-2">
                <input v-model="producto.marca" type="text" class="form-control form-control-sm" id="nombre-marca" placeholder="Marca">
            </div> -->
            <div>
                <div class="input-group input-group-sm mb-2">
                    <select 
                    v-model="producto.marca"
                    class="form-select form-select">
                        <option disabled selected value="">Seleccionar Marca...</option>
                        <option v-for="(marca,i) in marcas" :key="i">{{ marca.marcaNombre }}</option>
                    </select>
                    <button 
                    class="btn btn-success" 
                    type="button"
                    @click="modalMarca = true; modal = true"
                    >
                        <i class="mdi mdi-plus"></i>
                    </button>
                </div>
            </div>
            <div>
                <div class="input-group input-group-sm mb-2">
                    <select 
                    v-model="producto.referencia"
                    class="form-select form-select">
                        <option disabled selected value="">Seleccionar Referencia...</option>
                        <option v-for="(referencia,i) in referencias" :key="i">{{ referencia.referenciaNombre }}</option>
                    </select>
                    <button 
                    class="btn btn-success" 
                    type="button"
                    @click="modalMarca = false; modal = true"
                    >
                        <i class="mdi mdi-plus"></i>
                    </button>
                </div>
            </div>
            <div class="mb-2">
                <input v-model="producto.precio" type="text" class="form-control form-control-sm" id="precio" placeholder="Precio">
            </div>
        </form>
        <v-dialog
        v-model="modal"
        max-width="500"
        >
            <div class="card">
                <div class="card-header">
                    Agregar {{ modalMarca ? 'Marca' : 'Referencia' }}
                </div>
                <div class="card-body">
                    <!-- contenido -->
                    <div class="mb-2">
                        <input v-if="modalMarca" v-model="marca" type="text" class="form-control form-control-sm" id="nombre-marca" placeholder="Marca">
                        <input v-else v-model="referencia" type="text" class="form-control form-control-sm" id="nombre-referencia" placeholder="Referencia">
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button 
                    @click.prevent="crearMarca"
                    class="btn btn-primary btn-sm">
                        Guardar {{ modalMarca ? 'Marca' : 'Referencia' }}
                    </button>
                </div>
            </div>
        </v-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            producto:{
                nombre:null,
                marca:null,
                referencia:null,
                precio:null
            },
            modal:false,
            marcas:[],
            marca:null,
            referencias:[],
            referencia:null
        }
    },
    methods:{
        async guardarProducto(){
            console.log('guardando producto...',this.producto);
            const DATOS = {
                "producto": this.producto.nombre,
                "marca": this.producto.marca,
                "referencia": this.producto.referencia,
                "precio": this.producto.precio
            }
            await this.axios.post('https://localhost:7128/api/Producto/Crear',DATOS).then(res=>{
                console.log(res.data);
            }).catch(err=>{
                console.error(err);
            });
        },
        async obtenerDatos(){
            await this.axios.get('https://localhost:7128/api/Marca/Listar').then(res=>{
                this.marcas = res.data;
            }).catch(err=>{
                console.error(err);
            });

            await this.axios.get('https://localhost:7128/api/Referencia/Listar').then(res=>{
                this.referencias = res.data;
            }).catch(err=>{
                console.error(err);
            });
        },
        async crearMarca(){
            const URL = this.modalMarca ?
                'https://localhost:7128/api/Marca/Crear':
                '';
            const DATOS = this.modalMarca ? 
            {
                marca : this.marca
            }:
            {
                referencia : this.referencia
            };
            await this.axios.post(URL,DATOS).then(res=>{
                console.log(res.data);
            }).catch(err=>{
                console.error(err);
            });
        }
    },
    mounted(){
        this.obtenerDatos();
    }
}
</script>
<style scoped>

</style>