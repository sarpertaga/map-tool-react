import React, { useRef, useEffect, useState, Fragment } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as turf from '@turf/turf'
import { featureCollection, geomEach, point } from '@turf/turf';
import { render } from '@testing-library/react';
import mapboxgl from 'mapbox-gl';
import proj4 from 'proj4';

export default function Map() {
    const mapContainer = useRef(null);
    const [editor, setEditor] = useState([])
    const getData = (editor) => setEditor(editor)
    const map = useRef(null);
    const [center] = useState([29.0,41.1]);
    const [zoom] = useState(8.5);
    const mapStyle = {
        id: "O_SM",
        version: 8,
        name: "OSM Street",
        glyphs: "https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf",
        sources: {
            "oda-street": {
                minzoom: 0,
                maxzoom: 18,
                type: "raster",
                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                tileSize: 256,
            },
        },
        layers: [
            {
                id: "O_SM",
                source: "oda-street",
                type: "raster",
                layout: {
                    visibility: "visible",
                }
            }
        ]
        
    }

    // useEffect(()=>{
    //     console.log(type);
    // },[type])

    useEffect(() => {
        if(map.current) return;
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style :mapStyle,
            center: center,
            zoom: zoom,
        });  


            // var draw = new MapboxDraw({
            //     displayControlsDefault: true,
            //     controls: {
            //         trash: true,
            //     },
            //     });
            //     map.current.addControl(draw);
                
            //     map.current.on('draw.create', getInfo)
            //     map.current.on('draw.delete', getInfo)
            //     map.current.on('draw.update', getInfo)

            //     function getInfo() {
            //         var data = draw.getAll()
            //         let geo = data.features
            //         //let type = data.features[0].geometry.type
            //         setEditor(geo)
            //     }

            // const onChange = () => {
            //     var data = draw.getAll()
            //     let geo = data.features[0].geometry.coordinates
            //     let type = data.features[0].geometry.type
            //     setEditor(geo)
            // }
            // setType(onChange)

            //     console.log(data.features[0].geometry)


            map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
                    // new maplibregl.Marker({color: "#FF0000"})
                    //     .setLngLat([28.7,41.2])
                    //     .addTo(map.current);

            // map.current.on('click', draw, function (e) {
            //         var coords = e.features[0].geometry.coordinates.slice()
            //         var geometryType = e.features.geometry.type
            //         while (Math.abs(e.lngLat.lng - coords[0]) > 180) {
            //             coords[0] += e.lngLat.lng > coords[0] ? 360 : -360   
            //         }
            //         setType(coords)

            //             new maplibregl.Popup()
            //             .setLngLat(coords)
            //             .setType(geometryType)
            //             .addTo(map);
            //             });
                // map.current.on('click', function (e) {
                //     var latitude = e.lngLat.lat;
                //     var longitude = e.lngLat.lng;
                //     var list = []
                //     var coordinates = list.push(latitude, longitude)
                //     var JsonObject = JSON.parse(JSON.stringify(list))
                //     //setEditor([[...editor], ...JsonObject])

                // })
                    // var feats = map.current.queryRenderedFeatures(e.point)
                    
                    // // let coord = mapboxgl.MercatorCoordinate.fromLngLat({
                    // //     lng: longitude, lat: latitude}, 0)
                    // //"Latitude:", latitude, "Longitude: ", longitude
                    // var list = []
                    // var coordinates = list.push(latitude, longitude)

                    // // console.log(list)

                        // if (list.length > 5) {
                        //     console.log("LineString")
                        // }
                        //     else {
                        //         console.log("Point")
                        //     }

                    // const getData = (e) => {
                    //     setEditor([...editor, ...list])
                    // }
                    //setEditor([[...editor], ...list])

                        // let tempEditor = [...editor]
                        // tempEditor.push(list)
                        //setType([...type, ...list])
                
                //})


                    // map.current.on('click', 'measure-lines', function (e) {
            //         new maplibregl.Popup()
            //             .setLngLat(e.lngLat)
            //             .setHTML(e.features[0].geometry.coordinates.slice(0,4))
            //             .addTo(map.current);
            //         });

            // map.current.on('mouseenter', 'measure-lines', function () {
            //         map.current.getCanvas().style.cursor = 'pointer';
             //         });
                    
            // map.current.on('mouseleave', 'measure-lines', function () {
            //         map.current.getCanvas().style.cursor = '';
            //         })
                
                    // var feats = map.current.queryRenderedFeatures(e.point)
                    // var latitude = e.lngLat.lat;
                    // var longitude = e.lngLat.lng;
                    // let coord = mapboxgl.MercatorCoordinate.fromLngLat({
                    //     lng: longitude, lat: latitude}, 0)
                    //"Latitude:", latitude, "Longitude: ", longitude

                    // var data = draw.getAll()
                    // var geometry = data.features
                    // setType(geometry)
                    // console.log(geometry)

                    // if (data.features.length > 0) {
                    //     setType(info)
                    // }
                    //     else {
                    //         setType("Invalid geometry")
                    //     }

                    


                    // if (list.length > 1) {
                    //     setType(geometryType)
                    //     console.log("Multi-string")
                    // }
                    //     else {
                    //         console.log("Invalid geometry")
                    //     }
                    

                    // const fetchData = async() => {
                    //     const result = await fetch(list)
                    //     setEditor(result)
                    // }
                    // fetchData()

                    // map.current.on('mousemove', function (e) {
                    //     var feats = map.current.queryRenderedFeatures(e.point);

                    // var displayProperties = [
                    //   'type',
                    //   'geometry'
                    // ];
                    
                    // var displayFeatures = feats.map(function (feat) {
                    //         var displayFeat = {};
                    //         displayProperties.forEach(function (prop) {
                    //             displayFeat[prop] = feat[prop];
                    //         });
                    //         return displayFeat;
                    //         });
                    
                    // setEditor(displayFeatures)


                    var geojson = {
                        'type': 'FeatureCollection',
                        'features': []
                    }
        
                    var poi = {
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Point',
                        'coordinates': []
                        }
                    }
        
                    var linestring = {
                        'type': 'Feature',
                        'geometry': {
                        'type': 'LineString',
                        'coordinates': []
                        }
                    }
        
                //     // var polygon = {
                //     //     'type': 'Feature',
                //     //     'geometry': {
                //     //     'type': 'Polygon',
                //     //     'coordinates': []
                //     //     }
                //     // }
        
                    map.current.on('load', function () {
                        map.current.addSource('geojson', {
                        'type': 'geojson',
                        'data': geojson
                        });
                         
                        map.current.addLayer({
                            id: 'points',
                            type: 'circle',
                            source: 'geojson',
                            paint: {
                                'circle-radius': 5,
                                'circle-color': '#888'
                            },
                            filter: ['in', '$type', 'Point']
                        });
        
                        map.current.addLayer({
                            id: 'lines',
                            type: 'line',
                            source: 'geojson',
                            layout: {
                                'line-cap': 'round',
                                'line-join': 'round'
                                },
                            paint: {
                                'line-color': '#555',
                                'line-width': 2.5
                                },
                            filter: ['in', '$type', 'LineString']
                        });
                    })
        
                    map.current.on('click', function (e) {
                        var features = map.current.queryRenderedFeatures(e.point, {
                        layers: ['points']
                        });
        
                        if (geojson.features.length > 1) geojson.features.pop();
                        
                        if (features.length) {
                            var id = features[0].properties.id;
                            geojson.features = geojson.features.filter(function (point) {
                            return point.properties.id !== id;
                            });
                            } 
                                else {
                                    var point = {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [e.lngLat.lng, e.lngLat.lat]
                                            },
                                        'properties': {
                                            'id': String(new Date().getTime())
                                            }
                                    };
                             
                            geojson.features.push(point);
                            console.log(geojson)
                            }
                             
                            if (geojson.features.length > 1) {
                                linestring.geometry.coordinates = geojson.features.map(
                                    function (point) {
                                    return point.geometry.coordinates;
                                    }
                            );
                             
                            geojson.features.push(linestring);
                            setEditor(geojson.features)
        
                            if (geojson.features.length < 1) {
                                poi.geometry.coordinates = geojson.features.map(
                                    function (point) {
                                    return point.geometry.coordinates
                                    }
                                )
                            }

                        }

                        else {
                            if (geojson.features.length === 0)
                            map.current.off('click', geojson)
                        }
                            map.current.getSource('geojson').setData(geojson);
                            //setEditor(geojson)

                    })

        
                            map.current.on('mousemove', function (e) {
                                var features = map.current.queryRenderedFeatures(e.point, {
                                layers: ['points']
                                });

                                map.current.getCanvas().style.cursor = features.length
                                ? 'pointer'
                                : 'crosshair';
                                });
                    
                })
 

        return (
            <>
            <form>
                <div className="features" style={
                    {
                    zIndex:20,
                    top: 50,
                    left: 10,
                    backgroundColor: "rgba: (211, 211, 211, 0.9)",
                    fontSize: 15,
                    color: 'bisque',
                    padding: 10,
                    margin: 10,
                    width: 500
                    }
                }>
                    {/* {editor &&<span>{JSON.stringify(editor)}</span>} */}
                    {/* <span onClick={() => getData(JSON.stringify(editor))}></span> */}
                        <span>
                            {JSON.stringify(editor)}
                            {/* {JSON.stringify(type)} */}
                        </span>
                </div>
            </form>
            <div ref={mapContainer} className="map">
            </div>
            </>
            
        )
}
