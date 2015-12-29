#!/bin/bash
EXT_DIRNAME=./OSDS_Firefox
EXT_SRC=./src

rm -rf $EXT_DIRNAME

mkdir -pv $EXT_DIRNAME/data


SRC_DIR=./
DST_DIR=$EXT_DIRNAME/data

#copy info files
for I_DIR in AUTHORS COPYING CREDITS; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done


SRC_DIR=$EXT_SRC
DST_DIR=$EXT_DIRNAME/data

#copy common files
for I_DIR in handlers.js html_gen.js options.js panel.js settings.js sniffer.css sniffer.js; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

#copy Firefox related files
for I_DIR in browser_ff.js options_ff.html panel_ff.html; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

#copy resources and libs
for I_DIR in images lib; do
  mkdir $DST_DIR/$I_DIR
  tar --exclude 'original' -cf - -C $SRC_DIR/$I_DIR .|tar -xf - -C $DST_DIR/$I_DIR
done



SRC_DIR=$EXT_SRC/Firefox
DST_DIR=$EXT_DIRNAME

#copy Firefox ext files
for I_DIR in icon.png main.js package.json; do
  cp -va $SRC_DIR/$I_DIR $EXT_DIRNAME/
done

#copy Firefox ext dir
for I_DIR in data; do
  mkdir $DST_DIR/$I_DIR
  tar --exclude 'original' -cf - -C $SRC_DIR/$I_DIR .|tar -xf - -C $DST_DIR/$I_DIR
done





