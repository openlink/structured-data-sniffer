# OpenLink Structured Data Sniffer

## Intro
The OpenLink Structured Data Sniffer (OSDS) is a plugin for the Chrome, Opera and the Firefox
browser, that detects and shows structured data embedded in web pages in either of the following
formats:

- **JSON-LD**
- **Microdata**
- **RDFa**
- **Turtle**

Support for additional browsers like Firefox, Safari, and Microsoft Edge is under construction.

## License
Copyright 2015 [OpenLink Software](mailto:opensource@openlinksw.com)

This software is licensed under the GNU General Public License (see
[COPYING](http://github.com/openlink/structured-data-sniffer/blob/develop/COPYING)).

**Note**: that the only valid version of the GPL license as far as this project is concerned is the
original GNU General Public License Version 2, dated June 1991.


## Deployment
To deploy this extension on your local machine you can either *clone the git source tree* or
*download a source archive* and then *install the extension* into your Chrome or Opera browser on
the same system.

### Clone the git source tree
Clone the sources from github using the following commands:
```shell
$ cd src
$ git clone https://github.com/openlink/structured-data-sniffer
```
which will automatically download the latest develop branch.

### Download a source archive
Download and extract a .tar.gz or .zip from either one of the
[stable releases](https://github.com/openlink/structured-data-sniffer/releases/latest)
or directly from one of the following links:

- [latest stable .tar.gz](https://github.com/openlink/structured-data-sniffer/archive/master.tar.gz)
- [latest stable .zip](https://github.com/openlink/structured-data-sniffer/archive/master.zip)
- [latest development .tar.gz](https://github.com/openlink/structured-data-sniffer/archive/develop.tar.gz)
- [latest development .zip](https://github.com/openlink/structured-data-sniffer/archive/develop.zip)


### Install the extension in Chrome
To install this extension manually use the following steps:

- Open the Chrome browser
- Select from menu: **Chrome** -> **Preferences** -> **Extensions**
- Check the [X] **Developer mode** box
- Choose the option **Load unpacked extension...**
- Navigate to the folder containing the extracted source code
- Press the **Select** button


### Install the extension in Opera
To install this extension manually use the following steps:

- Open the Opera browser
- In address bar type in **opera:extensions**
- Press the **Developer Mode** button
- Choose the option **Load unpacked extension...**
- Navigate to the folder containing the extracted source
- Press the **Select** button

### Install the extension in Firefox
Download the [Firefox OSDS .zip](https://github.com/openlink/structured-data-sniffer/releases/download/v2.4.2/OSDS_FF.zip)
file and extract the .xpi file.

To install this extension manually in Firefox v28+, use the following steps:
- Open the **Firefox** browser
- In address bar type: **about:config**
- Press the **I'll be careful, i promise** button
- Search for **xpinstall.signatures.required**
- Double click that line so the value is set to **false**
- In address bar type: **about:addons**
- Click on the Gear icon and select **Install Add-On from file...** from the menu
- Navigate to the directory where you extracted the OSDS_FF.xpi file, select this file and press the
  **Open** button
- Press the **install** button


### Examples
Navigate to a page containing structured data such as:

  - [OpenLink Software Homepage](http://www.openlinksw.com/)
  - [BBC News Homepage](http://www.bbc.com/news)
  - [Ted.com talk by Susan Etlinger](https://www.ted.com/talks/susan_etlinger_what_do_we_do_with_all_this_big_data)
  - [DBpedia article on Semantic Web](http://dbpedia.org/page/Semantic_Web)

and click on the sniffer icon that appears in the address bar.
