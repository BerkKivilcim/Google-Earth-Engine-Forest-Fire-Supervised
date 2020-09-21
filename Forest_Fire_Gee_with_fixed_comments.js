
//Sentinel 2 Image collection
var Start=ee.Date('2019-07-05'); //date before burn
var End=ee.Date('2019-10-05');  //date after burn
var END =End.advance(50,'day');

var geometry = ee.Geometry.Polygon(
        [[26.99059815747183,38.27096885531639],
 [26.962789014405423,38.261636895183976],
 [26.96484895092886,38.24761769501632],
[26.945279553956205,38.24006777471134],
 [26.94218964917105,38.21336712677703],
 [26.958325818604642,38.202036618379246],
[26.98785157544058,38.2120183492158],
 [26.989911511964017,38.193942318311926],
 [27.04827638012808,38.23035958219917],
[27.070592359131986,38.27349718272393],
 [27.054112866944486,38.3125685123244],
 [27.004674390381986,38.313107280125934],
 [26.99059815747183,38.27096885531639]]);

// Cloud Masking which is used for RGB visualization.
var s1 = ee.Image('COPERNICUS/S2/20160422T084804_20160422T123809_T36TVK')


function maskS2clouds(s1) {
  var qa = s1.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return s1.updateMask(mask).divide(10000);
}

//Image Collection for RGB Visualization
var collection = ee.ImageCollection('COPERNICUS/S2')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterDate(Start,End)
                  //.filter(ee.Filter.dayOfYear(FirstDay, LastDay)) 
                  .sort('DATE_ACQUIRED',true)
                  .map(maskS2clouds);
                  
var collection3 = ee.ImageCollection('COPERNICUS/S2')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterDate(End,END)
                  //.filter(ee.Filter.dayOfYear(FirstDay, LastDay)) 
                  .sort('DATE_ACQUIRED',true)
                  .map(maskS2clouds);                 

//Image Collection for NBR visualization and calculation
var collection2= ee.ImageCollection('COPERNICUS/S2_SR')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .filterDate(Start,End)                
                  //.filter(ee.Filter.dayOfYear(FirstDay, LastDay)) 
                  .sort('DATE_ACQUIRED',true)

// Calculating NBR and Using image collection properties which is means it using image collection date and satellite properties.
var NBR = collection2.map(
    function(collection2) {
         return collection2.normalizedDifference(['B8','B11'])
                  .rename('NBR')
                  .copyProperties(collection2, ['system:time_start']); 
    });
// NDVI Calculation    
var NDVI = collection2.map(
    function(collection2) {
         return collection2.normalizedDifference(['B8','B4'])
                  .rename('NDVI')
                  .copyProperties(collection2, ['system:time_start']); 
    });    
 
// Making a NBR and NDVI time series chart.  

var options = {
  title: 'Sentinel-2 Spectral Indexs NBR',
  hAxis: {title: 'Date'},
  vAxis: {title: 'Value'},
  lineWidth: 1,
  series: {
    0: {color: 'FF0000'}, // NBR
}};
var options2 = {
  title: 'Sentinel-2 Spectral Indexs NDVI',
  hAxis: {title: 'Date'},
  vAxis: {title: 'Value'},
  lineWidth: 1,
  series: {
    0: {color: '00FF00'}, // NDVI
}};
print(ui.Chart.image.series(NBR, geometry, ee.Reducer.mean(), 10).setOptions(options));   
print(ui.Chart.image.series(NDVI,geometry,ee.Reducer.mean(),10).setOptions(options2));

//Visualization in below map
// Calculating NBR again for selected area
//Nbr layer before burn
var nir = collection.median().select('B8');
var swir = collection.median().select('B11');
var nbr = nir.subtract(swir).divide(nir.add(swir)).rename('nbr');
var clipnbr=nbr.clip(geometry); 
//Nbr layer after burn
var nir3 = collection3.median().select('B8');
var swir3 = collection3.median().select('B11');
var nbr3 = nir3.subtract(swir3).divide(nir3.add(swir3)).rename('nbr3');
var clipnbr3=nbr3.clip(geometry); 


//Visualization in below map this NBR layer.
Map.centerObject(geometry, 15);
var ndviParams = {min: -1, max: 1, palette: ['black','white', 'green']};
Map.addLayer(clipnbr, ndviParams, 'NBR image');
Map.addLayer(clipnbr3,ndviParams,'NBR After Image')
// RGB Visualization
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
//RGB layer before burn
var clipdata1=collection.median().clip(geometry); //defining selected geometry to image collection
Map.addLayer(clipdata1, rgbVis , 'RGB Before');
//RGB layer after burn
var clipdata3=collection3.median().clip(geometry);
Map.addLayer(clipdata3, rgbVis, 'RGB Later');

// classification
//Select training areas for toprak - tree - burned
var feature= toprak.merge(tree).merge(burned);

