import {useState, useRef} from "react";
import './Menu.css'
import { FaDrawPolygon } from "react-icons/fa";
import addDrawLayer from './Utils.js';
import { BiShapePolygon } from "react-icons/bi";
import map from './Map.js'

function Menu() {
    const addDrawLayer = map => {
        map.getStyle().layers.filter((layer) => layer.id.startsWith('cbs-draw')).forEach(layer =>{
            map.removeLayer(layer.id)
        });
        if(map.getSource('cbs-draw')) map.removeSource('cbs-draw');
        map.addSource('cbs-draw', {
            type: 'geojson',
            data: {
                "type": "FeatureCollection", 
                "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": []
                        }
                    }
                ]
            },
            tolerance: 0
        });
        map.addLayer({
            'id': 'cbs-draw-polygon',
            'source': 'cbs-draw',
            'type': 'fill',
            'layout': {
                'visibility': 'visible',
            },
            'paint': {
                'fill-color': '#d6c60f',
                'fill-opacity':0.3
            },
            'maxZoom': 24,
        });
        map.addLayer({
            'id': 'cbs-draw-line',
            'source': 'cbs-draw',
            'type': 'line',
            'layout': {
                'visibility': 'visible',
            },
            'paint': {
                'line-width': 3,
                'line-color': '#d6870f',
                'line-dasharray': [0.5, 2]
            },
        });
        
        map.addLayer({
            id: 'cbs-draw-point',
            type: 'circle',
            source: 'cbs-draw',
            'layout': {
                'visibility': 'visible',
            },
            paint: {
                'circle-color': '#d6870f',
                'circle-radius': 4,
            },
            
        });
    }

    const draw = useRef({
        click:0,
        point_number: 0,
        moveUpdate: false,
        addpoint: false,
        source: {
            "type": "FeatureCollection", 
            "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": []
                    }
                }
            ]
        }
    }) 

    const click = (e) => {
        let target = e.target.localName === 'span' || e.target.localName === 'svg' ? e.target.parentNode: e.target.localName === 'path' ? e.target.parentNode.parentNode : e.target;
        let active = document.querySelector('.cbs-menu-query-tab div.active');
        if(active !== null && active !== target) active.classList.toggle('active');
        // if(!target.classList.contains('active')) {
        //     setQuerymode(target.id)
        //     document.querySelector(".cbs-tab-indicator").dataset.value = target.id
        //     target.classList.toggle('active');
        //     setSelectedTables([]);
        //     setQueryDynamicTable(null);
        //     setReset(true);
        // }
    }

    const addSource = (source,type) => {
        map.addSource('cbs-query-source', {
            type: 'geojson',
            data:source,
            tolerance: 0,
            ...(type === 'Point' && {
                cluster: true,
                clusterMaxZoom: 22,
                clusterRadius: 50
            })
        });
    }
    const addLayers = (type,tableName) => {
        switch(type)
        {
            case 'Polygon':
                map.addLayer({
                    'id': `cbs-query-${tableName}`,
                    'source': 'cbs-query-source',
                    'type': 'fill',
                    'paint': {
                        'fill-color': 'red',
                        
                    },
                });
                map.addLayer({
                    'id': 'cbs-query-polygon-outline',
                    'source': 'cbs-query-source',
                    'type': 'line',
                    'paint': {
                        'line-color': 'black',
                    },
                });
                break;
                case 'LineString':
                    map.addLayer({
                        'id': `cbs-query-${tableName}`,
                        'source': 'cbs-query-source',
                        'type': 'line',
                        'paint': {
                        'line-color': 'blue',
                    },
                });
                break;
                case 'Point':
                    map.addLayer({
                        'id': 'cbs-query-point-cluster',
                        'type': 'circle',
                        'source': 'cbs-query-source',
                        'filter': ['has', 'point_count'],
                        'paint': {
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#2b83ba',
                                200,
                                '#abdda4',
                                400,
                                '#ffffbf',
                                600,
                                '#fdae61',
                                800,
                                '#d7191c'
                            ],
                            
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                15,
                                200,
                                20,
                                400,
                                25,
                                600,
                                30,
                                800,
                                35
                            ]
                        }
                    });
                    map.addLayer({
                        'id': 'cbs-query-point-cluster-count',
                        'type': 'symbol',
                        'source': 'cbs-query-source',
                        'filter': ['has', 'point_count'],
                        'layout': {
                            'text-field': '{point_count_abbreviated}',
                            'text-font': ['Roboto Medium'],
                        'text-size': 12
                    }
                });
                map.addLayer({
                    'id': `cbs-query-${tableName}`,
                    'type': 'circle',
                    'source': 'cbs-query-source',
                    'filter': ['!',['has','point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 6,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff'
                    }
                });
            }
            
        }

        const drawMove = e => {
            if(draw.current.moveUpdate)
            {
                if(draw.current.addpoint)
                {
                    draw.current.source.features[0].geometry.coordinates[0][draw.current.point_number] = [e.lngLat.lng, e.lngLat.lat];
                }
                else
                {
                    draw.current.source.features[0].geometry.coordinates[0].splice(draw.current.point_number,'0',[e.lngLat.lng, e.lngLat.lat]);
                    draw.current.addpoint = true;
                }
                map.getSource('cbs-draw').setData(draw.current.source);
            }
        }
        const drawClicked = e => {
            draw.current.click++;
            draw.current.moveUpdate = false;
            setTimeout(() => {
                draw.current.click = 0;
                draw.current.moveUpdate = true;
            },350);
            if(draw.current.click <= 1)
            {
                if(draw.current.source.features[0].geometry.coordinates.length === 0)
                {
                    draw.current.source.features[0].geometry.coordinates[0] = [
                        [e.lngLat.lng,e.lngLat.lat],
                        [e.lngLat.lng,e.lngLat.lat]
                    ]
                    draw.current.point_number = 1;
                    map.on('mousemove',drawMove);
                }
                else
                {
                    draw.current.source.features[0].geometry.coordinates[0][draw.current.point_number] = [e.lngLat.lng,e.lngLat.lat];
                    draw.current.addpoint = false;
                    draw.current.point_number++; 
                }
                map.getSource('cbs-draw').setData(draw.current.source);
            }
            else
            {
                draw.current = {
                    click:0,
                    point_number: 0,
                    moveUpdate: false,
                    addpoint: false,
                    source: {
                        "type": "FeatureCollection", 
                        "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": []
                                }
                            }
                        ]
                    }
                }
                map.off('click',drawClicked);
                map.off('mousemove',drawMove);
                map.getCanvas().style.cursor = "default";
                map.getSource('cbs-draw').setData(draw.current.source);
            }
        }
        const polygonDraw = () => {
            addDrawLayer(map);
            map.getCanvas().style.cursor = "crosshair";
            map.on('click',drawClicked);
        }

    return (
        <>
            <div onClick={polygonDraw}>
                <div><BiShapePolygon/></div>
            <span>Poligon Çiz</span>
            </div>
        </>
    )
}

export default Menu