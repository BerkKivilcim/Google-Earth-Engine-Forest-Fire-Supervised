# Investigation of Forest Fires with Google Earth Engine

## Contents
##### 1. Introduction
    1.1 What is Google Earth Engine and How it Works
    1.2 Audience
    1.3 License
    1.4 Comparasion Between Supervised and Unsupervised Methods
    1.5 Tools and Functions
    1.6 Register to Google Earth Engine
    1.7 Google Earth Engine Javascript Browser Layout
    
##### 2. How to use Code
    2.1 Code's User Workflow
    2.2 User Workflow Youtube Tutorial Video
    2.3 Importing Code
    2.4 Saving Code
    2.5 Area Selection
    2.6 Choosing Dates Before and After Burn
    2.7 Training Sample Selection

##### 3. Analysing Results
    3.1 Visual Image Analysing
    3.2 Chart Analysing
    3.3 Numerical Analysing
    3.4 Exporting Images and Charts
    
---

## INTRODUCTION:

### 1.1 What is Google Earth Engine and How it Works:

* Google Earth Engine (GEE) allow us to reach satellite image catalogs (catalog of the Sentinel – MODIS – Landsat) and use geospatial or image processing algorithms on those images. There are three different methods (JavaScript – Python – REST) to reach this image catalogs. In this tutorial we use the JavaScript (JS) as it is the native language of GEE.