var bands=['B4','B3','B2'];
var training=clipdata3.sampleRegions({
  collection:feature,
  properties:['LC'],
  scale:10
});

var classifier=ee.Classifier.cart().train({
  features:training,
  classProperty:'LC',
  inputProperties: ['B4','B3','B2']
});

var classified=clipdata3.select(bands).classify(classifier);
Map.addLayer(classified,{min:1, max:3, palette:['0000FF','00FF00','FF0000']},'classification');
// subtracting only burned class from classified image
var subset = classified.eq(03).selfMask();
Map.addLayer(subset,{},'Only Burned Areas')

var c=subset.reduceRegion({
  reducer:ee.Reducer.count(),
  geometry:geometry,
  scale:10
})
// getting amount of pixels of only burned class
var realValue=ee.Number(c.get('classification'))
print(realValue)

var pixel_area=10*10;
var hectar_m2_ratio=10000
// calculating burned areas in unit of hectare
print('yanan hektar',realValue.multiply(pixel_area/hectar_m2_ratio))

// calculating burn severity
var beforevalue=0.174
var aftervalue=-0.045
var delta=beforevalue-aftervalue

if (delta>0.66) {print('its high severity burn')
} else if (delta>0.44) {print('its Moderate-high severity burn')
} else if (delta>0.27){print('its moderate-low severity burn')
} else if (delta>0.1){print('its low severity burn')
} else if (delta>-0.1){print('its Unburned')
} else if (delta>-0.25){print('low post fire regrowth')
} else if (delta<-0.25){print('high post fire regrowth')
}

// Making a user interface
var leftMap=ui.Map()
leftMap.drawingTools().setShown(true);
var rightMap=ui.Map()
rightMap.drawingTools().setShown(true);


var beforeimage=ui.Map.Layer(clipdata1, rgbVis ,'RGB Before Burn')
var afterimage=ui.Map.Layer(clipdata3, rgbVis ,'RGB After Burn ')
var beforenbr=ui.Map.Layer(clipnbr, ndviParams, 'NBR Before Burn')
var afternbr=ui.Map.Layer(clipnbr3, ndviParams, 'NBR After Burn')
var interclass=ui.Map.Layer(classified.randomVisualizer(),{}, 'Classified Image After Burn')
var onlyburn=ui.Map.Layer(subset,{},"only 2")


// Making a user interface
var leftMap=ui.Map()
leftMap.drawingTools().setShown(true);
var rightMap=ui.Map()
rightMap.drawingTools().setShown(true);


var beforeimage=ui.Map.Layer(clipdata1, rgbVis ,'RGB Before Burn')
var afterimage=ui.Map.Layer(clipdata3, rgbVis ,'RGB After Burn ')
var beforenbr=ui.Map.Layer(clipnbr, ndviParams, 'NBR Before Burn')
var afternbr=ui.Map.Layer(clipnbr3, ndviParams, 'NBR After Burn')
var interclass=ui.Map.Layer(classified.randomVisualizer(),{}, 'Classified Image After Burn')
var onlyburn=ui.Map.Layer(subset,{},"only burned")


var oldMap = ui.root.widgets().get(0)

var before_layer=leftMap.layers()
var after_layer=rightMap.layers()

before_layer.add(beforeimage).add(beforenbr).add(interclass)
after_layer.add(afterimage).add(afternbr).add(onlyburn)


// center map buttons
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(leftMap.centerObject(geometry,13));
  }
});
button.style().set('position','bottom-right')
leftMap.add(button)

var button2 = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(rightMap.centerObject(geometry,13));
  }
});
button2.style().set('position','bottom-right')
rightMap.add(button2)

// export buttons
var button3 = ui.Button({
  label: 'Export to Drive',
  onClick: function() {
    print(Export.image.toDrive({image:clipdata1,description: "RGB Before",folder: "GEE data",region: geometry,scale:10}));
  }
});
button3.style().set('position','bottom-left')
leftMap.add(button3)

var button4 = ui.Button({
  label: 'Export to Drive',
  onClick: function() {
    print(Export.image.toDrive({image:clipdata3,description: "RGB After",folder: "GEE data2",region: geometry,scale:10}));
  }
});
button4.style().set('position','bottom-left')
rightMap.add(button4)

// Back to initial layout buttons
var button5= ui.Button({
  label:'Reset', 
  onClick:function () {
  ui.root.clear()
  ui.root.add(oldMap)
}})
button5.style().set('position','top-left')
leftMap.add(button5)

var button6= ui.Button({
  label:'Reset', 
  onClick:function () {
  ui.root.clear()
  ui.root.add(oldMap)
}})
button6.style().set('position','top-left')
rightMap.add(button6)


var linkPanel=ui.Map.Linker([leftMap],[rightMap])
leftMap.centerObject(geometry,13)
rightMap.centerObject(geometry,13)


ui.root.widgets().reset([ui.SplitPanel({
  firstPanel:leftMap,
  secondPanel:rightMap,
})])
