import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';

import {transform} from 'ol/proj.js';


const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8080/geoserver/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
      'outputFormat=application/json&srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857'
    );
  },
  strategy: bboxStrategy,
});

const vector = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2,
    }),
  }),
});

const raster = new TileLayer({
  source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'ShapeFile:cad_export', 'TILED': true},
          serverType: 'geoserver',
          // Countries have transparency, so do not fade tiles:
          transition: 0,
        }),
});

const map = new Map({
  layers: [raster, vector],
  target: document.getElementById('map'),
  view: new View({
    center: transform([30.9876,-28.6472], 'EPSG:4326', 'EPSG:3857'),
    maxZoom: 19,
    zoom: 12,
  }),
});

// const layers = [
//   new TileLayer({
//     source: new OSM(),
//   }),
  
//   new TileLayer({
//     source: new TileWMS({
//       url: 'http://localhost:8080/geoserver/wms',
//       params: {'LAYERS': 'ShapeFile:cad_export', 'TILED': true},
//       serverType: 'geoserver',
//       // Countries have transparency, so do not fade tiles:
//       transition: 0,
//     }),
//   }),
// ];
// const map = new Map({
//   layers: layers,
//   target: 'map',
//   view: new View({
//     center: transform([30.9876,-28.6472], 'EPSG:4326', 'EPSG:3857'),
//     zoom: 10,
//   }),
// });


// ol.proj.transform(,"WGS84", "EPSG:900913")