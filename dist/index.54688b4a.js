"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./index.5f310354.js");require("./el-input.ba5cf561.js");const f=e.defineComponent({name:"login",setup(){const s=e.ref(null),l=e.ref("111111"),d=e.ref(null),i=e.useRouter(),p=e.useRoute();e.useStore();const t=e.reactive({Hide:e.hide_default,loginForm:{username:"admin",password:"11111"},loginRules:{username:[{required:!0,message:"\u8BF7\u8F93\u5165\u8D26\u53F7\u5BC6\u7801",trigger:"blur"}],password:[{required:!0,validator:(o,n,r)=>{n.length<6?r(new Error("The password can not be less than 6 digits")):r()},trigger:"blur"}]},passwordType:"password",loading:!1,showDialog:!1,capsTooltip:!1,redirect:"",otherQuery:{}}),u=e.reactive({onSubmit:()=>{const o=`${+new Date}`;sessionStorage.setItem("token",o),i.push({path:"/home"})},showPwd:()=>{t.passwordType==="password"?t.passwordType="":t.passwordType="password",e.nextTick(()=>{l.value.focus()})},handleLogin:()=>{d.value.validate(async o=>{if(o)t.loading=!0,i.push({path:t.redirect||"/",query:t.otherQuery}).catch(n=>{console.warn(n)}),setTimeout(()=>{t.loading=!1},.5*1e3);else return!1})}});function a(o){return Object.keys(o).reduce((n,r)=>(r!=="redirect"&&(n[r]=o[r]),n),{})}return e.watch(()=>p.query,o=>{var n,r;o&&(t.redirect=(r=(n=o.redirect)==null?void 0:n.toString())!=null?r:"",t.otherQuery=a(o))}),e.onMounted(()=>{t.loginForm.username===""?s.value.focus():t.loginForm.password===""&&l.value.focus()}),{userNameRef:s,passwordRef:l,loginFormRef:d,...e.toRefs(t),...e.toRefs(u)}}});const _={class:"login-container"},w=e.createBaseVNode("div",{class:"main"},[e.createBaseVNode("div",{class:"stars"})],-1),g={class:"login-form"};function h(s,l,d,i,p,t){const u=e.ElInput,a=e.ElFormItem,o=e.resolveComponent("Hide"),n=e.ElIcon,r=e.ElButton,m=e.ElForm;return e.openBlock(),e.createElementBlock("div",_,[w,e.createBaseVNode("div",g,[e.createVNode(m,{ref:"ruleFormRef",model:s.loginForm,rules:s.loginRules},{default:e.withCtx(()=>[e.createVNode(a,{label:"\u8D26\u53F7",prop:"username"},{default:e.withCtx(()=>[e.createVNode(u,{modelValue:s.loginForm.username,"onUpdate:modelValue":l[0]||(l[0]=c=>s.loginForm.username=c)},null,8,["modelValue"])]),_:1}),e.createVNode(a,{label:"\u5BC6\u7801",prop:"password"},{default:e.withCtx(()=>[e.createVNode(u,{type:s.passwordType,modelValue:s.loginForm.password,"onUpdate:modelValue":l[1]||(l[1]=c=>s.loginForm.password=c)},{suffix:e.withCtx(()=>[e.createVNode(n,{onClick:s.showPwd},{default:e.withCtx(()=>[e.createVNode(o)]),_:1},8,["onClick"])]),_:1},8,["type","modelValue"])]),_:1}),e.createVNode(a,null,{default:e.withCtx(()=>[e.createVNode(r,{type:"primary",style:{width:"100%"},onClick:s.onSubmit},{default:e.withCtx(()=>[e.createTextVNode("\u767B \u5F55")]),_:1},8,["onClick"])]),_:1}),e.createVNode(a,null,{default:e.withCtx(()=>[e.createVNode(r,{type:"text"},{default:e.withCtx(()=>[e.createTextVNode("\u5FD8\u8BB0\u5BC6\u7801\uFF1F")]),_:1}),e.createVNode(r,{type:"text"},{default:e.withCtx(()=>[e.createTextVNode("\u6CE8 \u518C")]),_:1})]),_:1})]),_:1},8,["model","rules"])])])}const y=e._export_sfc(f,[["render",h]]);exports.default=y;