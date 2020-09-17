# Investigation of Forrest Fires with Google Earth Engine

## Contents
##### 1. Introduction
    1.1 What is Google Earth Engine and How it Works
    1.2 Audience
    1.3 Tools and Function
    1.4 Google Earth Engine Javascript Browser Layout
    
##### 2. How to use Code
    2.1 Importing Code
    2.2 Saving Code
    2.3 Area Selection
    2.4 Date Selection

##### 3. Analysing Results
    3.1 Visual Image Analysing
    3.2 Chart Analysing
    3.3 Numerical Analysing
    3.4 Exporting Images


## INTRODUCTION:

#### 1.1 What is Google Earth Engine and How it Works:

Google Earth Engine (GEE) allow us to reach satellite image catalogs (catalog of the Sentinel – MODIS – Landsat) and use geospatial or image processing algorithms on those images. There is are three different methods (Javascript – Python – REST) to reach this image catalogs. In this tutorial we handle use the JavaSscript (JS) as it is the native language of GEE.

Javascript has its own Google Earth Engine platform can be reachable from any browser. The browser link is (https://code.earthengine.google.com/) 

**IMPORTANT: You need to change something in this code for some spesific results like burn severity calculation. Each time you change something from code please don’t forget reclick to Run button for see the latest results.**

When we start the code; ,it sends a request to servers for compute and then gets results. So it will need internet connection.
 
![alt text](https://github.com/axecasper/Google-Earth-Engine-Forrest-Fire/blob/master/images/01_What%20is%20Google%20Earth%20Engine_.png "Logo Title Text 1")

#### 1.2 Audience:

This open source code can be usable by anyone who want to see neutral true data about forrest fires and environment also who want to test, develop for better forrest fire investigation and researches.

#### 1.3 Tools and Functions:

The code can be able to compute how many forrest field burned (in hectare unit as default), Normalized Burn Ratio (NBR) and Normalized Difference Vegetation Index (NDVI) Charts, 
Burn Severity Rate, time interval of the burning and shows before-after satellite image results which can be downloadable.

#### 1.4 Google Earth Engine Javascript Browser Layout:

![alt text](https://github.com/axecasper/Google-Earth-Engine-Forrest-Fire/blob/master/images/layoutb%C3%BCy%C3%BCk.jpg "Logo Title Text 2")
