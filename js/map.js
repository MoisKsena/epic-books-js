let mapManager = {
  mapElementId: 'map',
  centerPoint: {
    zoom: 15
  },
  storePoints: [{
      id: 1,
      name: 'Малая каштановая аллея, 9, м. Дунайская',
      coordinates: [59.84477426671663, 30.393153481475768]
    },
    {
      id: 2,
      name: 'ул. Ординарная улица, 4, м. Петроградская',
      coordinates: [59.96484123791887, 30.309093542991622]
    },
    {
      id: 3,
      name: 'Кронверкский проспект, 23, м. Горьковская',
      coordinates: [59.95730506730712, 30.31846113624572]
    }
  ]
};

ymaps.ready(init);

function init() {
  myMap = new ymaps.Map(mapManager.mapElementId, 
    {
      center: mapManager.storePoints[0].coordinates,
      zoom: mapManager.centerPoint.zoom 
    }
    );

  var storeGeoPoints = {};
  mapManager.storePoints.forEach(function (point, index) {
    storeGeoPoints[point.id] = {
      id: point.id,
      src: point,
      geoPoint: myMap.geoObjects.add(new ymaps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: point.coordinates
        },
        options: {
          preset: 'islands#blueIcon'
        }
      }))
    };
  });

  mapManager.getGeoPointBydId = function (id) {
    return storeGeoPoints[id];
  }

  mapManager.panToStore = function (id) {
    var point = storeGeoPoints[id];
    if (!!point) {
      myMap.panTo(point.src.coordinates);
    }
  }


}