<template>
  <v-app>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Distrisalsas La Virginia</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer 
    v-model="drawer" 
    app
    >
      <v-list
      density="compact" 
      nav
      >
      <v-list-item 
        prepend-icon="mdi-monitor-dashboard"
        title="Dashboard" 
        value="dashboard"
        to="/dashboard"
        ></v-list-item>
        <v-list-item 
        prepend-icon="mdi-cart-arrow-down"
        title="Proveedores" 
        value="proveedores"
        to="/proveedor"
        ></v-list-item>
        <v-list-item 
        prepend-icon="mdi-basket"
        title="Productos" 
        value="productos"
        to="/producto"
        ></v-list-item>
        <v-list-item 
        prepend-icon="mdi-group"
        title="Categorias" 
        value="categorias"
        to="/categoria"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
