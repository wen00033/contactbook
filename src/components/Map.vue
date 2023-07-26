<template>
  <div>
    <h1
      class="uppercase text-2xl text-center p-2 bg-slate-400 font-black text-white"
    >
      The current location
    </h1>
    <l-map
      class="aspect-square h-screen"
      v-model:zoom="zoom"
      :center="[lat, long]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-circle-marker :lat-lng="[lat, long]" :radius="25" />
    </l-map>
  </div>
</template>

<script type="ts">
import L from 'leaflet';
import { LMap, LTileLayer, LCircleMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Spot",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  props:['lat','long'],
  data() {
    return {
      zoom: 19,
    };
  },
};
</script>
