(this["webpackJsonpps2-visual-query"]=this["webpackJsonpps2-visual-query"]||[]).push([[0],{284:function(e,t,a){},286:function(e,t,a){},311:function(e,t){},313:function(e,t){},322:function(e,t){},324:function(e,t){},349:function(e,t){},351:function(e,t){},352:function(e,t){},357:function(e,t){},359:function(e,t){},365:function(e,t){},367:function(e,t){},386:function(e,t){},398:function(e,t){},401:function(e,t){},427:function(e,t){},521:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(18),c=a.n(r),s=(a(284),a(164)),l=a.n(s),o=a(257),u=a(104),d=a(64),j=a(11),m=a(23),b=a(556),p=a(268),h=a(571),g=a(570),f=a(572),O=a(573),x=a(566),v=a(563),y=a(564),_=a(561),C=a(579),w=a(574),N=(a(286),a(123)),I=a(124),S=a(100),T=a.n(S),F=a(577),L=a(67),k=a.n(L),D=a(84),q=a.n(D),E=a(2),A=Object(b.a)((function(e){return{button:{margin:e.spacing(1)}}}));var R=function(e){var t=e.serviceId,a=e.onServiceKeyChange,i=e.onDeleteStoredKey,r=A(),c=Object(n.useState)(t),s=Object(m.a)(c,2),l=s[0],o=s[1];return Object(E.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),a(l)},children:[Object(E.jsx)(F.a,{id:"service-key",label:"Service Key",margin:"dense",variant:"outlined",required:!0,name:"service-key",onChange:function(e){return o(e.target.value)},placeholder:"example",value:l,helperText:"Omit the leading 's:'"}),Object(E.jsx)(y.a,{type:"submit",variant:"contained",color:"primary",size:"large",className:r.button,startIcon:Object(E.jsx)(k.a,{}),children:"Save"}),Object(E.jsx)(y.a,{type:"button",variant:"outlined",color:"primary",size:"large",className:r.button,startIcon:Object(E.jsx)(q.a,{}),onClick:function(){o("example"),i()},children:"Delete"})]})},z=a(575),B={Languages:["De","En","Es","Fr","It"],Operators:[{display:"=",name:"equals",title:"Equals",value:"="},{display:"\u2260",name:"notEquals",title:"Not Equals",value:"=!"},{display:"<",name:"isLessThan",title:"Is Less Than",value:"=<"},{display:"\u2264",name:"isLessThanOrEquals",title:"Is Less Than Or Equals",value:"=["},{display:">",name:"isGreaterThan",title:"Is Greater Than",value:"=>"},{display:"\u2265",name:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",value:"=]"},{display:"Starts With",name:"startsWith",title:"Starts With",value:"=^"},{display:"Contains",name:"contains",title:"Contains",value:"=*"}],Collections:["character","character_name","characters_achievement","characters_currency","characters_directive","characters_directive_objective","characters_directive_tier","characters_directive_tree","characters_skill","characters_stat","characters_stat_by_faction","characters_stat_history","characters_weapon_stat","characters_weapon_stat_by_faction","world_stat_history","characters_item","ability","ability_type","achievement","armor_facing","armor_info","currency","directive","directive_tier","directive_tree","directive_tree_category","effect","effect_type","empire_scores","experience","experience_rank","facility_link","facility_type","faction","fire_group","fire_group_to_fire_mode","fire_mode","fire_mode_2","fire_mode_to_projectile","fire_mode_type","image","image_set","image_set_default","item","item_attachment","item_category","item_profile","item_to_weapon","item_type","loadout","map_hex","map_region","marketing_bundle","marketing_bundle_item","marketing_bundle_with_1_item","metagame_event","metagame_event_state","objective","objective_set_to_objective","objective_type","player_state","player_state_group","player_state_group_2","profile","profile_2","profile_armor_map","profile_resist_map","projectile","projectile_flight_type","region","resist_info","resist_type","resource_type","reward","reward_group_to_reward","reward_set_to_reward_group","reward_type","single_character_by_id","skill","skill_category","skill_line","skill_set","target_type","title","vehicle","vehicle_attachment","vehicle_faction","vehicle_skill_set","weapon","weapon_ammo_slot","weapon_datasheet","weapon_to_attachment","weapon_to_fire_group","zone","zone_effect","zone_effect_type","characters_world","world","outfit","outfit_member","outfit_member_extended","outfit_rank","characters_online_status","map","characters_friend","leaderboard","characters_leaderboard","characters_event_grouped","characters_event","event","world_event"]},G=Object(b.a)((function(e){return{selectControl:{minWidth:250}}}));function W(e){var t=e.collection,a=e.onChange,i=G(),r=Object(n.useState)([]),c=Object(m.a)(r,2),s=c[0],l=c[1];function o(e){s.includes(e)&&a(e)}return Object(n.useEffect)((function(){l(B.Collections)}),[]),Object(E.jsx)(z.a,{id:"collection-selector",options:s,value:t,autoSelect:!0,required:!0,onChange:function(e,t){return o(t)},renderInput:function(e){return Object(E.jsx)(F.a,Object(j.a)(Object(j.a)({},e),{},{label:"Collection",variant:"outlined",margin:"dense"}))},className:i.selectControl})}var J=a(581),K=Object(b.a)((function(e){return{root:{width:250}}})),P=[{value:10,label:10},{value:20,label:100},{value:30,label:"1k"},{value:40,label:"10k"}],Q=function(e){return e<=10?e:e<=20?10*(e-10):e<=30?100*(e-20):1e3*(e-30)};function V(e){var t,a=e.value,n=e.onChange,r=(e.label,K()),c=(t=a)<=10?t:t<=100?t/10+10:t<=1e3?t/100+20:t/1e3+30;return Object(E.jsxs)(i.a.Fragment,{children:[Object(E.jsx)(C.a,{id:"limit-input-slider-label",htmlFor:"limit-slider",children:"Limit"}),Object(E.jsx)(J.a,{className:r.root,id:"limit-slider",value:"number"===typeof c?c:0,min:1,step:1,max:40,defaultValue:10,getAriaValueText:Q,valueLabelFormat:Q,valueLabelDisplay:"auto",onChange:function(e,t){n(Q(t))},"aria-labelledby":"limit-input-slider-label",marks:P})]})}var U=Object(b.a)((function(e){return{selectControl:{minWidth:120,width:120}}}));function H(e){var t=e.language,a=e.onChange,i=U(),r=Object(n.useState)([]),c=Object(m.a)(r,2),s=c[0],l=c[1];Object(n.useEffect)((function(){l(B.Languages)}),[]);var o=s.map((function(e){return Object(E.jsx)("option",{value:e,"aria-label":e,children:e},e)}));return Object(E.jsxs)(_.a,{variant:"outlined",children:[Object(E.jsx)(C.a,{htmlFor:"language-select",children:"Language"}),Object(E.jsxs)(w.a,{native:!0,margin:"dense",label:"Language",className:i.selectControl,value:t,onChange:function(e){var t=e.target.value;a(t)},inputProps:{name:"language",id:"language-select"},children:[Object(E.jsx)("option",{"aria-label":"All",value:"All",children:"All"}),o]})]})}var M=a(580),Y=a(567),X=a(565),Z=a(264),$=a.n(Z),ee=Object(b.a)((function(e){return{button:{margin:0,padding:0},chipList:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}));function te(e){var t=e.label,a=e.fields,r=e.onAddField,c=e.onRemoveField,s=ee(),l=Object(n.useState)(""),o=Object(m.a)(l,2),u=o[0],d=o[1];function j(){return""!==u&&!a.includes(u.toLowerCase())}var b=a.map((function(e){return Object(E.jsx)("li",{children:Object(E.jsx)(M.a,{label:e,onDelete:function(){return function(e){c(e)}(e)},className:s.chip,size:"small"})},e)}));return Object(E.jsxs)(i.a.Fragment,{children:[Object(E.jsx)(x.a,{item:!0,xs:12,sm:6,md:4,children:Object(E.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),j()&&(d(""),r(u.toLowerCase()))},children:Object(E.jsx)(F.a,{id:"add-show-field-input",label:t,margin:"dense",variant:"outlined",name:"show-field",size:"small",onChange:function(e){return d(e.target.value)},placeholder:"example",value:u,InputProps:{endAdornment:Object(E.jsx)(Y.a,{position:"end",children:Object(E.jsx)(X.a,{type:"submit",variant:"outlined",color:"primary",disabled:!j(),"aria-label":"Add to shown fields",className:s.button,children:Object(E.jsx)($.a,{})})})}})})}),Object(E.jsx)("ul",{className:s.chipList,children:b})]})}var ae=Object(b.a)((function(e){return{fieldGridItem:{marginTop:e.spacing(1),marginBottom:4,marginLeft:e.spacing(1)},operatorGrid:{marginTop:4},button:{margin:0,padding:0}}}));function ne(e){var t=e.conditionData,a=e.onDataChange,r=e.onDelete,c=ae(),s=Object(n.useState)(t.field),l=Object(m.a)(s,2),o=l[0],u=l[1],d=Object(n.useState)(t.value),j=Object(m.a)(d,2),b=j[0],p=j[1],h=Object(n.useState)([]),g=Object(m.a)(h,2),f=g[0],O=g[1];function v(e){return""!==e}return Object(n.useEffect)((function(){O(B.Operators)}),[]),Object(E.jsxs)(i.a.Fragment,{children:[Object(E.jsx)(x.a,{item:!0,xs:12,md:4,children:Object(E.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),a(t.id,"field",o)},children:Object(E.jsx)(F.a,{id:"condition-field",label:"Field",margin:"dense",variant:"outlined",name:"condition-field",size:"small",onChange:function(e){return u(e.target.value)},value:o,InputProps:{endAdornment:Object(E.jsx)(Y.a,{position:"end",children:Object(E.jsx)(X.a,{type:"submit",variant:"outlined",color:"primary",disabled:!v(o)||o===t.field,"aria-label":"Update the condition's field",className:c.button,children:Object(E.jsx)(k.a,{fontSize:"small"})})})}})})}),Object(E.jsx)(x.a,{item:!0,xs:3,md:3,className:c.operatorGrid,children:Object(E.jsxs)(_.a,{variant:"outlined",children:[Object(E.jsx)(C.a,{htmlFor:"operator-select",children:"Operator"}),Object(E.jsxs)(w.a,{native:!0,margin:"dense",label:"Operator",value:t.operator.name,onChange:function(e){var n=e.target.value,i=f.find((function(e){return e.name===n}));a(t.id,"operator",i)},inputProps:{name:"operator",id:"operator-select"},children:[Object(E.jsx)("option",{value:"equals",title:"Equals",children:"="},"equals"),Object(E.jsx)("option",{value:"notEquals",title:"Not Equals",children:"\u2260"},"notEquals"),Object(E.jsx)("option",{value:"isLessThan",title:"Is Less Than",children:"<"},"isLessThan"),Object(E.jsx)("option",{value:"isLessThanOrEquals",title:"Is Less Than Or Equals",children:"\u2264"},"isLessThanOrEquals"),Object(E.jsx)("option",{value:"isGreaterThan",title:"Is Greater Than",children:">"},"isGreaterThan"),Object(E.jsx)("option",{value:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",children:"\u2265"},"isGreaterThanOrEquals"),Object(E.jsx)("option",{value:"startsWith",children:"Starts With"},"startsWith"),Object(E.jsx)("option",{value:"contains",children:"Contains"},"contains")]})]})}),Object(E.jsx)(x.a,{item:!0,xs:8,md:4,children:Object(E.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),a(t.id,"value",b)},children:Object(E.jsx)(F.a,{id:"condition-value",label:"Value",margin:"dense",variant:"outlined",name:"condition-value",size:"small",onChange:function(e){return p(e.target.value)},value:b,InputProps:{endAdornment:Object(E.jsx)(Y.a,{position:"end",children:Object(E.jsx)(X.a,{type:"submit",variant:"outlined",color:"primary",disabled:!v(b)||b===t.value,"aria-label":"Update the condition's filter value",className:c.button,children:Object(E.jsx)(k.a,{fontSize:"small"})})})}})})}),Object(E.jsx)(x.a,{item:!0,xs:1,md:1,children:Object(E.jsx)(X.a,{"aria-label":"Delete this query condition",title:"Delete this query condition",onClick:function(){r(t.id)},children:Object(E.jsx)(q.a,{fontSize:"small"})})})]})}var ie=a(568),re=(a(292),Object(b.a)((function(e){return{header1:{margin:0,fontSize:"1.4em",fontWeight:500},paper:{padding:e.spacing(2)},jsonView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},textView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},linearProgres:{marginTop:e.spacing(2),marginBottom:e.spacing(2)}}})));function ce(e){var t=e.data,a=e.isLoading,n=re();return a?Object(E.jsxs)(v.a,{className:n.paper,children:[Object(E.jsx)("h1",{children:"Query Results"}),Object(E.jsx)(ie.a,{className:n.linearProgres})]}):Object(E.jsxs)(v.a,{className:n.paper,children:[Object(E.jsx)("h1",{className:n.header1,children:"Query Results"}),t?Object(E.jsx)("div",{className:n.textView,children:Object(E.jsx)("pre",{children:JSON.stringify(t,null,2)})}):null]})}var se=a(569),le=a(265),oe=a.n(le),ue=a(165),de=a.n(ue),je=a(266),me=a.n(je),be=Object(b.a)((function(e){return{header1:{margin:0,fontSize:"1.4em",fontWeight:500},paper:{padding:e.spacing(2)},urlBox:{marginTop:e.spacing(1),backgroundColor:"#1F2330",color:"#fff",fontFamily:"monospace",padding:e.spacing(1),borderRadius:4,wordWrap:"anywhere",overflow:"auto"},container:{marginTop:e.spacing(1)},gridItem:{marginRight:e.spacing(2)},button:{},runButton:{width:120},runButtonIcon:{marginLeft:-8},buttonWide:{whiteSpace:"nowrap"}}}));function pe(e){var t=e.queryUrl,a=e.isLoading,n=e.onRunQuery,i=be();return Object(E.jsxs)(v.a,{className:i.paper,children:[Object(E.jsx)("h1",{className:i.header1,children:"Query String"}),Object(E.jsx)("div",{className:i.urlBox,children:t}),Object(E.jsxs)(x.a,{container:!0,justifyContent:"flex-start",alignItems:"center",spacing:1,className:i.container,children:[Object(E.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(E.jsx)(y.a,{color:"primary",variant:"contained",onClick:n,value:"Run",className:i.runButton,startIcon:a?null:Object(E.jsx)(oe.a,{className:i.runButtonIcon}),title:"Run the query",children:a?"Loading...":"Run"})}),Object(E.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(E.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){navigator.clipboard.writeText(t)},value:"Copy",className:i.button,title:"Copy the query url to the clipboard",startIcon:Object(E.jsx)(de.a,{}),children:"Copy"})}),Object(E.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(E.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){var e=function(e){var a=new RegExp("(/s:)[A-z0-9]+/");return t.replace(a,"/s:example/")}();navigator.clipboard.writeText(e)},value:"Copy Anonymous",className:i.buttonWide,title:"Copy the query url to the clipboard and replace your service ID with 'example'",startIcon:Object(E.jsx)(de.a,{}),children:"Copy Anon."})}),Object(E.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(E.jsx)(se.a,{to:t,href:t,target:"_blank",rel:"noreferrer",children:Object(E.jsx)(y.a,{color:"primary",variant:"outlined",value:"Open Query",className:i.buttonWide,title:"Open the query URL in a new tab",startIcon:Object(E.jsx)(me.a,{}),children:"Open"})})})]})]})}var he=a(267),ge=a.n(he),fe=a(576);function Oe(e){var t=e.value,a=e.label,n=e.trueLabel,i=void 0===n?"Yes":n,r=e.falseLabel,c=void 0===r?"No":r,s=e.onChange,l=e.className,o=void 0===l?null:l;return Object(E.jsxs)(_.a,{variant:"outlined",style:{minWidth:120},children:[Object(E.jsx)(C.a,{htmlFor:"boolean-select",children:a}),Object(E.jsxs)(w.a,{native:!0,margin:"dense",label:a,className:o,value:t,onChange:function(e){return s(e.target.value)},inputProps:{name:"boolean-select",id:"boolean-select"},children:[Object(E.jsx)("option",{"aria-label":i,value:!0,children:i}),Object(E.jsx)("option",{"aria-label":c,value:!1,children:c})]})]})}var xe=Object(b.a)((function(e){return{paper:{padding:e.spacing(1),marginBottom:e.spacing(2)},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},textButton:{marginTop:-4,marginBottom:e.spacing(1)},footer:{marginTop:e.spacing(0),marginBottom:e.spacing(0)}}}));function ve(e){var t=e.joinData,a=e.onChange,i=e.onDelete,r=(e.onAddNewJoin,xe()),c=Object(n.useState)(t),s=Object(m.a)(c,2),l=s[0],o=s[1];function u(){a(l)}function b(){i(t.id)}function p(e,t){o(Object(j.a)(Object(j.a)({},l),Object(d.a)({},e,t)))}return Object(E.jsxs)(v.a,{className:r.paper,children:[Object(E.jsxs)("form",{onSubmit:function(e){e.preventDefault(),u()},children:[Object(E.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:r.gridRow,children:[Object(E.jsx)(x.a,{item:!0,xs:12,sm:8,children:Object(E.jsx)(W,{collection:l.collection,onChange:function(e){e&&p("collection",e)}})}),Object(E.jsx)(x.a,{item:!0,xs:12,sm:4,children:Object(E.jsx)(F.a,{id:"inject-at",label:"Inject At",margin:"dense",variant:"outlined",name:"inject-at",onChange:function(e){return p("injectAt",e.target.value)},value:l.injectAt})})]}),Object(E.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:r.gridRow,children:[Object(E.jsx)(x.a,{item:!0,xs:6,sm:3,children:Object(E.jsx)(Oe,{label:"Join Type",value:l.isOuterJoin,trueLabel:"Outer",falseLabel:"Inner",onChange:function(e){return p("isOuterJoin",e)}})}),Object(E.jsx)(x.a,{item:!0,xs:4,children:Object(E.jsx)(F.a,{id:"join-on-field",label:"On Field",margin:"dense",variant:"outlined",name:"join-on-field",onChange:function(e){p("onField",e.target.value)},value:l.onField})}),Object(E.jsx)(x.a,{item:!0,xs:1,style:{textAlign:"center"},children:Object(E.jsx)(ge.a,{style:{marginTop:8}})}),Object(E.jsx)(x.a,{item:!0,xs:4,children:Object(E.jsx)(F.a,{id:"join-to-field",label:"To Field",margin:"dense",variant:"outlined",name:"join-to-field",onChange:function(e){p("toField",e.target.value)},value:l.toField})})]}),Object(E.jsxs)(x.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"flex-start",className:r.footer,children:[Object(E.jsx)(x.a,{item:!0,container:!0,xs:6,alignItems:"center",justifyContent:"flex-start",children:Object(E.jsx)(x.a,{item:!0,xs:3,children:Object(E.jsx)(Oe,{label:"Is List",value:l.isList,onChange:function(e){return p("isList",e)}})})}),Object(E.jsxs)(x.a,{item:!0,container:!0,xs:6,spacing:2,alignItems:"center",justifyContent:"flex-end",children:[Object(E.jsx)(x.a,{item:!0,children:Object(E.jsx)(y.a,{color:"default",startIcon:Object(E.jsx)(q.a,{fontSize:"small"}),size:"small",onClick:b,children:"Delete"})}),Object(E.jsx)(x.a,{item:!0,children:Object(E.jsx)(y.a,{type:"submit",color:"primary",variant:"outlined",startIcon:Object(E.jsx)(k.a,{fontSize:"small"}),size:"small",onClick:u,children:"Save"})})]})]})]}),t.joins.length>0&&Object(E.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:r.gridRow,children:t.joins.map((function(e){return Object(E.jsx)(ve,{joinData:e,onDataChange:p,onDelete:b},e.id)}))})]})}var ye=Object(b.a)((function(e){return{gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},textButton:{marginTop:-4,marginBottom:e.spacing(1)}}}));function _e(e){var t=e.joinsData,a=e.onJoinDataChange,n=e.onAddNewJoin,r=e.onDeleteJoin,c=(e.depth,ye());function s(e){a(e)}function l(e){r(e)}return Object(E.jsxs)(i.a.Fragment,{children:[Object(E.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:c.gridRow,children:t.map((function(e){return Object(E.jsx)(ve,{joinData:e,onChange:s,onDelete:l},e.id)}))}),Object(E.jsx)(x.a,{item:!0,xs:12,children:Object(E.jsx)(y.a,{color:"primary",startIcon:Object(E.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e={id:Object(fe.a)(),parentId:null,collection:"",isList:!1,filterType:"show",filterFields:[],injectAt:"",terms:[],isOuterJoin:!1,joins:[],onField:"",toField:""};n(e)},className:c.textButton,children:"New Join"})})]})}var Ce=a(173).Query,we=a(173),Ne=Object(b.a)((function(e){return{root:{flexGrow:1},container:{"margin-top":e.spacing(3)},gridContainer:{padding:e.spacing(2)},gridContainerItem:{"padding-bottom":e.spacing(2)},paper:{padding:e.spacing(2)},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},header1:{margin:0,fontSize:"1.4em",fontWeight:500},header2:{margin:0,fontSize:"1.2em",fontWeight:500,width:"100%",marginTop:e.spacing(1.5)},itemParagraph:{marginTop:e.spacing(1),marginBottom:e.spacing(2)},splitQueryField:{width:250},filterSelect:{width:120},inlineSelectItem:{marginTop:4},textButton:{marginTop:-4,marginBottom:e.spacing(1)},buttonWrapper:{margin:e.spacing(1),position:"relative",display:"flex",justifyContent:"flex-start"},buttonProgress:{color:"black",position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}));function Ie(){var e=Ne();Object(n.useEffect)((function(){we.SetGlobalNamespace("ps2:v2")}),[]);var t=Object(n.useState)(localStorage.getItem("DaybreakGamesKey")),a=Object(m.a)(t,2),r=a[0],c=a[1];Object(n.useEffect)((function(){var e=localStorage.getItem("DaybreakGamesKey");null!==e&&(we.SetGlobalServiceKey(e),c(e))}),[c]);var s=Object(n.useState)(!1),b=Object(m.a)(s,2),S=b[0],F=b[1],L=Object(n.useState)({serviceKey:r||"example",namespace:"ps2:v2",collection:"character",language:"All",conditions:[],limit:10,start:null,filterType:"show",filterFields:[],resolves:[],joins:[],trees:[],lang:null,sort:[]}),k=Object(m.a)(L,2),D=k[0],q=k[1],A=Object(g.a)("(prefers-color-scheme: dark)"),z=i.a.useMemo((function(){return Object(p.a)({palette:{type:A?"dark":"light",primary:A?{main:"#E7ADFB"}:N.a,secondary:I.a,background:{paper:"#27273A",default:"#0F1320"}},contrastThreshold:5})}),[A]);function B(e,t){var a=D[e];if(""!==t&&!a.includes(t)){var n=a;n.push(t),q(Object(j.a)(Object(j.a)({},D),Object(d.a)({},e,n)))}}function G(e,t){var a=D[e],n=a.indexOf(t);if(-1!==n){var i=a;i.splice(n,1),q(Object(j.a)(Object(j.a)({},D),Object(d.a)({},e,i)))}}function J(e,t,a){var n=D.conditions.map((function(n){return n.id===e&&(n[t]=a),n}));q(Object(j.a)(Object(j.a)({},D),{conditions:n}))}function K(e){var t=D.conditions.filter((function(t){return t.id!==e}));q(Object(j.a)(Object(j.a)({},D),{conditions:t}))}var P=Object(n.useState)(""),Q=Object(m.a)(P,2),U=Q[0],M=Q[1],Y=Object(n.useState)(new Ce(D.collection,D.namespace,D.serviceKey)),X=Object(m.a)(Y,2),Z=(X[0],X[1]);Object(n.useEffect)((function(){try{var e=function(){var e=new Ce(D.collection,D.namespace,D.serviceKey);return D.language&&"All"!==D.language&&e.setLanguage(D.language.toLowerCase()),null!==D.limit&&e.setLimit(D.limit),null!==D.start&&e.setStart(D.start),D.filterFields.length>0&&e["".concat(D.filterType,"Fields")](D.filterFields),D.resolves.length>0&&e.resolve(D.resolves),D.sort.length>0&&e.sort(D.sort),D.conditions.length>0&&D.conditions.forEach((function(t){""!==t.field&&t.operator&&""!==t.value&&e.where(t.field)[t.operator.name](t.value)})),D.joins.length>0&&D.joins.forEach((function(t){if(t.collection){var a=e.joinService(t.collection);a.isList(t.isList),a.isOuterJoin(t.isOuterJoin),t.injectAt&&a.injectAt(t.injectAt),t.onField&&a.onField(t.onField),t.toField&&a.toField(t.toField)}})),e}();Z(e);var t=e.toUrl();t=t.replace("http://","https://"),M(t)}catch(a){console.log("Error getting query URL: ",a)}}),[D]);var $=Object(n.useState)(""),ee=Object(m.a)($,2),ae=ee[0],ie=ee[1];function re(){return(re=Object(o.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!U||S){e.next=18;break}return F(!0),e.prev=2,e.next=5,fetch(U);case 5:return t=e.sent,e.next=8,t.json();case 8:a=e.sent,ie(a),F(!1),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(2),console.log("Error getting data from query: ",e.t0),ie("Error getting data from query: ".concat(e.t0)),F(!1);case 18:case"end":return e.stop()}}),e,null,[[2,13]])})))).apply(this,arguments)}return Object(E.jsxs)(h.a,{theme:z,children:[Object(E.jsx)(f.a,{}),Object(E.jsx)(O.a,{maxWidth:"lg",className:e.container,children:Object(E.jsxs)(x.a,{container:!0,alignItems:"flex-start",children:[Object(E.jsxs)(x.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(E.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(E.jsxs)(v.a,{className:e.paper,children:[Object(E.jsx)("h1",{className:e.header1,children:"Set Service ID"}),Object(E.jsxs)("p",{className:e.itemParagraph,children:["Sign up for a service ID"," ",Object(E.jsx)("a",{href:"https://census.daybreakgames.com/#service-id","aria-label":"Service ID sign up page",target:"_blank",rel:"noreferrer",style:{color:"#40afee"},children:"here"}),". The 'example' service ID allows up to 10 requests per minute. Saving your service ID will store it to this browser."]}),Object(E.jsx)(R,{serviceId:D.serviceKey,onServiceKeyChange:function(e){q(Object(j.a)(Object(j.a)({},D),{serviceKey:e})),we.SetGlobalServiceKey(e),localStorage.setItem("DaybreakGamesKey",e)},onDeleteStoredKey:function(){q(Object(j.a)(Object(j.a)({},D),{serviceKey:"example"})),we.SetGlobalServiceKey("example"),localStorage.removeItem("DaybreakGamesKey")}})]})}),Object(E.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(E.jsxs)(v.a,{className:e.paper,children:[Object(E.jsx)("h1",{className:e.header1,children:"Query Creator"}),Object(E.jsxs)("p",{className:e.itemParagraph,children:["Refer to the"," ",Object(E.jsx)("a",{href:"https://census.daybreakgames.com/#general","aria-label":"Official census API documentation page",target:"_blank",rel:"noreferrer",style:{color:"#40afee"},children:"official documentation"})," ","for more information on using the API."]}),Object(E.jsx)("h2",{className:e.header2,children:"Collection"}),Object(E.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:e.gridRow,children:[Object(E.jsx)(x.a,{item:!0,sm:12,md:7,className:e.splitQueryField,children:Object(E.jsx)(W,{collection:D.collection,onChange:function(e){q(Object(j.a)(Object(j.a)({},D),{collection:e}))}})}),Object(E.jsx)(x.a,{item:!0,sm:12,md:4,className:e.splitQueryField,style:{marginTop:4},children:Object(E.jsx)(H,{value:D.language,onChange:function(e){q(Object(j.a)(Object(j.a)({},D),{language:e.toLowerCase()}))}})}),Object(E.jsx)(x.a,{item:!0,sm:12,style:{marginLeft:4,marginTop:8},children:Object(E.jsx)(V,{value:D.limit,onChange:function(e){q(Object(j.a)(Object(j.a)({},D),{limit:e}))},label:"Limit"})})]}),Object(E.jsx)("h2",{className:e.header2,children:"Search Conditions"}),Object(E.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:e.gridRow,children:D.conditions.map((function(e){return Object(E.jsx)(ne,{conditionData:e,onDataChange:J,onDelete:K},e.id)}))}),Object(E.jsx)(x.a,{item:!0,xs:12,children:Object(E.jsx)(y.a,{color:"primary",startIcon:Object(E.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e={id:Object(fe.a)(),field:"",value:"",operator:{display:"=",name:"equals",title:"Equals",value:"="}};q(Object(j.a)(Object(j.a)({},D),{conditions:[].concat(Object(u.a)(D.conditions),[e])}))},className:e.textButton,children:"New Condition"})}),Object(E.jsx)("h2",{className:e.header2,children:"Filter Displayed Fields"}),Object(E.jsxs)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:[Object(E.jsx)(x.a,{item:!0,xs:12,sm:6,md:3,className:e.inlineSelectItem,children:Object(E.jsxs)(_.a,{variant:"outlined",children:[Object(E.jsx)(C.a,{htmlFor:"filter-type-select",children:"Filter Type"}),Object(E.jsxs)(w.a,{native:!0,margin:"dense",label:"Filter Type",className:e.filterSelect,value:D.filterType,onChange:function(e){var t=e.target.checked?"show":"hide";q(Object(j.a)(Object(j.a)({},D),{filterType:t}))},inputProps:{name:"filter-type",id:"filter-type-select"},children:[Object(E.jsx)("option",{"aria-label":"Show",value:"show",children:"Show"}),Object(E.jsx)("option",{"aira-label":"Hide",value:"hide",children:"Hide"})]})]})}),Object(E.jsx)(te,{label:"Add Field",fields:D.filterFields,onAddField:function(e){return B("filterFields",e)},onRemoveField:function(e){return G("filterFields",e)}})]}),Object(E.jsx)("h2",{className:e.header2,children:"Resolves"}),Object(E.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:Object(E.jsx)(te,{label:"Resolves",fields:D.resolves,onAddField:function(e){return B("resolves",e)},onRemoveField:function(e){return G("resolves",e)}})}),Object(E.jsx)("h2",{className:e.header2,children:"Joins"}),Object(E.jsx)(_e,{joinsData:D.joins,depth:0,onJoinDataChange:function(e){var t=D.joins.map((function(t){return t.id===e.id?e:t}));q(Object(j.a)(Object(j.a)({},D),{joins:t}))},onAddNewJoin:function(e){e.parentId||q(Object(j.a)(Object(j.a)({},D),{joins:[].concat(Object(u.a)(D.joins),[e])}))},onDeleteJoin:function(e){var t=D.joins.filter((function(t){return t.id!==e}));q(Object(j.a)(Object(j.a)({},D),{joins:t}))}})]})})]}),Object(E.jsxs)(x.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(E.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(E.jsx)(pe,{queryUrl:U,isLoading:S,onRunQuery:function(){return re.apply(this,arguments)}})}),Object(E.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(E.jsx)(ce,{data:ae,isLoading:S})})]})]})})]})}var Se=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,582)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),i(e),r(e),c(e)}))};c.a.render(Object(E.jsx)(i.a.StrictMode,{children:Object(E.jsx)(Ie,{})}),document.getElementById("root")),Se()}},[[521,1,2]]]);
//# sourceMappingURL=main.cd9cba53.chunk.js.map