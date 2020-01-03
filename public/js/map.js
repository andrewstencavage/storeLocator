mapboxgl.accessToken = 'pk.eyJ1IjoiYXN0ZW5jYXZhZ2UiLCJhIjoiY2s0eWplOW5hMDE3bzNrczdxZjRpYXhzOSJ9.Ml-MgICVVJrMgVtjGP2t3Q';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [-71.535788, 43.204538]
});

//Fetch stores from API
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(store => {
        return      {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': store.location.coordinates
            },
            'properties': {
                'storeID': store.storeID,
                'icon': 'shop'
            }
        }
    });
    loadMap(stores);
}

//Load Map with stores
function loadMap(stores) {
    map.on('load', function () {
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': stores
                    // 'features': [{
                    //     'type': 'Feature',
                    //     'geometry': {
                    //         'type': 'Point',
                    //         'coordinates': [-71.535788, 43.204538]
                    //     },
                    //     properties: {
                    //         storeID: '0001',
                    //         icon: 'shop'
                    //     }
                    // }]
                }
            },
            'layout': {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeID}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}

getStores();