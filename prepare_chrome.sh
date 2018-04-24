#!/bin/bash
EXT_DIRNAME=./OSDS_Chrome
EXT_SRC=./src

rm -rf $EXT_DIRNAME

mkdir -pv $EXT_DIRNAME


SRC_DIR=./
DST_DIR=$EXT_DIRNAME

#copy info files
for I_DIR in AUTHORS COPYING CREDITS; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done


SRC_DIR=$EXT_SRC
DST_DIR=$EXT_DIRNAME

#copy common files
for I_DIR in background.html background.js frame.js handlers.js converters.js ttl_gen.js html_gen.js options.js panel.js settings.js sniffer.css sniffer.js page_panel.js utils.js psniffer.css content.css; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

for I_DIR in webrequest.js browser.js options.html panel.html page_panel.html; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

#copy Chrome related files
cp -va $SRC_DIR/manifest.json $DST_DIR/


for I_DIR in images lib; do
  mkdir -pv $DST_DIR/$I_DIR
  tar --exclude 'original' -cf - -C $SRC_DIR/$I_DIR .|tar -xf - -C $DST_DIR/$I_DIR
done

