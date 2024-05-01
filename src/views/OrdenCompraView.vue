<template>
    <div class="Factura h-100 w-100">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-8 py-2">
                    <div class="row">
                        <div class="col d-flex justify-content-center">
                            <div class="card" style="width:70%;">
                                <div class="card-header">
                                    Orden de Compra
                                </div>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li 
                                        v-for="producto,i in productosOrden"
                                        :key="i"
                                        @click.prevent="removerProducto(producto,i)"
                                        class="list-group-item producto-orden">
                                            {{ producto.producto }}
                                        </li>
                                    </ul>
                                </div>   
                                <div v-if="productosOrden.length>0" class="card-footer text-end">
                                    <button class="btn btn-primary" type="button" id="button-addon2">
                                        <i class="mdi mdi-content-save"></i>
                                        Guardar Orden de Compra
                                    </button>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
                <div class="col border">
                    <div class="h-100 py-2">
                        <div class="mb-2">
                            <div class="input-group">
                                <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Buscar Producto" 
                                v-model="productoBuscado"
                                >
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i class="mdi mdi-magnify"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <ul class="list-group list-group-flush">
                                <li 
                                v-for="producto, i in opcionesProductos"
                                :key="i"
                                @click.prevent="agregarProducto(producto,i)"
                                class="list-group-item producto-orden">
                                    {{ producto.producto }}
                                </li>
                            </ul>
                        </div>
                        <div class="boton-flotante"
                        @click="modalAgregarProducto = true"
                        >
                            <i class="mdi mdi-plus"></i>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <v-dialog
        v-model="modalAgregarProducto"
        max-width="500"
        >
            <div class="card">
                <div class="card-header">
                    Agregar Producto
                </div>
                <div class="card-body">
                    <crear_producto
                    ref="componenteCrearProducto"
                    ></crear_producto>
                </div>
                <div class="card-footer text-end">
                    <button 
                    @click.prevent="crearProducto"
                    class="btn btn-primary btn-sm">
                        Guardar Producto
                    </button>
                </div>
            </div>
        </v-dialog>
    </div>
</template>
<script>
import crear_producto from '../components/CrearProducto.vue'
export default {
    components:{
        crear_producto
    },
    data(){
        return {
            productos:[],
            productosOrden:[],
            productoBuscado:null,
            modalAgregarProducto:false,
        }
    },
    methods:{
        agregarProducto(_producto){
            if(!this.productosOrden.includes(_producto)){
                this.productosOrden.push(_producto);
                this.productosOrden.sort();
                this.productos.splice(this.productos.indexOf(_producto), 1);
            }
        },
        removerProducto(_producto,_indice){
            if(!this.productos.includes(_producto)){
                this.productosOrden.splice(_indice,1);
                this.productos.push(_producto);
                this.productos.sort();
            }
        },
        crearProducto(){
            this.$refs.componenteCrearProducto.guardarProducto();
        },
        async obtenerDatos(){
            await this.axios.get('https://localhost:7128/api/Producto/Listar').then(res=>{
                this.productos = res.data;
            }).catch(err=>{
                console.error(err);
            });
        }
    },
    computed:{
        opcionesProductos(){
            return this.productoBuscado ? this.productos.filter((_p) => {
                return _p.producto.toLowerCase().includes(this.productoBuscado.toLowerCase());
            }) : this.productos;
        }
    },
    mounted() {
        this.obtenerDatos();
    }
}
</script>
<style scoped>
.boton-flotante {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #b41c23;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.boton-flotante:hover {
    background-color: green;
}
.producto-orden:hover{
    cursor:pointer;
    background-color:lightcoral;
}
</style>