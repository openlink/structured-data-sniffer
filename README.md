# OpenLink Structured Data Sniffer

## Intro
The OpenLink Structured Data Sniffer (OSDS) is a plugin for the Chrome browser that detects and
shows structured data embedded in web pages in either of the following formats:

- **JSON-LD**
- **Microdata**
- **RDFa**
- **Turtle**

## License
Copyright 2015 [OpenLink Software](mailto:opensource@openlinksw.com)

This software is licensed under the GNU General Public License (see
[COPYING](http://github.com/openlink/structured-data-sniffer/blob/develop/COPYING)).

**Note**: that the only valid version of the GPL license as far as this project is concerned is the
original GNU General Public License Version 2, dated June 1991.


## Deployment

To deploy this extension on your local machine you can either *clone the git source tree* or *download a source archive* and then *install the extension* into your Chrome browser on the same system.

### Clone the git source tree
Clone the sources from github using the following commands:
```shell
$ cd src
$ git clone https://github.com/openlink/structured-data-sniffer
```
which will automatically download the latest develop branch.

### Download a source archive
Download and extract a .tar.gz or .zip from either one of the [stable releases ](https://github.com/openlink/structured-data-sniffer/releases/latest) or directly from one of the following links:

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

Next navigate to a page containing structured data such as:

  - [OpenLink Home Page](http://www.openlinksw.com/)
  - [BBC News](http://www.bbc.com/news)

and click on the little sniffer icon that appears in the address bar.
