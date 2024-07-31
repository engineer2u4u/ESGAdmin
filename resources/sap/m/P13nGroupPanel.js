/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','./P13nConditionPanel','./P13nPanel','./P13nGroupItem',"sap/ui/thirdparty/jquery"],function(l,P,a,c,q){"use strict";var d=l.P13nPanelType;var e=l.P13nConditionOperation;var f=a.extend("sap.m.P13nGroupPanel",{metadata:{library:"sap.m",properties:{maxGroups:{type:"string",group:"Misc",defaultValue:'-1'},containerQuery:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},groupItems:{type:"sap.m.P13nGroupItem",multiple:true,singularName:"groupItem",bindable:"bindable"}},events:{addGroupItem:{parameters:{}},removeGroupItem:{},updateGroupItem:{}}},renderer:{apiVersion:2,render:function(r,C){r.openStart("section",C);r.class("sapMGroupPanel");r.openEnd();r.openStart("div");r.class("sapMGroupPanelContent");r.class("sapMGroupPanelBG");r.openEnd();C.getAggregation("content").forEach(function(o){r.renderControl(o);});r.close("div");r.close("section");}}});f.prototype.setMaxGroups=function(m){this.setProperty("maxGroups",m);if(this._oGroupPanel){this._oGroupPanel.setMaxConditions(m);}return this;};f.prototype._getConditions=function(){return this._oGroupPanel.getConditions();};f.prototype.setContainerQuery=function(b){this.setProperty("containerQuery",b);this._oGroupPanel.setContainerQuery(b);return this;};f.prototype.setLayoutMode=function(m){this.setProperty("layoutMode",m);this._oGroupPanel.setLayoutMode(m);return this;};f.prototype.validateConditions=function(){return this._oGroupPanel.validateConditions();};f.prototype.removeInvalidConditions=function(){this._oGroupPanel.removeInvalidConditions();};f.prototype.removeValidationErrors=function(){this._oGroupPanel.removeValidationErrors();};f.prototype.onBeforeNavigationFrom=function(){return this.validateConditions();};f.prototype.onAfterNavigationFrom=function(){return this.removeInvalidConditions();};f.prototype.setOperations=function(o){this._aOperations=o;if(this._oGroupPanel){this._oGroupPanel.setOperations(this._aOperations);}};f.prototype.init=function(){this.setType(d.group);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("GROUPPANEL_TITLE"));sap.ui.getCore().loadLibrary("sap.ui.layout");this._aKeyFields=[];if(!this._aOperations){this.setOperations([e.GroupAscending,e.GroupDescending]);}this._oGroupPanel=new P({maxConditions:this.getMaxGroups(),autoReduceKeyFieldItems:true,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange(),validationExecutor:q.proxy(this._callValidationExecutor,this)});this._oGroupPanel.setOperations(this._aOperations);this._oGroupPanel._sAddRemoveIconTooltipKey="GROUP";this.addAggregation("content",this._oGroupPanel);};f.prototype.exit=function(){var b=function(o){if(o&&o.destroy){o.destroy();}return null;};this._aKeyFields=b(this._aKeyFields);this._aOperations=b(this._aOperations);};f.prototype.onBeforeRendering=function(){if(this._bUpdateRequired){this._bUpdateRequired=false;var k=[];var m=(this.getBindingInfo("items")||{}).model;var g=function(n,o,i){var b=i.getBinding(n);if(b&&o){return o.getObject()[b.getPath()];}return i.getMetadata().getProperty(n)?i.getProperty(n):i.getAggregation(n);};this.getItems().forEach(function(i){var o=i.getBindingContext(m);if(i.getBinding("key")){o.getObject()[i.getBinding("key").getPath()]=i.getKey();}k.push({key:i.getColumnKey(),text:g("text",o,i),tooltip:g("tooltip",o,i)});});k.splice(0,0,{key:null,text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("P13NDIALOG_SELECTION_NONE")});this._oGroupPanel.setKeyFields(k);var C=[];m=(this.getBindingInfo("groupItems")||{}).model;this.getGroupItems().forEach(function(G){var o=G.getBindingContext(m);if(G.getBinding("key")){o.getObject()[G.getBinding("key").getPath()]=G.getKey();}C.push({key:G.getKey(),keyField:g("columnKey",o,G),operation:g("operation",o,G),showIfGrouped:g("showIfGrouped",o,G)});});this._oGroupPanel.setConditions(C);}};f.prototype.addItem=function(i){a.prototype.addItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return this;};f.prototype.removeItem=function(i){var r=a.prototype.removeItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return r;};f.prototype.destroyItems=function(){this.destroyAggregation("items");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return this;};f.prototype.addGroupItem=function(g){this.addAggregation("groupItems",g,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return this;};f.prototype.insertGroupItem=function(g,i){this.insertAggregation("groupItems",g,i,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return this;};f.prototype.updateGroupItems=function(r){this.updateAggregation("groupItems");if(r==="change"&&!this._bIgnoreBindCalls){this._bUpdateRequired=true;this.invalidate();}};f.prototype.removeGroupItem=function(g){g=this.removeAggregation("groupItems",g,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return g;};f.prototype.removeAllGroupItems=function(){var g=this.removeAllAggregation("groupItems",true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return g;};f.prototype.destroyGroupItems=function(){this.destroyAggregation("groupItems");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true;}return this;};f.prototype._handleDataChange=function(){var t=this;return function(E){var n=E.getParameter("newData");var o=E.getParameter("operation");var k=E.getParameter("key");var i=E.getParameter("index");var g;if(o==="update"){g=t.getGroupItems()[i];if(g){g.setColumnKey(n.keyField);g.setOperation(n.operation);g.setShowIfGrouped(n.showIfGrouped);}t.fireUpdateGroupItem({key:k,index:i,groupItemData:g});t._notifyChange();}if(o==="add"){g=new c({key:k,columnKey:n.keyField,operation:n.operation,showIfGrouped:n.showIfGrouped});t._bIgnoreBindCalls=true;t.fireAddGroupItem({key:k,index:i,groupItemData:g});t._bIgnoreBindCalls=false;t._notifyChange();}if(o==="remove"){t._bIgnoreBindCalls=true;t.fireRemoveGroupItem({key:k,index:i});t._bIgnoreBindCalls=false;t._notifyChange();}};};f.prototype.getOkPayload=function(){if(!this.getModel()){return null;}var s=[];this._oGroupPanel._oConditionsGrid.getContent().forEach(function(C){var o=C.keyField;s.push(o.getSelectedKey());});return{selectedColumnKeys:s};};f.prototype._callValidationExecutor=function(){var v=this.getValidationExecutor();if(v){v();}};f.prototype._updateValidationResult=function(v){this._oGroupPanel._oConditionsGrid.getContent().forEach(function(C){var o=C.keyField;o.setValueStateText("");o.setValueState("None");var s=o.getSelectedKey();v.forEach(function(r){if(r.columnKey===s){o.setValueStateText(r.messageText);o.setValueState(r.messageType);}});});};f.prototype.setValidationListener=function(L){this.setProperty("validationListener",L);if(L){L(this,q.proxy(this._updateValidationResult,this));}return this;};f.prototype._notifyChange=function(){var L=this.getChangeNotifier();if(L){L(this);}};return f;});