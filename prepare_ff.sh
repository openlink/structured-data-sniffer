#!/bin/bash
EXT_DIRNAME=./OSDS_FF
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
for I_DIR in background.html background.js content.css converters.js frame.js; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

for I_DIR in handlers.js html_gen.js OidcWebid.js oidc-webid-inject.js options.html options.js; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

for I_DIR in page_panel.html page_panel.js panel.html panel.js dataview.css; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

for I_DIR in settings.js sniffer.css sniffer.js ttl_gen.js utils.js webrequest.js; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

for I_DIR in helpers.js helpers_ui.js; do
  cp -va $SRC_DIR/$I_DIR $DST_DIR/
done

#copy Firefox related files
cp -va $SRC_DIR/manifest.json.ff $DST_DIR/manifest.json
cp -va $SRC_DIR/browser_ff_WebExt.js $DST_DIR/browser.js

for I_DIR in images lib; do
  mkdir -pv $DST_DIR/$I_DIR
  tar --exclude 'original' -cf - -C $SRC_DIR/$I_DIR .|tar -xf - -C $DST_DIR/$I_DIR
done

rm $DST_DIR/lib/oidc-web.min.js.map
