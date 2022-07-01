import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';

import {transform} from 'ol/proj.js';

const layers = [
  new TileLayer({
    source: new OSM(),
  }),
  
  new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/wms',
      params: {'LAYERS': 'ShapeFile:cad_export', 'TILED': true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
  }),
];
const map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: transform([30.9876,-28.6472], 'EPSG:4326', 'EPSG:3857'),
    zoom: 10,
  }),
});

// ol.proj.transform(,"WGS84", "EPSG:900913")