/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2016 OpenLink Software
 *
 *  This project is free software; you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License as published by the
 *  Free Software Foundation; only version 2 of the License, dated June 1991.
 *
 *  This program is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 */

var Browser = {
//    isFirefox:(!navigator.userAgent.match(/khtml/i) && !!navigator.userAgent.match(/Gecko/i)&& !!navigator.userAgent.match(/Firefox/i)),
//    isWebKit:!!navigator.userAgent.match(/AppleWebKit/),
    isChromeAPI: true,
    isFirefoxSDK: false,

    isChromeWebExt: false,
    isFirefoxWebExt: false,
    isEdgeWebExt: true
}