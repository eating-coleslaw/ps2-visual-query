(this["webpackJsonpps2-visual-query"]=this["webpackJsonpps2-visual-query"]||[]).push([[0],{178:function(e,t,n){},293:function(e,t,n){},295:function(e,t,n){},319:function(e,t){},321:function(e,t){},330:function(e,t){},332:function(e,t){},357:function(e,t){},359:function(e,t){},360:function(e,t){},365:function(e,t){},367:function(e,t){},373:function(e,t){},375:function(e,t){},394:function(e,t){},406:function(e,t){},409:function(e,t){},435:function(e,t){},529:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(19),c=n.n(r),o=(n(293),n(167)),l=n.n(o),s=n(263),d=n(42),u=n(31),j=n(6),m=n(18),b=n(571),h=n(278),f=n(589),g=n(588),p=n(590),O=n(591),x=n(580),v=n(531),y=n(578),_=n(576),C=n(597),I=n(592),w=(n(295),n(126)),S=n(127),N=n(70),T=n.n(N),F=n(595),L=n(125),A=n.n(L),k=n(86),E=n.n(k),R=n(1),D=Object(b.a)((function(e){return{button:{margin:e.spacing(1)}}}));var q=function(e){var t=e.serviceId,n=e.onServiceKeyChange,i=e.onDeleteStoredKey,r=D(),c=Object(a.useState)(t),o=Object(m.a)(c,2),l=o[0],s=o[1];return Object(R.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),n(l)},children:[Object(R.jsx)(F.a,{id:"service-key",label:"Service Key",margin:"dense",variant:"outlined",required:!0,name:"service-key",onChange:function(e){return s(e.target.value)},placeholder:"example",value:l,helperText:"Omit the leading 's:'"}),Object(R.jsx)(y.a,{type:"submit",variant:"contained",color:"primary",size:"large",className:r.button,startIcon:Object(R.jsx)(A.a,{}),children:"Save"}),Object(R.jsx)(y.a,{type:"button",variant:"outlined",color:"primary",size:"large",className:r.button,startIcon:Object(R.jsx)(E.a,{}),onClick:function(){s("example"),i()},children:"Delete"})]})},B=n(593),W={Languages:["De","En","Es","Fr","It"],Operators:[{display:"=",name:"equals",title:"Equals",value:"="},{display:"\u2260",name:"notEquals",title:"Not Equals",value:"=!"},{display:"<",name:"isLessThan",title:"Is Less Than",value:"=<"},{display:"\u2264",name:"isLessThanOrEquals",title:"Is Less Than Or Equals",value:"=["},{display:">",name:"isGreaterThan",title:"Is Greater Than",value:"=>"},{display:"\u2265",name:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",value:"=]"},{display:"Starts With",name:"startsWith",title:"Starts With",value:"=^"},{display:"Contains",name:"contains",title:"Contains",value:"=*"}],Collections:["character","character_name","characters_achievement","characters_currency","characters_directive","characters_directive_objective","characters_directive_tier","characters_directive_tree","characters_skill","characters_stat","characters_stat_by_faction","characters_stat_history","characters_weapon_stat","characters_weapon_stat_by_faction","world_stat_history","characters_item","ability","ability_type","achievement","armor_facing","armor_info","currency","directive","directive_tier","directive_tree","directive_tree_category","effect","effect_type","empire_scores","experience","experience_rank","facility_link","facility_type","faction","fire_group","fire_group_to_fire_mode","fire_mode","fire_mode_2","fire_mode_to_projectile","fire_mode_type","image","image_set","image_set_default","item","item_attachment","item_category","item_profile","item_to_weapon","item_type","loadout","map_hex","map_region","marketing_bundle","marketing_bundle_item","marketing_bundle_with_1_item","metagame_event","metagame_event_state","objective","objective_set_to_objective","objective_type","player_state","player_state_group","player_state_group_2","profile","profile_2","profile_armor_map","profile_resist_map","projectile","projectile_flight_type","region","resist_info","resist_type","resource_type","reward","reward_group_to_reward","reward_set_to_reward_group","reward_type","single_character_by_id","skill","skill_category","skill_line","skill_set","target_type","title","vehicle","vehicle_attachment","vehicle_faction","vehicle_skill_set","weapon","weapon_ammo_slot","weapon_datasheet","weapon_to_attachment","weapon_to_fire_group","zone","zone_effect","zone_effect_type","characters_world","world","outfit","outfit_member","outfit_member_extended","outfit_rank","characters_online_status","map","characters_friend","leaderboard","characters_leaderboard","characters_event_grouped","characters_event","event","world_event"]},z=Object(b.a)((function(e){return{selectControl:{minWidth:250}}}));function G(e){var t=e.collection,n=e.onChange,i=z(),r=Object(a.useState)([]),c=Object(m.a)(r,2),o=c[0],l=c[1];function s(e){o.includes(e)&&n(e)}return Object(a.useEffect)((function(){l(W.Collections)}),[]),Object(R.jsx)(B.a,{id:"collection-selector",options:o,value:t,autoSelect:!0,required:!0,onChange:function(e,t){return s(t)},renderInput:function(e){return Object(R.jsx)(F.a,Object(j.a)(Object(j.a)({},e),{},{label:"Collection",variant:"outlined",margin:"dense"}))},className:i.selectControl})}var J=n(599),V=Object(b.a)((function(e){return{root:{width:250}}})),P=[{value:0,label:"None"},{value:10,label:10},{value:20,label:100},{value:30,label:"1k"},{value:40,label:"10k"}],K=function(e){return 0===e||e<=10?e:e<=20?10*(e-10):e<=30?100*(e-20):1e3*(e-30)};function Q(e){var t,n=e.value,a=e.onChange,r=(e.label,V()),c=0===(t=n)||t<=10?t:t<=100?t/10+10:t<=1e3?t/100+20:t/1e3+30;return Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(C.a,{id:"limit-input-slider-label",htmlFor:"limit-slider",children:"Limit"}),Object(R.jsx)(J.a,{className:r.root,id:"limit-slider",value:"number"===typeof c?c:0,min:0,step:1,max:40,defaultValue:10,getAriaValueText:K,valueLabelFormat:K,valueLabelDisplay:"auto",onChange:function(e,t){a(K(t))},"aria-labelledby":"limit-input-slider-label",marks:P})]})}var H=Object(b.a)((function(e){return{selectControl:{minWidth:120,width:120}}}));function U(e){var t=e.language,n=e.onChange,i=H(),r=Object(a.useState)([]),c=Object(m.a)(r,2),o=c[0],l=c[1];Object(a.useEffect)((function(){l(W.Languages)}),[]);var s=o.map((function(e){return Object(R.jsx)("option",{value:e,"aria-label":e,children:e},e)}));return Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"language-select",children:"Language"}),Object(R.jsxs)(I.a,{native:!0,margin:"dense",label:"Language",className:i.selectControl,value:t,onChange:function(e){var t=e.target.value;n(t)},inputProps:{name:"language",id:"language-select"},children:[Object(R.jsx)("option",{"aria-label":"All",value:"All",children:"All"}),s]})]})}var M=n(598),Y=n(581),Z=n(579),X=n(270),$=n.n(X),ee=Object(b.a)((function(e){return{button:{margin:0,padding:0},chipList:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}));function te(e){var t=e.label,n=e.fields,r=e.onAddField,c=e.onRemoveField,o=ee(),l=Object(a.useState)(""),s=Object(m.a)(l,2),d=s[0],u=s[1];function j(){return""!==d&&!n.includes(d)}var b=n.map((function(e){return Object(R.jsx)("li",{children:Object(R.jsx)(M.a,{label:e,onDelete:function(){return function(e){c(e)}(e)},className:o.chip,size:"small"})},e)}));return Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(x.a,{item:!0,xs:12,sm:6,md:4,children:Object(R.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),j()&&(u(""),r(d))},children:Object(R.jsx)(F.a,{id:"add-show-field-input",label:t,margin:"dense",variant:"outlined",name:"show-field",size:"small",onChange:function(e){return u(e.target.value)},placeholder:"example",value:d,InputProps:{endAdornment:Object(R.jsx)(Y.a,{position:"end",children:Object(R.jsx)(Z.a,{type:"submit",variant:"outlined",color:"primary",disabled:!j(),"aria-label":"Add to shown fields",className:o.button,children:Object(R.jsx)($.a,{})})})}})})}),Object(R.jsx)("ul",{className:o.chipList,children:b})]})}var ne=Object(b.a)((function(e){return{fieldGridItem:{marginTop:e.spacing(1),marginBottom:4,marginLeft:e.spacing(1)},operatorGrid:{marginTop:4},button:{margin:0,padding:0}}}));function ae(e){var t=e.label,n=e.initValue,i=e.onChange,r=e.placeholder,c=void 0===r?"":r,o=e.variant,l=void 0===o?"outlined":o,s=e.ariaLabel,d=void 0===s?"":s,u=ne(),j=Object(a.useState)(n),b=Object(m.a)(j,2),h=b[0],f=b[1];return Object(R.jsx)("form",{noValidate:!0,autoComplete:"off",onSubmit:function(e){e.preventDefault(),i(h)},children:Object(R.jsx)(F.a,{id:"".concat(t,"-field"),label:t,margin:"dense",variant:l,name:"".concat(t,"-field"),size:"small",onChange:function(e){return f(e.target.value)},value:h,placeholder:c,InputProps:{endAdornment:Object(R.jsx)(Y.a,{position:"end",children:Object(R.jsx)(Z.a,{type:"submit",variant:"outlined",color:"primary",disabled:!function(e){return""!==e}(h)||h===n,"aria-label":d,className:u.button,children:Object(R.jsx)(A.a,{fontSize:"small"})})})}})})}var ie=Object(b.a)((function(e){return{fieldGridItem:{marginTop:e.spacing(1),marginBottom:4,marginLeft:e.spacing(1)},operatorGrid:{marginTop:4},button:{margin:0,padding:0}}}));function re(e){var t=e.conditionData,n=e.onDataChange,r=e.onDelete,c=ie(),o=Object(a.useState)([]),l=Object(m.a)(o,2),s=l[0],d=l[1];return Object(a.useEffect)((function(){d(W.Operators)}),[]),Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(x.a,{item:!0,xs:12,md:4,children:Object(R.jsx)(ae,{label:"Field",initValue:t.field,onChange:function(e){n(t.id,"field",e)},ariaLabel:"Update the condition's field"})}),Object(R.jsx)(x.a,{item:!0,xs:3,md:3,className:c.operatorGrid,children:Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"operator-select",children:"Operator"}),Object(R.jsxs)(I.a,{native:!0,margin:"dense",label:"Operator",value:t.operator.name,onChange:function(e){var a=e.target.value,i=s.find((function(e){return e.name===a}));n(t.id,"operator",i)},inputProps:{name:"operator",id:"operator-select"},children:[Object(R.jsx)("option",{value:"equals",title:"Equals",children:"="},"equals"),Object(R.jsx)("option",{value:"notEquals",title:"Not Equals",children:"\u2260"},"notEquals"),Object(R.jsx)("option",{value:"isLessThan",title:"Is Less Than",children:"<"},"isLessThan"),Object(R.jsx)("option",{value:"isLessThanOrEquals",title:"Is Less Than Or Equals",children:"\u2264"},"isLessThanOrEquals"),Object(R.jsx)("option",{value:"isGreaterThan",title:"Is Greater Than",children:">"},"isGreaterThan"),Object(R.jsx)("option",{value:"isGreaterThanOrEquals",title:"Is Greater Than Or Equals",children:"\u2265"},"isGreaterThanOrEquals"),Object(R.jsx)("option",{value:"startsWith",children:"Starts With"},"startsWith"),Object(R.jsx)("option",{value:"contains",children:"Contains"},"contains")]})]})}),Object(R.jsx)(x.a,{item:!0,xs:8,md:4,children:Object(R.jsx)(ae,{label:"Value",initValue:t.value,onChange:function(e){n(t.id,"value",e)},ariaLabel:"Update the condition's value"})}),Object(R.jsx)(x.a,{item:!0,xs:1,md:1,children:Object(R.jsx)(Z.a,{"aria-label":"Delete this query condition",title:"Delete this query condition",onClick:function(){r(t.id)},children:Object(R.jsx)(E.a,{fontSize:"small"})})})]})}var ce=n(582),oe=n(106),le=n.n(oe),se=Object(b.a)((function(e){return{headerButtonContainer:{textAlign:"right"},header1:{margin:0,fontSize:"1.4em",fontWeight:500},paper:{padding:e.spacing(2)},jsonView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},textView:{maxHeight:"600px",overflow:"auto",lineHeight:"1.1",marginTop:e.spacing(1)},linearProgres:{marginTop:e.spacing(2),marginBottom:e.spacing(2)}}}));function de(e){var t=e.data,n=e.isLoading,a=se();return n?Object(R.jsxs)(v.a,{className:a.paper,children:[Object(R.jsx)("h1",{children:"Query Results"}),Object(R.jsx)(ce.a,{className:a.linearProgres})]}):Object(R.jsxs)(v.a,{className:a.paper,children:[Object(R.jsxs)(x.a,{container:!0,justifyContent:"space-between",alignItems:"center",children:[Object(R.jsx)(x.a,{item:!0,xs:8,children:Object(R.jsx)("h1",{className:a.header1,children:"Query Results"})}),Object(R.jsx)(x.a,{item:!0,xs:4,className:a.headerButtonContainer,children:!!t&&Object(R.jsx)(y.a,{color:"primary",onClick:function(){t&&navigator.clipboard.writeText(JSON.stringify(t,null,2))},value:"Copy",title:"Copy the query results to the clipboard",startIcon:Object(R.jsx)(le.a,{}),children:"Copy"})})]}),t?Object(R.jsx)("div",{className:a.textView,children:Object(R.jsx)("pre",{children:JSON.stringify(t,null,2)})}):null]})}var ue=n(583),je=n(271),me=n.n(je),be=n(272),he=n.n(be),fe=Object(b.a)((function(e){return{header1:{margin:0,fontSize:"1.4em",fontWeight:500},paper:{padding:e.spacing(2)},urlBox:{marginTop:e.spacing(1),backgroundColor:"#1F2330",color:"#fff",fontFamily:"monospace",padding:e.spacing(1),borderRadius:4,wordWrap:"anywhere",overflow:"auto"},container:{marginTop:e.spacing(1)},gridItem:{marginRight:e.spacing(2)},button:{},runButton:{width:120},runButtonIcon:{marginLeft:-8},buttonWide:{whiteSpace:"nowrap"}}}));function ge(e){var t=e.queryUrl,n=e.isLoading,a=e.onRunQuery,i=fe();return Object(R.jsxs)(v.a,{className:i.paper,children:[Object(R.jsx)("h1",{className:i.header1,children:"Query URL"}),Object(R.jsx)("div",{className:i.urlBox,children:unescape(t)}),Object(R.jsxs)(x.a,{container:!0,justifyContent:"flex-start",alignItems:"center",spacing:1,className:i.container,children:[Object(R.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(y.a,{color:"primary",variant:"contained",onClick:a,value:"Run",className:i.runButton,startIcon:n?null:Object(R.jsx)(me.a,{className:i.runButtonIcon}),title:"Run the query",children:n?"Loading...":"Run"})}),Object(R.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){navigator.clipboard.writeText(t)},value:"Copy",className:i.button,title:"Copy the query url to the clipboard",startIcon:Object(R.jsx)(le.a,{}),children:"Copy"})}),Object(R.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(y.a,{color:"primary",variant:"outlined",onClick:function(){var e=function(e){var n=new RegExp("(/s:)[A-z0-9]+/");return t.replace(n,"/s:example/")}();navigator.clipboard.writeText(e)},value:"Copy Anonymous",className:i.buttonWide,title:"Copy the query url to the clipboard and replace your service ID with 'example'",startIcon:Object(R.jsx)(le.a,{}),children:"Copy Anon."})}),Object(R.jsx)(x.a,{item:!0,className:i.gridItem,children:Object(R.jsx)(ue.a,{to:t,href:t,target:"_blank",rel:"noreferrer",children:Object(R.jsx)(y.a,{color:"primary",variant:"outlined",value:"Open Query",className:i.buttonWide,title:"Open the query URL in a new tab",startIcon:Object(R.jsx)(he.a,{}),children:"Open"})})})]})]})}var pe=n(274),Oe=n.n(pe);function xe(e){var t=e.value,n=e.label,a=e.optionA,i=e.optionB,r=e.onChange,c=e.className,o=void 0===c?null:c;return Object(R.jsxs)(_.a,{variant:"outlined",style:{minWidth:120},children:[Object(R.jsx)(C.a,{htmlFor:"binary-select",children:n}),Object(R.jsxs)(I.a,{native:!0,margin:"dense",label:n,className:o,value:t,onChange:function(e){e.preventDefault(),r(e.target.value)},inputProps:{name:"binary-select",id:"binary-select"},children:[Object(R.jsx)("option",{"aria-label":a,value:a.toLowerCase(),children:a}),Object(R.jsx)("option",{"aria-label":i,value:i.toLowerCase(),children:i})]})]})}function ve(e){var t=e.value,n=e.label,a=e.trueLabel,i=void 0===a?"Yes":a,r=e.falseLabel,c=void 0===r?"No":r,o=e.onChange,l=e.className,s=void 0===l?null:l;return Object(R.jsxs)(_.a,{variant:"outlined",style:{minWidth:120},children:[Object(R.jsx)(C.a,{htmlFor:"boolean-select",children:n}),Object(R.jsxs)(I.a,{native:!0,margin:"dense",label:n,className:s,value:t,onChange:function(e){return o(e.target.value)},inputProps:{name:"boolean-select",id:"boolean-select"},children:[Object(R.jsx)("option",{"aria-label":i,value:!0,children:i}),Object(R.jsx)("option",{"aria-label":c,value:!1,children:c})]})]})}var ye=n(279),_e=n(273),Ce=n.n(_e),Ie=["headerLevel","headerText","defaultExtended","children","id"],we=Object(b.a)((function(e){return{root:{marginBottom:e.spacing(2),marginTop:e.spacing(1)},header1:{margin:0,fontSize:"1.4em",fontWeight:500,width:"100%",marginBottom:-4},header2:{margin:0,fontSize:"1.2em",fontWeight:500,width:"100%"},header3:{margin:0,fontSize:"1.1em",fontWeight:500,width:"100%",marginBottom:2},headerContainer:{marginBottom:e.spacing(1)},headerContainerCollapsed:{paddingBottom:e.spacing(1),borderBottom:"1px solid #919cb950"},toggleContainer:{textAlign:"right",borderBottom:"1px solid #919cb950"},toggleButton:{padding:e.spacing(.5)},toggle:{transition:"transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"},toggleCollapsed:{transform:"rotateZ(180deg)"},content:{width:"100%",display:"none"},contentOpen:{width:"100%"}}}));function Se(e){var t=e.headerLevel,n=e.headerText,r=e.defaultExtended,c=e.children,o=e.id,l=(Object(ye.a)(e,Ie),we());if("number"!==typeof t||t<0||t>6)throw new Error("headerLevel must be an integer between 1 and 6");var s=i.a.createElement("h".concat(t),{className:l["header".concat(t)]},n),d=Object(a.useState)(r),u=Object(m.a)(d,2),j=u[0],b=u[1];return Object(R.jsxs)("div",{className:l.root,children:[Object(R.jsxs)(x.a,{container:!0,justifyContent:"space-between",alignItems:"center",className:l.headerContainer,children:[Object(R.jsx)(x.a,{item:!0,xs:10,className:l.headerContainerCollapsed,children:s}),Object(R.jsx)(x.a,{item:!0,xs:2,className:l.toggleContainer,children:Object(R.jsx)(Z.a,{"aria-label":function(){return j?"Collapse Section":"Expand Section"},onClick:function(){b(!j)},className:l.toggleButton,children:Object(R.jsx)(Ce.a,{className:"".concat(j?l.toggle:"".concat(l.toggle," ").concat(l.toggleCollapsed))})})})]}),Object(R.jsx)("div",{id:"collapsible-content-".concat(o),className:j?l.contentOpen:l.content,children:c})]})}var Ne=n(594),Te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{id:Object(Ne.a)(),parentId:e,collection:"",injectAt:"",isOuterJoin:!1,isList:!1,onField:"",toField:"",filterType:"show",filterFields:[],terms:[],joins:[]}},Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"equals",t=W.Operators.find((function(t){return t.name===e}));if(!t)return new Error("Operator named '".concat(e," not found"));var n=e,a=t.display,i=t.title,r=t.value;return{name:n,display:a,title:i,value:r}},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"equals";return{id:Object(Ne.a)(),field:"",value:"",operator:Fe(e),isValid:function(e,t,n){return!!e&&!!t&&!!n},toString:function(e,t,n){return"".concat(e).concat(null===t||void 0===t?void 0:t.value).concat(n)}}},Ae=Object(b.a)((function(e){return{paper:{padding:e.spacing(1),marginBottom:e.spacing(2),borderStyle:"solid",borderColor:"#919cb930",width:"100%"},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},textButton:{marginTop:-4,marginBottom:e.spacing(1)},footer:{marginTop:e.spacing(0),marginBottom:e.spacing(0)},inlineSelectItem:{marginTop:4}}}));function ke(e){var t=e.joinData,n=e.depth,a=e.onDelete,i=e.onInfoChange,r=e.onAddArrayItem,c=e.onRemoveArrayItem,o=e.onChangeArrayItemWithId,l=e.onRemoveArrayItemWithId,s=Ae();function d(e,n){var a=[t.id];i(t.id,e,n,a)}function m(e,n,a,r){r=[t.id].concat(Object(u.a)(r)),i(e,n,a,r)}function b(e,n){var a=[t.id];r(t.id,e,n,a)}function h(e,n,a,i){i=[t.id].concat(Object(u.a)(i)),r(e,n,a,i)}function f(e,n,a,i){i=[t.id].concat(Object(u.a)(i)),c(e,n,a,i)}function g(e,n,a,i,r,c){c=[t.id].concat(Object(u.a)(c)),o(e,n,a,i,r,c)}function p(e,n){var a=[t.id];l(t.id,e,n,a)}function O(e,n,a,i){i=[t.id].concat(Object(u.a)(i)),l(e,n,a,i)}function _(e){p("terms",e)}function C(e){p("joins",e)}var I=function(e,n,a){return function(e,n,a,i){var r=[t.id];o(t.id,e,n,a,i,r)}("terms",e,n,a)},w={borderWidth:0===n?1:"2px 0 0 1px",marginLeft:0===n?0:8},S=n<4,N=4===n||!t.collection;return Object(R.jsxs)(v.a,{className:s.paper,style:Object(j.a)({},w),children:[Object(R.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:s.gridRow,style:{marginBottom:0},children:[Object(R.jsx)(x.a,{item:!0,xs:12,sm:8,children:Object(R.jsx)(G,{collection:t.collection,onChange:function(e){return d("collection",e)}})}),Object(R.jsx)(x.a,{item:!0,xs:12,sm:4,children:Object(R.jsx)(ae,{label:"Inject At",initValue:t.injectAt,onChange:function(e){return d("injectAt",e)}})})]}),Object(R.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:s.gridRow,children:[Object(R.jsx)(x.a,{item:!0,xs:5,children:Object(R.jsx)(ae,{label:"On Field",initValue:t.onField,onChange:function(e){return d("onField",e)}})}),Object(R.jsx)(x.a,{item:!0,xs:2,style:{textAlign:"center"},children:Object(R.jsx)(Oe.a,{style:{marginTop:8}})}),Object(R.jsx)(x.a,{item:!0,xs:5,children:Object(R.jsx)(ae,{label:"To Field",initValue:t.toField,onChange:function(e){return d("toField",e)}})})]}),Object(R.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:s.gridRow,children:[Object(R.jsx)(x.a,{item:!0,sm:6,md:4,children:Object(R.jsx)(ve,{label:"Join Type",value:t.isOuterJoin,trueLabel:"Outer",falseLabel:"Inner",onChange:function(e){return d("isOuterJoin",e)}})}),Object(R.jsx)(x.a,{item:!0,sm:6,md:4,children:Object(R.jsx)(ve,{label:"Is List",value:t.isList,onChange:function(e){return d("isList",e)}})})]}),Object(R.jsxs)(Se,{id:"join-conditions",headerLevel:3,headerText:"Join Conditions",defaultExtended:!0,children:[t.terms.length>0&&Object(R.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:s.gridRow,children:t.terms.map((function(e){return Object(R.jsx)(re,{conditionData:e,onDataChange:I,onDelete:_},e.id)}))}),Object(R.jsx)(x.a,{item:!0,xs:12,children:Object(R.jsx)(y.a,{color:"primary",startIcon:Object(R.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){b("terms",Le())},className:s.textButton,children:"New Condition"})})]}),Object(R.jsx)(Se,{id:"field-filters",headerLevel:3,headerText:"Filter Displayed Fields",defaultExtended:!0,children:Object(R.jsxs)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:s.gridRow,children:[Object(R.jsx)(x.a,{item:!0,xs:12,sm:6,md:3,className:s.inlineSelectItem,children:Object(R.jsx)(xe,{label:"Filter Type",onChange:function(e){return d("filterType",e)},optionA:"Show",optionB:"Hide",value:t.filterType,className:s.filterSelect})}),Object(R.jsx)(te,{label:"Add Field",fields:t.filterFields,onAddField:function(e){b("filterFields",e)},onRemoveField:function(e){!function(e,n){var a=[t.id];c(t.id,e,n,a)}("filterFields",e)}})]})}),Object(R.jsxs)(x.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"flex-start",className:s.footer,children:[Object(R.jsx)(x.a,{item:!0,container:!0,xs:6,alignItems:"center",justifyContent:"flex-start",children:S&&Object(R.jsx)(x.a,{item:!0,children:Object(R.jsx)(y.a,{disabled:N,color:"primary",startIcon:Object(R.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){b("joins",Te())},children:"Sub Join"})})}),Object(R.jsx)(x.a,{item:!0,container:!0,xs:6,spacing:2,alignItems:"center",justifyContent:"flex-end",style:{textAlign:"right"},children:Object(R.jsx)(x.a,{item:!0,md:6,children:Object(R.jsx)(y.a,{color:"default",startIcon:Object(R.jsx)(E.a,{fontSize:"small"}),size:"small",onClick:function(){a(t.id)},children:"Delete"})})})]}),t.joins.length>0&&Object(R.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:s.gridRow,children:t.joins.map((function(e){return Object(R.jsx)(ke,{joinData:e,depth:n+1,onDelete:C,onInfoChange:m,onAddArrayItem:h,onRemoveArrayItem:f,onChangeArrayItemWithId:g,onRemoveArrayItemWithId:O},e.id)}))})]})}var Ee=Object(b.a)((function(e){return{gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},textButton:{marginTop:-4,marginBottom:e.spacing(1)}}}));function Re(e){var t=e.joinsData,n=e.onAddJoin,a=e.onDeleteJoin,r=e.onInfoChange,c=e.onAddArrayItem,o=e.onRemoveArrayItem,l=e.onChangeArrayItemWithId,s=e.onRemoveArrayItemWithId,d=Ee();function u(e){a(e)}function j(e,t,n,a){r(e,t,n,a)}function m(e,t,n,a){c(e,t,n,a)}function b(e,t,n,a){o(e,t,n,a)}function h(e,t,n,a,i,r){l(e,t,n,a,i,r)}function f(e,t,n,a){s(e,t,n,a)}return Object(R.jsxs)(i.a.Fragment,{children:[Object(R.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:d.gridRow,children:t.map((function(e){return Object(R.jsx)(ke,{joinData:e,depth:0,onDelete:u,onInfoChange:j,onAddArrayItem:m,onRemoveArrayItem:b,onChangeArrayItemWithId:h,onRemoveArrayItemWithId:f},e.id)}))}),Object(R.jsx)(x.a,{item:!0,xs:12,children:Object(R.jsx)(y.a,{color:"primary",startIcon:Object(R.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e=Te();n(e)},className:d.textButton,children:"New Join"})})]})}var De=n(586),qe=n(587),Be=n(281),We=n(585),ze=n(584);var Ge=function(e){var t=e.children,n=Object(ze.a)();return Object(R.jsx)(We.a,{appear:!1,direction:"down",in:!n,children:t})},Je=n(276),Ve=n.n(Je),Pe=n(275),Ke=n.n(Pe),Qe=function(){var e="DaybreakGamesKey",t="ColorTheme";return{saveServiceId:function(t){return localStorage.setItem(e,t)},getServiceId:function(){return localStorage.getItem(e)},removeServiceId:function(){return localStorage.removeItem(e)},saveColorTheme:function(e){return localStorage.setItem(t,e)},getColorTheme:function(){return localStorage.getItem(t)},removeColorTheme:function(){return localStorage.removeItem(t)}}}();n(178);function He(e){var t=e.theme,n=e.onChangeTheme;var i=Object(a.useState)(!1),r=Object(m.a)(i,2),c=r[0],o=r[1];var l="dark"===t,s=l?"toggle-dark":"toggle-light";c&&(s="".concat(s," toggle-twirl"));var d=l?Object(R.jsx)(Ke.a,{className:s,onAnimationEnd:function(e){"twirl"===e.animationName&&o(!1)}}):Object(R.jsx)(Ve.a,{className:s,onAnimationEnd:function(e){"twirl"===e.animationName&&o(!1)}});return Object(R.jsx)(Z.a,{"aria-label":"Toggle light/dark theme",title:"Toggle light/dark theme",onClick:function(){"dark"===t?(Qe.saveColorTheme("light"),o(!0),n("light")):(Qe.saveColorTheme("dark"),o(!0),n("dark"))},children:d})}var Ue=n(277),Me=n.n(Ue),Ye=n(40);function Ze(){var e=Object(Ye.a)(),t="https://github.com/eating-coleslaw/ps2-visual-query",n=Object(a.useState)("dark"===e.palette.type),i=Object(m.a)(n,2),r=i[0],c=i[1];Object(a.useEffect)((function(){c("dark"===e.palette.type)}),[e.palette.type]);var o=r?"rgba(0, 0, 0, 0.87)":"#fff";return Object(R.jsx)(ue.a,{to:t,href:t,target:"_blank",rel:"noreferrer",children:Object(R.jsx)(Z.a,{"aria-label":"Go to GitHub repository",title:"Go to GitHub repository",children:Object(R.jsx)(Me.a,{style:{color:o}})})})}function Xe(e){return Object(R.jsx)(Ge,Object(j.a)(Object(j.a)({},e),{},{children:Object(R.jsx)(De.a,{position:"sticky",children:Object(R.jsx)(qe.a,{variant:"dense",children:Object(R.jsxs)(x.a,{container:!0,alignItems:"center",children:[Object(R.jsx)(x.a,{item:!0,xs:6,children:Object(R.jsx)(Be.a,{variant:"h6",children:"PS2 Query Editor"})}),Object(R.jsxs)(x.a,{item:!0,container:!0,xs:6,justifyContent:"flex-end",children:[Object(R.jsx)(Ze,{}),Object(R.jsx)(He,Object(j.a)({},e))]})]})})})}))}var $e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"example",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"character";return{serviceKey:e,namespace:"ps2:v2",collection:t,language:null,limit:null,conditions:[],filterType:"show",filterFields:[],resolves:[],joins:[],trees:[],start:null,sortFields:[],sortDirection:-1}},et=n(179).Query,tt=n(179),nt=Object(b.a)((function(e){return{root:{flexGrow:1},container:{"margin-top":e.spacing(2)},gridContainer:{padding:e.spacing(2)},gridContainerItem:{"padding-bottom":e.spacing(2)},paper:{padding:e.spacing(2)},gridRow:{marginTop:e.spacing(.5),marginBottom:e.spacing(1)},header1:{margin:0,fontSize:"1.4em",fontWeight:500},header2:{margin:0,fontSize:"1.2em",fontWeight:500,width:"100%",marginTop:e.spacing(1.5)},itemParagraph:{marginTop:e.spacing(1),marginBottom:e.spacing(2)},splitQueryField:{width:250},filterSelect:{width:120},inlineSelectItem:{marginTop:4},textButton:{marginTop:-4,marginBottom:e.spacing(1)},buttonWrapper:{margin:e.spacing(1),position:"relative",display:"flex",justifyContent:"flex-start"},buttonProgress:{color:"black",position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}));function at(){var e=nt(),t=Object(a.useState)("ps2:v2"),n=Object(m.a)(t,2),r=n[0];n[1];Object(a.useEffect)((function(){tt.SetGlobalNamespace("ps2:v2")}),[r]);var c=Object(a.useState)(Qe.getServiceId()),o=Object(m.a)(c,2),b=o[0],N=o[1];Object(a.useEffect)((function(){var e=Qe.getServiceId();null!==e&&(tt.SetGlobalServiceKey(e),N(e))}),[N]);var F=Object(a.useState)(!1),L=Object(m.a)(F,2),A=L[0],k=L[1],E=Object(a.useState)($e(null!==b&&void 0!==b?b:"example","character",r)),D=Object(m.a)(E,2),B=D[0],W=D[1],z=Object(g.a)("(prefers-color-scheme: dark)"),J=Qe.getColorTheme(),V=Object(a.useState)(J||(z?"dark":"light")),P=Object(m.a)(V,2),K=P[0],H=P[1];Object(a.useEffect)((function(){H(J||(z?"dark":"light"))}),[J,z]);var M="dark"===K,Y=i.a.useMemo((function(){return Object(h.a)({palette:{type:M?"dark":"light",primary:M?{main:"#E7ADFB"}:w.a,secondary:S.a,background:{paper:M?"#27273A":"#fff",default:M?"#0F1320":"#fafafa"},text:{}},contrastThreshold:5})}),[M]);function Z(e,t){W((function(n){var a=Object(u.a)(n[e]);if(""===t||a.includes(t))return n;var i=a;return i.push(t),Object(j.a)(Object(j.a)({},n),Object(d.a)({},e,i))}))}function X(e,t){W((function(n){var a=Object(u.a)(n[e]),i=a.indexOf(t);if(-1!==i){var r=a;return r.splice(i,1),Object(j.a)(Object(j.a)({},n),Object(d.a)({},e,r))}}))}function $(e,t,n){W((function(a){var i=a.conditions.map((function(a){return a.id===e?Object(j.a)(Object(j.a)({},a),Object(d.a)({},t,n)):a}));return Object(j.a)(Object(j.a)({},a),{conditions:i})}))}function ee(e){W((function(t){var n=t.conditions.filter((function(t){return t.id!==e}));return Object(j.a)(Object(j.a)({},t),{conditions:n})}))}function ne(e,t,n,a,i,r){var c=i[0],o=Object(u.a)(i);return o.splice(0,1),e.map((function(e){return e.id===c?ae(e,t,n,a,o,r):e}))}function ae(e,t,n,a,i,r){if(e.id===t)return r(e);var c=i[0],o=Object(u.a)(i);o.splice(0,1);var l=e.joins.map((function(e){return e.id===c?ae(e,t,n,a,o,r):e}));return e=Object(j.a)(Object(j.a)({},e),{joins:l})}var ie=Object(a.useState)(""),ce=Object(m.a)(ie,2),oe=ce[0],le=ce[1];Object(a.useEffect)((function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return n.length>0&&n.forEach((function(n){if(n.collection){var i=null!==a?a.joinService(n.collection):t.joinService(n.collection);i.isList(n.isList),i.isOuterJoin(n.isOuterJoin),n.injectAt&&i.injectAt(n.injectAt),n.onField&&i.onField(n.onField),n.toField&&i.toField(n.toField),n.filterFields.length>0&&i["".concat(n.filterType,"Fields")](n.filterFields),n.terms.length>0&&n.terms.forEach((function(e){var t=e.field,n=e.operator,a=e.value;e.isValid(t,n,a)&&i.where(t)[n.name](a)})),n.joins.length>0&&e(t,n.joins,i)}})),t}try{var t=function(){var t=new et(B.collection,B.namespace,B.serviceKey);return B.language&&"All"!==B.language&&t.setLanguage(B.language.toLowerCase()),null!==B.limit&&0!==B.limit&&t.setLimit(B.limit),null!==B.start&&t.setStart(B.start),B.filterFields.length>0&&t["".concat(B.filterType,"Fields")](B.filterFields),B.resolves.length>0&&t.resolve(B.resolves),B.sortFields.length>0&&t.sort(B.sortFields),B.conditions.length>0&&B.conditions.forEach((function(e){var n=e.field,a=e.operator,i=e.value;e.isValid(n,a,i)&&t.where(n)[a.name](i)})),B.joins.length>0&&(t=e(t,B.joins)),t}().toUrl();t=t.replace("http://","https://"),le(t)}catch(n){console.log("Error getting query URL: ",n)}}),[B]);var se=Object(a.useState)(""),ue=Object(m.a)(se,2),je=ue[0],me=ue[1];function be(){return(be=Object(s.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!oe||A){e.next=18;break}return k(!0),e.prev=2,e.next=5,fetch(oe);case 5:return t=e.sent,e.next=8,t.json();case 8:n=e.sent,me(n),k(!1),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(2),console.log("Error getting data from query: ",e.t0),me("Error getting data from query: ".concat(e.t0)),k(!1);case 18:case"end":return e.stop()}}),e,null,[[2,13]])})))).apply(this,arguments)}return Object(R.jsxs)(f.a,{theme:Y,children:[Object(R.jsx)(p.a,{}),Object(R.jsx)(Xe,{theme:K,onChangeTheme:function(e){Qe.saveColorTheme(e),H(e)}}),Object(R.jsx)(O.a,{maxWidth:"lg",className:e.container,children:Object(R.jsxs)(x.a,{container:!0,alignItems:"flex-start",children:[Object(R.jsxs)(x.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(R.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsx)(v.a,{className:e.paper,children:Object(R.jsxs)(Se,{id:"service-id",headerLevel:1,headerText:"Service ID",defaultExtended:!b||"example"===b,children:[Object(R.jsxs)("p",{className:e.itemParagraph,children:["Sign up for a service ID"," ",Object(R.jsx)("a",{href:"https://census.daybreakgames.com/#service-id","aria-label":"Service ID sign up page",target:"_blank",rel:"noreferrer",style:{color:"#40afee"},children:"here"}),". The 'example' service ID allows up to 10 requests per minute. Saving your service ID will store it to this browser."]}),Object(R.jsx)(q,{serviceId:B.serviceKey,onServiceKeyChange:function(e){W((function(t){return Object(j.a)(Object(j.a)({},t),{serviceKey:e})})),tt.SetGlobalServiceKey(e),Qe.saveServiceId(e)},onDeleteStoredKey:function(){W((function(e){return Object(j.a)(Object(j.a)({},e),{serviceKey:"example"})})),tt.SetGlobalServiceKey("example"),Qe.removeServiceId()}})]})})}),Object(R.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsxs)(v.a,{className:e.paper,children:[Object(R.jsx)("h1",{className:e.header1,children:"Query Creator"}),Object(R.jsxs)("p",{className:e.itemParagraph,children:["Refer to the"," ",Object(R.jsx)("a",{href:"https://census.daybreakgames.com/#general","aria-label":"Official census API documentation page",target:"_blank",rel:"noreferrer",style:{color:"#40afee"},children:"official documentation"})," ","for more information on using the API."]}),Object(R.jsx)(Se,{id:"collection",headerLevel:2,headerText:"Collection",defaultExtended:!0,children:Object(R.jsxs)(x.a,{container:!0,spacing:1,alignItems:"center",className:e.gridRow,children:[Object(R.jsx)(x.a,{item:!0,sm:12,md:7,className:e.splitQueryField,children:Object(R.jsx)(G,{collection:B.collection,onChange:function(e){W((function(t){return Object(j.a)(Object(j.a)({},t),{collection:e})}))}})}),Object(R.jsx)(x.a,{item:!0,sm:12,md:4,className:e.splitQueryField,style:{marginTop:4},children:Object(R.jsx)(U,{value:B.language,onChange:function(e){var t="All"===e?"":e.toLowerCase();W((function(e){return Object(j.a)(Object(j.a)({},e),{language:t})}))}})}),Object(R.jsx)(x.a,{item:!0,sm:12,style:{marginLeft:16,marginTop:8},children:Object(R.jsx)(Q,{value:B.limit,onChange:function(e){var t=0===e?null:e;W((function(e){return Object(j.a)(Object(j.a)({},e),{limit:t})}))},label:"Limit"})})]})}),Object(R.jsxs)(Se,{id:"search-conditions",headerLevel:2,headerText:"Search Conditions",defaultExtended:!0,children:[B.conditions.length>0&&Object(R.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:1,className:e.gridRow,children:B.conditions.map((function(e){return Object(R.jsx)(re,{conditionData:e,onDataChange:$,onDelete:ee},e.id)}))}),Object(R.jsx)(x.a,{item:!0,xs:12,children:Object(R.jsx)(y.a,{color:"primary",startIcon:Object(R.jsx)(T.a,{fontSize:"small"}),size:"small",onClick:function(){var e=Le();W((function(t){var n=[].concat(Object(u.a)(t.conditions),[e]);return Object(j.a)(Object(j.a)({},t),{conditions:n})}))},className:e.textButton,children:"New Condition"})})]}),Object(R.jsx)(Se,{id:"field-filters",headerLevel:2,headerText:"Filter Displayed Fields",defaultExtended:!0,children:Object(R.jsxs)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:[Object(R.jsx)(x.a,{item:!0,xs:12,sm:6,md:3,className:e.inlineSelectItem,children:Object(R.jsxs)(_.a,{variant:"outlined",children:[Object(R.jsx)(C.a,{htmlFor:"filter-type-select",children:"Filter Type"}),Object(R.jsxs)(I.a,{native:!0,margin:"dense",label:"Filter Type",className:e.filterSelect,value:B.filterType,onChange:function(e){var t=e.target.value.toLowerCase();W((function(e){return Object(j.a)(Object(j.a)({},e),{filterType:t})}))},inputProps:{name:"filter-type",id:"filter-type-select"},children:[Object(R.jsx)("option",{"aria-label":"Show",value:"show",children:"Show"}),Object(R.jsx)("option",{"aira-label":"Hide",value:"hide",children:"Hide"})]})]})}),Object(R.jsx)(te,{label:"Add Field",fields:B.filterFields,onAddField:function(e){return Z("filterFields",e)},onRemoveField:function(e){return X("filterFields",e)}})]})}),Object(R.jsx)(Se,{id:"resolves-container",headerLevel:2,headerText:"Resolves",defaultExtended:!0,children:Object(R.jsx)(x.a,{item:!0,container:!0,xs:12,justifyContent:"flex-start",alignItems:"center",spacing:0,className:e.gridRow,children:Object(R.jsx)(te,{label:"Resolves",fields:B.resolves,onAddField:function(e){return Z("resolves",e)},onRemoveField:function(e){return X("resolves",e)}})})}),Object(R.jsx)(Se,{id:"joins-container",headerLevel:2,headerText:"Joins",defaultExtended:!0,children:Object(R.jsx)(Re,{joinsData:B.joins,onAddJoin:function(e){W((function(t){var n=[].concat(Object(u.a)(t.joins),[e]);return Object(j.a)(Object(j.a)({},t),{joins:n})}))},onDeleteJoin:function(e){W((function(t){var n=t.joins.filter((function(t){return t.id!==e}));return Object(j.a)(Object(j.a)({},t),{joins:n})}))},onInfoChange:function(e,t,n,a){W((function(i){var r=ne(i.joins,e,t,n,a,(function(e){return function(e,t,n){return Object(j.a)(Object(j.a)({},e),Object(d.a)({},t,n))}(e,t,n)}));return Object(j.a)(Object(j.a)({},i),{joins:r})}))},onAddArrayItem:function(e,t,n,a){W((function(i){var r=ne(i.joins,e,t,n,a,(function(e){return function(e,t,n){var a=[].concat(Object(u.a)(e[t]),[n]);return Object(j.a)(Object(j.a)({},e),Object(d.a)({},t,a))}(e,t,n)}));return Object(j.a)(Object(j.a)({},i),{joins:r})}))},onRemoveArrayItem:function(e,t,n,a){W((function(i){var r=ne(i.joins,e,t,n,a,(function(e){return function(e,t,n){var a=e[t].filter((function(e){return e!==n}));return Object(j.a)(Object(j.a)({},e),Object(d.a)({},t,a))}(e,t,n)}));return Object(j.a)(Object(j.a)({},i),{joins:r})}))},onChangeArrayItemWithId:function(e,t,n,a,i,r){W((function(c){var o=ne(c.joins,e,a,i,r,(function(e){return function(e,t,n,a,i){var r=e[t].map((function(e){return e.id===n?Object(j.a)(Object(j.a)({},e),Object(d.a)({},a,i)):e}));return Object(j.a)(Object(j.a)({},e),Object(d.a)({},t,r))}(e,t,n,a,i)}));return Object(j.a)(Object(j.a)({},c),{joins:o})}))},onRemoveArrayItemWithId:function(e,t,n,a){W((function(i){var r=ne(i.joins,e,t,n,a,(function(e){return function(e,t,n){var a=e[t].filter((function(e){return e.id!==n}));return Object(j.a)(Object(j.a)({},e),Object(d.a)({},t,a))}(e,t,n)}));return Object(j.a)(Object(j.a)({},i),{joins:r})}))}})})]})})]}),Object(R.jsxs)(x.a,{container:!0,item:!0,xs:12,sm:6,className:e.gridContainer,children:[Object(R.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsx)(ge,{queryUrl:oe,isLoading:A,onRunQuery:function(){return be.apply(this,arguments)}})}),Object(R.jsx)(x.a,{item:!0,xs:12,className:e.gridContainerItem,children:Object(R.jsx)(de,{data:je,isLoading:A})})]})]})})]})}c.a.render(Object(R.jsx)(i.a.StrictMode,{children:Object(R.jsx)(at,{})}),document.getElementById("root"))}},[[529,1,2]]]);
//# sourceMappingURL=main.b99eb46c.chunk.js.map