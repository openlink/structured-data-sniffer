# Deprecated Repository for OpenLink Structured Data Sniffer

## Please refer to [the new primary repository for this extension](https://github.com/OpenLinkSoftware/OSDS_extension).

*This respository is primarily focused on developers.  You may want to also look 
at [the more user-/consumer-focused site](http://osds.openlinksw.com/).*

## Intro

The OpenLink Structured Data Sniffer (OSDS) is a plugin for 
[Google Chrome](http://www.google.com/chrome/browser/),
[Mozilla Firefox](http://www.mozilla.org/firefox/), and 
[Opera](http://www.opera.com/)
web browsers, that detects and shows structured data embedded in web pages 
in any of the following formats:

- **JSON-LD**
- **Microdata**
- **RDFa**
- **Turtle**

Support for additional browsers like
[Apple Safari](http://www.apple.com/safari/) and
[Microsoft Edge](https://www.microsoft.com/microsoft-edge)
is under construction.

## License
Copyright 2015-2021 [OpenLink Software](mailto:opensource@openlinksw.com)

This software is licensed under the GNU General Public License (see
[COPYING](https://github.com/OpenLinkSoftware/OSDS_extension/blob/develop/COPYING)).

**Note**: the only valid version of the GPL license as far as this project is concerned is the
original **GNU General Public License Version 2**, dated June 1991.


## Deployment

Stable and/or signed releases may be deployed from 
[the Chrome store](https://chrome.google.com/webstore/detail/openlink-structured-data/egdaiaihbdoiibopledjahjaihbmjhdj) 
or [the Mozilla catalog](https://addons.mozilla.org/en-US/firefox/addon/openlink-structured-data-sniff/).

To deploy the latest development version on your local machine, you can (1) either (a) *clone 
the git source tree* or (b) *download a source archive*, and then (2) *install the extension* 
into your Chrome or Opera browser on the same system.

### Clone the git source tree
Clone the sources from github using the following commands:
```shell
$ cd src
$ git clone https://github.com/OpenLinkSoftware/OSDS_extension

```
which will automatically download the latest develop branch.

### Download a source archive

Download and extract a `.tar.gz` or `.zip` from either one of the
[stable releases](https://github.com/OpenLinkSoftware/OSDS_extension/releases/latest)
or directly from one of the following links:

- [latest stable .tar.gz](https://github.com/OpenLinkSoftware/OSDS_extension/archive/master.tar.gz)
- [latest stable .zip](https://github.com/OpenLinkSoftware/OSDS_extension/archive/master.zip)
- [latest development .tar.gz](https://github.com/OpenLinkSoftware/OSDS_extension/archive/develop.tar.gz)
- [latest development .zip](https://github.com/OpenLinkSoftware/OSDS_extension/archive/develop.zip)


### Install the extension in Chrome

To install this extension manually in Chrome, use the following steps:

- Open the Chrome browser
- Select from menu: **Chrome** -> **Preferences** -> **Extensions**
- Check the [X] **Developer mode** box
- Choose the option **Load unpacked extension...**
- Navigate to the folder containing the extracted source code
- Press the **Select** button


### Install the extension in Opera

To install this extension manually in Opera, use the following steps:

- Open the Opera browser
- In address bar type in **opera:extensions**
- Press the **Developer Mode** button
- Choose the option **Load unpacked extension...**
- Navigate to the folder containing the extracted source
- Press the **Select** button

### Install the extension in Firefox

NOTE: Recent versions of Firefox only permit temporary installation of the unsigned `.xpi` file.  The latest 
signed extension, which may lag a bit behind the unsigned, can be permanently installed from the 
[Mozilla Add-ons catalog(https://addons.mozilla.org/en-US/firefox/addon/openlink-structured-data-sniff/).

To install this extension manually in Firefox, use the following steps:

- Download the [Firefox OSDS .zip](https://github.com/OpenLinkSoftware/OSDS_extension/releases/download/v2.16.1/OSDS_FF.zip)
file and extract the unsigned `.xpi` file.
- Open the **Firefox** browser
- In address bar type: **about:addons** or choose menu ** Add-ons**
- Click on Gear icon and choose **Debug Add-ons**
- Click on **Load Temporary Add-on**
- Navigate to the directory where you extracted the OSDS_FF.xpi file, select this file and press the
**Open** button


### Examples
Navigate to a page containing structured data such as:

  - [OpenLink Software Homepage](http://www.openlinksw.com/)
  - [BBC News Homepage](http://www.bbc.com/news)
  - [Ted.com talk by Susan Etlinger](https://www.ted.com/talks/susan_etlinger_what_do_we_do_with_all_this_big_data)
  - [DBpedia article on Semantic Web](http://dbpedia.org/page/Semantic_Web)

and click on the sniffer icon that appears in the address bar.
