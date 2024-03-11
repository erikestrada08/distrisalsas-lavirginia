<template>
    <div class="Factura h-100 w-100">
        <div class="container fluid h-100">
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
                        <div class="boton-flotante" data-bs-toggle="modal" data-bs-target="#modal-agregar-producto">
                            <i class="mdi mdi-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-agregar-producto" tabindex="-1" aria-labelledby="modal-agregar-productoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header p-2 bg-danger text-white">
                        <h1 class="modal-title fs-5" id="modal-agregar-productoLabel">Crear Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <crear_producto ref="componenteCrearProducto"></crear_producto>
                    </div>
                    <div class="modal-footer p-2">
                        <button @click.prevent="crearProducto" type="button" class="btn btn-primary btn-sm">
                            <i class="mdi mdi-content-save"></i>
                            Guardar
                        </button>
                        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                            <i class="mdi mdi-close"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
            productos:[
                {producto:'VASO 7oz WAU!',cantidad:null,iva:null,total:null},
                {producto:'VASO 12oz CARIBE',cantidad:null,iva:null,total:null},
                {producto:'CONTENERDO 16oz WAU!',cantidad:null,iva:null,total:null},
                {producto:'CARNE HAMBURGUESA RICA 500g',cantidad:null,iva:null,total:null}
            ],
            productosOrden:[],
            productoBuscado:null
        }
    },
    methods:{
        agregarProducto(_producto,_indice){
            if(!this.productosOrden.includes(_producto)){
                this.productosOrden.push(_producto);
                this.productosOrden.sort();
                this.productos.splice(_indice,1);
            }
        },
        removerProducto(_producto,_indice){
            this.productosOrden.splice(_indice,1);
            this.productos.push(_producto);
            this.productos.sort();
        },
        crearProducto(){
            this.$refs.componenteCrearProducto.guardarProducto();
        }
    },
    computed:{
        opcionesProductos(){
            return this.productoBuscado ? this.productos.filter((_p) => {
                return _p.producto.toLowerCase().includes(this.productoBuscado.toLowerCase());
            }) : this.productos;
        }
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