* Javascript has its own Google Earth Engine platform can be reachable from any browser. The browser link is (https://code.earthengine.google.com/) 

* When you click to link it will tell you need to register. Process Explained in section 1.5.

* When we start the code; it sends a request to servers for compute and then gets results. So it will need internet connection.
 
![alt text](https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/01_What%20is%20Google%20Earth%20Engine_.png "Logo Title Text 1")

---

### 1.2 Audience:

* This open source code can be usable by anyone who want to see neutral true data about forest fires and environment also who want to test, develop for better forest fire investigation and researches.

---

### 1.3 License:

* This tutorial prepared by Berk Kıvılcım under the mentorship of Berk Anbaroğlu and Nusret Demir.

---

### 1.4 Comparasion Between Supervised and Unsupervised Methods:

**Supervised Method:**
* Mostly the results will be better. (Depends on training sample quality)
* The code works faster than unsupervised method. (Still slower than unsupervised in overall time because we need to select training sample)

**Unsuperivised Method:**
* The results depends on algorithm not the human so results will be more standardized.
* No need to select training sample so it need less human power and faster than supervised method.
* Easy to use but the code works slower than supervised method.

---

### 1.5 Tools and Functions:

* The code can be able to compute how many forest field burned (in hectare unit as default), Normalized Burn Ratio (NBR) and Normalized Difference Vegetation Index (NDVI) Charts, Burn Severity Rate, time interval of the burning and shows before-after satellite image results by using Sentinel-2 Satellite. Those datas can be downloadable.

* **IMPORTANT: You need to change something in this code for some spesific results like burn severity calculation. Each time you change something from code please don’t forget reclick to Run button for see the latest results.**

---

### 1.6 Register to Google Earth Engine:

* When you try to access https://code.earthengine.google.com/ you will face up with register screen. If you registered once you will never face it again.

* Click to "here" button then in next page fill the form and send a request to google. Usually your request approve immediately but sometimes it will take a while.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/%C3%A7emberli.jpg" width="100%">

---

### 1.7 Google Earth Engine Javascript Browser Layout:

![alt text](https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/layoutb%C3%BCy%C3%BCk.jpg "Logo Title Text 2")

* **Script Area:** The area is where we put our code.

* **Console Area:** The area is where graphical and numerical results displayed.

* **Map Area:** The area is where results of visualization displayed.

---

## HOW TO USE CODE:

### 2.1 Code's User Workflow:

<p align="center"><img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/workflowframe.jpg" width="70%"></p>

---

### 2.2 User Workflow Youtube Tutorial Video:

[[VIDEO LINK HERE CLICK ME]](https://www.youtube.com/watch?v=nVx4gLdaU9A)

---

### 2.3 Importing Code:

* Download and see the source code with the help of notepad softwares or directly open the code from the link below here then copy paste to whole source code into the Google earth engine's script section.

* **The Link for source code**: https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/Forest_Fire_Gee_with_more_comments.js

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/birle%C5%9Fik2.jpg" width="100%">

---

### 2.4 Saving Code:

* If you wanted to save your code into your Google Earth Engine account create a repository and load the script code into it.

* Click NEW, then click Repository:
<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/makereposi.jpg" width="50%">

* Write your repository name and create. It will Show up in Owner section.
<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/newrepo.jpg" width="40%">

* Then click to save it in your repository. You can use the code in this repository anytime you want.
<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/save.jpg" width="50%">

---

### 2.5 Area Selection:

* There are two different methods to identify polygons in other name areas.

* As default an example area sample identified which is cover to Izmir/Karabaglar region.

* **First method:** If you estimate or know the corner coordinates of the polygon which is you want to work it can be directly input by manually.

Just replace those coordinates with which coordinates you want to use. You can add or remove more polygon corner. **Those coordinates must be in Geodetic Coordinate format (latitude and longitude) which is based on WGS84 Ellipsoid .**

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/koordinat.jpg" width="60%">

* **Second Method:** If you want to select your area manually follow the steps below here. Also you can easily find your work area with search bar just typing your adresses.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/adress.jpg" width="100%">

**Step - 1:** Click to draw polygon button.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/%C5%9Fekil%C3%A7iz.jpg" width="30%">

**Step - 2:** Draw your polygon on map area.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/poligon%C3%A7iz.jpg" width="60%">  

* Also you can change the back layer of the visualization area for better visual understand. Two different options in here. Map and Satellite. If you select the satellite; the program will show the area with high quality satellite images.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/uydu.jpg" width="30%">

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/Screenshot_5.jpg" width="50%">

* When you finish the drawing polygon, the properties of this polygon will Show up above the script. Just don’t forget delete the whole initial ‘var geometry’ because we identify new polygon.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/yenikor%C3%A7er.jpg" width="50%">

---

### 2.6 Choosing Dates Before and After Burn:

* The dates are in ‘yyyy-mm-dd’ format. Enter a date you think was before the fire into the “var Start’s date section” and after the fire into the “var End’s date section”. When inputing the dates try to close them to date during burn. The closer to date during burn is gives better results.

```javascript
var Start=ee.Date('2019-07-05'); //date before burn
var End=ee.Date('2019-10-05');  //date after burn
var END =End.advance(50,'day');
```

**Some Date Selection Tips:**

* **Tip - 1: If your "var End" date is to close to present day you should change the "var END's" 50. This 50 means 50 days later from the "var End's" so sometimes it exceed the present day.**

* **Tip - 2.1: Trees will show different health situation with different seasons and also some exterior parameters like snow can effect the results. For example; you think the fire starts at july. Then select your time interval between june and August not like the January to December. In conclusion if Start and End dates close to burn date results will be more correct. If your region not tropical and you know the burn not start during winter season you can apply the filter below here for winter-autumn changes.**

* **Tip - 2.2: This season based erros in charts can be ignorable. Initial date filter shows the all data during the whole year (first day to 365th day) but If you change this initial values in the code's line 60 then you can filter the datas. For example If  you write 122 and 275 as start and end dates of the filter then the code only count the dates between 1 May to 1 October so not count the winter days and in the conclusion there would be no winter data in charts. In the example above here; 122 represent 122th day of the year which is means 1 May and 275 means 275th day of the year and its the 1 October.**

```javascript
.filter(ee.Filter.dayOfYear(122, 275)) 
```

<pre class="tab">    Unfiltered 2018-2020 graphic for 2019 forest fire.             Filtered 2018-2020 graphic for 2019 forest fire.</pre>    

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/biti%C5%9Fikgraf.jpg" width="100%">

* **Tip - 3: Google Earth Engine is a new technology so If you try to get old fire datas like 1999-2007-2010... There would be no data catalog so the code won't work and If you try to get newest fire datas like today's date the satellite probably not collect the data yet so you should wait a couple days or check the other satellite's datas.** 

---

### 2.7 Training Sample Selection:

* The code uses supervised classification for calculting how much area burned. For this process code needs to select some training areas. We can select it with point or polygon methods. I suggest to use polygon method. 

* Firstly create classes. Default classes are ("soil" (soil or dry land),  "tree" (healthy vegetation area), "burned" (burned areas)) so this classes must be created by user but still new classes can be added.

* Click to +new layer

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/new%20layer.jpg" width="50%">

* Determinede class properties. Type your Name; "soil", "tree" or "burned". Those names need to be exactly same from tutorial. Select FeatureCollection. Write **LC** which is mean landcover (do not type landcover or something different just type LC) to property section then write the values started from 01. **Burned areas property value always must be 03.** The reason behind that is the code export the 3rd class from classified image as only burned area layer so class value must be 3.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/%C3%B6zellik_%C3%A7er%C3%A7eve.jpg" width="50%">

* Then select the samples like from the below picture.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/sample.jpg" width="100%">

* If you want to add more classes than default there would be an extra step. Create your class and determine properties then in the code add .merge('your_new_class') to "var feature".

```javascript
var feature= soil.merge(tree).merge(burned);
```

* Also change classified picture's map.addLayer's max:___ to how many classes you want. In the beginning we have 3 classes so max: would be 3. We should change it.

```javascript
Map.addLayer(classified,{min:1, max:3, palette:['0000FF','00FF00','FF0000']},'classification');
```

Now we entered all things the code needed for run. Just click to run button and see the results.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/run.jpg" width="100%">

---

## ANALYSING RESULTS:

### 3.1 Visual Image Analysing:

* When we click run, the code process some algorithms which they will explained in workflow section of the tutorial. Results are show in console and map panels. For visual analysis use map section and for the numerical analysis check to console section.

* After the running code its divide map area into two section. The left part shows RGB – NBR images before burn and classified image after burn. The right part shows RGB – NBR images after burn and only the burned areas which is calculated from classified image.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/b%C3%BCt%C3%BCn.jpg" width="100%">

**RGB Image:** The image which is formed from red, green, blue layers. This layer shows us to what human eye can see.

**NBR Image:** NBR image maded from NBR calculation results. This layer help us to understand burning.

**Classified Image:** The image which is shows dry ground, healthy vegetation areas and burned areas.

**Only Burned:** The layer which is represent only the burned areas.

* We can check all of them from Layers section as a layer of each panels.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/layers.jpg" width="60%">

### **VERY IMPORTANT:** 
**Please check the classification is good or not. Its all about your training sample selection. Best way to check it; look the "only burned layer (white layer)" and "RGB Later layer or base satellite vision" together. If burned areas not cover the most of real burned areas or cover too much area like dry ground or healthy vegetation then click to Reset button. This button will turn back to inital layout which is shown in section 2.5's screenshot. Don't worry your previous training samples will be protected. Then select more training samples from where the classification looks wrong.**

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/layerli.jpg" width="60%">

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/bilgili.jpg" width="60%">

---

### 3.2 Chart Analysing:

* After the clicking run button, charts automaticly will show up in console section. There is two different chart. One shows the NBR and the other one shows NDVI. This both charts gave us the information about vegitation health and date interval of the burning.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/nbr.jpg" width="50%">

* NIR means Near Infra Red and SWIR means Shor Wave Infra Red bands of the satellite sensor.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/sentinel.jpg" width="50%">

* If you wanted to understand burning date interval put your Mouse on to graphic’s line. The breaking points (where the graphic mostly changed) will shows the date of burning.
For example: According to below graphic the fire started at ‘16-08-2019‘ and continued until the ’21-08-2019’.  This example based on İzmir Karabağlar and also its burning date data published from trthaber (turkish radio and television institution news).
* Referance web site for Izmır Karabağlar forest fire new is https://www.trthaber.com/haber/turkiye/izmir-ve-mugladaki-orman-yanginlari-uydudan-goruntulendi-427564.html

<p align="center"><img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/haber.jpg" width="70%"></p>
<p align="center"><img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/grafikler.jpg" width="70%"></p>

---

### 3.3 Numerical Analysing:

*  This code provide some numerical calculations like how many hectare burned or how bad is the burned area. Before the start we need to understand GSD (Ground Sample Distance).

* **GSD:** Ground Sample Distance is the lenght of each pixel’s edges corresponds in the real world distance. In this tutorial we used Sentinel-2 satellite which has the 10 meter GSD lenght for maximum resolution. That means each pixel correspond 100 (10*10) meter square area. Less GSD number means better resolution. 

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/istatistik.jpg" width="70%">

* **Burn Severity Calculation:** When we checked break points of the charts we understand the burn dates. Now check the NBR values of this breakpoints and input it to this beforevalue (NBR value of the date when fire begin) and aftervalue (NBR value of the date when fire stop). This will tell you the burn severity.

```javascript
var beforevalue=0.174
var aftervalue=-0.045
var delta=beforevalue-aftervalue
```

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/tablo.jpg" width="70%">

**Referance for the burn severity levels:** http://un-spider.org/advisory-support/recommended-practices/recommended-practice-burn-severity/in-detail/normalized-burn-ratio#:~:text=The%20Normalized%20Burn%20Ratio%20(NBR,shortwave%20infrared%20(SWIR)%20wavelengths.

---

### 3.4 Exporting Images and Charts:

* Exporting before and after RGB images quite simple. If you want before the burn images then click to “Export to Drive” button of left side map. If you want to after images then click to right side’s button. The difference between getting screenshot and pressing export; Exported images will be geotiff format which means images also have coordinate datas.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/button.jpg" width="20%">

* After the clicking button check the Task Section and clik to RUN.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/task.jpg" width="50%">

* Then click to Run again. This will export the image into your Google Drive adress. 
* **Note:** If the code tells, you passed the pixel limit you can select smaller area or increase the scale. Scale also is GSD. **That will decrease your image’s resolution.**

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/son.jpg" width="50%">

* If you want to export charts click to upper-right button of the chart.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/grafik%20indir.jpg" width="50%">

* Then select to which format you want to download.

<img src="https://github.com/axecasper/Google-Earth-Engine-Forest-Fire/blob/master/images/formats.jpg" width="50%">


---






