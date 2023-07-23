<template>
  <div class="h-56 w-4/4">
    <l-map ref="map" v-model:zoom="zoom" :center="[lat, long]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="[lat, long]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
export default {
  name: Map,
  props: ["lat", "long"],
  components: {
    LMarker,
    LMap,
    LTileLayer,
    LIcon,
  },
  data() {
    return {
      zoom: 18,
      iconWidth: 2,
      iconHeight: 1,
    };
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
};
</script>
