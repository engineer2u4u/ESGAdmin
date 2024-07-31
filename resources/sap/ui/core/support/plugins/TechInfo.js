/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/Log','sap/base/util/isEmptyObject','sap/base/util/isPlainObject','../Plugin','../Support','../ToolsAPI','sap/base/security/encodeXML'],function(L,a,b,P,S,T,e){"use strict";var c=P.extend("sap.ui.core.support.plugins.TechInfo",{constructor:function(o){P.apply(this,["sapUiSupportTechInfo","Technical Information",o]);this._aEventIds=this.runsAsToolPlugin()?[this.getId()+"Data",this.getId()+"FinishedE2ETrace"]:[this.getId()+"ToggleDebug",this.getId()+"SetReboot",this.getId()+"Refresh",this.getId()+"StartE2ETrace",this.getId()+"ToggleStatistics"];if(this.runsAsToolPlugin()){this.e2eLogLevel="medium";this.e2eTraceStarted=false;}}});c.prototype.onsapUiSupportTechInfoData=function(E){var t=this;var D=E.getParameter("data");D.modules.sort();this.e2eTraceStarted=D["e2e-trace"].isStarted;var h=["<div class='sapUiSupportToolbar'>","<button id='",t.getId(),"-Refresh' class='sapUiSupportRoundedButton'>Refresh</button>","<div><div class='sapUiSupportTechInfoCntnt'>","<table border='0' cellpadding='3' class='infoTable'>"];function f(i,j){var k=[];if(i){var n=/^(\d{4})(\d{2})(\d{2})-?(\d{2})(\d{2})$/.exec(i);if(n){i=n[1]+'-'+n[2]+'-'+n[3]+'T'+n[4]+":"+n[5];}k.push("built at "+d(i));}if(j){k.push("last change "+d(j));}return k.length===0?"":" ("+k.join(", ")+")";}var p="SAPUI5";var V="not available";try{var o=sap.ui.getVersionInfo();p=o.name;V="<a href='"+sap.ui.resource("","sap-ui-version.json")+"' target='_blank' class='sapUiSupportLink' title='Open Version Info'>"+d(o.version)+"</a>"+f(o.buildTimestamp,o.scmRevision);}catch(g){}l(h,true,true,p,function(i){i.push(V);});if(!/openui5/i.test(p)){l(h,true,true,"OpenUI5 Version",function(i){i.push(d(D.version)+f(D.build,D.change));});}l(h,true,true,"Loaded jQuery Version",function(i){return D.jquery;});l(h,true,true,"User Agent",function(i){return D.useragent+(D.docmode?", Document Mode '"+D.docmode+"'":"");});l(h,true,true,"Debug Sources",function(i){i.push((D.debug?"ON":"OFF"),"<a href='#' id='",t.getId(),"-tggleDbgSrc' class='sapUiSupportLink'>Toggle</a>");});l(h,true,true,"Application",D.appurl);m(h,true,true,"Configuration (bootstrap)",D.bootconfig);m(h,true,true,"Configuration (computed)",D.config);if(!a(D.libraries)){m(h,true,true,"Libraries",D.libraries);}m(h,true,true,"Loaded Libraries",D.loadedLibraries);l(h,true,true,"Loaded Modules",function(j){jQuery.each(D.modules,function(i,v){if(v.indexOf("sap.ui.core.support")<0){j.push("<span>",d(v),"</span>");if(i<D.modules.length-1){j.push(", ");}}});});m(h,true,true,"URI Parameters",D.uriparams);l(h,true,true,"E2E Trace",function(i){i.push("<label class='sapUiSupportLabel'>Trace Level:</label>","<select id='",t.getId(),"-logLevelE2ETrace' class='sapUiSupportTxtFld sapUiSupportSelect'>","<option value='low'"+(t.e2eLogLevel==='low'?" selected":"")+">LOW</option>","<option value='medium'"+(t.e2eLogLevel==='medium'?" selected":"")+">MEDIUM</option>","<option value='high'"+(t.e2eLogLevel==='hight'?" selected":"")+">HIGH</option>","</select>");i.push("<button id='"+t.getId()+"-startE2ETrace' class='sapUiSupportRoundedButton "+(D["e2e-trace"].isStarted?" active":"")+"' style='margin-left: 10px;'>"+(D["e2e-trace"].isStarted?"Running...":"Start")+"</button>");i.push("<div style='margin-top:5px'>");i.push("<label class='sapUiSupportLabel'>XML Output:</label>");i.push("<textarea id='"+t.getId()+"-outputE2ETrace' style='width:100%;height:50px;margin-top:5px;resize:none;box-sizing:border-box'></textarea>");i.push("</div>");});h.push("</table></div>");this.$().html(h.join(""));this.$("tggleDbgSrc").on("click",function(E){E.preventDefault();S.getStub().sendEvent(t.getId()+"ToggleDebug",{});});this.$("Refresh").on("click",function(E){E.preventDefault();S.getStub().sendEvent(t.getId()+"Refresh",{});});this.$("outputE2ETrace").on("click",function(){this.focus();this.select();});this.$("startE2ETrace").on("click",function(){if(!t.e2eTraceStarted){t.e2eLogLevel=t.$("logLevelE2ETrace").val();t.$("startE2ETrace").addClass("active").text("Running...");t.$("outputE2ETrace").text("");S.getStub().sendEvent(t.getId()+"StartE2ETrace",{level:t.e2eLogLevel});t.e2eTraceStarted=true;}});document.title="UI5 Diagnostics - "+D.title;};c.prototype.onsapUiSupportTechInfoToggleDebug=function(E){jQuery.sap.debug(!jQuery.sap.debug());s(this);};c.prototype.onsapUiSupportTechInfoSetReboot=function(E){jQuery.sap.setReboot(E.getParameter("rebootUrl"));};c.prototype.onsapUiSupportTechInfoStartE2ETrace=function(E){var t=this,f=E.getParameter("level");sap.ui.require(['sap/ui/core/support/trace/E2eTraceLib'],function(g){g.start(f,function(h){S.getStub().sendEvent(t.getId()+"FinishedE2ETrace",{trace:h});});},function(o){L.error("Could not load module 'sap/ui/core/support/trace/E2eTraceLib':",o);});};c.prototype.onsapUiSupportTechInfoFinishedE2ETrace=function(E){this.$("startE2ETrace").removeClass("active").text("Start");this.$("outputE2ETrace").text(E.getParameter("trace"));this.e2eTraceStarted=false;};c.prototype.onsapUiSupportTechInfoRefresh=function(E){s(this);};c.prototype.onsapUiSupportTechInfoToggleStatistics=function(E){jQuery.sap.statistics(!jQuery.sap.statistics());s(this);};c.prototype.init=function(o){P.prototype.init.apply(this,arguments);if(!this.runsAsToolPlugin()){s(this);return;}this.$().html("No Information available");};function s(p){var C=T.getFrameworkInformation();var D={version:C.commonInformation.version,build:C.commonInformation.buildTime,change:C.commonInformation.lastChange,jquery:C.commonInformation.jquery,useragent:C.commonInformation.userAgent,docmode:C.commonInformation.documentMode,debug:C.commonInformation.debugMode,bootconfig:C.configurationBootstrap,config:C.configurationComputed,libraries:C.libraries,loadedLibraries:C.loadedLibraries,modules:C.loadedModules,uriparams:C.URLParameters,appurl:C.commonInformation.applicationHREF,title:C.commonInformation.documentTitle,statistics:C.commonInformation.statistics};var E=sap.ui.require('sap/ui/core/support/trace/E2eTraceLib');D["e2e-trace"]={isStarted:E?E.isStarted():false};S.getStub().sendEvent(p.getId()+"Data",{data:D});}function d(f){return f==null?"":e(String(f));}function l(f,r,g,h,i){f.push("<tr><td ",r?"align='right' ":"","valign='top'>","<label class='sapUiSupportLabel'>",d(h),"</label></td><td",g?" class='sapUiSupportTechInfoBorder'":"",">");var j=i;if(typeof i==='function'){j=i(f);}f.push(d(j));f.push("</td></tr>");}function m(f,r,g,h,j){l(f,r,g,h,function(f){f.push("<table border='0' cellspacing='0' cellpadding='3' style='width: 100%'>");jQuery.each(j,function(i,v){var k="";if(v){if(typeof(v)==="string"||typeof(v)==="string"||typeof(v)==="boolean"){k=v;}else if(Array.isArray(v)||b(v)){k=JSON.stringify(v);}}l(f,false,false,i,""+k);});f.push("</table>");});}return c;});