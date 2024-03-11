<template>
  <v-app>

    <v-app-bar 
    app
    color="red-accent-4"
    >
      <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img 
        src="/logo-distrisalsas-del-eje-2.ico"  
        max-width="95"
        contain
        @click="this.$router.push('dashboard')"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer 
    v-model="drawer" 
    :rail="rail"
    permanent
    >
      <v-list
      density="compact" 
      nav
      @click.prevent="rail = false"
      v-model:opened="open"
      >
        <!-- <v-list-item 
          prepend-icon="mdi-monitor-dashboard"
          title="Dashboard" 
          value="dashboard"
          to="/dashboard"
          @click="cambiarNombre('Dashboard')"
        ></v-list-item>

        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item 
              v-bind="props"
              prepend-icon="mdi-cart-arrow-down"
              title="Proveedores" 
              value="proveedores"
            ></v-list-item>
          </template>

          <v-list-item 
              title="Registrar Proveedor" 
              value="registrar"
              to="/proveedor"
              @click="cambiarNombre('Registrar Proveedor')"
            ></v-list-item>
            <v-list-item 
              title="Seguimiento a Proveedor" 
              value="registrar"
              to="/proveedor"
            ></v-list-item>
        </v-list-group>

        <v-list-item 
          prepend-icon="mdi-basket"
          title="Productos" 
          value="productos"
          to="/producto"
          @click="cambiarNombre('Productos')"
        ></v-list-item>

        <v-list-item 
        prepend-icon="mdi-group"
        title="Categorias" 
        value="categorias"
        to="/categoria"
        @click="cambiarNombre('categorías')"
        ></v-list-item> -->
        <v-list-item
        prepend-icon="mdi-group"
        title="Facturas" 
        value="facturas"
        to="/facturas"
        @click="cambiarNombre('Facturas')"
        >

        </v-list-item>
        <v-list-item
        prepend-icon="mdi-file-edit-outline"
        title="Orden de Compra" 
        value="orden-compra"
        to="/orden-compra"
        @click="cambiarNombre('Ordenes de Compra')"
        >

        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main @click="rail = true">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      open:null,
    };
  },
  methods: {
    cambiarNombre(titulo) {
      document.title=titulo;
    },
  }
};
</script>
