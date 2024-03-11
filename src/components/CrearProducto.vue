<template>
    <div>
        <form>
            <div class="mb-2">
                <input v-model="producto.nombre" type="text" class="form-control form-control-sm" id="nombre-producto" placeholder="Nombre del producto">
            </div>
            <div>
                <div class="input-group input-group-sm mb-2">
                    <select class="form-select form-select">
                        <option selected>Seleccionar Marca...</option>
                        <option>WAU!</option>
                    </select>
                    <button class="btn btn-success" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#modal-crear-marca">
                        <i class="mdi mdi-plus"></i>
                    </button>
                </div>
            </div>
            <div class="mb-2">
                <input v-model="producto.referencia" type="text" class="form-control form-control-sm" id="referencia" placeholder="Referencia">
            </div>
            <div class="mb-2">
                <input v-model="producto.precio" type="text" class="form-control form-control-sm" id="precio" placeholder="Precio">
            </div>
        </form>

        <!-- modal👇🏻==================================================== -->

        <div class="modal fade" id="modal-crear-marca" tabindex="-1" aria-labelledby="modal-agregar-productoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header p-2 bg-danger text-white">
                        <h1 class="modal-title fs-5" id="modal-agregar-productoLabel">Crear Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Aqui va el contenido de la modal
                    </div>
                    <div class="modal-footer p-2">
                        <button  type="button" class="btn btn-primary btn-sm">
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

        <!-- modal☝🏻==================================================== -->


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
            }
        }
    },
    methods:{
        guardarProducto(){
            console.log('guardando producto...',this.producto);
        }
    }
}
</script>
<style scoped>

</style>