(this["webpackJsonpps2-visual-query"]=this["webpackJsonpps2-visual-query"]||[]).push([[0],{276:function(e,t,a){},278:function(e,t,a){},303:function(e,t){},305:function(e,t){},314:function(e,t){},316:function(e,t){},341:function(e,t){},343:function(e,t){},344:function(e,t){},349:function(e,t){},351:function(e,t){},357:function(e,t){},359:function(e,t){},378:function(e,t){},390:function(e,t){},393:function(e,t){},419:function(e,t){},513:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(17),c=a.n(r),l=(a(276),a(160)),s=a.n(l),o=a(251),u=a(262),d=a(98),m=a(19),j=a(24),p=a(546),b=a(261),h=a(561),f=a(559),g=a(562),O=a(563),v=a(554),x=a(552),y=a(553),_=a(551),C=a(568),w=a(564),S=(a(278),a(120)),N=a(560),I=a(260),k=a.n(I),F=a(566),T=a(101),L=a.n(T),D=a(119),q=a.n(D),R=a(2),E=Object(p.a)((function(e){return{button:{margin:e.spacing(1)}}}));var z=function(e){var t=e.serviceId,a=e.onServiceKeyChange,i=e.onDeleteStoredKey,r=E(),c=Object(n.useState)(t),l=Object(j.a)(c,2),s=l[0],o=l[1];return Object(R.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),a(s)},children:[Object(R.jsx)(F.a,{id:"service-key",label:"Service Key",margin:"dense",variant:"outlined",required:!0,name:"service-key",onChange:function(e){return o(e.target.value)},placeholder:"example",value:s,helperText:"Omit the leading 's:'"}),Object(R.jsx)(y.a,{type:"submit",variant:"outlined",color:"primary",size:"large",className:r.button,startIcon:Object(R.jsx)(L.a,{}),children:"Save"}),Object(R.jsx)(y.a,{type:"button",variant:"outlined",color:"primary",size:"large",className:r.button,startIcon:Object(R.jsx)(q.a,{}),onClick:function(){o("example"),i()},children:"Delete"})]})},A={Languages:["De","En","Es","Fr","It"],Operators:[{display:"=",name:"equals",title:"Equals",value:"="},{display:"\u2260",name:"notEquals",title:"Not Equals",value:"=!"},{display:"<",name:"isLessThan",title:"Is Less Than",value:"=<"},{display:"\u2264",name:"isLessThanOrEquals",title:"Is Less Than Or Equals",value:"=["},{display:">",name:"isGreaterThan",title:"Is Greater Than",value:"=>"},{display:"\u2265",name:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",value:"=]"},{display:"Starts With",name:"startsWith",title:"Starts With",value:"=^"},{display:"Contains",name:"contains",title:"Contains",value:"=*"}],Collections:["character","character_name","characters_achievement","characters_currency","characters_directive","characters_directive_objective","characters_directive_tier","characters_directive_tree","characters_skill","characters_stat","characters_stat_by_faction","characters_stat_history","characters_weapon_stat","characters_weapon_stat_by_faction","world_stat_history","characters_item","ability","ability_type","achievement","armor_facing","armor_info","currency","directive","directive_tier","directive_tree","directive_tree_category","effect","effect_type","empire_scores","experience","experience_rank","facility_link","facility_type","faction","fire_group","fire_group_to_fire_mode","fire_mode","fire_mode_2","fire_mode_to_projectile","fire_mode_type","image","image_set","image_set_default","item","item_attachment","item_category","item_profile","item_to_weapon","item_type","loadout","map_hex","map_region","marketing_bundle","marketing_bundle_item","marketing_bundle_with_1_item","metagame_event","metagame_event_state","objective","objective_set_to_objective","objective_type","player_state","player_state_group","player_state_group_2","profile","profile_2","profile_armor_map","profile_resist_map","projectile","projectile_flight_type","region","resist_info","resist_type","resource_type","reward","reward_group_to_reward","reward_set_to_reward_group","reward_type","single_character_by_id","skill","skill_category","skill_line","skill_set","target_type","title","vehicle","vehicle_attachment","vehicle_faction","vehicle_skill_set","weapon","weapon_ammo_slot","weapon_datasheet","weapon_to_attachment","weapon_to_fire_group","zone","zone_effect","zone_effect_type","characters_world","world","outfit","outfit_member","outfit_member_extended","outfit_rank","characters_online_status","map","characters_friend","leaderboard","characters_leaderboard","characters_event_grouped","characters_event","event","world_event"]},K=Object(p.a)((function(e){return{selectControl:{minWidth:120,width:250}}}));function P(e){var t=e.collection,a=e.onChange,i=K(),r=Object(n.useState)([]),c=Object(j.a)(r,2),l=c[0],s=c[1];Object(n.useEffect)((function(){s(A.Collections)}),[]);var o=l.map((function(e){return Object(R.jsx)("option",{value:e,children:e},e)}));return Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"collection-select",children:"Collection"}),Object(R.jsx)(w.a,{native:!0,margin:"dense",label:"Collection",className:i.selectControl,value:t,onChange:function(e){var t=e.target.value;a(t)},inputProps:{name:"collection",id:"collection-select"},children:o})]})}var G=a(569),W=Object(p.a)((function(e){return{root:{width:250}}})),Q=[{value:10,label:10},{value:20,label:100},{value:30,label:"1k"},{value:40,label:"10k"}],B=function(e){return e<=10?e:e<=20?10*(e-10):e<=30?100*(e-20):1e3*(e-30)};function V(e){var t,a=e.value,n=e.onChange,r=(e.label,W()),c=(t=a)<=10?t:t<=100?t/10+10:t<=1e3?t/100+20:t/1e3+30;return Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(C.a,{id:"limit-input-slider-label",htmlFor:"limit-slider",children:"Limit"}),Object(R.jsx)(G.a,{className:r.root,id:"limit-slider",value:"number"===typeof c?c:0,min:1,step:1,max:40,defaultValue:10,getAriaValueText:B,valueLabelFormat:B,valueLabelDisplay:"auto",onChange:function(e,t){n(B(t))},"aria-labelledby":"limit-input-slider-label",marks:Q})]})}var U=Object(p.a)((function(e){return{selectControl:{minWidth:120,width:120}}}));function H(e){var t=e.language,a=e.onChange,i=U(),r=Object(n.useState)([]),c=Object(j.a)(r,2),l=c[0],s=c[1];Object(n.useEffect)((function(){s(A.Languages)}),[]);var o=l.map((function(e){return Object(R.jsx)("option",{value:e,"aria-label":e,children:e},e)}));return Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"language-select",children:"Language"}),Object(R.jsxs)(w.a,{native:!0,margin:"dense",label:"Language",className:i.selectControl,value:t,onChange:function(e){var t=e.target.value;a(t)},inputProps:{name:"language",id:"language-select"},children:[Object(R.jsx)("option",{"aria-label":"All",value:"All",children:"All"}),o]})]})}var J=a(570),M=a(555),X=a(556),Y=a(257),Z=a.n(Y),$=Object(p.a)((function(e){return{button:{margin:0,padding:0},chipList:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}));function ee(e){var t=e.label,a=e.fields,r=e.onAddField,c=e.onRemoveField,l=$(),s=Object(n.useState)(""),o=Object(j.a)(s,2),u=o[0],d=o[1];function m(){return""!==u&&!a.includes(u.toLowerCase())}var p=a.map((function(e){return Object(R.jsx)("li",{children:Object(R.jsx)(J.a,{label:e,onDelete:function(){return function(e){c(e)}(e)},className:l.chip,size:"small"})},e)}));return Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(v.a,{item:!0,xs:12,sm:6,md:4,children:Object(R.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),m()&&(d(""),r(u.toLowerCase()))},children:Object(R.jsx)(F.a,{id:"add-show-field-input",label:t,margin:"dense",variant:"outlined",name:"show-field",size:"small",onChange:function(e){return d(e.target.value)},placeholder:"example",value:u,InputProps:{endAdornment:Object(R.jsx)(M.a,{position:"end",children:Object(R.jsx)(X.a,{type:"submit",variant:"outlined",color:"primary",disabled:!m(),"aria-label":"Add to shown fields",className:l.button,children:Object(R.jsx)(Z.a,{})})})}})})}),Object(R.jsx)("ul",{className:l.chipList,children:p})]})}var te=Object(p.a)((function(e){return{fieldGridItem:{marginTop:e.spacing(1),marginBottom:4,marginLeft:e.spacing(1)},operatorGrid:{marginTop:4},button:{margin:0,padding:0}}}));function ae(e){var t=e.conditionData,a=e.onDataChange,r=e.onDelete,c=te(),l=Object(n.useState)(t.field),s=Object(j.a)(l,2),o=s[0],u=s[1],d=Object(n.useState)(t.value),m=Object(j.a)(d,2),p=m[0],b=m[1],h=Object(n.useState)([]),f=Object(j.a)(h,2),g=f[0],O=f[1];Object(n.useEffect)((function(){O(A.Operators)}),[]);var x=g.map((function(e){return Object(R.jsx)("option",{value:e.value,title:e.title,children:e.display},e.name)}));function y(e){return""!==e}return Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(v.a,{item:!0,xs:12,md:4,children:Object(R.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),a(t.id,"field",o)},children:Object(R.jsx)(F.a,{id:"condition-field",label:"Field",margin:"dense",variant:"outlined",name:"condition-field",size:"small",onChange:function(e){return u(e.target.value)},value:o,InputProps:{endAdornment:Object(R.jsx)(M.a,{position:"end",children:Object(R.jsx)(X.a,{type:"submit",variant:"outlined",color:"primary",disabled:!y(o)||o===t.field,"aria-label":"Update the condition's field",className:c.button,children:Object(R.jsx)(L.a,{fontSize:"small"})})})}})})}),Object(R.jsx)(v.a,{item:!0,xs:3,md:3,className:c.operatorGrid,children:Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"operator-select",children:"Operator"}),Object(R.jsx)(w.a,{native:!0,margin:"dense",label:"Operator",value:t.operator.value,onChange:function(e){var n=e.target.value,i=g.find((function(e){return e.value===n}));a(t.id,"operator",i)},inputProps:{name:"operator",id:"operator-select"},children:x})]})}),Object(R.jsx)(v.a,{item:!0,xs:8,md:4,children:Object(R.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),a(t.id,"value",p)},children:Object(R.jsx)(F.a,{id:"condition-value",label:"Value",margin:"dense",variant:"outlined",name:"condition-value",size:"small",onChange:function(e){return b(e.target.value)},value:p,InputProps:{endAdornment:Object(R.jsx)(M.a,{position:"end",children:Object(R.jsx)(X.a,{type:"submit",variant:"outlined",color:"primary",disabled:!y(p)||p===t.value,"aria-label":"Update the condition's filter value",className:c.button,children:Object(R.jsx)(L.a,{fontSize:"small"})})})}})})}),Object(R.jsx)(v.a,{item:!0,xs:1,md:1,children:Object(R.jsx)(X.a,{"aria-label":"Delete this query condition",title:"Delete this query condition",onClick:function(){r(t.id)},children:Object(R.jsx)(q.a,{fontSize:"small"})})})]})}var ne=a(557),ie=(a(284),Object(p.a)((function(e){return{header1:{margin:0,fontSize:"1.4em",color:e.palette.text.primary,fontWeight:500},paper:{padding:e.spacing(2)},jsonView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},textView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},linearProgres:{marginTop:e.spacing(2),marginBottom:e.spacing(2)}}})));function re(e){var t=e.data,a=e.isLoading,n=ie();return a?Object(R.jsxs)(x.a,{className:n.paper,children:[Object(R.jsx)("h1",{children:"Query Results"}),Object(R.jsx)(ne.a,{className:n.linearProgres})]}):Object(R.jsxs)(x.a,{className:n.paper,children:[Object(R.jsx)("h1",{className:n.header1,children:"Query Results"}),t?Object(R.jsx)("div",{className:n.textView,children:Object(R.jsx)("pre",{children:JSON.stringify(t,null,2)})}):null]})}var ce=a(558),le=a(258),se=a.n(le),oe=a(161),ue=a.n(oe),de=a(259),me=a.n(de),je=Object(p.a)((function(e){return{header1:{margin:0,fontSize:"1.4em",color:e.palette.text.primary,fontWeight:500},paper:{padding:e.spacing(2)},urlBox:{marginTop:e.spacing(1),backgroundColor:"#303030",color:"#fff",fontFamily:"monospace",padding:e.spacing(1),borderRadius:4},container:{marginTop:e.spacing(1)},gridItem:{marginRight:e.spacing(2)},button:{},runButton:{width:120},buttonWide:{whiteSpace:"nowrap"}}}));function pe(e){var t=e.queryUrl,a=e.isLoading,n=e.onRunQuery,i=je();return Object(R.jsxs)(x.a,{className:i.paper,children:[Object(R.jsx)("h1",{className:i.header1,children:"Query String"}),Object(R.jsx)("div",{className:i.urlBox,children:t}),Object(R.jsxs)(v.a,{container:!0,justifyContent:"flex-start",alignItems:"center",spacing:1,className:i.container,children:[Object(R.jsx)(v.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(y.a,{color:"primary",variant:"contained",onClick:n,value:"Run",className:i.runButton,startIcon:a?null:Object(R.jsx)(se.a,{}),title:"Run the query",children:a?"Loading...":"Run"})}),Object(R.jsx)(v.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){navigator.clipboard.writeText(t)},value:"Copy",className:i.button,title:"Copy the query url to the clipboard",startIcon:Object(R.jsx)(ue.a,{}),children:"Copy"})}),Object(R.jsx)(v.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){var e=function(e){var a=new RegExp("(/s:)[A-z0-9]+/");return t.replace(a,"/s:example/")}();navigator.clipboard.writeText(e)},value:"Copy Anonymous",className:i.buttonWide,title:"Copy the query url to the clipboard and replace your service ID with 'example'",startIcon:Object(R.jsx)(ue.a,{}),children:"Copy Anon."})}),Object(R.jsx)(v.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(ce.a,{to:t,href:t,target:"_blank",rel:"noreferrer",children:Object(R.jsx)(y.a,{color:"primary",variant:"outlined",value:"Open Query",className:i.buttonWide,title:"Open the query URL in a new tab",startIcon:Object(R.jsx)(me.a,{}),children:"Open"})})})]})]})}var be=a(565),he=a(167).Query,fe=a(167),ge=Object(p.a)((function(e){return{root:{flexGrow:1},container:{"margin-top":e.spacing(3)},gridContainer:{padding:e.spacing(2)},gridContainerItem:{"padding-bottom":e.spacing(2)},paper:{padding:e.spacing(2)},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},header1:{margin:0,fontSize:"1.4em",color:e.palette.text.primary,fontWeight:500},header2:{margin:0,fontSize:"1.2em",color:e.palette.text.primary,fontWeight:500,width:"100%",marginTop:e.spacing(1.5)},itemParagraph:{marginTop:e.spacing(1),marginBottom:e.spacing(2)},splitQueryField:{width:250},filterSelect:{width:120},inlineSelectItem:{marginTop:4},textButton:{marginTop:-4,marginBottom:e.spacing(1)},buttonWrapper:{margin:e.spacing(1),position:"relative",display:"flex",justifyContent:"flex-start"},buttonProgress:{color:"black",position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}));function Oe(){var e=ge();Object(n.useEffect)((function(){fe.SetGlobalNamespace("ps2:v2")}),[]);var t=Object(n.useState)(localStorage.getItem("DaybreakGamesKey")),a=Object(j.a)(t,2),r=a[0],c=a[1];Object(n.useEffect)((function(){var e=localStorage.getItem("DaybreakGamesKey");null!==e&&(fe.SetGlobalServiceKey(e),c(e))}),[c]);var l=Object(n.useState)(!1),p=Object(j.a)(l,2),I=p[0],F=p[1],T=Object(n.useState)({serviceKey:r||"example",namespace:"ps2:v2",collection:"character",language:"All",conditions:[],limit:10,start:null,filterType:"show",filterFields:[],resolves:[],joins:[],trees:[],lang:null,sort:[]}),L=Object(j.a)(T,2),D=L[0],q=L[1],E=Object(f.a)("(prefers-color-scheme: dark)"),A=i.a.useMemo((function(){return Object(b.a)({palette:{type:"light",primary:S.a,secondary:N.a},contrastThreshold:5})}),[E]);function K(e,t){var a=D[e];if(""!==t&&!a.includes(t)){var n=a;n.push(t),q(Object(m.a)(Object(m.a)({},D),Object(d.a)({},e,n)))}}function G(e,t){var a=D[e],n=a.indexOf(t);if(-1!==n){var i=a;i.splice(n,1),q(Object(m.a)(Object(m.a)({},D),Object(d.a)({},e,i)))}}function W(e,t,a){var n=D.conditions.map((function(n){return n.id===e&&(n[t]=a),n}));q(Object(m.a)(Object(m.a)({},D),{conditions:n}))}function Q(e){var t=D.conditions.filter((function(t){return t.id!==e}));q(Object(m.a)(Object(m.a)({},D),{conditions:t}))}var B=Object(n.useState)(""),U=Object(j.a)(B,2),J=U[0],M=U[1],X=Object(n.useState)(new he(D.collection,D.namespace,D.serviceKey)),Y=Object(j.a)(X,2),Z=(Y[0],Y[1]);Object(n.useEffect)((function(){try{var e=function(){var e=new he(D.collection,D.namespace,D.serviceKey);return D.language&&"All"!==D.language&&e.setLanguage(D.language.toLowerCase()),null!==D.limit&&e.setLimit(D.limit),null!==D.start&&e.setStart(D.start),D.filterFields.length>0&&e["".concat(D.filterType,"Fields")](D.filterFields),D.resolves.length>0&&e.resolve(D.resolves),D.sort.length>0&&e.sort(D.sort),D.conditions.length>0&&D.conditions.forEach((function(t){""!==t.field&&t.operator&&""!==t.value&&e.where(t.field)[t.operator.name](t.value)})),e}();Z(e),console.log("CensusQuery: ",e);var t=e().toUrl();t=t.replace("http://","https://"),console.log("Set Query URL: ",J),M(t)}catch(a){console.log("Error getting query URL: ",a)}}),[D]);var $=Object(n.useState)(""),te=Object(j.a)($,2),ne=te[0],ie=te[1];function ce(){return(ce=Object(o.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!J||I){e.next=19;break}return F(!0),e.prev=2,console.log("Fetch Query URL: ",J),e.next=6,fetch(J);case 6:return t=e.sent,e.next=9,t.json();case 9:a=e.sent,ie(a),F(!1),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(2),console.log("Error getting data from query: ",e.t0),ie("Error getting data from query: ".concat(e.t0)),F(!1);case 19:case"end":return e.stop()}}),e,null,[[2,14]])})))).apply(this,arguments)}return Object(R.jsxs)(h.a,{theme:A,children:[Object(R.jsx)(g.a,{}),Object(R.jsx)(O.a,{maxWidth:"lg",className:e.container,children:Object(R.jsxs)(v.a,{container:!0,alignItems:"flex-start",children:[Object(R.jsxs)(v.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(R.jsx)(v.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsxs)(x.a,{className:e.paper,children:[Object(R.jsx)("h1",{className:e.header1,children:"Set Service ID"}),Object(R.jsxs)("p",{className:e.itemParagraph,children:["Sign up for a service ID"," ",Object(R.jsx)("a",{href:"https://census.daybreakgames.com/#service-id","aria-label":"Service ID sign up page",target:"_blank",rel:"noreferrer",children:"here"}),". The 'example' service ID allows up to 10 requests per minute. Saving your service ID will store it to this browser."]}),Object(R.jsx)(z,{serviceId:D.serviceKey,onServiceKeyChange:function(e){q(Object(m.a)(Object(m.a)({},D),{serviceKey:e})),fe.SetGlobalServiceKey(e),localStorage.setItem("DaybreakGamesKey",e)},onDeleteStoredKey:function(){q(Object(m.a)(Object(m.a)({},D),{serviceKey:"example"})),fe.SetGlobalServiceKey("example"),localStorage.removeItem("DaybreakGamesKey")}})]})}),Object(R.jsx)(v.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsxs)(x.a,{className:e.paper,children:[Object(R.jsx)("h1",{className:e.header1,children:"Query Creator"}),Object(R.jsxs)("p",{className:e.itemParagraph,children:["Refer to the"," ",Object(R.jsx)("a",{href:"https://census.daybreakgames.com/#general","aria-label":"Official census API documentation page",target:"_blank",rel:"noreferrer",children:"official documentation"})," ","for more information on using the API."]}),Object(R.jsx)("h2",{className:e.header2,children:"Collection"}),Object(R.jsxs)(v.a,{container:!0,spacing:1,alignItems:"flex-start",className:e.gridRow,children:[Object(R.jsx)(v.a,{item:!0,sm:12,md:6,className:e.splitQueryField,children:Object(R.jsx)(P,{collection:D.collection,onChange:function(e){q(Object(m.a)(Object(m.a)({},D),{collection:e}))}})}),Object(R.jsx)(v.a,{item:!0,sm:12,md:6,className:e.splitQueryField,children:Object(R.jsx)(H,{value:D.language,onChange:function(e){q(Object(m.a)(Object(m.a)({},D),{language:e.toLowerCase()}))}})}),Object(R.jsx)(v.a,{item:!0,sm:12,style:{marginLeft:4,marginTop:8},children:Object(R.jsx)(V,{value:D.limit,onChange:function(e){q(Object(m.a)(Object(m.a)({},D),{limit:e}))},label:"Limit"})})]}),Object(R.jsx)("h2",{className:e.header2,children:"Search Conditions"}),Object(R.jsx)(v.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:e.gridRow,children:D.conditions.map((function(e){return Object(R.jsx)(ae,{conditionData:e,onDataChange:W,onDelete:Q},e.id)}))}),Object(R.jsx)(v.a,{item:!0,xs:12,children:Object(R.jsx)(y.a,{color:"primary",startIcon:Object(R.jsx)(k.a,{fontSize:"small"}),size:"small",onClick:function(){var e={id:Object(be.a)(),field:"",value:"",operator:{display:"=",name:"equals",title:"Equals",value:"="}};q(Object(m.a)(Object(m.a)({},D),{conditions:[].concat(Object(u.a)(D.conditions),[e])}))},className:e.textButton,children:"New Condition"})}),Object(R.jsx)("h2",{className:e.header2,children:"Filter Displayed Fields"}),Object(R.jsxs)(v.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:[Object(R.jsx)(v.a,{item:!0,xs:12,sm:6,md:3,className:e.inlineSelectItem,children:Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"filter-type-select",children:"Filter Type"}),Object(R.jsxs)(w.a,{native:!0,margin:"dense",label:"Filter Type",className:e.filterSelect,value:D.filterType,onChange:function(e){var t=e.target.checked?"show":"hide";q(Object(m.a)(Object(m.a)({},D),{filterType:t}))},inputProps:{name:"filter-type",id:"filter-type-select"},children:[Object(R.jsx)("option",{"aria-label":"Show",value:"show",children:"Show"}),Object(R.jsx)("option",{"aira-label":"Hide",value:"hide",children:"Hide"})]})]})}),Object(R.jsx)(ee,{label:"Add Field",fields:D.filterFields,onAddField:function(e){return K("filterFields",e)},onRemoveField:function(e){return G("filterFields",e)}})]}),Object(R.jsx)("h2",{className:e.header2,children:"Resolves & Joins"}),Object(R.jsx)(v.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:Object(R.jsx)(ee,{label:"Resolves",fields:D.resolves,onAddField:function(e){return K("resolves",e)},onRemoveField:function(e){return G("resolves",e)}})})]})})]}),Object(R.jsxs)(v.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(R.jsx)(v.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsx)(pe,{queryUrl:J,isLoading:I,onRunQuery:function(){return ce.apply(this,arguments)}})}),Object(R.jsx)(v.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsx)(re,{data:ne,isLoading:I})})]})]})})]})}var ve=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,571)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),i(e),r(e),c(e)}))};c.a.render(Object(R.jsx)(i.a.StrictMode,{children:Object(R.jsx)(Oe,{})}),document.getElementById("root")),ve()}},[[513,1,2]]]);
//# sourceMappingURL=main.e3bbde22.chunk.js.map