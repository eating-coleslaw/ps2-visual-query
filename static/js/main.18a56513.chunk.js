(this["webpackJsonpps2-visual-query"]=this["webpackJsonpps2-visual-query"]||[]).push([[0],{286:function(e,t,n){},288:function(e,t,n){},312:function(e,t){},314:function(e,t){},323:function(e,t){},325:function(e,t){},350:function(e,t){},352:function(e,t){},353:function(e,t){},358:function(e,t){},360:function(e,t){},366:function(e,t){},368:function(e,t){},387:function(e,t){},399:function(e,t){},402:function(e,t){},428:function(e,t){},522:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(19),c=n.n(r),l=(n(286),n(165)),o=n.n(l),s=n(257),d=n(65),u=n(44),j=n(11),m=n(18),b=n(557),h=n(269),p=n(572),f=n(571),g=n(573),O=n(574),x=n(567),v=n(564),y=n(565),_=n(562),C=n(580),w=n(575),N=(n(288),n(124)),S=n(125),I=n(69),T=n.n(I),F=n(578),L=n(68),E=n.n(L),k=n(86),D=n.n(k),q=n(1),A=Object(b.a)((function(e){return{button:{margin:e.spacing(1)}}}));var B=function(e){var t=e.serviceId,n=e.onServiceKeyChange,i=e.onDeleteStoredKey,r=A(),c=Object(a.useState)(t),l=Object(m.a)(c,2),o=l[0],s=l[1];return Object(q.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),n(o)},children:[Object(q.jsx)(F.a,{id:"service-key",label:"Service Key",margin:"dense",variant:"outlined",required:!0,name:"service-key",onChange:function(e){return s(e.target.value)},placeholder:"example",value:o,helperText:"Omit the leading 's:'"}),Object(q.jsx)(y.a,{type:"submit",variant:"contained",color:"primary",size:"large",className:r.button,startIcon:Object(q.jsx)(E.a,{}),children:"Save"}),Object(q.jsx)(y.a,{type:"button",variant:"outlined",color:"primary",size:"large",className:r.button,startIcon:Object(q.jsx)(D.a,{}),onClick:function(){s("example"),i()},children:"Delete"})]})},z=n(576),R={Languages:["De","En","Es","Fr","It"],Operators:[{display:"=",name:"equals",title:"Equals",value:"="},{display:"\u2260",name:"notEquals",title:"Not Equals",value:"=!"},{display:"<",name:"isLessThan",title:"Is Less Than",value:"=<"},{display:"\u2264",name:"isLessThanOrEquals",title:"Is Less Than Or Equals",value:"=["},{display:">",name:"isGreaterThan",title:"Is Greater Than",value:"=>"},{display:"\u2265",name:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",value:"=]"},{display:"Starts With",name:"startsWith",title:"Starts With",value:"=^"},{display:"Contains",name:"contains",title:"Contains",value:"=*"}],Collections:["character","character_name","characters_achievement","characters_currency","characters_directive","characters_directive_objective","characters_directive_tier","characters_directive_tree","characters_skill","characters_stat","characters_stat_by_faction","characters_stat_history","characters_weapon_stat","characters_weapon_stat_by_faction","world_stat_history","characters_item","ability","ability_type","achievement","armor_facing","armor_info","currency","directive","directive_tier","directive_tree","directive_tree_category","effect","effect_type","empire_scores","experience","experience_rank","facility_link","facility_type","faction","fire_group","fire_group_to_fire_mode","fire_mode","fire_mode_2","fire_mode_to_projectile","fire_mode_type","image","image_set","image_set_default","item","item_attachment","item_category","item_profile","item_to_weapon","item_type","loadout","map_hex","map_region","marketing_bundle","marketing_bundle_item","marketing_bundle_with_1_item","metagame_event","metagame_event_state","objective","objective_set_to_objective","objective_type","player_state","player_state_group","player_state_group_2","profile","profile_2","profile_armor_map","profile_resist_map","projectile","projectile_flight_type","region","resist_info","resist_type","resource_type","reward","reward_group_to_reward","reward_set_to_reward_group","reward_type","single_character_by_id","skill","skill_category","skill_line","skill_set","target_type","title","vehicle","vehicle_attachment","vehicle_faction","vehicle_skill_set","weapon","weapon_ammo_slot","weapon_datasheet","weapon_to_attachment","weapon_to_fire_group","zone","zone_effect","zone_effect_type","characters_world","world","outfit","outfit_member","outfit_member_extended","outfit_rank","characters_online_status","map","characters_friend","leaderboard","characters_leaderboard","characters_event_grouped","characters_event","event","world_event"]},W=Object(b.a)((function(e){return{selectControl:{minWidth:250}}}));function G(e){var t=e.collection,n=e.onChange,i=W(),r=Object(a.useState)([]),c=Object(m.a)(r,2),l=c[0],o=c[1];function s(e){l.includes(e)&&n(e)}return Object(a.useEffect)((function(){o(R.Collections)}),[]),Object(q.jsx)(z.a,{id:"collection-selector",options:l,value:t,autoSelect:!0,required:!0,onChange:function(e,t){return s(t)},renderInput:function(e){return Object(q.jsx)(F.a,Object(j.a)(Object(j.a)({},e),{},{label:"Collection",variant:"outlined",margin:"dense"}))},className:i.selectControl})}var J=n(582),K=Object(b.a)((function(e){return{root:{width:250}}})),P=[{value:0,label:"None"},{value:10,label:10},{value:20,label:100},{value:30,label:"1k"},{value:40,label:"10k"}],Q=function(e){return 0===e||e<=10?e:e<=20?10*(e-10):e<=30?100*(e-20):1e3*(e-30)};function V(e){var t,n=e.value,a=e.onChange,r=(e.label,K()),c=0===(t=n)||t<=10?t:t<=100?t/10+10:t<=1e3?t/100+20:t/1e3+30;return Object(q.jsxs)(i.a.Fragment,{children:[Object(q.jsx)(C.a,{id:"limit-input-slider-label",htmlFor:"limit-slider",children:"Limit"}),Object(q.jsx)(J.a,{className:r.root,id:"limit-slider",value:"number"===typeof c?c:0,min:0,step:1,max:40,defaultValue:10,getAriaValueText:Q,valueLabelFormat:Q,valueLabelDisplay:"auto",onChange:function(e,t){a(Q(t))},"aria-labelledby":"limit-input-slider-label",marks:P})]})}var H=Object(b.a)((function(e){return{selectControl:{minWidth:120,width:120}}}));function U(e){var t=e.language,n=e.onChange,i=H(),r=Object(a.useState)([]),c=Object(m.a)(r,2),l=c[0],o=c[1];Object(a.useEffect)((function(){o(R.Languages)}),[]);var s=l.map((function(e){return Object(q.jsx)("option",{value:e,"aria-label":e,children:e},e)}));return Object(q.jsxs)(_.a,{variant:"outlined",children:[Object(q.jsx)(C.a,{htmlFor:"language-select",children:"Language"}),Object(q.jsxs)(w.a,{native:!0,margin:"dense",label:"Language",className:i.selectControl,value:t,onChange:function(e){var t=e.target.value;n(t)},inputProps:{name:"language",id:"language-select"},children:[Object(q.jsx)("option",{"aria-label":"All",value:"All",children:"All"}),s]})]})}var M=n(581),Y=n(568),Z=n(566),X=n(264),$=n.n(X),ee=Object(b.a)((function(e){return{button:{margin:0,padding:0},chipList:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}));function te(e){var t=e.label,n=e.fields,r=e.onAddField,c=e.onRemoveField,l=ee(),o=Object(a.useState)(""),s=Object(m.a)(o,2),d=s[0],u=s[1];function j(){return""!==d&&!n.includes(d)}var b=n.map((function(e){return Object(q.jsx)("li",{children:Object(q.jsx)(M.a,{label:e,onDelete:function(){return function(e){c(e)}(e)},className:l.chip,size:"small"})},e)}));return Object(q.jsxs)(i.a.Fragment,{children:[Object(q.jsx)(x.a,{item:!0,xs:12,sm:6,md:4,children:Object(q.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),j()&&(u(""),r(d))},children:Object(q.jsx)(F.a,{id:"add-show-field-input",label:t,margin:"dense",variant:"outlined",name:"show-field",size:"small",onChange:function(e){return u(e.target.value)},placeholder:"example",value:d,InputProps:{endAdornment:Object(q.jsx)(Y.a,{position:"end",children:Object(q.jsx)(Z.a,{type:"submit",variant:"outlined",color:"primary",disabled:!j(),"aria-label":"Add to shown fields",className:l.button,children:Object(q.jsx)($.a,{})})})}})})}),Object(q.jsx)("ul",{className:l.chipList,children:b})]})}var ne=Object(b.a)((function(e){return{fieldGridItem:{marginTop:e.spacing(1),marginBottom:4,marginLeft:e.spacing(1)},operatorGrid:{marginTop:4},button:{margin:0,padding:0}}}));function ae(e){var t=e.conditionData,n=e.onDataChange,r=e.onDelete,c=ne(),l=Object(a.useState)(t.field),o=Object(m.a)(l,2),s=o[0],d=o[1],u=Object(a.useState)(t.value),j=Object(m.a)(u,2),b=j[0],h=j[1],p=Object(a.useState)([]),f=Object(m.a)(p,2),g=f[0],O=f[1];function v(e){return""!==e}return Object(a.useEffect)((function(){O(R.Operators)}),[]),Object(q.jsxs)(i.a.Fragment,{children:[Object(q.jsx)(x.a,{item:!0,xs:12,md:4,children:Object(q.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),n(t.id,"field",s)},children:Object(q.jsx)(F.a,{id:"condition-field",label:"Field",margin:"dense",variant:"outlined",name:"condition-field",size:"small",onChange:function(e){return d(e.target.value)},value:s,InputProps:{endAdornment:Object(q.jsx)(Y.a,{position:"end",children:Object(q.jsx)(Z.a,{type:"submit",variant:"outlined",color:"primary",disabled:!v(s)||s===t.field,"aria-label":"Update the condition's field",className:c.button,children:Object(q.jsx)(E.a,{fontSize:"small"})})})}})})}),Object(q.jsx)(x.a,{item:!0,xs:3,md:3,className:c.operatorGrid,children:Object(q.jsxs)(_.a,{variant:"outlined",children:[Object(q.jsx)(C.a,{htmlFor:"operator-select",children:"Operator"}),Object(q.jsxs)(w.a,{native:!0,margin:"dense",label:"Operator",value:t.operator.name,onChange:function(e){var a=e.target.value,i=g.find((function(e){return e.name===a}));n(t.id,"operator",i)},inputProps:{name:"operator",id:"operator-select"},children:[Object(q.jsx)("option",{value:"equals",title:"Equals",children:"="},"equals"),Object(q.jsx)("option",{value:"notEquals",title:"Not Equals",children:"\u2260"},"notEquals"),Object(q.jsx)("option",{value:"isLessThan",title:"Is Less Than",children:"<"},"isLessThan"),Object(q.jsx)("option",{value:"isLessThanOrEquals",title:"Is Less Than Or Equals",children:"\u2264"},"isLessThanOrEquals"),Object(q.jsx)("option",{value:"isGreaterThan",title:"Is Greater Than",children:">"},"isGreaterThan"),Object(q.jsx)("option",{value:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",children:"\u2265"},"isGreaterThanOrEquals"),Object(q.jsx)("option",{value:"startsWith",children:"Starts With"},"startsWith"),Object(q.jsx)("option",{value:"contains",children:"Contains"},"contains")]})]})}),Object(q.jsx)(x.a,{item:!0,xs:8,md:4,children:Object(q.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),n(t.id,"value",b)},children:Object(q.jsx)(F.a,{id:"condition-value",label:"Value",margin:"dense",variant:"outlined",name:"condition-value",size:"small",onChange:function(e){return h(e.target.value)},value:b,InputProps:{endAdornment:Object(q.jsx)(Y.a,{position:"end",children:Object(q.jsx)(Z.a,{type:"submit",variant:"outlined",color:"primary",disabled:!v(b)||b===t.value,"aria-label":"Update the condition's filter value",className:c.button,children:Object(q.jsx)(E.a,{fontSize:"small"})})})}})})}),Object(q.jsx)(x.a,{item:!0,xs:1,md:1,children:Object(q.jsx)(Z.a,{"aria-label":"Delete this query condition",title:"Delete this query condition",onClick:function(){r(t.id)},children:Object(q.jsx)(D.a,{fontSize:"small"})})})]})}var ie=n(569),re=n(105),ce=n.n(re),le=Object(b.a)((function(e){return{headerButtonContainer:{textAlign:"right"},header1:{margin:0,fontSize:"1.4em",fontWeight:500},paper:{padding:e.spacing(2)},jsonView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},textView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},linearProgres:{marginTop:e.spacing(2),marginBottom:e.spacing(2)}}}));function oe(e){var t=e.data,n=e.isLoading,a=le();return n?Object(q.jsxs)(v.a,{className:a.paper,children:[Object(q.jsx)("h1",{children:"Query Results"}),Object(q.jsx)(ie.a,{className:a.linearProgres})]}):Object(q.jsxs)(v.a,{className:a.paper,children:[Object(q.jsxs)(x.a,{container:!0,justifyContent:"space-between",alignItems:"center",children:[Object(q.jsx)(x.a,{item:!0,xs:8,children:Object(q.jsx)("h1",{className:a.header1,children:"Query Results"})}),Object(q.jsx)(x.a,{item:!0,xs:4,className:a.headerButtonContainer,children:!!t&&Object(q.jsx)(y.a,{color:"primary",onClick:function(){t&&navigator.clipboard.writeText(JSON.stringify(t,null,2))},value:"Copy",title:"Copy the query results to the clipboard",startIcon:Object(q.jsx)(ce.a,{}),children:"Copy"})})]}),t?Object(q.jsx)("div",{className:a.textView,children:Object(q.jsx)("pre",{children:JSON.stringify(t,null,2)})}):null]})}var se=n(570),de=n(265),ue=n.n(de),je=n(266),me=n.n(je),be=Object(b.a)((function(e){return{header1:{margin:0,fontSize:"1.4em",fontWeight:500},paper:{padding:e.spacing(2)},urlBox:{marginTop:e.spacing(1),backgroundColor:"#1F2330",color:"#fff",fontFamily:"monospace",padding:e.spacing(1),borderRadius:4,wordWrap:"anywhere",overflow:"auto"},container:{marginTop:e.spacing(1)},gridItem:{marginRight:e.spacing(2)},button:{},runButton:{width:120},runButtonIcon:{marginLeft:-8},buttonWide:{whiteSpace:"nowrap"}}}));function he(e){var t=e.queryUrl,n=e.isLoading,a=e.onRunQuery,i=be();return Object(q.jsxs)(v.a,{className:i.paper,children:[Object(q.jsx)("h1",{className:i.header1,children:"Query URL"}),Object(q.jsx)("div",{className:i.urlBox,children:t}),Object(q.jsxs)(x.a,{container:!0,justifyContent:"flex-start",alignItems:"center",spacing:1,className:i.container,children:[Object(q.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(q.jsx)(y.a,{color:"primary",variant:"contained",onClick:a,value:"Run",className:i.runButton,startIcon:n?null:Object(q.jsx)(ue.a,{className:i.runButtonIcon}),title:"Run the query",children:n?"Loading...":"Run"})}),Object(q.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(q.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){navigator.clipboard.writeText(t)},value:"Copy",className:i.button,title:"Copy the query url to the clipboard",startIcon:Object(q.jsx)(ce.a,{}),children:"Copy"})}),Object(q.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(q.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){var e=function(e){var n=new RegExp("(/s:)[A-z0-9]+/");return t.replace(n,"/s:example/")}();navigator.clipboard.writeText(e)},value:"Copy Anonymous",className:i.buttonWide,title:"Copy the query url to the clipboard and replace your service ID with 'example'",startIcon:Object(q.jsx)(ce.a,{}),children:"Copy Anon."})}),Object(q.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(q.jsx)(se.a,{to:t,href:t,target:"_blank",rel:"noreferrer",children:Object(q.jsx)(y.a,{color:"primary",variant:"outlined",value:"Open Query",className:i.buttonWide,title:"Open the query URL in a new tab",startIcon:Object(q.jsx)(me.a,{}),children:"Open"})})})]})]})}var pe=n(268),fe=n.n(pe),ge=n(577);function Oe(e){var t=e.value,n=e.label,a=e.optionA,i=e.optionB,r=e.onChange,c=e.className,l=void 0===c?null:c;return Object(q.jsxs)(_.a,{variant:"outlined",style:{minWidth:120},children:[Object(q.jsx)(C.a,{htmlFor:"binary-select",children:n}),Object(q.jsxs)(w.a,{native:!0,margin:"dense",label:n,className:l,value:t,onChange:function(e){e.preventDefault(),r(e.target.value)},inputProps:{name:"binary-select",id:"binary-select"},children:[Object(q.jsx)("option",{"aria-label":a,value:a.toLowerCase(),children:a}),Object(q.jsx)("option",{"aria-label":i,value:i.toLowerCase(),children:i})]})]})}function xe(e){var t=e.value,n=e.label,a=e.trueLabel,i=void 0===a?"Yes":a,r=e.falseLabel,c=void 0===r?"No":r,l=e.onChange,o=e.className,s=void 0===o?null:o;return Object(q.jsxs)(_.a,{variant:"outlined",style:{minWidth:120},children:[Object(q.jsx)(C.a,{htmlFor:"boolean-select",children:n}),Object(q.jsxs)(w.a,{native:!0,margin:"dense",label:n,className:s,value:t,onChange:function(e){return l(e.target.value)},inputProps:{name:"boolean-select",id:"boolean-select"},children:[Object(q.jsx)("option",{"aria-label":i,value:!0,children:i}),Object(q.jsx)("option",{"aria-label":c,value:!1,children:c})]})]})}var ve=n(270),ye=n(267),_e=n.n(ye),Ce=["headerLevel","headerText","defaultExtended","children","id"],we=Object(b.a)((function(e){return{root:{marginBottom:e.spacing(2),marginTop:e.spacing(1)},header1:{margin:0,fontSize:"1.4em",fontWeight:500,width:"100%",marginBottom:-4},header2:{margin:0,fontSize:"1.2em",fontWeight:500,width:"100%"},header3:{margin:0,fontSize:"1.1em",fontWeight:500,width:"100%",marginBottom:2},headerContainer:{marginBottom:e.spacing(1)},headerContainerCollapsed:{paddingBottom:e.spacing(1),borderBottom:"1px solid #919cb950"},toggleContainer:{textAlign:"right",borderBottom:"1px solid #919cb950"},toggleButton:{padding:e.spacing(.5)},toggle:{transition:"transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"},toggleCollapsed:{transform:"rotateZ(180deg)"},content:{height:0,width:"100%",display:"none",transition:"all 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"},contentOpen:{width:"100%",transition:"all 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"}}}));function Ne(e){var t=e.headerLevel,n=e.headerText,r=e.defaultExtended,c=e.children,l=e.id,o=(Object(ve.a)(e,Ce),we());if("number"!==typeof t||t<0||t>6)throw new Error("headerLevel must be an integer between 1 and 6");var s=i.a.createElement("h".concat(t),{className:o["header".concat(t)]},n),d=Object(a.useState)(r),u=Object(m.a)(d,2),j=u[0],b=u[1];var h=Object(a.useState)(),p=Object(m.a)(h,2),f=p[0],g=p[1];return Object(a.useEffect)((function(){g(function(){if(!j)return 0;var e=document.getElementById("collapsible-content-".concat(l));return e?Array.from(e.children).reduce((function(e,t){return e+t.offsetHeight}),0):0}())}),[j,c,l]),Object(q.jsxs)("div",{className:o.root,children:[Object(q.jsxs)(x.a,{container:!0,justifyContent:"space-between",alignItems:"center",className:o.headerContainer,children:[Object(q.jsx)(x.a,{item:!0,xs:10,className:o.headerContainerCollapsed,children:s}),Object(q.jsx)(x.a,{item:!0,xs:2,className:o.toggleContainer,children:Object(q.jsx)(Z.a,{"aria-label":function(){return j?"Collapse Section":"Expand Section"},onClick:function(){b(!j)},className:o.toggleButton,children:Object(q.jsx)(_e.a,{className:"".concat(j?o.toggle:"".concat(o.toggle," ").concat(o.toggleCollapsed))})})})]}),Object(q.jsx)("div",{id:"collapsible-content-".concat(l),style:{height:"".concat(f,"px")},className:j?o.contentOpen:o.content,children:c})]})}var Se=Object(b.a)((function(e){return{paper:{padding:e.spacing(1),marginBottom:e.spacing(2),borderStyle:"solid",borderColor:"#919cb930",width:"100%"},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},textButton:{marginTop:-4,marginBottom:e.spacing(1)},footer:{marginTop:e.spacing(0),marginBottom:e.spacing(0)},inlineSelectItem:{marginTop:4}}}));function Ie(e){var t=e.joinData,n=e.depth,i=e.onChange,r=e.onDelete,c=Se(),l=Object(a.useState)(t),o=Object(m.a)(l,2),s=o[0],b=o[1];function h(){i(s)}function p(e,n){b(Object(j.a)(Object(j.a)(Object(j.a)({},t),s),Object(d.a)({},e,n)))}function f(e){p("joins",s.joins.map((function(t){return t.id===e.id?e:t}))),h()}function g(e){var t=s.joins.filter((function(t){return t.id!==e}));b(Object(j.a)(Object(j.a)({},s),{joins:t})),h()}function O(e,t,n){p("terms",s.terms.map((function(a){return a.id===e&&(a[t]=n),a})))}function _(e){p("terms",s.terms.filter((function(t){return t.id!==e}))),h()}var C={borderWidth:0===n?1:"2px 0 0 1px",marginLeft:0===n?0:8},w=n<4,N=4===n||!s.collection;return Object(q.jsxs)(v.a,{className:c.paper,style:Object(j.a)({},C),children:[Object(q.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:c.gridRow,style:{marginBottom:0},children:[Object(q.jsx)(x.a,{item:!0,xs:12,sm:8,children:Object(q.jsx)(G,{collection:s.collection,onChange:function(e){e&&p("collection",e)}})}),Object(q.jsx)(x.a,{item:!0,xs:12,sm:4,children:Object(q.jsx)(F.a,{id:"inject-at",label:"Inject At",margin:"dense",variant:"outlined",name:"inject-at",onChange:function(e){return p("injectAt",e.target.value)},value:s.injectAt})})]}),Object(q.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:c.gridRow,children:[Object(q.jsx)(x.a,{item:!0,xs:5,children:Object(q.jsx)(F.a,{id:"join-on-field",label:"On Field",margin:"dense",variant:"outlined",name:"join-on-field",onChange:function(e){p("onField",e.target.value)},value:s.onField})}),Object(q.jsx)(x.a,{item:!0,xs:2,style:{textAlign:"center"},children:Object(q.jsx)(fe.a,{style:{marginTop:8}})}),Object(q.jsx)(x.a,{item:!0,xs:5,children:Object(q.jsx)(F.a,{id:"join-to-field",label:"To Field",margin:"dense",variant:"outlined",name:"join-to-field",onChange:function(e){p("toField",e.target.value)},value:s.toField})})]}),Object(q.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:c.gridRow,children:[Object(q.jsx)(x.a,{item:!0,sm:6,md:4,children:Object(q.jsx)(xe,{label:"Join Type",value:s.isOuterJoin,trueLabel:"Outer",falseLabel:"Inner",onChange:function(e){return p("isOuterJoin",e)}})}),Object(q.jsx)(x.a,{item:!0,sm:6,md:4,children:Object(q.jsx)(xe,{label:"Is List",value:s.isList,onChange:function(e){return p("isList",e)}})})]}),Object(q.jsxs)(Ne,{id:"join-conditions",headerLevel:3,headerText:"Join Conditions",defaultExtended:!0,children:[s.terms.length>0&&Object(q.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:c.gridRow,children:s.terms.map((function(e){return Object(q.jsx)(ae,{conditionData:e,onDataChange:O,onDelete:_},e.id)}))}),Object(q.jsx)(x.a,{item:!0,xs:12,children:Object(q.jsx)(y.a,{color:"primary",startIcon:Object(q.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e={id:Object(ge.a)(),field:"",value:"",operator:{display:"=",name:"equals",title:"Equals",value:"="}};p("terms",[].concat(Object(u.a)(s.terms),[e]))},className:c.textButton,children:"New Condition"})})]}),Object(q.jsx)(Ne,{id:"field-filters",headerLevel:3,headerText:"Filter Displayed Fields",defaultExtended:!0,children:Object(q.jsxs)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:c.gridRow,children:[Object(q.jsx)(x.a,{item:!0,xs:12,sm:6,md:3,className:c.inlineSelectItem,children:Object(q.jsx)(Oe,{label:"Filter Type",onChange:function(e){return p("filterType",e)},optionA:"Show",optionB:"Hide",value:s.filterType,className:c.filterSelect})}),Object(q.jsx)(te,{label:"Add Field",fields:s.filterFields,onAddField:function(e){return function(e,t){var n=Object(u.a)(s[e]);if(""!==t&&!n.includes(t)){var a=n;a.push(t),p(e,a)}}("filterFields",e)},onRemoveField:function(e){return function(e,t){var n=Object(u.a)(s[e]),a=n.indexOf(t);if(-1!==a){var i=n;i.splice(a,1),p(e,i)}h()}("filterFields",e)}})]})}),Object(q.jsxs)(x.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"flex-start",className:c.footer,children:[Object(q.jsx)(x.a,{item:!0,container:!0,xs:6,alignItems:"center",justifyContent:"flex-start",children:w&&Object(q.jsx)(x.a,{item:!0,children:Object(q.jsx)(y.a,{disabled:N,color:"primary",startIcon:Object(q.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){if(4===n)throw new Error("Can't add new sub-join. Max join depth already reached");var e={id:Object(ge.a)(),parentId:t.id,collection:"",injectAt:"",isOuterJoin:!1,isList:!1,onField:"",toField:"",filterType:"show",filterFields:[],terms:[],joins:[]};p("joins",[].concat(Object(u.a)(s.joins),[e])),h()},children:"Sub Join"})})}),Object(q.jsxs)(x.a,{item:!0,container:!0,xs:6,spacing:2,alignItems:"center",justifyContent:"flex-end",style:{textAlign:"right"},children:[Object(q.jsx)(x.a,{item:!0,md:6,children:Object(q.jsx)(y.a,{color:"default",startIcon:Object(q.jsx)(D.a,{fontSize:"small"}),size:"small",onClick:function(){r(t.id)},children:"Delete"})}),Object(q.jsx)(x.a,{item:!0,md:6,children:Object(q.jsx)(y.a,{color:"primary",variant:"outlined",startIcon:Object(q.jsx)(E.a,{fontSize:"small"}),size:"small",onClick:h,children:"Save"})})]})]}),s.joins.length>0&&Object(q.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:c.gridRow,children:s.joins.map((function(e){return Object(q.jsx)(Ie,{depth:n+1,joinData:e,onChange:f,onDelete:g},e.id)}))})]})}var Te=Object(b.a)((function(e){return{gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},textButton:{marginTop:-4,marginBottom:e.spacing(1)}}}));function Fe(e){var t=e.joinsData,n=e.onJoinDataChange,a=e.onAddNewJoin,r=e.onDeleteJoin,c=Te();function l(e){n(e)}function o(e){r(e)}return Object(q.jsxs)(i.a.Fragment,{children:[Object(q.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:c.gridRow,children:t.map((function(e){return Object(q.jsx)(Ie,{joinData:e,depth:0,onChange:l,onDelete:o},e.id)}))}),Object(q.jsx)(x.a,{item:!0,xs:12,children:Object(q.jsx)(y.a,{color:"primary",startIcon:Object(q.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e={id:Object(ge.a)(),parentId:null,collection:"",isList:!1,filterType:"show",filterFields:[],injectAt:"",terms:[],isOuterJoin:!1,joins:[],onField:"",toField:""};a(e)},className:c.textButton,children:"New Join"})})]})}var Le=n(173).Query,Ee=n(173),ke=Object(b.a)((function(e){return{root:{flexGrow:1},container:{"margin-top":e.spacing(3)},gridContainer:{padding:e.spacing(2)},gridContainerItem:{"padding-bottom":e.spacing(2)},paper:{padding:e.spacing(2)},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},header1:{margin:0,fontSize:"1.4em",fontWeight:500},header2:{margin:0,fontSize:"1.2em",fontWeight:500,width:"100%",marginTop:e.spacing(1.5)},itemParagraph:{marginTop:e.spacing(1),marginBottom:e.spacing(2)},splitQueryField:{width:250},filterSelect:{width:120},inlineSelectItem:{marginTop:4},textButton:{marginTop:-4,marginBottom:e.spacing(1)},buttonWrapper:{margin:e.spacing(1),position:"relative",display:"flex",justifyContent:"flex-start"},buttonProgress:{color:"black",position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}));function De(){var e=ke();Object(a.useEffect)((function(){Ee.SetGlobalNamespace("ps2:v2")}),[]);var t=Object(a.useState)(localStorage.getItem("DaybreakGamesKey")),n=Object(m.a)(t,2),r=n[0],c=n[1];Object(a.useEffect)((function(){var e=localStorage.getItem("DaybreakGamesKey");null!==e&&(Ee.SetGlobalServiceKey(e),c(e))}),[c]);var l=Object(a.useState)(!1),b=Object(m.a)(l,2),I=b[0],F=b[1],L=Object(a.useState)({serviceKey:r||"example",namespace:"ps2:v2",collection:"character",language:"All",conditions:[],limit:10,start:null,filterType:"show",filterFields:[],resolves:[],joins:[],trees:[],lang:null,sort:[]}),E=Object(m.a)(L,2),k=E[0],D=E[1],A=Object(f.a)("(prefers-color-scheme: dark)"),z=i.a.useMemo((function(){return Object(h.a)({palette:{type:A?"dark":"light",primary:A?{main:"#E7ADFB"}:N.a,secondary:S.a,background:{paper:A?"#27273A":"#fff",default:A?"#0F1320":"#fafafa"},text:{}},contrastThreshold:5})}),[A]);function R(e,t){var n=Object(u.a)(k[e]);if(""!==t&&!n.includes(t)){var a=n;a.push(t),D(Object(j.a)(Object(j.a)({},k),Object(d.a)({},e,a)))}}function W(e,t){var n=Object(u.a)(k[e]),a=n.indexOf(t);if(-1!==a){var i=n;i.splice(a,1),D(Object(j.a)(Object(j.a)({},k),Object(d.a)({},e,i)))}}function J(e,t,n){var a=k.conditions.map((function(a){return a.id===e&&(a[t]=n),a}));D(Object(j.a)(Object(j.a)({},k),{conditions:a}))}function K(e){var t=k.conditions.filter((function(t){return t.id!==e}));D(Object(j.a)(Object(j.a)({},k),{conditions:t}))}var P=Object(a.useState)(""),Q=Object(m.a)(P,2),H=Q[0],M=Q[1],Y=Object(a.useState)(new Le(k.collection,k.namespace,k.serviceKey)),Z=Object(m.a)(Y,2),X=(Z[0],Z[1]);Object(a.useEffect)((function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return n.length>0&&n.forEach((function(n){if(n.collection){var i=null!==a?a.joinService(n.collection):t.joinService(n.collection);i.isList(n.isList),i.isOuterJoin(n.isOuterJoin),n.injectAt&&i.injectAt(n.injectAt),n.onField&&i.onField(n.onField),n.toField&&i.toField(n.toField),n.filterFields.length>0&&i["".concat(n.filterType,"Fields")](n.filterFields),n.terms.length>0&&n.terms.forEach((function(e){""!==e.field&&e.operator&&""!==e.value&&i.where(e.field)[e.operator.name](e.value)})),n.joins.length>0&&e(t,n.joins,i)}})),t}try{var t=function(){var t=new Le(k.collection,k.namespace,k.serviceKey);return k.language&&"All"!==k.language&&t.setLanguage(k.language.toLowerCase()),null!==k.limit&&0!==k.limit&&t.setLimit(k.limit),null!==k.start&&t.setStart(k.start),k.filterFields.length>0&&t["".concat(k.filterType,"Fields")](k.filterFields),k.resolves.length>0&&t.resolve(k.resolves),k.sort.length>0&&t.sort(k.sort),k.conditions.length>0&&k.conditions.forEach((function(e){""!==e.field&&e.operator&&""!==e.value&&t.where(e.field)[e.operator.name](e.value)})),k.joins.length>0&&(t=e(t,k.joins)),t}();X(t);var n=t.toUrl();n=n.replace("http://","https://"),M(n)}catch(a){console.log("Error getting query URL: ",a)}}),[k]);var $=Object(a.useState)(""),ee=Object(m.a)($,2),ne=ee[0],ie=ee[1];function re(){return(re=Object(s.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!H||I){e.next=18;break}return F(!0),e.prev=2,e.next=5,fetch(H);case 5:return t=e.sent,e.next=8,t.json();case 8:n=e.sent,ie(n),F(!1),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(2),console.log("Error getting data from query: ",e.t0),ie("Error getting data from query: ".concat(e.t0)),F(!1);case 18:case"end":return e.stop()}}),e,null,[[2,13]])})))).apply(this,arguments)}return Object(q.jsxs)(p.a,{theme:z,children:[Object(q.jsx)(g.a,{}),Object(q.jsx)(O.a,{maxWidth:"lg",className:e.container,children:Object(q.jsxs)(x.a,{container:!0,alignItems:"flex-start",children:[Object(q.jsxs)(x.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(q.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(q.jsx)(v.a,{className:e.paper,children:Object(q.jsxs)(Ne,{id:"service-id",headerLevel:1,headerText:"Service ID",defaultExtended:!r||"example"===r,children:[Object(q.jsxs)("p",{className:e.itemParagraph,children:["Sign up for a service ID"," ",Object(q.jsx)("a",{href:"https://census.daybreakgames.com/#service-id","aria-label":"Service ID sign up page",target:"_blank",rel:"noreferrer",style:{color:"#40afee"},children:"here"}),". The 'example' service ID allows up to 10 requests per minute. Saving your service ID will store it to this browser."]}),Object(q.jsx)(B,{serviceId:k.serviceKey,onServiceKeyChange:function(e){D(Object(j.a)(Object(j.a)({},k),{serviceKey:e})),Ee.SetGlobalServiceKey(e),localStorage.setItem("DaybreakGamesKey",e)},onDeleteStoredKey:function(){D(Object(j.a)(Object(j.a)({},k),{serviceKey:"example"})),Ee.SetGlobalServiceKey("example"),localStorage.removeItem("DaybreakGamesKey")}})]})})}),Object(q.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(q.jsxs)(v.a,{className:e.paper,children:[Object(q.jsx)("h1",{className:e.header1,children:"Query Creator"}),Object(q.jsxs)("p",{className:e.itemParagraph,children:["Refer to the"," ",Object(q.jsx)("a",{href:"https://census.daybreakgames.com/#general","aria-label":"Official census API documentation page",target:"_blank",rel:"noreferrer",style:{color:"#40afee"},children:"official documentation"})," ","for more information on using the API."]}),Object(q.jsx)(Ne,{id:"collection",headerLevel:2,headerText:"Collection",defaultExtended:!0,children:Object(q.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:e.gridRow,children:[Object(q.jsx)(x.a,{item:!0,sm:12,md:7,className:e.splitQueryField,children:Object(q.jsx)(G,{collection:k.collection,onChange:function(e){D(Object(j.a)(Object(j.a)({},k),{collection:e}))}})}),Object(q.jsx)(x.a,{item:!0,sm:12,md:4,className:e.splitQueryField,style:{marginTop:4},children:Object(q.jsx)(U,{value:k.language,onChange:function(e){D("All"===e?Object(j.a)(Object(j.a)({},k),{language:""}):Object(j.a)(Object(j.a)({},k),{language:e.toLowerCase()}))}})}),Object(q.jsx)(x.a,{item:!0,sm:12,style:{marginLeft:16,marginTop:8},children:Object(q.jsx)(V,{value:k.limit,onChange:function(e){var t=0===e?null:e;D(Object(j.a)(Object(j.a)({},k),{limit:t}))},label:"Limit"})})]})}),Object(q.jsxs)(Ne,{id:"search-conditions",headerLevel:2,headerText:"Search Conditions",defaultExtended:!0,children:[k.conditions.length>0&&Object(q.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:e.gridRow,children:k.conditions.map((function(e){return Object(q.jsx)(ae,{conditionData:e,onDataChange:J,onDelete:K},e.id)}))}),Object(q.jsx)(x.a,{item:!0,xs:12,children:Object(q.jsx)(y.a,{color:"primary",startIcon:Object(q.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e={id:Object(ge.a)(),field:"",value:"",operator:{display:"=",name:"equals",title:"Equals",value:"="}};D(Object(j.a)(Object(j.a)({},k),{conditions:[].concat(Object(u.a)(k.conditions),[e])}))},className:e.textButton,children:"New Condition"})})]}),Object(q.jsx)(Ne,{id:"field-filters",headerLevel:2,headerText:"Filter Displayed Fields",defaultExtended:!0,children:Object(q.jsxs)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:[Object(q.jsx)(x.a,{item:!0,xs:12,sm:6,md:3,className:e.inlineSelectItem,children:Object(q.jsxs)(_.a,{variant:"outlined",children:[Object(q.jsx)(C.a,{htmlFor:"filter-type-select",children:"Filter Type"}),Object(q.jsxs)(w.a,{native:!0,margin:"dense",label:"Filter Type",className:e.filterSelect,value:k.filterType,onChange:function(e){var t=e.target.checked?"show":"hide";D(Object(j.a)(Object(j.a)({},k),{filterType:t}))},inputProps:{name:"filter-type",id:"filter-type-select"},children:[Object(q.jsx)("option",{"aria-label":"Show",value:"show",children:"Show"}),Object(q.jsx)("option",{"aira-label":"Hide",value:"hide",children:"Hide"})]})]})}),Object(q.jsx)(te,{label:"Add Field",fields:k.filterFields,onAddField:function(e){return R("filterFields",e)},onRemoveField:function(e){return W("filterFields",e)}})]})}),Object(q.jsx)(Ne,{id:"resolves-container",headerLevel:2,headerText:"Resolves",defaultExtended:!0,children:Object(q.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:Object(q.jsx)(te,{label:"Resolves",fields:k.resolves,onAddField:function(e){return R("resolves",e)},onRemoveField:function(e){return W("resolves",e)}})})}),Object(q.jsx)(Ne,{id:"joins-container",headerLevel:2,headerText:"Joins",defaultExtended:!0,children:Object(q.jsx)(Fe,{joinsData:k.joins,depth:0,onJoinDataChange:function(e){var t=k.joins.map((function(t){return t.id===e.id?e:t}));D(Object(j.a)(Object(j.a)({},k),{joins:t}))},onAddNewJoin:function(e){e.parentId||D(Object(j.a)(Object(j.a)({},k),{joins:[].concat(Object(u.a)(k.joins),[e])}))},onDeleteJoin:function(e){var t=k.joins.filter((function(t){return t.id!==e}));D(Object(j.a)(Object(j.a)({},k),{joins:t}))}})})]})})]}),Object(q.jsxs)(x.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(q.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(q.jsx)(he,{queryUrl:H,isLoading:I,onRunQuery:function(){return re.apply(this,arguments)}})}),Object(q.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(q.jsx)(oe,{data:ne,isLoading:I})})]})]})})]})}var qe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,583)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),r(e),c(e)}))};c.a.render(Object(q.jsx)(i.a.StrictMode,{children:Object(q.jsx)(De,{})}),document.getElementById("root")),qe()}},[[522,1,2]]]);
//# sourceMappingURL=main.18a56513.chunk.js.map