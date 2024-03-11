<template>
    <div class="Factura h-100 w-100">
        <div class="container fluid h-100">
            <div class="row py-2">
                <div class="col align-items-center">
                    <div class="input-group">
                        <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Buscar Producto en la Orden" 
                        >
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                            <i class="mdi mdi-magnify"></i>
                        </button>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group">
                        <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Buscar Producto en la Factura" 
                        >
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                            <i class="mdi mdi-magnify"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row h-100 pt-2">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Orden de Compra #1
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li 
                                v-for="producto, i in productosOrden"
                                :key="i"
                                @click.prevent="vincularFactura(producto, i)"
                                class="list-group-item producto-orden"
                                >{{ producto.producto }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Factura
                            <select class="form-select form-select-sm" aria-label="Small select example">
                                <option selected>Seleccionar Proveedor</option>
                                <option 
                                v-for="proveedor, i in proveedores"
                                :key="i"
                                value="1"
                                >
                                    {{ proveedor }}
                                </option>
                            </select>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li 
                                v-for="producto, i in productosFactura"
                                :key="i"
                                class="list-group-item producto-orden"
                                >
                                    <div class="row">
                                        <div 
                                        @click.prevent="desvincularFactura(producto,i)"
                                        class="col"
                                        >
                                            {{ producto.producto }}
                                        </div>
                                        <div class="col">
                                            <div class="row">
                                                <div class="col p-1">
                                                    <input type="number" class="form-control form-control-sm" id="cantidad-comprada" placeholder="Cant." v-model="producto.cantidad">
                                                </div>
                                                <div class="col p-1">
                                                    <select class="form-select form-select-sm" aria-label="Small select example" v-model="producto.iva">
                                                        <option selected>0%</option>
                                                        <option>19%</option>
                                                    </select>
                                                </div>
                                                <div class="col p-1">
                                                    <input type="text" class="form-control form-control-sm" id="costo-total" placeholder="Total" v-model="producto.total">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="text-end">
                                <h5>TOTAL: ${{ total }}</h5>
                            </div>
                        </div>
                        <div v-if="productosFactura.length>0" class="card-footer">
                            <button 
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="guardarFactura"
                            >
                                <i class="mdi mdi-content-save"></i>
                                Guardar Factura
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            productosOrden:[
                {producto:'VASO 7oz WAU!',cantidad:null,iva:null,total:null},
                {producto:'VASO 12oz CARIBE',cantidad:null,iva:null,total:null},
                {producto:'CONTENERDO 16oz WAU!',cantidad:null,iva:null,total:null},
                {producto:'CARNE HAMBURGUESA RICA 500g',cantidad:null,iva:null,total:null},
            ],
            productosFactura:[],
            proveedores:[
                'KIVE ANDINA',
                'BOLSAS PLÁSTICAS FREDY',
                'HOUSE DISTRIBUCIONES',
                'LA FORTUNA',
                'ZENÚ'
            ],
            productoBuscado:null
        }
    },
    methods:{
        vincularFactura(_producto, _indice){
            if(!this.productosFactura.includes(_producto)){
                this.productosFactura.push(_producto);
                this.productosFactura.sort();
                this.productosOrden.splice(_indice,1);
            }
        },
        desvincularFactura(_producto,_indice){
            this.productosFactura.splice(_indice,1);
            this.productosOrden.push(_producto);
            this.productosOrden.sort();
        },
        async guardarFactura(){
            console.log(this.productosFactura);
            this.productosFactura = [];
            await this.axios.post('',this.productosFactura).then((res)=>{
                console.log(res.data);
            }).catch((err)=>{
                console.error(err);
            });
        }
    },
    computed:{
        total(){
            let total = 0;
            console.log(this.productosFactura.iva);
            this.productosFactura.forEach((p)=>{
                if(p.total){
                    const SUB_TOTAL = p.iva ? parseFloat(p.total) *(1 + (parseInt(p.iva)/100)) : parseFloat(p.total);
                    total += SUB_TOTAL;
                }
            });
            return total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
}
</script>
<style scoped>
.producto-orden:hover{
    cursor:pointer;
    background-color:lightcoral;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>